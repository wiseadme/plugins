import PluginBase from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/plugin-base.js';import ExtensionUtil from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/extension-util.js';var u={...PluginBase,languages:{},niceName:"Wikipedia",description:"The Wikipedia search engine.",version:"4.0.2",apiVersion:2,match:/.*/,homophones:{wiki:"wikipedia"},authors:"Aparajita Fishman",commands:[{name:"Wikipedia",description:"Do a wikipedia search.",global:!0,match:"wikipedia *",fn:async(a,i)=>{chrome.tabs.create({url:`https://wikipedia.org/w/index.php?search=${encodeURIComponent(i.preTs).replace(/%20/g,"+")}`,active:!0})}}]};u.languages.ru={niceName:"Wikipedia",description:"Поиск по Википедии.",authors:"Hanna",homophones:{википедия:"wikipedia"},commands:{Wikipedia:{name:"Википедия",description:"Выполняет поиск по википедии. Скажите википедия [запрос].",match:["википедия *"]}}};var e=u;export{e as default};
LS-SPLITLS-SPLIT