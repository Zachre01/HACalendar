function e(e,t,r,i){var s,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(n<3?s(a):n>3?s(t,r,a):s(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,r=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const r=void 0!==t&&1===t.length;r&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&s.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const r=1===e.length?e[0]:t.reduce((t,r,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[i+1],e[0]);return new n(r,e,i)},o=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",y=m.reactiveElementPolyfillSupport,v=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},w=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(e,r,t);void 0!==i&&d(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){const{get:i,set:s}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);s?.call(this,t),this.requestUpdate(e,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const r of t)this.createProperty(r,e[r])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,r]of t)this.elementProperties.set(e,r)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const r=this._$Eu(e,t);void 0!==r&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(r)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const r of i){const i=document.createElement("style"),s=t.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=r.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){const r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(void 0!==i&&!0===r.reflect){const s=(void 0!==r.converter?.toAttribute?r.converter:b).toAttribute(t,r.type);this._$Em=e,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){const r=this.constructor,i=r._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=r.getPropertyOptions(i),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const n=s.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,r,i=!1,s){if(void 0!==e){const n=this.constructor;if(!1===i&&(s=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??w)(s,t)||r.useDefault&&r.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:s},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,r]of e){const{wrapped:e}=r,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,r,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[v("elementProperties")]=new Map,_[v("finalized")]=new Map,y?.({ReactiveElement:_}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=e=>e,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+A,R=`<${D}>`,T=document,M=()=>T.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,H="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,z=/>/g,U=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,j=(e=>(t,...r)=>({_$litType$:e,strings:t,values:r}))(1),K=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,Y=T.createTreeWalker(T,129);function V(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const G=(e,t)=>{const r=e.length-1,i=[];let s,n=2===t?"<svg>":3===t?"<math>":"",a=N;for(let t=0;t<r;t++){const r=e[t];let o,l,d=-1,c=0;for(;c<r.length&&(a.lastIndex=c,l=a.exec(r),null!==l);)c=a.lastIndex,a===N?"!--"===l[1]?a=L:void 0!==l[1]?a=z:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=U):void 0!==l[3]&&(a=U):a===U?">"===l[0]?(a=s??N,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,o=l[1],a=void 0===l[3]?U:'"'===l[3]?I:F):a===I||a===F?a=U:a===L||a===z?a=N:(a=U,s=void 0);const h=a===U&&e[t+1].startsWith("/>")?" ":"";n+=a===N?r+R:d>=0?(i.push(o),r.slice(0,d)+C+r.slice(d)+A+h):r+A+(-2===d?t:h)}return[V(e,n+(e[r]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class J{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let s=0,n=0;const a=e.length-1,o=this.parts,[l,d]=G(e,t);if(this.el=J.createElement(l,r),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Y.nextNode())&&o.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(C)){const t=d[n++],r=i.getAttribute(e).split(A),a=/([.?@])?(.*)/.exec(t);o.push({type:1,index:s,name:a[2],strings:r,ctor:"."===a[1]?te:"?"===a[1]?re:"@"===a[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(A)&&(o.push({type:6,index:s}),i.removeAttribute(e));if(B.test(i.tagName)){const e=i.textContent.split(A),t=e.length-1;if(t>0){i.textContent=E?E.emptyScript:"";for(let r=0;r<t;r++)i.append(e[r],M()),Y.nextNode(),o.push({type:2,index:++s});i.append(e[t],M())}}}else if(8===i.nodeType)if(i.data===D)o.push({type:2,index:s});else{let e=-1;for(;-1!==(e=i.data.indexOf(A,e+1));)o.push({type:7,index:s}),e+=A.length-1}s++}}static createElement(e,t){const r=T.createElement("template");return r.innerHTML=e,r}}function Q(e,t,r=e,i){if(t===K)return t;let s=void 0!==i?r._$Co?.[i]:r._$Cl;const n=P(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,r,i)),void 0!==i?(r._$Co??=[])[i]=s:r._$Cl=s),void 0!==s&&(t=Q(e,s._$AS(e,t.values),s,i)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,i=(e?.creationScope??T).importNode(t,!0);Y.currentNode=i;let s=Y.nextNode(),n=0,a=0,o=r[0];for(;void 0!==o;){if(n===o.index){let t;2===o.type?t=new X(s,s.nextSibling,this,e):1===o.type?t=new o.ctor(s,o.name,o.strings,this,e):6===o.type&&(t=new se(s,this,e)),this._$AV.push(t),o=r[++a]}n!==o?.index&&(s=Y.nextNode(),n++)}return Y.currentNode=T,i}p(e){let t=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),P(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:r}=e,i="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=J.createElement(V(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Z(i,this),r=e.u(this.options);e.p(t),this.T(r),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new J(e)),t}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const s of e)i===t.length?t.push(r=new X(this.O(M()),this.O(M()),this,this.options)):r=t[i],r._$AI(s),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=W}_$AI(e,t=this,r,i){const s=this.strings;let n=!1;if(void 0===s)e=Q(this,e,t,0),n=!P(e)||e!==this._$AH&&e!==K,n&&(this._$AH=e);else{const i=e;let a,o;for(e=s[0],a=0;a<s.length-1;a++)o=Q(this,i[r+a],t,a),o===K&&(o=this._$AH[a]),n||=!P(o)||o!==this._$AH[a],o===W?e=W:e!==W&&(e+=(o??"")+s[a+1]),this._$AH[a]=o}n&&!i&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class re extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ie extends ee{constructor(e,t,r,i,s){super(e,t,r,i,s),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??W)===K)return;const r=this._$AH,i=e===W&&r!==W||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==W&&(r===W||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ne=x.litHtmlPolyfillSupport;ne?.(J,X),(x.litHtmlVersions??=[]).push("3.3.3");const ae=globalThis;class oe extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,r)=>{const i=r?.renderBefore??t;let s=i._$litPart$;if(void 0===s){const e=r?.renderBefore??null;i._$litPart$=s=new X(t.insertBefore(M(),e),e,void 0,r??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}oe._$litElement$=!0,oe.finalized=!0,ae.litElementHydrateSupport?.({LitElement:oe});const le=ae.litElementPolyfillSupport;le?.({LitElement:oe}),(ae.litElementVersions??=[]).push("4.2.2");const de=e=>(t,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ce={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},he=(e=ce,t,r)=>{const{kind:i,metadata:s}=r;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),n.set(r.name,e),"accessor"===i){const{name:i}=r;return{set(r){const s=t.get.call(this);t.set.call(this,r),this.requestUpdate(i,s,e,!0,r)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=r;return function(r){const s=this[i];t.call(this,r),this.requestUpdate(i,s,e,!0,r)}}throw Error("Unsupported decorator location: "+i)};function ue(e){return(t,r)=>"object"==typeof r?he(e,t,r):((e,t,r)=>{const i=t.hasOwnProperty(r);return t.constructor.createProperty(r,e),i?Object.getOwnPropertyDescriptor(t,r):void 0})(e,t,r)}function pe(e){return ue({...e,state:!0,attribute:!1})}const me="0.7.2",fe="ha-calendar-card",ge=56,ye=["calendar.family","calendar.personal","calendar.work"],ve=["#E07A5F","#3D9B8F","#81B29A","#5B8DB8","#E9B44C"];function be(e){if(e)return"string"==typeof e?e:"dateTime"in e&&e.dateTime?e.dateTime:"date"in e&&e.date?e.date:void 0}function we(e,t){const r=be(e.start),i=be(e.end);if(!r||!i)return null;const s=e.rrule??void 0;return{uid:e.uid??`${t}:${r}:${e.summary??"event"}`,summary:e.summary??"(no title)",description:e.description??void 0,location:e.location??void 0,start:r,end:i,all_day:e.all_day??(n=e.start,n&&"string"!=typeof n?Boolean(n.date&&!n.dateTime):Boolean(n&&/^\d{4}-\d{2}-\d{2}$/.test(n))),calendar:t,recurring:Boolean(s||e.recurrence_id),rrule:s,recurrence_id:e.recurrence_id??void 0};var n}function $e(e){const t={summary:e.summary,description:e.description??"",location:e.location??"",dtstart:e.all_day?e.start.slice(0,10):e.start,dtend:e.all_day?e.end.slice(0,10):e.end};return e.rrule&&(t.rrule=e.rrule),t}class _e{constructor(e){this.hass=e}listCalendarEntities(e){return e?.length?[...e]:Object.keys(this.hass.states).filter(e=>e.startsWith("calendar.")).sort()}listWritableCalendars(e){return e.filter(e=>{const t=this.hass.states[e];if(!t)return!0;const r=t.attributes.supported_features;return"number"!=typeof r||!!(1&r)})}canDelete(e){const t=this.hass.states[e];if(!t)return!0;const r=t.attributes.supported_features;return"number"!=typeof r||!!(2&r)}async getEvents(e,t,r){const i=[],s=[];let n=!1;for(const a of e)try{const e=await this.fetchEntityEvents(a,t,r);n=!0,i.push(...e)}catch(e){s.push(a),console.warn(`[ha-calendar-card] failed to load ${a}:`,e instanceof Error?e.message:e)}return{events:i,errors:s,anySuccess:n}}async fetchEntityEvents(e,t,r){if(this.hass.callApi)try{const i=`?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(r.toISOString())}`;return(await this.hass.callApi("GET",`calendars/${e}${i}`)??[]).map(t=>we(t,e)).filter(e=>null!==e)}catch{}const i=await this.hass.callService("calendar","get_events",{entity_id:e,start_date_time:t.toISOString(),end_date_time:r.toISOString()},void 0,void 0,!0);let s;if(i&&"object"==typeof i){const e=i;s=e.response&&"object"==typeof e.response?e.response:e}return(s?.[e]?.events??[]).map(t=>we(t,e)).filter(e=>null!==e)}async createEvent(e){try{await this.hass.callWS({type:"calendar/event/create",entity_id:e.calendar,event:$e(e)})}catch(t){if(e.rrule)throw t instanceof Error?t:new Error(`Recurring create failed (websocket required for rrule): ${String(t)}`);try{await this.hass.callService("calendar","create_event",{entity_id:e.calendar,summary:e.summary,description:e.description??"",location:e.location??"",start_date_time:e.all_day?void 0:e.start,end_date_time:e.all_day?void 0:e.end,start_date:e.all_day?e.start.slice(0,10):void 0,end_date:e.all_day?e.end.slice(0,10):void 0})}catch{throw t instanceof Error?t:new Error(String(t))}}const t=await this.findCreatedEvent(e);return{uid:t?.uid}}async findCreatedEvent(e){const t=new Date(e.start),r=new Date(e.end),i=new Date(t.getTime()-6e4),s=new Date(r.getTime()+6e4);try{const{events:r}=await this.getEvents([e.calendar],i,s);return r.find(t=>function(e,t){return e.summary===t.summary&&e.start===t.start&&e.end===t.end}(t,{summary:e.summary,start:e.all_day?e.start.slice(0,10):e.start,end:e.all_day?e.end.slice(0,10):e.end}))??r.find(r=>r.summary===e.summary&&Math.abs(new Date(r.start).getTime()-t.getTime())<12e4)??null}catch{return null}}async updateEvent(e,t,r,i,s){try{const n={type:"calendar/event/update",entity_id:e,uid:t,event:$e(r)};return i&&(n.recurrence_id=i),s&&(n.recurrence_range=s),void await this.hass.callWS(n)}catch(i){if(r.rrule||s)throw i instanceof Error?i:new Error(String(i));try{await this.hass.callService("calendar","update_event",{entity_id:e,uid:t,summary:r.summary,description:r.description,location:r.location,start_date_time:r.all_day?void 0:r.start,end_date_time:r.all_day?void 0:r.end})}catch{throw i instanceof Error?i:new Error(String(i))}}}async deleteEvent(e,t,r,i){try{const s={type:"calendar/event/delete",entity_id:e,uid:t};return r&&(s.recurrence_id=r),i&&(s.recurrence_range=i),void await this.hass.callWS(s)}catch(r){try{await this.hass.callService("calendar","delete_event",{entity_id:e,uid:t})}catch{throw r instanceof Error?r:new Error(String(r))}}}async moveEventToCalendar(e,t,r){if(e.recurring||e.rrule)return{status:"blocked_recurring",reason:"Moving recurring events is disabled — change calendars only for one-off events."};if(e.calendar===t)return{status:"moved",newUid:e.uid};const i={summary:r?.summary??e.summary,description:r?.description??e.description,location:r?.location??e.location,start:r?.start??e.start,end:r?.end??e.end,all_day:r?.all_day??e.all_day,calendar:t};let s;try{if(s=(await this.createEvent(i)).uid??(await this.findCreatedEvent(i))?.uid,!s)return{status:"create_failed",error:"Created on target calendar but could not confirm the new event id — source left untouched."}}catch(e){return{status:"create_failed",error:e instanceof Error?e.message:String(e)}}try{return await this.deleteEvent(e.calendar,e.uid,e.recurrence_id),{status:"moved",newUid:s}}catch(i){const n={entityId:e.calendar,uid:e.uid,summary:r?.summary??e.summary,targetCalendar:t,newUid:s};return{status:"delete_failed",newUid:s,error:i instanceof Error?i.message:String(i),duplicate:!0,pending:n}}}}const xe="ha_calendar_reminders";function ke(e){if(!e||"object"!=typeof e)return{};const t=e;return t.response&&"object"==typeof t.response?t.response:t}class Ee{constructor(e){this.hass=e}isAvailable(){const e=this.hass.services;return Boolean(e&&e[xe]?.set_reminder)}async getReminder(e,t){const r=ke(await this.hass.callService(xe,"get_reminder",{calendar_entity_id:e,event_uid:t},void 0,void 0,!0)).reminder;return r&&"object"==typeof r?r:null}async setReminder(e){return ke(await this.hass.callService(xe,"set_reminder",{calendar_entity_id:e.calendar_entity_id,event_uid:e.event_uid,event_start:e.event_start,event_summary:e.event_summary??"",minutes_before:e.minutes_before,notify_service:e.notify_service,message:e.message??"",enabled:e.enabled??!0},void 0,void 0,!0)).reminder??null}async clearReminder(e,t){const r=ke(await this.hass.callService(xe,"clear_reminder",{calendar_entity_id:e,event_uid:t},void 0,void 0,!0));return Boolean(r.cleared)}}const Se=a`
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
    background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%);
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

  /* Sole vertical scroll context for month/week/day bodies */
  .grid-wrap {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    position: relative;
    -webkit-overflow-scrolling: touch;
    background: #fff;
  }

  hac-time-grid,
  hac-month-grid {
    display: block;
    height: 100%;
    min-height: 100%;
  }

  /* Month fits the panel body when possible; week/day still grow with hours */
  :host([data-layout="panel"]) hac-month-grid,
  :host-context(hui-panel-view) hac-month-grid {
    min-height: 0;
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
    flex: 0 0 auto;
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
`,Ce=a`
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
`,Ae=a`
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
    box-shadow: inset 0 0 0 1px rgba(44, 51, 64, 0.12);
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
    border: 1px solid var(--hac-line);
    background: #f7f8fa;
    border-radius: 999px;
    padding: 0.2rem 0.55rem 0.2rem 0.35rem;
    font: inherit;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--hac-ink);
    cursor: pointer;
    text-transform: capitalize;
  }

  .cal-legend-item[data-active="true"] {
    border-color: var(--hac-accent);
    background: #fff;
    box-shadow: 0 0 0 2px rgba(61, 155, 143, 0.12);
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
    background: #f7faf9;
  }

  .recur-block {
    margin-top: 1rem;
    padding: 0.75rem 0.8rem;
    border: 1px solid var(--hac-line);
    border-radius: 12px;
    background: #f8f9fb;
  }

  .recur-block h3,
  .reminder-block h3 {
    margin: 0 0 0.35rem;
    font-family: var(--hac-font-display);
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
`,De=new Set(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function Re(e){const t=e.trim();return t&&De.has(t)?`var(--${t}-color)`:t}function Te(e){if(!e||"string"!=typeof e)return!1;const t=e.trim();if(!t)return!1;if(De.has(t))return!0;if(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(t))return!0;if(/^(rgb|hsl)a?\(/i.test(t))return!0;try{const e=(new Option).style;return e.color=t,""!==e.color}catch{return!1}}function Me(e){return ve[(e<0?0:e)%ve.length]}function Pe(e,t,r,i){if(Te(r))return Re(r);const s=function(e,t){const r=e?.entities?.[t];if(!r)return;const i=r.display?.color;return"string"==typeof i?i:"string"==typeof r.color?r.color:void 0}(i,e);if(Te(s))return Re(s);const n=i?.states?.[e]?.attributes?.color;return"string"==typeof n&&Te(n)?Re(n):Me(t)}function Oe(e){const t=e?.options?.calendar?.color;return"string"==typeof t?t:void 0}function He(e,t,r){const i={};return e.forEach((e,s)=>{i[e]=Pe(e,s,t[e],r)}),i}const Ne={"clear-night":"Clear",cloudy:"Cloudy",fog:"Fog",hail:"Hail",lightning:"Storms","lightning-rainy":"Storms",partlycloudy:"Partly cloudy",pouring:"Downpour",rainy:"Rain",snowy:"Snow","snowy-rainy":"Sleet",sunny:"Sunny",windy:"Windy","windy-variant":"Windy",exceptional:"Alert"};function Le(e){return e.includes("lightning")?"⚡":e.includes("snow")?"❄":e.includes("rain")||"pouring"===e||"hail"===e?"🌧":"fog"===e?"fog":"cloudy"===e?"☁":"partlycloudy"===e?"⛅":"clear-night"===e?"☾":"sunny"===e?"☀":e.includes("wind")?"🌬":"·"}function ze(e){const t=e.weather_entity??e.weather;if(!t||"string"!=typeof t)return;return t.trim()||void 0}function Ue(e){if(!Array.isArray(e))return[];const t=[];for(const r of e){if(!r||"object"!=typeof r)continue;const e=r,i=String(e.datetime??e.date??""),s=String(e.condition??e.state??"");i&&s&&t.push({datetime:i,condition:s,temperature:"number"==typeof e.temperature?e.temperature:void 0,templow:"number"==typeof e.templow?e.templow:void 0})}return t}function Fe(e){return Ue(e.forecast??e.forecast_daily??e.forecast_twice_daily)}function Ie(e,t){if(!e||"object"!=typeof e)return[];const r=e,i=(r.response&&"object"==typeof r.response?r.response:r)[t];return i&&"object"==typeof i?Ue(i.forecast):[]}function Be(e,t){const r=new Date(e);return r.setDate(r.getDate()+t),r}function je(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function Ke(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,r,i]=e.split("-").map(Number);return new Date(t,r-1,i)}return new Date(e)}let We=class extends oe{constructor(){super(...arguments),this.mode="week",this.anchorDate=new Date,this.events=[],this.calendars=[],this.calendarColors={},this.dayStartHour=6,this.dayEndHour=22,this.nowTick=0}get days(){const e=function(e){const t=new Date(e);return t.setHours(0,0,0,0),t}(this.anchorDate);if("day"===this.mode)return[e];const t=(e.getDay()+6)%7,r=Be(e,-t);return Array.from({length:7},(e,t)=>Be(r,t))}get hours(){const e=[];for(let t=this.dayStartHour;t<this.dayEndHour;t++)e.push(t);return e}calendarColor(e){if(this.calendarColors[e])return this.calendarColors[e];return Me(Math.max(0,this.calendars.indexOf(e)))}eventStyle(e,t){const r=Ke(e.start),i=Ke(e.end),s=new Date(t);s.setHours(this.dayStartHour,0,0,0);const n=new Date(t);if(n.setHours(this.dayEndHour,0,0,0),i<=s||r>=n)return null;const a=r<s?s:r,o=i>n?n:i,l=60*(a.getHours()-this.dayStartHour)+a.getMinutes(),d=Math.max(22,(o.getTime()-a.getTime())/6e4);return`top:${l/60*ge}px;height:${d/60*ge}px;background:${this.calendarColor(e.calendar)};`}nowLineTop(e){this.nowTick;const t=new Date;if(!je(t,e))return null;if(t.getHours()<this.dayStartHour||t.getHours()>=this.dayEndHour)return null;return(60*(t.getHours()-this.dayStartHour)+t.getMinutes())/60*ge}formatTime(e){return e.all_day||/^\d{4}-\d{2}-\d{2}$/.test(e.start)?"All day":Ke(e.start).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}onEventClick(e){this.dispatchEvent(new CustomEvent("event-select",{detail:e,bubbles:!0,composed:!0}))}onSlotCreate(e,t){const r=new Date(e);r.setHours(t,0,0,0);const i=new Date(r);i.setHours(t+1,0,0,0),this.dispatchEvent(new CustomEvent("slot-create",{detail:{start:r,end:i},bubbles:!0,composed:!0}))}hourFromPointer(e,t){const r=t.getBoundingClientRect(),i=e.clientY-r.top;return this.dayStartHour+Math.floor(i/ge)}render(){const e=this.hours,t=this.days,r=e.length*ge,i=new Date;return j`
      <div
        class="time-grid"
        data-mode=${"month"===this.mode?"week":this.mode}
        style="--hac-hour-height:${ge}px"
      >
        <div class="corner"></div>
        ${t.map(e=>{const t=je(e,i);return j`
            <div class="day-head" data-today=${t?"true":"false"}>
              <span
                >${e.toLocaleDateString(void 0,{weekday:"short"})}</span
              >
              <span class="num">${e.getDate()}</span>
            </div>
          `})}

        <div class="hours" style="height:${r}px">
          ${e.map(e=>j`<div class="hour-label">
                ${String(e).padStart(2,"0")}:00
              </div>`)}
        </div>

        ${t.map(t=>{const s=je(t,i),n=this.nowLineTop(t);return j`
            <div
              class="day-col"
              data-today=${s?"true":"false"}
              style="height:${r}px"
              @dblclick=${e=>{const r=this.hourFromPointer(e,e.currentTarget);this.onSlotCreate(t,r)}}
            >
              ${e.map(()=>j`<div class="hour-line"></div>`)}
              ${null!==n?j`<div class="now-line" style="top:${n}px"></div>`:W}
              ${this.events.map(e=>{const r=this.eventStyle(e,t);if(!r)return W;const i=e.calendar.replace(/^calendar\./,"");return j`
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
    `}};function qe(e){const t=new Date(e);return t.setHours(0,0,0,0),t}function Ye(e,t){const r=new Date(e);return r.setDate(r.getDate()+t),r}function Ve(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,r,i]=e.split("-").map(Number);return new Date(t,r-1,i)}return new Date(e)}We.styles=Ce,e([ue({attribute:!1})],We.prototype,"mode",void 0),e([ue({attribute:!1})],We.prototype,"anchorDate",void 0),e([ue({attribute:!1})],We.prototype,"events",void 0),e([ue({attribute:!1})],We.prototype,"calendars",void 0),e([ue({attribute:!1})],We.prototype,"calendarColors",void 0),e([ue({type:Number})],We.prototype,"dayStartHour",void 0),e([ue({type:Number})],We.prototype,"dayEndHour",void 0),e([ue({type:Number})],We.prototype,"nowTick",void 0),We=e([de("hac-time-grid")],We);let Ge=class extends oe{constructor(){super(...arguments),this.anchorDate=new Date,this.events=[],this.calendars=[],this.calendarColors={},this.weather=null,this.maxVisible=3}get monthStart(){const e=qe(this.anchorDate);return e.setDate(1),e}get cells(){const e=this.monthStart,t=(e.getDay()+6)%7,r=Ye(e,-t);return Array.from({length:42},(e,t)=>Ye(r,t))}calendarColor(e){if(this.calendarColors[e])return this.calendarColors[e];return Me(Math.max(0,this.calendars.indexOf(e)))}eventsForDay(e){return this.events.filter(t=>{const r=Ve(t.start),i=Ve(t.end),s=qe(e);return r<Ye(s,1)&&i>s}).sort((e,t)=>Ve(e.start).getTime()-Ve(t.start).getTime())}onEventClick(e,t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("event-select",{detail:e,bubbles:!0,composed:!0}))}onDayCreate(e){const t=new Date(e);t.setHours(9,0,0,0);const r=new Date(t);r.setHours(10,0,0,0),this.dispatchEvent(new CustomEvent("slot-create",{detail:{start:t,end:r},bubbles:!0,composed:!0}))}render(){const e=new Date,t=this.monthStart.getMonth();return j`
      <div class="month">
        <div class="dow">
          ${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(e=>j`<span>${e}</span>`)}
        </div>
        <div class="cells">
          ${this.cells.map(r=>{const i=r.getMonth()!==t,s=function(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}(r,e),n=this.eventsForDay(r),a=n.slice(0,this.maxVisible),o=n.length-a.length,l=function(e,t){if(!e?.forecast?.length)return null;const r=[t.getFullYear(),String(t.getMonth()+1).padStart(2,"0"),String(t.getDate()).padStart(2,"0")].join("-");return e.forecast.find(e=>e.datetime.slice(0,10)===r)??null}(this.weather,r);return j`
              <div
                class="cell"
                data-outside=${i?"true":"false"}
                data-today=${s?"true":"false"}
                @dblclick=${()=>this.onDayCreate(r)}
              >
                <div class="cell-top">
                  <span class="num">${r.getDate()}</span>
                  ${l?j`<span class="wx"
                        >${Le(l.condition)}${null!=l.temperature?` ${Math.round(l.temperature)}°`:""}</span
                      >`:W}
                </div>
                <div class="events">
                  ${a.map(e=>j`
                      <button
                        type="button"
                        class="chip"
                        style="background:${this.calendarColor(e.calendar)}"
                        title=${e.rrule||e.recurring?`${e.summary} (repeats)`:e.summary}
                        @click=${t=>this.onEventClick(e,t)}
                      >
                        ${e.rrule||e.recurring?j`<span class="recur" aria-hidden="true">↻</span>`:W}<span class="t"
                          >${function(e){return e.all_day||/^\d{4}-\d{2}-\d{2}$/.test(e.start)?"All day":Ve(e.start).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}(e)}</span
                        >${e.summary}
                      </button>
                    `)}
                  ${o>0?j`<div class="more">+${o} more</div>`:W}
                  ${i||0!==n.length?W:j`<div class="empty">No events</div>`}
                </div>
              </div>
            `})}
        </div>
      </div>
    `}};Ge.styles=a`
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

    :host([data-fill]) {
      min-height: 0;
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

    /* Panel fill: shrink rows into the available body (outer page must not scroll) */
    :host([data-fill]) .cells {
      grid-auto-rows: minmax(0, 1fr);
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

    .chip .recur {
      font-weight: 800;
      opacity: 0.95;
      margin-right: 0.15rem;
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
  `,e([ue({attribute:!1})],Ge.prototype,"anchorDate",void 0),e([ue({attribute:!1})],Ge.prototype,"events",void 0),e([ue({attribute:!1})],Ge.prototype,"calendars",void 0),e([ue({attribute:!1})],Ge.prototype,"calendarColors",void 0),e([ue({attribute:!1})],Ge.prototype,"weather",void 0),e([ue({type:Number})],Ge.prototype,"maxVisible",void 0),Ge=e([de("hac-month-grid")],Ge);const Je=["SU","MO","TU","WE","TH","FR","SA"];function Qe(e){if(!e)return"none";const t=/FREQ=(DAILY|WEEKLY|MONTHLY|YEARLY)/i.exec(e);return t?t[1].toLowerCase():"none"}function Ze(e){if("none"===e.freq)return;const t=[`FREQ=${e.freq.toUpperCase()}`];if("weekly"===e.freq){const i=/^\d{4}-\d{2}-\d{2}$/.test(e.startIso)?new Date(`${e.startIso}T12:00:00`):new Date(e.startIso);Number.isNaN(i.getTime())||t.push(`BYDAY=${r=i,Je[r.getDay()]}`)}var r;return e.untilDate&&/^\d{4}-\d{2}-\d{2}$/.test(e.untilDate)&&t.push(`UNTIL=${e.untilDate.replace(/-/g,"")}`),t.join(";")}let Xe=class extends oe{constructor(){super(...arguments),this.calendars=[],this.calendarColors={},this.event=null,this.defaults={},this.busy=!1,this.errorMessage="",this.remindersAvailable=!1,this.reminderDefaults={},this.reminder=null,this.summary="",this.description="",this.location="",this.start="",this.end="",this.calendar="",this.moveNote="",this.reminderEnabled=!1,this.reminderMinutes=30,this.reminderNotify="notify.mobile_app_phone",this.reminderMessage="",this.hydrateKey="",this.recurFreq="none",this.recurUntil="",this.recurScope="this"}connectedCallback(){super.connectedCallback(),this.hydrateEventFields(!0),this.applyReminderFields(!0)}updated(e){e.has("event")||e.has("defaults")?(this.hydrateEventFields(),this.applyReminderFields(!0)):(e.has("reminder")||e.has("reminderDefaults"))&&this.applyReminderFields(!1)}eventKey(){return this.event?`edit:${this.event.calendar}:${this.event.uid}:${this.event.recurrence_id??""}`:`create:${this.defaults.start??""}:${this.defaults.end??""}:${this.defaults.calendar??""}`}hydrateEventFields(e=!1){const t=this.eventKey();(e||t!==this.hydrateKey)&&(this.hydrateKey=t,this.event?(this.summary=this.event.summary,this.description=this.event.description??"",this.location=this.event.location??"",this.start=this.toLocalInput(this.event.start),this.end=this.toLocalInput(this.event.end),this.calendar=this.event.calendar,this.recurFreq=Qe(this.event.rrule),this.recurUntil=function(e){if(!e)return"";const t=/UNTIL=(\d{8})/i.exec(e);if(!t)return"";const r=t[1];return`${r.slice(0,4)}-${r.slice(4,6)}-${r.slice(6,8)}`}(this.event.rrule),this.recurScope=this.event.recurrence_id?"this":"series"):(this.summary="",this.description="",this.location="",this.start=this.toLocalInput(this.defaults.start??(new Date).toISOString()),this.end=this.toLocalInput(this.defaults.end??new Date(Date.now()+36e5).toISOString()),this.calendar=this.defaults.calendar??this.calendars[0]??"",this.recurFreq="none",this.recurUntil="",this.recurScope="this"),this.moveNote="")}applyReminderFields(e){if(this.reminder)return this.reminderEnabled=Boolean(this.reminder.enabled),this.reminderMinutes=this.reminder.minutes_before,this.reminderNotify=this.reminder.notify_service,void(this.reminderMessage=this.reminder.message??"");e&&(this.reminderEnabled=!1,this.reminderMinutes=this.reminderDefaults.minutes_before??30,this.reminderNotify=this.reminderDefaults.notify_service||"notify.mobile_app_phone",this.reminderMessage="")}get calendarOptions(){const e=new Set,t=[],r=r=>{r&&!e.has(r)&&(e.add(r),t.push(r))};this.event?.calendar&&r(this.event.calendar),this.calendar&&r(this.calendar);for(const e of this.calendars)r(e);return t}toLocalInput(e){const t=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T09:00:00`):new Date(e);if(Number.isNaN(t.getTime()))return"";const r=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}T${r(t.getHours())}:${r(t.getMinutes())}`}fromLocalInput(e){return new Date(e).toISOString()}get isRecurring(){return Boolean(this.event?.recurring||this.event?.rrule)}get isCrossCalendarMove(){return Boolean(this.event&&this.calendar&&this.calendar!==this.event.calendar)}get calendarMoveBlocked(){return this.isRecurring&&this.isCrossCalendarMove}get recurrenceRuleEditable(){return!this.event||(!this.isRecurring||("series"===this.recurScope||"future"===this.recurScope))}onCalendarChange(e){const t=e.target.value;this.selectCalendar(t)}selectCalendar(e){this.calendar=e,this.event&&e!==this.event.calendar?this.isRecurring?this.moveNote="Recurring series cannot change calendars (avoids partial/orphan instances). Keep the original calendar or recreate as a one-off.":this.moveNote="Home Assistant cannot move events across calendars — Save will create on the new calendar, then delete from the old one.":this.moveNote=""}calendarColor(e){if(this.calendarColors[e])return this.calendarColors[e];const t=this.calendarOptions;return Me(Math.max(0,t.indexOf(e)))}calendarLabel(e){return e.replace(/^calendar\./,"").replace(/_/g," ")}close(){this.busy||this.dispatchEvent(new CustomEvent("form-cancel",{bubbles:!0,composed:!0}))}save(){if(this.busy)return;if(!(this.summary.trim()&&this.start&&this.end&&this.calendar))return;if(this.calendarMoveBlocked)return;const e=this.fromLocalInput(this.start);let t;this.recurrenceRuleEditable?t=Ze({freq:this.recurFreq,startIso:e,untilDate:this.recurUntil||void 0}):this.isRecurring&&(t=void 0);const r={summary:this.summary.trim(),description:this.description.trim()||void 0,location:this.location.trim()||void 0,start:e,end:this.fromLocalInput(this.end),calendar:this.calendar,rrule:t??void 0},i=this.isCrossCalendarMove,s={mode:this.event?"edit":"create",input:r,original:this.event??void 0,crossCalendarMove:i,recurrenceScope:this.isRecurring?this.recurScope:void 0,reminder:this.remindersAvailable?{enabled:this.reminderEnabled,minutes_before:this.reminderMinutes,notify_service:this.reminderNotify.trim(),message:this.reminderMessage.trim()}:void 0};this.dispatchEvent(new CustomEvent("form-save",{detail:s,bubbles:!0,composed:!0}))}render(){const e=this.event?"Edit event":"New event",t=this.calendarOptions,r=this.event?.rrule?function(e){switch(Qe(e)){case"daily":return"Daily";case"weekly":return"Weekly";case"monthly":return"Monthly";case"yearly":return"Yearly";default:return e?"Repeats":""}}(this.event.rrule):"";return j`
      <div class="form-backdrop" @click=${this.close}>
        <div
          class="form-panel"
          @click=${e=>e.stopPropagation()}
          role="dialog"
          aria-label=${e}
        >
          <h2>${e}</h2>
          <p class="form-sub">
            ${this.event?this.isRecurring?`Recurring series${r?` · ${r}`:""}. Choose edit scope below.`:"Edit details, change calendar (create+delete move), or reminder.":"Add an event — optionally set it to repeat."}
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
              ${t.map(e=>j`
                  <option value=${e} ?selected=${e===this.calendar}>
                    ${this.calendarLabel(e)}
                  </option>
                `)}
            </select>
          </div>
          <div class="cal-legend" role="list" aria-label="Calendar colors">
            ${t.map(e=>j`
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
          ${this.event?j`<p class="hint">
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

          <div class="recur-block">
            <h3>Repeat</h3>
            ${this.isRecurring?j`
                  <label for="recur-scope">Edit scope</label>
                  <select
                    id="recur-scope"
                    ?disabled=${this.busy}
                    @change=${e=>{this.recurScope=e.target.value}}
                  >
                    <option value="this" ?selected=${"this"===this.recurScope}>
                      This occurrence only
                    </option>
                    <option
                      value="future"
                      ?selected=${"future"===this.recurScope}
                    >
                      This and future
                    </option>
                    <option
                      value="series"
                      ?selected=${"series"===this.recurScope}
                    >
                      Entire series
                    </option>
                  </select>
                `:W}
            <label for="recur-freq">Frequency</label>
            <select
              id="recur-freq"
              ?disabled=${this.busy||!this.recurrenceRuleEditable}
              @change=${e=>{this.recurFreq=e.target.value}}
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
            ${"none"!==this.recurFreq&&this.recurrenceRuleEditable?j`
                  <label for="recur-until">Until (optional)</label>
                  <input
                    id="recur-until"
                    type="date"
                    .value=${this.recurUntil}
                    ?disabled=${this.busy}
                    @input=${e=>{this.recurUntil=e.target.value}}
                  />
                  <p class="hint">
                    Uses Home Assistant calendar websocket
                    <code>rrule</code> (local calendars and other backends that
                    support CREATE/UPDATE with recurrence). Weekly repeats on
                    the weekday of the start date.
                  </p>
                `:this.isRecurring&&"this"===this.recurScope?j`<p class="hint">
                    This occurrence only — change times/title here. To change
                    the repeat rule, choose “This and future” or “Entire
                    series”.
                  </p>`:W}
          </div>

          ${this.remindersAvailable?j`
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

          ${this.calendarMoveBlocked?j`<p class="hint warn">
                Recurring events cannot change calendars. Keep the original
                calendar to avoid orphaning series instances.
              </p>`:null}
          ${this.moveNote?j`<p class="hint ${this.calendarMoveBlocked?"warn":""}">
                ${this.moveNote}
              </p>`:null}
          ${this.errorMessage?j`<p class="hint error" role="alert">${this.errorMessage}</p>`:null}

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
    `}};Xe.styles=Ae,e([ue({attribute:!1})],Xe.prototype,"calendars",void 0),e([ue({attribute:!1})],Xe.prototype,"calendarColors",void 0),e([ue({attribute:!1})],Xe.prototype,"event",void 0),e([ue({attribute:!1})],Xe.prototype,"defaults",void 0),e([ue({type:Boolean})],Xe.prototype,"busy",void 0),e([ue({type:String})],Xe.prototype,"errorMessage",void 0),e([ue({type:Boolean})],Xe.prototype,"remindersAvailable",void 0),e([ue({attribute:!1})],Xe.prototype,"reminderDefaults",void 0),e([ue({attribute:!1})],Xe.prototype,"reminder",void 0),e([pe()],Xe.prototype,"summary",void 0),e([pe()],Xe.prototype,"description",void 0),e([pe()],Xe.prototype,"location",void 0),e([pe()],Xe.prototype,"start",void 0),e([pe()],Xe.prototype,"end",void 0),e([pe()],Xe.prototype,"calendar",void 0),e([pe()],Xe.prototype,"moveNote",void 0),e([pe()],Xe.prototype,"reminderEnabled",void 0),e([pe()],Xe.prototype,"reminderMinutes",void 0),e([pe()],Xe.prototype,"reminderNotify",void 0),e([pe()],Xe.prototype,"reminderMessage",void 0),e([pe()],Xe.prototype,"hydrateKey",void 0),e([pe()],Xe.prototype,"recurFreq",void 0),e([pe()],Xe.prototype,"recurUntil",void 0),e([pe()],Xe.prototype,"recurScope",void 0),Xe=e([de("hac-event-form")],Xe);let et=class extends oe{constructor(){super(...arguments),this.config={type:`custom:${fe}`},this.view="month",this.anchorDate=new Date,this.events=[],this.formOpen=!1,this.editing=null,this.formDefaults={},this.formBusy=!1,this.formError="",this.status=`HA Calendar Card v${me}`,this.statusKind="info",this.loading=!1,this.loadFailed=!1,this.pendingDuplicate=null,this.loadGeneration=0,this.hasLoadedOnce=!1,this.formReminder=null,this.hiddenCalendars=[],this.nowTick=Date.now(),this.weatherForecast=[],this.calendarColors={},this.pollTimer=null,this.clockTimer=null,this.hadHass=!1,this.weatherEntityLoaded=null,this.weatherFetchInFlight=!1,this.registryUnsub=null,this.colorLoadGeneration=0,this.subscribedConnection=null,this.panelStyledAncestors=[],this.panelResizeObserver=null,this.panelHost=null}setConfig(e){if(!e)throw new Error("Invalid configuration");const t=ze(e);this.config={title:"Calendar",entities:[...ye],initial_view:"month",day_start_hour:6,day_end_hour:22,show_demo_when_empty:!1,...e,weather_entity:t,type:e.type??`custom:${fe}`},this.view=this.config.initial_view??"month"}static getStubConfig(){return{title:"Calendar",entities:[...ye],initial_view:"month"}}getCardSize(){return 10}connectedCallback(){super.connectedCallback(),this.ensureFonts(),this.startTimers(),this.syncPanelLayout(),this.refreshCalendarColors(),this.subscribeRegistryColors()}firstUpdated(){this.syncPanelLayout()}disconnectedCallback(){super.disconnectedCallback(),this.clearTimers(),this.clearPanelLayout(),this.unsubscribeRegistryColors()}ensureFonts(){const e="ha-calendar-card-fonts";if(document.getElementById(e))return;const t=document.createElement("link");t.id=e,t.rel="stylesheet",t.href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Nunito:wght@500;600;700;800&display=swap",document.head.appendChild(t)}syncPanelLayout(){const e=this.closest("hui-panel-view");if(!e)return void this.clearPanelLayout();this.setAttribute("data-layout","panel");const t=[e,this.closest("hui-card")].filter(e=>Boolean(e));if(this.panelHost!==e){this.clearPanelAncestorStyles(),this.panelHost=e;for(const e of t)this.stylePanelAncestor(e),this.panelStyledAncestors.push(e);this.panelResizeObserver?.disconnect(),this.panelResizeObserver=new ResizeObserver(()=>this.applyPanelHeight()),this.panelResizeObserver.observe(e)}this.applyPanelHeight()}stylePanelAncestor(e){e.dataset.hacPanelStyled="1",e.style.setProperty("display","flex"),e.style.setProperty("flex-direction","column"),e.style.setProperty("flex","1 1 auto"),e.style.setProperty("height","100%"),e.style.setProperty("max-height","100%"),e.style.setProperty("min-height","0"),e.style.setProperty("overflow","hidden"),e.style.setProperty("box-sizing","border-box")}applyPanelHeight(){const e=this.panelHost;if(!e)return;const t=e.clientHeight;t>0?this.style.setProperty("--hac-panel-height",`${t}px`):this.style.setProperty("--hac-panel-height","calc(100dvh - var(--header-height, 56px) - var(--safe-area-inset-top, 0px) - var(--safe-area-inset-bottom, 0px))")}clearPanelAncestorStyles(){for(const e of this.panelStyledAncestors)if("1"===e.dataset.hacPanelStyled){delete e.dataset.hacPanelStyled;for(const t of["display","flex-direction","flex","height","max-height","min-height","overflow","box-sizing"])e.style.removeProperty(t)}this.panelStyledAncestors=[]}clearPanelLayout(){this.panelResizeObserver?.disconnect(),this.panelResizeObserver=null,this.panelHost=null,this.clearPanelAncestorStyles(),this.removeAttribute("data-layout"),this.style.removeProperty("--hac-panel-height")}startTimers(){this.clearTimers(),this.clockTimer=window.setInterval(()=>{this.nowTick=Date.now()},3e4),this.pollTimer=window.setInterval(()=>{this.refreshEvents({silent:!0}),this.refreshWeatherForecast(!0)},6e4)}clearTimers(){null!=this.clockTimer&&(window.clearInterval(this.clockTimer),this.clockTimer=null),null!=this.pollTimer&&(window.clearInterval(this.pollTimer),this.pollTimer=null)}updated(e){if(this.syncPanelLayout(),e.has("config")||e.has("anchorDate")||e.has("view"))return this.refreshEvents(),this.refreshWeatherForecast(!0),void(e.has("config")&&(this.refreshCalendarColors(),this.subscribeRegistryColors()));if(e.has("hass")){const e=Boolean(this.hass);e&&!this.hadHass?(this.hadHass=!0,this.refreshEvents(),this.refreshWeatherForecast(!0),this.refreshCalendarColors(),this.subscribeRegistryColors()):e?(this.refreshWeatherForecast(!1),this.subscribeRegistryColors()):(this.hadHass=!1,this.unsubscribeRegistryColors())}}entities(){return this.config.entities?.length?[...this.config.entities]:[...ye]}formCalendars(){const e=this.entities(),t=this.hass?new _e(this.hass).listWritableCalendars(e):e,r=this.editing?.calendar;return r&&!t.includes(r)?[r,...t]:t}calendarColor(e){if(this.calendarColors[e])return this.calendarColors[e];const t=this.entities();return Me(Math.max(0,t.indexOf(e)))}async refreshCalendarColors(){const e=this.entities(),t=++this.colorLoadGeneration,r=He(e,{},this.hass);if(this.calendarColors=r,!this.hass)return;const i=await async function(e,t){const r=[...new Set(t.filter(Boolean))],i={};if(!r.length)return i;try{const t=await e.callWS({type:"config/entity_registry/get_entries",entity_ids:r});for(const e of r){const r=Oe(t?.[e]);Te(r)&&(i[e]=Re(r))}return i}catch{}try{const t=await e.callWS({type:"config/entity_registry/list"}),s=new Map((t??[]).filter(e=>e?.entity_id).map(e=>[e.entity_id,e]));for(const e of r){const t=Oe(s.get(e));Te(t)&&(i[e]=Re(t))}}catch{}return i}(this.hass,e);t===this.colorLoadGeneration&&(this.calendarColors=He(e,i,this.hass))}subscribeRegistryColors(){const e=this.hass?.connection;e?.subscribeEvents&&(this.registryUnsub&&this.subscribedConnection===e||(this.unsubscribeRegistryColors(),this.subscribedConnection=e,e.subscribeEvents(()=>{this.refreshCalendarColors()},"entity_registry_updated").then(t=>{this.hass?.connection===e?(this.registryUnsub=t,this.subscribedConnection=e):t()}).catch(()=>{})))}unsubscribeRegistryColors(){if(this.registryUnsub){try{this.registryUnsub()}catch{}this.registryUnsub=null}this.subscribedConnection=null}calendarLabel(e){return e.replace(/^calendar\./,"").replace(/_/g," ")}filteredEvents(){if(!this.hiddenCalendars.length)return this.events;const e=new Set(this.hiddenCalendars);return this.events.filter(t=>!e.has(t.calendar))}toggleCalendarFilter(e){this.hiddenCalendars.includes(e)?this.hiddenCalendars=this.hiddenCalendars.filter(t=>t!==e):this.hiddenCalendars=[...this.hiddenCalendars,e]}range(){const e=new Date(this.anchorDate);if(e.setHours(0,0,0,0),"day"===this.view){const t=new Date(e);return t.setDate(t.getDate()+1),{start:e,end:t}}if("month"===this.view){const t=new Date(e.getFullYear(),e.getMonth(),1),r=(t.getDay()+6)%7;t.setDate(t.getDate()-r);const i=new Date(t);return i.setDate(i.getDate()+42),{start:t,end:i}}const t=(e.getDay()+6)%7;e.setDate(e.getDate()-t);const r=new Date(e);return r.setDate(r.getDate()+7),{start:e,end:r}}async refreshEvents(e){const t=++this.loadGeneration,r=Boolean(e?.silent)&&this.hasLoadedOnce;if(!this.hass)return this.events=this.demoEvents(),this.loadFailed=!1,this.hasLoadedOnce=!0,this.loading=!1,this.status="Preview mode — demo events (no hass)",void(this.statusKind="info");r||(this.loading=!0);const i=new _e(this.hass),{start:s,end:n}=this.range(),a=this.entities();try{const e=await i.getEvents(a,s,n);if(t!==this.loadGeneration)return;if(this.loadFailed=!1,this.hasLoadedOnce=!0,e.events.length){this.events=e.events;const t=e.errors.length?` · ${e.errors.length} calendar(s) failed`:"";this.status=`${e.events.length} event(s)${t}`,this.statusKind=e.errors.length?"warn":"info"}else e.anySuccess?(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.status=this.config.show_demo_when_empty?"No events — showing demo blocks":"No events in this range",this.statusKind="info"):(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.loadFailed=!this.config.show_demo_when_empty,this.status=e.errors.length?`Could not load: ${e.errors.join(", ")} — check entity ids`:"No calendars loaded",this.statusKind="error")}catch(e){if(t!==this.loadGeneration)return;this.events=[],this.loadFailed=!0,this.hasLoadedOnce=!0,this.status=`Load failed: ${e instanceof Error?e.message:String(e)}`,this.statusKind="error"}finally{t===this.loadGeneration&&(this.loading=!1)}}demoEvents(){const e=new Date(this.anchorDate);e.setHours(0,0,0,0);const t=(t,r,i,s,n)=>{const a=new Date(e);a.setDate(a.getDate()+t),a.setHours(r,0,0,0);const o=new Date(a);return o.setHours(r+i,0,0,0),{uid:`demo-${s}-${t}-${r}`,summary:s,start:a.toISOString(),end:o.toISOString(),calendar:n}},r=this.entities();return[t(0,9,1,"Morning standup",r[0]??"calendar.family"),t(0,11,2,"Deep work",r[1]??"calendar.personal"),t(1,14,1,"School pickup",r[0]??"calendar.family"),t(2,10,1,"Dentist",r[2]??"calendar.work"),t(4,16,2,"Soccer practice",r[0]??"calendar.family"),t(5,12,1,"Lunch with Sam",r[1]??"calendar.personal")]}shift(e){const t=new Date(this.anchorDate);"month"===this.view?t.setMonth(t.getMonth()+e):"day"===this.view?t.setDate(t.getDate()+e):t.setDate(t.getDate()+7*e),this.anchorDate=t}remindersAvailable(){return Boolean(this.hass&&new Ee(this.hass).isAvailable())}reminderDefaults(){return{minutes_before:this.config.reminder_minutes_before??30,notify_service:this.config.reminder_notify_service??"notify.mobile_app_phone"}}weatherEntityId(){return ze(this.config)}weather(){return function(e,t,r){if(!e||!t)return null;const i=e.states[t];if(!i)return null;const s=i.attributes??{},n=r&&r.length?r:Fe(s);return{entityId:t,state:i.state,temperature:"number"==typeof s.temperature?s.temperature:void 0,unit:"string"==typeof s.temperature_unit?s.temperature_unit:"string"==typeof s.unit_of_measurement?s.unit_of_measurement:"°",humidity:"number"==typeof s.humidity?s.humidity:void 0,forecast:n}}(this.hass,this.weatherEntityId(),this.weatherForecast)}async refreshWeatherForecast(e=!1){const t=this.weatherEntityId();if(!this.hass||!t)return this.weatherForecast=[],void(this.weatherEntityLoaded=null);if((e||this.weatherEntityLoaded!==t||!this.weatherForecast.length)&&!this.weatherFetchInFlight){this.weatherFetchInFlight=!0;try{const e=await async function(e,t){const r=e.states[t];if(r){const e=Fe(r.attributes??{});if(e.length)return e}const i=["daily","twice_daily","hourly"];for(const r of i)try{const i=Ie(await e.callService("weather","get_forecasts",{type:r},{entity_id:t},!1,!0),t);if(i.length)return i}catch{}return[]}(this.hass,t);this.weatherForecast=e,this.weatherEntityLoaded=t}catch{}finally{this.weatherFetchInFlight=!1}}}openCreate(e){this.editing=null,this.formError="",this.formBusy=!1,this.formReminder=null,this.formDefaults={start:(e?.start??new Date).toISOString(),end:(e?.end??new Date(Date.now()+36e5)).toISOString(),calendar:this.entities()[0]},this.formOpen=!0}openEdit(e){this.editing=e,this.formError="",this.formBusy=!1,this.formDefaults={},this.formReminder=null,this.formOpen=!0,this.loadReminderForEvent(e)}async loadReminderForEvent(e){if(this.hass&&this.remindersAvailable())try{const t=await new Ee(this.hass).getReminder(e.calendar,e.uid);if(!this.formOpen||this.editing?.uid!==e.uid)return;this.formReminder=t?{enabled:t.enabled,minutes_before:t.minutes_before,notify_service:t.notify_service,message:t.message??""}:null}catch{}}async syncReminder(e){if(!this.hass||!e.reminder||!this.remindersAvailable())return null;const t=new Ee(this.hass);if(!e.reminder.enabled)return await t.clearReminder(e.calendar,e.uid),"reminder cleared";if(!e.reminder.notify_service.trim())throw new Error("Reminder notify service is required");return await t.setReminder({calendar_entity_id:e.calendar,event_uid:e.uid,event_start:e.start,event_summary:e.summary,minutes_before:e.reminder.minutes_before,notify_service:e.reminder.notify_service.trim(),message:e.reminder.message,enabled:!0}),"reminder saved"}async onFormSave(e){const{mode:t,input:r,original:i,reminder:s,crossCalendarMove:n,recurrenceScope:a}=e.detail;if(!this.hass)return void(this.formError="No Home Assistant connection — cannot save.");this.formBusy=!0,this.formError="";const o=new _e(this.hass);let l=null;const d=Boolean(i&&(n||r.calendar&&r.calendar!==i.calendar));try{if("create"===t){const e=await o.createEvent(r);e.uid&&s?.enabled?l=await this.syncReminder({calendar:r.calendar,uid:e.uid,start:r.start,summary:r.summary,reminder:s}):s?.enabled&&!e.uid&&(l="event created; reminder skipped (no confirmed event uid yet)"),this.formOpen=!1,this.status=`Created “${r.summary}” on ${r.calendar}${r.rrule?" (recurring)":""}${l?` · ${l}`:""}`,this.statusKind="info"}else if(d&&i){if(i.recurring||i.rrule)return void(this.formError="Recurring events cannot change calendars. Keep the original calendar or recreate as a one-off.");const e=await o.moveEventToCalendar(i,r.calendar,{...r,calendar:r.calendar,rrule:void 0});if("moved"===e.status){if(this.remindersAvailable())try{await new Ee(this.hass).clearReminder(i.calendar,i.uid)}catch{}s&&(l=await this.syncReminder({calendar:r.calendar,uid:e.newUid,start:r.start,summary:r.summary,reminder:s})),this.formOpen=!1,this.pendingDuplicate=null,this.status=`Moved “${r.summary}” ${i.calendar} → ${r.calendar}${l?` · ${l}`:""}`,this.statusKind="info"}else{if("create_failed"===e.status)return this.formError=`Move aborted (create failed): ${e.error}`,this.status=this.formError,void(this.statusKind="error");if("delete_failed"===e.status)this.formOpen=!1,this.pendingDuplicate=e.pending,this.status=`Copy exists on ${r.calendar}, but the old event could not be removed.`,this.statusKind="warn";else if("blocked_recurring"===e.status)return void(this.formError=e.reason)}}else if(i){const{recurrenceId:e,recurrenceRange:t}=function(e,t="this"){if(!Boolean(e.recurring||e.rrule||e.recurrence_id))return{};if("series"===t)return{};const r=e.recurrence_id;return r?"future"===t?{recurrenceId:r,recurrenceRange:"THISANDFUTURE"}:{recurrenceId:r}:{}}(i,a??"this");await o.updateEvent(i.calendar,i.uid,{...r,calendar:i.calendar},e,t),s&&(l=await this.syncReminder({calendar:i.calendar,uid:i.uid,start:r.start,summary:r.summary,reminder:s})),this.formOpen=!1,this.status=`Updated “${r.summary}”${i.rrule||r.rrule?` · ${a??"this"}`:""}${l?` · ${l}`:""}`,this.statusKind="info"}await this.refreshEvents()}catch(e){this.formError=e instanceof Error?e.message:String(e),this.status=this.formError,this.statusKind="error"}finally{this.formBusy=!1}}async cleanupDuplicate(){if(!this.hass||!this.pendingDuplicate)return;const e=this.pendingDuplicate,t=new _e(this.hass);try{await t.deleteEvent(e.entityId,e.uid),this.pendingDuplicate=null,this.status=`Removed old copy of “${e.summary}” from ${e.entityId}`,this.statusKind="info",await this.refreshEvents()}catch(e){this.status=`Cleanup failed: ${e instanceof Error?e.message:String(e)}`,this.statusKind="error"}}dismissDuplicate(){this.pendingDuplicate=null,this.status="Duplicate warning dismissed — old copy may still exist",this.statusKind="warn"}rangeLabel(){if("month"===this.view)return this.anchorDate.toLocaleDateString(void 0,{month:"long",year:"numeric"});const{start:e,end:t}=this.range();if("day"===this.view)return e.toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"});const r=new Date(t);r.setDate(r.getDate()-1);const i={month:"short",day:"numeric"};return`${e.toLocaleDateString(void 0,i)} – ${r.toLocaleDateString(void 0,i)}`}clockDateLabel(){return this.nowTick,(new Date).toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}clockTimeLabel(){return this.nowTick,(new Date).toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"})}render(){const e=this.config.title??"Calendar",t=this.entities(),r=this.filteredEvents(),i=this.weather(),s=i?.forecast?.slice(0,7)??[],n=this.hasLoadedOnce&&!this.loading&&!this.loadFailed&&0===r.length&&Boolean(this.hass)&&!this.config.show_demo_when_empty,a=this.hasLoadedOnce&&!this.loading&&this.loadFailed&&!this.formOpen,o=this.loading&&this.hasLoadedOnce;return j`
      <div class="shell">
        ${this.pendingDuplicate?j`
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
            ${i?j`
                  <div class="temp">
                    ${Le(i.state)}
                    ${null!=i.temperature?`${Math.round(i.temperature)}${i.unit??"°"}`:""}
                  </div>
                  <div class="cond">${l=i.state,Ne[l]??l.replace(/-/g," ")}</div>
                `:j`<div class="weather-stub">
                  ${this.weatherEntityId()?"Weather unavailable":"Add weather_entity"}
                </div>`}
          </div>
          <div class="forecast-strip" aria-label="Forecast">
            ${s.length?s.map(e=>{const t=new Date(e.datetime);return j`
                    <div class="forecast-day">
                      <span class="d"
                        >${t.toLocaleDateString(void 0,{weekday:"short"})}</span
                      >
                      <span class="g">${Le(e.condition)}</span>
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
            ${t.map(e=>{const t=!this.hiddenCalendars.includes(e);return j`
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
          ${this.loading&&!this.hasLoadedOnce?j`
                <div class="state-panel" data-kind="loading">
                  <div
                    class="spinner"
                    style="width:1.4rem;height:1.4rem;border:2px solid var(--hac-line-strong);border-top-color:var(--hac-accent);border-radius:50%;animation:spin 0.7s linear infinite"
                  ></div>
                  <h2>Loading calendar</h2>
                  <p>Fetching events for ${this.rangeLabel()}.</p>
                </div>
              `:W}
          ${o?j`<div class="loading-veil"></div>`:W}
          ${a?j`
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
          ${n&&"month"!==this.view?j`
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

          ${"month"===this.view?j`
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
              `:j`
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

          ${this.formOpen?j`
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
                  @form-cancel=${()=>{this.formBusy||(this.formOpen=!1)}}
                  @form-save=${this.onFormSave}
                ></hac-event-form>
              `:W}
        </div>

        <div class="status" data-kind=${this.statusKind}>
          ${this.loading?j`<span class="spinner" aria-hidden="true"></span>`:W}
          <span>${this.status}</span>
          ${"error"!==this.statusKind||a?W:j`<button
                class="ghost-btn"
                type="button"
                style="min-height:1.75rem;padding:0.2rem 0.6rem;font-size:0.78rem"
                @click=${()=>{this.refreshEvents()}}
              >
                Retry
              </button>`}
        </div>
      </div>
    `;var l}};et.styles=[Se,a`
      :host {
        position: relative;
      }
    `],e([ue({attribute:!1})],et.prototype,"hass",void 0),e([pe()],et.prototype,"config",void 0),e([pe()],et.prototype,"view",void 0),e([pe()],et.prototype,"anchorDate",void 0),e([pe()],et.prototype,"events",void 0),e([pe()],et.prototype,"formOpen",void 0),e([pe()],et.prototype,"editing",void 0),e([pe()],et.prototype,"formDefaults",void 0),e([pe()],et.prototype,"formBusy",void 0),e([pe()],et.prototype,"formError",void 0),e([pe()],et.prototype,"status",void 0),e([pe()],et.prototype,"statusKind",void 0),e([pe()],et.prototype,"loading",void 0),e([pe()],et.prototype,"loadFailed",void 0),e([pe()],et.prototype,"pendingDuplicate",void 0),e([pe()],et.prototype,"loadGeneration",void 0),e([pe()],et.prototype,"hasLoadedOnce",void 0),e([pe()],et.prototype,"formReminder",void 0),e([pe()],et.prototype,"hiddenCalendars",void 0),e([pe()],et.prototype,"nowTick",void 0),e([pe()],et.prototype,"weatherForecast",void 0),e([pe()],et.prototype,"calendarColors",void 0),et=e([de(fe)],et),window.customCards=window.customCards||[],window.customCards.push({type:fe,name:"HA Calendar Card",description:"Skylight-style month/week/day calendar with create/edit and safe calendar moves",preview:!0}),console.info(`%c HA-CALENDAR-CARD %c ${me} `,"background:#3d9b8f;color:#fff;padding:2px 4px;border-radius:4px 0 0 4px","background:#2c3340;color:#fff;padding:2px 4px;border-radius:0 4px 4px 0");export{et as HaCalendarCard};
//# sourceMappingURL=ha-calendar-card.js.map
