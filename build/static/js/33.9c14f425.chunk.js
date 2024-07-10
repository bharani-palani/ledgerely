/*! For license information please see 33.9c14f425.chunk.js.LICENSE.txt */
(this["webpackJsonpbni-apps"]=this["webpackJsonpbni-apps"]||[]).push([[33],{1181:function(e,t,n){"use strict";n.r(t);var r=n(25),o=n(30),a=n(34),i=n(36),c=n(27),l=n(1),s=n(187),u=n.n(s),d=n(1266),f=n(932),h=n(1282),p=n(933),v=n(35),y=n(340),m=n(90),b=n(775),j=n(1263),g=n(1182),x=n.n(g),O=n(46),w=n(0);t.default=function(e){var t=Object(b.a)(),n=Object(l.useContext)(m.a),s=Object(l.useContext)(v.a),g=Object(l.useContext)(y.BillingContext),k=Object(l.useState)(!1),C=Object(c.a)(k,2),_=C[0],L=C[1],P=g.summary,N=g.setSummary,E=g.cycleList,S=g.table,M=g.selectedPlan,I=g.cycleRef,z=g.total,D=g.billingLoader,F=g.setShowSessionPopup,G=g.subscribeLoader,T=g.setSubscribeLoader,A=g.setPaymentResponse,R=x()(),H=Object(c.a)(R,1)[0],V=function(){var e=new FormData;return e.append("count","month"===P.cycle?1:12),e.append("planId",P.razorPayPlanId),e.append("custId",P.razorPayCustomerId),O.a.post("/payments/razorpay/createSubscription",e)},Y=function(e){var t=new FormData;return t.append("paymentId",e),O.a.post("/payments/razorpay/onPayment",t)},J=Object(l.useCallback)(Object(i.a)(Object(o.a)().mark((function e(){return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:T(!0),V().then((function(e){var n,r,o,i,c,l,u,d,f,h,p,v,y,m=null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.response;console.log("bbb step 1 ",m);var b=(y={key:"rzp_test_iHG0MZA1HbTFSn",key_secret:"73OejmyvhYa8OuOUIPvgUVF5",currency:null===s||void 0===s||null===(r=s.userConfig)||void 0===r?void 0:r.currency,amount:100*P.invoice[0].value,subscription_id:null===m||void 0===m?void 0:m.id,name:"".concat(M.planCode," - ").concat(t.formatMessage({id:M.planDescription,defaultMessage:M.planDescription})),plan_id:null===P||void 0===P?void 0:P.razorPayPlanId},Object(a.a)(y,"currency",null===P||void 0===P?void 0:P.currency),Object(a.a)(y,"handler",(function(e){var t=e.razorpay_payment_id;Y(t).then((function(e){var n,r;console.log("bbb step 2 ",null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.response);var o=(null===e||void 0===e||null===(r=e.data)||void 0===r?void 0:r.response).status;"authorized"!==o&&"captured"!==o||(A({paymentId:t,subscriptionId:null===m||void 0===m?void 0:m.id}),F(!0))})).catch((function(e){return console.log(e)}))})),Object(a.a)(y,"modal",{escape:!1,handleback:!1,confirm_close:!0,ondismiss:function(){return!1},animation:!0}),Object(a.a)(y,"readonly",{contact:!0,email:!0,name:!0}),Object(a.a)(y,"hidden",{contact:!1,email:!1}),Object(a.a)(y,"prefill",{name:null===s||void 0===s||null===(o=s.userConfig)||void 0===o?void 0:o.name,email:null===s||void 0===s||null===(i=s.userConfig)||void 0===i?void 0:i.email,contact:null===s||void 0===s||null===(c=s.userConfig)||void 0===c?void 0:c.mobile,method:"card"}),Object(a.a)(y,"notes",{name:null===s||void 0===s||null===(l=s.userConfig)||void 0===l?void 0:l.name,mobile:null===s||void 0===s||null===(u=s.userConfig)||void 0===u?void 0:u.mobile,address1:null===s||void 0===s||null===(d=s.userConfig)||void 0===d?void 0:d.address1,address2:null===s||void 0===s||null===(f=s.userConfig)||void 0===f?void 0:f.address2,city:null===s||void 0===s||null===(h=s.userConfig)||void 0===h?void 0:h.city,country:null===s||void 0===s||null===(p=s.userConfig)||void 0===p?void 0:p.country,email:null===s||void 0===s||null===(v=s.userConfig)||void 0===v?void 0:v.email}),Object(a.a)(y,"theme",{color:document.documentElement.style.getPropertyValue("--app-theme-bg-color")}),y);new H(b).open()})).catch((function(e){return console.log(e)})).finally((function(){return T(!1)}));case 2:case"end":return e.stop()}}),e)}))),[P,t]),U=[{id:0,href:n.cancellationRefundPolicyLink,label:t.formatMessage({id:"cancellationPolicy",defaultMessage:"cancellationPolicy"})},{id:1,href:n.termsOfServiceLink,label:t.formatMessage({id:"termsOfService",defaultMessage:"termsOfService"})},{id:2,href:n.privacyPolicyLink,label:t.formatMessage({id:"privacyPolicy",defaultMessage:"privacyPolicy"})}];return Object(w.jsxs)("div",{className:"my-3",children:[Object(w.jsx)("div",{className:"fs-3",children:Object(w.jsx)(j.a,{id:"summary",defaultMessage:"summary"})}),Object(w.jsxs)(d.a,{className:"p-2",children:[Object(w.jsx)(f.a,{md:6,className:"receipt rounded",style:{"--theme-color":"dark"===s.userData.theme?"#111":"#eee"},children:Object(w.jsx)("div",{className:"p-4",style:{background:"dark"===s.userData.theme?"#111":"#eee",color:"dark"===s.userData.theme?"#fff":"#000"},children:Object(w.jsxs)("div",{style:{height:"12rem"},className:"position-relative",children:[P.invoice.map((function(e,t){return Object(w.jsxs)(f.a,{xs:12,className:"d-flex justify-content-between align-items-center py-1",children:[Object(w.jsxs)("div",{children:[Object(w.jsx)("span",{children:Object(w.jsx)(j.a,{id:e.id,defaultMessage:e.id})}),Object(w.jsx)("span",{className:"ps-2",children:e.title?"(".concat(e.title,")"):""})]}),Object(w.jsx)("div",{children:D?Object(w.jsx)("i",{className:"fa fa-circle-o-notch fa-spin"}):e.value})]},e.id)})),Object(w.jsxs)("div",{style:{borderTop:"dotted 5px #aeaeae",position:"absolute",width:"100%",bottom:0},className:"d-flex justify-content-between align-items-center py-2",children:[Object(w.jsx)("div",{children:Object(w.jsx)(j.a,{id:"total",defaultMessage:"total"})}),Object(w.jsx)("div",{children:z.toFixed(2)})]})]})})}),Object(w.jsxs)(f.a,{md:6,className:"p-2",children:[Object(w.jsxs)("div",{className:"d-flex justify-content-between align-items-center py-1",children:[Object(w.jsx)("div",{children:Object(w.jsx)(j.a,{id:"paymentCycle",defaultMessage:"paymentCycle"})}),Object(w.jsx)("div",{children:Object(w.jsx)(h.a.Select,{value:P.cycle,disabled:!M.planCode,size:"sm",onChange:function(e){var t=S.filter((function(e){return e.planCode===M.planCode}))[0][I[e.target.value].prop],n=S.filter((function(e){return e.planCode===M.planCode}))[0][I[e.target.value].razorPayProp];N((function(o){return Object(r.a)(Object(r.a)({},o),{},{razorPayPlanId:n,cycle:e.target.value,invoice:o.invoice.map((function(e){return"price"===e.id?Object.assign(e,{value:t}):e}))})}))},children:E.map((function(e,t){return Object(w.jsx)("option",{value:e.value,children:e.label},t)}))})})]}),U.map((function(e){return Object(w.jsx)("div",{className:"py-1",children:Object(w.jsx)("a",{target:"_blank",rel:"noreferrer",className:"link-primary",href:e.href,children:e.label})},e.id)})),Object(w.jsxs)("div",{className:"d-flex justify-content-between align-items-center py-1",children:[Object(w.jsx)("div",{children:Object(w.jsx)(j.a,{id:"iAgreeTerms",defaultMessage:"iAgreeTerms"})}),Object(w.jsx)("div",{children:Object(w.jsx)(u.a,{className:"".concat(M.planCode?"animate__animated animate__headShake infiniteAnimation":""),onColor:document.documentElement.style.getPropertyValue("--app-theme-bg-color"),offColor:document.documentElement.style.getPropertyValue("--app-theme-color"),offHandleColor:"dark"===s.userData.theme?"#555":"#ddd",onHandleColor:"dark"===s.userData.theme?"#555":"#ddd",handleDiameter:15,checkedIcon:!1,uncheckedIcon:!1,height:10,width:30,onChange:function(e){L(e)},checked:_})})]}),Object(w.jsx)("div",{className:"p-1",children:Object(w.jsxs)(p.a,{disabled:!(_&&z>0&&!D),className:"btn btn-bni w-100 border-0 d-flex justify-content-between align-items-center",onClick:J,children:[Object(w.jsx)(j.a,{id:"subscribeNow",defaultMessage:"subscribeNow"}),Object(w.jsx)("div",{children:G?Object(w.jsx)("i",{className:"fa p-1 fa-2x fa-circle-o-notch fa-spin"}):Object(w.jsx)(y.CurrencyPrice,{amount:z,suffix:I[P.cycle].suffix,symbol:M.planPriceCurrencySymbol})})]})})]})]})]})}},1182:function(e,t,n){"use strict";var r=n(1183).default,o=n(460).default,a=n(227).default,i=n(228).default,c=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{l(r.next(e))}catch(t){a(t)}}function c(e){try{l(r.throw(e))}catch(t){a(t)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}l((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});var l=n(1),s=function(){function e(t){a(this,e),this.options=t,"undefined"!==typeof window&&(this.rzrpayInstannce=new window.Razorpay(this.options))}return i(e,[{key:"on",value:function(e,t){this.rzrpayInstannce.on(e,t)}},{key:"open",value:function(){this.rzrpayInstannce.open()}}]),e}();t.default=function(){var e=(0,l.useMemo)((function(){return"undefined"!==typeof window}),[]),t=(0,l.useState)(!1),n=o(t,2),a=n[0],i=n[1],u=(0,l.useCallback)((function(){return!(!e||!("Razorpay"in window))}),[]),d=(0,l.useCallback)((function(t){if(e)return new Promise((function(e,n){var r=document.createElement("script");r.src=t,r.onload=function(t){i(!0),e(t)},r.onerror=function(e){return n(e)},document.body.appendChild(r)}))}),[]);return(0,l.useEffect)((function(){u()||c(void 0,void 0,void 0,r().mark((function e(){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d("https://checkout.razorpay.com/v1/checkout.js");case 3:e.next=8;break;case 5:throw e.prev=5,e.t0=e.catch(0),new Error(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))}),[]),[s,a]}},1183:function(e,t,n){var r=n(229).default;function o(){"use strict";e.exports=o=function(){return t},e.exports.__esModule=!0,e.exports.default=e.exports;var t={},n=Object.prototype,a=n.hasOwnProperty,i=Object.defineProperty||function(e,t,n){e[t]=n.value},c="function"==typeof Symbol?Symbol:{},l=c.iterator||"@@iterator",s=c.asyncIterator||"@@asyncIterator",u=c.toStringTag||"@@toStringTag";function d(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{d({},"")}catch(S){d=function(e,t,n){return e[t]=n}}function f(e,t,n,r){var o=t&&t.prototype instanceof v?t:v,a=Object.create(o.prototype),c=new P(r||[]);return i(a,"_invoke",{value:k(e,n,c)}),a}function h(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(S){return{type:"throw",arg:S}}}t.wrap=f;var p={};function v(){}function y(){}function m(){}var b={};d(b,l,(function(){return this}));var j=Object.getPrototypeOf,g=j&&j(j(N([])));g&&g!==n&&a.call(g,l)&&(b=g);var x=m.prototype=v.prototype=Object.create(b);function O(e){["next","throw","return"].forEach((function(t){d(e,t,(function(e){return this._invoke(t,e)}))}))}function w(e,t){function n(o,i,c,l){var s=h(e[o],e,i);if("throw"!==s.type){var u=s.arg,d=u.value;return d&&"object"==r(d)&&a.call(d,"__await")?t.resolve(d.__await).then((function(e){n("next",e,c,l)}),(function(e){n("throw",e,c,l)})):t.resolve(d).then((function(e){u.value=e,c(u)}),(function(e){return n("throw",e,c,l)}))}l(s.arg)}var o;i(this,"_invoke",{value:function(e,r){function a(){return new t((function(t,o){n(e,r,t,o)}))}return o=o?o.then(a,a):a()}})}function k(e,t,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return E()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=C(i,n);if(c){if(c===p)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var l=h(e,t,n);if("normal"===l.type){if(r=n.done?"completed":"suspendedYield",l.arg===p)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r="completed",n.method="throw",n.arg=l.arg)}}}function C(e,t){var n=t.method,r=e.iterator[n];if(void 0===r)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,C(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),p;var o=h(r,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,p;var a=o.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,p):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,p)}function _(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function L(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function P(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(_,this),this.reset(!0)}function N(e){if(e){var t=e[l];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,r=function t(){for(;++n<e.length;)if(a.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:E}}function E(){return{value:void 0,done:!0}}return y.prototype=m,i(x,"constructor",{value:m,configurable:!0}),i(m,"constructor",{value:y,configurable:!0}),y.displayName=d(m,u,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,m):(e.__proto__=m,d(e,u,"GeneratorFunction")),e.prototype=Object.create(x),e},t.awrap=function(e){return{__await:e}},O(w.prototype),d(w.prototype,s,(function(){return this})),t.AsyncIterator=w,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new w(f(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},O(x),d(x,u,"Generator"),d(x,l,(function(){return this})),d(x,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=N,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,r){return i.type="throw",i.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],i=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=a.call(o,"catchLoc"),l=a.call(o,"finallyLoc");if(c&&l){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),L(n),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;L(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:N(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),p}},t}e.exports=o,e.exports.__esModule=!0,e.exports.default=e.exports}}]);