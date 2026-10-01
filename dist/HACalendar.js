function t(t,e,i,r){var a,s=arguments.length,n=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(n=(s<3?a(n):s>3?a(e,i,n):a(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new s(i,t,r)},o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:d,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!d(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:a}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const s=r?.call(this);a?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),a=e.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=r;const s=a.fromAttribute(e,t.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(t,e,i,r=!1,a){if(void 0!==t){const s=this.constructor;if(!1===r&&(a=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??$)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:a},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==a||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[y("elementProperties")]=new Map,_[y("finalized")]=new Map,v?.({ReactiveElement:_}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=t=>t,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+D,O=`<${C}>`,H=document,P=()=>H.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,T="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,R=/>/g,L=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,B=/"/g,j=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),K=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Y=new WeakMap,q=H.createTreeWalker(H,129);function V(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,r=[];let a,s=2===e?"<svg>":3===e?"<math>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let o,d,c=-1,l=0;for(;l<i.length&&(n.lastIndex=l,d=n.exec(i),null!==d);)l=n.lastIndex,n===U?"!--"===d[1]?n=z:void 0!==d[1]?n=R:void 0!==d[2]?(j.test(d[2])&&(a=RegExp("</"+d[2],"g")),n=L):void 0!==d[3]&&(n=L):n===L?">"===d[0]?(n=a??U,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,o=d[1],n=void 0===d[3]?L:'"'===d[3]?B:I):n===B||n===I?n=L:n===z||n===R?n=U:(n=L,a=void 0);const h=n===L&&t[e+1].startsWith("/>")?" ":"";s+=n===U?i+O:c>=0?(r.push(o),i.slice(0,c)+A+i.slice(c)+D+h):i+D+(-2===c?e:h)}return[V(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class J{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let a=0,s=0;const n=t.length-1,o=this.parts,[d,c]=G(t,e);if(this.el=J.createElement(d,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=q.nextNode())&&o.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(A)){const e=c[s++],i=r.getAttribute(t).split(D),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(D)&&(o.push({type:6,index:a}),r.removeAttribute(t));if(j.test(r.tagName)){const t=r.textContent.split(D),e=t.length-1;if(e>0){r.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],P()),q.nextNode(),o.push({type:2,index:++a});r.append(t[e],P())}}}else if(8===r.nodeType)if(r.data===C)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=r.data.indexOf(D,t+1));)o.push({type:7,index:a}),t+=D.length-1}a++}}static createElement(t,e){const i=H.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,r){if(e===K)return e;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const s=N(e)?void 0:e._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),void 0===s?a=void 0:(a=new s(t),a._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(e=Z(t,a._$AS(t,e.values),a,r)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??H).importNode(e,!0);q.currentNode=r;let a=q.nextNode(),s=0,n=0,o=i[0];for(;void 0!==o;){if(s===o.index){let e;2===o.type?e=new X(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new at(a,this,t)),this._$AV.push(e),o=i[++n]}s!==o?.index&&(a=q.nextNode(),s++)}return q.currentNode=H,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),N(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Q(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new J(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const a of t)r===e.length?e.push(i=new X(this.O(P()),this.O(P()),this,this.options)):i=e[r],i._$AI(a),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,a){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,r){const a=this.strings;let s=!1;if(void 0===a)t=Z(this,t,e,0),s=!N(t)||t!==this._$AH&&t!==K,s&&(this._$AH=t);else{const r=t;let n,o;for(t=a[0],n=0;n<a.length-1;n++)o=Z(this,r[i+n],e,n),o===K&&(o=this._$AH[n]),s||=!N(o)||o!==this._$AH[n],o===W?t=W:t!==W&&(t+=(o??"")+a[n+1]),this._$AH[n]=o}s&&!r&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class rt extends tt{constructor(t,e,i,r,a){super(t,e,i,r,a),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===K)return;const i=this._$AH,r=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==W&&(i===W||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const st=x.litHtmlPolyfillSupport;st?.(J,X),(x.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class ot extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let a=r._$litPart$;if(void 0===a){const t=i?.renderBefore??null;r._$litPart$=a=new X(e.insertBefore(P(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const dt=nt.litElementPolyfillSupport;dt?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},ht=(t=lt,e,i)=>{const{kind:r,metadata:a}=i;let s=globalThis.litPropertyMetadata.get(a);if(void 0===s&&globalThis.litPropertyMetadata.set(a,s=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,a,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const a=this[r];e.call(this,i),this.requestUpdate(r,a,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};function ut(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return ut({...t,state:!0,attribute:!1})}const mt="0.4.0",ft="ha-calendar-card",gt=56,vt=["calendar.family","calendar.personal","calendar.work"];function yt(t){if(t)return"string"==typeof t?t:"dateTime"in t&&t.dateTime?t.dateTime:"date"in t&&t.date?t.date:void 0}function bt(t,e){const i=yt(t.start),r=yt(t.end);if(!i||!r)return null;const a=t.rrule??void 0;return{uid:t.uid??`${e}:${i}:${t.summary??"event"}`,summary:t.summary??"(no title)",description:t.description??void 0,location:t.location??void 0,start:i,end:r,all_day:t.all_day??(s=t.start,s&&"string"!=typeof s?Boolean(s.date&&!s.dateTime):Boolean(s&&/^\d{4}-\d{2}-\d{2}$/.test(s))),calendar:e,recurring:Boolean(a||t.recurrence_id),rrule:a,recurrence_id:t.recurrence_id??void 0};var s}function $t(t){return{summary:t.summary,description:t.description??"",location:t.location??"",dtstart:t.all_day?t.start.slice(0,10):t.start,dtend:t.all_day?t.end.slice(0,10):t.end}}class wt{constructor(t){this.hass=t}listCalendarEntities(t){return t?.length?t:Object.keys(this.hass.states).filter(t=>t.startsWith("calendar.")).sort()}async getEvents(t,e,i){const r=[],a=[];let s=!1;for(const n of t)try{const t=await this.fetchEntityEvents(n,e,i);s=!0,r.push(...t)}catch(t){a.push(n),console.warn(`[ha-calendar-card] failed to load ${n}:`,t instanceof Error?t.message:t)}return{events:r,errors:a,anySuccess:s}}async fetchEntityEvents(t,e,i){if(this.hass.callApi)try{const r=`?start=${encodeURIComponent(e.toISOString())}&end=${encodeURIComponent(i.toISOString())}`;return(await this.hass.callApi("GET",`calendars/${t}${r}`)??[]).map(e=>bt(e,t)).filter(t=>null!==t)}catch{}const r=await this.hass.callService("calendar","get_events",{entity_id:t,start_date_time:e.toISOString(),end_date_time:i.toISOString()},void 0,void 0,!0);let a;if(r&&"object"==typeof r){const t=r;a=t.response&&"object"==typeof t.response?t.response:t}return(a?.[t]?.events??[]).map(e=>bt(e,t)).filter(t=>null!==t)}async createEvent(t){try{await this.hass.callWS({type:"calendar/event/create",entity_id:t.calendar,event:$t(t)})}catch(e){try{await this.hass.callService("calendar","create_event",{entity_id:t.calendar,summary:t.summary,description:t.description??"",location:t.location??"",start_date_time:t.all_day?void 0:t.start,end_date_time:t.all_day?void 0:t.end,start_date:t.all_day?t.start.slice(0,10):void 0,end_date:t.all_day?t.end.slice(0,10):void 0})}catch{throw e instanceof Error?e:new Error(String(e))}}const e=await this.findCreatedEvent(t);return{uid:e?.uid}}async findCreatedEvent(t){const e=new Date(t.start),i=new Date(t.end),r=new Date(e.getTime()-6e4),a=new Date(i.getTime()+6e4);try{const{events:i}=await this.getEvents([t.calendar],r,a);return i.find(e=>function(t,e){return t.summary===e.summary&&t.start===e.start&&t.end===e.end}(e,{summary:t.summary,start:t.all_day?t.start.slice(0,10):t.start,end:t.all_day?t.end.slice(0,10):t.end}))??i.find(i=>i.summary===t.summary&&Math.abs(new Date(i.start).getTime()-e.getTime())<12e4)??null}catch{return null}}async updateEvent(t,e,i,r){try{return void await this.hass.callWS({type:"calendar/event/update",entity_id:t,uid:e,recurrence_id:r,event:$t(i)})}catch(r){try{await this.hass.callService("calendar","update_event",{entity_id:t,uid:e,summary:i.summary,description:i.description,location:i.location,start_date_time:i.all_day?void 0:i.start,end_date_time:i.all_day?void 0:i.end})}catch{throw r instanceof Error?r:new Error(String(r))}}}async deleteEvent(t,e,i){try{return void await this.hass.callWS({type:"calendar/event/delete",entity_id:t,uid:e,recurrence_id:i})}catch(i){try{await this.hass.callService("calendar","delete_event",{entity_id:t,uid:e})}catch{throw i instanceof Error?i:new Error(String(i))}}}async moveEventToCalendar(t,e,i){if(t.recurring||t.rrule)return{status:"blocked_recurring",reason:"Moving recurring events is disabled in phase 1 — change calendars only for one-off events."};if(t.calendar===e)return{status:"moved",newUid:t.uid};const r={summary:i?.summary??t.summary,description:i?.description??t.description,location:i?.location??t.location,start:i?.start??t.start,end:i?.end??t.end,all_day:i?.all_day??t.all_day,calendar:e};let a;try{if(a=(await this.createEvent(r)).uid,!a){const t=await this.findCreatedEvent(r);a=t?.uid}if(!a)return{status:"create_failed",error:"Created on target calendar but could not confirm the new event id — source left untouched."}}catch(t){return{status:"create_failed",error:t instanceof Error?t.message:String(t)}}try{return await this.deleteEvent(t.calendar,t.uid,t.recurrence_id),{status:"moved",newUid:a}}catch(i){const r={entityId:t.calendar,uid:t.uid,summary:t.summary,targetCalendar:e,newUid:a};return{status:"delete_failed",newUid:a,error:i instanceof Error?i.message:String(i),duplicate:!0,pending:r}}}}const _t=n`
  :host {
    --hac-sky-top: #f3f8fc;
    --hac-sky-mid: #d9ebf5;
    --hac-sky-deep: #b9d6e8;
    --hac-sun: rgba(255, 196, 110, 0.45);
    --hac-ink: #15252e;
    --hac-muted: #5b7380;
    --hac-accent: #0a6e78;
    --hac-accent-hover: #085960;
    --hac-accent-soft: #c5e6ea;
    --hac-line: rgba(21, 37, 46, 0.1);
    --hac-line-strong: rgba(21, 37, 46, 0.16);
    --hac-event: #1a6f8a;
    --hac-event-text: #f7fcfe;
    --hac-danger: #a33a3a;
    --hac-warn: #8a5a12;
    --hac-warn-bg: #fff4df;
    --hac-surface: rgba(255, 255, 255, 0.78);
    --hac-surface-solid: #ffffff;
    --hac-radius: 14px;
    --hac-font-display: "Fraunces", "Iowan Old Style", "Palatino Linotype",
      Palatino, serif;
    --hac-font-body: "Outfit", "Avenir Next", "Segoe UI", sans-serif;
    --hac-cal-0: #1a6f8a;
    --hac-cal-1: #2f7d57;
    --hac-cal-2: #b85c38;
    --hac-cal-3: #3d6ea5;
    --hac-cal-4: #7a5c2e;
    --hac-hour-height: 56px;

    display: block;
    position: relative;
    font-family: var(--hac-font-body);
    color: var(--hac-ink);
    background:
      radial-gradient(
        120% 80% at 85% -10%,
        var(--hac-sun) 0%,
        transparent 55%
      ),
      linear-gradient(
        165deg,
        var(--hac-sky-top) 0%,
        var(--hac-sky-mid) 48%,
        var(--hac-sky-deep) 100%
      );
    border-radius: var(--hac-radius);
    overflow: hidden;
    min-height: 440px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
    animation: host-in 280ms ease;
  }

  @keyframes host-in {
    from {
      opacity: 0.65;
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
    height: 100%;
    min-height: 440px;
  }

  header.toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem 0.65rem;
    padding: 0.85rem 1rem 0.75rem;
    border-bottom: 1px solid var(--hac-line);
    background: var(--hac-surface);
    backdrop-filter: blur(10px);
  }

  .brand {
    font-family: var(--hac-font-display);
    font-size: clamp(1.25rem, 3.5vw, 1.55rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0;
    flex: 1 1 auto;
    min-width: 8rem;
    line-height: 1.1;
  }

  .toolbar-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.45rem;
    margin-left: auto;
  }

  .nav-group {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .view-toggle {
    display: inline-flex;
    border: 1px solid var(--hac-line-strong);
    border-radius: 999px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.7);
  }

  .view-toggle button {
    font: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    border: 0;
    background: transparent;
    color: var(--hac-muted);
    padding: 0.4rem 0.85rem;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease;
  }

  .view-toggle button[aria-pressed="true"] {
    background: var(--hac-accent);
    color: #fff;
  }

  .nav-btn,
  .primary-btn,
  .ghost-btn {
    font: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid var(--hac-line-strong);
    background: var(--hac-surface-solid);
    color: var(--hac-ink);
    padding: 0.4rem 0.75rem;
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

  .nav-btn:active,
  .ghost-btn:active,
  .primary-btn:active {
    transform: translateY(0);
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

  .grid-wrap {
    flex: 1;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
  }

  .status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    font-size: 0.82rem;
    color: var(--hac-muted);
    border-top: 1px solid var(--hac-line);
    background: var(--hac-surface);
  }

  .status[data-kind="error"] {
    color: var(--hac-danger);
    background: #fdf2f2;
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
    border-bottom: 1px solid rgba(138, 90, 18, 0.22);
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
    border: 1px solid rgba(138, 90, 18, 0.35);
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
    background: linear-gradient(
      180deg,
      rgba(243, 248, 252, 0.55) 0%,
      rgba(217, 235, 245, 0.82) 100%
    );
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
    background: linear-gradient(145deg, #fff 0%, var(--hac-accent-soft) 100%);
    border: 1px solid var(--hac-line);
    box-shadow: 0 8px 20px rgba(21, 37, 46, 0.08);
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
    background: rgba(21, 37, 46, 0.25);
  }

  .state-panel h2 {
    font-family: var(--hac-font-display);
    font-size: 1.2rem;
    margin: 0;
    font-weight: 600;
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
    background: rgba(243, 248, 252, 0.35);
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

  @media (max-width: 640px) {
    :host {
      min-height: 380px;
      border-radius: 12px;
    }

    .shell {
      min-height: 380px;
    }

    header.toolbar {
      padding: 0.75rem 0.75rem 0.65rem;
      gap: 0.5rem;
    }

    .brand {
      flex: 1 1 100%;
    }

    .toolbar-controls {
      width: 100%;
      margin-left: 0;
      justify-content: space-between;
    }

    .view-toggle button {
      padding: 0.4rem 0.7rem;
    }

    .status {
      font-size: 0.78rem;
      padding: 0.5rem 0.75rem;
    }
  }
`,xt=n`
  :host {
    display: block;
    min-height: 100%;
    --hac-line: rgba(21, 37, 46, 0.1);
    --hac-line-strong: rgba(21, 37, 46, 0.16);
    --hac-muted: #5b7380;
    --hac-ink: #15252e;
    --hac-event: #1a6f8a;
    --hac-event-text: #f7fcfe;
    --hac-accent: #0a6e78;
    --hac-cal-0: #1a6f8a;
    --hac-cal-1: #2f7d57;
    --hac-cal-2: #b85c38;
    --hac-cal-3: #3d6ea5;
    --hac-cal-4: #7a5c2e;
    --hac-font-body: "Outfit", "Avenir Next", "Segoe UI", sans-serif;
    font-family: var(--hac-font-body);
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
    background: rgba(243, 248, 252, 0.92);
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
    font-weight: 500;
    color: var(--hac-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .day-head .num {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--hac-ink);
    letter-spacing: 0;
    text-transform: none;
  }

  .day-head[data-today="true"] {
    background: rgba(10, 110, 120, 0.1);
  }

  .day-head[data-today="true"] .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    margin: 0 auto;
    border-radius: 50%;
    background: var(--hac-accent);
    color: #fff;
  }

  .hours {
    display: flex;
    flex-direction: column;
    position: sticky;
    left: 0;
    z-index: 1;
    background: rgba(243, 248, 252, 0.92);
  }

  .hour-label {
    height: var(--hac-hour-height, 56px);
    font-size: 0.68rem;
    font-weight: 500;
    color: var(--hac-muted);
    text-align: right;
    padding: 0.15rem 0.45rem 0 0;
    border-right: 1px solid var(--hac-line);
    box-sizing: border-box;
  }

  .day-col {
    position: relative;
    border-left: 1px solid var(--hac-line);
    background: rgba(255, 255, 255, 0.22);
  }

  .day-col[data-today="true"] {
    background: rgba(10, 110, 120, 0.05);
  }

  .hour-line {
    height: var(--hac-hour-height, 56px);
    box-sizing: border-box;
    border-bottom: 1px dashed var(--hac-line);
  }

  .now-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: #d4553a;
    z-index: 2;
    pointer-events: none;
    box-shadow: 0 0 0 2px rgba(212, 85, 58, 0.15);
  }

  .now-line::before {
    content: "";
    position: absolute;
    left: -4px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d4553a;
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
    line-height: 1.25;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 1px 0 rgba(21, 37, 46, 0.08);
    transition: transform 140ms ease, box-shadow 140ms ease, filter 140ms ease;
    -webkit-tap-highlight-color: transparent;
  }

  .event-block:hover,
  .event-block:focus-visible {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 6px 14px rgba(21, 37, 46, 0.16);
    filter: brightness(1.04);
    outline: none;
  }

  .event-block strong {
    display: block;
    font-weight: 600;
  }

  .event-block .cal-tag {
    display: block;
    opacity: 0.85;
    font-size: 0.64rem;
    font-weight: 500;
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
`,kt=n`
  :host {
    --hac-ink: #15252e;
    --hac-muted: #5b7380;
    --hac-accent: #0a6e78;
    --hac-accent-hover: #085960;
    --hac-line: rgba(21, 37, 46, 0.12);
    --hac-danger: #a33a3a;
    --hac-warn: #8a5a12;
    --hac-font-display: "Fraunces", "Iowan Old Style", Palatino, serif;
    --hac-font-body: "Outfit", "Avenir Next", "Segoe UI", sans-serif;
    font-family: var(--hac-font-body);
  }

  .form-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(21, 37, 46, 0.38);
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
    box-shadow: 0 -10px 36px rgba(21, 37, 46, 0.22);
    animation: slide-up 220ms ease;
  }

  @media (min-width: 640px) {
    .form-panel {
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(21, 37, 46, 0.22);
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
  }

  .form-sub {
    margin: 0 0 0.75rem;
    font-size: 0.82rem;
    color: var(--hac-muted);
  }

  label {
    display: block;
    font-size: 0.72rem;
    font-weight: 600;
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
    background: #f4f8fa;
    color: var(--hac-ink);
    min-height: 2.5rem;
    transition: border-color 140ms ease, box-shadow 140ms ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: var(--hac-accent);
    box-shadow: 0 0 0 3px rgba(10, 110, 120, 0.15);
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
    font-weight: 500;
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
    background: #fdf2f2;
    border: 1px solid rgba(163, 58, 58, 0.2);
    border-radius: 10px;
    padding: 0.55rem 0.7rem;
  }
`;function Et(t,e){const i=new Date(t);return i.setDate(i.getDate()+e),i}function St(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function At(t){if(/^\d{4}-\d{2}-\d{2}$/.test(t)){const[e,i,r]=t.split("-").map(Number);return new Date(e,i-1,r)}return new Date(t)}let Dt=class extends ot{constructor(){super(...arguments),this.mode="week",this.anchorDate=new Date,this.events=[],this.calendars=[],this.dayStartHour=6,this.dayEndHour=22}get days(){const t=function(t){const e=new Date(t);return e.setHours(0,0,0,0),e}(this.anchorDate);if("day"===this.mode)return[t];const e=(t.getDay()+6)%7,i=Et(t,-e);return Array.from({length:7},(t,e)=>Et(i,e))}get hours(){const t=[];for(let e=this.dayStartHour;e<this.dayEndHour;e++)t.push(e);return t}calendarColor(t){return`var(--hac-cal-${Math.max(0,this.calendars.indexOf(t))%5})`}eventStyle(t,e){const i=At(t.start),r=At(t.end),a=new Date(e);a.setHours(this.dayStartHour,0,0,0);const s=new Date(e);if(s.setHours(this.dayEndHour,0,0,0),r<=a||i>=s)return null;const n=i<a?a:i,o=r>s?s:r,d=60*(n.getHours()-this.dayStartHour)+n.getMinutes(),c=Math.max(22,(o.getTime()-n.getTime())/6e4);return`top:${d/60*gt}px;height:${c/60*gt}px;background:${this.calendarColor(t.calendar)};`}nowLineTop(t){const e=new Date;if(!St(e,t))return null;if(e.getHours()<this.dayStartHour||e.getHours()>=this.dayEndHour)return null;return(60*(e.getHours()-this.dayStartHour)+e.getMinutes())/60*gt}onEventClick(t){this.dispatchEvent(new CustomEvent("event-select",{detail:t,bubbles:!0,composed:!0}))}onSlotCreate(t,e){const i=new Date(t);i.setHours(e,0,0,0);const r=new Date(i);r.setHours(e+1,0,0,0),this.dispatchEvent(new CustomEvent("slot-create",{detail:{start:i,end:r},bubbles:!0,composed:!0}))}hourFromPointer(t,e){const i=e.getBoundingClientRect(),r=t.clientY-i.top;return this.dayStartHour+Math.floor(r/gt)}render(){const t=this.hours,e=this.days,i=t.length*gt,r=new Date;return F`
      <div
        class="time-grid"
        data-mode=${this.mode}
        style="--hac-hour-height:${gt}px"
      >
        <div class="corner"></div>
        ${e.map(t=>{const e=St(t,r);return F`
            <div class="day-head" data-today=${e?"true":"false"}>
              <span
                >${t.toLocaleDateString(void 0,{weekday:"short"})}</span
              >
              <span class="num">${t.getDate()}</span>
            </div>
          `})}

        <div class="hours" style="height:${i}px">
          ${t.map(t=>F`<div class="hour-label">
                ${String(t).padStart(2,"0")}:00
              </div>`)}
        </div>

        ${e.map(e=>{const a=St(e,r),s=this.nowLineTop(e);return F`
            <div
              class="day-col"
              data-today=${a?"true":"false"}
              style="height:${i}px"
              @dblclick=${t=>{const i=this.hourFromPointer(t,t.currentTarget);this.onSlotCreate(e,i)}}
            >
              ${t.map(()=>F`<div class="hour-line"></div>`)}
              ${null!==s?F`<div class="now-line" style="top:${s}px"></div>`:W}
              ${this.events.map(t=>{const i=this.eventStyle(t,e);if(!i)return W;const r=t.calendar.replace(/^calendar\./,"");return F`
                  <div
                    class="event-block"
                    style=${i}
                    role="button"
                    tabindex="0"
                    @click=${e=>{e.stopPropagation(),this.onEventClick(t)}}
                    @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.onEventClick(t))}}
                  >
                    <strong>${t.summary}</strong>
                    <span class="cal-tag">${r}</span>
                  </div>
                `})}
            </div>
          `})}
      </div>
    `}};Dt.styles=xt,t([ut({attribute:!1})],Dt.prototype,"mode",void 0),t([ut({attribute:!1})],Dt.prototype,"anchorDate",void 0),t([ut({attribute:!1})],Dt.prototype,"events",void 0),t([ut({attribute:!1})],Dt.prototype,"calendars",void 0),t([ut({type:Number})],Dt.prototype,"dayStartHour",void 0),t([ut({type:Number})],Dt.prototype,"dayEndHour",void 0),Dt=t([ct("hac-time-grid")],Dt);let Ct=class extends ot{constructor(){super(...arguments),this.calendars=[],this.event=null,this.defaults={},this.busy=!1,this.errorMessage="",this.summary="",this.description="",this.location="",this.start="",this.end="",this.calendar="",this.moveNote=""}connectedCallback(){super.connectedCallback(),this.hydrate()}updated(t){(t.has("event")||t.has("defaults")||t.has("calendars"))&&this.hydrate()}hydrate(){this.event?(this.summary=this.event.summary,this.description=this.event.description??"",this.location=this.event.location??"",this.start=this.toLocalInput(this.event.start),this.end=this.toLocalInput(this.event.end),this.calendar=this.event.calendar):(this.summary="",this.description="",this.location="",this.start=this.toLocalInput(this.defaults.start??(new Date).toISOString()),this.end=this.toLocalInput(this.defaults.end??new Date(Date.now()+36e5).toISOString()),this.calendar=this.defaults.calendar??this.calendars[0]??"calendar.family"),this.moveNote=""}toLocalInput(t){const e=/^\d{4}-\d{2}-\d{2}$/.test(t)?new Date(`${t}T09:00:00`):new Date(t);if(Number.isNaN(e.getTime()))return"";const i=t=>String(t).padStart(2,"0");return`${e.getFullYear()}-${i(e.getMonth()+1)}-${i(e.getDate())}T${i(e.getHours())}:${i(e.getMinutes())}`}fromLocalInput(t){return new Date(t).toISOString()}get isRecurring(){return Boolean(this.event?.recurring||this.event?.rrule)}get calendarMoveBlocked(){return this.isRecurring&&Boolean(this.event)&&this.calendar!==this.event.calendar}onCalendarChange(t){const e=t.target.value;this.calendar=e,this.event&&e!==this.event.calendar?this.isRecurring?this.moveNote="Recurring events cannot change calendars yet (phase 1). Keep the original calendar or recreate as a one-off.":this.moveNote="Calendar change uses create-on-new then delete-from-old so the event is never lost first.":this.moveNote=""}close(){this.busy||this.dispatchEvent(new CustomEvent("form-cancel",{bubbles:!0,composed:!0}))}save(){if(this.busy)return;if(!(this.summary.trim()&&this.start&&this.end&&this.calendar))return;if(this.calendarMoveBlocked)return;const t={summary:this.summary.trim(),description:this.description.trim()||void 0,location:this.location.trim()||void 0,start:this.fromLocalInput(this.start),end:this.fromLocalInput(this.end),calendar:this.calendar},e={mode:this.event?"edit":"create",input:t,original:this.event??void 0};this.dispatchEvent(new CustomEvent("form-save",{detail:e,bubbles:!0,composed:!0}))}render(){const t=this.event?"Edit event":"New event";return F`
      <div class="form-backdrop" @click=${this.close}>
        <div
          class="form-panel"
          @click=${t=>t.stopPropagation()}
          role="dialog"
          aria-label=${t}
        >
          <h2>${t}</h2>
          <p class="form-sub">
            ${this.event?"Edit details or move to another calendar.":"Add a one-off event to a configured calendar."}
          </p>

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
            ${this.calendars.map(t=>F`<option value=${t}>${t}</option>`)}
          </select>

          <div class="row-2">
            <div>
              <label for="start">Start</label>
              <input
                id="start"
                type="datetime-local"
                .value=${this.start}
                ?disabled=${this.busy}
                @input=${t=>{this.start=t.target.value}}
              />
            </div>
            <div>
              <label for="end">End</label>
              <input
                id="end"
                type="datetime-local"
                .value=${this.end}
                ?disabled=${this.busy}
                @input=${t=>{this.end=t.target.value}}
              />
            </div>
          </div>

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
              ${this.busy?"Saving…":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}};Ct.styles=kt,t([ut({attribute:!1})],Ct.prototype,"calendars",void 0),t([ut({attribute:!1})],Ct.prototype,"event",void 0),t([ut({attribute:!1})],Ct.prototype,"defaults",void 0),t([ut({type:Boolean})],Ct.prototype,"busy",void 0),t([ut({type:String})],Ct.prototype,"errorMessage",void 0),t([pt()],Ct.prototype,"summary",void 0),t([pt()],Ct.prototype,"description",void 0),t([pt()],Ct.prototype,"location",void 0),t([pt()],Ct.prototype,"start",void 0),t([pt()],Ct.prototype,"end",void 0),t([pt()],Ct.prototype,"calendar",void 0),t([pt()],Ct.prototype,"moveNote",void 0),Ct=t([ct("hac-event-form")],Ct);let Ot=class extends ot{constructor(){super(...arguments),this.config={type:`custom:${ft}`},this.view="week",this.anchorDate=new Date,this.events=[],this.formOpen=!1,this.editing=null,this.formDefaults={},this.formBusy=!1,this.formError="",this.status=`HA Calendar Card v${mt}`,this.statusKind="info",this.loading=!1,this.loadFailed=!1,this.pendingDuplicate=null,this.loadGeneration=0,this.hasLoadedOnce=!1}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={title:"HA Calendar",entities:[...vt],initial_view:"week",day_start_hour:6,day_end_hour:22,show_demo_when_empty:!1,...t,type:t.type??`custom:${ft}`},this.view=this.config.initial_view??"week"}static getStubConfig(){return{title:"HA Calendar",entities:[...vt],initial_view:"week"}}getCardSize(){return 8}connectedCallback(){super.connectedCallback(),this.ensureFonts()}ensureFonts(){const t="ha-calendar-card-fonts";if(document.getElementById(t))return;const e=document.createElement("link");e.id=t,e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Outfit:wght@400;500;600;700&display=swap",document.head.appendChild(e)}updated(t){(t.has("hass")||t.has("config")||t.has("anchorDate")||t.has("view"))&&this.refreshEvents()}entities(){return this.config.entities?.length?this.config.entities:[...vt]}range(){const t=new Date(this.anchorDate);if(t.setHours(0,0,0,0),"day"===this.view){const e=new Date(t);return e.setDate(e.getDate()+1),{start:t,end:e}}const e=(t.getDay()+6)%7;t.setDate(t.getDate()-e);const i=new Date(t);return i.setDate(i.getDate()+7),{start:t,end:i}}async refreshEvents(){const t=++this.loadGeneration;if(!this.hass)return this.events=this.demoEvents(),this.loadFailed=!1,this.hasLoadedOnce=!0,this.status="Preview mode — demo events (no hass)",void(this.statusKind="info");this.loading=!0;const e=new wt(this.hass),{start:i,end:r}=this.range(),a=this.entities();try{const s=await e.getEvents(a,i,r);if(t!==this.loadGeneration)return;if(this.loadFailed=!1,this.hasLoadedOnce=!0,s.events.length){this.events=s.events;const t=s.errors.length?` · ${s.errors.length} calendar(s) failed`:"";this.status=`${s.events.length} event(s)${t}`,this.statusKind=s.errors.length?"warn":"info"}else s.anySuccess?(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.status=this.config.show_demo_when_empty?"No events — showing demo blocks":"No events in this range",this.statusKind="info"):(this.events=this.config.show_demo_when_empty?this.demoEvents():[],this.loadFailed=!this.config.show_demo_when_empty,this.status=s.errors.length?`Could not load: ${s.errors.join(", ")} — check entity ids`:"No calendars loaded",this.statusKind="error")}catch(e){if(t!==this.loadGeneration)return;this.events=[],this.loadFailed=!0,this.hasLoadedOnce=!0,this.status=`Load failed: ${e instanceof Error?e.message:String(e)}`,this.statusKind="error"}finally{t===this.loadGeneration&&(this.loading=!1)}}demoEvents(){const t=new Date(this.anchorDate);t.setHours(0,0,0,0);const e=(e,i,r,a)=>{const s=new Date(t);s.setHours(e,0,0,0);const n=new Date(s);return n.setHours(e+i,0,0,0),{uid:`demo-${r}-${e}`,summary:r,start:s.toISOString(),end:n.toISOString(),calendar:a}},i=this.entities();return[e(9,1,"Morning standup",i[0]??"calendar.family"),e(11,2,"Deep work",i[1]??"calendar.personal"),e(14,1,"School pickup",i[0]??"calendar.family")]}shift(t){const e=new Date(this.anchorDate);e.setDate(e.getDate()+t),this.anchorDate=e}openCreate(t){this.editing=null,this.formError="",this.formBusy=!1,this.formDefaults={start:(t?.start??new Date).toISOString(),end:(t?.end??new Date(Date.now()+36e5)).toISOString(),calendar:this.entities()[0]},this.formOpen=!0}openEdit(t){this.editing=t,this.formError="",this.formBusy=!1,this.formDefaults={},this.formOpen=!0}async onFormSave(t){const{mode:e,input:i,original:r}=t.detail;if(!this.hass)return void(this.formError="No Home Assistant connection — cannot save.");this.formBusy=!0,this.formError="";const a=new wt(this.hass);try{if("create"===e)await a.createEvent(i),this.formOpen=!1,this.status=`Created “${i.summary}” on ${i.calendar}`,this.statusKind="info";else if(r&&i.calendar!==r.calendar){if(r.recurring||r.rrule)return void(this.formError="Recurring events cannot change calendars yet. Keep the original calendar.");const t=await a.moveEventToCalendar(r,i.calendar,{...i,calendar:i.calendar});if("moved"===t.status)this.formOpen=!1,this.pendingDuplicate=null,this.status=`Moved “${i.summary}” → ${i.calendar}`,this.statusKind="info";else{if("create_failed"===t.status)return this.formError=`Move aborted (create failed): ${t.error}`,this.status=this.formError,void(this.statusKind="error");if("delete_failed"===t.status)this.formOpen=!1,this.pendingDuplicate=t.pending,this.status=`Copy exists on ${i.calendar}, but the old event could not be removed.`,this.statusKind="warn";else if("blocked_recurring"===t.status)return void(this.formError=t.reason)}}else r&&(await a.updateEvent(r.calendar,r.uid,{...i,calendar:r.calendar},r.recurrence_id),this.formOpen=!1,this.status=`Updated “${i.summary}”`,this.statusKind="info");await this.refreshEvents()}catch(t){this.formError=t instanceof Error?t.message:String(t),this.status=this.formError,this.statusKind="error"}finally{this.formBusy=!1}}async cleanupDuplicate(){if(!this.hass||!this.pendingDuplicate)return;const t=this.pendingDuplicate,e=new wt(this.hass);try{await e.deleteEvent(t.entityId,t.uid),this.pendingDuplicate=null,this.status=`Removed old copy of “${t.summary}” from ${t.entityId}`,this.statusKind="info",await this.refreshEvents()}catch(t){this.status=`Cleanup failed: ${t instanceof Error?t.message:String(t)}`,this.statusKind="error"}}dismissDuplicate(){this.pendingDuplicate=null,this.status="Duplicate warning dismissed — old copy may still exist",this.statusKind="warn"}rangeLabel(){const{start:t,end:e}=this.range();if("day"===this.view)return t.toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"});const i=new Date(e);i.setDate(i.getDate()-1);const r={month:"short",day:"numeric"};return`${t.toLocaleDateString(void 0,r)} – ${i.toLocaleDateString(void 0,r)}`}render(){const t=this.config.title??"HA Calendar",e=this.entities(),i=this.hasLoadedOnce&&!this.loading&&!this.loadFailed&&0===this.events.length&&Boolean(this.hass)&&!this.config.show_demo_when_empty,r=this.hasLoadedOnce&&!this.loading&&this.loadFailed&&!this.formOpen,a=this.loading&&this.hasLoadedOnce;return F`
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

        <header class="toolbar">
          <h1 class="brand">${t}</h1>
          <div class="toolbar-controls">
            <div class="nav-group">
              <button
                class="nav-btn"
                type="button"
                aria-label="Previous"
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
                aria-label="Next"
                @click=${()=>this.shift("day"===this.view?1:7)}
              >
                ›
              </button>
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
            </div>
            <button
              class="primary-btn"
              type="button"
              @click=${()=>this.openCreate()}
            >
              New
            </button>
          </div>
        </header>

        <div class="grid-wrap">
          ${this.loading&&!this.hasLoadedOnce?F`
                <div class="state-panel" data-kind="loading">
                  <div class="spinner" style="width:1.4rem;height:1.4rem;border:2px solid var(--hac-line-strong);border-top-color:var(--hac-accent);border-radius:50%;animation:spin 0.7s linear infinite"></div>
                  <h2>Loading calendar</h2>
                  <p>Fetching events for ${this.rangeLabel()}.</p>
                </div>
              `:W}
          ${a?F`<div class="loading-veil"></div>`:W}
          ${r?F`
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
          ${i?F`
                <div class="state-panel" data-kind="empty">
                  <div class="state-mark" aria-hidden="true"></div>
                  <h2>Nothing scheduled</h2>
                  <p>
                    ${this.rangeLabel()} is clear. Tap New, or double-click a
                    time slot on larger screens.
                  </p>
                  <div class="state-actions">
                    <button
                      class="primary-btn"
                      type="button"
                      @click=${()=>this.openCreate()}
                    >
                      New event
                    </button>
                  </div>
                </div>
              `:W}

          <hac-time-grid
            .mode=${this.view}
            .anchorDate=${this.anchorDate}
            .events=${this.events}
            .calendars=${e}
            .dayStartHour=${this.config.day_start_hour??6}
            .dayEndHour=${this.config.day_end_hour??22}
            @event-select=${t=>this.openEdit(t.detail)}
            @slot-create=${t=>this.openCreate(t.detail)}
          ></hac-time-grid>

          ${this.formOpen?F`
                <hac-event-form
                  .calendars=${e}
                  .event=${this.editing}
                  .defaults=${this.formDefaults}
                  .busy=${this.formBusy}
                  .errorMessage=${this.formError}
                  @form-cancel=${()=>{this.formBusy||(this.formOpen=!1)}}
                  @form-save=${this.onFormSave}
                ></hac-event-form>
              `:W}
        </div>

        <div class="status" data-kind=${this.statusKind}>
          ${this.loading?F`<span class="spinner" aria-hidden="true"></span>`:W}
          <span>${this.status}</span>
          ${"error"!==this.statusKind||r?W:F`<button
                class="ghost-btn"
                type="button"
                style="min-height:1.75rem;padding:0.2rem 0.6rem;font-size:0.78rem"
                @click=${()=>{this.refreshEvents()}}
              >
                Retry
              </button>`}
        </div>
      </div>
    `}};Ot.styles=[_t,n`
      :host {
        position: relative;
      }
    `],t([ut({attribute:!1})],Ot.prototype,"hass",void 0),t([pt()],Ot.prototype,"config",void 0),t([pt()],Ot.prototype,"view",void 0),t([pt()],Ot.prototype,"anchorDate",void 0),t([pt()],Ot.prototype,"events",void 0),t([pt()],Ot.prototype,"formOpen",void 0),t([pt()],Ot.prototype,"editing",void 0),t([pt()],Ot.prototype,"formDefaults",void 0),t([pt()],Ot.prototype,"formBusy",void 0),t([pt()],Ot.prototype,"formError",void 0),t([pt()],Ot.prototype,"status",void 0),t([pt()],Ot.prototype,"statusKind",void 0),t([pt()],Ot.prototype,"loading",void 0),t([pt()],Ot.prototype,"loadFailed",void 0),t([pt()],Ot.prototype,"pendingDuplicate",void 0),t([pt()],Ot.prototype,"loadGeneration",void 0),t([pt()],Ot.prototype,"hasLoadedOnce",void 0),Ot=t([ct(ft)],Ot),window.customCards=window.customCards||[],window.customCards.push({type:ft,name:"HA Calendar Card",description:"Day/week time-slot calendar with create/edit and safe calendar moves",preview:!0}),console.info(`%c HA-CALENDAR-CARD %c ${mt} `,"background:#0d7a6f;color:#fff;padding:2px 4px;border-radius:4px 0 0 4px","background:#1a2b33;color:#fff;padding:2px 4px;border-radius:0 4px 4px 0");export{Ot as HaCalendarCard};
//# sourceMappingURL=ha-calendar-card.js.map
