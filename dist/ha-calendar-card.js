function e(e,t,r,i){var a,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(s=(n<3?a(s):n>3?a(t,r,s):a(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,r=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let n=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const r=void 0!==t&&1===t.length;r&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&a.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const r=1===e.length?e[0]:t.reduce((t,r,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[i+1],e[0]);return new n(r,e,i)},o=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},w=(e,t)=>!c(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(e,r,t);void 0!==i&&l(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){const{get:i,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);a?.call(this,t),this.requestUpdate(e,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const r of t)this.createProperty(r,e[r])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,r]of t)this.elementProperties.set(e,r)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const r=this._$Eu(e,t);void 0!==r&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(r)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const r of i){const i=document.createElement("style"),a=t.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=r.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){const r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(void 0!==i&&!0===r.reflect){const a=(void 0!==r.converter?.toAttribute?r.converter:b).toAttribute(t,r.type);this._$Em=e,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){const r=this.constructor,i=r._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=r.getPropertyOptions(i),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const n=a.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,r,i=!1,a){if(void 0!==e){const n=this.constructor;if(!1===i&&(a=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??w)(a,t)||r.useDefault&&r.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:a},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==a||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,r]of e){const{wrapped:e}=r,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,r,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,_=e=>e,D=k.trustedTypes,E=D?D.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+C,P=`<${A}>`,T=document,M=()=>T.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,N="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,z=/>/g,F=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...r)=>({_$litType$:e,strings:t,values:r}))(1),Y=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),K=new WeakMap,q=T.createTreeWalker(T,129);function V(e,t){if(!R(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const G=(e,t)=>{const r=e.length-1,i=[];let a,n=2===t?"<svg>":3===t?"<math>":"",s=H;for(let t=0;t<r;t++){const r=e[t];let o,c,l=-1,d=0;for(;d<r.length&&(s.lastIndex=d,c=s.exec(r),null!==c);)d=s.lastIndex,s===H?"!--"===c[1]?s=L:void 0!==c[1]?s=z:void 0!==c[2]?(j.test(c[2])&&(a=RegExp("</"+c[2],"g")),s=F):void 0!==c[3]&&(s=F):s===F?">"===c[0]?(s=a??H,l=-1):void 0===c[1]?l=-2:(l=s.lastIndex-c[2].length,o=c[1],s=void 0===c[3]?F:'"'===c[3]?I:U):s===I||s===U?s=F:s===L||s===z?s=H:(s=F,a=void 0);const h=s===F&&e[t+1].startsWith("/>")?" ":"";n+=s===H?r+P:l>=0?(i.push(o),r.slice(0,l)+S+r.slice(l)+C+h):r+C+(-2===l?t:h)}return[V(e,n+(e[r]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class Q{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let a=0,n=0;const s=e.length-1,o=this.parts,[c,l]=G(e,t);if(this.el=Q.createElement(c,r),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=q.nextNode())&&o.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(S)){const t=l[n++],r=i.getAttribute(e).split(C),s=/([.?@])?(.*)/.exec(t);o.push({type:1,index:a,name:s[2],strings:r,ctor:"."===s[1]?te:"?"===s[1]?re:"@"===s[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(C)&&(o.push({type:6,index:a}),i.removeAttribute(e));if(j.test(i.tagName)){const e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=D?D.emptyScript:"";for(let r=0;r<t;r++)i.append(e[r],M()),q.nextNode(),o.push({type:2,index:++a});i.append(e[t],M())}}}else if(8===i.nodeType)if(i.data===A)o.push({type:2,index:a});else{let e=-1;for(;-1!==(e=i.data.indexOf(C,e+1));)o.push({type:7,index:a}),e+=C.length-1}a++}}static createElement(e,t){const r=T.createElement("template");return r.innerHTML=e,r}}function J(e,t,r=e,i){if(t===Y)return t;let a=void 0!==i?r._$Co?.[i]:r._$Cl;const n=O(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(e),a._$AT(e,r,i)),void 0!==i?(r._$Co??=[])[i]=a:r._$Cl=a),void 0!==a&&(t=J(e,a._$AS(e,t.values),a,i)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,i=(e?.creationScope??T).importNode(t,!0);q.currentNode=i;let a=q.nextNode(),n=0,s=0,o=r[0];for(;void 0!==o;){if(n===o.index){let t;2===o.type?t=new X(a,a.nextSibling,this,e):1===o.type?t=new o.ctor(a,o.name,o.strings,this,e):6===o.type&&(t=new ae(a,this,e)),this._$AV.push(t),o=r[++s]}n!==o?.index&&(a=q.nextNode(),n++)}return q.currentNode=T,i}p(e){let t=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),O(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==Y&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>R(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:r}=e,i="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=Q.createElement(V(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Z(i,this),r=e.u(this.options);e.p(t),this.T(r),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new Q(e)),t}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const a of e)i===t.length?t.push(r=new X(this.O(M()),this.O(M()),this,this.options)):r=t[i],r._$AI(a),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=_(e).nextSibling;_(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,a){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=W}_$AI(e,t=this,r,i){const a=this.strings;let n=!1;if(void 0===a)e=J(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==Y,n&&(this._$AH=e);else{const i=e;let s,o;for(e=a[0],s=0;s<a.length-1;s++)o=J(this,i[r+s],t,s),o===Y&&(o=this._$AH[s]),n||=!O(o)||o!==this._$AH[s],o===W?e=W:e!==W&&(e+=(o??"")+a[s+1]),this._$AH[s]=o}n&&!i&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class re extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ie extends ee{constructor(e,t,r,i,a){super(e,t,r,i,a),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??W)===Y)return;const r=this._$AH,i=e===W&&r!==W||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,a=e!==W&&(r===W||i);i&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const ne=k.litHtmlPolyfillSupport;ne?.(Q,X),(k.litHtmlVersions??=[]).push("3.3.3");const se=globalThis;class oe extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,r)=>{const i=r?.renderBefore??t;let a=i._$litPart$;if(void 0===a){const e=r?.renderBefore??null;i._$litPart$=a=new X(t.insertBefore(M(),e),e,void 0,r??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}oe._$litElement$=!0,oe.finalized=!0,se.litElementHydrateSupport?.({LitElement:oe});const ce=se.litElementPolyfillSupport;ce?.({LitElement:oe}),(se.litElementVersions??=[]).push("4.2.2");const le=e=>(t,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},he=(e=de,t,r)=>{const{kind:i,metadata:a}=r;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),n.set(r.name,e),"accessor"===i){const{name:i}=r;return{set(r){const a=t.get.call(this);t.set.call(this,r),this.requestUpdate(i,a,e,!0,r)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=r;return function(r){const a=this[i];t.call(this,r),this.requestUpdate(i,a,e,!0,r)}}throw Error("Unsupported decorator location: "+i)};function ue(e){return(t,r)=>"object"==typeof r?he(e,t,r):((e,t,r)=>{const i=t.hasOwnProperty(r);return t.constructor.createProperty(r,e),i?Object.getOwnPropertyDescriptor(t,r):void 0})(e,t,r)}function pe(e){return ue({...e,state:!0,attribute:!1})}const me="0.9.1",fe="ha-calendar-card",ge=56,ve=["calendar.family","calendar.personal","calendar.work"],ye=["#E07A5F","#3D9B8F","#81B29A","#5B8DB8","#E9B44C"];function be(e,t="Unknown error"){if(null==e)return t;if("string"==typeof e){const r=e.trim();return r&&"[object Object]"!==r?r:t}if(e instanceof Error){const r=e.message?.trim();return r&&"[object Object]"!==r?r:t}if("object"==typeof e){const t=e,r=[],i=we(t.message)??we(t.error),a=we(t.code),n=t.body;if(i&&r.push(i),a&&a!==i&&r.push(`(${a})`),null!=n)if("string"==typeof n&&n.trim())r.push(n.trim());else if("object"==typeof n){const e=we(n.message)??we(n.error);if(e)r.push(e);else try{r.push(JSON.stringify(n))}catch{}}if(r.length)return r.join(" ");try{const t=JSON.stringify(e);if(t&&"{}"!==t&&"null"!==t)return t}catch{}}return t}function we(e){if("string"!=typeof e)return;const t=e.trim();return t&&"[object Object]"!==t?t:void 0}function $e(e){if(e)return"string"==typeof e?e:"dateTime"in e&&e.dateTime?e.dateTime:"date"in e&&e.date?e.date:void 0}function xe(e,t){const r=$e(e.start),i=$e(e.end);if(!r||!i)return null;const a=e.rrule??void 0;return{uid:e.uid??`${t}:${r}:${e.summary??"event"}`,summary:e.summary??"(no title)",description:e.description??void 0,location:e.location??void 0,start:r,end:i,all_day:e.all_day??(n=e.start,n&&"string"!=typeof n?Boolean(n.date&&!n.dateTime):Boolean(n&&/^\d{4}-\d{2}-\d{2}$/.test(n))),calendar:t,recurring:Boolean(a||e.recurrence_id),rrule:a,recurrence_id:e.recurrence_id??void 0};var n}function ke(e,t){if(t||/^\d{4}-\d{2}-\d{2}$/.test(e))return e.slice(0,10);const r=/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})(?::(\d{2}))?/.exec(e);if(r&&!/[zZ]|[+-]\d{2}:?\d{2}$/.test(e))return`${r[1]}:${r[2]??"00"}`;const i=new Date(e);if(Number.isNaN(i.getTime()))return e;const a=e=>String(e).padStart(2,"0");return`${i.getFullYear()}-${a(i.getMonth()+1)}-${a(i.getDate())}T${a(i.getHours())}:${a(i.getMinutes())}:${a(i.getSeconds())}`}function _e(e){const t={summary:e.summary,description:e.description??"",location:e.location??"",dtstart:ke(e.start,e.all_day),dtend:ke(e.end,e.all_day)};return e.rrule?t.rrule=e.rrule:null===e.rrule&&(t.rrule=null),t}function De(e,t="this"){if(!Boolean(e.recurring||e.rrule||e.recurrence_id))return{};if("series"===t)return{};const r=e.recurrence_id;return r?"future"===t?{recurrenceId:r,recurrenceRange:"THISANDFUTURE"}:{recurrenceId:r}:{}}class Ee{constructor(e){this.hass=e}listCalendarEntities(e){return e?.length?[...e]:Object.keys(this.hass.states).filter(e=>e.startsWith("calendar.")).sort()}listWritableCalendars(e){return e.filter(e=>{const t=this.hass.states[e];if(!t)return!0;const r=t.attributes.supported_features;return"number"!=typeof r||!!(1&r)})}canDelete(e){const t=this.hass.states[e];if(!t)return!0;const r=t.attributes.supported_features;return"number"!=typeof r||!!(2&r)}async getEvents(e,t,r){const i=[],a=[];let n=!1;for(const s of e)try{const e=await this.fetchEntityEvents(s,t,r);n=!0,i.push(...e)}catch(e){a.push(s),console.warn(`[ha-calendar-card] failed to load ${s}:`,e instanceof Error?e.message:e)}return{events:i,errors:a,anySuccess:n}}async fetchEntityEvents(e,t,r){if(this.hass.callApi)try{const i=`?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(r.toISOString())}`;return(await this.hass.callApi("GET",`calendars/${e}${i}`)??[]).map(t=>xe(t,e)).filter(e=>null!==e)}catch{}const i=await this.hass.callService("calendar","get_events",{entity_id:e,start_date_time:t.toISOString(),end_date_time:r.toISOString()},void 0,void 0,!0);let a;if(i&&"object"==typeof i){const e=i;a=e.response&&"object"==typeof e.response?e.response:e}return(a?.[e]?.events??[]).map(t=>xe(t,e)).filter(e=>null!==e)}async createEvent(e){const t=_e(e);if(this.hass.callWS)try{await this.hass.callWS({type:"calendar/event/create",entity_id:e.calendar,event:t});const r=await this.findCreatedEvent(e);return{uid:r?.uid}}catch(t){if(e.rrule)throw new Error(`Recurring create failed: ${be(t)}`);try{await this.createEventViaService(e)}catch(e){throw new Error(be(e,be(t,"Calendar create failed")))}const r=await this.findCreatedEvent(e);return{uid:r?.uid}}if(e.rrule)throw new Error("Recurring create failed: Home Assistant websocket (callWS) is required for rrule — REST create_event does not support recurrence.");await this.createEventViaService(e);const r=await this.findCreatedEvent(e);return{uid:r?.uid}}async createEventViaService(e){await this.hass.callService("calendar","create_event",{entity_id:e.calendar,summary:e.summary,description:e.description??"",location:e.location??"",start_date_time:e.all_day?void 0:ke(e.start,!1),end_date_time:e.all_day?void 0:ke(e.end,!1),start_date:e.all_day?e.start.slice(0,10):void 0,end_date:e.all_day?e.end.slice(0,10):void 0})}async findCreatedEvent(e){const t=new Date(e.start),r=new Date(e.end),i=new Date(t.getTime()-6e4),a=new Date(r.getTime()+6e4);try{const{events:r}=await this.getEvents([e.calendar],i,a);return r.find(t=>function(e,t){return e.summary===t.summary&&e.start===t.start&&e.end===t.end}(t,{summary:e.summary,start:e.all_day?e.start.slice(0,10):e.start,end:e.all_day?e.end.slice(0,10):e.end}))??r.find(r=>r.summary===e.summary&&Math.abs(new Date(r.start).getTime()-t.getTime())<12e4)??null}catch{return null}}async updateEvent(e,t,r,i,a){try{const n={type:"calendar/event/update",entity_id:e,uid:t,event:_e(r)};return i&&(n.recurrence_id=i),a&&(n.recurrence_range=a),void await this.hass.callWS(n)}catch(i){if(r.rrule||a)throw new Error(be(i,"Calendar update failed"));try{await this.hass.callService("calendar","update_event",{entity_id:e,uid:t,summary:r.summary,description:r.description,location:r.location,start_date_time:r.all_day?void 0:ke(r.start,!1),end_date_time:r.all_day?void 0:ke(r.end,!1)})}catch(e){throw new Error(be(e,be(i,"Calendar update failed")))}}}async deleteEvent(e,t,r,i){try{const a={type:"calendar/event/delete",entity_id:e,uid:t};return r&&(a.recurrence_id=r),i&&(a.recurrence_range=i),void await this.hass.callWS(a)}catch(r){try{await this.hass.callService("calendar","delete_event",{entity_id:e,uid:t})}catch(e){throw new Error(be(e,be(r,"Calendar delete failed")))}}}async moveEventToCalendar(e,t,r){if(e.recurring||e.rrule)return{status:"blocked_recurring",reason:"Moving recurring events is disabled — change calendars only for one-off events."};if(e.calendar===t)return{status:"moved",newUid:e.uid};const i={summary:r?.summary??e.summary,description:r?.description??e.description,location:r?.location??e.location,start:r?.start??e.start,end:r?.end??e.end,all_day:r?.all_day??e.all_day,calendar:t};let a;try{if(a=(await this.createEvent(i)).uid??(await this.findCreatedEvent(i))?.uid,!a)return{status:"create_failed",error:"Created on target calendar but could not confirm the new event id — source left untouched."}}catch(e){return{status:"create_failed",error:be(e,"Create on target calendar failed")}}try{return await this.deleteEvent(e.calendar,e.uid,e.recurrence_id),{status:"moved",newUid:a}}catch(i){const n={entityId:e.calendar,uid:e.uid,summary:r?.summary??e.summary,targetCalendar:t,newUid:a};return{status:"delete_failed",newUid:a,error:be(i,"Delete from source calendar failed"),duplicate:!0,pending:n}}}}const Se="ha_calendar_reminders";function Ce(e){if(!e||"object"!=typeof e)return{};const t=e;return t.response&&"object"==typeof t.response?t.response:t}class Ae{constructor(e){this.hass=e}isAvailable(){const e=this.hass.services;return Boolean(e&&e[Se]?.set_reminder)}async getReminder(e,t){const r=Ce(await this.hass.callService(Se,"get_reminder",{calendar_entity_id:e,event_uid:t},void 0,void 0,!0)).reminder;return r&&"object"==typeof r?r:null}async setReminder(e){return Ce(await this.hass.callService(Se,"set_reminder",{calendar_entity_id:e.calendar_entity_id,event_uid:e.event_uid,event_start:e.event_start,event_summary:e.event_summary??"",minutes_before:e.minutes_before,notify_service:e.notify_service,message:e.message??"",enabled:e.enabled??!0},void 0,void 0,!0)).reminder??null}async clearReminder(e,t){const r=Ce(await this.hass.callService(Se,"clear_reminder",{calendar_entity_id:e,event_uid:t},void 0,void 0,!0));return Boolean(r.cleared)}}const Pe=s`
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
`,Te=s`
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
    z-index: 2;
    background: color-mix(in srgb, var(--hac-surface, #fff) 96%, transparent);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid var(--hac-line-strong, #d8dde6);
    padding: 0.55rem 0.3rem;
    text-align: center;
  }

  .corner {
    left: 0;
    z-index: 3;
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
    background: var(--hac-event);
    color: var(--hac-event-text);
    border-radius: 8px;
    padding: 0.28rem 0.4rem;
    font-size: 0.74rem;
    font-weight: 700;
    line-height: 1.25;
    overflow: hidden;
    cursor: pointer;
    border: 0;
    box-shadow: 0 1px 0 var(--hac-shadow-soft, rgba(44, 51, 64, 0.06));
    transition: transform 140ms ease, box-shadow 140ms ease, filter 140ms ease;
    -webkit-tap-highlight-color: transparent;
  }

  .event-block:hover,
  .event-block:focus-visible {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 6px 14px var(--hac-shadow-soft, rgba(44, 51, 64, 0.12));
    filter: brightness(1.04);
    outline: none;
  }

  .event-block strong {
    display: block;
    font-weight: 800;
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
  }
`,Me=s`
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

  .form-panel h2 {
    font-family: var(--hac-font-display, "Manrope", sans-serif);
    font-size: 1.28rem;
    margin: 0 0 0.35rem;
    letter-spacing: -0.02em;
    font-weight: 800;
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
`,Oe=new Set(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function Re(e){const t=e.trim();return t&&Oe.has(t)?`var(--${t}-color)`:t}function Ne(e){if(!e||"string"!=typeof e)return!1;const t=e.trim();if(!t)return!1;if(Oe.has(t))return!0;if(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(t))return!0;if(/^(rgb|hsl)a?\(/i.test(t))return!0;try{const e=(new Option).style;return e.color=t,""!==e.color}catch{return!1}}function He(e){return ye[(e<0?0:e)%ye.length]}function Le(e,t,r,i){if(Ne(r))return Re(r);const a=function(e,t){const r=e?.entities?.[t];if(!r)return;const i=r.display?.color;return"string"==typeof i?i:"string"==typeof r.color?r.color:void 0}(i,e);if(Ne(a))return Re(a);const n=i?.states?.[e]?.attributes?.color;return"string"==typeof n&&Ne(n)?Re(n):He(t)}function ze(e){const t=e?.options?.calendar?.color;return"string"==typeof t?t:void 0}function Fe(e,t,r){const i={};return e.forEach((e,a)=>{i[e]=Le(e,a,t[e],r)}),i}const Ue="ha-calendar-card-theme";function Ie(e){return"light"===e||"dark"===e||"auto"===e}function je(e){try{const e=localStorage.getItem(Ue);if(Ie(e))return e}catch{}return Ie(e)?e:"auto"}function Be(e){return"auto"===e?Boolean("undefined"!=typeof window&&window.matchMedia?.("(prefers-color-scheme: dark)").matches)?"dark":"light":e}function Ye(e){return"light"===e?"Light":"dark"===e?"Dark":"Auto"}const We={"clear-night":"Clear",cloudy:"Cloudy",fog:"Fog",hail:"Hail",lightning:"Storms","lightning-rainy":"Storms",partlycloudy:"Partly cloudy",pouring:"Downpour",rainy:"Rain",snowy:"Snow","snowy-rainy":"Sleet",sunny:"Sunny",windy:"Windy","windy-variant":"Windy",exceptional:"Alert"};function Ke(e){const t=e.weather_entity??e.weather;if(!t||"string"!=typeof t)return;return t.trim()||void 0}function qe(e){if(!Array.isArray(e))return[];const t=[];for(const r of e){if(!r||"object"!=typeof r)continue;const e=r,i=String(e.datetime??e.date??""),a=String(e.condition??e.state??"");i&&a&&t.push({datetime:i,condition:a,temperature:"number"==typeof e.temperature?e.temperature:void 0,templow:"number"==typeof e.templow?e.templow:void 0})}return t}function Ve(e){return qe(e.forecast??e.forecast_daily??e.forecast_twice_daily)}function Ge(e,t){if(!e||"object"!=typeof e)return[];const r=e,i=(r.response&&"object"==typeof r.response?r.response:r)[t];return i&&"object"==typeof i?qe(i.forecast):[]}const Qe={sunny:{soft:"rgba(249, 196, 74, 0.28)",accent:"#f0b429",ink:"#8a5a00"},"clear-night":{soft:"rgba(120, 140, 200, 0.28)",accent:"#8fa0d4",ink:"#3d4a78"},partlycloudy:{soft:"rgba(140, 190, 220, 0.28)",accent:"#7eb6d4",ink:"#3a6078"},cloudy:{soft:"rgba(160, 170, 185, 0.28)",accent:"#9aa3b2",ink:"#4a5260"},fog:{soft:"rgba(180, 190, 200, 0.32)",accent:"#a8b2be",ink:"#555e6c"},rainy:{soft:"rgba(110, 170, 220, 0.3)",accent:"#5b9fd4",ink:"#2a5f88"},pouring:{soft:"rgba(80, 140, 210, 0.32)",accent:"#4a8bc8",ink:"#245078"},hail:{soft:"rgba(130, 180, 220, 0.3)",accent:"#7eb0d4",ink:"#355e80"},snowy:{soft:"rgba(190, 220, 245, 0.4)",accent:"#a8d0ef",ink:"#3d6488"},"snowy-rainy":{soft:"rgba(160, 200, 230, 0.35)",accent:"#8cbddc",ink:"#3a6280"},lightning:{soft:"rgba(180, 150, 220, 0.3)",accent:"#b08ad4",ink:"#5a3d78"},"lightning-rainy":{soft:"rgba(160, 140, 210, 0.32)",accent:"#9a7ac8",ink:"#4e3870"},windy:{soft:"rgba(140, 200, 190, 0.28)",accent:"#6db8ac",ink:"#2f6a62"},"windy-variant":{soft:"rgba(140, 200, 190, 0.28)",accent:"#6db8ac",ink:"#2f6a62"},exceptional:{soft:"rgba(230, 120, 100, 0.28)",accent:"#e07a5f",ink:"#8a3a28"}},Je={sunny:"#ffd78a","clear-night":"#c5d0f5",partlycloudy:"#b8d8ef",cloudy:"#c8d0dc",fog:"#c8d0dc",rainy:"#9ec8ef",pouring:"#8ebcef",hail:"#a8d0ef",snowy:"#d0e8fa","snowy-rainy":"#b8d8ef",lightning:"#d4c0f0","lightning-rainy":"#c8b4e8",windy:"#a8ddd4","windy-variant":"#a8ddd4",exceptional:"#f0b0a0"};function Ze(e,t=!1){const r=e in Qe?e:function(e){return e.includes("lightning")?"lightning":e.includes("snow")?"snowy":e.includes("rain")||"pouring"===e?"rainy":e.includes("wind")?"windy":"clear-night"===e?"clear-night":"partlycloudy"===e?"partlycloudy":"sunny"===e?"sunny":"cloudy"===e?"cloudy":"fog"===e?"fog":"cloudy"}(e),i=Qe[r]??Qe.cloudy;return t?{soft:i.soft.replace(/0\.\d+/g,e=>{const t=Number(e);return String(Math.min(.45,t+.08))}),accent:i.accent,ink:Je[r]??"#d0d6e0"}:i}function Xe(e){return e.includes("lightning")?"⛈️":"snowy-rainy"===e?"🌨️":e.includes("snow")?"❄️":"pouring"===e?"🌧️":"hail"===e?"🧊":e.includes("rain")?"🌦️":"fog"===e?"🌫️":"cloudy"===e?"☁️":"partlycloudy"===e?"⛅":"clear-night"===e?"🌙":"sunny"===e?"☀️":e.includes("wind")?"💨":"exceptional"===e?"⚠️":"🌤️"}function et(e,t){const r=new Date(e);return r.setDate(r.getDate()+t),r}function tt(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function rt(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,r,i]=e.split("-").map(Number);return new Date(t,r-1,i)}return new Date(e)}let it=class extends oe{constructor(){super(...arguments),this.mode="week",this.anchorDate=new Date,this.events=[],this.calendars=[],this.calendarColors={},this.dayStartHour=6,this.dayEndHour=22,this.nowTick=0}get days(){const e=function(e){const t=new Date(e);return t.setHours(0,0,0,0),t}(this.anchorDate);if("day"===this.mode)return[e];const t=(e.getDay()+6)%7,r=et(e,-t);return Array.from({length:7},(e,t)=>et(r,t))}get hours(){const e=[];for(let t=this.dayStartHour;t<this.dayEndHour;t++)e.push(t);return e}calendarColor(e){if(this.calendarColors[e])return this.calendarColors[e];return He(Math.max(0,this.calendars.indexOf(e)))}eventStyle(e,t){const r=rt(e.start),i=rt(e.end),a=new Date(t);a.setHours(this.dayStartHour,0,0,0);const n=new Date(t);if(n.setHours(this.dayEndHour,0,0,0),i<=a||r>=n)return null;const s=r<a?a:r,o=i>n?n:i,c=60*(s.getHours()-this.dayStartHour)+s.getMinutes(),l=Math.max(22,(o.getTime()-s.getTime())/6e4);return`top:${c/60*ge}px;height:${l/60*ge}px;background:${this.calendarColor(e.calendar)};`}nowLineTop(e){this.nowTick;const t=new Date;if(!tt(t,e))return null;if(t.getHours()<this.dayStartHour||t.getHours()>=this.dayEndHour)return null;return(60*(t.getHours()-this.dayStartHour)+t.getMinutes())/60*ge}formatTime(e){return e.all_day||/^\d{4}-\d{2}-\d{2}$/.test(e.start)?"All day":rt(e.start).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}onEventClick(e){this.dispatchEvent(new CustomEvent("event-select",{detail:e,bubbles:!0,composed:!0}))}onSlotCreate(e,t){const r=new Date(e);r.setHours(t,0,0,0);const i=new Date(r);i.setHours(t+1,0,0,0),this.dispatchEvent(new CustomEvent("slot-create",{detail:{start:r,end:i},bubbles:!0,composed:!0}))}hourFromPointer(e,t){const r=t.getBoundingClientRect(),i=e.clientY-r.top;return this.dayStartHour+Math.floor(i/ge)}render(){const e=this.hours,t=this.days,r=e.length*ge,i=new Date;return B`
      <div
        class="time-grid"
        data-mode=${"month"===this.mode?"week":this.mode}
        style="--hac-hour-height:${ge}px"
      >
        <div class="corner"></div>
        ${t.map(e=>{const t=tt(e,i);return B`
            <div class="day-head" data-today=${t?"true":"false"}>
              <span
                >${e.toLocaleDateString(void 0,{weekday:"short"})}</span
              >
              <span class="num">${e.getDate()}</span>
            </div>
          `})}

        <div class="hours" style="height:${r}px">
          ${e.map(e=>B`<div class="hour-label">
                ${String(e).padStart(2,"0")}:00
              </div>`)}
        </div>

        ${t.map(t=>{const a=tt(t,i),n=this.nowLineTop(t);return B`
            <div
              class="day-col"
              data-today=${a?"true":"false"}
              style="height:${r}px"
              @dblclick=${e=>{const r=this.hourFromPointer(e,e.currentTarget);this.onSlotCreate(t,r)}}
            >
              ${e.map(()=>B`<div class="hour-line"></div>`)}
              ${null!==n?B`<div class="now-line" style="top:${n}px"></div>`:W}
              ${this.events.map(e=>{const r=this.eventStyle(e,t);if(!r)return W;const i=e.calendar.replace(/^calendar\./,"");return B`
                  <div
                    class="event-block"
                    style=${r}
                    role="button"
                    tabindex="0"
                    data-recurring=${e.rrule||e.recurring?"true":"false"}
                    title=${e.rrule||e.recurring?`${e.summary} (repeats)`:e.summary}
                    @click=${t=>{t.stopPropagation(),this.onEventClick(e)}}
                    @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.onEventClick(e))}}
                  >
                    <strong
                      >${e.rrule||e.recurring?"↻ ":""}${e.summary}</strong
                    >
                    <span class="time-tag">${this.formatTime(e)}</span>
                    <span class="cal-tag">${i}</span>
                  </div>
                `})}
            </div>
          `})}
      </div>
    `}};function at(e){const t=new Date(e);return t.setHours(0,0,0,0),t}function nt(e,t){const r=new Date(e);return r.setDate(r.getDate()+t),r}function st(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,r,i]=e.split("-").map(Number);return new Date(t,r-1,i)}return new Date(e)}it.styles=Te,e([ue({attribute:!1})],it.prototype,"mode",void 0),e([ue({attribute:!1})],it.prototype,"anchorDate",void 0),e([ue({attribute:!1})],it.prototype,"events",void 0),e([ue({attribute:!1})],it.prototype,"calendars",void 0),e([ue({attribute:!1})],it.prototype,"calendarColors",void 0),e([ue({type:Number})],it.prototype,"dayStartHour",void 0),e([ue({type:Number})],it.prototype,"dayEndHour",void 0),e([ue({type:Number})],it.prototype,"nowTick",void 0),it=e([le("hac-time-grid")],it);let ot=class extends oe{constructor(){super(...arguments),this.anchorDate=new Date,this.events=[],this.calendars=[],this.calendarColors={},this.weather=null,this.maxVisible=3}get monthStart(){const e=at(this.anchorDate);return e.setDate(1),e}get cells(){const e=this.monthStart,t=(e.getDay()+6)%7,r=nt(e,-t);return Array.from({length:42},(e,t)=>nt(r,t))}calendarColor(e){if(this.calendarColors[e])return this.calendarColors[e];return He(Math.max(0,this.calendars.indexOf(e)))}eventsForDay(e){return this.events.filter(t=>{const r=st(t.start),i=st(t.end),a=at(e);return r<nt(a,1)&&i>a}).sort((e,t)=>st(e.start).getTime()-st(t.start).getTime())}onEventClick(e,t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("event-select",{detail:e,bubbles:!0,composed:!0}))}onDayCreate(e){const t=new Date(e);t.setHours(9,0,0,0);const r=new Date(t);r.setHours(10,0,0,0),this.dispatchEvent(new CustomEvent("slot-create",{detail:{start:t,end:r},bubbles:!0,composed:!0}))}render(){const e=new Date,t=this.monthStart.getMonth();return B`
      <div class="month">
        <div class="dow">
          ${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(e=>B`<span>${e}</span>`)}
        </div>
        <div class="cells">
          ${this.cells.map(r=>{const i=r.getMonth()!==t,a=function(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}(r,e),n=this.eventsForDay(r),s=n.slice(0,this.maxVisible),o=n.length-s.length,c=function(e,t){if(!e?.forecast?.length)return null;const r=[t.getFullYear(),String(t.getMonth()+1).padStart(2,"0"),String(t.getDate()).padStart(2,"0")].join("-");return e.forecast.find(e=>e.datetime.slice(0,10)===r)??null}(this.weather,r);return B`
              <div
                class="cell"
                data-outside=${i?"true":"false"}
                data-today=${a?"true":"false"}
                @dblclick=${()=>this.onDayCreate(r)}
              >
                <div class="cell-top">
                  <span class="num">${r.getDate()}</span>
                  ${c?B`<span class="wx"
                        >${l=c.condition,l.includes("lightning")?"⚡":l.includes("snow")?"❄":l.includes("rain")||"pouring"===l||"hail"===l?"🌧":"fog"===l?"fog":"cloudy"===l?"☁":"partlycloudy"===l?"⛅":"clear-night"===l?"☾":"sunny"===l?"☀":l.includes("wind")?"🌬":"·"}${null!=c.temperature?` ${Math.round(c.temperature)}°`:""}</span
                      >`:W}
                </div>
                <div class="events">
                  ${s.map(e=>B`
                      <button
                        type="button"
                        class="chip"
                        style="background:${this.calendarColor(e.calendar)}"
                        title=${e.rrule||e.recurring?`${e.summary} (repeats)`:e.summary}
                        @click=${t=>this.onEventClick(e,t)}
                      >
                        ${e.rrule||e.recurring?B`<span class="recur" aria-hidden="true">↻</span>`:W}<span class="t"
                          >${function(e){return e.all_day||/^\d{4}-\d{2}-\d{2}$/.test(e.start)?"All day":st(e.start).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}(e)}</span
                        >${e.summary}
                      </button>
                    `)}
                  ${o>0?B`<div class="more">+${o} more</div>`:W}
                  ${i||0!==n.length?W:B`<div class="empty">No events</div>`}
                </div>
              </div>
            `;var l})}
        </div>
      </div>
    `}};ot.styles=s`
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
      grid-auto-rows: minmax(5.5rem, 1fr);
      min-height: 0;
    }

    /* Panel fill: shrink rows into the available body (outer page must not scroll) */
    :host([data-fill]) .cells {
      grid-auto-rows: minmax(0, 1fr);
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
      border: 0;
      border-radius: 6px;
      padding: 0.12rem 0.35rem;
      font: inherit;
      font-size: 0.68rem;
      font-weight: 700;
      line-height: 1.25;
      color: #fff;
      text-align: left;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: filter 120ms ease, transform 120ms ease;
    }

    .chip:hover {
      filter: brightness(1.05);
      transform: translateY(-0.5px);
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
    }

    .empty {
      font-size: 0.65rem;
      font-weight: 600;
      color: var(--hac-faint, #c2c8d2);
      padding: 0.1rem 0.15rem;
    }

    @media (max-width: 720px) {
      .cells {
        grid-auto-rows: minmax(4.75rem, 1fr);
      }

      :host([data-fill]) .cells {
        grid-auto-rows: minmax(0, 1fr);
      }

      .chip {
        font-size: 0.62rem;
        padding: 0.1rem 0.28rem;
      }

      .empty {
        display: none;
      }
    }
  `,e([ue({attribute:!1})],ot.prototype,"anchorDate",void 0),e([ue({attribute:!1})],ot.prototype,"events",void 0),e([ue({attribute:!1})],ot.prototype,"calendars",void 0),e([ue({attribute:!1})],ot.prototype,"calendarColors",void 0),e([ue({attribute:!1})],ot.prototype,"weather",void 0),e([ue({type:Number})],ot.prototype,"maxVisible",void 0),ot=e([le("hac-month-grid")],ot);const ct=["SU","MO","TU","WE","TH","FR","SA"];function lt(e){if(!e)return"none";const t=/FREQ=(DAILY|WEEKLY|MONTHLY|YEARLY)/i.exec(e);return t?t[1].toLowerCase():"none"}function dt(e){return/^\d{4}-\d{2}-\d{2}$/.test(e)}function ht(e){if(dt(e))return new Date(`${e}T12:00:00`);const t=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(e);return t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3]),Number(t[4]),Number(t[5]),Number(t[6]??"0")):new Date(e)}function ut(e){if("none"===e.freq)return;const t=[`FREQ=${e.freq.toUpperCase()}`];if("weekly"===e.freq){const i=ht(e.startIso);Number.isNaN(i.getTime())||t.push(`BYDAY=${r=i,ct[r.getDay()]}`)}var r;if(e.untilDate&&/^\d{4}-\d{2}-\d{2}$/.test(e.untilDate)){const r=e.untilDate.replace(/-/g,"");dt(e.startIso)?t.push(`UNTIL=${r}`):t.push(`UNTIL=${r}T${function(e){const t=/T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(e);if(t)return`${t[1]}${t[2]}${t[3]??"00"}`;const r=new Date(e);if(Number.isNaN(r.getTime()))return"000000";const i=e=>String(e).padStart(2,"0");return`${i(r.getHours())}${i(r.getMinutes())}${i(r.getSeconds())}`}(e.startIso)}`)}return t.join(";")}function pt(e,t){const r=e.slice(0,10),i=t.slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(r)||!/^\d{4}-\d{2}-\d{2}$/.test(i)||r===i)return{end:t,adjusted:!1};let a=`${r}T${t.includes("T")?t.slice(11,16):"10:00"}`;if(a<=e.slice(0,16)){const t=ht(16===e.length?`${e}:00`:e);t.setHours(t.getHours()+1);const i=e=>String(e).padStart(2,"0");a=`${r}T${i(t.getHours())}:${i(t.getMinutes())}`}return{end:a,adjusted:!0}}let mt=class extends oe{constructor(){super(...arguments),this.calendars=[],this.calendarColors={},this.event=null,this.defaults={},this.busy=!1,this.errorMessage="",this.remindersAvailable=!1,this.canDelete=!0,this.reminderDefaults={},this.reminder=null,this.summary="",this.description="",this.location="",this.start="",this.end="",this.calendar="",this.moveNote="",this.reminderEnabled=!1,this.reminderMinutes=30,this.reminderNotify="notify.mobile_app_phone",this.reminderMessage="",this.hydrateKey="",this.recurFreq="none",this.recurUntil="",this.validationError="",this.scopePrompt=null,this.confirmDelete=!1}connectedCallback(){super.connectedCallback(),this.hydrateEventFields(!0),this.applyReminderFields(!0)}updated(e){e.has("event")||e.has("defaults")?(this.hydrateEventFields(),this.applyReminderFields(!0),this.scopePrompt=null,this.confirmDelete=!1):(e.has("reminder")||e.has("reminderDefaults"))&&this.applyReminderFields(!1)}eventKey(){return this.event?`edit:${this.event.calendar}:${this.event.uid}:${this.event.recurrence_id??""}`:`create:${this.defaults.start??""}:${this.defaults.end??""}:${this.defaults.calendar??""}`}hydrateEventFields(e=!1){const t=this.eventKey();(e||t!==this.hydrateKey)&&(this.hydrateKey=t,this.event?(this.summary=this.event.summary,this.description=this.event.description??"",this.location=this.event.location??"",this.start=this.toLocalInput(this.event.start),this.end=this.toLocalInput(this.event.end),this.calendar=this.event.calendar,this.recurFreq=lt(this.event.rrule),this.recurUntil=function(e){if(!e)return"";const t=/UNTIL=(\d{8})(?:T\d{6}Z?)?/i.exec(e);if(!t)return"";const r=t[1];return`${r.slice(0,4)}-${r.slice(4,6)}-${r.slice(6,8)}`}(this.event.rrule)):(this.summary="",this.description="",this.location="",this.start=this.toLocalInput(this.defaults.start??(new Date).toISOString()),this.end=this.toLocalInput(this.defaults.end??new Date(Date.now()+36e5).toISOString()),this.calendar=this.defaults.calendar??this.calendars[0]??"",this.recurFreq="none",this.recurUntil=""),this.moveNote="",this.validationError="")}applyReminderFields(e){if(this.reminder)return this.reminderEnabled=Boolean(this.reminder.enabled),this.reminderMinutes=this.reminder.minutes_before,this.reminderNotify=this.reminder.notify_service,void(this.reminderMessage=this.reminder.message??"");e&&(this.reminderEnabled=!1,this.reminderMinutes=this.reminderDefaults.minutes_before??30,this.reminderNotify=this.reminderDefaults.notify_service||"notify.mobile_app_phone",this.reminderMessage="")}get calendarOptions(){const e=new Set,t=[],r=r=>{r&&!e.has(r)&&(e.add(r),t.push(r))};this.event?.calendar&&r(this.event.calendar),this.calendar&&r(this.calendar);for(const e of this.calendars)r(e);return t}toLocalInput(e){const t=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T09:00:00`):new Date(e);if(Number.isNaN(t.getTime()))return"";const r=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}T${r(t.getHours())}:${r(t.getMinutes())}`}fromLocalInput(e){const t=/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})(?::(\d{2}))?/.exec(e);if(t)return`${t[1]}:${t[2]??"00"}`;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const r=new Date(e);if(Number.isNaN(r.getTime()))return e;const i=e=>String(e).padStart(2,"0");return`${r.getFullYear()}-${i(r.getMonth()+1)}-${i(r.getDate())}T${i(r.getHours())}:${i(r.getMinutes())}:${i(r.getSeconds())}`}get untilInvalid(){return"none"!==this.recurFreq&&function(e,t){if(!e||!/^\d{4}-\d{2}-\d{2}$/.test(e))return!1;const r=t.slice(0,10);return!!/^\d{4}-\d{2}-\d{2}$/.test(r)&&e<r}(this.recurUntil||void 0,this.start)}get recurringMultiDay(){return!("none"===this.recurFreq||!this.start||!this.end)&&this.start.slice(0,10)!==this.end.slice(0,10)}refreshValidation(){this.untilInvalid?this.validationError="Until must be on or after the event start date.":this.recurringMultiDay?this.validationError="Repeating timed events should end on the same day as they start — each occurrence uses that duration. End will be adjusted to the start date.":this.validationError=""}get isRecurring(){return Boolean(this.event?.recurring||this.event?.rrule||this.event?.recurrence_id)}get canScopeInstance(){return Boolean(this.event?.recurrence_id)}get isCrossCalendarMove(){return Boolean(this.event&&this.calendar&&this.calendar!==this.event.calendar)}get calendarMoveBlocked(){return this.isRecurring&&this.isCrossCalendarMove}onCalendarChange(e){const t=e.target.value;this.selectCalendar(t)}selectCalendar(e){this.calendar=e,this.event&&e!==this.event.calendar?this.isRecurring?this.moveNote="Recurring series cannot change calendars (avoids partial/orphan instances). Keep the original calendar or recreate as a one-off.":this.moveNote="Home Assistant cannot move events across calendars — Save will create on the new calendar, then delete from the old one.":this.moveNote=""}calendarColor(e){if(this.calendarColors[e])return this.calendarColors[e];const t=this.calendarOptions;return He(Math.max(0,t.indexOf(e)))}calendarLabel(e){return e.replace(/^calendar\./,"").replace(/_/g," ")}close(){if(!this.busy)return this.scopePrompt||this.confirmDelete?(this.scopePrompt=null,void(this.confirmDelete=!1)):void this.dispatchEvent(new CustomEvent("form-cancel",{bubbles:!0,composed:!0}))}dismissOverlays(e){e?.stopPropagation(),this.busy||(this.scopePrompt=null,this.confirmDelete=!1)}onSaveClick(){if(!this.busy&&this.summary.trim()&&this.start&&this.end&&this.calendar&&!this.calendarMoveBlocked&&(this.refreshValidation(),!this.untilInvalid)){if(this.recurringMultiDay){const{end:e,adjusted:t}=pt(this.start,this.end);t&&(this.end=e,this.validationError="End adjusted to the start date so each occurrence has a same-day duration.")}if(this.event&&this.isRecurring)return this.confirmDelete=!1,void(this.scopePrompt="save");this.emitSave(void 0)}}onDeleteClick(){if(!this.busy&&this.event&&this.canDelete){if(this.isRecurring)return this.confirmDelete=!1,void(this.scopePrompt="delete");this.scopePrompt=null,this.confirmDelete=!0}}chooseScope(e){if(this.busy)return;const t=this.scopePrompt;this.scopePrompt=null,"save"===t?this.emitSave(e):"delete"===t&&this.emitDelete(e)}confirmOneOffDelete(){this.busy||(this.confirmDelete=!1,this.emitDelete(void 0))}emitSave(e){if(this.refreshValidation(),this.untilInvalid)return;if("none"!==this.recurFreq){const{end:e,adjusted:t}=pt(this.start,this.end);t&&(this.end=e)}const t=this.fromLocalInput(this.start);let r;!this.event||!this.isRecurring||"series"===e||"future"===e?(r=ut({freq:this.recurFreq,startIso:t,untilDate:this.recurUntil||void 0}),this.event&&this.isRecurring&&("series"===e||"future"===e)&&"none"===this.recurFreq&&(r=null)):r=void 0;const i={summary:this.summary.trim(),description:this.description.trim()||void 0,location:this.location.trim()||void 0,start:t,end:this.fromLocalInput(this.end),calendar:this.calendar,rrule:void 0===r?void 0:r},a=this.isCrossCalendarMove,n={mode:this.event?"edit":"create",input:i,original:this.event??void 0,crossCalendarMove:a,recurrenceScope:this.isRecurring?e:void 0,reminder:this.remindersAvailable?{enabled:this.reminderEnabled,minutes_before:this.reminderMinutes,notify_service:this.reminderNotify.trim(),message:this.reminderMessage.trim()}:void 0};this.dispatchEvent(new CustomEvent("form-save",{detail:n,bubbles:!0,composed:!0}))}emitDelete(e){if(!this.event)return;const t={event:this.event,recurrenceScope:this.isRecurring?e:void 0};this.dispatchEvent(new CustomEvent("form-delete",{detail:t,bubbles:!0,composed:!0}))}scopeLabels(e){return"delete"===e?{title:"Delete recurring event",subtitle:"Choose how much of the series to remove. Matches Home Assistant calendar delete scopes."}:{title:"Edit recurring event",subtitle:"Choose how far these changes apply. Matches Home Assistant calendar update scopes."}}renderScopePrompt(){if(!this.scopePrompt)return W;const{title:e,subtitle:t}=this.scopeLabels(this.scopePrompt),r="delete"===this.scopePrompt,i=this.canScopeInstance;return B`
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
          ${i?W:B`<p class="hint warn">
                This event has no occurrence id — only the entire series can be
                changed safely.
              </p>`}
          <div class="scope-choices">
            <button
              type="button"
              class="scope-choice ${r?"danger-soft":""}"
              ?disabled=${this.busy||!i}
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
              ?disabled=${this.busy||!i}
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
    `:W}render(){const e=this.event?"Edit event":"New event",t=this.calendarOptions,r=this.event?.rrule?function(e){switch(lt(e)){case"daily":return"Daily";case"weekly":return"Weekly";case"monthly":return"Monthly";case"yearly":return"Yearly";default:return e?"Repeats":""}}(this.event.rrule):this.isRecurring?"Repeats":"";return B`
      <div class="form-backdrop" @click=${this.close}>
        <div
          class="form-panel"
          @click=${e=>e.stopPropagation()}
          role="dialog"
          aria-label=${e}
        >
          <h2>${e}</h2>
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
              </p>`:W}

          <div class="row-2">
            <div>
              <label for="start">Start</label>
              <input
                id="start"
                type="datetime-local"
                .value=${this.start}
                ?disabled=${this.busy}
                @input=${e=>{this.start=e.target.value,this.refreshValidation()}}
              />
            </div>
            <div>
              <label for="end">End</label>
              <input
                id="end"
                type="datetime-local"
                .value=${this.end}
                ?disabled=${this.busy}
                @input=${e=>{this.end=e.target.value,this.refreshValidation()}}
              />
            </div>
          </div>

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
                </p>`:W}
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
                      </p>`:W}
                `:W}
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
              `:W}

          ${this.calendarMoveBlocked?B`<p class="hint warn">
                Recurring events cannot change calendars. Keep the original
                calendar to avoid orphaning series instances.
              </p>`:null}
          ${this.moveNote?B`<p class="hint ${this.calendarMoveBlocked?"warn":""}">
                ${this.moveNote}
              </p>`:null}
          ${this.validationError?B`<p
                class="hint ${this.untilInvalid?"error":"warn"}"
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
                `:W}
            <div class="form-actions-end">
              <button type="button" ?disabled=${this.busy} @click=${this.close}>
                Cancel
              </button>
              <button
                type="button"
                class="primary"
                ?disabled=${this.busy||this.calendarMoveBlocked||this.untilInvalid}
                @click=${()=>this.onSaveClick()}
              >
                ${this.busy?"Saving…":this.isCrossCalendarMove?"Move & save":"Save"}
              </button>
            </div>
          </div>
        </div>
        ${this.renderScopePrompt()} ${this.renderConfirmDelete()}
      </div>
    `}};mt.styles=Me,e([ue({attribute:!1})],mt.prototype,"calendars",void 0),e([ue({attribute:!1})],mt.prototype,"calendarColors",void 0),e([ue({attribute:!1})],mt.prototype,"event",void 0),e([ue({attribute:!1})],mt.prototype,"defaults",void 0),e([ue({type:Boolean})],mt.prototype,"busy",void 0),e([ue({type:String})],mt.prototype,"errorMessage",void 0),e([ue({type:Boolean})],mt.prototype,"remindersAvailable",void 0),e([ue({type:Boolean})],mt.prototype,"canDelete",void 0),e([ue({attribute:!1})],mt.prototype,"reminderDefaults",void 0),e([ue({attribute:!1})],mt.prototype,"reminder",void 0),e([pe()],mt.prototype,"summary",void 0),e([pe()],mt.prototype,"description",void 0),e([pe()],mt.prototype,"location",void 0),e([pe()],mt.prototype,"start",void 0),e([pe()],mt.prototype,"end",void 0),e([pe()],mt.prototype,"calendar",void 0),e([pe()],mt.prototype,"moveNote",void 0),e([pe()],mt.prototype,"reminderEnabled",void 0),e([pe()],mt.prototype,"reminderMinutes",void 0),e([pe()],mt.prototype,"reminderNotify",void 0),e([pe()],mt.prototype,"reminderMessage",void 0),e([pe()],mt.prototype,"hydrateKey",void 0),e([pe()],mt.prototype,"recurFreq",void 0),e([pe()],mt.prototype,"recurUntil",void 0),e([pe()],mt.prototype,"validationError",void 0),e([pe()],mt.prototype,"scopePrompt",void 0),e([pe()],mt.prototype,"confirmDelete",void 0),mt=e([le("hac-event-form")],mt);let ft=class extends oe{constructor(){super(...arguments),this.config={type:`custom:${fe}`},this.view="month",this.anchorDate=new Date,this.events=[],this.formOpen=!1,this.editing=null,this.formDefaults={},this.formBusy=!1,this.formError="",this.status=`HA Calendar Card v${me}`,this.statusKind="info",this.loading=!1,this.loadFailed=!1,this.pendingDuplicate=null,this.loadGeneration=0,this.hasLoadedOnce=!1,this.formReminder=null,this.hiddenCalendars=[],this.nowTick=Date.now(),this.weatherForecast=[],this.calendarColors={},this.themePreference="auto",this.resolvedTheme="light",this.monthPickerOpen=!1,this.pickerYear=(new Date).getFullYear(),this.pollTimer=null,this.clockTimer=null,this.hadHass=!1,this.weatherEntityLoaded=null,this.weatherFetchInFlight=!1,this.registryUnsub=null,this.colorLoadGeneration=0,this.subscribedConnection=null,this.panelStyledAncestors=[],this.panelResizeObserver=null,this.panelHost=null,this.themeMediaQuery=null,this.themeMediaHandler=null,this.onDocPointerDown=null}setConfig(e){if(!e)throw new Error("Invalid configuration");const t=Ke(e);this.config={title:"Calendar",entities:[...ve],initial_view:"month",theme:"auto",day_start_hour:6,day_end_hour:22,show_demo_when_empty:!1,...e,weather_entity:t,type:e.type??`custom:${fe}`},this.view=this.config.initial_view??"month",this.applyThemePreference(je(this.config.theme))}static getStubConfig(){return{title:"Calendar",entities:[...ve],initial_view:"month"}}getCardSize(){return 10}connectedCallback(){super.connectedCallback(),this.ensureFonts(),this.startTimers(),this.syncPanelLayout(),this.bindThemeMedia(),this.bindPickerDismiss(),this.applyThemePreference(je(this.config.theme??"auto")),this.refreshCalendarColors(),this.subscribeRegistryColors()}firstUpdated(){this.syncPanelLayout(),this.syncThemeAttribute()}disconnectedCallback(){super.disconnectedCallback(),this.clearTimers(),this.clearPanelLayout(),this.unsubscribeRegistryColors(),this.unbindThemeMedia(),this.unbindPickerDismiss()}ensureFonts(){const e="ha-calendar-card-fonts";if(document.getElementById(e))return;const t=document.createElement("link");t.id=e,t.rel="stylesheet",t.href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Nunito:wght@500;600;700;800&family=Quicksand:wght@500;600;700&display=swap",document.head.appendChild(t)}syncPanelLayout(){const e=this.closest("hui-panel-view");if(!e)return void this.clearPanelLayout();this.setAttribute("data-layout","panel");const t=[e,this.closest("hui-card")].filter(e=>Boolean(e));if(this.panelHost!==e){this.clearPanelAncestorStyles(),this.panelHost=e;for(const e of t)this.stylePanelAncestor(e),this.panelStyledAncestors.push(e);this.panelResizeObserver?.disconnect(),this.panelResizeObserver=new ResizeObserver(()=>this.applyPanelHeight()),this.panelResizeObserver.observe(e)}this.applyPanelHeight()}stylePanelAncestor(e){e.dataset.hacPanelStyled="1",e.style.setProperty("display","flex"),e.style.setProperty("flex-direction","column"),e.style.setProperty("flex","1 1 auto"),e.style.setProperty("height","100%"),e.style.setProperty("max-height","100%"),e.style.setProperty("min-height","0"),e.style.setProperty("overflow","hidden"),e.style.setProperty("box-sizing","border-box")}applyPanelHeight(){const e=this.panelHost;if(!e)return;const t=e.clientHeight;t>0?this.style.setProperty("--hac-panel-height",`${t}px`):this.style.setProperty("--hac-panel-height","calc(100dvh - var(--header-height, 56px) - var(--safe-area-inset-top, 0px) - var(--safe-area-inset-bottom, 0px))")}clearPanelAncestorStyles(){for(const e of this.panelStyledAncestors)if("1"===e.dataset.hacPanelStyled){delete e.dataset.hacPanelStyled;for(const t of["display","flex-direction","flex","height","max-height","min-height","overflow","box-sizing"])e.style.removeProperty(t)}this.panelStyledAncestors=[]}clearPanelLayout(){this.panelResizeObserver?.disconnect(),this.panelResizeObserver=null,this.panelHost=null,this.clearPanelAncestorStyles(),this.removeAttribute("data-layout"),this.style.removeProperty("--hac-panel-height")}startTimers(){this.clearTimers(),this.clockTimer=window.setInterval(()=>{this.nowTick=Date.now()},3e4),this.pollTimer=window.setInterval(()=>{this.refreshEvents({silent:!0}),this.refreshWeatherForecast(!0)},6e4)}clearTimers(){null!=this.clockTimer&&(window.clearInterval(this.clockTimer),this.clockTimer=null),null!=this.pollTimer&&(window.clearInterval(this.pollTimer),this.pollTimer=null)}updated(e){if(this.syncPanelLayout(),e.has("config")||e.has("anchorDate")||e.has("view"))return this.refreshEvents(),this.refreshWeatherForecast(!0),void(e.has("config")&&(this.refreshCalendarColors(),this.subscribeRegistryColors()));if(e.has("hass")){const e=Boolean(this.hass);e&&!this.hadHass?(this.hadHass=!0,this.refreshEvents(),this.refreshWeatherForecast(!0),this.refreshCalendarColors(),this.subscribeRegistryColors()):e?(this.refreshWeatherForecast(!1),this.subscribeRegistryColors()):(this.hadHass=!1,this.unsubscribeRegistryColors())}}entities(){return this.config.entities?.length?[...this.config.entities]:[...ve]}formCalendars(){const e=this.entities(),t=this.hass?new Ee(this.hass).listWritableCalendars(e):e,r=this.editing?.calendar;return r&&!t.includes(r)?[r,...t]:t}canDeleteEditing(){return!!this.editing&&(!this.hass||new Ee(this.hass).canDelete(this.editing.calendar))}calendarColor(e){if(this.calendarColors[e])return this.calendarColors[e];const t=this.entities();return He(Math.max(0,t.indexOf(e)))}async refreshCalendarColors(){const e=this.entities(),t=++this.colorLoadGeneration,r=Fe(e,{},this.hass);if(this.calendarColors=r,!this.hass)return;const i=await async function(e,t){const r=[...new Set(t.filter(Boolean))],i={};if(!r.length)return i;try{const t=await e.callWS({type:"config/entity_registry/get_entries",entity_ids:r});for(const e of r){const r=ze(t?.[e]);Ne(r)&&(i[e]=Re(r))}return i}catch{}try{const t=await e.callWS({type:"config/entity_registry/list"}),a=new Map((t??[]).filter(e=>e?.entity_id).map(e=>[e.entity_id,e]));for(const e of r){const t=ze(a.get(e));Ne(t)&&(i[e]=Re(t))}}catch{}return i}(this.hass,e);t===this.colorLoadGeneration&&(this.calendarColors=Fe(e,i,this.hass))}subscribeRegistryColors(){const e=this.hass?.connection;e?.subscribeEvents&&(this.registryUnsub&&this.subscribedConnection===e||(this.unsubscribeRegistryColors(),this.subscribedConnection=e,e.subscribeEvents(()=>{this.refreshCalendarColors()},"entity_registry_updated").then(t=>{this.hass?.connection===e?(this.registryUnsub=t,this.subscribedConnection=e):t()}).catch(()=>{})))}unsubscribeRegistryColors(){if(this.registryUnsub){try{this.registryUnsub()}catch{}this.registryUnsub=null}this.subscribedConnection=null}calendarLabel(e){return e.replace(/^calendar\./,"").replace(/_/g," ")}filteredEvents(){if(!this.hiddenCalendars.length)return this.events;const e=new Set(this.hiddenCalendars);return this.events.filter(t=>!e.has(t.calendar))}toggleCalendarFilter(e){this.hiddenCalendars.includes(e)?this.hiddenCalendars=this.hiddenCalendars.filter(t=>t!==e):this.hiddenCalendars=[...this.hiddenCalendars,e]}range(){const e=new Date(this.anchorDate);if(e.setHours(0,0,0,0),"day"===this.view){const t=new Date(e);return t.setDate(t.getDate()+1),{start:e,end:t}}if("month"===this.view){const t=new Date(e.getFullYear(),e.getMonth(),1),r=(t.getDay()+6)%7;t.setDate(t.getDate()-r);const i=new Date(t);return i.setDate(i.getDate()+42),{start:t,end:i}}const t=(e.getDay()+6)%7;e.setDate(e.getDate()-t);const r=new Date(e);return r.setDate(r.getDate()+7),{start:e,end:r}}async refreshEvents(e){const t=++this.loadGeneration,r=Boolean(e?.silent)&&this.hasLoadedOnce;if(!this.hass)return this.events=this.demoEvents(),this.loadFailed=!1,this.hasLoadedOnce=!0,this.loading=!1,this.status="Preview mode — demo events (no hass)",void(this.statusKind="info");r||(this.loading=!0);const i=new Ee(this.hass),{start:a,end:n}=this.range(),s=this.entities();try{const e=await i.getEvents(s,a,n);if(t!==this.loadGeneration)return;if(this.loadFailed=!1,this.hasLoadedOnce=!0,e.events.length){this.events=e.events;const t=e.errors.length?` · ${e.errors.length} calendar(s) failed`:"";this.status=`${e.events.length} event(s)${t}`,this.statusKind=e.errors.length?"warn":"info"}else e.anySuccess?(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.status=this.config.show_demo_when_empty?"No events — showing demo blocks":"No events in this range",this.statusKind="info"):(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.loadFailed=!this.config.show_demo_when_empty,this.status=e.errors.length?`Could not load: ${e.errors.join(", ")} — check entity ids`:"No calendars loaded",this.statusKind="error")}catch(e){if(t!==this.loadGeneration)return;this.events=[],this.loadFailed=!0,this.hasLoadedOnce=!0,this.status=`Load failed: ${be(e)}`,this.statusKind="error"}finally{t===this.loadGeneration&&(this.loading=!1)}}demoEvents(){const e=new Date(this.anchorDate);e.setHours(0,0,0,0);const t=(t,r,i,a,n)=>{const s=new Date(e);s.setDate(s.getDate()+t),s.setHours(r,0,0,0);const o=new Date(s);return o.setHours(r+i,0,0,0),{uid:`demo-${a}-${t}-${r}`,summary:a,start:s.toISOString(),end:o.toISOString(),calendar:n}},r=this.entities();return[t(0,9,1,"Morning standup",r[0]??"calendar.family"),t(0,11,2,"Deep work",r[1]??"calendar.personal"),t(1,14,1,"School pickup",r[0]??"calendar.family"),t(2,10,1,"Dentist",r[2]??"calendar.work"),t(4,16,2,"Soccer practice",r[0]??"calendar.family"),t(5,12,1,"Lunch with Sam",r[1]??"calendar.personal")]}shift(e){const t=new Date(this.anchorDate);"month"===this.view?t.setMonth(t.getMonth()+e):"day"===this.view?t.setDate(t.getDate()+e):t.setDate(t.getDate()+7*e),this.anchorDate=t}remindersAvailable(){return Boolean(this.hass&&new Ae(this.hass).isAvailable())}reminderDefaults(){return{minutes_before:this.config.reminder_minutes_before??30,notify_service:this.config.reminder_notify_service??"notify.mobile_app_phone"}}weatherEntityId(){return Ke(this.config)}weather(){return function(e,t,r){if(!e||!t)return null;const i=e.states[t];if(!i)return null;const a=i.attributes??{},n=r&&r.length?r:Ve(a);return{entityId:t,state:i.state,temperature:"number"==typeof a.temperature?a.temperature:void 0,unit:"string"==typeof a.temperature_unit?a.temperature_unit:"string"==typeof a.unit_of_measurement?a.unit_of_measurement:"°",humidity:"number"==typeof a.humidity?a.humidity:void 0,forecast:n}}(this.hass,this.weatherEntityId(),this.weatherForecast)}async refreshWeatherForecast(e=!1){const t=this.weatherEntityId();if(!this.hass||!t)return this.weatherForecast=[],void(this.weatherEntityLoaded=null);if((e||this.weatherEntityLoaded!==t||!this.weatherForecast.length)&&!this.weatherFetchInFlight){this.weatherFetchInFlight=!0;try{const e=await async function(e,t){const r=e.states[t];if(r){const e=Ve(r.attributes??{});if(e.length)return e}const i=["daily","twice_daily","hourly"];for(const r of i)try{const i=Ge(await e.callService("weather","get_forecasts",{type:r},{entity_id:t},!1,!0),t);if(i.length)return i}catch{}return[]}(this.hass,t);this.weatherForecast=e,this.weatherEntityLoaded=t}catch{}finally{this.weatherFetchInFlight=!1}}}openCreate(e){this.editing=null,this.formError="",this.formBusy=!1,this.formReminder=null,this.formDefaults={start:(e?.start??new Date).toISOString(),end:(e?.end??new Date(Date.now()+36e5)).toISOString(),calendar:this.entities()[0]},this.formOpen=!0}openEdit(e){this.editing=e,this.formError="",this.formBusy=!1,this.formDefaults={},this.formReminder=null,this.formOpen=!0,this.loadReminderForEvent(e)}async loadReminderForEvent(e){if(this.hass&&this.remindersAvailable())try{const t=await new Ae(this.hass).getReminder(e.calendar,e.uid);if(!this.formOpen||this.editing?.uid!==e.uid)return;this.formReminder=t?{enabled:t.enabled,minutes_before:t.minutes_before,notify_service:t.notify_service,message:t.message??""}:null}catch{}}async syncReminder(e){if(!this.hass||!e.reminder||!this.remindersAvailable())return null;const t=new Ae(this.hass);if(!e.reminder.enabled)return await t.clearReminder(e.calendar,e.uid),"reminder cleared";if(!e.reminder.notify_service.trim())throw new Error("Reminder notify service is required");return await t.setReminder({calendar_entity_id:e.calendar,event_uid:e.uid,event_start:e.start,event_summary:e.summary,minutes_before:e.reminder.minutes_before,notify_service:e.reminder.notify_service.trim(),message:e.reminder.message,enabled:!0}),"reminder saved"}async onFormSave(e){const{mode:t,input:r,original:i,reminder:a,crossCalendarMove:n,recurrenceScope:s}=e.detail;if(!this.hass)return void(this.formError="No Home Assistant connection — cannot save.");this.formBusy=!0,this.formError="";const o=new Ee(this.hass);let c=null;const l=Boolean(i&&(n||r.calendar&&r.calendar!==i.calendar));try{if("create"===t){const e=await o.createEvent(r);e.uid&&a?.enabled?c=await this.syncReminder({calendar:r.calendar,uid:e.uid,start:r.start,summary:r.summary,reminder:a}):a?.enabled&&!e.uid&&(c="event created; reminder skipped (no confirmed event uid yet)"),this.formOpen=!1,this.status=`Created “${r.summary}” on ${r.calendar}${r.rrule?" (recurring)":""}${c?` · ${c}`:""}`,this.statusKind="info"}else if(l&&i){if(i.recurring||i.rrule)return void(this.formError="Recurring events cannot change calendars. Keep the original calendar or recreate as a one-off.");const e=await o.moveEventToCalendar(i,r.calendar,{...r,calendar:r.calendar,rrule:void 0});if("moved"===e.status){if(this.remindersAvailable())try{await new Ae(this.hass).clearReminder(i.calendar,i.uid)}catch{}a&&(c=await this.syncReminder({calendar:r.calendar,uid:e.newUid,start:r.start,summary:r.summary,reminder:a})),this.formOpen=!1,this.pendingDuplicate=null,this.status=`Moved “${r.summary}” ${i.calendar} → ${r.calendar}${c?` · ${c}`:""}`,this.statusKind="info"}else{if("create_failed"===e.status)return this.formError=`Move aborted (create failed): ${e.error}`,this.status=this.formError,void(this.statusKind="error");if("delete_failed"===e.status)this.formOpen=!1,this.pendingDuplicate=e.pending,this.status=`Copy exists on ${r.calendar}, but the old event could not be removed.`,this.statusKind="warn";else if("blocked_recurring"===e.status)return void(this.formError=e.reason)}}else if(i){const{recurrenceId:e,recurrenceRange:t}=De(i,s??"this");await o.updateEvent(i.calendar,i.uid,{...r,calendar:i.calendar},e,t),a&&(c=await this.syncReminder({calendar:i.calendar,uid:i.uid,start:r.start,summary:r.summary,reminder:a})),this.formOpen=!1,this.status=`Updated “${r.summary}”${i.rrule||r.rrule?` · ${s??"this"}`:""}${c?` · ${c}`:""}`,this.statusKind="info"}await this.refreshEvents()}catch(e){this.formError=be(e),this.status=this.formError,this.statusKind="error"}finally{this.formBusy=!1}}async onFormDelete(e){const{event:t,recurrenceScope:r}=e.detail;if(!this.hass)return void(this.formError="No Home Assistant connection — cannot delete.");this.formBusy=!0,this.formError="";const i=new Ee(this.hass);try{if(!i.canDelete(t.calendar))return this.formError=`${t.calendar} does not support deleting events.`,this.status=this.formError,void(this.statusKind="error");const{recurrenceId:e,recurrenceRange:a}=De(t,r??"this");if(await i.deleteEvent(t.calendar,t.uid,e,a),this.remindersAvailable())try{await new Ae(this.hass).clearReminder(t.calendar,t.uid)}catch{}this.formOpen=!1;const n=t.recurring||t.rrule||t.recurrence_id?` · ${r??"this"}`:"";this.status=`Deleted “${t.summary}”${n}`,this.statusKind="info",await this.refreshEvents()}catch(e){this.formError=be(e),this.status=this.formError,this.statusKind="error"}finally{this.formBusy=!1}}async cleanupDuplicate(){if(!this.hass||!this.pendingDuplicate)return;const e=this.pendingDuplicate,t=new Ee(this.hass);try{await t.deleteEvent(e.entityId,e.uid),this.pendingDuplicate=null,this.status=`Removed old copy of “${e.summary}” from ${e.entityId}`,this.statusKind="info",await this.refreshEvents()}catch(e){this.status=`Cleanup failed: ${be(e)}`,this.statusKind="error"}}dismissDuplicate(){this.pendingDuplicate=null,this.status="Duplicate warning dismissed — old copy may still exist",this.statusKind="warn"}applyThemePreference(e){this.themePreference=e,this.resolvedTheme=Be(e),this.syncThemeAttribute()}syncThemeAttribute(){this.setAttribute("data-theme",this.resolvedTheme)}cycleTheme(){const e="light"===(t=this.themePreference)?"dark":"dark"===t?"auto":"light";var t;!function(e){try{localStorage.setItem(Ue,e)}catch{}}(e),this.applyThemePreference(e)}bindThemeMedia(){this.unbindThemeMedia(),"undefined"!=typeof window&&window.matchMedia&&(this.themeMediaQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.themeMediaHandler=()=>{"auto"===this.themePreference&&(this.resolvedTheme=Be("auto"),this.syncThemeAttribute())},this.themeMediaQuery.addEventListener("change",this.themeMediaHandler))}unbindThemeMedia(){this.themeMediaQuery&&this.themeMediaHandler&&this.themeMediaQuery.removeEventListener("change",this.themeMediaHandler),this.themeMediaQuery=null,this.themeMediaHandler=null}bindPickerDismiss(){this.unbindPickerDismiss(),this.onDocPointerDown=e=>{if(!this.monthPickerOpen)return;const t=e.composedPath();if(t.includes(this)){const e=t.some(e=>e instanceof HTMLElement&&(e.classList.contains("month-picker")||e.classList.contains("range-label")||e.classList.contains("range-wrap")));if(e)return}this.monthPickerOpen=!1},document.addEventListener("pointerdown",this.onDocPointerDown,!0)}unbindPickerDismiss(){this.onDocPointerDown&&(document.removeEventListener("pointerdown",this.onDocPointerDown,!0),this.onDocPointerDown=null)}toggleMonthPicker(){this.monthPickerOpen=!this.monthPickerOpen,this.monthPickerOpen&&(this.pickerYear=this.anchorDate.getFullYear())}shiftPickerYear(e){this.pickerYear+=e}jumpToMonth(e){const t=new Date(this.anchorDate),r=t.getDate();t.setDate(1),t.setFullYear(this.pickerYear),t.setMonth(e);const i=new Date(this.pickerYear,e+1,0).getDate();t.setDate(Math.min(r,i)),this.anchorDate=t,this.monthPickerOpen=!1}monthNamesShort(){return Array.from({length:12},(e,t)=>new Date(2e3,t,1).toLocaleDateString(void 0,{month:"short"}))}rangeLabel(){if("month"===this.view)return this.anchorDate.toLocaleDateString(void 0,{month:"long",year:"numeric"});const{start:e,end:t}=this.range();if("day"===this.view)return e.toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"});const r=new Date(t);r.setDate(r.getDate()-1);const i={month:"short",day:"numeric"};return`${e.toLocaleDateString(void 0,i)} – ${r.toLocaleDateString(void 0,i)}`}clockDateLabel(){return this.nowTick,(new Date).toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}clockTimeLabel(){return this.nowTick,(new Date).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}render(){const e=this.config.title??"Calendar",t=this.entities(),r=this.filteredEvents(),i=this.weather(),a=i?.forecast?.slice(0,7)??[],n="dark"===this.resolvedTheme,s=i?Ze(i.state,n):null,o=this.hasLoadedOnce&&!this.loading&&!this.loadFailed&&0===r.length&&Boolean(this.hass)&&!this.config.show_demo_when_empty,c=this.hasLoadedOnce&&!this.loading&&this.loadFailed&&!this.formOpen,l=this.loading&&this.hasLoadedOnce,d=this.monthNamesShort();return B`
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
            `:W}

        <section class="info-bar" aria-label="Date and weather">
          <div class="clock-block">
            <div class="clock-date">${this.clockDateLabel()}</div>
            <div class="clock-time">${this.clockTimeLabel()}</div>
          </div>
          <div class="weather-now">
            ${i&&s?B`
                  <div
                    class="weather-blob"
                    style="--hac-wx-soft:${s.soft};--hac-wx-accent:${s.accent};--hac-wx-ink:${s.ink}"
                  >
                    <span class="weather-icon-halo" aria-hidden="true"
                      >${Xe(i.state)}</span
                    >
                    <span class="temp"
                      >${null!=i.temperature?`${Math.round(i.temperature)}${i.unit??"°"}`:(u=i.state,We[u]??u.replace(/-/g," "))}</span
                    >
                  </div>
                  <div class="cond">${function(e){return{sunny:"Sunny skies","clear-night":"Clear night",partlycloudy:"Partly cloudy",cloudy:"Cloudy",fog:"A bit foggy",rainy:"Rainy",pouring:"Pouring rain",hail:"Hail",snowy:"Snowy","snowy-rainy":"Wintry mix",lightning:"Stormy","lightning-rainy":"Thunderstorms",windy:"Breezy","windy-variant":"Windy",exceptional:"Weather alert"}[e]??e.replace(/-/g," ")}(i.state)}</div>
                `:B`<div class="weather-stub">
                  ${this.weatherEntityId()?"Weather unavailable":"Add weather_entity"}
                </div>`}
          </div>
          <div class="forecast-strip" aria-label="Forecast">
            ${a.length?a.map((e,t)=>{const r=new Date(e.datetime),i=Ze(e.condition,n);return B`
                    <div
                      class="forecast-day"
                      style="--hac-wx-day-soft:${i.soft};--hac-wx-day-ink:${i.ink};animation-delay:${40*t}ms"
                    >
                      <span class="d"
                        >${r.toLocaleDateString(void 0,{weekday:"short"})}</span
                      >
                      <span class="g" aria-hidden="true"
                        >${Xe(e.condition)}</span
                      >
                      <span class="t"
                        >${null!=e.temperature?`${Math.round(e.temperature)}°`:"—"}</span
                      >
                    </div>
                  `}):W}
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
                  @click=${()=>this.toggleCalendarFilter(e)}
                >
                  <span
                    class="dot"
                    style="background:${this.calendarColor(e)}"
                  ></span>
                  ${this.calendarLabel(e)}
                </button>
              `})}
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
                  `:W}
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
              aria-label="Theme: ${Ye(this.themePreference)}. Click to cycle light, dark, auto."
              title="Theme: ${Ye(this.themePreference)}"
              @click=${()=>this.cycleTheme()}
            >
              <span class="glyph" aria-hidden="true"
                >${h=this.themePreference,"light"===h?"☀":"dark"===h?"☾":"◐"}</span
              >
              ${Ye(this.themePreference)}
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
              `:W}
          ${l?B`<div class="loading-veil"></div>`:W}
          ${c?B`
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
              `:W}
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
              `:W}

          ${"month"===this.view?B`
                <hac-month-grid
                  ?data-fill=${this.hasAttribute("data-layout")}
                  .anchorDate=${this.anchorDate}
                  .events=${r}
                  .calendars=${t}
                  .calendarColors=${this.calendarColors}
                  .weather=${i}
                  @event-select=${e=>this.openEdit(e.detail)}
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
                  @slot-create=${e=>this.openCreate(e.detail)}
                ></hac-time-grid>
              `}

          ${this.formOpen?B`
                <hac-event-form
                  .calendars=${this.formCalendars()}
                  .calendarColors=${this.calendarColors}
                  .event=${this.editing}
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
              `:W}
        </div>

        <div class="status" data-kind=${this.statusKind}>
          ${this.loading?B`<span class="spinner" aria-hidden="true"></span>`:W}
          <span>${this.status}</span>
          ${"error"!==this.statusKind||c?W:B`<button
                class="ghost-btn"
                type="button"
                style="min-height:1.75rem;padding:0.2rem 0.6rem;font-size:0.78rem"
                @click=${()=>{this.refreshEvents()}}
              >
                Retry
              </button>`}
        </div>
      </div>
    `;var h,u}};ft.styles=[Pe,s`
      :host {
        position: relative;
      }
    `],e([ue({attribute:!1})],ft.prototype,"hass",void 0),e([pe()],ft.prototype,"config",void 0),e([pe()],ft.prototype,"view",void 0),e([pe()],ft.prototype,"anchorDate",void 0),e([pe()],ft.prototype,"events",void 0),e([pe()],ft.prototype,"formOpen",void 0),e([pe()],ft.prototype,"editing",void 0),e([pe()],ft.prototype,"formDefaults",void 0),e([pe()],ft.prototype,"formBusy",void 0),e([pe()],ft.prototype,"formError",void 0),e([pe()],ft.prototype,"status",void 0),e([pe()],ft.prototype,"statusKind",void 0),e([pe()],ft.prototype,"loading",void 0),e([pe()],ft.prototype,"loadFailed",void 0),e([pe()],ft.prototype,"pendingDuplicate",void 0),e([pe()],ft.prototype,"loadGeneration",void 0),e([pe()],ft.prototype,"hasLoadedOnce",void 0),e([pe()],ft.prototype,"formReminder",void 0),e([pe()],ft.prototype,"hiddenCalendars",void 0),e([pe()],ft.prototype,"nowTick",void 0),e([pe()],ft.prototype,"weatherForecast",void 0),e([pe()],ft.prototype,"calendarColors",void 0),e([pe()],ft.prototype,"themePreference",void 0),e([pe()],ft.prototype,"resolvedTheme",void 0),e([pe()],ft.prototype,"monthPickerOpen",void 0),e([pe()],ft.prototype,"pickerYear",void 0),ft=e([le(fe)],ft),window.customCards=window.customCards||[],window.customCards.push({type:fe,name:"HA Calendar Card",description:"Skylight-style month/week/day calendar with create/edit and safe calendar moves",preview:!0}),console.info(`%c HA-CALENDAR-CARD %c ${me} `,"background:#3d9b8f;color:#fff;padding:2px 4px;border-radius:4px 0 0 4px","background:#2c3340;color:#fff;padding:2px 4px;border-radius:0 4px 4px 0");export{ft as HaCalendarCard};
//# sourceMappingURL=ha-calendar-card.js.map
