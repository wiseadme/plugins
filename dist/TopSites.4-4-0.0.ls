import PluginBase from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/plugin-base.js';import ExtensionUtil from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/extension-util.js';// dist/tmp/TopSites/TopSites.js
var TopSites_default = { "languages": { "ja": { "niceName": "トップサイト", "description": "人気のウェブサイトへのショートカットです。", "authors": "Miko, Hanna, Hiroki Yamazaki", "commands": { "Youtube": { "name": "Youtube", "match": ["ゆーちゅーぶ", "youtube"] }, "Wikipedia": { "name": "Wikipedia", "match": ["うぃきぺでぃあ", "wikipedia"] }, "Facebook": { "name": "Facebook", "match": ["ふぇいすぶっく", "ふぇーすぶっく", "facebook"] }, "Twitter": { "name": "Twitter", "match": ["ついったー", "twitter"] }, "Instagram": { "name": "Instagram", "match": ["いんすたぐらむ", "いんすた", "instagram"] }, "Amazon": { "name": "Amazon", "match": ["あまぞん", "amazon"] }, "Ebay": { "name": "Ebay", "match": ["いーべい", "いーべー", "ebay"] }, "VK": { "name": "VK", "match": ["ぶいけー", "vk"] }, "Netflix": { "name": "Netflix", "match": ["ねっとふりっくす", "ねふり", "netflix"] }, "Twitch": { "name": "Twitch", "match": ["ついっち", "twitch"] }, "New York Times": { "name": "New York Times", "match": ["にゅーよーくたいむず", "にゅーよーくたいむす", "new york times"] }, "Github": { "name": "Github", "match": ["ぎっとはぶ", "github"] }, "Hacker News": { "name": "Hacker News", "match": ["はっかーにゅーす", "hacker news"] }, "Product Hunt": { "name": "Product Hunt", "match": ["ぷろだくとはんと", "product hunt"] } } }, "ru": { "niceName": "Популярные сайты", "description": "Комманды для перехода на популярные сайты", "homophones": {}, "authors": "Hanna", "commands": { "Youtube": { "name": "Youtube", "match": ["ютюб", "youtube"] }, "Wikipedia": { "name": "Wikipedia", "match": ["википедия", "wikipedia"] }, "Facebook": { "name": "Facebook", "match": ["фэйсбук", "facebook"] }, "Twitter": { "name": "Twitter", "match": ["твиттер", "twitter"] }, "Instagram": { "name": "Instagram", "match": ["инстаграм", "instagram"] }, "Amazon": { "name": "Amazon", "match": ["амазон", "amazon"] }, "Ebay": { "name": "Ebay", "match": ["ебэй", "ибэй", "ebay"] }, "VK": { "name": "Вконтакте", "match": ["вконтакте", "вк"] }, "Netflix": { "name": "Netflix", "match": ["нэтфликс", "нетфликс", "netflix"] }, "Twitch": { "name": "Twitch", "match": ["твич", "twitch"] }, "New York Times": { "name": "New York Times", "match": ["нью йорк таймс", "ньюйорк таймс", "new york times"] }, "Github": { "name": "Github", "match": ["гитхаб", "github"] }, "Hacker News": { "name": "Hacker News", "match": ["хакер ньюз", "уай комбинатор", "уай комбинэтор", "hacker news", "y combinator"] }, "Product Hunt": { "name": "Product Hunt", "match": ["продакт хант", "product hunt"] } } } }, "niceName": "Top Sites", "description": "Shortcuts for going to popular websites.", "version": "4.4.0", "apiVersion": 2, "match": /.*/, "authors": "Miko", "commands": [{ "name": "YouTube", "global": true, "match": "youtube", "nice": "YouTube", "minConfidence": 0.5 }, { "name": "Wikipedia", "global": true, "match": "wikipedia" }, { "name": "Facebook", "global": true, "match": "facebook" }, { "name": "Twitter", "global": true, "match": "twitter" }, { "name": "Instagram", "global": true, "match": "instagram" }, { "name": "Amazon", "global": true, "match": "amazon" }, { "name": "Ebay", "global": true, "match": "ebay" }, { "name": "VK", "global": true, "match": "vk", "minConfidence": 0.5 }, { "name": "Netflix", "global": true, "match": "netflix", "minConfidence": 0.5 }, { "name": "Twitch", "global": true, "match": "twitch" }, { "name": "New York Times", "global": true, "match": "new york times" }, { "name": "Github", "global": true, "match": "github", "onlyFinal": true }, { "name": "Product Hunt", "global": true, "match": "product hunt" }] };
export {
  TopSites_default as default
};
LS-SPLIT// dist/tmp/TopSites/TopSites.js
allPlugins.TopSites = (() => {
  var TopSites_default = { ...PluginBase, ...{ "commands": { "YouTube": { "pageFn": () => {
    window.location.href = "https://www.youtube.com/";
  } }, "Wikipedia": { "pageFn": () => {
    window.location.href = "https://www.wikipedia.org/";
  } }, "Facebook": { "pageFn": () => {
    window.location.href = "https://www.facebook.com/";
  } }, "Twitter": { "pageFn": () => {
    window.location.href = "https://twitter.com/";
  } }, "Instagram": { "pageFn": () => {
    window.location.href = "https://www.instagram.com/";
  } }, "Amazon": { "pageFn": () => {
    window.location.href = "https://www.amazon.com/";
  } }, "Ebay": { "pageFn": () => {
    window.location.href = "https://www.ebay.com/";
  } }, "VK": { "pageFn": () => {
    window.location.href = "https://vk.com";
  } }, "Netflix": { "pageFn": () => {
    window.location.href = "https://www.netflix.com";
  } }, "Twitch": { "pageFn": () => {
    window.location.href = "https://twitch.tv";
  } }, "New York Times": { "pageFn": () => {
    window.location.href = "https://www.nytimes.com";
  } }, "Github": { "pageFn": () => {
    window.location.href = "https://github.com/";
  } }, "Product Hunt": { "pageFn": () => {
    window.location.href = "https://www.producthunt.com";
  } } } } };
  return TopSites_default;
})();
LS-SPLIT// dist/tmp/TopSites/TopSites.js
allPlugins.TopSites = (() => {
  var TopSites_default = { ...PluginBase, ...{ "commands": { "YouTube": { "pageFn": () => {
    window.location.href = "https://www.youtube.com/";
  } }, "Wikipedia": { "pageFn": () => {
    window.location.href = "https://www.wikipedia.org/";
  } }, "Facebook": { "pageFn": () => {
    window.location.href = "https://www.facebook.com/";
  } }, "Twitter": { "pageFn": () => {
    window.location.href = "https://twitter.com/";
  } }, "Instagram": { "pageFn": () => {
    window.location.href = "https://www.instagram.com/";
  } }, "Amazon": { "pageFn": () => {
    window.location.href = "https://www.amazon.com/";
  } }, "Ebay": { "pageFn": () => {
    window.location.href = "https://www.ebay.com/";
  } }, "VK": { "pageFn": () => {
    window.location.href = "https://vk.com";
  } }, "Netflix": { "pageFn": () => {
    window.location.href = "https://www.netflix.com";
  } }, "Twitch": { "pageFn": () => {
    window.location.href = "https://twitch.tv";
  } }, "New York Times": { "pageFn": () => {
    window.location.href = "https://www.nytimes.com";
  } }, "Github": { "pageFn": () => {
    window.location.href = "https://github.com/";
  } }, "Product Hunt": { "pageFn": () => {
    window.location.href = "https://www.producthunt.com";
  } } } } };
  return TopSites_default;
})();
