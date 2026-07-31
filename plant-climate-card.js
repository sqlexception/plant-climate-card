function t(t,e,i,r){var n,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,i,s):n(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new o(i,t,r)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",b=m.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),n=e.litNonce;void 0!==n&&r.setAttribute("nonce",n),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=r;const o=n.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,n){if(void 0!==t){const o=this.constructor;if(!1===r&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??_)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,b?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+M,k=`<${C}>`,P=document,R=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,z="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,D=/>/g,L=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),K=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,V=P.createTreeWalker(P,129);function G(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,r=[];let n,o=2===e?"<svg>":3===e?"<math>":"",s=H;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(s.lastIndex=h,l=s.exec(i),null!==l);)h=s.lastIndex,s===H?"!--"===l[1]?s=N:void 0!==l[1]?s=D:void 0!==l[2]?(B.test(l[2])&&(n=RegExp("</"+l[2],"g")),s=L):void 0!==l[3]&&(s=L):s===L?">"===l[0]?(s=n??H,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?L:'"'===l[3]?j:I):s===j||s===I?s=L:s===N||s===D?s=H:(s=L,n=void 0);const d=s===L&&t[e+1].startsWith("/>")?" ":"";o+=s===H?i+k:c>=0?(r.push(a),i.slice(0,c)+T+i.slice(c)+M+d):i+M+(-2===c?e:d)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class J{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,o=0;const s=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=J.createElement(l,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=V.nextNode())&&a.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(T)){const e=c[o++],i=r.getAttribute(t).split(M),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:s[2],strings:i,ctor:"."===s[1]?et:"?"===s[1]?it:"@"===s[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(M)&&(a.push({type:6,index:n}),r.removeAttribute(t));if(B.test(r.tagName)){const t=r.textContent.split(M),e=t.length-1;if(e>0){r.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],R()),V.nextNode(),a.push({type:2,index:++n});r.append(t[e],R())}}}else if(8===r.nodeType)if(r.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=r.data.indexOf(M,t+1));)a.push({type:7,index:n}),t+=M.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,r){if(e===K)return e;let n=void 0!==r?i._$Co?.[r]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=n:i._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,r)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??P).importNode(e,!0);V.currentNode=r;let n=V.nextNode(),o=0,s=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++s]}o!==a?.index&&(n=V.nextNode(),o++)}return V.currentNode=P,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),O(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new X(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const n of t)r===e.length?e.push(i=new Q(this.O(R()),this.O(R()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,r){const n=this.strings;let o=!1;if(void 0===n)t=Z(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==K,o&&(this._$AH=t);else{const r=t;let s,a;for(t=n[0],s=0;s<n.length-1;s++)a=Z(this,r[i+s],e,s),a===K&&(a=this._$AH[s]),o||=!O(a)||a!==this._$AH[s],a===W?t=W:t!==W&&(t+=(a??"")+n[s+1]),this._$AH[s]=a}o&&!r&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class rt extends tt{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===K)return;const i=this._$AH,r=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(J,Q),(w.litHtmlVersions??=[]).push("3.3.3");const st=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let n=r._$litPart$;if(void 0===n){const t=i?.renderBefore??null;r._$litPart$=n=new Q(e.insertBefore(R(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}at._$litElement$=!0,at.finalized=!0,st.litElementHydrateSupport?.({LitElement:at});const lt=st.litElementPolyfillSupport;lt?.({LitElement:at}),(st.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:_},dt=(t=ht,e,i)=>{const{kind:r,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,n,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const n=this[r];e.call(this,i),this.requestUpdate(r,n,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}let mt=class extends at{constructor(){super(...arguments),this.name="",this.mode="off",this.action="off",this.statusLabel="Aus",this.statusIcon="mdi:power-standby",this.range={min:18,max:30,step:1,effectiveMode:"off"},this.disabled=!1,this.dragging=!1}willUpdate(t){this.dragging||!t.has("targetTemperature")&&!t.has("range")||(this.selectedTemperature=void 0===this.targetTemperature?void 0:this.clampDisplayTemperature(this.targetTemperature))}render(){const t=this.selectedTemperature??this.targetTemperature,e=this.displayRange(),i=void 0===t?150:this.temperatureToAngle(t),r=!this.disabled&&"fan_only"!==this.mode,n=[this.mode,this.action,this.dragging?"dragging":"",r?"interactive":"disabled"].join(" ");return F`
      <div class="screen ${n}">
        <div class="bezel"></div>
        <div class="glow"></div>
        <div
          class="handle"
          role="slider"
          aria-label="Solltemperatur"
          aria-valuemin=${e.min}
          aria-valuemax=${e.max}
          aria-valuenow=${t??e.min}
          aria-disabled=${r?"false":"true"}
          tabindex=${r?"0":"-1"}
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

          <div class="outside-temperature">
            ${void 0===this.outsideTemperature?W:F`<span>${this.formatTemperature(this.outsideTemperature)} °C</span>`}
          </div>

          <div
            class="touch-layer"
            style=${`--pointer-angle:${i}deg;--counter-angle:${-i}deg`}
            @pointerdown=${this.onPointerDown}
            @pointermove=${this.onPointerMove}
            @pointerup=${this.onPointerUp}
            @pointercancel=${this.onPointerCancel}
          >
            ${"fan_only"===this.mode||void 0===t?W:F`
                  <div class="pointer">
                    <div class="pointer-dot"></div>
                    <div class="pointer-value">${this.formatTemperature(t)}</div>
                  </div>
                `}
          </div>
        </div>
      </div>
    `}onPointerDown(t){if(this.disabled||"fan_only"===this.mode)return;const e=t.currentTarget;this.activePointer=t.pointerId,this.dragging=!0,e.setPointerCapture(t.pointerId),this.updateFromPointer(t,e)}onPointerMove(t){this.dragging&&t.pointerId===this.activePointer&&this.updateFromPointer(t,t.currentTarget)}onPointerUp(t){if(t.pointerId!==this.activePointer)return;const e=t.currentTarget;this.updateFromPointer(t,e),e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),this.finishSelection()}onPointerCancel(t){t.pointerId===this.activePointer&&(this.dragging=!1,this.activePointer=void 0,this.selectedTemperature=void 0===this.targetTemperature?void 0:this.clampDisplayTemperature(this.targetTemperature))}onKeyDown(t){if(this.disabled||"fan_only"===this.mode)return;let e=0;if("ArrowUp"!==t.key&&"ArrowRight"!==t.key||(e=this.displayStep()),"ArrowDown"!==t.key&&"ArrowLeft"!==t.key||(e=-this.displayStep()),0===e)return;t.preventDefault();const i=this.clampDisplayTemperature(this.selectedTemperature??this.targetTemperature??this.displayRange().min);this.selectedTemperature=this.clampDisplayTemperature(i+e),this.dispatchTemperature()}updateFromPointer(t,e){t.preventDefault();const i=e.getBoundingClientRect(),r=i.left+i.width/2,n=i.top+i.height/2,o=180*Math.atan2(t.clientY-n,t.clientX-r)/Math.PI;let s=o<0?o+360:o;s>45&&s<150&&(s=s<97.5?45:150);const a=s>=150?s-150:210+s,l=Math.min(1,Math.max(0,a/255)),c=this.visualRange(),h=c.min+l*(c.max-c.min);this.selectedTemperature=this.clampDisplayTemperature(h)}finishSelection(){this.dragging=!1,this.activePointer=void 0,this.dispatchTemperature()}dispatchTemperature(){void 0!==this.selectedTemperature&&this.dispatchEvent(new CustomEvent("temperature-changed",{detail:{temperature:this.selectedTemperature},bubbles:!0,composed:!0}))}visualRange(){return{min:18,max:30}}displayRange(){const t=this.visualRange(),e=Math.max(t.min,Math.ceil(this.range.min)),i=Math.min(t.max,Math.floor(this.range.max));if(e<=i)return{min:e,max:i};const r=Math.min(t.max,Math.max(t.min,Math.round((this.range.min+this.range.max)/2)));return{min:r,max:r}}displayStep(){return Math.max(1,Math.round(this.range.step))}clampDisplayTemperature(t){const e=this.displayRange(),i=this.displayStep(),r=Math.round((t-e.min)/i)*i+e.min;return Math.min(e.max,Math.max(e.min,r))}temperatureToAngle(t){const e=this.visualRange();return 150+255*((Math.min(e.max,Math.max(e.min,Math.round(t)))-e.min)/(e.max-e.min))}formatTemperature(t){return Math.round(t).toFixed(0)}static{this.styles=s`
    :host {
      display: block;
      --heat-color: var(--plant-climate-heat-color, #ef5350);
      --cool-color: var(--plant-climate-cool-color, #07b9ff);
      --off-color: var(--plant-climate-off-color, #cccccc);
    }

    .screen {
      position: relative;
      height: 224px;
      overflow: visible;
      display: grid;
      place-items: center;
    }

    .bezel,
    .glow,
    .handle {
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    .bezel {
      width: 208px;
      height: 208px;
      background: rgb(19 19 19);
      box-shadow:
        inset 0 1px 1px rgb(255 255 255 / 2%),
        0 3px 12px rgb(0 0 0 / 42%);
    }

    .glow {
      width: 190px;
      height: 190px;
      background: rgba(100, 100, 100, 0.12);
      box-shadow: rgb(0 0 0 / 45%) 0 4px 14px -2px;
      will-change: filter, opacity, box-shadow;
    }

    .screen.heat .glow {
      background: conic-gradient(
        from 0deg,
        rgb(255 143 7 / 10%) 0deg,
        rgb(255 143 7 / 34%) 76deg,
        rgb(255 143 7 / 80%) 132deg,
        rgb(255 144 7) 180deg,
        rgb(255 143 7 / 80%) 228deg,
        rgb(255 143 7 / 34%) 284deg,
        rgb(255 143 7 / 10%) 360deg
      );
      box-shadow:
        rgb(255 177 0 / 22%) 0 5px 15px -2px,
        rgb(255 143 7 / 12%) 0 0 10px 0;
    }

    .screen.cool .glow,
    .screen.dry .glow {
      background: conic-gradient(
        from 0deg,
        rgb(7 186 255 / 10%) 0deg,
        rgb(7 186 255 / 34%) 76deg,
        rgb(7 186 255 / 80%) 132deg,
        rgb(7 186 255) 180deg,
        rgb(7 186 255 / 80%) 228deg,
        rgb(7 186 255 / 34%) 284deg,
        rgb(7 186 255 / 10%) 360deg
      );
      box-shadow:
        rgb(0 161 255 / 24%) 0 5px 15px -2px,
        rgb(7 186 255 / 12%) 0 0 10px 0;
    }

    .screen.heat.heating .glow {
      animation: heating 3s ease-in infinite;
    }

    .screen.cool.cooling .glow {
      animation: cooling 3s ease-in infinite;
    }

    .handle {
      width: 180px;
      height: 180px;
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
    .outside-temperature {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 2;
      pointer-events: none;
    }

    .name {
      top: 24px;
      padding: 0 36px;
      overflow: hidden;
      color: rgb(224 224 224 / 76%);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
      font-size: 9px;
      line-height: 1.2;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .current {
      top: 50%;
      transform: translateY(-58%);
      padding-left: 7px;
      font-family: "Oswald", "Arial Narrow", Roboto, sans-serif;
      font-size: 56px;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }

    .current .degree {
      display: inline-block;
      margin-left: 2px;
      transform: translateY(-25px);
      font-size: 30px;
    }

    .current .unknown {
      opacity: 0.45;
    }

    .status {
      bottom: 37px;
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
      position: relative;
      top: -4px;
      flex: 0 0 18px;
      width: 18px;
      height: 18px;
      --mdc-icon-size: 18px;
    }

    .status span {
      line-height: 18px;
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

    .outside-temperature {
      bottom: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(202 202 202 / 62%);
      font-size: 12px;
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
      width: 8px;
      height: 8px;
      margin: 11px 3px 0 auto;
      border-radius: 50%;
      background: rgb(154 40 40);
      pointer-events: auto;
      transition: width 150ms ease, height 150ms ease, box-shadow 150ms ease;
    }

    .dragging .pointer-dot {
      width: 12px;
      height: 12px;
      margin-top: 9px;
      background: rgb(255 0 0);
      box-shadow: 0 0 6px 1px red;
    }

    .pointer-value {
      position: absolute;
      right: 18px;
      top: -3px;
      opacity: 0;
      visibility: hidden;
      font-family: Roboto, sans-serif;
      font-size: 10px;
      font-variant-numeric: tabular-nums;
      transform: rotate(80deg);
      transform-origin: center;
      transition: opacity 120ms ease;
      pointer-events: none;
    }

    .pointer-dot:hover + .pointer-value,
    .dragging .pointer-value {
      opacity: 1;
      visibility: visible;
    }

    .dragging .pointer-value {
      font-size: 13px;
      font-weight: 600;
    }

    @keyframes heating {
      0%,
      100% {
        filter: brightness(1.18);
        opacity: 1;
        box-shadow:
          rgb(255 177 0 / 95%) 0 5px 18px -2px,
          rgb(255 143 7 / 46%) 0 0 14px 0;
      }
      60% {
        filter: brightness(0.88);
        opacity: 0.32;
        box-shadow:
          rgb(255 177 0 / 30%) 0 4px 14px -2px,
          rgb(255 143 7 / 14%) 0 0 8px 0;
      }
    }

    @keyframes cooling {
      0%,
      100% {
        filter: brightness(1.18);
        opacity: 1;
        box-shadow:
          rgb(0 161 255 / 100%) 0 5px 18px -2px,
          rgb(7 186 255 / 48%) 0 0 14px 0;
      }
      60% {
        filter: brightness(0.88);
        opacity: 0.32;
        box-shadow:
          rgb(0 161 255 / 30%) 0 4px 14px -2px,
          rgb(7 186 255 / 14%) 0 0 8px 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .glow {
        animation: none !important;
      }
    }
  `}};t([pt({type:String})],mt.prototype,"name",void 0),t([pt({type:Number})],mt.prototype,"currentTemperature",void 0),t([pt({type:Number})],mt.prototype,"targetTemperature",void 0),t([pt({type:Number})],mt.prototype,"outsideTemperature",void 0),t([pt({type:String})],mt.prototype,"mode",void 0),t([pt({type:String})],mt.prototype,"action",void 0),t([pt({type:String})],mt.prototype,"statusLabel",void 0),t([pt({type:String})],mt.prototype,"statusIcon",void 0),t([pt({attribute:!1})],mt.prototype,"range",void 0),t([pt({type:Boolean})],mt.prototype,"disabled",void 0),t([ut()],mt.prototype,"selectedTemperature",void 0),t([ut()],mt.prototype,"dragging",void 0),mt=t([ct("plant-temperature-dial")],mt);const gt=22,ft=23,bt=1;function yt(t){const e="number"==typeof t?t:Number.parseFloat(String(t));return Number.isFinite(e)?e:void 0}function vt(t){if(t&&"unknown"!==t.state&&"unavailable"!==t.state)return yt(t.state)}function _t(t){if(t&&"unknown"!==t.state&&"unavailable"!==t.state)return"on"===t.state}function $t(t,e){return"off"!==t&&"heat_cool"!==t&&"auto"!==t||"heat"!==e&&"cool"!==e?t:e}function xt(t){const{mode:e,plantMode:i,entityMin:r,entityMax:n,config:o}=t,s=$t(e,i);let a=r,l=n;return"heat"===s&&(l=Math.min(l,o.heat_manual_max??gt)),"cool"!==s&&"dry"!==s||(a=Math.max(a,function(t=ft){return Math.max(ft,t)}(o.cool_manual_min??ft))),a>l&&(a=l),{min:a,max:l,step:o.temperature_step??bt,effectiveMode:s}}function wt(t,e){return function(t,e,i=0){const r=Math.round((t-i)/e)*e+i;return Number(r.toFixed(3))}(Math.min(e.max,Math.max(e.min,t)),e.step,e.min)}function At(t,e){return{off:"Aus",heating:"Heizt",cooling:"Kühlt",drying:"Entfeuchtet",fan:"Lüftet",idle:"Hält",defrosting:"Abtauung",preheating:"Vorheizen"}[t]??(t||function(t){return{off:"Aus",heat:"Heizen",cool:"Kühlen",heat_cool:"Automatik",auto:"Automatik",dry:"Entfeuchten",fan_only:"Lüften"}[t]??t}(e))}function Et(t,e){return{heating:"mdi:fire",cooling:"mdi:snowflake",drying:"mdi:water-percent",fan:"mdi:fan",idle:"mdi:pause-circle-outline",defrosting:"mdi:snowflake-melt",preheating:"mdi:radiator"}[t]??function(t){return{off:"mdi:power-standby",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:autorenew",auto:"mdi:autorenew",dry:"mdi:water-percent",fan_only:"mdi:fan"}[t]??"mdi:thermostat"}(e)}const St={entity:"Climate-Entity",name:"Anzeigename",room_enable_entity:"Raumfreigabe",outside_temperature_entity:"Außentemperatur",heat_default:"Heiz-Startwert",heat_manual_max:"Heizen manuell maximal",cool_auto_default:"Kühl-Startwert mindestens",cool_manual_min:"Kühlen manuell mindestens",cool_outdoor_delta:"Maximale Differenz zur Außentemperatur",temperature_step:"Sollwert-Schrittweite",show_fan:"Lüfterstufen anzeigen"};let Tt=class extends at{static getStubConfig(t,e){const i=e?.find(t=>t.startsWith("climate."))??Object.keys(t?.states??{}).find(t=>t.startsWith("climate."));return i?{entity:i}:{}}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{type:"grid",name:"",flatten:!0,column_min_width:"220px",schema:[{name:"name",selector:{text:{}}},{name:"room_enable_entity",selector:{entity:{domain:"input_boolean"}}},{name:"outside_temperature_entity",selector:{entity:{domain:"sensor"}}}]},{type:"expandable",title:"Grenzwerte",name:"",flatten:!0,schema:[{type:"grid",name:"",flatten:!0,schema:[{name:"heat_default",selector:{number:{min:16,max:23,step:1,mode:"box"}}},{name:"heat_manual_max",selector:{number:{min:16,max:30,step:1,mode:"box"}}},{name:"cool_auto_default",selector:{number:{min:18,max:30,step:1,mode:"box"}}},{name:"cool_manual_min",selector:{number:{min:23,max:30,step:1,mode:"box"}}},{name:"cool_outdoor_delta",selector:{number:{min:1,max:15,step:1,mode:"box"}}},{name:"temperature_step",selector:{number:{min:1,max:2,step:1,mode:"box"}}}]}]},{type:"grid",name:"",flatten:!0,schema:[{name:"show_fan",selector:{boolean:{}}}]}],computeLabel:t=>t.name?St[t.name]:void 0,computeHelper:t=>"outside_temperature_entity"===t.name?"Für die 8-K-Regel. Vorläufig der Sensor der Bosch-Außeneinheit.":"room_enable_entity"===t.name?"Diese Freigabe ist der Ein-/Aus-Schalter der Card.":void 0,assertConfig:t=>{if(!t.entity||!t.entity.startsWith("climate."))throw new Error("Eine Climate-Entity ist erforderlich.")}}}setConfig(t){if(!t?.entity)throw new Error("Eine Climate-Entity ist erforderlich.");if(!t.entity.startsWith("climate."))throw new Error("Die Entity muss aus der Domain climate stammen.");this.config={heat_default:21,heat_manual_max:22,cool_auto_default:25,cool_manual_min:23,cool_outdoor_delta:8,temperature_step:1,show_fan:!0,...t}}getCardSize(){return 6}getGridOptions(){return{columns:6,min_columns:3,max_columns:12,rows:6,min_rows:5}}render(){if(!this.hass||!this.config)return W;const t=this.entity(this.config.entity);if(!t)return F`
        <ha-card>
          <div class="error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            <span>Entity nicht gefunden: ${this.config.entity}</span>
          </div>
        </ha-card>
      `;const e="unavailable"===t.state||"unknown"===t.state,i=e?"off":t.state,r=void 0===t.attributes.hvac_action?void 0:String(t.attributes.hvac_action),n=this.config.name??String(t.attributes.friendly_name??this.config.entity),o=yt(t.attributes.current_temperature),s=yt(t.attributes.temperature),a=this.pendingTemperature??s,l=vt(this.entity(this.config.outside_temperature_entity)),c=this.entity(this.config.plant_mode_entity)?.state??void 0,h=this.entity(this.config.controller_state_entity)?.state??void 0,d=this.entity(this.config.blocking_reason_entity)?.state??void 0,p=this.roomEnableEntity(),u=_t(this.entity(p)),m=_t(this.entity(this.config.global_enable_entity)),g=!0===_t(this.entity(this.config.fault_entity)),f=!0===_t(this.entity(this.config.defrost_entity)),b=!0===_t(this.entity(this.config.window_entity)),y="changeover"===h,v=e||!1===u||!1===m||g||b||y,_=e,$=this.visualMode(i,r,c),x=function(t){const{mode:e,plantMode:i,currentTemperature:r,targetTemperature:n,controlsBlocked:o=!1,reportedAction:s}=t;if("off"===e)return"off";const a=$t(e,i);if("off"===a)return"off";if(o)return"idle";if(void 0!==r&&void 0!==n){if("cool"===a)return n<r?"cooling":"idle";if("heat"===a)return r<n?"heating":"idle"}return s??"idle"}({mode:i,plantMode:c,currentTemperature:o,targetTemperature:a,controlsBlocked:v,reportedAction:r}),w=this.temperatureRange(t,i,c,l),A=this.stringArray(t.attributes.fan_modes),E=String(t.attributes.fan_mode??""),S=this.dialState({mode:$,action:x,roomEnableState:u,globalEnableState:m,fault:g,defrost:f,windowOpen:b,changeover:y,blockingReason:d});return F`
      <ha-card>
        <div class="card">
          <button
            class="more-info"
            type="button"
            title="Details öffnen"
            aria-label=${`Details für ${n} öffnen`}
            @click=${this.showMoreInfo}
          >
            <ha-icon icon="mdi:dots-vertical"></ha-icon>
          </button>

          <plant-temperature-dial
            .name=${n}
            .currentTemperature=${o}
            .targetTemperature=${a}
            .outsideTemperature=${l}
            .mode=${$}
            .action=${x}
            .statusLabel=${S.label}
            .statusIcon=${S.icon}
            .range=${w}
            .disabled=${_}
            @temperature-changed=${this.onTemperatureChanged}
          ></plant-temperature-dial>

          <div class="bottom-controls ${$}">
            <button
              class="icon-control power ${!0===u?"active":""}"
              type="button"
              aria-label=${!0===u?"Klimaanlage manuell ausschalten":"Klimaanlage manuell einschalten"}
              title=${p?!0===u?"Manuell ausschalten":"Manuell einschalten":"Raumfreigabe fehlt"}
              aria-pressed=${!0===u?"true":"false"}
              ?disabled=${!p}
              @click=${()=>this.toggleRoomEnable(p)}
            >
              <ha-icon icon="mdi:power-standby"></ha-icon>
            </button>

            ${!1!==this.config.show_fan?A.map(t=>F`
                    <button
                      type="button"
                      class="icon-control fan ${t===E?"active":""}"
                      title=${this.fanLabel(t)}
                      aria-label=${`Lüfter ${this.fanLabel(t)}`}
                      aria-pressed=${t===E?"true":"false"}
                      ?disabled=${v||"off"===i}
                      @click=${()=>this.setFanMode(t)}
                    >
                      <ha-icon .icon=${function(t){return{auto:"mdi:fan-auto",low:"mdi:fan-speed-1",medium:"mdi:fan-speed-2",high:"mdi:fan-speed-3",turbo:"mdi:fan-plus"}[t.toLowerCase()]??"mdi:fan"}(t)}></ha-icon>
                    </button>
                  `):W}
          </div>

          ${this.serviceError?F`
                <div class="service-error">
                  <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                  <span>${this.serviceError}</span>
                </div>
              `:W}
        </div>
      </ha-card>
    `}dialState(t){if(t.fault)return{label:"Störung",icon:"mdi:alert-octagon"};if(t.defrost)return{label:"Abtauung",icon:"mdi:snowflake-melt"};if(t.windowOpen)return{label:"Fenster offen",icon:"mdi:window-open-variant"};if(t.changeover)return{label:"Moduswechsel",icon:"mdi:swap-horizontal"};if(!1===t.globalEnableState)return{label:"Gesperrt",icon:"mdi:home-lock"};if(!1===t.roomEnableState)return{label:"Gesperrt",icon:"mdi:lock"};if(t.blockingReason&&!["none","kein","unknown","unavailable",""].includes(t.blockingReason.toLowerCase()))return{label:"Gesperrt",icon:"mdi:lock-clock"};const e=(i=t.mode,r=t.action,"heat"===i?{label:"heating"===r?"Heizen":"Lüften",icon:"mdi:fire"}:"cool"===i?{label:"cooling"===r?"Kühlen":"Lüften",icon:"mdi:snowflake"}:void 0);var i,r;return e||("dry"===t.mode?{label:"Entfeuchten",icon:"mdi:water-percent"}:{label:At(t.action,t.mode),icon:Et(t.action,t.mode)})}entity(t){return t?this.hass?.states[t]:void 0}temperatureRange(t,e,i,r){return xt({mode:e,plantMode:i,entityMin:yt(t.attributes.min_temp)??16,entityMax:yt(t.attributes.max_temp)??30,config:this.config})}stringArray(t){return Array.isArray(t)?t.filter(t=>"string"==typeof t):[]}roomEnableEntity(){if(this.config.room_enable_entity)return this.config.room_enable_entity;const t=function(t){const e=/^climate\.(.+)_inneneinheit$/.exec(t);return e?`input_boolean.${e[1]}_01_freigabe`:void 0}(this.config.entity);return t&&this.entity(t)?t:void 0}async toggleRoomEnable(t){if(!this.hass||!t)return;const e=_t(this.entity(t));await this.callService("input_boolean",!0===e?"turn_off":"turn_on",{entity_id:t})}onTemperatureChanged(t){this.setTemperature(t.detail.temperature)}showMoreInfo(){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0}))}async setTemperature(t){const e=this.entity(this.config.entity);if(!e)return;const i=vt(this.entity(this.config.outside_temperature_entity)),r=wt(t,this.temperatureRange(e,e.state,this.entity(this.config.plant_mode_entity)?.state,i));this.pendingTemperature=r;await this.callService("climate","set_temperature",{entity_id:this.config.entity,temperature:r})?window.setTimeout(()=>{this.pendingTemperature=void 0},2500):this.pendingTemperature=void 0}async setFanMode(t){await this.callService("climate","set_fan_mode",{entity_id:this.config.entity,fan_mode:t})}async callService(t,e,i){if(!this.hass)return!1;this.serviceError=void 0;try{return await this.hass.callService(t,e,i),!0}catch(t){return this.serviceError=t instanceof Error?t.message:"Befehl konnte nicht gesendet werden.",!1}}fanLabel(t){return{auto:"Auto",low:"Niedrig",medium:"Mittel",high:"Hoch",turbo:"Turbo"}[t.toLowerCase()]??t}visualMode(t,e,i){return"heating"===e?"heat":"cooling"===e?"cool":"heat_cool"!==t&&"auto"!==t||!i?t:i}static{this.styles=s`
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
      background: var(--plant-climate-card-background, rgb(28 29 31));
      box-shadow:
        inset 0 1px 0 rgb(255 255 255 / 2%),
        var(--ha-card-box-shadow, 0 2px 6px rgb(0 0 0 / 35%));
    }

    .card {
      position: relative;
      min-height: 280px;
      padding: 0 14px;
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

    .more-info {
      position: absolute;
      z-index: 3;
      top: 8px;
      right: 7px;
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: transparent;
      color: rgb(204 204 204);
      opacity: 0.78;
      transition:
        background 140ms ease,
        color 140ms ease,
        opacity 140ms ease;
    }

    .more-info:hover,
    .more-info:focus-visible {
      background: rgb(255 255 255 / 6%);
      color: rgb(238 238 238);
      opacity: 1;
    }

    .more-info ha-icon {
      width: 24px;
      height: 24px;
      --mdc-icon-size: 24px;
    }

    .bottom-controls {
      min-height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
      margin: 0 auto;
    }

    .icon-control {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: rgb(27 28 30);
      box-shadow:
        inset 0 1px 1px rgb(255 255 255 / 3%),
        rgb(0 0 0 / 82%) 0 0 4px 0;
      color: rgb(204 204 204);
      transition:
        color 140ms ease,
        box-shadow 140ms ease,
        opacity 140ms ease,
        transform 140ms ease;
    }

    .icon-control:not(:disabled):active {
      transform: translateY(1px);
    }

    .icon-control:disabled {
      cursor: default;
      opacity: 0.34;
    }

    .icon-control ha-icon {
      width: 22px;
      height: 22px;
      --mdc-icon-size: 22px;
    }

    .icon-control.active {
      box-shadow: rgb(0 0 0 / 82%) 0 0 7px -2px;
    }

    .icon-control.power.active {
      color: var(--off-color);
    }

    .bottom-controls.heat .icon-control.fan.active {
      color: var(--heat-color);
    }

    .bottom-controls.cool .icon-control.fan.active,
    .bottom-controls.dry .icon-control.fan.active {
      color: var(--cool-color);
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

  `}};t([pt({attribute:!1})],Tt.prototype,"hass",void 0),t([ut()],Tt.prototype,"config",void 0),t([ut()],Tt.prototype,"pendingTemperature",void 0),t([ut()],Tt.prototype,"serviceError",void 0),Tt=t([ct("plant-climate-card")],Tt),window.customCards=window.customCards??[],window.customCards.push({type:"plant-climate-card",name:"Plant Climate Card",description:"Plant-bewusste Klimakarte mit Node-RED-Freigaben und Bosch-Grenzwerten",preview:!0,getEntitySuggestion:(t,e)=>e.startsWith("climate.")?{config:{type:"custom:plant-climate-card",entity:e}}:null}),console.info("%c PLANT-CLIMATE-CARD %c 1.10.0 ","color:white;background:#111;padding:3px 5px;font-weight:700","color:#07b9ff;background:#111;padding:3px 5px");export{Tt as PlantClimateCard};
//# sourceMappingURL=plant-climate-card.js.map
