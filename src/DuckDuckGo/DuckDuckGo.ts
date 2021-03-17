/*
 * LipSurf plugin for DuckDuckGo search
 */
/// <reference types="lipsurf-types/extension"/>
declare const PluginBase: IPluginBase;

export default <IPluginBase & IPlugin>{
  ...PluginBase,
  ...{
    niceName: "DuckDuckGo",
    description: "The duckduckgo search engine.",
    version: "3.11.4",
    match: /.*/,
    homophones: {
      search: "duck",
    },
    authors: "Aparajita Fishman",

    commands: [
      {
        name: "Search",
        description: "Do a duckduckgo search.",
        global: true,
        match: "duck *",
        fn: async (transcript, [rawTs, normTs]: DualTranscript) => {
          chrome.tabs.create({
            url: `https://duckduckgo.com/?q=${rawTs}`,
            active: true,
          });
        },
      },
    ],
  },
};
