function e(e,t,r,a){var i,n=arguments.length,s=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,a);else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(s=(n<3?i(s):n>3?i(t,r,s):i(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,r=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),i=new WeakMap;let n=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const r=void 0!==t&&1===t.length;r&&(e=i.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&i.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const r=1===e.length?e[0]:t.reduce((t,r,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[a+1],e[0]);return new n(r,e,a)},o=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",y=m.reactiveElementPolyfillSupport,v=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},w=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),a=this.getPropertyDescriptor(e,r,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,r){const{get:a,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const n=a?.call(this);i?.call(this,t),this.requestUpdate(e,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const r of t)this.createProperty(r,e[r])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,r]of t)this.elementProperties.set(e,r)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const r=this._$Eu(e,t);void 0!==r&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(r)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const r of a){const a=document.createElement("style"),i=t.litNonce;void 0!==i&&a.setAttribute("nonce",i),a.textContent=r.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){const r=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,r);if(void 0!==a&&!0===r.reflect){const i=(void 0!==r.converter?.toAttribute?r.converter:b).toAttribute(t,r.type);this._$Em=e,null==i?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(e,t){const r=this.constructor,a=r._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=r.getPropertyOptions(a),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=a;const n=i.fromAttribute(t,e.type);this[a]=n??this._$Ej?.get(a)??n,this._$Em=null}}requestUpdate(e,t,r,a=!1,i){if(void 0!==e){const n=this.constructor;if(!1===a&&(i=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??w)(i,t)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:a,wrapped:i},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==i||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,r]of e){const{wrapped:e}=r,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,r,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[v("elementProperties")]=new Map,k[v("finalized")]=new Map,y?.({ReactiveElement:k}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,D=e=>e,_=x.trustedTypes,C=_?_.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+S,T=`<${A}>`,M=document,P=()=>M.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,L="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,I=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,U=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...r)=>({_$litType$:e,strings:t,values:r}))(1),Y=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),W=new WeakMap,q=M.createTreeWalker(M,129);function V(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const G=(e,t)=>{const r=e.length-1,a=[];let i,n=2===t?"<svg>":3===t?"<math>":"",s=H;for(let t=0;t<r;t++){const r=e[t];let o,l,c=-1,d=0;for(;d<r.length&&(s.lastIndex=d,l=s.exec(r),null!==l);)d=s.lastIndex,s===H?"!--"===l[1]?s=R:void 0!==l[1]?s=z:void 0!==l[2]?(j.test(l[2])&&(i=RegExp("</"+l[2],"g")),s=I):void 0!==l[3]&&(s=I):s===I?">"===l[0]?(s=i??H,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,o=l[1],s=void 0===l[3]?I:'"'===l[3]?U:F):s===U||s===F?s=I:s===R||s===z?s=H:(s=I,i=void 0);const h=s===I&&e[t+1].startsWith("/>")?" ":"";n+=s===H?r+T:c>=0?(a.push(o),r.slice(0,c)+E+r.slice(c)+S+h):r+S+(-2===c?t:h)}return[V(e,n+(e[r]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class X{constructor({strings:e,_$litType$:t},r){let a;this.parts=[];let i=0,n=0;const s=e.length-1,o=this.parts,[l,c]=G(e,t);if(this.el=X.createElement(l,r),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=q.nextNode())&&o.length<s;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(E)){const t=c[n++],r=a.getAttribute(e).split(S),s=/([.?@])?(.*)/.exec(t);o.push({type:1,index:i,name:s[2],strings:r,ctor:"."===s[1]?te:"?"===s[1]?re:"@"===s[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(S)&&(o.push({type:6,index:i}),a.removeAttribute(e));if(j.test(a.tagName)){const e=a.textContent.split(S),t=e.length-1;if(t>0){a.textContent=_?_.emptyScript:"";for(let r=0;r<t;r++)a.append(e[r],P()),q.nextNode(),o.push({type:2,index:++i});a.append(e[t],P())}}}else if(8===a.nodeType)if(a.data===A)o.push({type:2,index:i});else{let e=-1;for(;-1!==(e=a.data.indexOf(S,e+1));)o.push({type:7,index:i}),e+=S.length-1}i++}}static createElement(e,t){const r=M.createElement("template");return r.innerHTML=e,r}}function J(e,t,r=e,a){if(t===Y)return t;let i=void 0!==a?r._$Co?.[a]:r._$Cl;const n=N(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),void 0===n?i=void 0:(i=new n(e),i._$AT(e,r,a)),void 0!==a?(r._$Co??=[])[a]=i:r._$Cl=i),void 0!==i&&(t=J(e,i._$AS(e,t.values),i,a)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,a=(e?.creationScope??M).importNode(t,!0);q.currentNode=a;let i=q.nextNode(),n=0,s=0,o=r[0];for(;void 0!==o;){if(n===o.index){let t;2===o.type?t=new Z(i,i.nextSibling,this,e):1===o.type?t=new o.ctor(i,o.name,o.strings,this,e):6===o.type&&(t=new ie(i,this,e)),this._$AV.push(t),o=r[++s]}n!==o?.index&&(i=q.nextNode(),n++)}return q.currentNode=M,a}p(e){let t=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,a){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),N(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==Y&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==K&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:r}=e,a="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=X.createElement(V(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new Q(a,this),r=e.u(this.options);e.p(t),this.T(r),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new X(e)),t}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,a=0;for(const i of e)a===t.length?t.push(r=new Z(this.O(P()),this.O(P()),this,this.options)):r=t[a],r._$AI(i),a++;a<t.length&&(this._$AR(r&&r._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=D(e).nextSibling;D(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,a,i){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=i,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=K}_$AI(e,t=this,r,a){const i=this.strings;let n=!1;if(void 0===i)e=J(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==Y,n&&(this._$AH=e);else{const a=e;let s,o;for(e=i[0],s=0;s<i.length-1;s++)o=J(this,a[r+s],t,s),o===Y&&(o=this._$AH[s]),n||=!N(o)||o!==this._$AH[s],o===K?e=K:e!==K&&(e+=(o??"")+i[s+1]),this._$AH[s]=o}n&&!a&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}class re extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==K)}}class ae extends ee{constructor(e,t,r,a,i){super(e,t,r,a,i),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??K)===Y)return;const r=this._$AH,a=e===K&&r!==K||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==K&&(r===K||a);a&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ie{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const ne=x.litHtmlPolyfillSupport;ne?.(X,Z),(x.litHtmlVersions??=[]).push("3.3.3");const se=globalThis;class oe extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,r)=>{const a=r?.renderBefore??t;let i=a._$litPart$;if(void 0===i){const e=r?.renderBefore??null;a._$litPart$=i=new Z(t.insertBefore(P(),e),e,void 0,r??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}oe._$litElement$=!0,oe.finalized=!0,se.litElementHydrateSupport?.({LitElement:oe});const le=se.litElementPolyfillSupport;le?.({LitElement:oe}),(se.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},he=(e=de,t,r)=>{const{kind:a,metadata:i}=r;let n=globalThis.litPropertyMetadata.get(i);if(void 0===n&&globalThis.litPropertyMetadata.set(i,n=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),n.set(r.name,e),"accessor"===a){const{name:a}=r;return{set(r){const i=t.get.call(this);t.set.call(this,r),this.requestUpdate(a,i,e,!0,r)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=r;return function(r){const i=this[a];t.call(this,r),this.requestUpdate(a,i,e,!0,r)}}throw Error("Unsupported decorator location: "+a)};function ue(e){return(t,r)=>"object"==typeof r?he(e,t,r):((e,t,r)=>{const a=t.hasOwnProperty(r);return t.constructor.createProperty(r,e),a?Object.getOwnPropertyDescriptor(t,r):void 0})(e,t,r)}function pe(e){return ue({...e,state:!0,attribute:!1})}const me="0.9.14",fe="ha-calendar-card",ge=56,ye=["calendar.family","calendar.personal","calendar.work"],ve=["#E07A5F","#3D9B8F","#81B29A","#5B8DB8","#E9B44C"],be="✓ ",we="[done] ",$e=/^hac-done:(\d{4}-\d{2}-\d{2})\s*$/;function ke(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function xe(e){const t=new Date(e);return t.setHours(0,0,0,0),t}function De(e,t){const r=new Date(e);return r.setDate(r.getDate()+t),r}function _e(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,r,a]=e.split("-").map(Number);return new Date(t,r-1,a)}return new Date(e)}function Ce(e,t,r){const a=_e(e),i=_e(t);if(Number.isNaN(a.getTime())||Number.isNaN(i.getTime()))return!1;const n=xe(r),s=De(n,1);return i.getTime()<=a.getTime()?a>=n&&a<s:a<s&&i>n}function Ee(e){const t=_e(e.start),r=_e(e.end);if(Number.isNaN(t.getTime())||Number.isNaN(r.getTime()))return[e.start.slice(0,10)];const a=[];let i=xe(t);const n=r;for(;i<n&&(a.push(ke(i)),i=De(i,1),!(a.length>366)););return 0===a.length&&a.push(ke(xe(t))),a}function Se(e){const t=e??"";if(t.startsWith(be))return{legacyTitleDone:!0,displaySummary:t.slice(2).trimStart()||"(no title)"};return t.toLowerCase().startsWith(we)?{legacyTitleDone:!0,displaySummary:t.slice(7).trimStart()||"(no title)"}:{legacyTitleDone:!1,displaySummary:t||"(no title)"}}function Ae(e){const t=e??"";if(!t)return{cleanDescription:"",doneDates:[]};const r=new Set,a=[];for(const e of t.split("\n")){const t=$e.exec(e);t?r.add(t[1]):a.push(e)}for(;a.length&&""===a[a.length-1].trim();)a.pop();return{cleanDescription:a.join("\n"),doneDates:[...r].sort()}}function Te(e,t){const r=[...new Set(t)].filter(e=>/^\d{4}-\d{2}-\d{2}$/.test(e)).sort(),a=(e??"").replace(/\s+$/,"");if(0===r.length)return a;const i=r.map(e=>`hac-done:${e}`).join("\n");return a?`${a}\n${i}`:i}function Me(e,t){return!!e.doneDates?.includes(t)||!!e.legacyTitleDone}function Pe(e){return e.doneDates&&e.doneDates.length>0?[...e.doneDates]:e.legacyTitleDone?Ee(e):[]}function Ne(e,t="Unknown error"){if(null==e)return t;if("string"==typeof e){const r=e.trim();return r&&"[object Object]"!==r?r:t}if(e instanceof Error){const r=e.message?.trim();return r&&"[object Object]"!==r?r:t}if("object"==typeof e){const t=e,r=[],a=Oe(t.message)??Oe(t.error),i=Oe(t.code),n=t.body;if(a&&r.push(a),i&&i!==a&&r.push(`(${i})`),null!=n)if("string"==typeof n&&n.trim())r.push(n.trim());else if("object"==typeof n){const e=Oe(n.message)??Oe(n.error);if(e)r.push(e);else try{r.push(JSON.stringify(n))}catch{}}if(r.length)return r.join(" ");try{const t=JSON.stringify(e);if(t&&"{}"!==t&&"null"!==t)return t}catch{}}return t}function Oe(e){if("string"!=typeof e)return;const t=e.trim();return t&&"[object Object]"!==t?t:void 0}function Le(e,t){const r=e.services?.calendar;return Boolean(r&&t in r)}function He(e){if(!e)return;if("string"==typeof e)return e;if("object"!=typeof e)return;const t=e;return"string"==typeof t.dateTime&&t.dateTime?t.dateTime:"string"==typeof t.date&&t.date?t.date:void 0}function Re(e){if("string"==typeof e&&e.trim())return e;if(Array.isArray(e)){const t=e.map(e=>Re(e)).filter(e=>e&&"(no title)"!==e);if(t.length)return t.join("; ")}return"(no title)"}function ze(e){return String(e).padStart(2,"0")}function Ie(e){return`${e.getFullYear()}-${ze(e.getMonth()+1)}-${ze(e.getDate())}`}function Fe(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,r,a]=e.split("-").map(Number);return new Date(t,r-1,a)}const t=new Date(e);return Number.isNaN(t.getTime())?null:t}function Ue(e,t){return/^\d{4}-\d{2}-\d{2}$/.test(e)?e:Ie(t)}function je(e){const[t,r,a]=e.split("-").map(Number);return Ie(new Date(t,r-1,a+1))}function Be(e,t){const r=e,a=He(r.start??r.dtstart),i=He(r.end??r.dtend);if(!a||!i)return null;const n=function(e,t,r){const a=Fe(e),i=Fe(t);if(!a||!i)return{start:e,end:t,allDay:r};const n=Ue(e,a),s=Ue(t,i),o=/^\d{4}-\d{2}-\d{2}$/.test(e),l=i.getTime()<=a.getTime(),c=0===a.getHours()&&0===a.getMinutes()&&0===a.getSeconds();return r||o||l&&c?s>n?{start:e,end:t,allDay:!0}:{start:n,end:je(n),allDay:!0}:{start:e,end:t,allDay:r}}(a,i,Boolean(e.all_day)||function(e){if("string"==typeof e)return/^\d{4}-\d{2}-\d{2}$/.test(e);if(!e||"object"!=typeof e)return!1;const t=e;return Boolean("string"==typeof t.date&&t.date&&!t.dateTime)}(r.start??r.dtstart)),s=n.start,o=n.end,l=e.rrule??void 0,{legacyTitleDone:c,displaySummary:d}=Se(Re(e.summary)),{cleanDescription:h,doneDates:u}=Ae(e.description);return{uid:e.uid??`${t}:${s}:${e.summary??"event"}`,summary:d,description:h||void 0,location:e.location??void 0,start:s,end:o,all_day:n.allDay,calendar:t,recurring:Boolean(l||e.recurrence_id),rrule:l,recurrence_id:e.recurrence_id??void 0,doneDates:u,legacyTitleDone:c||void 0,completed:c||u.length>0}}function Ye(e,t){if(t||/^\d{4}-\d{2}-\d{2}$/.test(e))return e.slice(0,10);const r=/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})(?::(\d{2}))?/.exec(e);if(r&&!/[zZ]|[+-]\d{2}:?\d{2}$/.test(e))return`${r[1]}:${r[2]??"00"}`;const a=new Date(e);if(Number.isNaN(a.getTime()))return e;const i=e=>String(e).padStart(2,"0");return`${a.getFullYear()}-${i(a.getMonth()+1)}-${i(a.getDate())}T${i(a.getHours())}:${i(a.getMinutes())}:${i(a.getSeconds())}`}function Ke(e){let t,r;if(void 0!==e.doneDates){t=Se(e.summary).displaySummary;r=Te(Ae(e.description).cleanDescription,e.doneDates)}else t=function(e,t){const r=Se(e).displaySummary;return t?`${be}${r}`:r}(e.summary,Boolean(e.completed)),r=e.description??"";const a={summary:t,description:r,location:e.location??"",dtstart:Ye(e.start,e.all_day),dtend:Ye(e.end,e.all_day)};return e.rrule?a.rrule=e.rrule:null===e.rrule&&(a.rrule=null),a}function We(e,t="this"){if(!Boolean(e.recurring||e.rrule||e.recurrence_id))return{};if("series"===t)return{};const r=e.recurrence_id;return r?"future"===t?{recurrenceId:r,recurrenceRange:"THISANDFUTURE"}:{recurrenceId:r}:{}}function qe(e){return!e||"object"!=typeof e||Array.isArray(e)?null:e}function Ve(e,t){if(Array.isArray(e.events))return e.events;const r=qe(e[t]);if(r&&Array.isArray(r.events))return r.events;const a=Object.keys(e).find(e=>e.toLowerCase()===t.toLowerCase()),i=a?qe(e[a]):null;return i&&Array.isArray(i.events)?i.events:null}function Ge(e,t){if(Array.isArray(e))return e;const r=qe(e);if(!r)return null;const a=[r,qe(r.response),qe(r.service_response)].filter(e=>null!==e);for(const e of a){const r=Ve(e,t);if(r)return r}return null}function Xe(e,t){const r=[];for(const a of e)try{const e=Be(a,t);e&&r.push(e)}catch(e){console.warn(`[ha-calendar-card] skipped event on ${t}:`,e instanceof Error?e.message:e)}return r}class Je{constructor(e){this.hass=e}listCalendarEntities(e){return e?.length?[...e]:Object.keys(this.hass.states).filter(e=>e.startsWith("calendar.")).sort()}listWritableCalendars(e){return e.filter(e=>{const t=this.hass.states[e];if(!t)return!0;const r=t.attributes.supported_features;return"number"!=typeof r||!!(1&r)})}canDelete(e){const t=this.hass.states[e];if(!t)return!0;const r=t.attributes.supported_features;return"number"!=typeof r||!!(2&r)}async getEvents(e,t,r){const a=[],i=[];let n=!1;for(const s of e)try{const e=await this.fetchEntityEvents(s,t,r);n=!0,a.push(...e)}catch(e){i.push(s),console.warn(`[ha-calendar-card] failed to load ${s}:`,e instanceof Error?e.message:e)}return{events:a,errors:i,anySuccess:n}}async fetchEntityEvents(e,t,r){if(this.hass.callApi)try{const a=`?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(r.toISOString())}`,i=Ge(await this.hass.callApi("GET",`calendars/${e}${a}`),e);if(i)return Xe(i,e)}catch{}return Xe(Ge(await this.hass.callService("calendar","get_events",{entity_id:e,start_date_time:t.toISOString(),end_date_time:r.toISOString()},void 0,void 0,!0),e)??[],e)}async createEvent(e){const t=Ke(e);if(this.hass.callWS)try{await this.hass.callWS({type:"calendar/event/create",entity_id:e.calendar,event:t});const r=await this.findCreatedEvent(e);return{uid:r?.uid}}catch(t){if(e.rrule)throw new Error(`Recurring create failed: ${Ne(t)}`);if(!Le(this.hass,"create_event"))throw new Error(Ne(t,"Calendar create failed"));try{await this.createEventViaService(e)}catch(e){throw new Error(Ne(e,Ne(t,"Calendar create failed")))}const r=await this.findCreatedEvent(e);return{uid:r?.uid}}if(e.rrule)throw new Error("Recurring create failed: Home Assistant websocket (callWS) is required for rrule — REST create_event does not support recurrence.");if(!Le(this.hass,"create_event"))throw new Error("Calendar create failed: Home Assistant websocket (callWS) is required, and calendar.create_event is not available.");await this.createEventViaService(e);const r=await this.findCreatedEvent(e);return{uid:r?.uid}}async createEventViaService(e){const t=Ke(e);await this.hass.callService("calendar","create_event",{entity_id:e.calendar,summary:t.summary,description:t.description,location:e.location??"",start_date_time:e.all_day?void 0:Ye(e.start,!1),end_date_time:e.all_day?void 0:Ye(e.end,!1),start_date:e.all_day?e.start.slice(0,10):void 0,end_date:e.all_day?e.end.slice(0,10):void 0})}async findCreatedEvent(e){const t=new Date(e.start),r=new Date(e.end),a=new Date(t.getTime()-6e4),i=new Date(r.getTime()+6e4);try{const{events:r}=await this.getEvents([e.calendar],a,i);return r.find(t=>function(e,t){return e.summary===t.summary&&e.start===t.start&&e.end===t.end}(t,{summary:e.summary,start:e.all_day?e.start.slice(0,10):e.start,end:e.all_day?e.end.slice(0,10):e.end}))??r.find(r=>r.summary===e.summary&&Math.abs(new Date(r.start).getTime()-t.getTime())<12e4)??null}catch{return null}}async updateEvent(e,t,r,a,i){const n=Ke(r),s=Boolean(a||i||r.rrule||null===r.rrule);if(this.hass.callWS)try{const r={type:"calendar/event/update",entity_id:e,uid:t,event:n};return a&&(r.recurrence_id=a),i&&(r.recurrence_range=i),void await this.hass.callWS(r)}catch(a){if(s||!Le(this.hass,"update_event"))throw new Error(Ne(a,"Calendar update failed"));try{return void await this.updateEventViaService(e,t,r)}catch(e){throw new Error(Ne(e,Ne(a,"Calendar update failed")))}}if(s)throw new Error("Calendar update failed: Home Assistant websocket (callWS) is required for recurring / scoped edits.");if(!Le(this.hass,"update_event"))throw new Error("Calendar update failed: Home Assistant websocket (callWS) is required, and calendar.update_event is not available.");await this.updateEventViaService(e,t,r)}async updateEventViaService(e,t,r){const a=Ke(r);await this.hass.callService("calendar","update_event",{entity_id:e,uid:t,summary:a.summary,description:a.description,location:r.location,start_date_time:r.all_day?void 0:Ye(r.start,!1),end_date_time:r.all_day?void 0:Ye(r.end,!1),start_date:r.all_day?r.start.slice(0,10):void 0,end_date:r.all_day?r.end.slice(0,10):void 0})}async deleteEvent(e,t,r,a){const i=Boolean(r||a);if(this.hass.callWS)try{const i={type:"calendar/event/delete",entity_id:e,uid:t};return r&&(i.recurrence_id=r),a&&(i.recurrence_range=a),void await this.hass.callWS(i)}catch(r){if(i||!Le(this.hass,"delete_event"))throw new Error(Ne(r,"Calendar delete failed"));try{return void await this.deleteEventViaService(e,t)}catch(e){throw new Error(Ne(e,Ne(r,"Calendar delete failed")))}}if(i)throw new Error("Calendar delete failed: Home Assistant websocket (callWS) is required for recurring / scoped deletes.");if(!Le(this.hass,"delete_event"))throw new Error("Calendar delete failed: Home Assistant websocket (callWS) is required, and calendar.delete_event is not available.");await this.deleteEventViaService(e,t)}async deleteEventViaService(e,t){await this.hass.callService("calendar","delete_event",{entity_id:e,uid:t})}async moveEventToCalendar(e,t,r){if(e.recurring||e.rrule)return{status:"blocked_recurring",reason:"Moving recurring events is disabled — change calendars only for one-off events."};if(e.calendar===t)return{status:"moved",newUid:e.uid};const a={summary:r?.summary??e.summary,description:r?.description??e.description,location:r?.location??e.location,start:r?.start??e.start,end:r?.end??e.end,all_day:r?.all_day??e.all_day,calendar:t,doneDates:r?.doneDates??Pe(e)};let i;try{if(i=(await this.createEvent(a)).uid??(await this.findCreatedEvent(a))?.uid,!i)return{status:"create_failed",error:"Created on target calendar but could not confirm the new event id — source left untouched."}}catch(e){return{status:"create_failed",error:Ne(e,"Create on target calendar failed")}}try{return await this.deleteEvent(e.calendar,e.uid,e.recurrence_id),{status:"moved",newUid:i}}catch(a){const n={entityId:e.calendar,uid:e.uid,summary:r?.summary??e.summary,targetCalendar:t,newUid:i};return{status:"delete_failed",newUid:i,error:Ne(a,"Delete from source calendar failed"),duplicate:!0,pending:n}}}}const Qe="ha_calendar_reminders";function Ze(e){if(!e||"object"!=typeof e)return{};const t=e;return t.response&&"object"==typeof t.response?t.response:t}class et{constructor(e){this.hass=e}isAvailable(){const e=this.hass.services;return Boolean(e&&e[Qe]?.set_reminder)}async getReminder(e,t){const r=Ze(await this.hass.callService(Qe,"get_reminder",{calendar_entity_id:e,event_uid:t},void 0,void 0,!0)).reminder;return r&&"object"==typeof r?r:null}async setReminder(e){return Ze(await this.hass.callService(Qe,"set_reminder",{calendar_entity_id:e.calendar_entity_id,event_uid:e.event_uid,event_start:e.event_start,event_summary:e.event_summary??"",minutes_before:e.minutes_before,notify_service:e.notify_service,message:e.message??"",enabled:e.enabled??!0},void 0,void 0,!0)).reminder??null}async clearReminder(e,t){const r=Ze(await this.hass.callService(Qe,"clear_reminder",{calendar_entity_id:e,event_uid:t},void 0,void 0,!0));return Boolean(r.cleared)}}const tt=s`
  :host {
    /* Light (Skylight) — default */
    --hac-bg: #f7f8fa;
    --hac-surface: #ffffff;
    --hac-surface-muted: #fafbfc;
    --hac-surface-soft: #f4f6f8;
    --hac-ink: #2c3340;
    --hac-muted: #8a93a3;
    --hac-faint: #b0b7c3;
    --hac-accent: #3d9b8f;
    --hac-accent-hover: #318579;
    --hac-today: #f08a5a;
    --hac-today-bg: #fffaf7;
    --hac-today-head: #fff6f1;
    --hac-line: #e8ebf0;
    --hac-line-strong: #d8dde6;
    --hac-danger: #c45c5c;
    --hac-danger-bg: #fdf4f4;
    --hac-warn: #9a6b1f;
    --hac-warn-bg: #fff6e8;
    --hac-warn-ink: #5c3d00;
    --hac-cell-hover: #f7fafc;
    --hac-outside-bg: #fbfcfd;
    --hac-outside-ink: #b0b7c3;
    --hac-veil: rgba(255, 255, 255, 0.28);
    --hac-state-bg: rgba(255, 255, 255, 0.88);
    --hac-info-grad: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%);
    --hac-shadow-soft: rgba(44, 51, 64, 0.08);
    --hac-radius: 0;
    --hac-font-display: "Manrope", "Avenir Next", "Segoe UI", sans-serif;
    --hac-font-body: "Nunito", "Avenir Next", "Segoe UI", sans-serif;
    --hac-font-weather: "Quicksand", "Nunito", "Avenir Next", sans-serif;
    --hac-cal-0: #e07a5f;
    --hac-cal-1: #3d9b8f;
    --hac-cal-2: #81b29a;
    --hac-cal-3: #5b8db8;
    --hac-cal-4: #e9b44c;
    --hac-hour-height: 56px;

    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 440px;
    font-family: var(--hac-font-body);
    color: var(--hac-ink);
    background: var(--hac-bg);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--hac-line);
    animation: host-in 280ms ease;
    color-scheme: light;
    transition: background 220ms ease, color 220ms ease, border-color 220ms ease;
  }

  /* Cohesive dark companion to Skylight light — warm slate, same accents */
  :host([data-theme="dark"]) {
    --hac-bg: #1a1e26;
    --hac-surface: #222833;
    --hac-surface-muted: #1e2430;
    --hac-surface-soft: #2a3140;
    --hac-ink: #e8ebf2;
    --hac-muted: #9aa3b5;
    --hac-faint: #6e778a;
    --hac-accent: #4db3a5;
    --hac-accent-hover: #5fc4b5;
    --hac-today: #f08a5a;
    --hac-today-bg: #2e2622;
    --hac-today-head: #342820;
    --hac-line: #323a4a;
    --hac-line-strong: #3e475a;
    --hac-danger: #e07a7a;
    --hac-danger-bg: #3a2428;
    --hac-warn: #e0b45c;
    --hac-warn-bg: #3a3020;
    --hac-warn-ink: #f0d9a0;
    --hac-cell-hover: #2a3140;
    --hac-outside-bg: #1c212c;
    --hac-outside-ink: #6e778a;
    --hac-veil: rgba(26, 30, 38, 0.35);
    --hac-state-bg: rgba(34, 40, 51, 0.92);
    --hac-info-grad: linear-gradient(180deg, #262c38 0%, #222833 100%);
    --hac-shadow-soft: rgba(0, 0, 0, 0.35);
    color-scheme: dark;
  }

  /*
   * Panel mode: fill the Lovelace panel host only.
   * Do NOT use min-height: 100vh/dvh − header here — hui-view-container already
   * pads for the HA header (border-box), so a viewport min-height double-counts
   * and creates a page scrollbar + .grid-wrap scrollbar on phones/tablets.
   */
  :host([data-layout="panel"]),
  :host-context(hui-panel-view) {
    min-height: 0;
    flex: 1 1 auto;
    border-radius: 0;
    border: 0;
    /* Prefer measured panel height from JS; else fill the host */
    height: var(--hac-panel-height, 100%);
    max-height: var(--hac-panel-height, 100%);
  }

  @keyframes host-in {
    from {
      opacity: 0.7;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .shell {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    background: var(--hac-surface);
  }

  .info-bar {
    display: grid;
    grid-template-columns: minmax(10rem, 1.1fr) minmax(8rem, 1fr) minmax(12rem, 1.2fr);
    gap: 0.75rem 1rem;
    align-items: center;
    padding: 0.85rem 1.15rem 0.65rem;
    border-bottom: 1px solid var(--hac-line);
    background: var(--hac-info-grad);
    flex: 0 0 auto;
  }

  .clock-block {
    display: flex;
    flex-direction: column;
    gap: 0.05rem;
    min-width: 0;
  }

  .clock-date {
    font-family: var(--hac-font-display);
    font-size: clamp(0.95rem, 2.2vw, 1.15rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--hac-ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .clock-time {
    font-family: var(--hac-font-display);
    font-size: clamp(1.7rem, 4vw, 2.35rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--hac-ink);
  }

  .weather-now {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.35rem;
    min-width: 0;
  }

  .weather-blob {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.35rem 0.75rem 0.35rem 0.4rem;
    border-radius: 999px;
    background: var(--hac-wx-soft, var(--hac-surface-soft));
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
    animation: wx-pop 420ms cubic-bezier(0.34, 1.4, 0.64, 1);
  }

  :host([data-theme="dark"]) .weather-blob {
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  }

  @keyframes wx-pop {
    from {
      opacity: 0.5;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .weather-icon-halo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.15rem;
    height: 2.15rem;
    border-radius: 50%;
    background: var(--hac-wx-accent, var(--hac-accent));
    font-size: 1.15rem;
    line-height: 1;
    box-shadow: 0 4px 12px var(--hac-shadow-soft);
    animation: wx-bob 3.2s ease-in-out infinite;
  }

  @keyframes wx-bob {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  .weather-now .temp {
    font-family: var(--hac-font-weather);
    font-size: clamp(1.35rem, 3vw, 1.85rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--hac-wx-ink, var(--hac-ink));
  }

  .weather-now .cond {
    font-family: var(--hac-font-weather);
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--hac-wx-ink, var(--hac-muted));
    text-transform: none;
    letter-spacing: -0.01em;
  }

  .weather-stub {
    font-family: var(--hac-font-weather);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--hac-faint);
    padding: 0.45rem 0.7rem;
    border-radius: 999px;
    background: var(--hac-surface-soft);
  }

  .forecast-strip {
    display: flex;
    justify-content: flex-end;
    gap: 0.4rem;
    overflow: auto;
    min-width: 0;
    padding-bottom: 0.1rem;
  }

  .forecast-day {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    min-width: 2.85rem;
    padding: 0.35rem 0.35rem 0.4rem;
    border-radius: 14px;
    background: var(--hac-wx-day-soft, var(--hac-surface-soft));
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
    transition: transform 160ms ease, box-shadow 160ms ease;
    animation: wx-chip-in 360ms ease both;
  }

  :host([data-theme="dark"]) .forecast-day {
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  .forecast-day:hover {
    transform: translateY(-2px);
  }

  @keyframes wx-chip-in {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .forecast-day .d {
    font-family: var(--hac-font-weather);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--hac-muted);
  }

  .forecast-day .g {
    font-size: 1rem;
    line-height: 1;
  }

  .forecast-day .t {
    font-family: var(--hac-font-weather);
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--hac-wx-day-ink, var(--hac-ink));
  }

  .title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.65rem 0.85rem;
    padding: 0.55rem 1rem 0.35rem;
    position: relative;
    flex: 0 0 auto;
  }

  .brand {
    font-family: var(--hac-font-display);
    font-size: clamp(1.35rem, 3vw, 1.75rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin: 0;
    text-align: center;
    width: 100%;
    line-height: 1.1;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border: 1px solid var(--hac-line-strong);
    background: var(--hac-surface);
    color: var(--hac-ink);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.32rem 0.7rem 0.32rem 0.55rem;
    border-radius: 999px;
    cursor: pointer;
    transition: background 140ms ease, border-color 140ms ease, opacity 140ms ease,
      transform 120ms ease;
  }

  .pill:hover {
    transform: translateY(-1px);
  }

  .pill[aria-pressed="false"] {
    opacity: 0.42;
    background: var(--hac-surface-soft);
  }

  .pill .dot {
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  .pill.add-cal-pill {
    border-style: dashed;
    font-weight: 800;
    color: var(--hac-accent);
    background: var(--hac-surface-soft);
  }

  .cal-picker-wrap {
    position: relative;
    display: inline-flex;
  }

  .cal-picker {
    position: absolute;
    top: calc(100% + 0.4rem);
    left: 50%;
    transform: translateX(-50%);
    z-index: 40;
    min-width: min(18rem, 86vw);
    max-width: min(22rem, 92vw);
    max-height: min(22rem, 60vh);
    overflow: auto;
    padding: 0.7rem 0.75rem 0.65rem;
    border-radius: 0.85rem;
    border: 1px solid var(--hac-line-strong);
    background: var(--hac-surface);
    box-shadow: 0 10px 28px rgba(44, 51, 64, 0.14);
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .cal-picker-title {
    font-family: var(--hac-font-display);
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .cal-picker-hint {
    margin: 0 0 0.25rem;
    font-size: 0.72rem;
    line-height: 1.35;
    color: var(--hac-muted, #6b7280);
  }

  .cal-picker-empty {
    margin: 0.25rem 0 0;
    font-size: 0.78rem;
    color: var(--hac-muted, #6b7280);
  }

  .cal-picker-row {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-template-rows: auto auto;
    column-gap: 0.45rem;
    row-gap: 0.05rem;
    align-items: center;
    padding: 0.35rem 0.3rem;
    border-radius: 0.55rem;
    cursor: pointer;
  }

  .cal-picker-row:hover {
    background: var(--hac-surface-soft);
  }

  .cal-picker-row input {
    grid-row: 1 / span 2;
    margin: 0;
    accent-color: var(--hac-accent);
  }

  .cal-picker-row .dot {
    grid-row: 1 / span 2;
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
  }

  .cal-picker-label {
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: capitalize;
  }

  .cal-picker-id {
    grid-column: 3;
    font-size: 0.68rem;
    color: var(--hac-muted, #6b7280);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cal-picker-create {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-top: 0.35rem;
    padding-top: 0.45rem;
    border-top: 1px solid var(--hac-line, rgba(0, 0, 0, 0.08));
  }

  .cal-create-toggle,
  .cal-create-cancel {
    align-self: flex-start;
    border: none;
    background: transparent;
    color: var(--hac-accent);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.25rem 0.1rem;
    cursor: pointer;
  }

  .cal-create-toggle:hover,
  .cal-create-cancel:hover {
    text-decoration: underline;
  }

  .cal-create-label {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--hac-muted, #6b7280);
  }

  .cal-create-row {
    display: flex;
    gap: 0.35rem;
    align-items: center;
  }

  .cal-create-input {
    flex: 1;
    min-width: 0;
    border: 1px solid var(--hac-line-strong);
    border-radius: 0.5rem;
    padding: 0.4rem 0.55rem;
    font: inherit;
    font-size: 0.82rem;
    background: var(--hac-surface-soft);
    color: inherit;
  }

  .cal-create-btn {
    flex-shrink: 0;
    border: none;
    border-radius: 0.5rem;
    padding: 0.4rem 0.7rem;
    font: inherit;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    background: var(--hac-accent);
    color: #fff;
  }

  .cal-create-btn:disabled,
  .cal-create-input:disabled {
    opacity: 0.65;
    cursor: default;
  }

  .cal-picker-error {
    margin: 0;
    font-size: 0.72rem;
    line-height: 1.35;
    color: var(--hac-danger, #b42318);
  }

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem 0.75rem;
    padding: 0.35rem 1rem 0.7rem;
    flex: 0 0 auto;
  }

  .toolbar-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.45rem;
  }

  .nav-group {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .range-wrap {
    position: relative;
  }

  .range-label {
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--hac-ink);
    min-width: 7rem;
    text-align: center;
    border: 1px solid transparent;
    background: transparent;
    border-radius: 999px;
    padding: 0.35rem 0.65rem;
    cursor: pointer;
    transition: background 140ms ease, border-color 140ms ease;
  }

  .range-label:hover,
  .range-label[aria-expanded="true"] {
    background: var(--hac-surface-soft);
    border-color: var(--hac-line-strong);
  }

  .range-label .caret {
    display: inline-block;
    margin-left: 0.2rem;
    font-size: 0.7em;
    opacity: 0.65;
  }

  .month-picker {
    position: absolute;
    top: calc(100% + 0.35rem);
    left: 50%;
    transform: translateX(-50%);
    z-index: 8;
    width: min(17.5rem, 80vw);
    padding: 0.75rem;
    border-radius: 14px;
    background: var(--hac-surface);
    border: 1px solid var(--hac-line-strong);
    box-shadow: 0 12px 32px var(--hac-shadow-soft);
    animation: picker-in 180ms ease;
  }

  @keyframes picker-in {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  .month-picker-year {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.35rem;
    margin-bottom: 0.55rem;
  }

  .month-picker-year .year {
    font-family: var(--hac-font-display);
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .month-picker-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.3rem;
  }

  .month-picker-grid button {
    font: inherit;
    font-size: 0.78rem;
    font-weight: 700;
    border: 1px solid transparent;
    background: var(--hac-surface-soft);
    color: var(--hac-ink);
    border-radius: 10px;
    padding: 0.45rem 0.25rem;
    cursor: pointer;
    min-height: 2.15rem;
    transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
  }

  .month-picker-grid button:hover {
    border-color: var(--hac-line-strong);
  }

  .month-picker-grid button[aria-current="true"] {
    background: var(--hac-accent);
    color: #fff;
    border-color: var(--hac-accent);
  }

  .view-toggle {
    display: inline-flex;
    border: 1px solid var(--hac-line-strong);
    border-radius: 999px;
    overflow: hidden;
    background: var(--hac-bg);
  }

  .view-toggle button {
    font: inherit;
    font-size: 0.82rem;
    font-weight: 700;
    border: 0;
    background: transparent;
    color: var(--hac-muted);
    padding: 0.38rem 0.8rem;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease;
  }

  .view-toggle button[aria-pressed="true"] {
    background: var(--hac-ink);
    color: var(--hac-surface);
  }

  .theme-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .theme-btn .glyph {
    font-size: 0.95rem;
    line-height: 1;
  }

  .nav-btn,
  .primary-btn,
  .ghost-btn {
    font: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    border: 1px solid var(--hac-line-strong);
    background: var(--hac-surface);
    color: var(--hac-ink);
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    cursor: pointer;
    min-height: 2.15rem;
    transition: transform 120ms ease, background 140ms ease, border-color 140ms ease;
  }

  .nav-btn:hover,
  .ghost-btn:hover,
  .primary-btn:hover {
    transform: translateY(-1px);
  }

  .primary-btn {
    background: var(--hac-accent);
    border-color: var(--hac-accent);
    color: #fff;
  }

  .primary-btn:hover {
    background: var(--hac-accent-hover);
  }

  .ghost-btn {
    background: transparent;
  }

  .add-btn {
    margin-left: auto;
  }

  /*
   * Body chrome → one scrollport:
   * .shell (overflow:hidden, min-height:0)
   *   → .grid-wrap (flex fill, min-height:0, overflow:hidden)
   *     → hac-time-grid / hac-month-grid (flex fill, min-height:0, overflow:auto)
   * Day/week hours scroll inside the time grid; month usually fits via data-fill.
   * Avoid nested page + wrap + grid scrollbars (especially on type: panel).
   */
  .grid-wrap {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overscroll-behavior: contain;
    position: relative;
    background: var(--hac-surface);
  }

  hac-time-grid,
  hac-month-grid {
    display: block;
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  .status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 1rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--hac-muted);
    border-top: 1px solid var(--hac-line);
    background: var(--hac-surface-muted);
    flex: 0 0 auto;
  }

  .status[data-kind="error"] {
    color: var(--hac-danger);
    background: var(--hac-danger-bg);
  }

  .status[data-kind="warn"] {
    color: var(--hac-warn);
    background: var(--hac-warn-bg);
  }

  .status .spinner {
    width: 0.85rem;
    height: 0.85rem;
    border: 2px solid var(--hac-line-strong);
    border-top-color: var(--hac-accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .banner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.75rem;
    padding: 0.7rem 1rem;
    background: var(--hac-warn-bg);
    border-bottom: 1px solid rgba(154, 107, 31, 0.22);
    color: var(--hac-warn-ink);
    font-size: 0.85rem;
    animation: banner-in 200ms ease;
    flex: 0 0 auto;
  }

  @keyframes banner-in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .banner button {
    font: inherit;
    font-weight: 700;
    border: 1px solid rgba(154, 107, 31, 0.35);
    background: var(--hac-surface);
    color: var(--hac-warn-ink);
    border-radius: 999px;
    padding: 0.35rem 0.75rem;
    cursor: pointer;
    min-height: 2rem;
  }

  .banner button.danger {
    background: var(--hac-danger);
    border-color: var(--hac-danger);
    color: #fff;
  }

  .state-panel {
    position: absolute;
    inset: 0;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    padding: 1.5rem;
    text-align: center;
    background: var(--hac-state-bg);
    backdrop-filter: blur(2px);
    animation: fade-in 200ms ease;
    pointer-events: auto;
  }

  .state-panel[data-kind="loading"] {
    pointer-events: none;
  }

  .state-panel[data-kind="empty"] {
    background: transparent;
    pointer-events: none;
  }

  .state-panel[data-kind="empty"] .primary-btn {
    pointer-events: auto;
  }

  .state-mark {
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 1rem;
    background: linear-gradient(
      145deg,
      var(--hac-surface) 0%,
      color-mix(in srgb, var(--hac-accent) 18%, var(--hac-surface)) 100%
    );
    border: 1px solid var(--hac-line);
    box-shadow: 0 8px 20px var(--hac-shadow-soft);
    position: relative;
  }

  .state-mark::after {
    content: "";
    position: absolute;
    inset: 28% 22% 34% 22%;
    border-radius: 4px;
    background: var(--hac-accent);
    opacity: 0.85;
  }

  .state-mark::before {
    content: "";
    position: absolute;
    top: 18%;
    left: 30%;
    right: 30%;
    height: 3px;
    border-radius: 2px;
    background: color-mix(in srgb, var(--hac-ink) 20%, transparent);
  }

  .state-panel h2 {
    font-family: var(--hac-font-display);
    font-size: 1.2rem;
    margin: 0;
    font-weight: 800;
  }

  .state-panel p {
    margin: 0;
    max-width: 22rem;
    color: var(--hac-muted);
    font-size: 0.92rem;
    line-height: 1.4;
  }

  .state-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 0.25rem;
    pointer-events: auto;
  }

  .loading-veil {
    position: absolute;
    inset: 0;
    z-index: 3;
    background: var(--hac-veil);
    pointer-events: none;
    animation: fade-in 160ms ease;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 820px) {
    .info-bar {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "clock weather"
        "forecast forecast";
    }

    .clock-block {
      grid-area: clock;
    }

    .weather-now {
      grid-area: weather;
      align-items: flex-end;
      text-align: right;
    }

    .forecast-strip {
      grid-area: forecast;
      justify-content: flex-start;
    }
  }

  @media (max-width: 640px) {
    :host {
      min-height: 380px;
      border-radius: 12px;
    }

    :host([data-layout="panel"]),
    :host-context(hui-panel-view) {
      /* Keep fitting the panel — never force a second viewport min-height */
      min-height: 0;
      border-radius: 0;
    }

    .info-bar {
      padding: 0.7rem 0.75rem 0.55rem;
    }

    .toolbar {
      padding: 0.25rem 0.75rem 0.65rem;
    }

    .toolbar-controls {
      width: 100%;
      justify-content: space-between;
    }

    .add-btn {
      margin-left: 0;
    }

    .status {
      font-size: 0.74rem;
      padding: 0.45rem 0.75rem;
    }
  }
`,rt=s`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    /* Join shell → grid-wrap → time-grid flex shrink cascade */
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    --hac-event: var(--hac-accent, #3d9b8f);
    --hac-event-text: #fff;
    font-family: var(--hac-font-body, "Nunito", "Avenir Next", "Segoe UI", sans-serif);
    color: var(--hac-ink, #2c3340);
    background: var(--hac-surface, #fff);
  }

  .time-grid {
    display: grid;
    min-width: 100%;
    /* Content (hours) defines height; :host scrolls — do not force 100% here */
    box-sizing: border-box;
    position: relative;
    --hac-day-head-h: 3.2rem;
  }

  .time-grid[data-mode="day"] {
    grid-template-columns: 3.25rem minmax(0, 1fr);
  }

  .time-grid[data-mode="week"] {
    grid-template-columns: 3.25rem repeat(7, minmax(4.75rem, 1fr));
  }

  .corner,
  .day-head {
    position: sticky;
    top: 0;
    z-index: 4;
    background: color-mix(in srgb, var(--hac-surface, #fff) 96%, transparent);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid var(--hac-line-strong, #d8dde6);
    padding: 0.55rem 0.3rem;
    text-align: center;
    min-height: var(--hac-day-head-h);
    box-sizing: border-box;
  }

  .corner {
    left: 0;
    z-index: 5;
  }

  .day-head {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--hac-muted, #8a93a3);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .allday-gutter,
  .allday-cell {
    position: sticky;
    top: var(--hac-day-head-h);
    z-index: 3;
    background: color-mix(in srgb, var(--hac-surface-muted, #fafbfc) 96%, transparent);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid var(--hac-line-strong, #d8dde6);
    box-sizing: border-box;
  }

  .allday-gutter {
    left: 0;
    z-index: 4;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0.35rem 0.4rem 0.35rem 0.2rem;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--hac-muted, #8a93a3);
    border-right: 1px solid var(--hac-line, #e8ebf0);
    line-height: 1.2;
    min-height: 2.1rem;
  }

  .allday-cell {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 0.22rem;
    padding: 0.3rem 0.28rem;
    border-left: 1px solid var(--hac-line, #e8ebf0);
    min-height: 2.1rem;
    min-width: 0;
  }

  .allday-cell[data-today="true"] {
    background: color-mix(in srgb, var(--hac-today-head, #fff6f1) 92%, transparent);
  }

  :host([data-dragging]),
  :host([data-dragging]) .event-block,
  :host([data-dragging]) .allday-chip,
  :host([data-dragging]) .day-col,
  :host([data-dragging]) .day-head,
  :host([data-dragging]) .allday-cell {
    cursor: grabbing;
  }

  .allday-chip {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    width: 100%;
    min-width: 0;
    margin: 0;
    border: 0;
    border-radius: 6px;
    padding: 0.12rem 0.28rem 0.12rem 0.12rem;
    font: inherit;
    font-size: 0.7rem;
    font-weight: 700;
    line-height: 1.25;
    color: #fff;
    text-align: left;
    overflow: hidden;
    box-shadow: 0 1px 0 var(--hac-shadow-soft, rgba(44, 51, 64, 0.06));
    transition: transform 140ms ease, filter 140ms ease, box-shadow 140ms ease,
      opacity 140ms ease;
    -webkit-tap-highlight-color: transparent;
    background: transparent;
  }

  .allday-chip[data-done="true"] {
    opacity: 0.62;
    filter: saturate(0.75);
  }

  .allday-chip[data-draggable="true"] {
    cursor: grab;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }

  .allday-chip[data-dragging="true"] {
    opacity: 0.35;
  }

  .allday-chip .chip-main {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    min-width: 0;
    flex: 1 1 auto;
    margin: 0;
    border: 0;
    padding: 0.06rem 0.1rem;
    font: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    text-align: left;
    background: transparent;
    cursor: pointer;
    overflow: hidden;
  }

  .allday-chip[data-draggable="true"] .chip-main {
    cursor: grab;
  }

  .allday-chip .chip-main:hover,
  .allday-chip .chip-main:focus-visible {
    outline: none;
  }

  .allday-chip:hover,
  .allday-chip:focus-within {
    transform: translateY(-1px);
    filter: brightness(1.04);
    box-shadow: 0 4px 10px var(--hac-shadow-soft, rgba(44, 51, 64, 0.12));
  }

  .allday-chip[data-done="true"]:hover,
  .allday-chip[data-done="true"]:focus-within {
    filter: saturate(0.75) brightness(1.04);
  }

  .allday-chip .done-check {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.05rem;
    height: 1.05rem;
    margin: 0;
    padding: 0;
    border: 1.5px solid rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 900;
    line-height: 1;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .allday-chip .done-check[aria-checked="true"] {
    background: rgba(255, 255, 255, 0.92);
    color: #2c3340;
    border-color: rgba(255, 255, 255, 0.95);
  }

  .allday-chip .recur {
    flex: 0 0 auto;
    opacity: 0.95;
  }

  .allday-chip .chip-title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .allday-chip[data-done="true"] .chip-title {
    text-decoration: line-through;
    text-decoration-thickness: 1.5px;
  }

  .time-grid[data-mode="day"] .allday-cell {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .time-grid[data-mode="day"] .allday-chip {
    width: auto;
    max-width: 100%;
    flex: 0 1 auto;
  }

  .day-head[data-clickable="true"] {
    cursor: pointer;
  }

  .day-head[data-clickable="true"]:hover {
    background: var(--hac-cell-hover, #f7fafc);
  }

  .day-head .num {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--hac-ink, #2c3340);
    letter-spacing: 0;
    text-transform: none;
  }

  .day-head[data-today="true"] {
    background: var(--hac-today-head, #fff6f1);
  }

  .day-head[data-today="true"] .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    margin: 0 auto;
    border-radius: 50%;
    background: var(--hac-today, #f08a5a);
    color: #fff;
  }

  .hours {
    display: flex;
    flex-direction: column;
    position: sticky;
    left: 0;
    z-index: 1;
    background: color-mix(in srgb, var(--hac-surface, #fff) 96%, transparent);
  }

  .hour-label {
    height: var(--hac-hour-height, 56px);
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--hac-muted, #8a93a3);
    text-align: right;
    padding: 0.15rem 0.45rem 0 0;
    border-right: 1px solid var(--hac-line, #e8ebf0);
    box-sizing: border-box;
  }

  .day-col {
    position: relative;
    border-left: 1px solid var(--hac-line, #e8ebf0);
    background: var(--hac-surface, #fff);
  }

  .day-col[data-today="true"] {
    background: var(--hac-today-bg, #fffaf7);
  }

  .day-head[data-drop="true"],
  .allday-cell[data-drop="true"],
  .day-col[data-drop="true"] {
    background: color-mix(
      in srgb,
      var(--hac-accent, #3d9b8f) 16%,
      var(--hac-surface, #fff)
    );
    box-shadow: inset 0 0 0 2px var(--hac-accent, #3d9b8f);
  }

  .hour-line {
    height: var(--hac-hour-height, 56px);
    box-sizing: border-box;
    border-bottom: 1px solid var(--hac-line, #e8ebf0);
  }

  .now-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--hac-today, #f08a5a);
    z-index: 2;
    pointer-events: none;
    box-shadow: 0 0 0 2px rgba(240, 138, 90, 0.15);
  }

  .now-line::before {
    content: "";
    position: absolute;
    left: -4px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--hac-today, #f08a5a);
  }

  .event-block {
    position: absolute;
    left: 3px;
    right: 3px;
    display: flex;
    align-items: flex-start;
    gap: 0.28rem;
    background: var(--hac-event);
    color: var(--hac-event-text);
    border-radius: 8px;
    padding: 0.22rem 0.35rem 0.22rem 0.22rem;
    font-size: 0.74rem;
    font-weight: 700;
    line-height: 1.25;
    overflow: hidden;
    border: 0;
    box-shadow: 0 1px 0 var(--hac-shadow-soft, rgba(44, 51, 64, 0.06));
    transition: transform 140ms ease, box-shadow 140ms ease, filter 140ms ease,
      opacity 140ms ease;
    -webkit-tap-highlight-color: transparent;
  }

  .event-block[data-draggable="true"] {
    cursor: grab;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }

  .event-block[data-dragging="true"] {
    opacity: 0.35;
  }

  .event-block[data-done="true"] {
    opacity: 0.62;
    filter: saturate(0.75);
  }

  .event-block[data-dragging="true"],
  .allday-chip[data-dragging="true"] {
    opacity: 0.35;
  }

  .event-block .done-check {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.05rem;
    height: 1.05rem;
    margin-top: 0.08rem;
    padding: 0;
    border: 1.5px solid rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 900;
    line-height: 1;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .event-block .done-check[aria-checked="true"] {
    background: rgba(255, 255, 255, 0.92);
    color: #2c3340;
    border-color: rgba(255, 255, 255, 0.95);
  }

  .event-block .chip-main {
    flex: 1 1 auto;
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    overflow: hidden;
  }

  .event-block[data-draggable="true"] .chip-main {
    cursor: grab;
  }

  .event-block .chip-main:hover,
  .event-block .chip-main:focus-visible,
  .event-block:hover,
  .event-block:focus-within {
    outline: none;
  }

  .event-block:hover,
  .event-block:focus-within {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 6px 14px var(--hac-shadow-soft, rgba(44, 51, 64, 0.12));
    filter: brightness(1.04);
  }

  .event-block[data-done="true"]:hover,
  .event-block[data-done="true"]:focus-within {
    filter: saturate(0.75) brightness(1.04);
  }

  .event-block strong {
    display: block;
    font-weight: 800;
  }

  .event-block[data-done="true"] strong {
    text-decoration: line-through;
    text-decoration-thickness: 1.5px;
  }

  .event-block .cal-tag {
    display: block;
    opacity: 0.9;
    font-size: 0.64rem;
    font-weight: 600;
  }

  .event-block .time-tag {
    display: block;
    opacity: 0.9;
    font-size: 0.64rem;
    font-weight: 600;
  }

  @media (max-width: 720px) {
    .time-grid[data-mode="week"] {
      grid-template-columns: 2.75rem repeat(7, minmax(5.25rem, 1fr));
      width: max-content;
      min-width: 100%;
    }

    .hour-label {
      font-size: 0.62rem;
      padding-right: 0.3rem;
    }

    .event-block {
      font-size: 0.7rem;
      padding: 0.22rem 0.3rem;
    }

    .allday-gutter {
      font-size: 0.56rem;
      padding-right: 0.28rem;
    }

    .allday-chip {
      font-size: 0.64rem;
      padding: 0.1rem 0.22rem 0.1rem 0.1rem;
    }
  }
`,at=s`
  :host {
    --hac-event: var(--hac-accent, #3d9b8f);
    font-family: var(--hac-font-body, "Nunito", "Avenir Next", "Segoe UI", sans-serif);
    color: var(--hac-ink, #2c3340);
  }

  .form-backdrop {
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, var(--hac-ink, #2c3340) 34%, transparent);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 10;
    animation: fade-in 160ms ease;
    padding: 0;
    /* Containing block for scope / confirm overlays */
    isolation: isolate;
  }

  @media (min-width: 640px) {
    .form-backdrop {
      align-items: center;
      padding: 1rem;
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
    width: min(440px, 100%);
    max-height: min(92vh, 720px);
    overflow: auto;
    background: var(--hac-surface, #fff);
    border-radius: 16px 16px 0 0;
    padding: 1.1rem 1.15rem 1.35rem;
    box-shadow: 0 -10px 36px var(--hac-shadow-soft, rgba(44, 51, 64, 0.18));
    animation: slide-up 220ms ease;
    color: var(--hac-ink, #2c3340);
  }

  @media (min-width: 640px) {
    .form-panel {
      border-radius: 16px;
      box-shadow: 0 16px 40px var(--hac-shadow-soft, rgba(44, 51, 64, 0.18));
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(16px);
      opacity: 0.55;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .form-title-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
    margin: 0 0 0.35rem;
  }

  .form-panel h2 {
    font-family: var(--hac-font-display, "Manrope", sans-serif);
    font-size: 1.28rem;
    margin: 0;
    letter-spacing: -0.02em;
    font-weight: 800;
  }

  .form-version {
    flex-shrink: 0;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--hac-muted, #8a93a3);
    font-variant-numeric: tabular-nums;
  }

  .form-sub {
    margin: 0 0 0.75rem;
    font-size: 0.82rem;
    color: var(--hac-muted, #8a93a3);
  }

  label {
    display: block;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--hac-muted, #8a93a3);
    margin: 0.65rem 0 0.25rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    font-size: 0.95rem;
    padding: 0.55rem 0.65rem;
    border: 1px solid var(--hac-line, #e8ebf0);
    border-radius: 10px;
    background: var(--hac-bg, #f7f8fa);
    color: var(--hac-ink, #2c3340);
    min-height: 2.5rem;
    transition: border-color 140ms ease, box-shadow 140ms ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: var(--hac-accent, #3d9b8f);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--hac-accent, #3d9b8f) 15%, transparent);
    background: var(--hac-surface, #fff);
  }

  input:disabled,
  select:disabled,
  textarea:disabled {
    opacity: 0.65;
  }

  .cal-select-row {
    display: flex;
    align-items: center;
    gap: 0.55rem;
  }

  .cal-select-row select {
    flex: 1 1 auto;
    min-width: 0;
  }

  .cal-swatch {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    flex: 0 0 auto;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hac-ink, #2c3340) 12%, transparent);
  }

  .cal-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.45rem;
  }

  .cal-legend-item {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border: 1px solid var(--hac-line, #e8ebf0);
    background: var(--hac-bg, #f7f8fa);
    border-radius: 999px;
    padding: 0.2rem 0.55rem 0.2rem 0.35rem;
    font: inherit;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--hac-ink, #2c3340);
    cursor: pointer;
    text-transform: capitalize;
  }

  .cal-legend-item[data-active="true"] {
    border-color: var(--hac-accent, #3d9b8f);
    background: var(--hac-surface, #fff);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--hac-accent, #3d9b8f) 12%, transparent);
  }

  .cal-legend-item:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .cal-legend-item .dot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  textarea {
    min-height: 4.5rem;
    resize: vertical;
  }

  .row-2 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0 0.75rem;
  }

  @media (min-width: 480px) {
    .row-2 {
      grid-template-columns: 1fr 1fr;
    }
  }

  .form-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1.15rem;
  }

  .form-actions.with-delete {
    justify-content: space-between;
  }

  .form-actions-end {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-left: auto;
  }

  .form-actions button,
  .scope-actions button {
    font: inherit;
    font-weight: 700;
    border-radius: 999px;
    padding: 0.5rem 1rem;
    min-height: 2.4rem;
    cursor: pointer;
    border: 1px solid var(--hac-line, #e8ebf0);
    background: var(--hac-surface, #fff);
    color: var(--hac-ink, #2c3340);
  }

  .form-actions button.primary {
    background: var(--hac-accent, #3d9b8f);
    border-color: var(--hac-accent, #3d9b8f);
    color: #fff;
  }

  .form-actions button.primary:hover:not(:disabled) {
    background: var(--hac-accent-hover, #318579);
  }

  .form-actions button.danger,
  .scope-actions button.danger {
    background: var(--hac-danger, #c45c5c);
    border-color: var(--hac-danger, #c45c5c);
    color: #fff;
  }

  .form-actions button.danger:hover:not(:disabled),
  .scope-actions button.danger:hover:not(:disabled) {
    filter: brightness(1.05);
  }

  .form-actions button:disabled,
  .scope-actions button:disabled,
  .scope-choice:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .scope-backdrop {
    position: absolute;
    inset: 0;
    z-index: 12;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: color-mix(in srgb, var(--hac-ink, #2c3340) 42%, transparent);
    animation: fade-in 140ms ease;
    padding: 0;
  }

  @media (min-width: 640px) {
    .scope-backdrop {
      align-items: center;
      padding: 1rem;
    }
  }

  .scope-panel {
    width: min(400px, 100%);
    background: var(--hac-surface, #fff);
    border-radius: 16px 16px 0 0;
    padding: 1.1rem 1.15rem 1.25rem;
    box-shadow: 0 -10px 36px var(--hac-shadow-soft, rgba(44, 51, 64, 0.18));
    animation: slide-up 200ms ease;
    color: var(--hac-ink, #2c3340);
  }

  @media (min-width: 640px) {
    .scope-panel {
      border-radius: 16px;
    }
  }

  .scope-panel h3 {
    margin: 0 0 0.35rem;
    font-family: var(--hac-font-display, "Manrope", sans-serif);
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .scope-sub {
    margin: 0 0 0.85rem;
    font-size: 0.82rem;
    color: var(--hac-muted, #8a93a3);
    line-height: 1.4;
  }

  .scope-choices {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .scope-choice {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
    width: 100%;
    text-align: left;
    font: inherit;
    border-radius: 12px;
    border: 1px solid var(--hac-line, #e8ebf0);
    background: var(--hac-bg, #f7f8fa);
    color: var(--hac-ink, #2c3340);
    padding: 0.7rem 0.85rem;
    cursor: pointer;
    transition: border-color 140ms ease, box-shadow 140ms ease,
      background 140ms ease;
  }

  .scope-choice:hover:not(:disabled) {
    border-color: var(--hac-accent, #3d9b8f);
    background: var(--hac-surface, #fff);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--hac-accent, #3d9b8f) 12%, transparent);
  }

  .scope-choice.danger-soft:hover:not(:disabled) {
    border-color: var(--hac-danger, #c45c5c);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--hac-danger, #c45c5c) 14%, transparent);
  }

  .scope-choice-title {
    font-weight: 800;
    font-size: 0.95rem;
  }

  .scope-choice-desc {
    font-size: 0.78rem;
    color: var(--hac-muted, #8a93a3);
    line-height: 1.35;
  }

  .scope-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: 0.95rem;
  }

  .scope-actions.split {
    justify-content: space-between;
  }

  .hint {
    font-size: 0.78rem;
    color: var(--hac-muted, #8a93a3);
    margin: 0.65rem 0 0;
    line-height: 1.35;
  }

  .hint.warn {
    color: var(--hac-warn, #9a6b1f);
  }

  .hint.error {
    color: var(--hac-danger, #c45c5c);
    background: var(--hac-danger-bg, #fdf4f4);
    border: 1px solid color-mix(in srgb, var(--hac-danger, #c45c5c) 20%, transparent);
    border-radius: 10px;
    padding: 0.55rem 0.7rem;
  }

  .reminder-block {
    margin-top: 1rem;
    padding: 0.75rem 0.8rem;
    border: 1px solid var(--hac-line, #e8ebf0);
    border-radius: 12px;
    background: color-mix(in srgb, var(--hac-accent, #3d9b8f) 8%, var(--hac-surface, #fff));
  }

  .recur-block {
    margin-top: 1rem;
    padding: 0.75rem 0.8rem;
    border: 1px solid var(--hac-line, #e8ebf0);
    border-radius: 12px;
    background: var(--hac-surface-muted, #f8f9fb);
  }

  .recur-block h3,
  .reminder-block h3 {
    margin: 0 0 0.35rem;
    font-family: var(--hac-font-display, "Manrope", sans-serif);
    font-size: 0.95rem;
    font-weight: 800;
  }

  .recur-block code {
    font-size: 0.78em;
  }

  .done-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.45rem 0.75rem;
    margin: 0.55rem 0 0.85rem;
    padding: 0.45rem 0.65rem;
    border: 1px solid var(--hac-line, #e8ebf0);
    border-radius: 10px;
    background: var(--hac-surface-muted, #f8f9fb);
  }

  .done-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--hac-ink, #2c3340);
    text-transform: none;
    letter-spacing: 0;
    cursor: pointer;
  }

  .done-toggle input {
    width: 1.05rem;
    height: 1.05rem;
    min-height: auto;
    margin: 0;
    accent-color: var(--hac-accent, #3d9b8f);
    cursor: pointer;
  }

  .done-label {
    line-height: 1.2;
  }

  .done-hint {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--hac-muted, #8a93a3);
  }

  .all-day-row {
    margin: 0.85rem 0 0.65rem;
    padding: 0.65rem 0.75rem;
    border: 1px solid var(--hac-line, #e8ebf0);
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--hac-accent, #3d9b8f) 10%,
      var(--hac-surface, #fff)
    );
  }

  .all-day-toggle {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin: 0;
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--hac-ink, #2c3340);
    text-transform: none;
    letter-spacing: 0;
    cursor: pointer;
  }

  .all-day-toggle input {
    width: 1.15rem;
    height: 1.15rem;
    min-height: auto;
    margin: 0;
    accent-color: var(--hac-accent, #3d9b8f);
    cursor: pointer;
  }

  .all-day-label {
    line-height: 1.2;
  }

  .reminder-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.55rem 0 0.25rem;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--hac-ink, #2c3340);
    text-transform: none;
    letter-spacing: 0;
  }

  .reminder-toggle input {
    width: auto;
    min-height: auto;
  }

  .reminder-fields[data-disabled="true"] {
    opacity: 0.45;
    pointer-events: none;
  }
`,it=/^\d{4}-\d{2}-\d{2}$/;function nt(e){return String(e).padStart(2,"0")}function st(e){const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;const r=Number(t[1]),a=Number(t[2]),i=Number(t[3]),n=new Date(r,a-1,i);return n.getFullYear()!==r||n.getMonth()!==a-1||n.getDate()!==i?null:n}function ot(e,t){const r=st(e.slice(0,10));return r?(r.setDate(r.getDate()+t),ke(r)):e}function lt(e){return`${e.getFullYear()}-${nt(e.getMonth()+1)}-${nt(e.getDate())}T${nt(e.getHours())}:${nt(e.getMinutes())}:${nt(e.getSeconds())}`}function ct(e,t){if(0===t)return e;if(it.test(e))return ot(e,t);const r=/(?:[zZ]|[+-]\d{2}:?\d{2})$/.test(e),a=/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/.exec(e);if(a&&!r){return lt(new Date(Number(a[1]),Number(a[2])-1,Number(a[3])+t,Number(a[4]),Number(a[5]),Number(a[6]??0)))}const i=new Date(e);if(Number.isNaN(i.getTime())){const r=e.slice(0,10);return it.test(r)?ot(r,t)+e.slice(10):e}return i.setDate(i.getDate()+t),r?i.toISOString():lt(i)}function dt(e,t,r){const a=function(e,t){const r=st(e),a=st(t);return r&&a?Math.round((a.getTime()-r.getTime())/864e5):null}(t,r);if(null===a||0===a)return null;const i=Boolean(e.all_day)||it.test(e.start)&&it.test(e.end),n=i?ot(e.start.slice(0,10),a):ct(e.start,a),s=i?ot(e.end.slice(0,10),a):ct(e.end,a),o=e.doneDates&&e.doneDates.length>0?e.doneDates:Pe(e),l=new Set(Ee({start:n,end:s}));return{start:n,end:s,doneDates:[...new Set(o.map(e=>ot(e,a)).filter(e=>l.has(e)))].sort()}}const ht=new Set(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function ut(e){const t=e.trim();return t&&ht.has(t)?`var(--${t}-color)`:t}function pt(e){if(!e||"string"!=typeof e)return!1;const t=e.trim();if(!t)return!1;if(ht.has(t))return!0;if(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(t))return!0;if(/^(rgb|hsl)a?\(/i.test(t))return!0;try{const e=(new Option).style;return e.color=t,""!==e.color}catch{return!1}}function mt(e){return ve[(e<0?0:e)%ve.length]}function ft(e,t,r,a){if(pt(r))return ut(r);const i=function(e,t){const r=e?.entities?.[t];if(!r)return;const a=r.display?.color;return"string"==typeof a?a:"string"==typeof r.color?r.color:void 0}(a,e);if(pt(i))return ut(i);const n=a?.states?.[e]?.attributes?.color;return"string"==typeof n&&pt(n)?ut(n):mt(t)}function gt(e){const t=e?.options?.calendar?.color;return"string"==typeof t?t:void 0}function yt(e,t,r){const a={};return e.forEach((e,i)=>{a[e]=ft(e,i,t[e],r)}),a}const vt="ha-calendar-card-theme";function bt(e){return"light"===e||"dark"===e||"auto"===e}function wt(e){try{const e=localStorage.getItem(vt);if(bt(e))return e}catch{}return bt(e)?e:"auto"}function $t(e){return"auto"===e?Boolean("undefined"!=typeof window&&window.matchMedia?.("(prefers-color-scheme: dark)").matches)?"dark":"light":e}function kt(e){return"light"===e?"Light":"dark"===e?"Dark":"Auto"}const xt={"clear-night":"Clear",cloudy:"Cloudy",fog:"Fog",hail:"Hail",lightning:"Storms","lightning-rainy":"Storms",partlycloudy:"Partly cloudy",pouring:"Downpour",rainy:"Rain",snowy:"Snow","snowy-rainy":"Sleet",sunny:"Sunny",windy:"Windy","windy-variant":"Windy",exceptional:"Alert"};function Dt(e){const t=e.weather_entity??e.weather;if(!t||"string"!=typeof t)return;return t.trim()||void 0}function _t(e){if(!Array.isArray(e))return[];const t=[];for(const r of e){if(!r||"object"!=typeof r)continue;const e=r,a=String(e.datetime??e.date??""),i=String(e.condition??e.state??"");a&&i&&t.push({datetime:a,condition:i,temperature:"number"==typeof e.temperature?e.temperature:void 0,templow:"number"==typeof e.templow?e.templow:void 0})}return t}function Ct(e){return _t(e.forecast??e.forecast_daily??e.forecast_twice_daily)}function Et(e,t){if(!e||"object"!=typeof e)return[];const r=e,a=(r.response&&"object"==typeof r.response?r.response:r)[t];return a&&"object"==typeof a?_t(a.forecast):[]}const St={sunny:{soft:"rgba(249, 196, 74, 0.28)",accent:"#f0b429",ink:"#8a5a00"},"clear-night":{soft:"rgba(120, 140, 200, 0.28)",accent:"#8fa0d4",ink:"#3d4a78"},partlycloudy:{soft:"rgba(140, 190, 220, 0.28)",accent:"#7eb6d4",ink:"#3a6078"},cloudy:{soft:"rgba(160, 170, 185, 0.28)",accent:"#9aa3b2",ink:"#4a5260"},fog:{soft:"rgba(180, 190, 200, 0.32)",accent:"#a8b2be",ink:"#555e6c"},rainy:{soft:"rgba(110, 170, 220, 0.3)",accent:"#5b9fd4",ink:"#2a5f88"},pouring:{soft:"rgba(80, 140, 210, 0.32)",accent:"#4a8bc8",ink:"#245078"},hail:{soft:"rgba(130, 180, 220, 0.3)",accent:"#7eb0d4",ink:"#355e80"},snowy:{soft:"rgba(190, 220, 245, 0.4)",accent:"#a8d0ef",ink:"#3d6488"},"snowy-rainy":{soft:"rgba(160, 200, 230, 0.35)",accent:"#8cbddc",ink:"#3a6280"},lightning:{soft:"rgba(180, 150, 220, 0.3)",accent:"#b08ad4",ink:"#5a3d78"},"lightning-rainy":{soft:"rgba(160, 140, 210, 0.32)",accent:"#9a7ac8",ink:"#4e3870"},windy:{soft:"rgba(140, 200, 190, 0.28)",accent:"#6db8ac",ink:"#2f6a62"},"windy-variant":{soft:"rgba(140, 200, 190, 0.28)",accent:"#6db8ac",ink:"#2f6a62"},exceptional:{soft:"rgba(230, 120, 100, 0.28)",accent:"#e07a5f",ink:"#8a3a28"}},At={sunny:"#ffd78a","clear-night":"#c5d0f5",partlycloudy:"#b8d8ef",cloudy:"#c8d0dc",fog:"#c8d0dc",rainy:"#9ec8ef",pouring:"#8ebcef",hail:"#a8d0ef",snowy:"#d0e8fa","snowy-rainy":"#b8d8ef",lightning:"#d4c0f0","lightning-rainy":"#c8b4e8",windy:"#a8ddd4","windy-variant":"#a8ddd4",exceptional:"#f0b0a0"};function Tt(e,t=!1){const r=e in St?e:function(e){return e.includes("lightning")?"lightning":e.includes("snow")?"snowy":e.includes("rain")||"pouring"===e?"rainy":e.includes("wind")?"windy":"clear-night"===e?"clear-night":"partlycloudy"===e?"partlycloudy":"sunny"===e?"sunny":"cloudy"===e?"cloudy":"fog"===e?"fog":"cloudy"}(e),a=St[r]??St.cloudy;return t?{soft:a.soft.replace(/0\.\d+/g,e=>{const t=Number(e);return String(Math.min(.45,t+.08))}),accent:a.accent,ink:At[r]??"#d0d6e0"}:a}function Mt(e){return e.includes("lightning")?"⛈️":"snowy-rainy"===e?"🌨️":e.includes("snow")?"❄️":"pouring"===e?"🌧️":"hail"===e?"🧊":e.includes("rain")?"🌦️":"fog"===e?"🌫️":"cloudy"===e?"☁️":"partlycloudy"===e?"⛅":"clear-night"===e?"🌙":"sunny"===e?"☀️":e.includes("wind")?"💨":"exceptional"===e?"⚠️":"🌤️"}function Pt(e,t){const r=t?.now??new Date,a=t?.dayStartHour??6,i=t?.dayEndHour??22,n=new Date(e);n.setHours(0,0,0,0);let s=r.getHours()+1;(function(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()})(n,r)||s<a&&(s=Math.max(a,9));const o=Math.max(a,i-2);s>o&&(s=o),s<a&&(s=a),n.setHours(s,0,0,0);const l=new Date(n);return l.setHours(s+1,0,0,0),{start:n,end:l}}function Nt(e){const t=e=>String(e).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}T${t(e.getHours())}:${t(e.getMinutes())}:00`}function Ot(e){return e===`custom:${fe}`||e===fe}function Lt(e,t){return!e&&!t||!(!e||!t)&&(e.length===t.length&&e.every((e,r)=>e===t[r]))}function Ht(e){const t="undefined"!=typeof location&&location.pathname||"/",r=(e.title??"").trim(),a=e.hac_id?.trim();return`ha-calendar-card-entities:${t}::${a||r||"default"}`}function Rt(e,t,r){try{return localStorage.setItem(Ht(e),JSON.stringify({entities:t,updatedAt:Date.now(),fingerprint:r??t})),!0}catch{return!1}}function zt(e){const t=Array.isArray(e.entities)?[...e.entities]:void 0,r=function(e){try{const t=localStorage.getItem(Ht(e));if(!t)return null;const r=JSON.parse(t);if(!Array.isArray(r?.entities))return null;const a=r.entities.filter(e=>"string"==typeof e&&e.startsWith("calendar."));return a.length?a:null}catch{return null}}(e);if(!r?.length)return t;if(!t?.length)return r;let a;try{const t=localStorage.getItem(Ht(e)),r=t?JSON.parse(t):null;Array.isArray(r?.fingerprint)&&(a=r.fingerprint)}catch{a=void 0}return a&&Lt(a,t)||t.every(e=>r.includes(e))&&r.length>t.length?r:(Rt(e,t),t)}function It(e){const t={type:e.type??`custom:${fe}`};return void 0!==e.title&&(t.title=e.title),e.entities&&(t.entities=[...e.entities]),e.initial_view&&(t.initial_view=e.initial_view),e.theme&&(t.theme=e.theme),void 0!==e.day_start_hour&&(t.day_start_hour=e.day_start_hour),void 0!==e.day_end_hour&&(t.day_end_hour=e.day_end_hour),void 0!==e.month_max_events&&(t.month_max_events=e.month_max_events),e.weather_entity&&(t.weather_entity=e.weather_entity),e.reminder_notify_service&&(t.reminder_notify_service=e.reminder_notify_service),void 0!==e.reminder_minutes_before&&(t.reminder_minutes_before=e.reminder_minutes_before),t}function Ft(e,t){if(!Array.isArray(e))return!1;let r=!1;for(const a of e)a&&"object"==typeof a&&(t(a)&&(r=!0),Array.isArray(a.cards)&&Ft(a.cards,t)&&(r=!0),a.card&&"object"==typeof a.card&&(t(a.card)&&(r=!0),Array.isArray(a.card.cards)&&Ft(a.card.cards,t)&&(r=!0)));return r}function Ut(e,t,r){const a=r.entities??[],i={count:0,matched:0},n=e=>function(e,t,r,a,i){return!!Ot(e.type)&&(i.count+=1,!(!Lt(e.entities,t)&&!Lt(e.entities,r)&&t||(Object.assign(e,{...e,...It(a),entities:[...r],type:e.type??`custom:${fe}`}),i.matched+=1,0)))}(e,t,a,r,i);let s=!1;for(const t of e.views??[]){Ft(t.cards,n)&&(s=!0);for(const e of t.sections??[])Ft(e.cards,n)&&(s=!0)}if(s)return!0;const o=[],l=e=>(Ot(e.type)&&o.push(e),!1);for(const t of e.views??[]){Ft(t.cards,l);for(const e of t.sections??[])Ft(e.cards,l)}return 1===o.length&&(Object.assign(o[0],{...o[0],...It(r),entities:[...a],type:o[0].type??`custom:${fe}`}),!0)}async function jt(e){const{hass:t,host:r,previousEntities:a,nextConfig:i}=e,n=i.entities??[],s=Rt(i,n,a??n);if(r.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...i,entities:[...n]}},bubbles:!0,composed:!0})),!t?.callWS)return{local:s,lovelace:"skipped",detail:"no callWS"};const o=function(e=("undefined"!=typeof location?location.pathname:"/")){const t=e.split("/").filter(Boolean);return t.length?"lovelace"===t[0]?null:t[0]:null}();try{const e=await t.callWS({type:"lovelace/config",url_path:o,force:!1}),r=JSON.parse(JSON.stringify(e));return Ut(r,a,i)?(await t.callWS({type:"lovelace/config/save",url_path:o,config:r}),Rt(i,n,n),{local:s,lovelace:"saved"}):{local:s,lovelace:"skipped",detail:"card not found in lovelace config"}}catch(e){const t=String(e&&"object"==typeof e&&"message"in e?e.message:e);return/yaml|read-only|not supported|cannot save/i.test(t)?{local:s,lovelace:"yaml",detail:t}:{local:s,lovelace:"error",detail:t}}}const Bt="calendar._hac_holidays",Yt="#D4537E";function Kt(e,t){const r=new Date(e.getFullYear(),e.getMonth(),e.getDate());return r.setDate(r.getDate()+t),r}function Wt(e,t,r,a){const i=(r-new Date(e,t,1).getDay()+7)%7;return new Date(e,t,1+i+7*(a-1))}function qt(e,t,r,a=!1){e.push({name:t,date:r,usOnly:a})}function Vt(e,t,r,a){qt(e,t,r,a);const i=function(e){const t=e.getDay();return 6===t?Kt(e,-1):0===t?Kt(e,1):e}(r);i.getTime()!==r.getTime()&&qt(e,`${t} (observed)`,i,!0)}function Gt(e){const t=[];return Vt(t,"New Year's Day",new Date(e,0,1),!1),qt(t,"Martin Luther King Jr. Day",Wt(e,0,1,3),!0),qt(t,"Valentine's Day",new Date(e,1,14)),qt(t,"Presidents Day",Wt(e,1,1,3),!0),qt(t,"St. Patrick's Day",new Date(e,2,17),!0),qt(t,"Easter",function(e){const t=e%19,r=Math.floor(e/100),a=e%100,i=Math.floor(r/4),n=r%4,s=Math.floor((r+8)/25),o=(19*t+r-i-Math.floor((r-s+1)/3)+15)%30,l=(32+2*n+2*Math.floor(a/4)-o-a%4)%7,c=Math.floor((t+11*o+22*l)/451),d=Math.floor((o+l-7*c+114)/31);return new Date(e,d-1,(o+l-7*c+114)%31+1)}(e)),qt(t,"Mother's Day",Wt(e,4,0,2),!0),qt(t,"Memorial Day",function(e,t,r){const a=new Date(e,t+1,0),i=(a.getDay()-r+7)%7;return new Date(e,t,a.getDate()-i)}(e,4,1),!0),Vt(t,"Juneteenth",new Date(e,5,19),!0),qt(t,"Father's Day",Wt(e,5,0,3),!0),Vt(t,"Independence Day",new Date(e,6,4),!0),qt(t,"Labor Day",Wt(e,8,1,1),!0),qt(t,"Columbus Day",Wt(e,9,1,2),!0),qt(t,"Halloween",new Date(e,9,31)),Vt(t,"Veterans Day",new Date(e,10,11),!0),qt(t,"Thanksgiving",Wt(e,10,4,4),!0),qt(t,"Christmas Eve",new Date(e,11,24)),Vt(t,"Christmas Day",new Date(e,11,25),!1),qt(t,"New Year's Eve",new Date(e,11,31)),t}function Xt(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()}const Jt={"presidents day":["washington's birthday","presidents' day","president's day"],"martin luther king jr. day":["mlk day","martin luther king day"],juneteenth:["juneteenth national independence day"],"independence day":["july 4th","fourth of july"],"new year's day":["new years day"],"christmas day":["christmas"],"veterans day":["veteran's day"]};function Qt(e){const t=e.trim().toLowerCase().replace(/\s+\(observed\)$/,""),r=new Set([e.trim().toLowerCase(),t]);for(const[e,a]of Object.entries(Jt))if(t===e||a.includes(t)){r.add(e);for(const e of a)r.add(e)}return[...r]}function Zt(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function er(e){return`${e.calendar}${e.uid}${e.recurrence_id??""}${e.start}${e.end}`}class tr{constructor(e){this.opts=e,this.payload=null,this.pointerId=-1,this.originX=0,this.originY=0,this.lastX=0,this.lastY=0,this.active=!1,this.dropDay=null,this.ghost=null,this.raf=0,this.listening=!1,this.ignoreClicksUntil=0,this.onPointerMove=e=>{if(!this.payload||e.pointerId!==this.pointerId)return;this.lastX=e.clientX,this.lastY=e.clientY;const t=e.clientX-this.originX,r=e.clientY-this.originY;if(!this.active){if(t*t+r*r<64)return;this.active=!0,function(){if(document.getElementById("hac-day-drag-style"))return;const e=document.createElement("style");e.id="hac-day-drag-style",e.textContent="\n    body.hac-event-dragging, body.hac-event-dragging * {\n      cursor: grabbing !important;\n      user-select: none !important;\n    }\n  ",document.head.appendChild(e)}(),document.body.classList.add("hac-event-dragging"),this.showGhost(e.clientX,e.clientY),this.opts.onVisual({dragId:this.payload.dragId,dropDay:null}),this.startScrollLoop()}e.cancelable&&e.preventDefault(),this.positionGhost(e.clientX,e.clientY),this.updateDrop(e.clientX,e.clientY)},this.onPointerUp=e=>{if(e.pointerId!==this.pointerId)return;const t=this.payload,r=this.dropDay,a=this.active;this.teardown(a),a&&t&&r&&r!==t.fromDay&&this.opts.onMove({event:t.event,fromDay:t.fromDay,toDay:r})},this.onPointerCancel=e=>{e.pointerId===this.pointerId&&this.teardown(this.active)},this.onKeyDown=e=>{"Escape"===e.key&&this.active&&(e.preventDefault(),this.teardown(!0))}}begin(e,t){if("mouse"===e.pointerType&&0!==e.button)return;const r=e.target instanceof Element?e.target:null;r?.closest(".done-check")||(this.listening&&this.teardown(!1),this.payload=t,this.pointerId=e.pointerId,this.originX=this.lastX=e.clientX,this.originY=this.lastY=e.clientY,this.active=!1,this.dropDay=null,this.bind())}consumeClick(e){return!(performance.now()>=this.ignoreClicksUntil)&&(e?.preventDefault(),e?.stopPropagation(),!0)}destroy(){this.unbind(),this.removeGhost(),this.stopScrollLoop(),this.clearGrabCursor(),this.payload=null,this.active=!1,this.dropDay=null,this.ignoreClicksUntil=0}bind(){window.addEventListener("pointermove",this.onPointerMove,{passive:!1}),window.addEventListener("pointerup",this.onPointerUp),window.addEventListener("pointercancel",this.onPointerCancel),window.addEventListener("keydown",this.onKeyDown,!0),this.listening=!0}unbind(){this.listening&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),window.removeEventListener("keydown",this.onKeyDown,!0),this.listening=!1)}teardown(e){const t=this.active;this.unbind(),this.removeGhost(),this.stopScrollLoop(),this.clearGrabCursor(),this.payload=null,this.active=!1,this.dropDay=null,t&&this.opts.onVisual({dragId:null,dropDay:null}),e&&t&&(this.ignoreClicksUntil=performance.now()+450)}showGhost(e,t){this.removeGhost();const r=this.payload;if(!r)return;const a=document.createElement("div");a.setAttribute("aria-hidden","true"),a.dataset.hacDragGhost="true",a.textContent=r.label,a.style.position="fixed",a.style.zIndex="2147483000",a.style.left="0",a.style.top="0",a.style.pointerEvents="none",a.style.maxWidth="16rem",a.style.padding="0.28rem 0.55rem",a.style.borderRadius="6px",a.style.color="#fff",a.style.font='700 0.78rem/1.3 Nunito, "Segoe UI", sans-serif',a.style.background=r.color||"#3d9b8f",a.style.boxShadow="0 10px 24px rgba(44, 51, 64, 0.28)",a.style.whiteSpace="nowrap",a.style.overflow="hidden",a.style.textOverflow="ellipsis",document.body.appendChild(a),this.ghost=a,this.positionGhost(e,t)}positionGhost(e,t){this.ghost&&(this.ghost.style.transform=`translate(${Math.round(e+14)}px, ${Math.round(t+16)}px)`)}removeGhost(){this.ghost?.remove(),this.ghost=null}refreshGhostLabel(){if(!this.ghost||!this.payload)return;const e=this.dropDay;e&&e!==this.payload.fromDay?this.ghost.textContent=`${this.payload.label} → ${function(e){const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);return t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3])).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}):e}(e)}`:this.ghost.textContent=this.payload.label}clearGrabCursor(){document.body.classList.remove("hac-event-dragging")}updateDrop(e,t){const r=this.dayAt(e,t);r!==this.dropDay&&(this.dropDay=r,this.refreshGhostLabel(),this.payload&&this.opts.onVisual({dragId:this.payload.dragId,dropDay:r}))}dayAt(e,t){const r=this.opts.getRoot();if(!r)return null;const a=function(e,t){let r=document,a=null;for(let i=0;i<8;i+=1){const i=r.elementFromPoint(e,t);if(!i||i===a)break;if(a=i,!i.shadowRoot)break;r=i.shadowRoot}return a}(e,t);if(!a)return null;const i=a.closest("[data-day]");if(!i||!r.contains(i))return null;const n=i.getAttribute("data-day");return n&&/^\d{4}-\d{2}-\d{2}$/.test(n)?n:null}startScrollLoop(){this.stopScrollLoop();const e=()=>{this.active&&(this.autoscroll(),this.raf=requestAnimationFrame(e))};this.raf=requestAnimationFrame(e)}stopScrollLoop(){this.raf&&cancelAnimationFrame(this.raf),this.raf=0}autoscroll(){const e=this.opts.getScroller(),t=e.getBoundingClientRect(),r=this.lastX,a=this.lastY;if(r<t.left||r>t.right||a<t.top||a>t.bottom)return;const i=56;let n=0,s=0;a<t.top+i?s=-Math.ceil((i-(a-t.top))/4):a>t.bottom-i&&(s=Math.ceil((i-(t.bottom-a))/4)),r<t.left+i?n=-Math.ceil((i-(r-t.left))/4):r>t.right-i&&(n=Math.ceil((i-(t.right-r))/4)),(n||s)&&(e.scrollLeft+=n,e.scrollTop+=s,this.updateDrop(r,a))}}function rr(e){const t=new Date(e);return t.setHours(0,0,0,0),t}function ar(e,t){const r=new Date(e);return r.setDate(r.getDate()+t),r}function ir(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function nr(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,r,a]=e.split("-").map(Number);return new Date(t,r-1,a)}return new Date(e)}function sr(e){if(e.all_day)return!0;if(/^\d{4}-\d{2}-\d{2}$/.test(e.start))return!0;const t=nr(e.start),r=nr(e.end),a=0===t.getHours()&&0===t.getMinutes()&&0===t.getSeconds()&&0===t.getMilliseconds();if(r<=t)return a;if(!a)return!1;return!(0!==r.getHours()||0!==r.getMinutes()||0!==r.getSeconds()||0!==r.getMilliseconds())||r.getTime()-t.getTime()>=864e5}let or=class extends oe{constructor(){super(...arguments),this.mode="week",this.anchorDate=new Date,this.events=[],this.calendars=[],this.calendarColors={},this.dayStartHour=6,this.dayEndHour=22,this.nowTick=0,this.activeDragKey=null,this.dropDay=null,this.drag=null}get dragEnabled(){return"week"===this.mode}get days(){const e=rr(this.anchorDate);if("day"===this.mode)return[e];const t=(e.getDay()+6)%7,r=ar(e,-t);return Array.from({length:7},(e,t)=>ar(r,t))}get hours(){const e=[];for(let t=this.dayStartHour;t<this.dayEndHour;t++)e.push(t);return e}calendarColor(e){if(this.calendarColors[e])return this.calendarColors[e];return mt(Math.max(0,this.calendars.indexOf(e)))}allDayEventsForDay(e){return this.events.filter(t=>sr(t)&&function(e,t){return Ce(e.start,e.end,t)}(t,e)).sort((e,t)=>nr(e.start).getTime()-nr(t.start).getTime()||e.summary.localeCompare(t.summary))}eventStyle(e,t){if(sr(e))return null;const r=nr(e.start),a=nr(e.end),i=new Date(t);i.setHours(this.dayStartHour,0,0,0);const n=new Date(t);if(n.setHours(this.dayEndHour,0,0,0),a<=i||r>=n)return null;const s=r<i?i:r,o=a>n?n:a,l=60*(s.getHours()-this.dayStartHour)+s.getMinutes(),c=Math.max(22,(o.getTime()-s.getTime())/6e4);return`top:${l/60*ge}px;height:${c/60*ge}px;background:${this.calendarColor(e.calendar)};`}nowLineTop(e){this.nowTick;const t=new Date;if(!ir(t,e))return null;if(t.getHours()<this.dayStartHour||t.getHours()>=this.dayEndHour)return null;return(60*(t.getHours()-this.dayStartHour)+t.getMinutes())/60*ge}formatTime(e){return e.all_day||/^\d{4}-\d{2}-\d{2}$/.test(e.start)?"All day":nr(e.start).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}disconnectedCallback(){super.disconnectedCallback(),this.drag?.destroy(),this.drag=null}ensureDrag(){return this.drag||(this.drag=new tr({getRoot:()=>this.shadowRoot,getScroller:()=>this,onVisual:({dragId:e,dropDay:t})=>{this.toggleAttribute("data-dragging",Boolean(e)),e===this.activeDragKey&&t===this.dropDay||(this.activeDragKey=e,this.dropDay=t)},onMove:e=>{this.dispatchEvent(new CustomEvent("event-move",{detail:e,bubbles:!0,composed:!0}))}})),this.drag}chipColor(e,t){const r=getComputedStyle(t).backgroundColor;return r&&"transparent"!==r&&"rgba(0, 0, 0, 0)"!==r?r:this.calendarColor(e.calendar)}onChipPointerDown(e,t,r){if(e.readonly||!this.dragEnabled)return;const a=r.currentTarget instanceof HTMLElement?r.currentTarget:null;a&&this.ensureDrag().begin(r,{event:e,fromDay:ke(t),dragId:er(e),label:e.summary,color:this.chipColor(e,a)})}onEventClick(e,t,r){if(r&&this.drag?.consumeClick(r))return;const a={event:e,day:ke(t)};this.dispatchEvent(new CustomEvent("event-select",{detail:a,bubbles:!0,composed:!0}))}onToggleDone(e,t,r){r.stopPropagation(),r.preventDefault();const a={event:e,day:ke(t)};this.dispatchEvent(new CustomEvent("event-toggle-done",{detail:a,bubbles:!0,composed:!0}))}onDayOpen(e,t){t&&this.drag?.consumeClick(t)||this.dispatchEvent(new CustomEvent("day-select",{detail:{date:rr(e)},bubbles:!0,composed:!0}))}onSlotCreate(e,t,r){if(r&&this.drag?.consumeClick(r))return;const a=new Date(e);a.setHours(t,0,0,0);const i=new Date(a);i.setHours(t+1,0,0,0),this.dispatchEvent(new CustomEvent("slot-create",{detail:{start:a,end:i},bubbles:!0,composed:!0}))}hourFromPointer(e,t){const r=t.getBoundingClientRect(),a=e.clientY-r.top;return this.dayStartHour+Math.floor(a/ge)}render(){const e=this.hours,t=this.days,r=e.length*ge,a=new Date;return B`
      <div
        class="time-grid"
        data-mode=${"month"===this.mode?"week":this.mode}
        style="--hac-hour-height:${ge}px"
      >
        <div class="corner"></div>
        ${t.map(e=>{const t=ir(e,a),r="week"===this.mode,i=ke(e);return B`
            <div
              class="day-head"
              data-day=${i}
              data-today=${t?"true":"false"}
              data-drop=${this.dropDay===i?"true":"false"}
              data-clickable=${r?"true":"false"}
              title=${r?"Open day view · drop an event to move it here":K}
              role=${r?"button":K}
              tabindex=${r?0:K}
              @click=${r?t=>this.onDayOpen(e,t):void 0}
              @keydown=${r?t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.onDayOpen(e))}:void 0}
            >
              <span
                >${e.toLocaleDateString(void 0,{weekday:"short"})}</span
              >
              <span class="num">${e.getDate()}</span>
            </div>
          `})}

        <div class="allday-gutter" aria-hidden="true">All day</div>
        ${t.map(e=>{const t=ir(e,a),r=ke(e),i=this.allDayEventsForDay(e);return B`
            <div
              class="allday-cell"
              data-day=${r}
              data-today=${t?"true":"false"}
              data-drop=${this.dropDay===r?"true":"false"}
              data-count=${String(i.length)}
            >
              ${i.map(t=>{const a=t.calendar.replace(/^calendar\./,""),i=Me(t,r),n=er(t),s=this.dragEnabled&&!t.readonly;return B`
                  <div
                    class="allday-chip"
                    data-summary=${t.summary}
                    data-done=${i?"true":"false"}
                    data-readonly=${t.readonly?"true":"false"}
                    data-draggable=${s?"true":"false"}
                    data-dragging=${this.activeDragKey===n?"true":"false"}
                    style="background:${this.calendarColor(t.calendar)}"
                    @pointerdown=${r=>this.onChipPointerDown(t,e,r)}
                    @dragstart=${e=>e.preventDefault()}
                  >
                    ${t.readonly?K:B`<button
                          type="button"
                          class="done-check"
                          role="checkbox"
                          aria-checked=${i?"true":"false"}
                          aria-label=${i?`Mark “${t.summary}” not done for this day`:`Mark “${t.summary}” done for this day`}
                          title=${i?"Mark not done (this day)":"Mark done (this day)"}
                          @pointerdown=${e=>e.stopPropagation()}
                          @click=${r=>this.onToggleDone(t,e,r)}
                        >
                          ${i?"✓":K}
                        </button>`}
                    <button
                      type="button"
                      class="chip-main"
                      title=${t.readonly?`${t.summary}. Built-in holiday.`:`${t.summary}${t.rrule||t.recurring?" (repeats)":""} · ${a}${s?". Drag to another day.":""}`}
                      @click=${r=>{r.stopPropagation(),this.onEventClick(t,e,r)}}
                    >
                      ${t.rrule||t.recurring?B`<span class="recur" aria-hidden="true">↻</span>`:K}<span class="chip-title">${t.summary}</span>
                    </button>
                  </div>
                `})}
            </div>
          `})}

        <div class="hours" style="height:${r}px">
          ${e.map(e=>B`<div class="hour-label">
                ${String(e).padStart(2,"0")}:00
              </div>`)}
        </div>

        ${t.map(t=>{const i=ir(t,a),n=ke(t),s=this.nowLineTop(t);return B`
            <div
              class="day-col"
              data-day=${n}
              data-today=${i?"true":"false"}
              data-drop=${this.dropDay===n?"true":"false"}
              style="height:${r}px"
              @dblclick=${e=>{const r=this.hourFromPointer(e,e.currentTarget);this.onSlotCreate(t,r,e)}}
            >
              ${e.map(()=>B`<div class="hour-line"></div>`)}
              ${null!==s?B`<div class="now-line" style="top:${s}px"></div>`:K}
              ${this.events.map(e=>{const r=this.eventStyle(e,t);if(!r)return K;const a=e.calendar.replace(/^calendar\./,""),i=Me(e,n),s=er(e),o=this.dragEnabled&&!e.readonly;return B`
                  <div
                    class="event-block"
                    style=${r}
                    data-summary=${e.summary}
                    data-done=${i?"true":"false"}
                    data-readonly=${e.readonly?"true":"false"}
                    data-draggable=${o?"true":"false"}
                    data-dragging=${this.activeDragKey===s?"true":"false"}
                    data-recurring=${e.rrule||e.recurring?"true":"false"}
                    @pointerdown=${r=>this.onChipPointerDown(e,t,r)}
                    @dragstart=${e=>e.preventDefault()}
                  >
                    ${e.readonly?K:B`<button
                          type="button"
                          class="done-check"
                          role="checkbox"
                          aria-checked=${i?"true":"false"}
                          aria-label=${i?`Mark “${e.summary}” not done for this day`:`Mark “${e.summary}” done for this day`}
                          title=${i?"Mark not done (this day)":"Mark done (this day)"}
                          @pointerdown=${e=>e.stopPropagation()}
                          @click=${r=>this.onToggleDone(e,t,r)}
                        >
                          ${i?"✓":K}
                        </button>`}
                    <button
                      type="button"
                      class="chip-main"
                      title=${e.readonly?`${e.summary}. Built-in holiday.`:`${e.summary}${e.rrule||e.recurring?" (repeats)":""}${o?". Drag to another day.":""}`}
                      @click=${r=>{r.stopPropagation(),this.onEventClick(e,t,r)}}
                    >
                      <strong
                        >${e.rrule||e.recurring?"↻ ":""}${e.summary}</strong
                      >
                      <span class="time-tag">${this.formatTime(e)}</span>
                      <span class="cal-tag">${a}</span>
                    </button>
                  </div>
                `})}
            </div>
          `})}
      </div>
    `}};function lr(e){const t=new Date(e);return t.setHours(0,0,0,0),t}function cr(e,t){const r=new Date(e);return r.setDate(r.getDate()+t),r}function dr(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,r,a]=e.split("-").map(Number);return new Date(t,r-1,a)}return new Date(e)}or.styles=rt,e([ue({attribute:!1})],or.prototype,"mode",void 0),e([ue({attribute:!1})],or.prototype,"anchorDate",void 0),e([ue({attribute:!1})],or.prototype,"events",void 0),e([ue({attribute:!1})],or.prototype,"calendars",void 0),e([ue({attribute:!1})],or.prototype,"calendarColors",void 0),e([ue({type:Number})],or.prototype,"dayStartHour",void 0),e([ue({type:Number})],or.prototype,"dayEndHour",void 0),e([ue({type:Number})],or.prototype,"nowTick",void 0),e([pe()],or.prototype,"activeDragKey",void 0),e([pe()],or.prototype,"dropDay",void 0),or=e([ce("hac-time-grid")],or);let hr=class extends oe{constructor(){super(...arguments),this.anchorDate=new Date,this.events=[],this.calendars=[],this.calendarColors={},this.weather=null,this.maxVisible=6,this.activeDragKey=null,this.dropDay=null,this.drag=null,this.dayClickTimer=null}get monthStart(){const e=lr(this.anchorDate);return e.setDate(1),e}get cells(){const e=this.monthStart,t=(e.getDay()+6)%7,r=cr(e,-t);return Array.from({length:42},(e,t)=>cr(r,t))}calendarColor(e){if(this.calendarColors[e])return this.calendarColors[e];return mt(Math.max(0,this.calendars.indexOf(e)))}eventsForDay(e){return this.events.filter(t=>Ce(t.start,t.end,e)).sort((e,t)=>dr(e.start).getTime()-dr(t.start).getTime())}disconnectedCallback(){super.disconnectedCallback(),this.clearDayClickTimer(),this.drag?.destroy(),this.drag=null}ensureDrag(){return this.drag||(this.drag=new tr({getRoot:()=>this.shadowRoot,getScroller:()=>this,onVisual:({dragId:e,dropDay:t})=>{this.toggleAttribute("data-dragging",Boolean(e)),e&&this.clearDayClickTimer(),e===this.activeDragKey&&t===this.dropDay||(this.activeDragKey=e,this.dropDay=t)},onMove:e=>{this.dispatchEvent(new CustomEvent("event-move",{detail:e,bubbles:!0,composed:!0}))}})),this.drag}chipColor(e,t){const r=getComputedStyle(t).backgroundColor;return r&&"transparent"!==r&&"rgba(0, 0, 0, 0)"!==r?r:this.calendarColor(e.calendar)}onChipPointerDown(e,t,r){if(e.readonly)return;const a=r.currentTarget instanceof HTMLElement?r.currentTarget:null;a&&this.ensureDrag().begin(r,{event:e,fromDay:ke(t),dragId:er(e),label:e.summary,color:this.chipColor(e,a)})}clearDayClickTimer(){null!==this.dayClickTimer&&(window.clearTimeout(this.dayClickTimer),this.dayClickTimer=null)}onEventClick(e,t,r){if(r.stopPropagation(),this.clearDayClickTimer(),this.drag?.consumeClick(r))return;const a={event:e,day:ke(t)};this.dispatchEvent(new CustomEvent("event-select",{detail:a,bubbles:!0,composed:!0}))}onToggleDone(e,t,r){r.stopPropagation(),r.preventDefault(),this.clearDayClickTimer();const a={event:e,day:ke(t)};this.dispatchEvent(new CustomEvent("event-toggle-done",{detail:a,bubbles:!0,composed:!0}))}onDayOpen(e){this.dispatchEvent(new CustomEvent("day-select",{detail:{date:lr(e)},bubbles:!0,composed:!0}))}onDayClick(e,t){this.drag?.consumeClick(t)||(this.clearDayClickTimer(),this.dayClickTimer=window.setTimeout(()=>{this.dayClickTimer=null,this.onDayOpen(e)},250))}onDayCreate(e,t){if(this.drag?.consumeClick(t))return;this.clearDayClickTimer();const{start:r,end:a}=Pt(e);this.dispatchEvent(new CustomEvent("slot-create",{detail:{start:r,end:a},bubbles:!0,composed:!0}))}render(){const e=new Date,t=this.monthStart.getMonth();return B`
      <div class="month">
        <div class="dow">
          ${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(e=>B`<span>${e}</span>`)}
        </div>
        <div class="cells">
          ${this.cells.map(r=>{const a=r.getMonth()!==t,i=function(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}(r,e),n=ke(r),s=this.eventsForDay(r),o=s.slice(0,this.maxVisible),l=s.length-o.length,c=function(e,t){if(!e?.forecast?.length)return null;const r=[t.getFullYear(),String(t.getMonth()+1).padStart(2,"0"),String(t.getDate()).padStart(2,"0")].join("-");return e.forecast.find(e=>e.datetime.slice(0,10)===r)??null}(this.weather,r);return B`
              <div
                class="cell"
                data-day=${n}
                data-outside=${a?"true":"false"}
                data-today=${i?"true":"false"}
                data-drop=${this.dropDay===n?"true":"false"}
                title="Click for day view · double-click to add · drag events between days"
                @click=${e=>this.onDayClick(r,e)}
                @dblclick=${e=>this.onDayCreate(r,e)}
              >
                <div class="cell-top">
                  <span class="num">${r.getDate()}</span>
                  ${c?B`<span class="wx"
                        >${d=c.condition,d.includes("lightning")?"⚡":d.includes("snow")?"❄":d.includes("rain")||"pouring"===d||"hail"===d?"🌧":"fog"===d?"fog":"cloudy"===d?"☁":"partlycloudy"===d?"⛅":"clear-night"===d?"☾":"sunny"===d?"☀":d.includes("wind")?"🌬":"·"}${null!=c.temperature?` ${Math.round(c.temperature)}°`:""}</span
                      >`:K}
                </div>
                <div class="events">
                  ${o.map(e=>{const t=Me(e,n),a=er(e);return B`
                      <div
                        class="chip"
                        data-summary=${e.summary}
                        data-done=${t?"true":"false"}
                        data-dragging=${this.activeDragKey===a?"true":"false"}
                        data-readonly=${e.readonly?"true":"false"}
                        style="background:${this.calendarColor(e.calendar)}"
                        @pointerdown=${t=>this.onChipPointerDown(e,r,t)}
                        @dragstart=${e=>e.preventDefault()}
                      >
                        ${e.readonly?K:B`<button
                              type="button"
                              class="done-check"
                              role="checkbox"
                              aria-checked=${t?"true":"false"}
                              aria-label=${t?`Mark “${e.summary}” not done for this day`:`Mark “${e.summary}” done for this day`}
                              title=${t?"Mark not done (this day)":"Mark done (this day)"}
                              @pointerdown=${e=>e.stopPropagation()}
                              @click=${t=>this.onToggleDone(e,r,t)}
                            >
                              ${t?"✓":K}
                            </button>`}
                        <button
                          type="button"
                          class="chip-main"
                          title=${e.readonly?`${e.summary}. Built-in holiday.`:`${e.summary}${e.rrule||e.recurring?" (repeats)":""}. Drag to another day.`}
                          @click=${t=>this.onEventClick(e,r,t)}
                        >
                          ${e.rrule||e.recurring?B`<span class="recur" aria-hidden="true"
                                >↻</span
                              >`:K}<span class="t"
                            >${function(e){return e.all_day||/^\d{4}-\d{2}-\d{2}$/.test(e.start)?"All day":dr(e.start).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}(e)}</span
                          >${e.summary}
                        </button>
                      </div>
                    `})}
                  ${l>0?B`<div class="more">+${l} more</div>`:K}
                  ${a||0!==s.length?K:B`<div class="empty">No events</div>`}
                </div>
              </div>
            `;var d})}
        </div>
      </div>
    `}};hr.styles=s`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      /* Join shell → grid-wrap flex cascade; data-fill still shrinks month rows */
      min-height: 0;
      overflow: auto;
      overscroll-behavior: contain;
      box-sizing: border-box;
      font-family: var(--hac-font-body, "Nunito", "Avenir Next", "Segoe UI", sans-serif);
      color: var(--hac-ink, #2c3340);
      background: var(--hac-surface, #fff);
    }

    .month {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
    }

    .dow {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      border-bottom: 1px solid var(--hac-line, #e8ebf0);
      background: var(--hac-surface-muted, #fafbfc);
    }

    .dow span {
      text-align: center;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--hac-muted, #8a93a3);
      padding: 0.55rem 0.25rem;
    }

    .cells {
      flex: 1 1 auto;
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      /* Tall enough for ~6 chips + “+N more” when not panel-filling */
      grid-auto-rows: minmax(9.5rem, 1fr);
      min-height: 0;
    }

    /* Panel fill: shrink rows into the available body (outer page must not scroll) */
    :host([data-fill]) .cells {
      grid-auto-rows: minmax(0, 1fr);
    }

    :host([data-dragging]),
    :host([data-dragging]) .chip,
    :host([data-dragging]) .cell {
      cursor: grabbing;
    }

    .cell {
      border-right: 1px solid var(--hac-line, #e8ebf0);
      border-bottom: 1px solid var(--hac-line, #e8ebf0);
      padding: 0.35rem 0.35rem 0.4rem;
      min-height: 0;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      background: var(--hac-surface, #fff);
      cursor: pointer;
      transition: background 140ms ease;
    }

    .cell:nth-child(7n) {
      border-right: 0;
    }

    .cell:hover {
      background: var(--hac-cell-hover, #f7fafc);
    }

    .cell[data-outside="true"] {
      background: var(--hac-outside-bg, #fbfcfd);
      color: var(--hac-outside-ink, #b0b7c3);
    }

    .cell[data-today="true"] {
      background: var(--hac-today-bg, #fffaf7);
    }

    .cell[data-drop="true"],
    .cell[data-drop="true"]:hover {
      background: color-mix(
        in srgb,
        var(--hac-accent, #3d9b8f) 18%,
        var(--hac-surface, #fff)
      );
      box-shadow: inset 0 0 0 2px var(--hac-accent, #3d9b8f);
    }

    .cell-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.25rem;
      min-height: 1.4rem;
    }

    .num {
      font-size: 0.85rem;
      font-weight: 700;
      width: 1.5rem;
      height: 1.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .cell[data-today="true"] .num {
      background: var(--hac-today, #f08a5a);
      color: #fff;
    }

    .wx {
      font-size: 0.68rem;
      color: var(--hac-muted, #8a93a3);
      font-weight: 600;
      white-space: nowrap;
    }

    .events {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      min-height: 0;
      overflow: hidden;
    }

    .chip {
      display: flex;
      align-items: center;
      gap: 0.18rem;
      border: 0;
      border-radius: 6px;
      padding: 0.08rem 0.28rem 0.08rem 0.1rem;
      font: inherit;
      font-size: 0.68rem;
      font-weight: 700;
      line-height: 1.25;
      color: #fff;
      text-align: left;
      overflow: hidden;
      cursor: grab;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      transition: filter 120ms ease, transform 120ms ease, opacity 120ms ease;
    }

    .chip[data-dragging="true"] {
      opacity: 0.35;
    }

    .chip[data-readonly="true"] {
      cursor: default;
      touch-action: auto;
    }

    .chip[data-done="true"] {
      opacity: 0.62;
      filter: saturate(0.75);
    }

    .chip:hover {
      filter: brightness(1.05);
      transform: translateY(-0.5px);
    }

    .chip[data-done="true"]:hover {
      filter: saturate(0.75) brightness(1.05);
    }

    .chip .done-check {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 0.95rem;
      height: 0.95rem;
      margin: 0;
      padding: 0;
      border: 1.5px solid rgba(255, 255, 255, 0.9);
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
      font-size: 0.65rem;
      font-weight: 900;
      line-height: 1;
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    .chip .done-check[aria-checked="true"] {
      background: rgba(255, 255, 255, 0.92);
      color: #2c3340;
      border-color: rgba(255, 255, 255, 0.95);
    }

    .chip .chip-main {
      flex: 1 1 auto;
      min-width: 0;
      margin: 0;
      padding: 0;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      font-weight: inherit;
      text-align: left;
      cursor: grab;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chip[data-done="true"] .chip-main {
      text-decoration: line-through;
      text-decoration-thickness: 1.5px;
    }

    .chip .t {
      font-weight: 600;
      opacity: 0.92;
      margin-right: 0.2rem;
    }

    .chip .recur {
      font-weight: 800;
      opacity: 0.95;
      margin-right: 0.15rem;
    }

    .more {
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--hac-muted, #8a93a3);
      padding: 0.05rem 0.2rem;
      cursor: pointer;
      flex: 0 0 auto;
    }

    .empty {
      font-size: 0.65rem;
      font-weight: 600;
      color: var(--hac-faint, #c2c8d2);
      padding: 0.1rem 0.15rem;
    }

    @media (max-width: 720px) {
      .cells {
        grid-auto-rows: minmax(7.5rem, 1fr);
      }

      :host([data-fill]) .cells {
        grid-auto-rows: minmax(0, 1fr);
      }

      .chip {
        font-size: 0.62rem;
        padding: 0.08rem 0.22rem 0.08rem 0.08rem;
      }

      .chip .done-check {
        width: 0.88rem;
        height: 0.88rem;
      }

      .empty {
        display: none;
      }
    }
  `,e([ue({attribute:!1})],hr.prototype,"anchorDate",void 0),e([ue({attribute:!1})],hr.prototype,"events",void 0),e([ue({attribute:!1})],hr.prototype,"calendars",void 0),e([ue({attribute:!1})],hr.prototype,"calendarColors",void 0),e([ue({attribute:!1})],hr.prototype,"weather",void 0),e([ue({type:Number})],hr.prototype,"maxVisible",void 0),e([pe()],hr.prototype,"activeDragKey",void 0),e([pe()],hr.prototype,"dropDay",void 0),hr=e([ce("hac-month-grid")],hr);const ur=["SU","MO","TU","WE","TH","FR","SA"];function pr(e){if(!e)return"none";const t=/FREQ=(DAILY|WEEKLY|MONTHLY|YEARLY)/i.exec(e);return t?t[1].toLowerCase():"none"}function mr(e){return/^\d{4}-\d{2}-\d{2}$/.test(e)}function fr(e){if(mr(e))return new Date(`${e}T12:00:00`);const t=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(e);return t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3]),Number(t[4]),Number(t[5]),Number(t[6]??"0")):new Date(e)}function gr(e){if("none"===e.freq)return;const t=[`FREQ=${e.freq.toUpperCase()}`];if("weekly"===e.freq){const a=fr(e.startIso);Number.isNaN(a.getTime())||t.push(`BYDAY=${r=a,ur[r.getDay()]}`)}var r;if(e.untilDate&&/^\d{4}-\d{2}-\d{2}$/.test(e.untilDate)){const r=e.untilDate.replace(/-/g,"");mr(e.startIso)?t.push(`UNTIL=${r}`):t.push(`UNTIL=${r}T${function(e){const t=/T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(e);if(t)return`${t[1]}${t[2]}${t[3]??"00"}`;const r=new Date(e);if(Number.isNaN(r.getTime()))return"000000";const a=e=>String(e).padStart(2,"0");return`${a(r.getHours())}${a(r.getMinutes())}${a(r.getSeconds())}`}(e.startIso)}`)}return t.join(";")}function yr(e,t){const r=e.slice(0,10),a=t.slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(r)||!/^\d{4}-\d{2}-\d{2}$/.test(a)||r===a)return{end:t,adjusted:!1};let i=`${r}T${t.includes("T")?t.slice(11,16):"10:00"}`;if(i<=e.slice(0,16)){const t=fr(16===e.length?`${e}:00`:e);t.setHours(t.getHours()+1);const a=e=>String(e).padStart(2,"0");i=`${r}T${a(t.getHours())}:${a(t.getMinutes())}`}return{end:i,adjusted:!0}}let vr=class extends oe{constructor(){super(...arguments),this.calendars=[],this.calendarColors={},this.event=null,this.doneDay="",this.defaults={},this.busy=!1,this.errorMessage="",this.remindersAvailable=!1,this.canDelete=!0,this.reminderDefaults={},this.reminder=null,this.summary="",this.description="",this.location="",this.start="",this.end="",this.completed=!1,this.allDay=!1,this.calendar="",this.moveNote="",this.reminderEnabled=!1,this.reminderMinutes=30,this.reminderNotify="notify.mobile_app_phone",this.reminderMessage="",this.hydrateKey="",this.recurFreq="none",this.recurUntil="",this.validationError="",this.scopePrompt=null,this.confirmDelete=!1,this.savedTimedStart="",this.savedTimedEnd=""}connectedCallback(){super.connectedCallback(),this.hydrateEventFields(!0),this.applyReminderFields(!0)}updated(e){e.has("event")||e.has("defaults")||e.has("doneDay")?(this.hydrateEventFields(),this.applyReminderFields(!0),this.scopePrompt=null,this.confirmDelete=!1):(e.has("reminder")||e.has("reminderDefaults"))&&this.applyReminderFields(!1)}eventKey(){return this.event?`edit:${this.event.calendar}:${this.event.uid}:${this.event.recurrence_id??""}:${this.doneDay}`:`create:${this.defaults.start??""}:${this.defaults.end??""}:${this.defaults.calendar??""}`}resolveDoneDay(e){return this.doneDay&&/^\d{4}-\d{2}-\d{2}$/.test(this.doneDay)?this.doneDay:e.slice(0,10)}isMultiDaySpan(e,t){return Ee({start:e,end:t}).length>1}hydrateEventFields(e=!1){const t=this.eventKey();if(e||t!==this.hydrateKey){if(this.hydrateKey=t,this.savedTimedStart="",this.savedTimedEnd="",this.event){this.summary=this.event.summary,this.description=this.event.description??"",this.location=this.event.location??"";const e=this.resolveDoneDay(this.event.start);this.completed=Me(this.event,e),this.allDay=Boolean(this.event.all_day||/^\d{4}-\d{2}-\d{2}$/.test(this.event.start)),this.allDay?(this.start=this.event.start.slice(0,10),this.end=this.exclusiveEndToInclusive(this.start,this.event.end.slice(0,10))):(this.start=this.toLocalInput(this.event.start),this.end=this.toLocalInput(this.event.end),this.savedTimedStart=this.start,this.savedTimedEnd=this.end),this.calendar=this.event.calendar,this.recurFreq=pr(this.event.rrule),this.recurUntil=function(e){if(!e)return"";const t=/UNTIL=(\d{8})(?:T\d{6}Z?)?/i.exec(e);if(!t)return"";const r=t[1];return`${r.slice(0,4)}-${r.slice(4,6)}-${r.slice(6,8)}`}(this.event.rrule)}else{this.summary="",this.description="",this.location="",this.completed=!1;const e=this.defaults.start??(new Date).toISOString(),t=this.defaults.end??new Date(Date.now()+36e5).toISOString();this.allDay=/^\d{4}-\d{2}-\d{2}$/.test(e),this.allDay?(this.start=e.slice(0,10),this.end=this.exclusiveEndToInclusive(this.start,/^\d{4}-\d{2}-\d{2}$/.test(t)?t.slice(0,10):this.start)):(this.start=this.toLocalInput(e),this.end=this.toLocalInput(t),this.savedTimedStart=this.start,this.savedTimedEnd=this.end),this.calendar=this.defaults.calendar??this.calendars[0]??"",this.recurFreq="none",this.recurUntil=""}this.moveNote="",this.validationError=""}}applyReminderFields(e){if(this.reminder)return this.reminderEnabled=Boolean(this.reminder.enabled),this.reminderMinutes=this.reminder.minutes_before,this.reminderNotify=this.reminder.notify_service,void(this.reminderMessage=this.reminder.message??"");e&&(this.reminderEnabled=!1,this.reminderMinutes=this.reminderDefaults.minutes_before??30,this.reminderNotify=this.reminderDefaults.notify_service||"notify.mobile_app_phone",this.reminderMessage="")}get calendarOptions(){const e=new Set,t=[],r=r=>{r&&!e.has(r)&&(e.add(r),t.push(r))};this.event?.calendar&&r(this.event.calendar),this.calendar&&r(this.calendar);for(const e of this.calendars)r(e);return t}toLocalInput(e){const t=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T09:00:00`):new Date(e);if(Number.isNaN(t.getTime()))return"";const r=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}T${r(t.getHours())}:${r(t.getMinutes())}`}fromLocalInput(e){const t=/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})(?::(\d{2}))?/.exec(e);if(t)return`${t[1]}:${t[2]??"00"}`;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const r=new Date(e);if(Number.isNaN(r.getTime()))return e;const a=e=>String(e).padStart(2,"0");return`${r.getFullYear()}-${a(r.getMonth()+1)}-${a(r.getDate())}T${a(r.getHours())}:${a(r.getMinutes())}:${a(r.getSeconds())}`}datePart(e){return e.slice(0,10)}addDays(e,t){const r=new Date(`${e}T12:00:00`);r.setDate(r.getDate()+t);const a=e=>String(e).padStart(2,"0");return`${r.getFullYear()}-${a(r.getMonth()+1)}-${a(r.getDate())}`}exclusiveEndToInclusive(e,t){return/^\d{4}-\d{2}-\d{2}$/.test(t)?t<=e?e:this.addDays(t,-1):e}inclusiveEndToExclusive(e,t){const r=/^\d{4}-\d{2}-\d{2}$/.test(t)&&t>=e?t:e;return this.addDays(r,1)}onAllDayChange(e){const t=e.target.checked;if(t!==this.allDay){if(t){this.start.includes("T")&&(this.savedTimedStart=this.start),this.end.includes("T")&&(this.savedTimedEnd=this.end);const e=this.datePart(this.start);let t=this.datePart(this.end);t<e&&(t=e),this.start=e,this.end=t,this.allDay=!0}else{const e=this.datePart(this.start),t=this.datePart(this.end),r=`${e}T09:00`,a=`${t>=e?t:e}T10:00`,i=this.savedTimedStart&&this.datePart(this.savedTimedStart)===e?this.savedTimedStart:this.savedTimedStart?`${e}T${this.savedTimedStart.slice(11,16)||"09:00"}`:r,n=this.savedTimedEnd&&this.datePart(this.savedTimedEnd)===t?this.savedTimedEnd:this.savedTimedEnd?`${t>=e?t:e}T${this.savedTimedEnd.slice(11,16)||"10:00"}`:a;this.start=i,this.end=n>i?n:`${this.datePart(i)}T10:00`,this.end<=this.start&&(this.start=`${e}T09:00`,this.end=`${e}T10:00`),this.allDay=!1}this.refreshValidation()}}get untilInvalid(){return"none"!==this.recurFreq&&function(e,t){if(!e||!/^\d{4}-\d{2}-\d{2}$/.test(e))return!1;const r=t.slice(0,10);return!!/^\d{4}-\d{2}-\d{2}$/.test(r)&&e<r}(this.recurUntil||void 0,this.start)}get allDayRangeInvalid(){return!!(this.allDay&&this.start&&this.end)&&this.end<this.start}get recurringMultiDay(){return!this.allDay&&(!("none"===this.recurFreq||!this.start||!this.end)&&this.start.slice(0,10)!==this.end.slice(0,10))}refreshValidation(){this.allDayRangeInvalid?this.validationError="End date must be on or after the start date.":this.untilInvalid?this.validationError="Until must be on or after the event start date.":this.recurringMultiDay?this.validationError="Repeating timed events should end on the same day as they start — each occurrence uses that duration. End will be adjusted to the start date.":this.validationError=""}get isRecurring(){return Boolean(this.event?.recurring||this.event?.rrule||this.event?.recurrence_id)}get canScopeInstance(){return Boolean(this.event?.recurrence_id)}get isCrossCalendarMove(){return Boolean(this.event&&this.calendar&&this.calendar!==this.event.calendar)}get calendarMoveBlocked(){return this.isRecurring&&this.isCrossCalendarMove}onCalendarChange(e){const t=e.target.value;this.selectCalendar(t)}selectCalendar(e){this.calendar=e,this.event&&e!==this.event.calendar?this.isRecurring?this.moveNote="Recurring series cannot change calendars (avoids partial/orphan instances). Keep the original calendar or recreate as a one-off.":this.moveNote="Home Assistant cannot move events across calendars — Save will create on the new calendar, then delete from the old one.":this.moveNote=""}calendarColor(e){if(this.calendarColors[e])return this.calendarColors[e];const t=this.calendarOptions;return mt(Math.max(0,t.indexOf(e)))}calendarLabel(e){return e.replace(/^calendar\./,"").replace(/_/g," ")}close(){if(!this.busy)return this.scopePrompt||this.confirmDelete?(this.scopePrompt=null,void(this.confirmDelete=!1)):void this.dispatchEvent(new CustomEvent("form-cancel",{bubbles:!0,composed:!0}))}dismissOverlays(e){e?.stopPropagation(),this.busy||(this.scopePrompt=null,this.confirmDelete=!1)}onSaveClick(){if(!this.busy&&this.summary.trim()&&this.start&&this.end&&this.calendar&&!this.calendarMoveBlocked&&(this.refreshValidation(),!this.untilInvalid&&!this.allDayRangeInvalid)){if(this.recurringMultiDay){const{end:e,adjusted:t}=yr(this.start,this.end);t&&(this.end=e,this.validationError="End adjusted to the start date so each occurrence has a same-day duration.")}if(this.event&&this.isRecurring)return this.confirmDelete=!1,void(this.scopePrompt="save");this.emitSave(void 0)}}onDeleteClick(){if(!this.busy&&this.event&&this.canDelete){if(this.isRecurring)return this.confirmDelete=!1,void(this.scopePrompt="delete");this.scopePrompt=null,this.confirmDelete=!0}}chooseScope(e){if(this.busy)return;const t=this.scopePrompt;this.scopePrompt=null,"save"===t?this.emitSave(e):"delete"===t&&this.emitDelete(e)}confirmOneOffDelete(){this.busy||(this.confirmDelete=!1,this.emitDelete(void 0))}emitSave(e){if(this.refreshValidation(),this.untilInvalid||this.allDayRangeInvalid)return;if(!this.allDay&&"none"!==this.recurFreq){const{end:e,adjusted:t}=yr(this.start,this.end);t&&(this.end=e)}let t,r;this.allDay?(t=this.datePart(this.start),r=this.inclusiveEndToExclusive(t,this.datePart(this.end))):(t=this.fromLocalInput(this.start),r=this.fromLocalInput(this.end));let a;!this.event||!this.isRecurring||"series"===e||"future"===e?(a=gr({freq:this.recurFreq,startIso:t,untilDate:this.recurUntil||void 0}),this.event&&this.isRecurring&&("series"===e||"future"===e)&&"none"===this.recurFreq&&(a=null)):a=void 0;const i=this.resolveDoneDay(t),{doneDates:n,description:s}=function(e,t,r,a,i,n){const s=new Set(e?Pe(e):r?[t]:[]);e?r?s.add(t):s.delete(t):r?s.add(t):s.clear();const o=new Set(Ee({start:i,end:n}));for(const e of[...s])o.has(e)||s.delete(e);const l=[...s].sort();return{doneDates:l,description:Te(a,l)}}(this.event,i,this.completed,this.description.trim()||void 0,t,r),o={summary:this.summary.trim(),description:s,location:this.location.trim()||void 0,start:t,end:r,all_day:this.allDay,calendar:this.calendar,rrule:void 0===a?void 0:a,doneDates:n},l=this.isCrossCalendarMove,c={mode:this.event?"edit":"create",input:o,original:this.event??void 0,crossCalendarMove:l,recurrenceScope:this.isRecurring?e:void 0,reminder:this.remindersAvailable?{enabled:this.reminderEnabled,minutes_before:this.reminderMinutes,notify_service:this.reminderNotify.trim(),message:this.reminderMessage.trim()}:void 0};this.dispatchEvent(new CustomEvent("form-save",{detail:c,bubbles:!0,composed:!0}))}emitDelete(e){if(!this.event)return;const t={event:this.event,recurrenceScope:this.isRecurring?e:void 0};this.dispatchEvent(new CustomEvent("form-delete",{detail:t,bubbles:!0,composed:!0}))}scopeLabels(e){return"delete"===e?{title:"Delete recurring event",subtitle:"Choose how much of the series to remove. Matches Home Assistant calendar delete scopes."}:{title:"Edit recurring event",subtitle:"Choose how far these changes apply. Matches Home Assistant calendar update scopes."}}renderScopePrompt(){if(!this.scopePrompt)return K;const{title:e,subtitle:t}=this.scopeLabels(this.scopePrompt),r="delete"===this.scopePrompt,a=this.canScopeInstance;return B`
      <div
        class="scope-backdrop"
        @click=${e=>this.dismissOverlays(e)}
        role="presentation"
      >
        <div
          class="scope-panel"
          @click=${e=>e.stopPropagation()}
          role="dialog"
          aria-label=${e}
        >
          <h3>${e}</h3>
          <p class="scope-sub">${t}</p>
          ${a?K:B`<p class="hint warn">
                This event has no occurrence id — only the entire series can be
                changed safely.
              </p>`}
          <div class="scope-choices">
            <button
              type="button"
              class="scope-choice ${r?"danger-soft":""}"
              ?disabled=${this.busy||!a}
              @click=${()=>this.chooseScope("this")}
            >
              <span class="scope-choice-title">This occurrence only</span>
              <span class="scope-choice-desc"
                >Affects just the selected date/time</span
              >
            </button>
            <button
              type="button"
              class="scope-choice ${r?"danger-soft":""}"
              ?disabled=${this.busy||!a}
              @click=${()=>this.chooseScope("future")}
            >
              <span class="scope-choice-title">This and future</span>
              <span class="scope-choice-desc"
                >This occurrence and all later ones (THISANDFUTURE)</span
              >
            </button>
            <button
              type="button"
              class="scope-choice ${r?"danger-soft":""}"
              ?disabled=${this.busy}
              @click=${()=>this.chooseScope("series")}
            >
              <span class="scope-choice-title">Entire series</span>
              <span class="scope-choice-desc"
                >Every occurrence in the series</span
              >
            </button>
          </div>
          <div class="scope-actions">
            <button
              type="button"
              ?disabled=${this.busy}
              @click=${e=>this.dismissOverlays(e)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    `}renderConfirmDelete(){return this.confirmDelete&&this.event?B`
      <div
        class="scope-backdrop"
        @click=${e=>this.dismissOverlays(e)}
        role="presentation"
      >
        <div
          class="scope-panel"
          @click=${e=>e.stopPropagation()}
          role="dialog"
          aria-label="Delete event"
        >
          <h3>Delete event?</h3>
          <p class="scope-sub">
            Remove “${this.event.summary}” from
            ${this.calendarLabel(this.event.calendar)}. This cannot be undone.
          </p>
          <div class="scope-actions split">
            <button
              type="button"
              ?disabled=${this.busy}
              @click=${e=>this.dismissOverlays(e)}
            >
              Cancel
            </button>
            <button
              type="button"
              class="danger"
              ?disabled=${this.busy}
              @click=${()=>this.confirmOneOffDelete()}
            >
              ${this.busy?"Deleting…":"Delete"}
            </button>
          </div>
        </div>
      </div>
    `:K}render(){const e=this.event?"Edit event":"New event",t=this.calendarOptions,r=this.event?.rrule?function(e){switch(pr(e)){case"daily":return"Daily";case"weekly":return"Weekly";case"monthly":return"Monthly";case"yearly":return"Yearly";default:return e?"Repeats":""}}(this.event.rrule):this.isRecurring?"Repeats":"";return B`
      <div class="form-backdrop" @click=${this.close}>
        <div
          class="form-panel"
          @click=${e=>e.stopPropagation()}
          role="dialog"
          aria-label=${e}
        >
          <div class="form-title-row">
            <h2>${e}</h2>
            <span class="form-version" title="Loaded card build">v${me}</span>
          </div>
          <p class="form-sub">
            ${this.event?this.isRecurring?`Recurring series${r?` · ${r}`:""}. Save and Delete will ask how far to apply.`:"Edit details, change calendar (create+delete move), or reminder.":"Add an event — optionally set it to repeat."}
          </p>

          <label for="summary">Title</label>
          <input
            id="summary"
            .value=${this.summary}
            ?disabled=${this.busy}
            @input=${e=>{this.summary=e.target.value}}
          />

          <div class="done-row">
            <label class="done-toggle" for="done">
              <input
                id="done"
                type="checkbox"
                .checked=${this.completed}
                ?disabled=${this.busy}
                @change=${e=>{this.completed=e.target.checked}}
              />
              <span class="done-label">Done</span>
            </label>
            <span class="done-hint"
              >${this.event&&this.isMultiDaySpan(this.event.start,this.event.end)?`This day only (${this.resolveDoneDay(this.event.start)}) · strikethrough on that day’s chips`:"Stays on this calendar · strikethrough on chips"}</span
            >
          </div>

          <label for="calendar">Calendar</label>
          <div class="cal-select-row">
            <span
              class="cal-swatch"
              style="background:${this.calendarColor(this.calendar)}"
              aria-hidden="true"
            ></span>
            <select
              id="calendar"
              ?disabled=${this.busy||0===t.length}
              @change=${this.onCalendarChange}
            >
              ${t.map(e=>B`
                  <option value=${e} ?selected=${e===this.calendar}>
                    ${this.calendarLabel(e)}
                  </option>
                `)}
            </select>
          </div>
          <div class="cal-legend" role="list" aria-label="Calendar colors">
            ${t.map(e=>B`
                <button
                  type="button"
                  class="cal-legend-item"
                  role="listitem"
                  ?disabled=${this.busy}
                  data-active=${e===this.calendar?"true":"false"}
                  @click=${()=>{this.busy||this.selectCalendar(e)}}
                >
                  <span
                    class="dot"
                    style="background:${this.calendarColor(e)}"
                  ></span>
                  ${this.calendarLabel(e)}
                </button>
              `)}
          </div>
          ${this.event?B`<p class="hint">
                Changing calendar moves the event to any other configured
                writable calendar via create-on-new, then delete-from-old (HA
                cannot move across calendars in place). Recurring series stay
                blocked.
              </p>`:K}

          <div class="all-day-row">
            <label class="all-day-toggle" for="all-day">
              <input
                id="all-day"
                type="checkbox"
                .checked=${this.allDay}
                ?disabled=${this.busy}
                @change=${e=>this.onAllDayChange(e)}
              />
              <span class="all-day-label">All day</span>
            </label>
          </div>

          <div class="row-2">
            <div>
              <label for="start">${this.allDay?"Start date":"Start"}</label>
              <input
                id="start"
                type=${this.allDay?"date":"datetime-local"}
                .value=${this.start}
                ?disabled=${this.busy}
                @input=${e=>{this.start=e.target.value,!this.allDay&&this.start.includes("T")&&(this.savedTimedStart=this.start),this.refreshValidation()}}
              />
            </div>
            <div>
              <label for="end">${this.allDay?"End date":"End"}</label>
              <input
                id="end"
                type=${this.allDay?"date":"datetime-local"}
                .value=${this.end}
                min=${this.allDay&&this.start?this.start:""}
                ?disabled=${this.busy}
                @input=${e=>{this.end=e.target.value,!this.allDay&&this.end.includes("T")&&(this.savedTimedEnd=this.end),this.refreshValidation()}}
              />
            </div>
          </div>
          ${this.allDay?B`<p class="hint">
                All-day events use dates only. End date is the last day of the
                event (saved exclusive for Home Assistant).
              </p>`:K}

          <label for="location">Location</label>
          <input
            id="location"
            .value=${this.location}
            ?disabled=${this.busy}
            @input=${e=>{this.location=e.target.value}}
          />

          <label for="description">Notes</label>
          <textarea
            id="description"
            .value=${this.description}
            ?disabled=${this.busy}
            @input=${e=>{this.description=e.target.value}}
          ></textarea>

          <div class="recur-block">
            <h3>Repeat</h3>
            ${this.isRecurring?B`<p class="hint" style="margin-top:0">
                  Changing the repeat rule applies when you choose
                  <strong>This and future</strong> or
                  <strong>Entire series</strong> on Save. “This occurrence
                  only” keeps the series rule and edits just this instance.
                </p>`:K}
            <label for="recur-freq">Frequency</label>
            <select
              id="recur-freq"
              ?disabled=${this.busy}
              @change=${e=>{this.recurFreq=e.target.value,this.refreshValidation()}}
            >
              <option value="none" ?selected=${"none"===this.recurFreq}>
                Does not repeat
              </option>
              <option value="daily" ?selected=${"daily"===this.recurFreq}>
                Daily
              </option>
              <option value="weekly" ?selected=${"weekly"===this.recurFreq}>
                Weekly
              </option>
              <option value="monthly" ?selected=${"monthly"===this.recurFreq}>
                Monthly
              </option>
              <option value="yearly" ?selected=${"yearly"===this.recurFreq}>
                Yearly
              </option>
            </select>
            ${"none"!==this.recurFreq?B`
                  <label for="recur-until">Until (optional)</label>
                  <input
                    id="recur-until"
                    type="date"
                    .value=${this.recurUntil}
                    min=${this.start?this.start.slice(0,10):""}
                    ?disabled=${this.busy}
                    @input=${e=>{this.recurUntil=e.target.value,this.refreshValidation()}}
                  />
                  <p class="hint ${this.untilInvalid?"warn":""}">
                    ${this.untilInvalid?"Until must be on or after the start date.":"Optional end date for the series (inclusive). Must be on or after the start date. Weekly repeats on the weekday of the start."}
                  </p>
                  ${this.recurringMultiDay?B`<p class="hint warn">
                        End is on a later day than Start. For repeating timed
                        events, Save will keep the end clock time on the start
                        date (same-day duration per occurrence).
                      </p>`:K}
                `:K}
          </div>

          ${this.remindersAvailable?B`
                <div class="reminder-block">
                  <h3>Reminder</h3>
                  <p class="hint" style="margin-top:0">
                    Stored by the HA Calendar Reminders integration. Notify
                    delivery is best-effort until you validate it.
                  </p>
                  <label class="reminder-toggle">
                    <input
                      type="checkbox"
                      .checked=${this.reminderEnabled}
                      ?disabled=${this.busy}
                      @change=${e=>{this.reminderEnabled=e.target.checked}}
                    />
                    Remind me before this event
                  </label>
                  <div
                    class="reminder-fields"
                    data-disabled=${this.reminderEnabled?"false":"true"}
                  >
                    <div class="row-2">
                      <div>
                        <label for="rem-min">Minutes before</label>
                        <input
                          id="rem-min"
                          type="number"
                          min="0"
                          max="10080"
                          .value=${String(this.reminderMinutes)}
                          ?disabled=${this.busy||!this.reminderEnabled}
                          @input=${e=>{this.reminderMinutes=Number(e.target.value)||0}}
                        />
                      </div>
                      <div>
                        <label for="rem-notify">Notify service</label>
                        <input
                          id="rem-notify"
                          placeholder="notify.mobile_app_phone"
                          .value=${this.reminderNotify}
                          ?disabled=${this.busy||!this.reminderEnabled}
                          @input=${e=>{this.reminderNotify=e.target.value}}
                        />
                      </div>
                    </div>
                    <label for="rem-msg">Message (optional)</label>
                    <input
                      id="rem-msg"
                      .value=${this.reminderMessage}
                      ?disabled=${this.busy||!this.reminderEnabled}
                      @input=${e=>{this.reminderMessage=e.target.value}}
                    />
                  </div>
                </div>
              `:K}

          ${this.calendarMoveBlocked?B`<p class="hint warn">
                Recurring events cannot change calendars. Keep the original
                calendar to avoid orphaning series instances.
              </p>`:null}
          ${this.moveNote?B`<p class="hint ${this.calendarMoveBlocked?"warn":""}">
                ${this.moveNote}
              </p>`:null}
          ${this.validationError?B`<p
                class="hint ${this.untilInvalid||this.allDayRangeInvalid?"error":"warn"}"
                role="alert"
              >
                ${this.validationError}
              </p>`:null}
          ${this.errorMessage?B`<p class="hint error" role="alert">${this.errorMessage}</p>`:null}

          <div class="form-actions ${this.event&&this.canDelete?"with-delete":""}">
            ${this.event&&this.canDelete?B`
                  <button
                    type="button"
                    class="danger"
                    ?disabled=${this.busy}
                    @click=${()=>this.onDeleteClick()}
                  >
                    Delete
                  </button>
                `:K}
            <div class="form-actions-end">
              <button type="button" ?disabled=${this.busy} @click=${this.close}>
                Cancel
              </button>
              <button
                type="button"
                class="primary"
                ?disabled=${this.busy||this.calendarMoveBlocked||this.untilInvalid||this.allDayRangeInvalid}
                @click=${()=>this.onSaveClick()}
              >
                ${this.busy?"Saving…":this.isCrossCalendarMove?"Move & save":"Save"}
              </button>
            </div>
          </div>
        </div>
        ${this.renderScopePrompt()} ${this.renderConfirmDelete()}
      </div>
    `}};vr.styles=at,e([ue({attribute:!1})],vr.prototype,"calendars",void 0),e([ue({attribute:!1})],vr.prototype,"calendarColors",void 0),e([ue({attribute:!1})],vr.prototype,"event",void 0),e([ue({type:String})],vr.prototype,"doneDay",void 0),e([ue({attribute:!1})],vr.prototype,"defaults",void 0),e([ue({type:Boolean})],vr.prototype,"busy",void 0),e([ue({type:String})],vr.prototype,"errorMessage",void 0),e([ue({type:Boolean})],vr.prototype,"remindersAvailable",void 0),e([ue({type:Boolean})],vr.prototype,"canDelete",void 0),e([ue({attribute:!1})],vr.prototype,"reminderDefaults",void 0),e([ue({attribute:!1})],vr.prototype,"reminder",void 0),e([pe()],vr.prototype,"summary",void 0),e([pe()],vr.prototype,"description",void 0),e([pe()],vr.prototype,"location",void 0),e([pe()],vr.prototype,"start",void 0),e([pe()],vr.prototype,"end",void 0),e([pe()],vr.prototype,"completed",void 0),e([pe()],vr.prototype,"allDay",void 0),e([pe()],vr.prototype,"calendar",void 0),e([pe()],vr.prototype,"moveNote",void 0),e([pe()],vr.prototype,"reminderEnabled",void 0),e([pe()],vr.prototype,"reminderMinutes",void 0),e([pe()],vr.prototype,"reminderNotify",void 0),e([pe()],vr.prototype,"reminderMessage",void 0),e([pe()],vr.prototype,"hydrateKey",void 0),e([pe()],vr.prototype,"recurFreq",void 0),e([pe()],vr.prototype,"recurUntil",void 0),e([pe()],vr.prototype,"validationError",void 0),e([pe()],vr.prototype,"scopePrompt",void 0),e([pe()],vr.prototype,"confirmDelete",void 0),vr=e([ce("hac-event-form")],vr);let br=class extends oe{constructor(){super(...arguments),this.config={type:`custom:${fe}`},this.view="month",this.anchorDate=new Date,this.events=[],this.formOpen=!1,this.editing=null,this.formDoneDay=null,this.formDefaults={},this.formBusy=!1,this.formError="",this.status=`HA Calendar Card v${me}`,this.statusKind="info",this.loading=!1,this.loadFailed=!1,this.pendingDuplicate=null,this.loadGeneration=0,this.hasLoadedOnce=!1,this.formReminder=null,this.hiddenCalendars=[],this.nowTick=Date.now(),this.weatherForecast=[],this.calendarColors={},this.themePreference="auto",this.resolvedTheme="light",this.monthPickerOpen=!1,this.pickerYear=(new Date).getFullYear(),this.calendarPickerOpen=!1,this.createCalendarOpen=!1,this.createCalendarName="",this.createCalendarBusy=!1,this.createCalendarError="",this.persistNote="",this.pollTimer=null,this.clockTimer=null,this.hadHass=!1,this.weatherEntityLoaded=null,this.weatherFetchInFlight=!1,this.registryUnsub=null,this.colorLoadGeneration=0,this.subscribedConnection=null,this.panelStyledAncestors=[],this.panelResizeObserver=null,this.panelHost=null,this.themeMediaQuery=null,this.themeMediaHandler=null,this.onDocPointerDown=null,this.toggleDoneBusy=!1,this.moveBusy=!1}setConfig(e){if(!e)throw new Error("Invalid configuration");const t=Dt(e),r={title:"Calendar",entities:[...ye],initial_view:"month",theme:"auto",day_start_hour:6,day_end_hour:22,show_demo_when_empty:!1,...e,weather_entity:t,type:e.type??`custom:${fe}`},a=zt(r);this.config={...r,entities:a?.length?a:[...ye]},this.view=this.config.initial_view??"month",this.applyThemePreference(wt(this.config.theme))}static getStubConfig(){return{title:"Calendar",entities:[...ye],initial_view:"month"}}getCardSize(){return 10}connectedCallback(){super.connectedCallback(),this.ensureFonts(),this.startTimers(),this.syncPanelLayout(),this.bindThemeMedia(),this.bindPickerDismiss(),this.applyThemePreference(wt(this.config.theme??"auto")),this.refreshCalendarColors(),this.subscribeRegistryColors()}firstUpdated(){this.syncPanelLayout(),this.syncThemeAttribute()}disconnectedCallback(){super.disconnectedCallback(),this.clearTimers(),this.clearPanelLayout(),this.unsubscribeRegistryColors(),this.unbindThemeMedia(),this.unbindPickerDismiss()}ensureFonts(){const e="ha-calendar-card-fonts";if(document.getElementById(e))return;const t=document.createElement("link");t.id=e,t.rel="stylesheet",t.href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Nunito:wght@500;600;700;800&family=Quicksand:wght@500;600;700&display=swap",document.head.appendChild(t)}syncPanelLayout(){const e=this.closest("hui-panel-view");if(!e)return void this.clearPanelLayout();this.setAttribute("data-layout","panel");const t=[e,this.closest("hui-card")].filter(e=>Boolean(e));if(this.panelHost!==e){this.clearPanelAncestorStyles(),this.panelHost=e;for(const e of t)this.stylePanelAncestor(e),this.panelStyledAncestors.push(e);this.panelResizeObserver?.disconnect(),this.panelResizeObserver=new ResizeObserver(()=>this.applyPanelHeight()),this.panelResizeObserver.observe(e)}this.applyPanelHeight()}stylePanelAncestor(e){e.dataset.hacPanelStyled="1",e.style.setProperty("display","flex"),e.style.setProperty("flex-direction","column"),e.style.setProperty("flex","1 1 auto"),e.style.setProperty("height","100%"),e.style.setProperty("max-height","100%"),e.style.setProperty("min-height","0"),e.style.setProperty("overflow","hidden"),e.style.setProperty("box-sizing","border-box")}applyPanelHeight(){const e=this.panelHost;if(!e)return;const t=e.clientHeight;t>0?this.style.setProperty("--hac-panel-height",`${t}px`):this.style.setProperty("--hac-panel-height","calc(100dvh - var(--header-height, 56px) - var(--safe-area-inset-top, 0px) - var(--safe-area-inset-bottom, 0px))")}clearPanelAncestorStyles(){for(const e of this.panelStyledAncestors)if("1"===e.dataset.hacPanelStyled){delete e.dataset.hacPanelStyled;for(const t of["display","flex-direction","flex","height","max-height","min-height","overflow","box-sizing"])e.style.removeProperty(t)}this.panelStyledAncestors=[]}clearPanelLayout(){this.panelResizeObserver?.disconnect(),this.panelResizeObserver=null,this.panelHost=null,this.clearPanelAncestorStyles(),this.removeAttribute("data-layout"),this.style.removeProperty("--hac-panel-height")}startTimers(){this.clearTimers(),this.clockTimer=window.setInterval(()=>{this.nowTick=Date.now()},3e4),this.pollTimer=window.setInterval(()=>{this.refreshEvents({silent:!0}),this.refreshWeatherForecast(!0)},6e4)}clearTimers(){null!=this.clockTimer&&(window.clearInterval(this.clockTimer),this.clockTimer=null),null!=this.pollTimer&&(window.clearInterval(this.pollTimer),this.pollTimer=null)}updated(e){if(this.syncPanelLayout(),e.has("config")||e.has("anchorDate")||e.has("view"))return this.refreshEvents(),this.refreshWeatherForecast(!0),void(e.has("config")&&(this.refreshCalendarColors(),this.subscribeRegistryColors()));if(e.has("hass")){const e=Boolean(this.hass);e&&!this.hadHass?(this.hadHass=!0,this.refreshEvents(),this.refreshWeatherForecast(!0),this.refreshCalendarColors(),this.subscribeRegistryColors()):e?(this.refreshWeatherForecast(!1),this.subscribeRegistryColors()):(this.hadHass=!1,this.unsubscribeRegistryColors())}}entities(){return Array.isArray(this.config.entities)?[...this.config.entities]:[...ye]}displayCalendars(){return[...this.entities().filter(e=>e!==Bt),Bt]}get monthMaxVisibleEvents(){const e=this.config.month_max_events;return"number"==typeof e&&Number.isFinite(e)?Math.max(1,Math.floor(e)):6}formCalendars(){const e=this.entities(),t=this.hass?new Je(this.hass).listWritableCalendars(e):e,r=this.editing?.calendar;return r&&!t.includes(r)?[r,...t]:t}canDeleteEditing(){return!!this.editing&&(!this.hass||new Je(this.hass).canDelete(this.editing.calendar))}calendarColor(e){if(e===Bt)return Yt;if(this.calendarColors[e])return this.calendarColors[e];const t=this.entities();return mt(Math.max(0,t.indexOf(e)))}stampHolidayColor(e){return{...e,[Bt]:Yt}}async refreshCalendarColors(){const e=this.entities(),t=++this.colorLoadGeneration,r=yt(e,{},this.hass);if(this.calendarColors=this.stampHolidayColor(r),!this.hass)return;const a=await async function(e,t){const r=[...new Set(t.filter(Boolean))],a={};if(!r.length)return a;try{const t=await e.callWS({type:"config/entity_registry/get_entries",entity_ids:r});for(const e of r){const r=gt(t?.[e]);pt(r)&&(a[e]=ut(r))}return a}catch{}try{const t=await e.callWS({type:"config/entity_registry/list"}),i=new Map((t??[]).filter(e=>e?.entity_id).map(e=>[e.entity_id,e]));for(const e of r){const t=gt(i.get(e));pt(t)&&(a[e]=ut(t))}}catch{}return a}(this.hass,e);t===this.colorLoadGeneration&&(this.calendarColors=this.stampHolidayColor(yt(e,a,this.hass)))}subscribeRegistryColors(){const e=this.hass?.connection;e?.subscribeEvents&&(this.registryUnsub&&this.subscribedConnection===e||(this.unsubscribeRegistryColors(),this.subscribedConnection=e,e.subscribeEvents(()=>{this.refreshCalendarColors()},"entity_registry_updated").then(t=>{this.hass?.connection===e?(this.registryUnsub=t,this.subscribedConnection=e):t()}).catch(()=>{})))}unsubscribeRegistryColors(){if(this.registryUnsub){try{this.registryUnsub()}catch{}this.registryUnsub=null}this.subscribedConnection=null}calendarLabel(e){if(e===Bt)return"US holidays";const t=this.hass?.states[e]?.attributes?.friendly_name;return"string"==typeof t&&t.trim()?t.trim():e.replace(/^calendar\./,"").replace(/_/g," ")}holidayCountry(){const e=this.hass?.config?.country;return"string"==typeof e&&e.trim()?e.trim():"US"}withHolidays(e){const{start:t,end:r}=this.range(),a=function(e,t,r="US"){const a="US"===r.toUpperCase(),i=Xt(e),n=Xt(t),s=[];for(let r=e.getFullYear();r<=t.getFullYear();r++)for(const e of Gt(r)){if(!a&&e.usOnly)continue;const t=Xt(e.date);if(t<i||t>=n)continue;const r=ke(e.date),o=ke(Kt(e.date,1));s.push({uid:`hac-holiday:${r}:${Zt(e.name)}`,summary:e.name,start:r,end:o,all_day:!0,calendar:Bt,readonly:!0})}return s}(t,r,this.holidayCountry());if(!a.length)return e;const i=new Set;for(const t of e)for(const e of Qt(t.summary))i.add(`${t.start.slice(0,10)}|${e}`);const n=a.filter(e=>Qt(e.summary).every(t=>!i.has(`${e.start}|${t}`)));return n.length?[...e,...n]:e}attachHolidays(){const e=this.events.length;this.events=this.withHolidays(this.events);if(this.events.length-e)return this.loadFailed?(this.loadFailed=!1,this.statusKind="warn",void(this.status=`${this.status} · showing built-in holidays`)):void(/^\d+ event\(s\)/.test(this.status)?this.status=this.status.replace(/^\d+/,String(this.events.length)):"No events in this range"!==this.status&&"No calendars loaded"!==this.status||(this.status=`${this.events.length} event(s)`,this.statusKind="info"))}filteredEvents(){if(!this.hiddenCalendars.length)return this.events;const e=new Set(this.hiddenCalendars);return this.events.filter(t=>!e.has(t.calendar))}statusText(){if(!this.hiddenCalendars.length||!this.hasLoadedOnce)return this.status;const e=this.filteredEvents().length,t=this.events.length-e;return t<=0?this.status:`${this.status} · ${e} on visible calendars (${t} hidden by filters)`}toggleCalendarFilter(e){this.hiddenCalendars.includes(e)?this.hiddenCalendars=this.hiddenCalendars.filter(t=>t!==e):this.hiddenCalendars=[...this.hiddenCalendars,e]}range(){const e=new Date(this.anchorDate);if(e.setHours(0,0,0,0),"day"===this.view){const t=new Date(e);return t.setDate(t.getDate()+1),{start:e,end:t}}if("month"===this.view){const t=new Date(e.getFullYear(),e.getMonth(),1),r=(t.getDay()+6)%7;t.setDate(t.getDate()-r);const a=new Date(t);return a.setDate(a.getDate()+42),{start:t,end:a}}const t=(e.getDay()+6)%7;e.setDate(e.getDate()-t);const r=new Date(e);return r.setDate(r.getDate()+7),{start:e,end:r}}async refreshEvents(e){const t=++this.loadGeneration,r=Boolean(e?.silent)&&this.hasLoadedOnce;if(!this.hass)return this.events=this.demoEvents(),this.loadFailed=!1,this.hasLoadedOnce=!0,this.loading=!1,this.status="Preview mode — demo events (no hass)",this.statusKind="info",void this.attachHolidays();r||(this.loading=!0);const a=new Je(this.hass),{start:i,end:n}=this.range(),s=this.entities();try{const e=await a.getEvents(s,i,n);if(t!==this.loadGeneration)return;if(this.loadFailed=!1,this.hasLoadedOnce=!0,e.events.length){this.events=e.events;const t=e.errors.length?` · ${e.errors.length} calendar(s) failed`:"";this.status=`${e.events.length} event(s)${t}`,this.statusKind=e.errors.length?"warn":"info"}else e.anySuccess?(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.status=this.config.show_demo_when_empty?"No events — showing demo blocks":"No events in this range",this.statusKind="info"):(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.loadFailed=!this.config.show_demo_when_empty,this.status=e.errors.length?`Could not load: ${e.errors.join(", ")} — check entity ids`:"No calendars loaded",this.statusKind="error");this.attachHolidays()}catch(e){if(t!==this.loadGeneration)return;this.events=[],this.loadFailed=!0,this.hasLoadedOnce=!0,this.status=`Load failed: ${Ne(e)}`,this.statusKind="error",this.attachHolidays()}finally{t===this.loadGeneration&&(this.loading=!1)}}demoEvents(){const e=new Date(this.anchorDate);e.setHours(0,0,0,0);const t=(t,r,a,i,n)=>{const s=new Date(e);s.setDate(s.getDate()+t),s.setHours(r,0,0,0);const o=new Date(s);return o.setHours(r+a,0,0,0),{uid:`demo-${i}-${t}-${r}`,summary:i,start:s.toISOString(),end:o.toISOString(),calendar:n}},r=this.entities(),a=new Date(e);a.setDate(a.getDate()+3);const i=new Date(a);return i.setDate(i.getDate()+2),[t(0,9,1,"Morning standup",r[0]??"calendar.family"),t(0,11,2,"Deep work",r[1]??"calendar.personal"),t(1,14,1,"School pickup",r[0]??"calendar.family"),t(2,10,1,"Dentist",r[2]??"calendar.work"),{uid:"demo-family-day",summary:"Family day",start:ke(a),end:ke(i),all_day:!0,calendar:r[0]??"calendar.family"},t(4,16,2,"Soccer practice",r[0]??"calendar.family"),t(5,12,1,"Lunch with Sam",r[1]??"calendar.personal")]}shift(e){const t=new Date(this.anchorDate);"month"===this.view?t.setMonth(t.getMonth()+e):"day"===this.view?t.setDate(t.getDate()+e):t.setDate(t.getDate()+7*e),this.anchorDate=t}remindersAvailable(){return Boolean(this.hass&&new et(this.hass).isAvailable())}reminderDefaults(){return{minutes_before:this.config.reminder_minutes_before??30,notify_service:this.config.reminder_notify_service??"notify.mobile_app_phone"}}weatherEntityId(){return Dt(this.config)}weather(){return function(e,t,r){if(!e||!t)return null;const a=e.states[t];if(!a)return null;const i=a.attributes??{},n=r&&r.length?r:Ct(i);return{entityId:t,state:a.state,temperature:"number"==typeof i.temperature?i.temperature:void 0,unit:"string"==typeof i.temperature_unit?i.temperature_unit:"string"==typeof i.unit_of_measurement?i.unit_of_measurement:"°",humidity:"number"==typeof i.humidity?i.humidity:void 0,forecast:n}}(this.hass,this.weatherEntityId(),this.weatherForecast)}async refreshWeatherForecast(e=!1){const t=this.weatherEntityId();if(!this.hass||!t)return this.weatherForecast=[],void(this.weatherEntityLoaded=null);if((e||this.weatherEntityLoaded!==t||!this.weatherForecast.length)&&!this.weatherFetchInFlight){this.weatherFetchInFlight=!0;try{const e=await async function(e,t){const r=e.states[t];if(r){const e=Ct(r.attributes??{});if(e.length)return e}const a=["daily","twice_daily","hourly"];for(const r of a)try{const a=Et(await e.callService("weather","get_forecasts",{type:r},{entity_id:t},!1,!0),t);if(a.length)return a}catch{}return[]}(this.hass,t);this.weatherForecast=e,this.weatherEntityLoaded=t}catch{}finally{this.weatherFetchInFlight=!1}}}openCreate(e){this.editing=null,this.formDoneDay=null,this.formError="",this.formBusy=!1,this.formReminder=null;const t=e??this.defaultCreateRange();this.formDefaults={start:Nt(t.start),end:Nt(t.end),calendar:this.entities()[0]},this.formOpen=!0}defaultCreateRange(){const e=new Date("day"===this.view?this.anchorDate:new Date);return e.setHours(0,0,0,0),Pt(e,{dayStartHour:this.config.day_start_hour??6,dayEndHour:this.config.day_end_hour??22})}availableCalendarEntities(){return this.hass?.states?Object.keys(this.hass.states).filter(e=>e.startsWith("calendar.")).sort():[]}configuredEntitySet(){return new Set(this.entities())}toggleCalendarPicker(){this.calendarPickerOpen=!this.calendarPickerOpen,this.calendarPickerOpen?this.monthPickerOpen=!1:(this.createCalendarOpen=!1,this.createCalendarError="",this.persistNote="")}setCalendarInConfig(e,t){if(!e.startsWith("calendar."))return;const r=this.config.entities?.length?[...this.config.entities]:void 0,a=r?.length?[...r]:[...ye],i=this.hass,n=!r?.length||a.every(e=>!i?.states[e]&&ye.includes(e));let s;if(t){if(a.includes(e)&&!n)return;s=n?[e]:[...a,e]}else s=a.filter(t=>t!==e);const o=new Set;s=s.filter(e=>!o.has(e)&&(o.add(e),!0));const l={...this.config,entities:s,type:this.config.type??`custom:${fe}`};this.config=l,this.hiddenCalendars=this.hiddenCalendars.filter(e=>s.includes(e)),this.persistEntities(r,l),this.refreshCalendarColors(),this.refreshEvents()}async persistEntities(e,t){const r=await jt({hass:this.hass,host:this,previousEntities:e,nextConfig:t});"saved"!==r.lovelace?"yaml"!==r.lovelace?"error"!==r.lovelace?this.persistNote=r.local?"":"Could not persist calendars in this browser.":this.persistNote=r.local?"Saved in this browser; dashboard save failed — check admin permissions.":`Could not save calendars: ${r.detail??"unknown error"}`:this.persistNote="Saved in this browser. YAML dashboards also need an entities: edit to stick after cache clear.":this.persistNote=""}async submitCreateCalendar(){if(!this.hass)return void(this.createCalendarError="Home Assistant is not connected.");const e=this.createCalendarName.trim();if(e){this.createCalendarBusy=!0,this.createCalendarError="";try{const{entityId:t}=await async function(e,t){const r=t.trim();if(!r)throw new Error("Calendar name is required.");if(!e.callApi)throw new Error("Home Assistant callApi is unavailable — cannot create a Local Calendar.");const a=await e.callApi("POST","config/config_entries/flow",{handler:"local_calendar"});if("abort"===a.type)throw new Error(a.reason?`Could not start Local Calendar setup: ${a.reason}`:"Could not start Local Calendar setup.");const i=a.flow_id;if(!i)throw new Error("Local Calendar setup did not return a flow id.");const n=await e.callApi("POST",`config/config_entries/flow/${i}`,{calendar_name:r,import:"create_empty"});if("form"===n.type&&n.errors&&Object.keys(n.errors).length){const e=Object.values(n.errors)[0];throw new Error(String(e||"Could not create calendar."))}if("abort"===n.type)throw new Error("already_configured"===n.reason?"A Local Calendar with that name already exists.":n.reason?`Create calendar aborted: ${n.reason}`:"Create calendar aborted.");if("create_entry"!==n.type){try{await e.callApi("DELETE",`config/config_entries/flow/${i}`)}catch{}throw new Error(`Unexpected Local Calendar setup step (${n.type}). Open Settings → Devices & services → Add integration → Local Calendar.`)}const s=function(e){return`calendar.${function(e){return e.trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")}(e)}`}(r);return{entityId:s,step:n}}(this.hass,e),r=await async function(e,t,r=12e3){const a=Date.now(),i=t.replace(/^calendar\./,"");for(;Date.now()-a<r;){const r=e(),a=r?.states??{};if(a[t])return t;const n=Object.keys(a).find(e=>e.startsWith("calendar.")&&(e===t||e===`calendar.${i}`||e.startsWith(`calendar.${i}_`)));if(n)return n;await new Promise(e=>setTimeout(e,250))}return t}(()=>this.hass,t);this.setCalendarInConfig(r,!0),this.createCalendarName="",this.createCalendarOpen=!1,this.status=`Created ${r}`,this.statusKind="info",this.refreshCalendarColors(),this.refreshEvents()}catch(e){this.createCalendarError=Ne(e)}finally{this.createCalendarBusy=!1}}else this.createCalendarError="Enter a calendar name."}openDayView(e){const t=new Date(e);t.setHours(0,0,0,0),this.anchorDate=t,this.view="day",this.monthPickerOpen=!1}openEdit(e){const t="event"in e?e.event:e;if(t.readonly)return this.status=`“${t.summary}” is a built-in holiday`,void(this.statusKind="info");const r="event"in e?e.day:void 0;this.editing=t,this.formDoneDay=r??t.start.slice(0,10),this.formError="",this.formBusy=!1,this.formDefaults={},this.formReminder=null,this.formOpen=!0,this.loadReminderForEvent(t)}async onToggleDone(e){const{event:t,day:r}=e.detail;if(t.readonly)return;if(!this.hass||this.toggleDoneBusy||this.moveBusy||!r)return;this.toggleDoneBusy=!0;const a=!Me(t,r),i=function(e,t,r){const a=new Set(Pe(e));r?a.add(t):a.delete(t);const i=new Set(Ee(e));for(const e of[...a])i.has(e)||a.delete(e);const n=[...a].sort(),s=Ae(e.description).cleanDescription;return{summary:Se(e.summary).displaySummary,description:Te(s,n),doneDates:n,legacyTitleDone:!1}}(t,r,a);this.events=this.events.map(e=>e.uid===t.uid&&e.calendar===t.calendar&&e.recurrence_id===t.recurrence_id&&e.start===t.start?{...e,summary:i.summary,description:Ae(i.description).cleanDescription||void 0,doneDates:i.doneDates,legacyTitleDone:!1,completed:i.doneDates.length>0}:e);const n=new Je(this.hass),s=t.recurrence_id||t.recurring||t.rrule?t.recurrence_id?"this":"series":"this",{recurrenceId:o,recurrenceRange:l}=We(t,s);try{await n.updateEvent(t.calendar,t.uid,{summary:i.summary,description:i.description,location:t.location,start:t.start,end:t.end,all_day:t.all_day,calendar:t.calendar,doneDates:i.doneDates},o,l),this.status=a?`Marked “${t.summary}” done for ${r}`:`Marked “${t.summary}” not done for ${r}`,this.statusKind="info",await this.refreshEvents()}catch(e){this.events=this.events.map(e=>e.uid===t.uid&&e.calendar===t.calendar&&e.recurrence_id===t.recurrence_id&&e.start===t.start?{...e,summary:t.summary,description:t.description,doneDates:t.doneDates,legacyTitleDone:t.legacyTitleDone,completed:t.completed}:e),this.status=Ne(e,"Could not update done state"),this.statusKind="error"}finally{this.toggleDoneBusy=!1}}async onEventMove(e){const{event:t,fromDay:r,toDay:a}=e.detail;if(t?.readonly)return this.status=`“${t.summary}” is a built-in holiday`,void(this.statusKind="info");if(!t||!r||!a||r===a)return;if(this.moveBusy||this.toggleDoneBusy)return this.status="Still saving the last change…",void(this.statusKind="info");if((t.recurring||t.rrule)&&!t.recurrence_id)return this.status=`“${t.summary}” repeats. Open it to choose which dates to change.`,void(this.statusKind="warn");const i=dt(t,r,a);if(!i)return;const n=this.events;this.events=this.events.map(e=>function(e,t){return e.uid===t.uid&&e.calendar===t.calendar&&e.recurrence_id===t.recurrence_id&&e.start===t.start&&e.end===t.end}(e,t)?{...e,start:i.start,end:i.end,doneDates:i.doneDates,legacyTitleDone:!1,completed:i.doneDates.length>0}:e);const s=t.recurrence_id?" (this occurrence)":"",o=`Moved “${t.summary}” to ${function(e){const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);return t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3])).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}):e}(a)}${s}`;if(!this.hass)return this.status=`${o} (preview)`,void(this.statusKind="info");this.moveBusy=!0;const l=new Je(this.hass),{recurrenceId:c,recurrenceRange:d}=We(t,"this");try{await l.updateEvent(t.calendar,t.uid,{summary:t.summary,description:t.description,location:t.location,start:i.start,end:i.end,all_day:t.all_day,calendar:t.calendar,doneDates:i.doneDates},c,d);try{await this.shiftReminderIfAny(t,i.start)}catch{}await this.refreshEvents({silent:!0}),this.loadFailed||(this.status=o,this.statusKind="info")}catch(e){this.events=n,this.status=Ne(e,"Could not move event"),this.statusKind="error"}finally{this.moveBusy=!1}}async shiftReminderIfAny(e,t){if(!this.hass||!this.remindersAvailable())return;if(e.recurring||e.rrule||e.recurrence_id)return;const r=new et(this.hass),a=await r.getReminder(e.calendar,e.uid);a&&await r.setReminder({calendar_entity_id:e.calendar,event_uid:e.uid,event_start:t,event_summary:e.summary,minutes_before:a.minutes_before,notify_service:a.notify_service,message:a.message??"",enabled:a.enabled})}async loadReminderForEvent(e){if(this.hass&&this.remindersAvailable())try{const t=await new et(this.hass).getReminder(e.calendar,e.uid);if(!this.formOpen||this.editing?.uid!==e.uid)return;this.formReminder=t?{enabled:t.enabled,minutes_before:t.minutes_before,notify_service:t.notify_service,message:t.message??""}:null}catch{}}async syncReminder(e){if(!this.hass||!e.reminder||!this.remindersAvailable())return null;const t=new et(this.hass);if(!e.reminder.enabled)return await t.clearReminder(e.calendar,e.uid),"reminder cleared";if(!e.reminder.notify_service.trim())throw new Error("Reminder notify service is required");return await t.setReminder({calendar_entity_id:e.calendar,event_uid:e.uid,event_start:e.start,event_summary:e.summary,minutes_before:e.reminder.minutes_before,notify_service:e.reminder.notify_service.trim(),message:e.reminder.message,enabled:!0}),"reminder saved"}async onFormSave(e){const{mode:t,input:r,original:a,reminder:i,crossCalendarMove:n,recurrenceScope:s}=e.detail;if(!this.hass)return void(this.formError="No Home Assistant connection — cannot save.");this.formBusy=!0,this.formError="";const o=new Je(this.hass);let l=null;const c=Boolean(a&&(n||r.calendar&&r.calendar!==a.calendar));try{if("create"===t){const e=await o.createEvent(r);e.uid&&i?.enabled?l=await this.syncReminder({calendar:r.calendar,uid:e.uid,start:r.start,summary:r.summary,reminder:i}):i?.enabled&&!e.uid&&(l="event created; reminder skipped (no confirmed event uid yet)"),this.formOpen=!1,this.status=`Created “${r.summary}” on ${r.calendar}${r.rrule?" (recurring)":""}${l?` · ${l}`:""}`,this.statusKind="info"}else if(c&&a){if(a.recurring||a.rrule)return void(this.formError="Recurring events cannot change calendars. Keep the original calendar or recreate as a one-off.");const e=await o.moveEventToCalendar(a,r.calendar,{...r,calendar:r.calendar,rrule:void 0});if("moved"===e.status){if(this.remindersAvailable())try{await new et(this.hass).clearReminder(a.calendar,a.uid)}catch{}i&&(l=await this.syncReminder({calendar:r.calendar,uid:e.newUid,start:r.start,summary:r.summary,reminder:i})),this.formOpen=!1,this.pendingDuplicate=null,this.status=`Moved “${r.summary}” ${a.calendar} → ${r.calendar}${l?` · ${l}`:""}`,this.statusKind="info"}else{if("create_failed"===e.status)return this.formError=`Move aborted (create failed): ${e.error}`,this.status=this.formError,void(this.statusKind="error");if("delete_failed"===e.status)this.formOpen=!1,this.pendingDuplicate=e.pending,this.status=`Copy exists on ${r.calendar}, but the old event could not be removed.`,this.statusKind="warn";else if("blocked_recurring"===e.status)return void(this.formError=e.reason)}}else if(a){const{recurrenceId:e,recurrenceRange:t}=We(a,s??"this");await o.updateEvent(a.calendar,a.uid,{...r,calendar:a.calendar},e,t),i&&(l=await this.syncReminder({calendar:a.calendar,uid:a.uid,start:r.start,summary:r.summary,reminder:i})),this.formOpen=!1,this.status=`Updated “${r.summary}”${a.rrule||r.rrule?` · ${s??"this"}`:""}${l?` · ${l}`:""}`,this.statusKind="info"}await this.refreshEvents()}catch(e){this.formError=Ne(e),this.status=this.formError,this.statusKind="error"}finally{this.formBusy=!1}}async onFormDelete(e){const{event:t,recurrenceScope:r}=e.detail;if(!this.hass)return void(this.formError="No Home Assistant connection — cannot delete.");this.formBusy=!0,this.formError="";const a=new Je(this.hass);try{if(!a.canDelete(t.calendar))return this.formError=`${t.calendar} does not support deleting events.`,this.status=this.formError,void(this.statusKind="error");const{recurrenceId:e,recurrenceRange:i}=We(t,r??"this");if(await a.deleteEvent(t.calendar,t.uid,e,i),this.remindersAvailable())try{await new et(this.hass).clearReminder(t.calendar,t.uid)}catch{}this.formOpen=!1;const n=t.recurring||t.rrule||t.recurrence_id?` · ${r??"this"}`:"";this.status=`Deleted “${t.summary}”${n}`,this.statusKind="info",await this.refreshEvents()}catch(e){this.formError=Ne(e),this.status=this.formError,this.statusKind="error"}finally{this.formBusy=!1}}async cleanupDuplicate(){if(!this.hass||!this.pendingDuplicate)return;const e=this.pendingDuplicate,t=new Je(this.hass);try{await t.deleteEvent(e.entityId,e.uid),this.pendingDuplicate=null,this.status=`Removed old copy of “${e.summary}” from ${e.entityId}`,this.statusKind="info",await this.refreshEvents()}catch(e){this.status=`Cleanup failed: ${Ne(e)}`,this.statusKind="error"}}dismissDuplicate(){this.pendingDuplicate=null,this.status="Duplicate warning dismissed — old copy may still exist",this.statusKind="warn"}applyThemePreference(e){this.themePreference=e,this.resolvedTheme=$t(e),this.syncThemeAttribute()}syncThemeAttribute(){this.setAttribute("data-theme",this.resolvedTheme)}cycleTheme(){const e="light"===(t=this.themePreference)?"dark":"dark"===t?"auto":"light";var t;!function(e){try{localStorage.setItem(vt,e)}catch{}}(e),this.applyThemePreference(e)}bindThemeMedia(){this.unbindThemeMedia(),"undefined"!=typeof window&&window.matchMedia&&(this.themeMediaQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.themeMediaHandler=()=>{"auto"===this.themePreference&&(this.resolvedTheme=$t("auto"),this.syncThemeAttribute())},this.themeMediaQuery.addEventListener("change",this.themeMediaHandler))}unbindThemeMedia(){this.themeMediaQuery&&this.themeMediaHandler&&this.themeMediaQuery.removeEventListener("change",this.themeMediaHandler),this.themeMediaQuery=null,this.themeMediaHandler=null}bindPickerDismiss(){this.unbindPickerDismiss(),this.onDocPointerDown=e=>{if(!this.monthPickerOpen&&!this.calendarPickerOpen)return;const t=e.composedPath();if(t.includes(this)){const e=t.some(e=>e instanceof HTMLElement&&(e.classList.contains("month-picker")||e.classList.contains("range-label")||e.classList.contains("range-wrap"))),r=t.some(e=>e instanceof HTMLElement&&(e.classList.contains("cal-picker")||e.classList.contains("cal-picker-wrap")||e.classList.contains("add-cal-pill")));if(this.monthPickerOpen&&e)return;if(this.calendarPickerOpen&&r)return}this.monthPickerOpen=!1,this.calendarPickerOpen=!1},document.addEventListener("pointerdown",this.onDocPointerDown,!0)}unbindPickerDismiss(){this.onDocPointerDown&&(document.removeEventListener("pointerdown",this.onDocPointerDown,!0),this.onDocPointerDown=null)}toggleMonthPicker(){this.monthPickerOpen=!this.monthPickerOpen,this.monthPickerOpen&&(this.pickerYear=this.anchorDate.getFullYear(),this.calendarPickerOpen=!1)}shiftPickerYear(e){this.pickerYear+=e}jumpToMonth(e){const t=new Date(this.anchorDate),r=t.getDate();t.setDate(1),t.setFullYear(this.pickerYear),t.setMonth(e);const a=new Date(this.pickerYear,e+1,0).getDate();t.setDate(Math.min(r,a)),this.anchorDate=t,this.monthPickerOpen=!1}monthNamesShort(){return Array.from({length:12},(e,t)=>new Date(2e3,t,1).toLocaleDateString(void 0,{month:"short"}))}rangeLabel(){if("month"===this.view)return this.anchorDate.toLocaleDateString(void 0,{month:"long",year:"numeric"});const{start:e,end:t}=this.range();if("day"===this.view)return e.toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"});const r=new Date(t);r.setDate(r.getDate()-1);const a={month:"short",day:"numeric"};return`${e.toLocaleDateString(void 0,a)} – ${r.toLocaleDateString(void 0,a)}`}clockDateLabel(){return this.nowTick,(new Date).toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}clockTimeLabel(){return this.nowTick,(new Date).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}render(){const e=this.config.title??"Calendar",t=this.displayCalendars(),r=this.filteredEvents(),a=this.weather(),i=a?.forecast?.slice(0,7)??[],n="dark"===this.resolvedTheme,s=a?Tt(a.state,n):null,o=this.hasLoadedOnce&&!this.loading&&!this.loadFailed&&0===r.length&&Boolean(this.hass)&&!this.config.show_demo_when_empty,l=this.hasLoadedOnce&&!this.loading&&this.loadFailed&&!this.formOpen,c=this.loading&&this.hasLoadedOnce,d=this.monthNamesShort();return B`
      <div class="shell">
        ${this.pendingDuplicate?B`
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
            `:K}

        <section class="info-bar" aria-label="Date and weather">
          <div class="clock-block">
            <div class="clock-date">${this.clockDateLabel()}</div>
            <div class="clock-time">${this.clockTimeLabel()}</div>
          </div>
          <div class="weather-now">
            ${a&&s?B`
                  <div
                    class="weather-blob"
                    style="--hac-wx-soft:${s.soft};--hac-wx-accent:${s.accent};--hac-wx-ink:${s.ink}"
                  >
                    <span class="weather-icon-halo" aria-hidden="true"
                      >${Mt(a.state)}</span
                    >
                    <span class="temp"
                      >${null!=a.temperature?`${Math.round(a.temperature)}${a.unit??"°"}`:(u=a.state,xt[u]??u.replace(/-/g," "))}</span
                    >
                  </div>
                  <div class="cond">${function(e){return{sunny:"Sunny skies","clear-night":"Clear night",partlycloudy:"Partly cloudy",cloudy:"Cloudy",fog:"A bit foggy",rainy:"Rainy",pouring:"Pouring rain",hail:"Hail",snowy:"Snowy","snowy-rainy":"Wintry mix",lightning:"Stormy","lightning-rainy":"Thunderstorms",windy:"Breezy","windy-variant":"Windy",exceptional:"Weather alert"}[e]??e.replace(/-/g," ")}(a.state)}</div>
                `:B`<div class="weather-stub">
                  ${this.weatherEntityId()?"Weather unavailable":"Add weather_entity"}
                </div>`}
          </div>
          <div class="forecast-strip" aria-label="Forecast">
            ${i.length?i.map((e,t)=>{const r=new Date(e.datetime),a=Tt(e.condition,n);return B`
                    <div
                      class="forecast-day"
                      style="--hac-wx-day-soft:${a.soft};--hac-wx-day-ink:${a.ink};animation-delay:${40*t}ms"
                    >
                      <span class="d"
                        >${r.toLocaleDateString(void 0,{weekday:"short"})}</span
                      >
                      <span class="g" aria-hidden="true"
                        >${Mt(e.condition)}</span
                      >
                      <span class="t"
                        >${null!=e.temperature?`${Math.round(e.temperature)}°`:"—"}</span
                      >
                    </div>
                  `}):K}
          </div>
        </section>

        <div class="title-row">
          <h1 class="brand">${e}</h1>
          <div class="filters" role="group" aria-label="Calendar filters">
            ${t.map(e=>{const t=!this.hiddenCalendars.includes(e);return B`
                <button
                  type="button"
                  class="pill"
                  aria-pressed=${t?"true":"false"}
                  title=${t?`Hide ${this.calendarLabel(e)}`:`Show ${this.calendarLabel(e)}`}
                  @click=${()=>this.toggleCalendarFilter(e)}
                >
                  <span
                    class="dot"
                    style="background:${this.calendarColor(e)}"
                  ></span>
                  ${this.calendarLabel(e)}
                </button>
              `})}
            <div class="cal-picker-wrap">
              <button
                type="button"
                class="pill add-cal-pill"
                aria-haspopup="dialog"
                aria-expanded=${this.calendarPickerOpen?"true":"false"}
                title="Add or remove calendars"
                @click=${()=>this.toggleCalendarPicker()}
              >
                + Add calendar
              </button>
              ${this.calendarPickerOpen?B`
                    <div
                      class="cal-picker"
                      role="dialog"
                      aria-label="Choose calendars"
                    >
                      <div class="cal-picker-title">Calendars</div>
                      <p class="cal-picker-hint">
                        Pick existing calendars or create a new Local Calendar.
                        Changes are saved to this dashboard (and this browser).
                      </p>
                      ${(()=>{const e=this.availableCalendarEntities(),t=this.configuredEntitySet();return e.length?e.map(e=>{const r=t.has(e);return B`
                            <label class="cal-picker-row">
                              <input
                                type="checkbox"
                                .checked=${r}
                                @change=${t=>{const r=t.target.checked;this.setCalendarInConfig(e,r)}}
                              />
                              <span
                                class="dot"
                                style="background:${this.calendarColor(e)}"
                              ></span>
                              <span class="cal-picker-label"
                                >${this.calendarLabel(e)}</span
                              >
                              <span class="cal-picker-id">${e}</span>
                            </label>
                          `}):B`<p class="cal-picker-empty">
                            No <code>calendar.*</code> entities found yet —
                            create one below.
                          </p>`})()}
                      <div class="cal-picker-create">
                        ${this.createCalendarOpen?B`
                              <label class="cal-create-label" for="hac-new-cal"
                                >New Local Calendar</label
                              >
                              <div class="cal-create-row">
                                <input
                                  id="hac-new-cal"
                                  type="text"
                                  class="cal-create-input"
                                  placeholder="Name (e.g. Kids)"
                                  .value=${this.createCalendarName}
                                  ?disabled=${this.createCalendarBusy}
                                  @input=${e=>{this.createCalendarName=e.target.value}}
                                  @keydown=${e=>{"Enter"===e.key&&(e.preventDefault(),this.submitCreateCalendar())}}
                                />
                                <button
                                  type="button"
                                  class="cal-create-btn"
                                  ?disabled=${this.createCalendarBusy}
                                  @click=${()=>{this.submitCreateCalendar()}}
                                >
                                  ${this.createCalendarBusy?"Creating…":"Create"}
                                </button>
                              </div>
                              <button
                                type="button"
                                class="cal-create-cancel"
                                ?disabled=${this.createCalendarBusy}
                                @click=${()=>{this.createCalendarOpen=!1,this.createCalendarError=""}}
                              >
                                Cancel
                              </button>
                            `:B`
                              <button
                                type="button"
                                class="cal-create-toggle"
                                @click=${()=>{this.createCalendarOpen=!0,this.createCalendarError=""}}
                              >
                                + Create new calendar
                              </button>
                            `}
                        ${this.createCalendarError?B`<p class="cal-picker-error">
                              ${this.createCalendarError}
                            </p>`:K}
                        ${this.persistNote?B`<p class="cal-picker-hint">${this.persistNote}</p>`:K}
                      </div>
                    </div>
                  `:K}
            </div>
          </div>
        </div>

        <header class="toolbar">
          <div class="toolbar-controls">
            <div class="nav-group">
              <button
                class="nav-btn"
                type="button"
                aria-label="Previous"
                @click=${()=>this.shift(-1)}
              >
                ‹
              </button>
              <button
                class="nav-btn"
                type="button"
                @click=${()=>{this.anchorDate=new Date,this.monthPickerOpen=!1}}
              >
                Today
              </button>
              <button
                class="nav-btn"
                type="button"
                aria-label="Next"
                @click=${()=>this.shift(1)}
              >
                ›
              </button>
            </div>
            <div class="range-wrap">
              <button
                type="button"
                class="range-label"
                aria-haspopup="dialog"
                aria-expanded=${this.monthPickerOpen?"true":"false"}
                aria-label="Jump to month and year"
                @click=${()=>this.toggleMonthPicker()}
              >
                ${this.rangeLabel()}
                <span class="caret" aria-hidden="true">▾</span>
              </button>
              ${this.monthPickerOpen?B`
                    <div
                      class="month-picker"
                      role="dialog"
                      aria-label="Choose month and year"
                    >
                      <div class="month-picker-year">
                        <button
                          type="button"
                          class="nav-btn"
                          aria-label="Previous year"
                          @click=${()=>this.shiftPickerYear(-1)}
                        >
                          ‹
                        </button>
                        <span class="year">${this.pickerYear}</span>
                        <button
                          type="button"
                          class="nav-btn"
                          aria-label="Next year"
                          @click=${()=>this.shiftPickerYear(1)}
                        >
                          ›
                        </button>
                      </div>
                      <div class="month-picker-grid">
                        ${d.map((e,t)=>B`
                            <button
                              type="button"
                              aria-current=${this.anchorDate.getFullYear()===this.pickerYear&&this.anchorDate.getMonth()===t?"true":"false"}
                              @click=${()=>this.jumpToMonth(t)}
                            >
                              ${e}
                            </button>
                          `)}
                      </div>
                    </div>
                  `:K}
            </div>
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
              <button
                type="button"
                aria-pressed=${"month"===this.view}
                @click=${()=>{this.view="month"}}
              >
                Month
              </button>
            </div>
            <button
              type="button"
              class="nav-btn theme-btn"
              aria-label="Theme: ${kt(this.themePreference)}. Click to cycle light, dark, auto."
              title="Theme: ${kt(this.themePreference)}"
              @click=${()=>this.cycleTheme()}
            >
              <span class="glyph" aria-hidden="true"
                >${h=this.themePreference,"light"===h?"☀":"dark"===h?"☾":"◐"}</span
              >
              ${kt(this.themePreference)}
            </button>
          </div>
          <button
            class="primary-btn add-btn"
            type="button"
            @click=${()=>this.openCreate()}
          >
            + Add Event
          </button>
        </header>

        <div class="grid-wrap">
          ${this.loading&&!this.hasLoadedOnce?B`
                <div class="state-panel" data-kind="loading">
                  <div
                    class="spinner"
                    style="width:1.4rem;height:1.4rem;border:2px solid var(--hac-line-strong);border-top-color:var(--hac-accent);border-radius:50%;animation:spin 0.7s linear infinite"
                  ></div>
                  <h2>Loading calendar</h2>
                  <p>Fetching events for ${this.rangeLabel()}.</p>
                </div>
              `:K}
          ${c?B`<div class="loading-veil"></div>`:K}
          ${l?B`
                <div class="state-panel" data-kind="error">
                  <div class="state-mark" aria-hidden="true"></div>
                  <h2>Couldn’t load calendars</h2>
                  <p>${this.status}</p>
                  <div class="state-actions">
                    <button
                      class="primary-btn"
                      type="button"
                      @click=${()=>{this.refreshEvents()}}
                    >
                      Retry
                    </button>
                    <button
                      class="ghost-btn"
                      type="button"
                      @click=${()=>this.openCreate()}
                    >
                      New event anyway
                    </button>
                  </div>
                </div>
              `:K}
          ${o&&"month"!==this.view?B`
                <div class="state-panel" data-kind="empty">
                  <div class="state-mark" aria-hidden="true"></div>
                  <h2>Nothing scheduled</h2>
                  <p>
                    ${this.rangeLabel()} is clear. Tap + Add Event, or
                    double-click a time slot on larger screens.
                  </p>
                  <div class="state-actions">
                    <button
                      class="primary-btn"
                      type="button"
                      @click=${()=>this.openCreate()}
                    >
                      + Add Event
                    </button>
                  </div>
                </div>
              `:K}

          ${"month"===this.view?B`
                <hac-month-grid
                  ?data-fill=${this.hasAttribute("data-layout")}
                  .anchorDate=${this.anchorDate}
                  .events=${r}
                  .calendars=${t}
                  .calendarColors=${this.calendarColors}
                  .weather=${a}
                  .maxVisible=${this.monthMaxVisibleEvents}
                  @event-select=${e=>this.openEdit(e.detail)}
                  @event-toggle-done=${e=>{this.onToggleDone(e)}}
                  @event-move=${e=>{this.onEventMove(e)}}
                  @day-select=${e=>this.openDayView(e.detail.date)}
                  @slot-create=${e=>this.openCreate(e.detail)}
                ></hac-month-grid>
              `:B`
                <hac-time-grid
                  .mode=${this.view}
                  .anchorDate=${this.anchorDate}
                  .events=${r}
                  .calendars=${t}
                  .calendarColors=${this.calendarColors}
                  .dayStartHour=${this.config.day_start_hour??6}
                  .dayEndHour=${this.config.day_end_hour??22}
                  .nowTick=${this.nowTick}
                  @event-select=${e=>this.openEdit(e.detail)}
                  @event-toggle-done=${e=>{this.onToggleDone(e)}}
                  @event-move=${e=>{this.onEventMove(e)}}
                  @day-select=${e=>this.openDayView(e.detail.date)}
                  @slot-create=${e=>this.openCreate(e.detail)}
                ></hac-time-grid>
              `}

          ${this.formOpen?B`
                <hac-event-form
                  .calendars=${this.formCalendars()}
                  .calendarColors=${this.calendarColors}
                  .event=${this.editing}
                  .doneDay=${this.formDoneDay??""}
                  .defaults=${this.formDefaults}
                  .busy=${this.formBusy}
                  .errorMessage=${this.formError}
                  .remindersAvailable=${this.remindersAvailable()}
                  .reminderDefaults=${this.reminderDefaults()}
                  .reminder=${this.formReminder}
                  .canDelete=${this.canDeleteEditing()}
                  @form-cancel=${()=>{this.formBusy||(this.formOpen=!1)}}
                  @form-save=${this.onFormSave}
                  @form-delete=${this.onFormDelete}
                ></hac-event-form>
              `:K}
        </div>

        <div class="status" data-kind=${this.statusKind}>
          ${this.loading?B`<span class="spinner" aria-hidden="true"></span>`:K}
          <span>${this.statusText()}</span>
          ${"error"!==this.statusKind||l?K:B`<button
                class="ghost-btn"
                type="button"
                style="min-height:1.75rem;padding:0.2rem 0.6rem;font-size:0.78rem"
                @click=${()=>{this.refreshEvents()}}
              >
                Retry
              </button>`}
        </div>
      </div>
    `;var h,u}};br.styles=[tt,s`
      :host {
        position: relative;
      }
    `],e([ue({attribute:!1})],br.prototype,"hass",void 0),e([pe()],br.prototype,"config",void 0),e([pe()],br.prototype,"view",void 0),e([pe()],br.prototype,"anchorDate",void 0),e([pe()],br.prototype,"events",void 0),e([pe()],br.prototype,"formOpen",void 0),e([pe()],br.prototype,"editing",void 0),e([pe()],br.prototype,"formDoneDay",void 0),e([pe()],br.prototype,"formDefaults",void 0),e([pe()],br.prototype,"formBusy",void 0),e([pe()],br.prototype,"formError",void 0),e([pe()],br.prototype,"status",void 0),e([pe()],br.prototype,"statusKind",void 0),e([pe()],br.prototype,"loading",void 0),e([pe()],br.prototype,"loadFailed",void 0),e([pe()],br.prototype,"pendingDuplicate",void 0),e([pe()],br.prototype,"loadGeneration",void 0),e([pe()],br.prototype,"hasLoadedOnce",void 0),e([pe()],br.prototype,"formReminder",void 0),e([pe()],br.prototype,"hiddenCalendars",void 0),e([pe()],br.prototype,"nowTick",void 0),e([pe()],br.prototype,"weatherForecast",void 0),e([pe()],br.prototype,"calendarColors",void 0),e([pe()],br.prototype,"themePreference",void 0),e([pe()],br.prototype,"resolvedTheme",void 0),e([pe()],br.prototype,"monthPickerOpen",void 0),e([pe()],br.prototype,"pickerYear",void 0),e([pe()],br.prototype,"calendarPickerOpen",void 0),e([pe()],br.prototype,"createCalendarOpen",void 0),e([pe()],br.prototype,"createCalendarName",void 0),e([pe()],br.prototype,"createCalendarBusy",void 0),e([pe()],br.prototype,"createCalendarError",void 0),e([pe()],br.prototype,"persistNote",void 0),br=e([ce(fe)],br),window.customCards=window.customCards||[],window.customCards.push({type:fe,name:"HA Calendar Card",description:"Skylight-style month/week/day calendar with create/edit, drag-to-reschedule, and safe calendar moves",preview:!0}),console.info(`%c ${fe} %c v${me} `,"background:#3d9b8f;color:#fff;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px","background:#2c3340;color:#fff;font-weight:700;padding:2px 6px;border-radius:0 4px 4px 0");export{br as HaCalendarCard};
//# sourceMappingURL=ha-calendar-card.js.map
