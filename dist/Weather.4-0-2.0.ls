import PluginBase from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/plugin-base.js';import ExtensionUtil from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/extension-util.js';var r={en:async u=>{let e=await(await window.fetch(`https://api.accuweather.com/locations/v1/cities/autocomplete?q=${u}&apikey=d41dfd5e8a1748d0970cba6637647d96&language=en-us&get_param=value`)).json(),a=e[0].Key,n=e[0].Country.ID.toLowerCase(),t=e[0].LocalizedName.replace(" ","-");window.location.href=`https://www.accuweather.com/en/${n}/${t}/${a}/weather-forecast/${a}`}};function o(u,e){r[u]=e}var c={...PluginBase,languages:{},niceName:"Weather",match:/.*accuweather\.com/,version:"4.0.2",apiVersion:2,commands:[{name:"Check the Weather",description:"Check the weather for a given city.",global:!0,match:["[weather/forecast] [for/in] *"],pageFn:async(u,e)=>{let a=PluginBase.util.getLanguage(),n=a.substr(0,2),t;return a in r?t=a:n in r?t=n:t="en",r[t](e.preTs)}}]};o("ja",u=>{window.location.href=`https://tenki.jp/search/?keyword=${u}`});c.languages.ja={niceName:"天気",authors:"Hiroki Yamazaki",commands:{"Check the Weather":{name:"天気を調べる",description:"任意の都市の天気を調べます。",match:["てんき[/よほう]*"]}}};o("ru",u=>window.location.href=`https://yandex.ru/pogoda/search?request=${u}`);c.languages.ru={niceName:"Прогноз погоды",commands:{"Check the Weather":{name:"Погода",description:'Узнать прогноз погоды в том или ином городе. Например, "погода минск" (название города не склоняется).',match:"погода *"}}};var i=c;export{i as default};
LS-SPLITallPlugins.Weather=(()=>{var r={en:async e=>{let a=await(await window.fetch(`https://api.accuweather.com/locations/v1/cities/autocomplete?q=${e}&apikey=d41dfd5e8a1748d0970cba6637647d96&language=en-us&get_param=value`)).json(),t=a[0].Key,o=a[0].Country.ID.toLowerCase(),n=a[0].LocalizedName.replace(" ","-");window.location.href=`https://www.accuweather.com/en/${o}/${n}/${t}/weather-forecast/${t}`}};function c(e,a){r[e]=a}return{...PluginBase,commands:{"Check the Weather":{pageFn:async(e,a)=>{let t=PluginBase.util.getLanguage(),o=t.substr(0,2),n;return t in r?n=t:o in r?n=o:n="en",r[n](a.preTs)}}}}})();
LS-SPLITallPlugins.Weather=(()=>{var r={en:async e=>{let a=await(await window.fetch(`https://api.accuweather.com/locations/v1/cities/autocomplete?q=${e}&apikey=d41dfd5e8a1748d0970cba6637647d96&language=en-us&get_param=value`)).json(),t=a[0].Key,o=a[0].Country.ID.toLowerCase(),n=a[0].LocalizedName.replace(" ","-");window.location.href=`https://www.accuweather.com/en/${o}/${n}/${t}/weather-forecast/${t}`}};function c(e,a){r[e]=a}return{...PluginBase,commands:{"Check the Weather":{pageFn:async(e,a)=>{let t=PluginBase.util.getLanguage(),o=t.substr(0,2),n;return t in r?n=t:o in r?n=o:n="en",r[n](a.preTs)}}}}})();
