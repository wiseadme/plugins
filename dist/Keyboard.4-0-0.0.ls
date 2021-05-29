import PluginBase from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/plugin-base.js';import ExtensionUtil from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/extension-util.js';function backendPressKey(codes){const codesArr=[].concat(codes);chrome.runtime.sendMessage({type:"pressKeys",payload:{codes:codesArr,nonChar:!0}});}function pressKey(key,code=0){return backendPressKey(code),!0}var Keyboard={...PluginBase,niceName:"Keyboard",languages:{},description:"For pressing individual keyboard buttons with your voice.",version:"4.0.0",match:/.*/,authors:"Miko",homophones:{pressed:"press",dress:"press","present tab":"press tab"},commands:[{name:"Press Tab",description:"Equivalent of hitting the tab key.",match:"press tab",pageFn:()=>{pressKey(0,9);},test:{"go to next form field":async(t,say,client)=>{await client.url(`${t.context.localPageDomain}/forms.html`),await(await client.$("#simple input")).click(),await say(),t.is(await(await client.$(await client.getActiveElement())).getAttribute("type"),"password");}}},{name:"Press Enter",description:"Equivalent of hitting the enter key.",match:"press enter",pageFn:()=>{pressKey(0,13);},test:{contenteditables:async(t,say,client)=>{await client.url(`${t.context.localPageDomain}/text-input.html`);const editor=await client.$("#editor");await editor.clearValue();const[before,_]=await Promise.all([t.context.getInnerText(client,"#editor"),editor.click()]);await say();const after=await t.context.getInnerText(client,"#editor");t.true(after.includes("\n"),`before: "${before}" after: "${after}"`),t.not(before,after);},"google search":async(t,say,client)=>{await client.url("https://www.google.com"),await say("dictate lipsurf"),await say();const newUrl=await client.getUrl();t.true(newUrl.includes("/search?"),"seems search was not submitted");}}},{name:"Press Down",description:"Equivalent of hitting the down arrow key.",match:"press down",pageFn:()=>{pressKey(0,40);}},{name:"Press Up",description:"Equivalent of hitting the up arrow key.",match:"press up",pageFn:()=>{pressKey(0,38);}},{name:"Press Left",description:"Equivalent of hitting the left arrow key.",match:"press left",pageFn:()=>{pressKey(0,37);}},{name:"Press Right",description:"Equivalent of hitting the right arrow key.",match:"press right",pageFn:()=>{pressKey(0,39);}}]};Keyboard.languages.ja={niceName:"キーボード",description:"キーボードのキーを個別に声で押せます。",authors:"Hiroki Yamazaki, Miko",commands:{"Press Tab":{name:"Tabを押す",description:"Tabキーを押すのと同じ動作をします。",match:"たぶをおす"},"Press Enter":{name:"Enterを押す",description:"Enterキーを押すのと同じ動作をします。",match:"えんたーをおす"},"Press Down":{name:"↓を押す",description:"↓キーを押すのと同じ動作をします。",match:"したをおす"},"Press Up":{name:"↑を押す",description:"↑キーを押すのと同じ動作をします。",match:"うえをおす"},"Press Left":{name:"←を押す",description:"←キーを押すのと同じ動作をします。",match:"ひだりをおす"},"Press Right":{name:"→を押す",description:"→キーを押すのと同じ動作をします。",match:"みぎをおす"}}};

export default Keyboard;
export { backendPressKey };LS-SPLITallPlugins.Keyboard = (() => { function pressKey(key,code=0){return function(codes){const codesArr=[].concat(codes);chrome.runtime.sendMessage({type:"pressKeys",payload:{codes:codesArr,nonChar:!0}});}(code),!0}var Keyboard={...PluginBase,commands:{"Press Tab":{pageFn:()=>{pressKey(0,9);}},"Press Enter":{pageFn:()=>{pressKey(0,13);}},"Press Down":{pageFn:()=>{pressKey(0,40);}},"Press Up":{pageFn:()=>{pressKey(0,38);}},"Press Left":{pageFn:()=>{pressKey(0,37);}},"Press Right":{pageFn:()=>{pressKey(0,39);}}}};

return Keyboard;
 })()LS-SPLIT