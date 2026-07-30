function t(t,e,i,n){var r,o=arguments.length,s=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(o<3?r(s):o>3?r(e,i,s):r(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new o(i,t,n)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",y=m.reactiveElementPolyfillSupport,b=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const o=n?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of n){const n=document.createElement("style"),r=e.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=n;const o=r.fromAttribute(e,t.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(t,e,i,n=!1,r){if(void 0!==t){const o=this.constructor;if(!1===n&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,y?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+P,k=`<${T}>`,M=document,R=()=>M.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,z="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,L=/>/g,D=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),q=new WeakMap,V=M.createTreeWalker(M,129);function G(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,n=[];let r,o=2===e?"<svg>":3===e?"<math>":"",s=N;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(s.lastIndex=h,l=s.exec(i),null!==l);)h=s.lastIndex,s===N?"!--"===l[1]?s=H:void 0!==l[1]?s=L:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=D):void 0!==l[3]&&(s=D):s===D?">"===l[0]?(s=r??N,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?D:'"'===l[3]?j:I):s===j||s===I?s=D:s===H||s===L?s=N:(s=D,r=void 0);const d=s===D&&t[e+1].startsWith("/>")?" ":"";o+=s===N?i+k:c>=0?(n.push(a),i.slice(0,c)+C+i.slice(c)+P+d):i+P+(-2===c?e:d)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class Z{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let r=0,o=0;const s=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=Z.createElement(l,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=V.nextNode())&&a.length<s;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(C)){const e=c[o++],i=n.getAttribute(t).split(P),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?et:"?"===s[1]?it:"@"===s[1]?nt:tt}),n.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:r}),n.removeAttribute(t));if(B.test(n.tagName)){const t=n.textContent.split(P),e=t.length-1;if(e>0){n.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],R()),V.nextNode(),a.push({type:2,index:++r});n.append(t[e],R())}}}else if(8===n.nodeType)if(n.data===T)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=n.data.indexOf(P,t+1));)a.push({type:7,index:r}),t+=P.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,n){if(e===W)return e;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,n)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??M).importNode(e,!0);V.currentNode=n;let r=V.nextNode(),o=0,s=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=i[++s]}o!==a?.index&&(r=V.nextNode(),o++)}return V.currentNode=M,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),O(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new X(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const r of t)n===e.length?e.push(i=new Q(this.O(R()),this.O(R()),this,this.options)):i=e[n],i._$AI(r),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,r){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,n){const r=this.strings;let o=!1;if(void 0===r)t=J(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const n=t;let s,a;for(t=r[0],s=0;s<r.length-1;s++)a=J(this,n[i+s],e,s),a===W&&(a=this._$AH[s]),o||=!O(a)||a!==this._$AH[s],a===K?t=K:t!==K&&(t+=(a??"")+r[s+1]),this._$AH[s]=a}o&&!n&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class nt extends tt{constructor(t,e,i,n,r){super(t,e,i,n,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??K)===W)return;const i=this._$AH,n=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==K&&(i===K||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(Z,Q),(w.litHtmlVersions??=[]).push("3.3.3");const st=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let r=n._$litPart$;if(void 0===r){const t=i?.renderBefore??null;n._$litPart$=r=new Q(e.insertBefore(R(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,st.litElementHydrateSupport?.({LitElement:at});const lt=st.litElementPolyfillSupport;lt?.({LitElement:at}),(st.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:v},dt=(t=ht,e,i)=>{const{kind:n,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,r,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const r=this[n];e.call(this,i),this.requestUpdate(n,r,t,!0,i)}}throw Error("Unsupported decorator location: "+n)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const mt=23,ft=23,gt=8,yt=.5;function bt(t){const e="number"==typeof t?t:Number.parseFloat(String(t));return Number.isFinite(e)?e:void 0}function _t(t){if(t&&"unknown"!==t.state&&"unavailable"!==t.state)return bt(t.state)}function vt(t){if(t&&"unknown"!==t.state&&"unavailable"!==t.state)return"on"===t.state}function $t(t){const{mode:e,plantMode:i,entityMin:n,entityMax:r,outsideTemperature:o,config:s}=t,a=function(t,e){return"heat_cool"!==t&&"auto"!==t||"heat"!==e&&"cool"!==e?t:e}(e,i);let l=n,c=r;return"heat"===a&&(c=Math.min(c,s.heat_manual_max??mt)),"cool"!==a&&"dry"!==a||(l=Math.max(l,function(t,e=ft,i=gt){return void 0===t?e:Math.max(e,t-i)}(o,s.cool_manual_min??ft,s.cool_outdoor_delta??gt))),l>c&&(l=c),{min:l,max:c,step:s.temperature_step??yt,effectiveMode:a}}function xt(t,e,i=0){const n=Math.round((t-i)/e)*e+i;return Number(n.toFixed(3))}function wt(t,e){return xt(Math.min(e.max,Math.max(e.min,t)),e.step,e.min)}function At(t,e){return{heating:"mdi:fire",cooling:"mdi:snowflake",drying:"mdi:water-percent",fan:"mdi:fan",idle:"mdi:pause-circle-outline",defrosting:"mdi:snowflake-melt",preheating:"mdi:radiator"}[t]??function(t){return{off:"mdi:power-standby",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:autorenew",auto:"mdi:autorenew",dry:"mdi:water-percent",fan_only:"mdi:fan"}[t]??"mdi:thermostat"}(e)}let Et=class extends at{constructor(){super(...arguments),this.name="",this.mode="off",this.action="off",this.statusLabel="Aus",this.statusIcon="mdi:power-standby",this.range={min:16,max:30,step:.5,effectiveMode:"off"},this.disabled=!1,this.dragging=!1}willUpdate(t){this.dragging||!t.has("targetTemperature")&&!t.has("range")||(this.selectedTemperature=void 0===this.targetTemperature?void 0:wt(this.targetTemperature,this.range))}render(){const t=this.selectedTemperature??this.targetTemperature,e=void 0===t?150:this.temperatureToAngle(t),i=!this.disabled&&"off"!==this.mode&&"fan_only"!==this.mode,n=[this.mode,this.action,this.dragging?"dragging":"",i?"interactive":"disabled"].join(" ");return F`
      <div class="screen ${n}">
        <div class="glow"></div>
        <div
          class="handle"
          role="slider"
          aria-label="Solltemperatur"
          aria-valuemin=${this.range.min}
          aria-valuemax=${this.range.max}
          aria-valuenow=${t??this.range.min}
          aria-disabled=${i?"false":"true"}
          tabindex=${i?"0":"-1"}
          @keydown=${this.onKeyDown}
        >
          <svg class="scale" viewBox="0 0 120 120" aria-hidden="true">
            <path
              stroke-width="1"
              stroke="rgb(70 70 70)"
              stroke-dasharray="2"
              fill="none"
              d="M60 4 a 52 52 0 0 1 0 115 a 52 52 0 0 1 0 -115"
            ></path>
          </svg>

          <div class="name">${this.name}</div>

          <div class="current">
            ${void 0===this.currentTemperature?F`<span class="unknown">--</span>`:F`${this.formatTemperature(this.currentTemperature)}<span class="degree">°</span>`}
          </div>

          <div class="status">
            <ha-icon .icon=${this.statusIcon}></ha-icon>
            <span>${this.statusLabel}</span>
          </div>

          <div class="humidity">
            ${void 0===this.humidity?K:F`<ha-icon icon="mdi:water-percent"></ha-icon
                  ><span>${Math.round(this.humidity)} %</span>`}
          </div>

          <div
            class="touch-layer"
            style=${`--pointer-angle:${e}deg;--counter-angle:${-e}deg`}
            @pointerdown=${this.onPointerDown}
            @pointermove=${this.onPointerMove}
            @pointerup=${this.onPointerUp}
            @pointercancel=${this.onPointerCancel}
          >
            ${"off"===this.mode||"fan_only"===this.mode||void 0===t?K:F`
                  <div class="pointer">
                    <div class="pointer-value">${this.formatTemperature(t)}</div>
                    <div class="pointer-dot"></div>
                  </div>
                `}
          </div>
        </div>
      </div>
    `}onPointerDown(t){if(this.disabled||"off"===this.mode||"fan_only"===this.mode)return;const e=t.currentTarget;this.activePointer=t.pointerId,this.dragging=!0,e.setPointerCapture(t.pointerId),this.updateFromPointer(t,e)}onPointerMove(t){this.dragging&&t.pointerId===this.activePointer&&this.updateFromPointer(t,t.currentTarget)}onPointerUp(t){if(t.pointerId!==this.activePointer)return;const e=t.currentTarget;this.updateFromPointer(t,e),e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),this.finishSelection()}onPointerCancel(t){t.pointerId===this.activePointer&&(this.dragging=!1,this.activePointer=void 0,this.selectedTemperature=this.targetTemperature)}onKeyDown(t){if(this.disabled||"off"===this.mode||"fan_only"===this.mode)return;let e=0;if("ArrowUp"!==t.key&&"ArrowRight"!==t.key||(e=this.range.step),"ArrowDown"!==t.key&&"ArrowLeft"!==t.key||(e=-this.range.step),0===e)return;t.preventDefault();const i=this.selectedTemperature??this.targetTemperature??this.range.min;this.selectedTemperature=wt(i+e,this.range),this.dispatchTemperature()}updateFromPointer(t,e){t.preventDefault();const i=e.getBoundingClientRect(),n=i.left+i.width/2,r=i.top+i.height/2,o=180*Math.atan2(t.clientY-r,t.clientX-n)/Math.PI;let s=o<0?o+360:o;s>45&&s<150&&(s=s<97.5?45:150);const a=s>=150?s-150:210+s,l=Math.min(1,Math.max(0,a/255)),c=this.range.min+l*(this.range.max-this.range.min);this.selectedTemperature=wt(xt(c,this.range.step,this.range.min),this.range)}finishSelection(){this.dragging=!1,this.activePointer=void 0,this.dispatchTemperature()}dispatchTemperature(){void 0!==this.selectedTemperature&&this.dispatchEvent(new CustomEvent("temperature-changed",{detail:{temperature:this.selectedTemperature},bubbles:!0,composed:!0}))}temperatureToAngle(t){if(this.range.max<=this.range.min)return 150;return 150+255*((wt(t,this.range)-this.range.min)/(this.range.max-this.range.min))}formatTemperature(t){return Number.isInteger(t)?t.toFixed(0):t.toFixed(1)}static{this.styles=s`
    :host {
      display: block;
      --heat-color: var(--plant-climate-heat-color, #ef5350);
      --cool-color: var(--plant-climate-cool-color, #07b9ff);
      --off-color: var(--plant-climate-off-color, #cccccc);
    }

    .screen {
      position: relative;
      height: 222px;
      overflow: visible;
      display: grid;
      place-items: center;
    }

    .glow,
    .handle {
      position: absolute;
      width: 194px;
      height: 194px;
      border-radius: 50%;
    }

    .glow {
      background: rgba(100, 100, 100, 0.12);
      box-shadow: rgba(0, 0, 0, 0.45) 0 5px 18px -7px;
    }

    .screen.heat .glow {
      border: 1px solid rgb(156 115 0 / 20%);
      background: rgb(255 143 7 / 30%);
      box-shadow: rgb(255 177 0 / 30%) 0 5px 16px -2px;
    }

    .screen.cool .glow,
    .screen.dry .glow {
      border: 1px solid rgb(7 186 255 / 20%);
      background: rgb(7 186 255 / 30%);
      box-shadow: rgb(0 161 255 / 30%) 0 5px 16px -2px;
    }

    .screen.heat.heating .glow {
      animation: heating 3s ease-in-out infinite;
    }

    .screen.cool.cooling .glow {
      animation: cooling 3s ease-in-out infinite;
    }

    .handle {
      width: 184px;
      height: 184px;
      background: linear-gradient(
        0deg,
        rgb(19 19 19) 0%,
        rgb(19 19 19) 49%,
        rgb(25 25 25) 50%
      );
      color: rgb(204 204 204);
      text-align: center;
      outline: none;
    }

    .handle:focus-visible {
      box-shadow: 0 0 0 3px var(--primary-color);
    }

    .scale {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
    }

    .name,
    .current,
    .status,
    .humidity {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 2;
      pointer-events: none;
    }

    .name {
      top: 25px;
      padding: 0 36px;
      overflow: hidden;
      color: rgb(204 204 204 / 36%);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
      font-size: 10px;
      line-height: 1.2;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .current {
      top: 50%;
      transform: translateY(-58%);
      padding-left: 7px;
      font-family: "Oswald", "Arial Narrow", Roboto, sans-serif;
      font-size: 57px;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }

    .current .degree {
      display: inline-block;
      margin-left: 2px;
      transform: translateY(-23px);
      font-size: 28px;
    }

    .current .unknown {
      opacity: 0.45;
    }

    .status {
      bottom: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-family: "Oswald", "Arial Narrow", Roboto, sans-serif;
      font-size: 15px;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .status ha-icon {
      width: 18px;
      height: 18px;
      --mdc-icon-size: 18px;
    }

    .screen.heat .status {
      color: var(--heat-color);
    }

    .screen.cool .status,
    .screen.dry .status {
      color: var(--cool-color);
    }

    .screen.off .status {
      color: var(--off-color);
      opacity: 0.52;
    }

    .humidity {
      bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      color: rgb(202 202 202 / 62%);
      font-size: 12px;
    }

    .humidity ha-icon {
      width: 14px;
      height: 14px;
      --mdc-icon-size: 14px;
    }

    .touch-layer {
      position: absolute;
      inset: 0;
      z-index: 4;
      border-radius: 50%;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }

    .screen.interactive .touch-layer {
      cursor: grab;
    }

    .screen.dragging .touch-layer {
      cursor: grabbing;
    }

    .pointer {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 30px;
      margin-top: -15px;
      transform: rotate(var(--pointer-angle));
      transform-origin: center left;
      pointer-events: none;
    }

    .pointer-dot {
      width: 9px;
      height: 9px;
      margin: 10px 4px 0 auto;
      border-radius: 50%;
      background: rgb(154 40 40);
      transition: width 150ms ease, height 150ms ease, box-shadow 150ms ease;
    }

    .dragging .pointer-dot {
      width: 13px;
      height: 13px;
      margin-top: 8px;
      background: rgb(255 0 0);
      box-shadow: 0 0 6px 1px red;
    }

    .pointer-value {
      position: absolute;
      right: 18px;
      top: 2px;
      font-family: Roboto, sans-serif;
      font-size: 10px;
      font-variant-numeric: tabular-nums;
      transform: rotate(var(--counter-angle));
      transform-origin: center;
    }

    .dragging .pointer-value {
      font-size: 13px;
      font-weight: 600;
    }

    @keyframes heating {
      0%,
      100% {
        background: #ff9007;
        box-shadow: rgb(255 177 0) 0 5px 16px -2px;
      }
      60% {
        background: rgb(255 143 7 / 30%);
        box-shadow: rgb(255 177 0 / 30%) 0 5px 16px -2px;
      }
    }

    @keyframes cooling {
      0%,
      100% {
        background: rgb(7 186 255);
        box-shadow: rgb(0 161 255) 0 5px 16px -2px;
      }
      60% {
        background: rgb(7 186 255 / 30%);
        box-shadow: rgb(0 161 255 / 30%) 0 5px 16px -2px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .glow {
        animation: none !important;
      }
    }
  `}};t([pt({type:String})],Et.prototype,"name",void 0),t([pt({type:Number})],Et.prototype,"currentTemperature",void 0),t([pt({type:Number})],Et.prototype,"targetTemperature",void 0),t([pt({type:Number})],Et.prototype,"humidity",void 0),t([pt({type:String})],Et.prototype,"mode",void 0),t([pt({type:String})],Et.prototype,"action",void 0),t([pt({type:String})],Et.prototype,"statusLabel",void 0),t([pt({type:String})],Et.prototype,"statusIcon",void 0),t([pt({attribute:!1})],Et.prototype,"range",void 0),t([pt({type:Boolean})],Et.prototype,"disabled",void 0),t([ut()],Et.prototype,"selectedTemperature",void 0),t([ut()],Et.prototype,"dragging",void 0),Et=t([ct("plant-temperature-dial")],Et);const St={entity:"Climate-Entity",name:"Anzeigename",global_enable_entity:"Globale Klimafreigabe",room_enable_entity:"Raumfreigabe",outside_temperature_entity:"Außentemperatur",humidity_entity:"Luftfeuchtigkeit",plant_mode_entity:"Plant-Betriebsart",controller_state_entity:"Reglerzustand",blocking_reason_entity:"Sperrgrund",fault_entity:"Störung",defrost_entity:"Abtauung",window_entity:"Fenster oder Tür offen",heat_default:"Heiz-Startwert",heat_manual_max:"Heizen manuell maximal",cool_auto_default:"Kühl-Startwert mindestens",cool_manual_min:"Kühlen manuell mindestens",cool_outdoor_delta:"Maximale Differenz zur Außentemperatur",temperature_step:"Sollwert-Schrittweite",show_fan:"Lüfterstufen anzeigen"};let Ct=class extends at{static getStubConfig(t,e){const i=e?.find(t=>t.startsWith("climate."))??Object.keys(t?.states??{}).find(t=>t.startsWith("climate."));return i?{entity:i}:{}}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{type:"grid",name:"",flatten:!0,column_min_width:"220px",schema:[{name:"name",selector:{text:{}}},{name:"global_enable_entity",selector:{entity:{domain:"input_boolean"}}},{name:"room_enable_entity",selector:{entity:{domain:"input_boolean"}}},{name:"outside_temperature_entity",selector:{entity:{domain:"sensor"}}},{name:"humidity_entity",selector:{entity:{domain:"sensor"}}}]},{type:"expandable",title:"Node-RED- und Plant-Zustände",name:"",flatten:!0,schema:[{name:"plant_mode_entity",selector:{entity:{domain:"sensor"}}},{name:"controller_state_entity",selector:{entity:{domain:"sensor"}}},{name:"blocking_reason_entity",selector:{entity:{domain:"sensor"}}},{name:"fault_entity",selector:{entity:{domain:"binary_sensor"}}},{name:"defrost_entity",selector:{entity:{domain:"binary_sensor"}}},{name:"window_entity",selector:{entity:{domain:"binary_sensor"}}}]},{type:"expandable",title:"Grenzwerte",name:"",flatten:!0,schema:[{type:"grid",name:"",flatten:!0,schema:[{name:"heat_default",selector:{number:{min:16,max:23,step:.5,mode:"box"}}},{name:"heat_manual_max",selector:{number:{min:16,max:30,step:.5,mode:"box"}}},{name:"cool_auto_default",selector:{number:{min:18,max:30,step:.5,mode:"box"}}},{name:"cool_manual_min",selector:{number:{min:16,max:30,step:.5,mode:"box"}}},{name:"cool_outdoor_delta",selector:{number:{min:1,max:15,step:.5,mode:"box"}}},{name:"temperature_step",selector:{number:{min:.1,max:1,step:.1,mode:"box"}}}]}]},{type:"grid",name:"",flatten:!0,schema:[{name:"show_fan",selector:{boolean:{}}}]}],computeLabel:t=>t.name?St[t.name]:void 0,computeHelper:t=>"outside_temperature_entity"===t.name?"Für die 8-K-Regel. Vorläufig der Sensor der Bosch-Außeneinheit.":"room_enable_entity"===t.name?"Diese Freigabe ist der Ein-/Aus-Schalter der Card.":"plant_mode_entity"===t.name?"Wird nur angezeigt. Die Betriebsart wird nicht von der Card geändert.":void 0,assertConfig:t=>{if(!t.entity||!t.entity.startsWith("climate."))throw new Error("Eine Climate-Entity ist erforderlich.")}}}setConfig(t){if(!t?.entity)throw new Error("Eine Climate-Entity ist erforderlich.");if(!t.entity.startsWith("climate."))throw new Error("Die Entity muss aus der Domain climate stammen.");this.config={heat_default:21,heat_manual_max:23,cool_auto_default:25,cool_manual_min:23,cool_outdoor_delta:8,temperature_step:.5,show_fan:!0,...t}}getCardSize(){return 6}getGridOptions(){return{columns:6,min_columns:3,max_columns:12,rows:6,min_rows:5}}render(){if(!this.hass||!this.config)return K;const t=this.entity(this.config.entity);if(!t)return F`
        <ha-card>
          <div class="error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            <span>Entity nicht gefunden: ${this.config.entity}</span>
          </div>
        </ha-card>
      `;const e="unavailable"===t.state||"unknown"===t.state,i=e?"off":t.state,n=String(t.attributes.hvac_action??("off"===i?"off":"idle")),r=this.config.name??String(t.attributes.friendly_name??this.config.entity),o=bt(t.attributes.current_temperature),s=bt(t.attributes.temperature),a=this.pendingTemperature??s,l=_t(this.entity(this.config.humidity_entity))??bt(t.attributes.current_humidity),c=_t(this.entity(this.config.outside_temperature_entity)),h=this.entity(this.config.plant_mode_entity)?.state??void 0,d=this.entity(this.config.controller_state_entity)?.state??void 0,p=this.entity(this.config.blocking_reason_entity)?.state??void 0,u=vt(this.entity(this.config.room_enable_entity)),m=vt(this.entity(this.config.global_enable_entity)),f=!0===vt(this.entity(this.config.fault_entity)),g=!0===vt(this.entity(this.config.defrost_entity)),y=!0===vt(this.entity(this.config.window_entity)),b="changeover"===d,_=e||!1===u||!1===m||f||y||b,v=this.temperatureRange(t,i,h,c),$=this.stringArray(t.attributes.fan_modes),x=String(t.attributes.fan_mode??""),w=this.dialState({mode:i,action:n,roomEnableState:u,globalEnableState:m,fault:f,defrost:g,windowOpen:y,changeover:b,blockingReason:p});return F`
      <ha-card>
        <div class="card">
          <plant-temperature-dial
            .name=${r}
            .currentTemperature=${o}
            .targetTemperature=${a}
            .humidity=${l}
            .mode=${this.visualMode(i,n,h)}
            .action=${n}
            .statusLabel=${w.label}
            .statusIcon=${w.icon}
            .range=${v}
            .disabled=${_}
            @temperature-changed=${this.onTemperatureChanged}
          ></plant-temperature-dial>

          <div class="bottom-controls">
            ${this.config.room_enable_entity?F`
                  <button
                    class="icon-control power ${!0===u?"active":""}"
                    type="button"
                    aria-label=${!0===u?"Raumfreigabe ausschalten":"Raumfreigabe einschalten"}
                    title=${!0===u?"Raumfreigabe ein":"Raumfreigabe aus"}
                    aria-pressed=${!0===u?"true":"false"}
                    @click=${this.toggleRoomEnable}
                  >
                    <ha-icon icon="mdi:power-standby"></ha-icon>
                  </button>
                `:K}

            ${!1!==this.config.show_fan?$.map(t=>F`
                    <button
                      type="button"
                      class="icon-control fan ${t===x?"active":""}"
                      title=${this.fanLabel(t)}
                      aria-label=${`Lüfter ${this.fanLabel(t)}`}
                      aria-pressed=${t===x?"true":"false"}
                      ?disabled=${_||"off"===i}
                      @click=${()=>this.setFanMode(t)}
                    >
                      <ha-icon .icon=${function(t){return{auto:"mdi:fan-auto",low:"mdi:fan-speed-1",medium:"mdi:fan-speed-2",high:"mdi:fan-speed-3",turbo:"mdi:fan-plus"}[t.toLowerCase()]??"mdi:fan"}(t)}></ha-icon>
                    </button>
                  `):K}
          </div>

          ${this.serviceError?F`
                <div class="service-error">
                  <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                  <span>${this.serviceError}</span>
                </div>
              `:K}
        </div>
      </ha-card>
    `}dialState(t){if(t.fault)return{label:"Störung",icon:"mdi:alert-octagon"};if(t.defrost)return{label:"Abtauung",icon:"mdi:snowflake-melt"};if(t.windowOpen)return{label:"Fenster offen",icon:"mdi:window-open-variant"};if(t.changeover)return{label:"Moduswechsel",icon:"mdi:swap-horizontal"};if(!1===t.globalEnableState)return{label:"Global gesperrt",icon:"mdi:home-lock"};if(!1===t.roomEnableState)return{label:"Freigabe aus",icon:"mdi:power-standby"};if(t.blockingReason&&!["none","kein","unknown","unavailable",""].includes(t.blockingReason.toLowerCase()))return{label:"Gesperrt",icon:"mdi:lock-clock"};if("idle"===t.action){if("heat"===t.mode)return{label:"Heizen",icon:"mdi:fire"};if("cool"===t.mode)return{label:"Kühlen",icon:"mdi:snowflake"};if("dry"===t.mode)return{label:"Entfeuchten",icon:"mdi:water-percent"}}return{label:(e=t.action,i=t.mode,{off:"Aus",heating:"Heizt",cooling:"Kühlt",drying:"Entfeuchtet",fan:"Lüftet",idle:"Hält",defrosting:"Abtauung",preheating:"Vorheizen"}[e]??(e||function(t){return{off:"Aus",heat:"Heizen",cool:"Kühlen",heat_cool:"Automatik",auto:"Automatik",dry:"Entfeuchten",fan_only:"Lüften"}[t]??t}(i))),icon:At(t.action,t.mode)};var e,i}entity(t){return t?this.hass?.states[t]:void 0}temperatureRange(t,e,i,n){return $t({mode:e,plantMode:i,entityMin:bt(t.attributes.min_temp)??16,entityMax:bt(t.attributes.max_temp)??30,outsideTemperature:n,config:this.config})}stringArray(t){return Array.isArray(t)?t.filter(t=>"string"==typeof t):[]}async toggleRoomEnable(){if(!this.hass||!this.config.room_enable_entity)return;const t=vt(this.entity(this.config.room_enable_entity));await this.callService("input_boolean",!0===t?"turn_off":"turn_on",{entity_id:this.config.room_enable_entity})}onTemperatureChanged(t){this.setTemperature(t.detail.temperature)}async setTemperature(t){const e=this.entity(this.config.entity);if(!e)return;const i=_t(this.entity(this.config.outside_temperature_entity)),n=wt(t,this.temperatureRange(e,e.state,this.entity(this.config.plant_mode_entity)?.state,i));this.pendingTemperature=n;await this.callService("climate","set_temperature",{entity_id:this.config.entity,temperature:n})?window.setTimeout(()=>{this.pendingTemperature=void 0},2500):this.pendingTemperature=void 0}async setFanMode(t){await this.callService("climate","set_fan_mode",{entity_id:this.config.entity,fan_mode:t})}async callService(t,e,i){if(!this.hass)return!1;this.serviceError=void 0;try{return await this.hass.callService(t,e,i),!0}catch(t){return this.serviceError=t instanceof Error?t.message:"Befehl konnte nicht gesendet werden.",!1}}fanLabel(t){return{auto:"Auto",low:"Niedrig",medium:"Mittel",high:"Hoch",turbo:"Turbo"}[t.toLowerCase()]??t}visualMode(t,e,i){return"heating"===e?"heat":"cooling"===e?"cool":"heat_cool"!==t&&"auto"!==t||!i?t:i}static{this.styles=s`
    :host {
      display: block;
      --heat-color: var(--plant-climate-heat-color, #ef5350);
      --cool-color: var(--plant-climate-cool-color, #07b9ff);
      --off-color: var(--plant-climate-off-color, #cccccc);
      --control-background: color-mix(
        in srgb,
        var(--primary-text-color) 8%,
        transparent
      );
    }

    ha-card {
      overflow: hidden;
    }

    .card {
      padding: 8px 14px 14px;
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }

    button {
      border: 0;
      color: var(--primary-text-color);
      font: inherit;
    }

    button:not(:disabled) {
      cursor: pointer;
    }

    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .bottom-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 7px;
      margin: -2px auto 0;
    }

    .icon-control {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--control-background);
      box-shadow: rgb(0 0 0 / 30%) 0 1px 5px -1px;
      color: var(--secondary-text-color);
      transition: color 140ms ease, box-shadow 140ms ease, opacity 140ms ease;
    }

    .icon-control:disabled {
      cursor: default;
      opacity: 0.34;
    }

    .icon-control ha-icon {
      width: 20px;
      height: 20px;
      --mdc-icon-size: 20px;
    }

    .icon-control.active {
      background: color-mix(in srgb, var(--primary-color) 18%, transparent);
      color: var(--primary-color);
      box-shadow: inset 0 0 0 1px
        color-mix(in srgb, var(--primary-color) 38%, transparent);
    }

    .service-error {
      min-height: 30px;
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: 7px;
      border-radius: 7px;
      padding: 0 9px;
      background: color-mix(
        in srgb,
        var(--warning-color, #ff9800) 12%,
        transparent
      );
      color: var(--warning-color, #ff9800);
      font-size: 11px;
    }

    .service-error {
      background: color-mix(
        in srgb,
        var(--error-color, #db4437) 12%,
        transparent
      );
      color: var(--error-color, #db4437);
    }

    .service-error ha-icon {
      width: 17px;
      height: 17px;
      --mdc-icon-size: 17px;
    }

    .error {
      min-height: 80px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px;
      color: var(--error-color, #db4437);
    }

  `}};t([pt({attribute:!1})],Ct.prototype,"hass",void 0),t([ut()],Ct.prototype,"config",void 0),t([ut()],Ct.prototype,"pendingTemperature",void 0),t([ut()],Ct.prototype,"serviceError",void 0),Ct=t([ct("plant-climate-card")],Ct),window.customCards=window.customCards??[],window.customCards.push({type:"plant-climate-card",name:"Plant Climate Card",description:"Plant-bewusste Klimakarte mit Node-RED-Freigaben und Bosch-Grenzwerten",preview:!0,getEntitySuggestion:(t,e)=>e.startsWith("climate.")?{config:{type:"custom:plant-climate-card",entity:e}}:null}),console.info("%c PLANT-CLIMATE-CARD %c 1.0.0 ","color:white;background:#111;padding:3px 5px;font-weight:700","color:#07b9ff;background:#111;padding:3px 5px");export{Ct as PlantClimateCard};
//# sourceMappingURL=plant-climate-card.js.map
