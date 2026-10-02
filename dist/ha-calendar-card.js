function e(e,t,i,r){var a,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(s=(n<3?a(s):n>3?a(t,i,s):a(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new n(i,e,r)},o=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,p=globalThis,f=p.trustedTypes,g=f?f.emptyScript:"",v=p.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},w=(e,t)=>!d(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&l(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:a}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const n=r?.call(this);a?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),a=t.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=r;const n=a.fromAttribute(t,e.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,i,r=!1,a){if(void 0!==e){const n=this.constructor;if(!1===r&&(a=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??w)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:a},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==a||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[y("elementProperties")]=new Map,_[y("finalized")]=new Map,v?.({ReactiveElement:_}),(p.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=e=>e,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+D,M=`<${C}>`,T=document,O=()=>T.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,H=Array.isArray,R="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,L=/>/g,U=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,B=/"/g,j=/^(?:script|style|textarea|title)$/i,F=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),K=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Y=new WeakMap,V=T.createTreeWalker(T,129);function q(e,t){if(!H(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,r=[];let a,n=2===t?"<svg>":3===t?"<math>":"",s=z;for(let t=0;t<i;t++){const i=e[t];let o,d,l=-1,c=0;for(;c<i.length&&(s.lastIndex=c,d=s.exec(i),null!==d);)c=s.lastIndex,s===z?"!--"===d[1]?s=P:void 0!==d[1]?s=L:void 0!==d[2]?(j.test(d[2])&&(a=RegExp("</"+d[2],"g")),s=U):void 0!==d[3]&&(s=U):s===U?">"===d[0]?(s=a??z,l=-1):void 0===d[1]?l=-2:(l=s.lastIndex-d[2].length,o=d[1],s=void 0===d[3]?U:'"'===d[3]?B:I):s===B||s===I?s=U:s===P||s===L?s=z:(s=U,a=void 0);const h=s===U&&e[t+1].startsWith("/>")?" ":"";n+=s===z?i+M:l>=0?(r.push(o),i.slice(0,l)+A+i.slice(l)+D+h):i+D+(-2===l?t:h)}return[q(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class J{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let a=0,n=0;const s=e.length-1,o=this.parts,[d,l]=G(e,t);if(this.el=J.createElement(d,i),V.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=V.nextNode())&&o.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(A)){const t=l[n++],i=r.getAttribute(e).split(D),s=/([.?@])?(.*)/.exec(t);o.push({type:1,index:a,name:s[2],strings:i,ctor:"."===s[1]?te:"?"===s[1]?ie:"@"===s[1]?re:ee}),r.removeAttribute(e)}else e.startsWith(D)&&(o.push({type:6,index:a}),r.removeAttribute(e));if(j.test(r.tagName)){const e=r.textContent.split(D),t=e.length-1;if(t>0){r.textContent=E?E.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],O()),V.nextNode(),o.push({type:2,index:++a});r.append(e[t],O())}}}else if(8===r.nodeType)if(r.data===C)o.push({type:2,index:a});else{let e=-1;for(;-1!==(e=r.data.indexOf(D,e+1));)o.push({type:7,index:a}),e+=D.length-1}a++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,r){if(t===K)return t;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const n=N(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(e),a._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(t=Z(e,a._$AS(e,t.values),a,r)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??T).importNode(t,!0);V.currentNode=r;let a=V.nextNode(),n=0,s=0,o=i[0];for(;void 0!==o;){if(n===o.index){let t;2===o.type?t=new X(a,a.nextSibling,this,e):1===o.type?t=new o.ctor(a,o.name,o.strings,this,e):6===o.type&&(t=new ae(a,this,e)),this._$AV.push(t),o=i[++s]}n!==o?.index&&(a=V.nextNode(),n++)}return V.currentNode=T,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),N(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>H(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new Q(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new J(e)),t}k(e){H(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const a of e)r===t.length?t.push(i=new X(this.O(O()),this.O(O()),this,this.options)):i=t[r],i._$AI(a),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,a){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,r){const a=this.strings;let n=!1;if(void 0===a)e=Z(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==K,n&&(this._$AH=e);else{const r=e;let s,o;for(e=a[0],s=0;s<a.length-1;s++)o=Z(this,r[i+s],t,s),o===K&&(o=this._$AH[s]),n||=!N(o)||o!==this._$AH[s],o===W?e=W:e!==W&&(e+=(o??"")+a[s+1]),this._$AH[s]=o}n&&!r&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class re extends ee{constructor(e,t,i,r,a){super(e,t,i,r,a),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??W)===K)return;const i=this._$AH,r=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==W&&(i===W||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=x.litHtmlPolyfillSupport;ne?.(J,X),(x.litHtmlVersions??=[]).push("3.3.3");const se=globalThis;class oe extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let a=r._$litPart$;if(void 0===a){const e=i?.renderBefore??null;r._$litPart$=a=new X(t.insertBefore(O(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}oe._$litElement$=!0,oe.finalized=!0,se.litElementHydrateSupport?.({LitElement:oe});const de=se.litElementPolyfillSupport;de?.({LitElement:oe}),(se.litElementVersions??=[]).push("4.2.2");const le=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ce={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},he=(e=ce,t,i)=>{const{kind:r,metadata:a}=i;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,a,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const a=this[r];t.call(this,i),this.requestUpdate(r,a,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function ue(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function me(e){return ue({...e,state:!0,attribute:!1})}const pe="0.6.0",fe="ha-calendar-card",ge=56,ve=["calendar.family","calendar.personal","calendar.work"],ye=["#E07A5F","#3D9B8F","#81B29A","#5B8DB8","#E9B44C"];function be(e){if(e)return"string"==typeof e?e:"dateTime"in e&&e.dateTime?e.dateTime:"date"in e&&e.date?e.date:void 0}function we(e,t){const i=be(e.start),r=be(e.end);if(!i||!r)return null;const a=e.rrule??void 0;return{uid:e.uid??`${t}:${i}:${e.summary??"event"}`,summary:e.summary??"(no title)",description:e.description??void 0,location:e.location??void 0,start:i,end:r,all_day:e.all_day??(n=e.start,n&&"string"!=typeof n?Boolean(n.date&&!n.dateTime):Boolean(n&&/^\d{4}-\d{2}-\d{2}$/.test(n))),calendar:t,recurring:Boolean(a||e.recurrence_id),rrule:a,recurrence_id:e.recurrence_id??void 0};var n}function $e(e){return{summary:e.summary,description:e.description??"",location:e.location??"",dtstart:e.all_day?e.start.slice(0,10):e.start,dtend:e.all_day?e.end.slice(0,10):e.end}}class _e{constructor(e){this.hass=e}listCalendarEntities(e){return e?.length?[...e]:Object.keys(this.hass.states).filter(e=>e.startsWith("calendar.")).sort()}listWritableCalendars(e){return e.filter(e=>{const t=this.hass.states[e];if(!t)return!0;const i=t.attributes.supported_features;return"number"!=typeof i||!!(1&i)})}canDelete(e){const t=this.hass.states[e];if(!t)return!0;const i=t.attributes.supported_features;return"number"!=typeof i||!!(2&i)}async getEvents(e,t,i){const r=[],a=[];let n=!1;for(const s of e)try{const e=await this.fetchEntityEvents(s,t,i);n=!0,r.push(...e)}catch(e){a.push(s),console.warn(`[ha-calendar-card] failed to load ${s}:`,e instanceof Error?e.message:e)}return{events:r,errors:a,anySuccess:n}}async fetchEntityEvents(e,t,i){if(this.hass.callApi)try{const r=`?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(i.toISOString())}`;return(await this.hass.callApi("GET",`calendars/${e}${r}`)??[]).map(t=>we(t,e)).filter(e=>null!==e)}catch{}const r=await this.hass.callService("calendar","get_events",{entity_id:e,start_date_time:t.toISOString(),end_date_time:i.toISOString()},void 0,void 0,!0);let a;if(r&&"object"==typeof r){const e=r;a=e.response&&"object"==typeof e.response?e.response:e}return(a?.[e]?.events??[]).map(t=>we(t,e)).filter(e=>null!==e)}async createEvent(e){try{await this.hass.callWS({type:"calendar/event/create",entity_id:e.calendar,event:$e(e)})}catch(t){try{await this.hass.callService("calendar","create_event",{entity_id:e.calendar,summary:e.summary,description:e.description??"",location:e.location??"",start_date_time:e.all_day?void 0:e.start,end_date_time:e.all_day?void 0:e.end,start_date:e.all_day?e.start.slice(0,10):void 0,end_date:e.all_day?e.end.slice(0,10):void 0})}catch{throw t instanceof Error?t:new Error(String(t))}}const t=await this.findCreatedEvent(e);return{uid:t?.uid}}async findCreatedEvent(e){const t=new Date(e.start),i=new Date(e.end),r=new Date(t.getTime()-6e4),a=new Date(i.getTime()+6e4);try{const{events:i}=await this.getEvents([e.calendar],r,a);return i.find(t=>function(e,t){return e.summary===t.summary&&e.start===t.start&&e.end===t.end}(t,{summary:e.summary,start:e.all_day?e.start.slice(0,10):e.start,end:e.all_day?e.end.slice(0,10):e.end}))??i.find(i=>i.summary===e.summary&&Math.abs(new Date(i.start).getTime()-t.getTime())<12e4)??null}catch{return null}}async updateEvent(e,t,i,r){try{return void await this.hass.callWS({type:"calendar/event/update",entity_id:e,uid:t,recurrence_id:r,event:$e(i)})}catch(r){try{await this.hass.callService("calendar","update_event",{entity_id:e,uid:t,summary:i.summary,description:i.description,location:i.location,start_date_time:i.all_day?void 0:i.start,end_date_time:i.all_day?void 0:i.end})}catch{throw r instanceof Error?r:new Error(String(r))}}}async deleteEvent(e,t,i){try{return void await this.hass.callWS({type:"calendar/event/delete",entity_id:e,uid:t,recurrence_id:i})}catch(i){try{await this.hass.callService("calendar","delete_event",{entity_id:e,uid:t})}catch{throw i instanceof Error?i:new Error(String(i))}}}async moveEventToCalendar(e,t,i){if(e.recurring||e.rrule)return{status:"blocked_recurring",reason:"Moving recurring events is disabled — change calendars only for one-off events."};if(e.calendar===t)return{status:"moved",newUid:e.uid};const r={summary:i?.summary??e.summary,description:i?.description??e.description,location:i?.location??e.location,start:i?.start??e.start,end:i?.end??e.end,all_day:i?.all_day??e.all_day,calendar:t};let a;try{if(a=(await this.createEvent(r)).uid??(await this.findCreatedEvent(r))?.uid,!a)return{status:"create_failed",error:"Created on target calendar but could not confirm the new event id — source left untouched."}}catch(e){return{status:"create_failed",error:e instanceof Error?e.message:String(e)}}try{return await this.deleteEvent(e.calendar,e.uid,e.recurrence_id),{status:"moved",newUid:a}}catch(r){const n={entityId:e.calendar,uid:e.uid,summary:i?.summary??e.summary,targetCalendar:t,newUid:a};return{status:"delete_failed",newUid:a,error:r instanceof Error?r.message:String(r),duplicate:!0,pending:n}}}}const xe="ha_calendar_reminders";function ke(e){if(!e||"object"!=typeof e)return{};const t=e;return t.response&&"object"==typeof t.response?t.response:t}class Ee{constructor(e){this.hass=e}isAvailable(){const e=this.hass.services;return Boolean(e&&e[xe]?.set_reminder)}async getReminder(e,t){const i=ke(await this.hass.callService(xe,"get_reminder",{calendar_entity_id:e,event_uid:t},void 0,void 0,!0)).reminder;return i&&"object"==typeof i?i:null}async setReminder(e){return ke(await this.hass.callService(xe,"set_reminder",{calendar_entity_id:e.calendar_entity_id,event_uid:e.event_uid,event_start:e.event_start,event_summary:e.event_summary??"",minutes_before:e.minutes_before,notify_service:e.notify_service,message:e.message??"",enabled:e.enabled??!0},void 0,void 0,!0)).reminder??null}async clearReminder(e,t){const i=ke(await this.hass.callService(xe,"clear_reminder",{calendar_entity_id:e,event_uid:t},void 0,void 0,!0));return Boolean(i.cleared)}}const Se=s`
  :host {
    --hac-bg: #f7f8fa;
    --hac-surface: #ffffff;
    --hac-ink: #2c3340;
    --hac-muted: #8a93a3;
    --hac-accent: #3d9b8f;
    --hac-accent-hover: #318579;
    --hac-today: #f08a5a;
    --hac-line: #e8ebf0;
    --hac-line-strong: #d8dde6;
    --hac-danger: #c45c5c;
    --hac-warn: #9a6b1f;
    --hac-warn-bg: #fff6e8;
    --hac-radius: 0;
    --hac-font-display: "Manrope", "Avenir Next", "Segoe UI", sans-serif;
    --hac-font-body: "Nunito", "Avenir Next", "Segoe UI", sans-serif;
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
  }

  :host([data-layout="panel"]),
  :host-context(hui-panel-view) {
    height: 100%;
    min-height: calc(100vh - var(--header-height, 56px));
    min-height: calc(100dvh - var(--header-height, 56px));
    border-radius: 0;
    border: 0;
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
    background: var(--hac-surface);
  }

  .info-bar {
    display: grid;
    grid-template-columns: minmax(10rem, 1.1fr) minmax(8rem, 1fr) minmax(12rem, 1.2fr);
    gap: 0.75rem 1rem;
    align-items: center;
    padding: 0.85rem 1.15rem 0.65rem;
    border-bottom: 1px solid var(--hac-line);
    background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%);
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
    gap: 0.1rem;
    min-width: 0;
  }

  .weather-now .temp {
    font-family: var(--hac-font-display);
    font-size: clamp(1.35rem, 3vw, 1.85rem);
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  .weather-now .cond {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--hac-muted);
    text-transform: capitalize;
  }

  .weather-stub {
    font-size: 0.8rem;
    font-weight: 600;
    color: #b0b7c3;
  }

  .forecast-strip {
    display: flex;
    justify-content: flex-end;
    gap: 0.35rem;
    overflow: auto;
    min-width: 0;
  }

  .forecast-day {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
    min-width: 2.6rem;
    padding: 0.25rem 0.3rem;
    border-radius: 10px;
    background: #f4f6f8;
  }

  .forecast-day .d {
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--hac-muted);
  }

  .forecast-day .g {
    font-size: 0.85rem;
    line-height: 1;
  }

  .forecast-day .t {
    font-size: 0.72rem;
    font-weight: 700;
  }

  .title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.65rem 0.85rem;
    padding: 0.55rem 1rem 0.35rem;
    position: relative;
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
    background: #fff;
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
    background: #f3f5f7;
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

  .range-label {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--hac-ink);
    min-width: 7rem;
    text-align: center;
  }

  .view-toggle {
    display: inline-flex;
    border: 1px solid var(--hac-line-strong);
    border-radius: 999px;
    overflow: hidden;
    background: #f7f8fa;
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
    color: #fff;
  }

  .nav-btn,
  .primary-btn,
  .ghost-btn {
    font: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    border: 1px solid var(--hac-line-strong);
    background: #fff;
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

  .grid-wrap {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    background: #fff;
  }

  hac-time-grid,
  hac-month-grid {
    display: block;
    min-height: 100%;
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
    background: #fafbfc;
  }

  .status[data-kind="error"] {
    color: var(--hac-danger);
    background: #fdf4f4;
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
    color: #5c3d00;
    font-size: 0.85rem;
    animation: banner-in 200ms ease;
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
    background: #fff;
    color: #5c3d00;
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
    background: rgba(255, 255, 255, 0.88);
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
    background: linear-gradient(145deg, #fff 0%, #e8f4f2 100%);
    border: 1px solid var(--hac-line);
    box-shadow: 0 8px 20px rgba(44, 51, 64, 0.06);
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
    background: rgba(44, 51, 64, 0.2);
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
    background: rgba(255, 255, 255, 0.28);
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
      min-height: calc(100vh - var(--header-height, 56px));
      min-height: calc(100dvh - var(--header-height, 56px));
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
`,Ae=s`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 100%;
    box-sizing: border-box;
    --hac-line: #e8ebf0;
    --hac-line-strong: #d8dde6;
    --hac-muted: #8a93a3;
    --hac-ink: #2c3340;
    --hac-event: #3d9b8f;
    --hac-event-text: #fff;
    --hac-accent: #3d9b8f;
    --hac-today: #f08a5a;
    --hac-cal-0: #e07a5f;
    --hac-cal-1: #3d9b8f;
    --hac-cal-2: #81b29a;
    --hac-cal-3: #5b8db8;
    --hac-cal-4: #e9b44c;
    --hac-font-body: "Nunito", "Avenir Next", "Segoe UI", sans-serif;
    font-family: var(--hac-font-body);
    background: #fff;
  }

  .time-grid {
    display: grid;
    min-width: 100%;
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
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid var(--hac-line-strong);
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
    color: var(--hac-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .day-head .num {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--hac-ink);
    letter-spacing: 0;
    text-transform: none;
  }

  .day-head[data-today="true"] {
    background: #fff6f1;
  }

  .day-head[data-today="true"] .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    margin: 0 auto;
    border-radius: 50%;
    background: var(--hac-today);
    color: #fff;
  }

  .hours {
    display: flex;
    flex-direction: column;
    position: sticky;
    left: 0;
    z-index: 1;
    background: rgba(255, 255, 255, 0.96);
  }

  .hour-label {
    height: var(--hac-hour-height, 56px);
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--hac-muted);
    text-align: right;
    padding: 0.15rem 0.45rem 0 0;
    border-right: 1px solid var(--hac-line);
    box-sizing: border-box;
  }

  .day-col {
    position: relative;
    border-left: 1px solid var(--hac-line);
    background: #fff;
  }

  .day-col[data-today="true"] {
    background: #fffaf7;
  }

  .hour-line {
    height: var(--hac-hour-height, 56px);
    box-sizing: border-box;
    border-bottom: 1px solid var(--hac-line);
  }

  .now-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--hac-today);
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
    background: var(--hac-today);
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
    box-shadow: 0 1px 0 rgba(44, 51, 64, 0.06);
    transition: transform 140ms ease, box-shadow 140ms ease, filter 140ms ease;
    -webkit-tap-highlight-color: transparent;
  }

  .event-block:hover,
  .event-block:focus-visible {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 6px 14px rgba(44, 51, 64, 0.12);
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
`,De=s`
  :host {
    --hac-ink: #2c3340;
    --hac-muted: #8a93a3;
    --hac-accent: #3d9b8f;
    --hac-accent-hover: #318579;
    --hac-line: #e8ebf0;
    --hac-danger: #c45c5c;
    --hac-warn: #9a6b1f;
    --hac-font-display: "Manrope", "Avenir Next", "Segoe UI", sans-serif;
    --hac-font-body: "Nunito", "Avenir Next", "Segoe UI", sans-serif;
    font-family: var(--hac-font-body);
  }

  .form-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(44, 51, 64, 0.34);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 10;
    animation: fade-in 160ms ease;
    padding: 0;
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
    background: #fff;
    border-radius: 16px 16px 0 0;
    padding: 1.1rem 1.15rem 1.35rem;
    box-shadow: 0 -10px 36px rgba(44, 51, 64, 0.18);
    animation: slide-up 220ms ease;
  }

  @media (min-width: 640px) {
    .form-panel {
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(44, 51, 64, 0.18);
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
    font-family: var(--hac-font-display);
    font-size: 1.28rem;
    margin: 0 0 0.35rem;
    letter-spacing: -0.02em;
    font-weight: 800;
  }

  .form-sub {
    margin: 0 0 0.75rem;
    font-size: 0.82rem;
    color: var(--hac-muted);
  }

  label {
    display: block;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--hac-muted);
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
    border: 1px solid var(--hac-line);
    border-radius: 10px;
    background: #f7f8fa;
    color: var(--hac-ink);
    min-height: 2.5rem;
    transition: border-color 140ms ease, box-shadow 140ms ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: var(--hac-accent);
    box-shadow: 0 0 0 3px rgba(61, 155, 143, 0.15);
    background: #fff;
  }

  input:disabled,
  select:disabled,
  textarea:disabled {
    opacity: 0.65;
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
    margin-top: 1.15rem;
  }

  .form-actions button {
    font: inherit;
    font-weight: 700;
    border-radius: 999px;
    padding: 0.5rem 1rem;
    min-height: 2.4rem;
    cursor: pointer;
    border: 1px solid var(--hac-line);
    background: #fff;
    color: var(--hac-ink);
  }

  .form-actions button.primary {
    background: var(--hac-accent);
    border-color: var(--hac-accent);
    color: #fff;
  }

  .form-actions button.primary:hover:not(:disabled) {
    background: var(--hac-accent-hover);
  }

  .form-actions button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .hint {
    font-size: 0.78rem;
    color: var(--hac-muted);
    margin: 0.65rem 0 0;
    line-height: 1.35;
  }

  .hint.warn {
    color: var(--hac-warn);
  }

  .hint.error {
    color: var(--hac-danger);
    background: #fdf4f4;
    border: 1px solid rgba(196, 92, 92, 0.2);
    border-radius: 10px;
    padding: 0.55rem 0.7rem;
  }

  .reminder-block {
    margin-top: 1rem;
    padding: 0.75rem 0.8rem;
    border: 1px solid var(--hac-line);
    border-radius: 12px;
    background: #f7f8fa;
  }

  .reminder-block h3 {
    font-family: var(--hac-font-display);
    font-size: 1rem;
    margin: 0 0 0.25rem;
    font-weight: 800;
  }

  .reminder-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.55rem 0 0.25rem;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--hac-ink);
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
`,Ce={"clear-night":"Clear",cloudy:"Cloudy",fog:"Fog",hail:"Hail",lightning:"Storms","lightning-rainy":"Storms",partlycloudy:"Partly cloudy",pouring:"Downpour",rainy:"Rain",snowy:"Snow","snowy-rainy":"Sleet",sunny:"Sunny",windy:"Windy","windy-variant":"Windy",exceptional:"Alert"};function Me(e){return e.includes("lightning")?"⚡":e.includes("snow")?"❄":e.includes("rain")||"pouring"===e||"hail"===e?"🌧":"fog"===e?"fog":"cloudy"===e?"☁":"partlycloudy"===e?"⛅":"clear-night"===e?"☾":"sunny"===e?"☀":e.includes("wind")?"🌬":"·"}function Te(e,t){if(!e||!t)return null;const i=e.states[t];if(!i)return null;const r=i.attributes??{},a=function(e){if(!Array.isArray(e))return[];const t=[];for(const i of e){if(!i||"object"!=typeof i)continue;const e=i,r=String(e.datetime??e.date??""),a=String(e.condition??e.state??"");r&&a&&t.push({datetime:r,condition:a,temperature:"number"==typeof e.temperature?e.temperature:void 0,templow:"number"==typeof e.templow?e.templow:void 0})}return t}(r.forecast??r.forecast_daily??r.forecast_twice_daily);return{entityId:t,state:i.state,temperature:"number"==typeof r.temperature?r.temperature:void 0,unit:"string"==typeof r.temperature_unit?r.temperature_unit:"string"==typeof r.unit_of_measurement?r.unit_of_measurement:"°",humidity:"number"==typeof r.humidity?r.humidity:void 0,forecast:a}}function Oe(e,t){const i=new Date(e);return i.setDate(i.getDate()+t),i}function Ne(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function He(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,i,r]=e.split("-").map(Number);return new Date(t,i-1,r)}return new Date(e)}let Re=class extends oe{constructor(){super(...arguments),this.mode="week",this.anchorDate=new Date,this.events=[],this.calendars=[],this.dayStartHour=6,this.dayEndHour=22,this.nowTick=0}get days(){const e=function(e){const t=new Date(e);return t.setHours(0,0,0,0),t}(this.anchorDate);if("day"===this.mode)return[e];const t=(e.getDay()+6)%7,i=Oe(e,-t);return Array.from({length:7},(e,t)=>Oe(i,t))}get hours(){const e=[];for(let t=this.dayStartHour;t<this.dayEndHour;t++)e.push(t);return e}calendarColor(e){const t=Math.max(0,this.calendars.indexOf(e));return ye[t%ye.length]}eventStyle(e,t){const i=He(e.start),r=He(e.end),a=new Date(t);a.setHours(this.dayStartHour,0,0,0);const n=new Date(t);if(n.setHours(this.dayEndHour,0,0,0),r<=a||i>=n)return null;const s=i<a?a:i,o=r>n?n:r,d=60*(s.getHours()-this.dayStartHour)+s.getMinutes(),l=Math.max(22,(o.getTime()-s.getTime())/6e4);return`top:${d/60*ge}px;height:${l/60*ge}px;background:${this.calendarColor(e.calendar)};`}nowLineTop(e){this.nowTick;const t=new Date;if(!Ne(t,e))return null;if(t.getHours()<this.dayStartHour||t.getHours()>=this.dayEndHour)return null;return(60*(t.getHours()-this.dayStartHour)+t.getMinutes())/60*ge}formatTime(e){return e.all_day||/^\d{4}-\d{2}-\d{2}$/.test(e.start)?"All day":He(e.start).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}onEventClick(e){this.dispatchEvent(new CustomEvent("event-select",{detail:e,bubbles:!0,composed:!0}))}onSlotCreate(e,t){const i=new Date(e);i.setHours(t,0,0,0);const r=new Date(i);r.setHours(t+1,0,0,0),this.dispatchEvent(new CustomEvent("slot-create",{detail:{start:i,end:r},bubbles:!0,composed:!0}))}hourFromPointer(e,t){const i=t.getBoundingClientRect(),r=e.clientY-i.top;return this.dayStartHour+Math.floor(r/ge)}render(){const e=this.hours,t=this.days,i=e.length*ge,r=new Date;return F`
      <div
        class="time-grid"
        data-mode=${"month"===this.mode?"week":this.mode}
        style="--hac-hour-height:${ge}px"
      >
        <div class="corner"></div>
        ${t.map(e=>{const t=Ne(e,r);return F`
            <div class="day-head" data-today=${t?"true":"false"}>
              <span
                >${e.toLocaleDateString(void 0,{weekday:"short"})}</span
              >
              <span class="num">${e.getDate()}</span>
            </div>
          `})}

        <div class="hours" style="height:${i}px">
          ${e.map(e=>F`<div class="hour-label">
                ${String(e).padStart(2,"0")}:00
              </div>`)}
        </div>

        ${t.map(t=>{const a=Ne(t,r),n=this.nowLineTop(t);return F`
            <div
              class="day-col"
              data-today=${a?"true":"false"}
              style="height:${i}px"
              @dblclick=${e=>{const i=this.hourFromPointer(e,e.currentTarget);this.onSlotCreate(t,i)}}
            >
              ${e.map(()=>F`<div class="hour-line"></div>`)}
              ${null!==n?F`<div class="now-line" style="top:${n}px"></div>`:W}
              ${this.events.map(e=>{const i=this.eventStyle(e,t);if(!i)return W;const r=e.calendar.replace(/^calendar\./,"");return F`
                  <div
                    class="event-block"
                    style=${i}
                    role="button"
                    tabindex="0"
                    @click=${t=>{t.stopPropagation(),this.onEventClick(e)}}
                    @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.onEventClick(e))}}
                  >
                    <strong>${e.summary}</strong>
                    <span class="time-tag">${this.formatTime(e)}</span>
                    <span class="cal-tag">${r}</span>
                  </div>
                `})}
            </div>
          `})}
      </div>
    `}};function ze(e){const t=new Date(e);return t.setHours(0,0,0,0),t}function Pe(e,t){const i=new Date(e);return i.setDate(i.getDate()+t),i}function Le(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,i,r]=e.split("-").map(Number);return new Date(t,i-1,r)}return new Date(e)}Re.styles=Ae,e([ue({attribute:!1})],Re.prototype,"mode",void 0),e([ue({attribute:!1})],Re.prototype,"anchorDate",void 0),e([ue({attribute:!1})],Re.prototype,"events",void 0),e([ue({attribute:!1})],Re.prototype,"calendars",void 0),e([ue({type:Number})],Re.prototype,"dayStartHour",void 0),e([ue({type:Number})],Re.prototype,"dayEndHour",void 0),e([ue({type:Number})],Re.prototype,"nowTick",void 0),Re=e([le("hac-time-grid")],Re);let Ue=class extends oe{constructor(){super(...arguments),this.anchorDate=new Date,this.events=[],this.calendars=[],this.weather=null,this.maxVisible=3}get monthStart(){const e=ze(this.anchorDate);return e.setDate(1),e}get cells(){const e=this.monthStart,t=(e.getDay()+6)%7,i=Pe(e,-t);return Array.from({length:42},(e,t)=>Pe(i,t))}calendarColor(e){const t=Math.max(0,this.calendars.indexOf(e));return ye[t%ye.length]}eventsForDay(e){return this.events.filter(t=>{const i=Le(t.start),r=Le(t.end),a=ze(e);return i<Pe(a,1)&&r>a}).sort((e,t)=>Le(e.start).getTime()-Le(t.start).getTime())}onEventClick(e,t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("event-select",{detail:e,bubbles:!0,composed:!0}))}onDayCreate(e){const t=new Date(e);t.setHours(9,0,0,0);const i=new Date(t);i.setHours(10,0,0,0),this.dispatchEvent(new CustomEvent("slot-create",{detail:{start:t,end:i},bubbles:!0,composed:!0}))}render(){const e=new Date,t=this.monthStart.getMonth();return F`
      <div class="month">
        <div class="dow">
          ${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(e=>F`<span>${e}</span>`)}
        </div>
        <div class="cells">
          ${this.cells.map(i=>{const r=i.getMonth()!==t,a=function(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}(i,e),n=this.eventsForDay(i),s=n.slice(0,this.maxVisible),o=n.length-s.length,d=function(e,t){if(!e?.forecast?.length)return null;const i=[t.getFullYear(),String(t.getMonth()+1).padStart(2,"0"),String(t.getDate()).padStart(2,"0")].join("-");return e.forecast.find(e=>e.datetime.slice(0,10)===i)??null}(this.weather,i);return F`
              <div
                class="cell"
                data-outside=${r?"true":"false"}
                data-today=${a?"true":"false"}
                @dblclick=${()=>this.onDayCreate(i)}
              >
                <div class="cell-top">
                  <span class="num">${i.getDate()}</span>
                  ${d?F`<span class="wx"
                        >${Me(d.condition)}${null!=d.temperature?` ${Math.round(d.temperature)}°`:""}</span
                      >`:W}
                </div>
                <div class="events">
                  ${s.map(e=>F`
                      <button
                        type="button"
                        class="chip"
                        style="background:${this.calendarColor(e.calendar)}"
                        title=${e.summary}
                        @click=${t=>this.onEventClick(e,t)}
                      >
                        <span class="t">${function(e){return e.all_day||/^\d{4}-\d{2}-\d{2}$/.test(e.start)?"All day":Le(e.start).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}(e)}</span>${e.summary}
                      </button>
                    `)}
                  ${o>0?F`<div class="more">+${o} more</div>`:W}
                  ${r||0!==n.length?W:F`<div class="empty">No events</div>`}
                </div>
              </div>
            `})}
        </div>
      </div>
    `}};Ue.styles=s`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 100%;
      box-sizing: border-box;
      --hac-ink: #2c3340;
      --hac-muted: #8a93a3;
      --hac-line: #e8ebf0;
      --hac-today: #f08a5a;
      --hac-font-body: "Nunito", "Avenir Next", "Segoe UI", sans-serif;
      font-family: var(--hac-font-body);
      color: var(--hac-ink);
      background: #fff;
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
      border-bottom: 1px solid var(--hac-line);
      background: #fafbfc;
    }

    .dow span {
      text-align: center;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--hac-muted);
      padding: 0.55rem 0.25rem;
    }

    .cells {
      flex: 1 1 auto;
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      grid-auto-rows: minmax(5.5rem, 1fr);
      min-height: 0;
    }

    .cell {
      border-right: 1px solid var(--hac-line);
      border-bottom: 1px solid var(--hac-line);
      padding: 0.35rem 0.35rem 0.4rem;
      min-height: 0;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      background: #fff;
      cursor: pointer;
      transition: background 140ms ease;
    }

    .cell:nth-child(7n) {
      border-right: 0;
    }

    .cell:hover {
      background: #f7fafc;
    }

    .cell[data-outside="true"] {
      background: #fbfcfd;
      color: #b0b7c3;
    }

    .cell[data-today="true"] {
      background: #fffaf7;
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
      background: var(--hac-today);
      color: #fff;
    }

    .wx {
      font-size: 0.68rem;
      color: var(--hac-muted);
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

    .more {
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--hac-muted);
      padding: 0.05rem 0.2rem;
    }

    .empty {
      font-size: 0.65rem;
      font-weight: 600;
      color: #c2c8d2;
      padding: 0.1rem 0.15rem;
    }

    @media (max-width: 720px) {
      .cells {
        grid-auto-rows: minmax(4.75rem, 1fr);
      }

      .chip {
        font-size: 0.62rem;
        padding: 0.1rem 0.28rem;
      }

      .empty {
        display: none;
      }
    }
  `,e([ue({attribute:!1})],Ue.prototype,"anchorDate",void 0),e([ue({attribute:!1})],Ue.prototype,"events",void 0),e([ue({attribute:!1})],Ue.prototype,"calendars",void 0),e([ue({attribute:!1})],Ue.prototype,"weather",void 0),e([ue({type:Number})],Ue.prototype,"maxVisible",void 0),Ue=e([le("hac-month-grid")],Ue);let Ie=class extends oe{constructor(){super(...arguments),this.calendars=[],this.event=null,this.defaults={},this.busy=!1,this.errorMessage="",this.remindersAvailable=!1,this.reminderDefaults={},this.reminder=null,this.summary="",this.description="",this.location="",this.start="",this.end="",this.calendar="",this.moveNote="",this.reminderEnabled=!1,this.reminderMinutes=30,this.reminderNotify="notify.mobile_app_phone",this.reminderMessage="",this.hydrateKey=""}connectedCallback(){super.connectedCallback(),this.hydrateEventFields(!0),this.applyReminderFields(!0)}updated(e){e.has("event")||e.has("defaults")?(this.hydrateEventFields(),this.applyReminderFields(!0)):(e.has("reminder")||e.has("reminderDefaults"))&&this.applyReminderFields(!1)}eventKey(){return this.event?`edit:${this.event.calendar}:${this.event.uid}`:`create:${this.defaults.start??""}:${this.defaults.end??""}:${this.defaults.calendar??""}`}hydrateEventFields(e=!1){const t=this.eventKey();(e||t!==this.hydrateKey)&&(this.hydrateKey=t,this.event?(this.summary=this.event.summary,this.description=this.event.description??"",this.location=this.event.location??"",this.start=this.toLocalInput(this.event.start),this.end=this.toLocalInput(this.event.end),this.calendar=this.event.calendar):(this.summary="",this.description="",this.location="",this.start=this.toLocalInput(this.defaults.start??(new Date).toISOString()),this.end=this.toLocalInput(this.defaults.end??new Date(Date.now()+36e5).toISOString()),this.calendar=this.defaults.calendar??this.calendars[0]??""),this.moveNote="")}applyReminderFields(e){if(this.reminder)return this.reminderEnabled=Boolean(this.reminder.enabled),this.reminderMinutes=this.reminder.minutes_before,this.reminderNotify=this.reminder.notify_service,void(this.reminderMessage=this.reminder.message??"");e&&(this.reminderEnabled=!1,this.reminderMinutes=this.reminderDefaults.minutes_before??30,this.reminderNotify=this.reminderDefaults.notify_service||"notify.mobile_app_phone",this.reminderMessage="")}get calendarOptions(){const e=new Set,t=[],i=i=>{i&&!e.has(i)&&(e.add(i),t.push(i))};this.event?.calendar&&i(this.event.calendar),this.calendar&&i(this.calendar);for(const e of this.calendars)i(e);return t}toLocalInput(e){const t=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T09:00:00`):new Date(e);if(Number.isNaN(t.getTime()))return"";const i=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${i(t.getMonth()+1)}-${i(t.getDate())}T${i(t.getHours())}:${i(t.getMinutes())}`}fromLocalInput(e){return new Date(e).toISOString()}get isRecurring(){return Boolean(this.event?.recurring||this.event?.rrule)}get isCrossCalendarMove(){return Boolean(this.event&&this.calendar&&this.calendar!==this.event.calendar)}get calendarMoveBlocked(){return this.isRecurring&&this.isCrossCalendarMove}onCalendarChange(e){const t=e.target.value;this.calendar=t,this.event&&t!==this.event.calendar?this.isRecurring?this.moveNote="Recurring events cannot change calendars yet. Keep the original calendar or recreate as a one-off.":this.moveNote="Home Assistant cannot move events across calendars — Save will create on the new calendar, then delete from the old one.":this.moveNote=""}close(){this.busy||this.dispatchEvent(new CustomEvent("form-cancel",{bubbles:!0,composed:!0}))}save(){if(this.busy)return;if(!(this.summary.trim()&&this.start&&this.end&&this.calendar))return;if(this.calendarMoveBlocked)return;const e={summary:this.summary.trim(),description:this.description.trim()||void 0,location:this.location.trim()||void 0,start:this.fromLocalInput(this.start),end:this.fromLocalInput(this.end),calendar:this.calendar},t=this.isCrossCalendarMove,i={mode:this.event?"edit":"create",input:e,original:this.event??void 0,crossCalendarMove:t,reminder:this.remindersAvailable?{enabled:this.reminderEnabled,minutes_before:this.reminderMinutes,notify_service:this.reminderNotify.trim(),message:this.reminderMessage.trim()}:void 0};this.dispatchEvent(new CustomEvent("form-save",{detail:i,bubbles:!0,composed:!0}))}render(){const e=this.event?"Edit event":"New event",t=this.calendarOptions;return F`
      <div class="form-backdrop" @click=${this.close}>
        <div
          class="form-panel"
          @click=${e=>e.stopPropagation()}
          role="dialog"
          aria-label=${e}
        >
          <h2>${e}</h2>
          <p class="form-sub">
            ${this.event?"Edit details, change calendar (create+delete move), or reminder.":"Add a one-off event to a configured calendar."}
          </p>

          <label for="summary">Title</label>
          <input
            id="summary"
            .value=${this.summary}
            ?disabled=${this.busy}
            @input=${e=>{this.summary=e.target.value}}
          />

          <label for="calendar">Calendar</label>
          <select
            id="calendar"
            ?disabled=${this.busy||0===t.length}
            @change=${this.onCalendarChange}
          >
            ${t.map(e=>F`
                <option value=${e} ?selected=${e===this.calendar}>
                  ${e}
                </option>
              `)}
          </select>
          ${this.event?F`<p class="hint">
                Changing calendar moves the event to any other configured
                writable calendar via create-on-new, then delete-from-old (HA
                cannot move across calendars in place).
              </p>`:W}

          <div class="row-2">
            <div>
              <label for="start">Start</label>
              <input
                id="start"
                type="datetime-local"
                .value=${this.start}
                ?disabled=${this.busy}
                @input=${e=>{this.start=e.target.value}}
              />
            </div>
            <div>
              <label for="end">End</label>
              <input
                id="end"
                type="datetime-local"
                .value=${this.end}
                ?disabled=${this.busy}
                @input=${e=>{this.end=e.target.value}}
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

          ${this.remindersAvailable?F`
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

          ${this.isRecurring?F`<p class="hint warn">
                This is a recurring event. Same-calendar edits are sent to HA;
                changing calendars is blocked until recurring moves are designed.
              </p>`:null}
          ${this.moveNote?F`<p class="hint ${this.calendarMoveBlocked?"warn":""}">
                ${this.moveNote}
              </p>`:null}
          ${this.errorMessage?F`<p class="hint error" role="alert">${this.errorMessage}</p>`:null}

          <div class="form-actions">
            <button type="button" ?disabled=${this.busy} @click=${this.close}>
              Cancel
            </button>
            <button
              type="button"
              class="primary"
              ?disabled=${this.busy||this.calendarMoveBlocked}
              @click=${this.save}
            >
              ${this.busy?"Saving…":this.isCrossCalendarMove?"Move & save":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}};Ie.styles=De,e([ue({attribute:!1})],Ie.prototype,"calendars",void 0),e([ue({attribute:!1})],Ie.prototype,"event",void 0),e([ue({attribute:!1})],Ie.prototype,"defaults",void 0),e([ue({type:Boolean})],Ie.prototype,"busy",void 0),e([ue({type:String})],Ie.prototype,"errorMessage",void 0),e([ue({type:Boolean})],Ie.prototype,"remindersAvailable",void 0),e([ue({attribute:!1})],Ie.prototype,"reminderDefaults",void 0),e([ue({attribute:!1})],Ie.prototype,"reminder",void 0),e([me()],Ie.prototype,"summary",void 0),e([me()],Ie.prototype,"description",void 0),e([me()],Ie.prototype,"location",void 0),e([me()],Ie.prototype,"start",void 0),e([me()],Ie.prototype,"end",void 0),e([me()],Ie.prototype,"calendar",void 0),e([me()],Ie.prototype,"moveNote",void 0),e([me()],Ie.prototype,"reminderEnabled",void 0),e([me()],Ie.prototype,"reminderMinutes",void 0),e([me()],Ie.prototype,"reminderNotify",void 0),e([me()],Ie.prototype,"reminderMessage",void 0),e([me()],Ie.prototype,"hydrateKey",void 0),Ie=e([le("hac-event-form")],Ie);let Be=class extends oe{constructor(){super(...arguments),this.config={type:`custom:${fe}`},this.view="month",this.anchorDate=new Date,this.events=[],this.formOpen=!1,this.editing=null,this.formDefaults={},this.formBusy=!1,this.formError="",this.status=`HA Calendar Card v${pe}`,this.statusKind="info",this.loading=!1,this.loadFailed=!1,this.pendingDuplicate=null,this.loadGeneration=0,this.hasLoadedOnce=!1,this.formReminder=null,this.hiddenCalendars=[],this.nowTick=Date.now(),this.pollTimer=null,this.clockTimer=null,this.hadHass=!1}setConfig(e){if(!e)throw new Error("Invalid configuration");this.config={title:"Calendar",entities:[...ve],initial_view:"month",day_start_hour:6,day_end_hour:22,show_demo_when_empty:!1,...e,type:e.type??`custom:${fe}`},this.view=this.config.initial_view??"month"}static getStubConfig(){return{title:"Calendar",entities:[...ve],initial_view:"month"}}getCardSize(){return 10}connectedCallback(){super.connectedCallback(),this.ensureFonts(),this.startTimers()}disconnectedCallback(){super.disconnectedCallback(),this.clearTimers()}ensureFonts(){const e="ha-calendar-card-fonts";if(document.getElementById(e))return;const t=document.createElement("link");t.id=e,t.rel="stylesheet",t.href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Nunito:wght@500;600;700;800&display=swap",document.head.appendChild(t)}startTimers(){this.clearTimers(),this.clockTimer=window.setInterval(()=>{this.nowTick=Date.now()},3e4),this.pollTimer=window.setInterval(()=>{this.refreshEvents({silent:!0})},6e4)}clearTimers(){null!=this.clockTimer&&(window.clearInterval(this.clockTimer),this.clockTimer=null),null!=this.pollTimer&&(window.clearInterval(this.pollTimer),this.pollTimer=null)}updated(e){if(e.has("config")||e.has("anchorDate")||e.has("view"))this.refreshEvents();else if(e.has("hass")){const e=Boolean(this.hass);e&&!this.hadHass?(this.hadHass=!0,this.refreshEvents()):e||(this.hadHass=!1)}}entities(){return this.config.entities?.length?[...this.config.entities]:[...ve]}formCalendars(){const e=this.entities(),t=this.hass?new _e(this.hass).listWritableCalendars(e):e,i=this.editing?.calendar;return i&&!t.includes(i)?[i,...t]:t}calendarColor(e){const t=Math.max(0,this.entities().indexOf(e));return ye[t%ye.length]}calendarLabel(e){return e.replace(/^calendar\./,"").replace(/_/g," ")}filteredEvents(){if(!this.hiddenCalendars.length)return this.events;const e=new Set(this.hiddenCalendars);return this.events.filter(t=>!e.has(t.calendar))}toggleCalendarFilter(e){this.hiddenCalendars.includes(e)?this.hiddenCalendars=this.hiddenCalendars.filter(t=>t!==e):this.hiddenCalendars=[...this.hiddenCalendars,e]}range(){const e=new Date(this.anchorDate);if(e.setHours(0,0,0,0),"day"===this.view){const t=new Date(e);return t.setDate(t.getDate()+1),{start:e,end:t}}if("month"===this.view){const t=new Date(e.getFullYear(),e.getMonth(),1),i=(t.getDay()+6)%7;t.setDate(t.getDate()-i);const r=new Date(t);return r.setDate(r.getDate()+42),{start:t,end:r}}const t=(e.getDay()+6)%7;e.setDate(e.getDate()-t);const i=new Date(e);return i.setDate(i.getDate()+7),{start:e,end:i}}async refreshEvents(e){const t=++this.loadGeneration,i=Boolean(e?.silent)&&this.hasLoadedOnce;if(!this.hass)return this.events=this.demoEvents(),this.loadFailed=!1,this.hasLoadedOnce=!0,this.loading=!1,this.status="Preview mode — demo events (no hass)",void(this.statusKind="info");i||(this.loading=!0);const r=new _e(this.hass),{start:a,end:n}=this.range(),s=this.entities();try{const e=await r.getEvents(s,a,n);if(t!==this.loadGeneration)return;if(this.loadFailed=!1,this.hasLoadedOnce=!0,e.events.length){this.events=e.events;const t=e.errors.length?` · ${e.errors.length} calendar(s) failed`:"";this.status=`${e.events.length} event(s)${t}`,this.statusKind=e.errors.length?"warn":"info"}else e.anySuccess?(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.status=this.config.show_demo_when_empty?"No events — showing demo blocks":"No events in this range",this.statusKind="info"):(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.loadFailed=!this.config.show_demo_when_empty,this.status=e.errors.length?`Could not load: ${e.errors.join(", ")} — check entity ids`:"No calendars loaded",this.statusKind="error")}catch(e){if(t!==this.loadGeneration)return;this.events=[],this.loadFailed=!0,this.hasLoadedOnce=!0,this.status=`Load failed: ${e instanceof Error?e.message:String(e)}`,this.statusKind="error"}finally{t===this.loadGeneration&&(this.loading=!1)}}demoEvents(){const e=new Date(this.anchorDate);e.setHours(0,0,0,0);const t=(t,i,r,a,n)=>{const s=new Date(e);s.setDate(s.getDate()+t),s.setHours(i,0,0,0);const o=new Date(s);return o.setHours(i+r,0,0,0),{uid:`demo-${a}-${t}-${i}`,summary:a,start:s.toISOString(),end:o.toISOString(),calendar:n}},i=this.entities();return[t(0,9,1,"Morning standup",i[0]??"calendar.family"),t(0,11,2,"Deep work",i[1]??"calendar.personal"),t(1,14,1,"School pickup",i[0]??"calendar.family"),t(2,10,1,"Dentist",i[2]??"calendar.work"),t(4,16,2,"Soccer practice",i[0]??"calendar.family"),t(5,12,1,"Lunch with Sam",i[1]??"calendar.personal")]}shift(e){const t=new Date(this.anchorDate);"month"===this.view?t.setMonth(t.getMonth()+e):"day"===this.view?t.setDate(t.getDate()+e):t.setDate(t.getDate()+7*e),this.anchorDate=t}remindersAvailable(){return Boolean(this.hass&&new Ee(this.hass).isAvailable())}reminderDefaults(){return{minutes_before:this.config.reminder_minutes_before??30,notify_service:this.config.reminder_notify_service??"notify.mobile_app_phone"}}weather(){return Te(this.hass,this.config.weather_entity)}openCreate(e){this.editing=null,this.formError="",this.formBusy=!1,this.formReminder=null,this.formDefaults={start:(e?.start??new Date).toISOString(),end:(e?.end??new Date(Date.now()+36e5)).toISOString(),calendar:this.entities()[0]},this.formOpen=!0}openEdit(e){this.editing=e,this.formError="",this.formBusy=!1,this.formDefaults={},this.formReminder=null,this.formOpen=!0,this.loadReminderForEvent(e)}async loadReminderForEvent(e){if(this.hass&&this.remindersAvailable())try{const t=await new Ee(this.hass).getReminder(e.calendar,e.uid);if(!this.formOpen||this.editing?.uid!==e.uid)return;this.formReminder=t?{enabled:t.enabled,minutes_before:t.minutes_before,notify_service:t.notify_service,message:t.message??""}:null}catch{}}async syncReminder(e){if(!this.hass||!e.reminder||!this.remindersAvailable())return null;const t=new Ee(this.hass);if(!e.reminder.enabled)return await t.clearReminder(e.calendar,e.uid),"reminder cleared";if(!e.reminder.notify_service.trim())throw new Error("Reminder notify service is required");return await t.setReminder({calendar_entity_id:e.calendar,event_uid:e.uid,event_start:e.start,event_summary:e.summary,minutes_before:e.reminder.minutes_before,notify_service:e.reminder.notify_service.trim(),message:e.reminder.message,enabled:!0}),"reminder saved"}async onFormSave(e){const{mode:t,input:i,original:r,reminder:a,crossCalendarMove:n}=e.detail;if(!this.hass)return void(this.formError="No Home Assistant connection — cannot save.");this.formBusy=!0,this.formError="";const s=new _e(this.hass);let o=null;const d=Boolean(r&&(n||i.calendar&&i.calendar!==r.calendar));try{if("create"===t){const e=await s.createEvent(i);e.uid&&a?.enabled?o=await this.syncReminder({calendar:i.calendar,uid:e.uid,start:i.start,summary:i.summary,reminder:a}):a?.enabled&&!e.uid&&(o="event created; reminder skipped (no confirmed event uid yet)"),this.formOpen=!1,this.status=`Created “${i.summary}” on ${i.calendar}${o?` · ${o}`:""}`,this.statusKind="info"}else if(d&&r){if(r.recurring||r.rrule)return void(this.formError="Recurring events cannot change calendars yet. Keep the original calendar.");const e=await s.moveEventToCalendar(r,i.calendar,{...i,calendar:i.calendar});if("moved"===e.status){if(this.remindersAvailable())try{await new Ee(this.hass).clearReminder(r.calendar,r.uid)}catch{}a&&(o=await this.syncReminder({calendar:i.calendar,uid:e.newUid,start:i.start,summary:i.summary,reminder:a})),this.formOpen=!1,this.pendingDuplicate=null,this.status=`Moved “${i.summary}” ${r.calendar} → ${i.calendar}${o?` · ${o}`:""}`,this.statusKind="info"}else{if("create_failed"===e.status)return this.formError=`Move aborted (create failed): ${e.error}`,this.status=this.formError,void(this.statusKind="error");if("delete_failed"===e.status)this.formOpen=!1,this.pendingDuplicate=e.pending,this.status=`Copy exists on ${i.calendar}, but the old event could not be removed.`,this.statusKind="warn";else if("blocked_recurring"===e.status)return void(this.formError=e.reason)}}else r&&(await s.updateEvent(r.calendar,r.uid,{...i,calendar:r.calendar},r.recurrence_id),a&&(o=await this.syncReminder({calendar:r.calendar,uid:r.uid,start:i.start,summary:i.summary,reminder:a})),this.formOpen=!1,this.status=`Updated “${i.summary}”${o?` · ${o}`:""}`,this.statusKind="info");await this.refreshEvents()}catch(e){this.formError=e instanceof Error?e.message:String(e),this.status=this.formError,this.statusKind="error"}finally{this.formBusy=!1}}async cleanupDuplicate(){if(!this.hass||!this.pendingDuplicate)return;const e=this.pendingDuplicate,t=new _e(this.hass);try{await t.deleteEvent(e.entityId,e.uid),this.pendingDuplicate=null,this.status=`Removed old copy of “${e.summary}” from ${e.entityId}`,this.statusKind="info",await this.refreshEvents()}catch(e){this.status=`Cleanup failed: ${e instanceof Error?e.message:String(e)}`,this.statusKind="error"}}dismissDuplicate(){this.pendingDuplicate=null,this.status="Duplicate warning dismissed — old copy may still exist",this.statusKind="warn"}rangeLabel(){if("month"===this.view)return this.anchorDate.toLocaleDateString(void 0,{month:"long",year:"numeric"});const{start:e,end:t}=this.range();if("day"===this.view)return e.toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"});const i=new Date(t);i.setDate(i.getDate()-1);const r={month:"short",day:"numeric"};return`${e.toLocaleDateString(void 0,r)} – ${i.toLocaleDateString(void 0,r)}`}clockDateLabel(){return this.nowTick,(new Date).toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}clockTimeLabel(){return this.nowTick,(new Date).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}render(){const e=this.config.title??"Calendar",t=this.entities(),i=this.filteredEvents(),r=this.weather(),a=r?.forecast?.slice(0,7)??[],n=this.hasLoadedOnce&&!this.loading&&!this.loadFailed&&0===i.length&&Boolean(this.hass)&&!this.config.show_demo_when_empty,s=this.hasLoadedOnce&&!this.loading&&this.loadFailed&&!this.formOpen,o=this.loading&&this.hasLoadedOnce;return F`
      <div class="shell">
        ${this.pendingDuplicate?F`
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
            ${r?F`
                  <div class="temp">
                    ${Me(r.state)}
                    ${null!=r.temperature?`${Math.round(r.temperature)}${r.unit??"°"}`:""}
                  </div>
                  <div class="cond">${d=r.state,Ce[d]??d.replace(/-/g," ")}</div>
                `:F`<div class="weather-stub">
                  ${this.config.weather_entity?"Weather unavailable":"Add weather_entity"}
                </div>`}
          </div>
          <div class="forecast-strip" aria-label="Forecast">
            ${a.length?a.map(e=>{const t=new Date(e.datetime);return F`
                    <div class="forecast-day">
                      <span class="d"
                        >${t.toLocaleDateString(void 0,{weekday:"short"})}</span
                      >
                      <span class="g">${Me(e.condition)}</span>
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
            ${t.map(e=>{const t=!this.hiddenCalendars.includes(e);return F`
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
                @click=${()=>{this.anchorDate=new Date}}
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
            <div class="range-label">${this.rangeLabel()}</div>
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
          ${this.loading&&!this.hasLoadedOnce?F`
                <div class="state-panel" data-kind="loading">
                  <div
                    class="spinner"
                    style="width:1.4rem;height:1.4rem;border:2px solid var(--hac-line-strong);border-top-color:var(--hac-accent);border-radius:50%;animation:spin 0.7s linear infinite"
                  ></div>
                  <h2>Loading calendar</h2>
                  <p>Fetching events for ${this.rangeLabel()}.</p>
                </div>
              `:W}
          ${o?F`<div class="loading-veil"></div>`:W}
          ${s?F`
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
          ${n&&"month"!==this.view?F`
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

          ${"month"===this.view?F`
                <hac-month-grid
                  .anchorDate=${this.anchorDate}
                  .events=${i}
                  .calendars=${t}
                  .weather=${r}
                  @event-select=${e=>this.openEdit(e.detail)}
                  @slot-create=${e=>this.openCreate(e.detail)}
                ></hac-month-grid>
              `:F`
                <hac-time-grid
                  .mode=${this.view}
                  .anchorDate=${this.anchorDate}
                  .events=${i}
                  .calendars=${t}
                  .dayStartHour=${this.config.day_start_hour??6}
                  .dayEndHour=${this.config.day_end_hour??22}
                  .nowTick=${this.nowTick}
                  @event-select=${e=>this.openEdit(e.detail)}
                  @slot-create=${e=>this.openCreate(e.detail)}
                ></hac-time-grid>
              `}

          ${this.formOpen?F`
                <hac-event-form
                  .calendars=${this.formCalendars()}
                  .event=${this.editing}
                  .defaults=${this.formDefaults}
                  .busy=${this.formBusy}
                  .errorMessage=${this.formError}
                  .remindersAvailable=${this.remindersAvailable()}
                  .reminderDefaults=${this.reminderDefaults()}
                  .reminder=${this.formReminder}
                  @form-cancel=${()=>{this.formBusy||(this.formOpen=!1)}}
                  @form-save=${this.onFormSave}
                ></hac-event-form>
              `:W}
        </div>

        <div class="status" data-kind=${this.statusKind}>
          ${this.loading?F`<span class="spinner" aria-hidden="true"></span>`:W}
          <span>${this.status}</span>
          ${"error"!==this.statusKind||s?W:F`<button
                class="ghost-btn"
                type="button"
                style="min-height:1.75rem;padding:0.2rem 0.6rem;font-size:0.78rem"
                @click=${()=>{this.refreshEvents()}}
              >
                Retry
              </button>`}
        </div>
      </div>
    `;var d}};Be.styles=[Se,s`
      :host {
        position: relative;
      }
    `],e([ue({attribute:!1})],Be.prototype,"hass",void 0),e([me()],Be.prototype,"config",void 0),e([me()],Be.prototype,"view",void 0),e([me()],Be.prototype,"anchorDate",void 0),e([me()],Be.prototype,"events",void 0),e([me()],Be.prototype,"formOpen",void 0),e([me()],Be.prototype,"editing",void 0),e([me()],Be.prototype,"formDefaults",void 0),e([me()],Be.prototype,"formBusy",void 0),e([me()],Be.prototype,"formError",void 0),e([me()],Be.prototype,"status",void 0),e([me()],Be.prototype,"statusKind",void 0),e([me()],Be.prototype,"loading",void 0),e([me()],Be.prototype,"loadFailed",void 0),e([me()],Be.prototype,"pendingDuplicate",void 0),e([me()],Be.prototype,"loadGeneration",void 0),e([me()],Be.prototype,"hasLoadedOnce",void 0),e([me()],Be.prototype,"formReminder",void 0),e([me()],Be.prototype,"hiddenCalendars",void 0),e([me()],Be.prototype,"nowTick",void 0),Be=e([le(fe)],Be),window.customCards=window.customCards||[],window.customCards.push({type:fe,name:"HA Calendar Card",description:"Skylight-style month/week/day calendar with create/edit and safe calendar moves",preview:!0}),console.info(`%c HA-CALENDAR-CARD %c ${pe} `,"background:#3d9b8f;color:#fff;padding:2px 4px;border-radius:4px 0 0 4px","background:#2c3340;color:#fff;padding:2px 4px;border-radius:0 4px 4px 0");export{Be as HaCalendarCard};
//# sourceMappingURL=ha-calendar-card.js.map
