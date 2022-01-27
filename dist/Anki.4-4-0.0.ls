import PluginBase from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/plugin-base.js';import ExtensionUtil from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/extension-util.js';var e={languages:{},niceName:"Anki",description:"Anki web flashcard functionality.",version:"4.4.0",apiVersion:2,match:[/^https:\/\/ankiweb\.net/,/^https:\/\/ankiuser\.net/],homophones:{"and key":"anki","show insta":"show answer","show enter":"show answer","show cancer":"show answer","should i answer":"show answer","show me answer":"show answer"},authors:"Miko",commands:[{name:"Anki",description:"Go to ankiweb decks page.",match:"anki",global:!0},{name:"Select Answer Difficulty",description:"Select the ease level after seeing the answer.",match:["again","hard","good","easy"]},{name:"Show Answer",description:"Show the other side of the flash card.",match:"show answer"}]};export{e as default};
LS-SPLITallPlugins.Anki=(()=>{var n={...PluginBase,commands:{Anki:{pageFn:async()=>{window.location.href="https://ankiweb.net/decks/"}},"Select Answer Difficulty":{pageFn:async({preTs:a,normTs:e})=>{let t=e.charAt(0).toUpperCase()+e.slice(1);document.evaluate(`//*[@id='easebuts']//button[contains(text(), "${t}")]`,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue.click()}},"Show Answer":{pageFn:async()=>{document.querySelector("#ansbuta").click()}}}};return n})();
LS-SPLITallPlugins.Anki=(()=>{var n={...PluginBase,commands:{Anki:{pageFn:async()=>{window.location.href="https://ankiweb.net/decks/"}}}};return n})();
