function t(t,e,s,i){var r,n=arguments.length,a=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,s,i);else for(var o=t.length-1;o>=0;o--)(r=t[o])&&(a=(n<3?r(a):n>3?r(e,s,a):r(e,s))||a);return n>3&&a&&Object.defineProperty(e,s,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},o=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:d,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,v=f?f.emptyScript:"",g=m.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!d(t,e),_={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??b)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,g?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const E=globalThis,S=t=>t,A=E.trustedTypes,x=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,D="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,O=`<${k}>`,H=document,P=()=>H.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,T="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,I=/>/g,z=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,K=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,G=H.createTreeWalker(H,129);function F(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const Y=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",a=U;for(let e=0;e<s;e++){const s=t[e];let o,d,c=-1,l=0;for(;l<s.length&&(a.lastIndex=l,d=a.exec(s),null!==d);)l=a.lastIndex,a===U?"!--"===d[1]?a=R:void 0!==d[1]?a=I:void 0!==d[2]?(j.test(d[2])&&(r=RegExp("</"+d[2],"g")),a=z):void 0!==d[3]&&(a=z):a===z?">"===d[0]?(a=r??U,c=-1):void 0===d[1]?c=-2:(c=a.lastIndex-d[2].length,o=d[1],a=void 0===d[3]?z:'"'===d[3]?L:B):a===L||a===B?a=z:a===R||a===I?a=U:(a=z,r=void 0);const h=a===z&&t[e+1].startsWith("/>")?" ":"";n+=a===U?s+O:c>=0?(i.push(o),s.slice(0,c)+D+s.slice(c)+C+h):s+C+(-2===c?e:h)}return[F(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const a=t.length-1,o=this.parts,[d,c]=Y(t,e);if(this.el=J.createElement(d,s),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&o.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(D)){const e=c[n++],s=i.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:r,name:a[2],strings:s,ctor:"."===a[1]?et:"?"===a[1]?st:"@"===a[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(C)&&(o.push({type:6,index:r}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],P()),G.nextNode(),o.push({type:2,index:++r});i.append(t[e],P())}}}else if(8===i.nodeType)if(i.data===k)o.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)o.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const s=H.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===W)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=N(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??H).importNode(e,!0);G.currentNode=i;let r=G.nextNode(),n=0,a=0,o=s[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new X(r,r.nextSibling,this,t):1===o.type?e=new o.ctor(r,o.name,o.strings,this,t):6===o.type&&(e=new rt(r,this,t)),this._$AV.push(e),o=s[++a]}n!==o?.index&&(r=G.nextNode(),n++)}return G.currentNode=H,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),N(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(F(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new X(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=Z(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let a,o;for(t=r[0],a=0;a<r.length-1;a++)o=Z(this,i[s+a],e,a),o===W&&(o=this._$AH[a]),n||=!N(o)||o!==this._$AH[a],o===q?t=q:t!==q&&(t+=(o??"")+r[a+1]),this._$AH[a]=o}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends tt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=E.litHtmlPolyfillSupport;nt?.(J,X),(E.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;class ot extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new X(e.insertBefore(P(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ot._$litElement$=!0,ot.finalized=!0,at.litElementHydrateSupport?.({LitElement:ot});const dt=at.litElementPolyfillSupport;dt?.({LitElement:ot}),(at.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:b},ht=(t=lt,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ut(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function pt(t){return ut({...t,state:!0,attribute:!1})}const mt="0.2.0",ft="ha-calendar-card",vt=["calendar.family","calendar.personal","calendar.work"];function gt(t){if(t)return"string"==typeof t?t:"dateTime"in t&&t.dateTime?t.dateTime:"date"in t&&t.date?t.date:void 0}function yt(t,e){const s=gt(t.start),i=gt(t.end);if(!s||!i)return null;const r=t.rrule??void 0;return{uid:t.uid??`${e}:${s}:${t.summary??"event"}`,summary:t.summary??"(no title)",description:t.description??void 0,location:t.location??void 0,start:s,end:i,all_day:t.all_day??(n=t.start,n&&"string"!=typeof n?Boolean(n.date&&!n.dateTime):Boolean(n&&/^\d{4}-\d{2}-\d{2}$/.test(n))),calendar:e,recurring:Boolean(r||t.recurrence_id),rrule:r,recurrence_id:t.recurrence_id??void 0};var n}function $t(t){return{summary:t.summary,description:t.description??"",location:t.location??"",dtstart:t.all_day?t.start.slice(0,10):t.start,dtend:t.all_day?t.end.slice(0,10):t.end}}class bt{constructor(t){this.hass=t}listCalendarEntities(t){return t?.length?t:Object.keys(this.hass.states).filter(t=>t.startsWith("calendar.")).sort()}async getEvents(t,e,s){const i=[],r=[];let n=!1;for(const a of t)try{const t=await this.fetchEntityEvents(a,e,s);n=!0,i.push(...t)}catch(t){r.push(a),console.warn(`[ha-calendar-card] failed to load ${a}:`,t instanceof Error?t.message:t)}return{events:i,errors:r,anySuccess:n}}async fetchEntityEvents(t,e,s){if(this.hass.callApi)try{const i=`?start=${encodeURIComponent(e.toISOString())}&end=${encodeURIComponent(s.toISOString())}`;return(await this.hass.callApi("GET",`calendars/${t}${i}`)??[]).map(e=>yt(e,t)).filter(t=>null!==t)}catch{}const i=await this.hass.callService("calendar","get_events",{entity_id:t,start_date_time:e.toISOString(),end_date_time:s.toISOString()},void 0,void 0,!0);let r;if(i&&"object"==typeof i){const t=i;r=t.response&&"object"==typeof t.response?t.response:t}return(r?.[t]?.events??[]).map(e=>yt(e,t)).filter(t=>null!==t)}async createEvent(t){try{await this.hass.callWS({type:"calendar/event/create",entity_id:t.calendar,event:$t(t)})}catch(e){try{await this.hass.callService("calendar","create_event",{entity_id:t.calendar,summary:t.summary,description:t.description??"",location:t.location??"",start_date_time:t.all_day?void 0:t.start,end_date_time:t.all_day?void 0:t.end,start_date:t.all_day?t.start.slice(0,10):void 0,end_date:t.all_day?t.end.slice(0,10):void 0})}catch{throw e instanceof Error?e:new Error(String(e))}}const e=await this.findCreatedEvent(t);return{uid:e?.uid}}async findCreatedEvent(t){const e=new Date(t.start),s=new Date(t.end),i=new Date(e.getTime()-6e4),r=new Date(s.getTime()+6e4);try{const{events:s}=await this.getEvents([t.calendar],i,r);return s.find(e=>function(t,e){return t.summary===e.summary&&t.start===e.start&&t.end===e.end}(e,{summary:t.summary,start:t.all_day?t.start.slice(0,10):t.start,end:t.all_day?t.end.slice(0,10):t.end}))??s.find(s=>s.summary===t.summary&&Math.abs(new Date(s.start).getTime()-e.getTime())<12e4)??null}catch{return null}}async updateEvent(t,e,s,i){try{return void await this.hass.callWS({type:"calendar/event/update",entity_id:t,uid:e,recurrence_id:i,event:$t(s)})}catch(i){try{await this.hass.callService("calendar","update_event",{entity_id:t,uid:e,summary:s.summary,description:s.description,location:s.location,start_date_time:s.all_day?void 0:s.start,end_date_time:s.all_day?void 0:s.end})}catch{throw i instanceof Error?i:new Error(String(i))}}}async deleteEvent(t,e,s){try{return void await this.hass.callWS({type:"calendar/event/delete",entity_id:t,uid:e,recurrence_id:s})}catch(s){try{await this.hass.callService("calendar","delete_event",{entity_id:t,uid:e})}catch{throw s instanceof Error?s:new Error(String(s))}}}async moveEventToCalendar(t,e,s){if(t.recurring||t.rrule)return{status:"blocked_recurring",reason:"Moving recurring events is disabled in phase 1 — change calendars only for one-off events."};if(t.calendar===e)return{status:"moved",newUid:t.uid};const i={summary:s?.summary??t.summary,description:s?.description??t.description,location:s?.location??t.location,start:s?.start??t.start,end:s?.end??t.end,all_day:s?.all_day??t.all_day,calendar:e};let r;try{if(r=(await this.createEvent(i)).uid,!r){const t=await this.findCreatedEvent(i);r=t?.uid}if(!r)return{status:"create_failed",error:"Created on target calendar but could not confirm the new event id — source left untouched."}}catch(t){return{status:"create_failed",error:t instanceof Error?t.message:String(t)}}try{return await this.deleteEvent(t.calendar,t.uid,t.recurrence_id),{status:"moved",newUid:r}}catch(s){const i={entityId:t.calendar,uid:t.uid,summary:t.summary,targetCalendar:e,newUid:r};return{status:"delete_failed",newUid:r,error:s instanceof Error?s.message:String(s),duplicate:!0,pending:i}}}}const _t=a`
  :host {
    --hac-bg: #e8f0f4;
    --hac-bg-deep: #d2e3eb;
    --hac-ink: #1a2b33;
    --hac-muted: #5a7380;
    --hac-accent: #0d7a6f;
    --hac-accent-soft: #b8e0da;
    --hac-line: rgba(26, 43, 51, 0.12);
    --hac-event: #1f6b8a;
    --hac-event-text: #f5fbfd;
    --hac-danger: #9b2c2c;
    --hac-surface: rgba(255, 255, 255, 0.72);
    --hac-radius: 10px;
    --hac-font-display: "Fraunces", "Iowan Old Style", "Palatino Linotype",
      Palatino, serif;
    --hac-font-body: "Source Sans 3", "Source Sans Pro", "Segoe UI",
      sans-serif;
    display: block;
    font-family: var(--hac-font-body);
    color: var(--hac-ink);
    background: linear-gradient(
      165deg,
      var(--hac-bg) 0%,
      var(--hac-bg-deep) 55%,
      #c5d8e2 100%
    );
    border-radius: var(--hac-radius);
    overflow: hidden;
    min-height: 420px;
  }

  .shell {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 420px;
  }

  header.toolbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--hac-line);
    background: var(--hac-surface);
    backdrop-filter: blur(8px);
  }

  .brand {
    font-family: var(--hac-font-display);
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 0;
    flex: 1;
  }

  .view-toggle {
    display: inline-flex;
    gap: 0;
    border: 1px solid var(--hac-line);
    border-radius: 8px;
    overflow: hidden;
  }

  .view-toggle button {
    font: inherit;
    border: 0;
    background: transparent;
    color: var(--hac-muted);
    padding: 0.35rem 0.75rem;
    cursor: pointer;
  }

  .view-toggle button[aria-pressed="true"] {
    background: var(--hac-accent);
    color: #fff;
  }

  .nav-btn,
  .primary-btn {
    font: inherit;
    border: 1px solid var(--hac-line);
    background: #fff;
    color: var(--hac-ink);
    padding: 0.35rem 0.7rem;
    border-radius: 8px;
    cursor: pointer;
  }

  .primary-btn {
    background: var(--hac-accent);
    border-color: var(--hac-accent);
    color: #fff;
  }

  .grid-wrap {
    flex: 1;
    overflow: auto;
    position: relative;
  }

  .status {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    color: var(--hac-muted);
    border-top: 1px solid var(--hac-line);
    background: var(--hac-surface);
  }

  .status[data-kind="error"] {
    color: var(--hac-danger);
  }

  .status[data-kind="warn"] {
    color: #8a5a00;
  }

  .banner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.75rem;
    padding: 0.65rem 1rem;
    background: #fff6e8;
    border-bottom: 1px solid rgba(138, 90, 0, 0.25);
    color: #5c3d00;
    font-size: 0.85rem;
  }

  .banner button {
    font: inherit;
    border: 1px solid rgba(138, 90, 0, 0.35);
    background: #fff;
    color: #5c3d00;
    border-radius: 8px;
    padding: 0.3rem 0.65rem;
    cursor: pointer;
  }

  .banner button.danger {
    background: var(--hac-danger);
    border-color: var(--hac-danger);
    color: #fff;
  }

  .empty-hint {
    position: absolute;
    inset: 3rem 1rem auto;
    text-align: center;
    color: var(--hac-muted);
    font-size: 0.9rem;
    pointer-events: none;
  }
`,wt=a`
  .time-grid {
    display: grid;
    min-width: 100%;
    position: relative;
  }

  .time-grid[data-mode="day"] {
    grid-template-columns: 3.5rem 1fr;
  }

  .time-grid[data-mode="week"] {
    grid-template-columns: 3.5rem repeat(7, minmax(4.5rem, 1fr));
  }

  .corner,
  .day-head {
    position: sticky;
    top: 0;
    z-index: 2;
    background: rgba(232, 240, 244, 0.95);
    border-bottom: 1px solid var(--hac-line);
    padding: 0.5rem 0.35rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
  }

  .corner {
    left: 0;
    z-index: 3;
  }

  .hours {
    display: flex;
    flex-direction: column;
  }

  .hour-label {
    height: var(--hac-hour-height, 56px);
    font-size: 0.7rem;
    color: var(--hac-muted);
    text-align: right;
    padding-right: 0.4rem;
    border-right: 1px solid var(--hac-line);
    box-sizing: border-box;
  }

  .day-col {
    position: relative;
    border-left: 1px solid var(--hac-line);
  }

  .hour-line {
    height: var(--hac-hour-height, 56px);
    box-sizing: border-box;
    border-bottom: 1px dashed var(--hac-line);
  }

  .event-block {
    position: absolute;
    left: 3px;
    right: 3px;
    background: var(--hac-event);
    color: var(--hac-event-text);
    border-radius: 6px;
    padding: 0.2rem 0.35rem;
    font-size: 0.75rem;
    line-height: 1.2;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
    transition: transform 120ms ease, box-shadow 120ms ease;
  }

  .event-block:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(26, 43, 51, 0.18);
  }

  .event-block .cal-tag {
    display: block;
    opacity: 0.8;
    font-size: 0.65rem;
  }
`,Et=a`
  .form-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(26, 43, 51, 0.35);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 10;
    animation: fade-in 160ms ease;
  }

  @media (min-width: 640px) {
    .form-backdrop {
      align-items: center;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .form-panel {
    width: min(420px, 100%);
    background: #fff;
    border-radius: 12px 12px 0 0;
    padding: 1rem 1.1rem 1.25rem;
    box-shadow: 0 -8px 30px rgba(26, 43, 51, 0.2);
    animation: slide-up 200ms ease;
  }

  @media (min-width: 640px) {
    .form-panel {
      border-radius: 12px;
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(12px);
      opacity: 0.6;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .form-panel h2 {
    font-family: var(--hac-font-display);
    font-size: 1.2rem;
    margin: 0 0 0.75rem;
  }

  label {
    display: block;
    font-size: 0.75rem;
    color: var(--hac-muted);
    margin: 0.55rem 0 0.2rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    padding: 0.45rem 0.55rem;
    border: 1px solid var(--hac-line);
    border-radius: 8px;
    background: #f7fafb;
    color: var(--hac-ink);
  }

  textarea {
    min-height: 4rem;
    resize: vertical;
  }

  .form-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .hint {
    font-size: 0.75rem;
    color: var(--hac-muted);
    margin-top: 0.6rem;
  }

  .hint.warn {
    color: #8a5a00;
  }
`;function St(t,e){const s=new Date(t);return s.setDate(s.getDate()+e),s}function At(t){if(/^\d{4}-\d{2}-\d{2}$/.test(t)){const[e,s,i]=t.split("-").map(Number);return new Date(e,s-1,i)}return new Date(t)}let xt=class extends ot{constructor(){super(...arguments),this.mode="week",this.anchorDate=new Date,this.events=[],this.dayStartHour=6,this.dayEndHour=22}get days(){const t=function(t){const e=new Date(t);return e.setHours(0,0,0,0),e}(this.anchorDate);if("day"===this.mode)return[t];const e=(t.getDay()+6)%7,s=St(t,-e);return Array.from({length:7},(t,e)=>St(s,e))}get hours(){const t=[];for(let e=this.dayStartHour;e<this.dayEndHour;e++)t.push(e);return t}eventStyle(t,e){const s=At(t.start),i=At(t.end),r=new Date(e);r.setHours(this.dayStartHour,0,0,0);const n=new Date(e);if(n.setHours(this.dayEndHour,0,0,0),i<=r||s>=n)return null;const a=s<r?r:s,o=i>n?n:i;return`top:${(60*(a.getHours()-this.dayStartHour)+a.getMinutes())/60*56}px;height:${Math.max(20,(o.getTime()-a.getTime())/6e4)/60*56}px;`}onEventClick(t){this.dispatchEvent(new CustomEvent("event-select",{detail:t,bubbles:!0,composed:!0}))}onSlotDblClick(t,e){const s=new Date(t);s.setHours(e,0,0,0);const i=new Date(s);i.setHours(e+1,0,0,0),this.dispatchEvent(new CustomEvent("slot-create",{detail:{start:s,end:i},bubbles:!0,composed:!0}))}render(){const t=this.hours,e=this.days,s=56*t.length;return K`
      <div
        class="time-grid"
        data-mode=${this.mode}
        style="--hac-hour-height:${56}px"
      >
        <div class="corner"></div>
        ${e.map(t=>K`
            <div class="day-head">
              ${t.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}
            </div>
          `)}

        <div class="hours" style="height:${s}px">
          ${t.map(t=>K`<div class="hour-label">${String(t).padStart(2,"0")}:00</div>`)}
        </div>

        ${e.map(e=>K`
            <div
              class="day-col"
              style="height:${s}px"
              @dblclick=${t=>{const s=t.currentTarget.getBoundingClientRect(),i=t.clientY-s.top,r=this.dayStartHour+Math.floor(i/56);this.onSlotDblClick(e,r)}}
            >
              ${t.map(()=>K`<div class="hour-line"></div>`)}
              ${this.events.map(t=>{const s=this.eventStyle(t,e);if(!s)return q;const i=t.calendar.replace(/^calendar\./,"");return K`
                  <div
                    class="event-block"
                    style=${s}
                    @click=${e=>{e.stopPropagation(),this.onEventClick(t)}}
                  >
                    <strong>${t.summary}</strong>
                    <span class="cal-tag">${i}</span>
                  </div>
                `})}
            </div>
          `)}
      </div>
    `}};xt.styles=wt,t([ut({attribute:!1})],xt.prototype,"mode",void 0),t([ut({attribute:!1})],xt.prototype,"anchorDate",void 0),t([ut({attribute:!1})],xt.prototype,"events",void 0),t([ut({type:Number})],xt.prototype,"dayStartHour",void 0),t([ut({type:Number})],xt.prototype,"dayEndHour",void 0),xt=t([ct("hac-time-grid")],xt);let Dt=class extends ot{constructor(){super(...arguments),this.calendars=[],this.event=null,this.defaults={},this.busy=!1,this.errorMessage="",this.summary="",this.description="",this.location="",this.start="",this.end="",this.calendar="",this.moveNote=""}connectedCallback(){super.connectedCallback(),this.hydrate()}updated(t){(t.has("event")||t.has("defaults")||t.has("calendars"))&&this.hydrate()}hydrate(){this.event?(this.summary=this.event.summary,this.description=this.event.description??"",this.location=this.event.location??"",this.start=this.toLocalInput(this.event.start),this.end=this.toLocalInput(this.event.end),this.calendar=this.event.calendar):(this.summary="",this.description="",this.location="",this.start=this.toLocalInput(this.defaults.start??(new Date).toISOString()),this.end=this.toLocalInput(this.defaults.end??new Date(Date.now()+36e5).toISOString()),this.calendar=this.defaults.calendar??this.calendars[0]??"calendar.family"),this.moveNote=""}toLocalInput(t){const e=/^\d{4}-\d{2}-\d{2}$/.test(t)?new Date(`${t}T09:00:00`):new Date(t);if(Number.isNaN(e.getTime()))return"";const s=t=>String(t).padStart(2,"0");return`${e.getFullYear()}-${s(e.getMonth()+1)}-${s(e.getDate())}T${s(e.getHours())}:${s(e.getMinutes())}`}fromLocalInput(t){return new Date(t).toISOString()}get isRecurring(){return Boolean(this.event?.recurring||this.event?.rrule)}get calendarMoveBlocked(){return this.isRecurring&&Boolean(this.event)&&this.calendar!==this.event.calendar}onCalendarChange(t){const e=t.target.value;this.calendar=e,this.event&&e!==this.event.calendar?this.isRecurring?this.moveNote="Recurring events cannot change calendars yet (phase 1). Keep the original calendar or recreate as a one-off.":this.moveNote="Calendar change uses create-on-new then delete-from-old so the event is never lost first.":this.moveNote=""}close(){this.busy||this.dispatchEvent(new CustomEvent("form-cancel",{bubbles:!0,composed:!0}))}save(){if(this.busy)return;if(!(this.summary.trim()&&this.start&&this.end&&this.calendar))return;if(this.calendarMoveBlocked)return;const t={summary:this.summary.trim(),description:this.description.trim()||void 0,location:this.location.trim()||void 0,start:this.fromLocalInput(this.start),end:this.fromLocalInput(this.end),calendar:this.calendar},e={mode:this.event?"edit":"create",input:t,original:this.event??void 0};this.dispatchEvent(new CustomEvent("form-save",{detail:e,bubbles:!0,composed:!0}))}render(){const t=this.event?"Edit event":"New event";return K`
      <div class="form-backdrop" @click=${this.close}>
        <div
          class="form-panel"
          @click=${t=>t.stopPropagation()}
          role="dialog"
          aria-label=${t}
        >
          <h2>${t}</h2>

          <label for="summary">Title</label>
          <input
            id="summary"
            .value=${this.summary}
            ?disabled=${this.busy}
            @input=${t=>{this.summary=t.target.value}}
          />

          <label for="calendar">Calendar</label>
          <select
            id="calendar"
            .value=${this.calendar}
            ?disabled=${this.busy}
            @change=${this.onCalendarChange}
          >
            ${this.calendars.map(t=>K`<option value=${t}>${t}</option>`)}
          </select>

          <label for="start">Start</label>
          <input
            id="start"
            type="datetime-local"
            .value=${this.start}
            ?disabled=${this.busy}
            @input=${t=>{this.start=t.target.value}}
          />

          <label for="end">End</label>
          <input
            id="end"
            type="datetime-local"
            .value=${this.end}
            ?disabled=${this.busy}
            @input=${t=>{this.end=t.target.value}}
          />

          <label for="location">Location</label>
          <input
            id="location"
            .value=${this.location}
            ?disabled=${this.busy}
            @input=${t=>{this.location=t.target.value}}
          />

          <label for="description">Notes</label>
          <textarea
            id="description"
            .value=${this.description}
            ?disabled=${this.busy}
            @input=${t=>{this.description=t.target.value}}
          ></textarea>

          ${this.isRecurring?K`<p class="hint warn">
                This is a recurring event. Same-calendar edits are sent to HA;
                changing calendars is blocked until recurring moves are designed.
              </p>`:null}
          ${this.moveNote?K`<p class="hint ${this.calendarMoveBlocked?"warn":""}">
                ${this.moveNote}
              </p>`:null}
          ${this.errorMessage?K`<p class="hint warn" role="alert">${this.errorMessage}</p>`:null}

          <div class="form-actions">
            <button type="button" ?disabled=${this.busy} @click=${this.close}>
              Cancel
            </button>
            <button
              type="button"
              class="primary"
              ?disabled=${this.busy||this.calendarMoveBlocked}
              @click=${this.save}
              style="background:var(--hac-accent);color:#fff;border:0;border-radius:8px;padding:0.45rem 0.9rem;font:inherit;cursor:pointer"
            >
              ${this.busy?"Saving…":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}};Dt.styles=Et,t([ut({attribute:!1})],Dt.prototype,"calendars",void 0),t([ut({attribute:!1})],Dt.prototype,"event",void 0),t([ut({attribute:!1})],Dt.prototype,"defaults",void 0),t([ut({type:Boolean})],Dt.prototype,"busy",void 0),t([ut({type:String})],Dt.prototype,"errorMessage",void 0),t([pt()],Dt.prototype,"summary",void 0),t([pt()],Dt.prototype,"description",void 0),t([pt()],Dt.prototype,"location",void 0),t([pt()],Dt.prototype,"start",void 0),t([pt()],Dt.prototype,"end",void 0),t([pt()],Dt.prototype,"calendar",void 0),t([pt()],Dt.prototype,"moveNote",void 0),Dt=t([ct("hac-event-form")],Dt);let Ct=class extends ot{constructor(){super(...arguments),this.config={type:`custom:${ft}`},this.view="week",this.anchorDate=new Date,this.events=[],this.formOpen=!1,this.editing=null,this.formDefaults={},this.formBusy=!1,this.formError="",this.status=`HA Calendar Card v${mt}`,this.statusKind="info",this.loading=!1,this.pendingDuplicate=null,this.loadGeneration=0}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={title:"HA Calendar",entities:[...vt],initial_view:"week",day_start_hour:6,day_end_hour:22,show_demo_when_empty:!1,...t,type:t.type??`custom:${ft}`},this.view=this.config.initial_view??"week"}static getStubConfig(){return{title:"HA Calendar",entities:[...vt],initial_view:"week"}}getCardSize(){return 8}updated(t){(t.has("hass")||t.has("config")||t.has("anchorDate")||t.has("view"))&&this.refreshEvents()}entities(){return this.config.entities?.length?this.config.entities:[...vt]}range(){const t=new Date(this.anchorDate);if(t.setHours(0,0,0,0),"day"===this.view){const e=new Date(t);return e.setDate(e.getDate()+1),{start:t,end:e}}const e=(t.getDay()+6)%7;t.setDate(t.getDate()-e);const s=new Date(t);return s.setDate(s.getDate()+7),{start:t,end:s}}async refreshEvents(){const t=++this.loadGeneration;if(!this.hass)return this.events=this.demoEvents(),this.status="Preview mode — demo events (no hass)",void(this.statusKind="info");this.loading=!0;const e=new bt(this.hass),{start:s,end:i}=this.range(),r=this.entities();try{const n=await e.getEvents(r,s,i);if(t!==this.loadGeneration)return;if(n.events.length){this.events=n.events;const t=n.errors.length?` · ${n.errors.length} calendar(s) failed`:"";this.status=`${n.events.length} event(s)${t}`,this.statusKind=n.errors.length?"warn":"info"}else n.anySuccess?(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.status=this.config.show_demo_when_empty?"No events — showing demo blocks":"No events in this range",this.statusKind="info"):(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.status=n.errors.length?`Could not load: ${n.errors.join(", ")} — check entity ids`:"No calendars loaded",this.statusKind="warn")}catch(e){if(t!==this.loadGeneration)return;this.events=[],this.status=`Load failed: ${e instanceof Error?e.message:String(e)}`,this.statusKind="error"}finally{t===this.loadGeneration&&(this.loading=!1)}}demoEvents(){const t=new Date(this.anchorDate);t.setHours(0,0,0,0);const e=(e,s,i,r)=>{const n=new Date(t);n.setHours(e,0,0,0);const a=new Date(n);return a.setHours(e+s,0,0,0),{uid:`demo-${i}-${e}`,summary:i,start:n.toISOString(),end:a.toISOString(),calendar:r}},s=this.entities();return[e(9,1,"Morning standup",s[0]??"calendar.family"),e(11,2,"Deep work",s[1]??"calendar.personal"),e(14,1,"School pickup",s[0]??"calendar.family")]}shift(t){const e=new Date(this.anchorDate);e.setDate(e.getDate()+t),this.anchorDate=e}openCreate(t){this.editing=null,this.formError="",this.formBusy=!1,this.formDefaults={start:(t?.start??new Date).toISOString(),end:(t?.end??new Date(Date.now()+36e5)).toISOString(),calendar:this.entities()[0]},this.formOpen=!0}openEdit(t){this.editing=t,this.formError="",this.formBusy=!1,this.formDefaults={},this.formOpen=!0}async onFormSave(t){const{mode:e,input:s,original:i}=t.detail;if(!this.hass)return void(this.formError="No Home Assistant connection — cannot save.");this.formBusy=!0,this.formError="";const r=new bt(this.hass);try{if("create"===e)await r.createEvent(s),this.formOpen=!1,this.status=`Created “${s.summary}” on ${s.calendar}`,this.statusKind="info";else if(i&&s.calendar!==i.calendar){if(i.recurring||i.rrule)return void(this.formError="Recurring events cannot change calendars yet. Keep the original calendar.");const t=await r.moveEventToCalendar(i,s.calendar,{...s,calendar:s.calendar});if("moved"===t.status)this.formOpen=!1,this.pendingDuplicate=null,this.status=`Moved “${s.summary}” → ${s.calendar}`,this.statusKind="info";else{if("create_failed"===t.status)return this.formError=`Move aborted (create failed): ${t.error}`,this.status=this.formError,void(this.statusKind="error");if("delete_failed"===t.status)this.formOpen=!1,this.pendingDuplicate=t.pending,this.status=`Copy exists on ${s.calendar}, but the old event could not be removed.`,this.statusKind="warn";else if("blocked_recurring"===t.status)return void(this.formError=t.reason)}}else i&&(await r.updateEvent(i.calendar,i.uid,{...s,calendar:i.calendar},i.recurrence_id),this.formOpen=!1,this.status=`Updated “${s.summary}”`,this.statusKind="info");await this.refreshEvents()}catch(t){this.formError=t instanceof Error?t.message:String(t),this.status=this.formError,this.statusKind="error"}finally{this.formBusy=!1}}async cleanupDuplicate(){if(!this.hass||!this.pendingDuplicate)return;const t=this.pendingDuplicate,e=new bt(this.hass);try{await e.deleteEvent(t.entityId,t.uid),this.pendingDuplicate=null,this.status=`Removed old copy of “${t.summary}” from ${t.entityId}`,this.statusKind="info",await this.refreshEvents()}catch(t){this.status=`Cleanup failed: ${t instanceof Error?t.message:String(t)}`,this.statusKind="error"}}dismissDuplicate(){this.pendingDuplicate=null,this.status="Duplicate warning dismissed — old copy may still exist",this.statusKind="warn"}render(){const t=this.config.title??"HA Calendar",e=this.entities(),s=!this.loading&&0===this.events.length&&Boolean(this.hass);return K`
      <div class="shell">
        ${this.pendingDuplicate?K`
              <div class="banner" role="status">
                <span>
                  Duplicate after move: “${this.pendingDuplicate.summary}” is on
                  <strong>${this.pendingDuplicate.targetCalendar}</strong>, but
                  still on
                  <strong>${this.pendingDuplicate.entityId}</strong>.
                </span>
                <button
                  type="button"
                  class="danger"
                  @click=${()=>{this.cleanupDuplicate()}}
                >
                  Remove old copy
                </button>
                <button type="button" @click=${this.dismissDuplicate}>
                  Dismiss
                </button>
              </div>
            `:q}

        <header class="toolbar">
          <h1 class="brand">${t}</h1>
          <button
            class="nav-btn"
            type="button"
            @click=${()=>this.shift("day"===this.view?-1:-7)}
          >
            ‹
          </button>
          <button
            class="nav-btn"
            type="button"
            @click=${()=>{this.anchorDate=new Date}}
          >
            Today
          </button>
          <button
            class="nav-btn"
            type="button"
            @click=${()=>this.shift("day"===this.view?1:7)}
          >
            ›
          </button>
          <div class="view-toggle" role="group" aria-label="View">
            <button
              type="button"
              aria-pressed=${"day"===this.view}
              @click=${()=>{this.view="day"}}
            >
              Day
            </button>
            <button
              type="button"
              aria-pressed=${"week"===this.view}
              @click=${()=>{this.view="week"}}
            >
              Week
            </button>
          </div>
          <button
            class="primary-btn"
            type="button"
            @click=${()=>this.openCreate()}
          >
            New
          </button>
        </header>

        <div class="grid-wrap">
          ${s?K`<div class="empty-hint">
                No events in this range. Double-click a time slot or press New.
              </div>`:q}
          <hac-time-grid
            .mode=${this.view}
            .anchorDate=${this.anchorDate}
            .events=${this.events}
            .dayStartHour=${this.config.day_start_hour??6}
            .dayEndHour=${this.config.day_end_hour??22}
            @event-select=${t=>this.openEdit(t.detail)}
            @slot-create=${t=>this.openCreate(t.detail)}
          ></hac-time-grid>

          ${this.formOpen?K`
                <hac-event-form
                  .calendars=${e}
                  .event=${this.editing}
                  .defaults=${this.formDefaults}
                  .busy=${this.formBusy}
                  .errorMessage=${this.formError}
                  @form-cancel=${()=>{this.formBusy||(this.formOpen=!1)}}
                  @form-save=${this.onFormSave}
                ></hac-event-form>
              `:q}
        </div>

        <div class="status" data-kind=${this.statusKind}>
          ${this.loading?"Loading… · ":""}${this.status}
        </div>
      </div>
    `}};Ct.styles=[_t,a`
      :host {
        position: relative;
      }
    `],t([ut({attribute:!1})],Ct.prototype,"hass",void 0),t([pt()],Ct.prototype,"config",void 0),t([pt()],Ct.prototype,"view",void 0),t([pt()],Ct.prototype,"anchorDate",void 0),t([pt()],Ct.prototype,"events",void 0),t([pt()],Ct.prototype,"formOpen",void 0),t([pt()],Ct.prototype,"editing",void 0),t([pt()],Ct.prototype,"formDefaults",void 0),t([pt()],Ct.prototype,"formBusy",void 0),t([pt()],Ct.prototype,"formError",void 0),t([pt()],Ct.prototype,"status",void 0),t([pt()],Ct.prototype,"statusKind",void 0),t([pt()],Ct.prototype,"loading",void 0),t([pt()],Ct.prototype,"pendingDuplicate",void 0),t([pt()],Ct.prototype,"loadGeneration",void 0),Ct=t([ct(ft)],Ct),window.customCards=window.customCards||[],window.customCards.push({type:ft,name:"HA Calendar Card",description:"Day/week time-slot calendar with create/edit and safe calendar moves",preview:!0}),console.info(`%c HA-CALENDAR-CARD %c ${mt} `,"background:#0d7a6f;color:#fff;padding:2px 4px;border-radius:4px 0 0 4px","background:#1a2b33;color:#fff;padding:2px 4px;border-radius:0 4px 4px 0");export{Ct as HaCalendarCard};
//# sourceMappingURL=ha-calendar-card.js.map
