/// <reference path="../@types/cs-interface.d.ts"/>
declare let INCLUDE_SPEECH_TEST_HARNESS: boolean;
declare let CLEAR_SETTINGS: boolean;
declare let SKIP_TUTORIAL: boolean;
// automatically activate addon when installed (for faster testing)
declare let AUTO_ON: boolean;
import { pick, omit, } from "lodash";
import { ON_ICON, OFF_ICON, PROBLEM_ICON } from "../common/constants";
import { Recognizer, IRecognizedCallback } from "./recognizer";
import { PluginManager } from "./plugin-manager";
import { PluginSandbox } from "./plugin-sandbox";
import { Store, StoreSynced } from "./store";
import { IOptions } from "../common/store-lib";
import {
    Detector,
    ResettableTimeout,
    instanceOfCmdLiveTextParcel,
    instanceOfTextParcel,
    promisify
} from "../common/util";
import { storage, tabs, queryActiveTab, notifications } from "../common/browser-interface";

export interface IWindow extends Window {
    webkitSpeechRecognition: any;
}

const mainStoreProps = {
    inactivityAutoOffMins: 0,
    showLiveText: true,
    noHeadphonesMode: false,
    problem: false,
    activated: false,
}

type IMainStore = Partial<typeof mainStoreProps>;

const {
    webkitSpeechRecognition
}: IWindow = < IWindow > window;

let permissionDetector;
let store = new Store(PluginManager.digestNewPlugin);

// initial load -> get plugins from storage
let fullyLoadedPromise =
    // HACK
    //  clearing the local data so plugin data is updated between versions -- had issues doing this onInstall because it was called late
    storage.local.clear().then(async() =>
        store.rebuildLocalPluginCache().then(async() => {
            let recg = new Recognizer(store,
                tabs.onUrlUpdate,
                queryActiveTab,
                tabs.sendMsgToTab,
                webkitSpeechRecognition
            );
            let ps = new PluginSandbox(store);
            let pm = new PluginManager(store);
            let mn = new Main(store, pm, ps, recg);

            if (AUTO_ON) {
                // HACK
                setTimeout(mn.toggleActivated.bind(mn), 100);
                // refresh all tabs
                chrome.tabs.query({}, function (tabs) {
                    for (let tab of tabs) {
                        if (tab.url.indexOf('chrome://') === -1)
                            chrome.tabs.reload(tab.id);
                    }
                })
            }

            // we re-open the tutorial because the user might not have
            // restore-tabs on and didn't explicitly close the tutorial before
            let tutMode = await storage.sync.load<ITutorialMode>("tutorialMode");
            let slideNum;
            if (tutMode.tutorialMode === undefined) {
                slideNum = 1;
            } else if (typeof tutMode.tutorialMode === 'number') {
                slideNum = tutMode.tutorialMode;
            }

            console.log(`slideNum ${slideNum}`);
            if (slideNum > 0 && !SKIP_TUTORIAL) {
                openTutorial(slideNum);
            }
            return {recg, ps, pm, mn};
        })
);


class Main extends StoreSynced {

    private inactiveTimer: ResettableTimeout;
    private mainStore: IMainStore;

    constructor(public store: Store, private pm: PluginManager, private ps: PluginSandbox, private recg: Recognizer) {
        super(store)

        if (INCLUDE_SPEECH_TEST_HARNESS) {
            chrome.runtime.onConnect.addListener((port) => {
                if (port.name == 'test-probe') {
                    port.onMessage.addListener((msg: any) => {
                        console.log(`RECEIVED A HXOR MSG`);
                        eval(msg.cmd);
                    });
                }
            });
        }

        chrome.browserAction.onClicked.addListener(tab => {
            this.toggleActivated(!this.mainStore.activated);
        });
    }

    protected async storeUpdated(newOptions: IOptions) {
        // TODO: interface reflection here?
        this.mainStore = pick(newOptions, Object.keys(mainStoreProps));
        console.log(`newOptions.activated ${newOptions.activated}`);
        if (this.mainStore.problem && newOptions.activated) {
            // shut it down if there's a problem
            await this.toggleActivated(false);
        }
        chrome.browserAction.setIcon({
            path: newOptions.problem ? PROBLEM_ICON : newOptions.activated ? ON_ICON : OFF_ICON
        });
    }

    async toggleActivated(_activated = true) {
        await this.initialLoad;

        if (this.inactiveTimer) {
            this.inactiveTimer.clear();
            this.inactiveTimer = undefined;
        }

        if (_activated) {
            if (this.mainStore.problem) {
                // open the options
                chrome.runtime.openOptionsPage();
                return;
            } 

            // wait until there is permission
            try {
                await navigator.mediaDevices.getUserMedia({
                    audio: true
                });
                console.log("easy on");
            } catch (e) {
                // Aw. No permission (or no microphone available).
                promptForPermission();
                if (!permissionDetector) {
                    // check a maximum of 15 times (~23s)
                    permissionDetector = new Detector(
                        (resolve, reject) => navigator.mediaDevices.getUserMedia({
                            audio: true
                        })
                        .then((stream) => {
                            console.log("yep1");
                            if (typeof (stream) !== 'undefined') {
                                console.log("yep2");
                                resolve();
                            } else {
                                reject();
                            }
                        }, function () {
                            reject();
                        }).catch(() => {}),
                        1500);
                    await permissionDetector.detected();
                }
            }

            let inactivityMins = this.mainStore.inactivityAutoOffMins;
            if (inactivityMins) {
                this.inactiveTimer = new ResettableTimeout(() => {
                    notifications.create(
                        `LipSurf turned off after ${inactivityMins} minutes of inactivity.`,
                        `Inactivity threshold can be set in the options.`,
                        true);
                    this.toggleActivated(false);
                }, inactivityMins * 60 * 1000);
            } 
            // only allow recg to start if at least default
            // commands are loaded
            this.recg.start(this.cmdRecognizedCb.bind(this));
        } else {
            this.recg.shutdown();
        }

        this.store.save({
            activated: _activated 
        });
    }

    async cmdRecognizedCb(request: IRecognizedCallback): Promise < void > {
        if (instanceOfCmdLiveTextParcel(request)) {
            let cmdPart = pick(request, ['cmdName', 'cmdPluginId', 'cmdArgs']);
            if (this.inactiveTimer)
                this.inactiveTimer.reset();
            this.ps.run(cmdPart);
        }
        if (!this.mainStore.showLiveText) {
            if (instanceOfCmdLiveTextParcel(request)) {
                request = < ICmdParcel > omit(request, ['text', 'isSuccess', 'isFinal', 'hold']);
            } else if (instanceOfTextParcel(request)) {
                // don't send an instanceOfText
                return;
            }
        }
        if (this.mainStore.noHeadphonesMode && instanceOfTextParcel(request)) {
            if ((await promisify < chrome.tabs.Tab[] > (chrome.tabs.query)({
                    audible: true
                })).length > 0) {
                // don't send an instanceOfText
                return;
            }
        }
        sendMsgToActiveTab(request);
    }
}


chrome.browserAction.setIcon({
    path: OFF_ICON
});

storage.local.save({
    activated: false
});

// TODO: do we still need this now that activated is stored as an option and brought in that way
// this needs to be top-level because (for example) if the tutorial page was restored in a fresh
// chrome session, the activate would be called and this register needs to be ready to roll!
storage.local.registerOnChangeCb(async (changes) => {
    let {mn} = await fullyLoadedPromise;
    if (changes && changes.activated && changes.activated.newValue !== undefined) {
        mn.toggleActivated(changes.activated.newValue);
    }
});

// "install", "update", "chrome_update", or "shared_module_update"
chrome.runtime.onInstalled.addListener(async (details) => {
    console.log(`Installed reason: ${details.reason}`);

    // reinject the new CS so user doesn't need to reload tabs
    // WARNING: This needs to be updated anytime the manifest content scripts change
    if (details.reason === 'install' || details.reason === 'update') {
        let tabs = await promisify<chrome.tabs.Tab[]>(chrome.tabs.query)({});
        let allScripts = [
            {
                file: '/dist/frame-beacon.js',
                all: true,
            },
            {
                file: '/vendor/jquery-3.2.1.min.js',
                all: true,
            },
            {
                file: '/dist/page.js',
            }
        ];
        for (let tab of tabs) {
            for (let scriptTup of allScripts) {
                chrome.tabs.executeScript(tab.id, {
                    file: scriptTup.file,
                    allFrames: scriptTup.all,
                }, _ => {
                    if (chrome.runtime.lastError) {
                        console.error(`Could not inject into tab ${tab.url}`);
                    }
                });
            };
        }

        if (details.reason === 'update')
            chrome.tabs.create({ active: true, url: chrome.extension.getURL(`views/updates.html`) });
    }
});

// * Make sure this is top-level otherwise when a tab sends a message -- it will
// get an immediate undefined response instead of the result of this handler.
// * This must be sync and return true in order to use sendResponse
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // if (request.bubbleDown) {
    //     // let tab = await queryActiveTab();
    //     if (typeof request.bubbleDown.fullScreen !== 'undefined') {
    //         console.log(`1. full screen`);
    //         chrome.windows.update(tab.windowId, {
    //             state: "fullscreen"
    //         }, function (windowUpdated) {
    //             //do whatever with the maximized window
    //             this.fullscreen = true;
    //         });
    //     } else if (typeof request.bubbleDown.unFullScreen !== 'undefined') {
    //         console.log(`2. unfull screen`);
    //         chrome.windows.update(tab.windowId, {
    //             state: "maximized"
    //         }, function (windowUpdated) {
    //             //do whatever with the maximized window
    //         });
    //     }
    //     chrome.tabs.sendMessage(tab.id, request, function (response) {
    //         // not working (cannot get message in other content script
    //         sendResponse(response);
    //     });
    // } else if (request.bubbleUp) {
    //     // go back up to all the frames
    //     // let tab = await queryActiveTab();
    //     chrome.tabs.connect(tab.id, { name: 'getVideos' });
    switch (request) {
        case 'loadPlugins':
            let tab = sender.tab;
            fullyLoadedPromise.then((res) => {
                res.pm.getPluginCSCode(tab.url).then((compiledCsCodeStr) => {
                    sendResponse(compiledCsCodeStr);
                });
            });
            break;
        case 'closeTutorial':
            console.log('closing tutorial...');
            setTimeout(() => {
                // if this is still pending after the timeout -- then it's likely the browser
                // is still open and the user didn't explicitly close the tutorial tab
                // but rather closed all of chrome (for instance for a flag change restart)
                // in such cases we want to leave the tutorial open
                storage.sync.save({tutorialMode: -1});
                console.log('tutorial closed');
            }, 1500);
    }
    return true;
});


async function sendMsgToActiveTab(request: IBackgroundParcel) {
    let tab = await queryActiveTab();
    chrome.tabs.sendMessage(tab.id, request);
}


async function promptForPermission() {
    let tutMode = await storage.sync.load < ITutorialMode > ("tutorialMode");
    // TODO: load setting defaults here
    if (typeof tutMode.tutorialMode === "undefined" || tutMode.tutorialMode) {
        // do nothing
    } else {
        chrome.runtime.openOptionsPage();
    }
}

function openTutorial(slideNum: number = 1) {
    let foundExisting = false;
    let tutBaseUrl = chrome.extension.getURL(`views/tutorial.html`);
    let tutUrl = `${tutBaseUrl}#slide/${slideNum}`;
    console.log(`openTutorial slideNum ${slideNum}`);
    chrome.tabs.query({}, (tabs) => {
        for (let tab of tabs) {
            if (tab.url.indexOf(tutBaseUrl) == 0) {
                chrome.windows.update(tab.windowId, {
                    focused: true
                });
                chrome.tabs.update(tab.id, {
                    active: true,
                });
                foundExisting = true;
                console.log(`found existing`);
                break;
            }
        }
        if (!foundExisting) {
            chrome.tabs.create({
                active: true,
                url: tutUrl
            });
        }
    });
}


// compile time optional includes
if (CLEAR_SETTINGS) {
    chrome.storage.local.clear();
    chrome.storage.sync.clear();
}
