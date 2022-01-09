import{r as o,o as c,c as i,a as n,b as e,w as l,F as r,d as s,e as p}from"./app.2bad79ab.js";import{_ as u}from"./plugin-vue_export-helper.21dcd24c.js";var d="/assets/plugin-supported-langs.d58a75e9.png",h="/assets/lang-option.a0a2595c.png";const _={},g=n("h1",{id:"internationalization",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#internationalization","aria-hidden":"true"},"#"),s(" Internationalization")],-1),m=n("p",null,[n("em",null,"LipSurf was designed from the ground-up with multi-language support in mind.")],-1),k=n("p",null,"LipSurf uses the built-in HTML5 speech-recognizer, hence it supports all of the languages that the Google speech recognizer does, in theory.",-1),b={class:"custom-container tip"},f=n("p",{class:"custom-container-title"},"TIP",-1),w=s("For a list of supported languages see here: "),x={href:"https://cloud.google.com/speech-to-text/docs/languages",target:"_blank",rel:"noopener noreferrer"},y=s("https://cloud.google.com/speech-to-text/docs/languages"),v=n("p",null,"The base language is English, but any plugin can have its metadata and match phrases/functions adjusted to be compatible with other languages.",-1),q=n("p",null,"The languages that a given plugin supports are shown in the options.",-1),H=n("p",null,[n("img",{src:d,alt:"Screenshot of plugin's supported languages"})],-1),W=n("p",null,"Once a user has at least one plugin installed that supports a given language, they can switch to that language in the general options.",-1),z=n("p",null,[n("img",{src:h,alt:"Screenshot of language selection in the options"})],-1),j=n("h2",{id:"example",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#example","aria-hidden":"true"},"#"),s(" Example")],-1),L=s("Let's localize the "),I=s("hello world plugin"),S=s(" from the quick start guide earlier."),E=s("Create a new file "),N=n("code",null,"HelloWorld.ja.ts",-1),T=s(" in the "),C=n("code",null,"HelloWorld",-1),V=s(" folder where in this case "),B=n("code",null,"ja",-1),F=s(" is the "),O={href:"https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes",target:"_blank",rel:"noopener noreferrer"},P=s("ISO 639-1"),R=s(" language code for Japanese, what we're localizing for in this example."),G=n("li",null,[n("p",null,"Import the English (base) plugin so we can reference it and extend it's language property.")],-1),A=p(`<div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">/// lipsurf-plugins/src/HelloWorld/HelloWorld.ja.ts</span>
<span class="token comment">/// &lt;reference types=&quot;@lipsurf/types/extension&quot;/&gt;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&#39;./HelloWorld&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="3"><li>Set <code>Plugin.languages!.ja</code> to the localizeable things.</li></ol><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p><code>Plugin.languages</code> needs a non-null assertion operator.</p></div><p>You can localize all the things that make sense to: nice names (the pretty ones\u{1F33C}), descriptions, match patterns etc.</p>`,4),J=s("The "),M=n("code",null,"commands",-1),Y=s(" property should be an object with keys of command names that map to the English command names they localize and of type "),D=n("code",null,"ILocalizedCommand",-1),K=s(")."),Q=p(`<div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// lipsurf-plugins/src/HelloWorld/HelloWorld.ja.ts</span>
<span class="token comment">/// &lt;reference types=&quot;@lipsurf/types/extension&quot;/&gt;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;./HelloWorld&quot;</span><span class="token punctuation">;</span>

HelloWorld<span class="token punctuation">.</span>languages<span class="token operator">!</span><span class="token punctuation">.</span>ja <span class="token operator">=</span> <span class="token punctuation">{</span>
  niceName<span class="token operator">:</span> <span class="token string">&quot;\u4E16\u754C\u306E\u3054\u6848\u5185&quot;</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">&quot;\u975E\u5E38\u306B\u5358\u7D14\u306E\u30D7\u30E9\u30B0\u30A4\u30F3&quot;</span><span class="token punctuation">,</span>
  commands<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;Hello World&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      name<span class="token operator">:</span> <span class="token string">&quot;\u30CF\u30ED\u30FC\u30FB\u30EF\u30FC\u30EB\u30C9&quot;</span><span class="token punctuation">,</span>
      match<span class="token operator">:</span> <span class="token string">&quot;\u306F\u308D\u30FC\u308F\u30FC\u308B\u3069&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,1);function U(X,Z){const a=o("ExternalLinkIcon"),t=o("RouterLink");return c(),i(r,null,[g,m,k,n("div",b,[f,n("p",null,[w,n("a",x,[y,e(a)])])]),v,q,H,W,z,j,n("p",null,[L,e(t,{to:"/quick-start.html#hello-world-plugin"},{default:l(()=>[I]),_:1}),S]),n("ol",null,[n("li",null,[n("p",null,[E,N,T,C,V,B,F,n("a",O,[P,e(a)]),R])]),G]),A,n("p",null,[J,M,Y,e(t,{to:"/api-reference/command.html#ilocalizedcommand"},{default:l(()=>[D]),_:1}),K]),Q],64)}var sn=u(_,[["render",U]]);export{sn as default};
