/*! For license information please see 31.844617cf.chunk.js.LICENSE.txt */
(this["webpackJsonpbni-apps"]=this["webpackJsonpbni-apps"]||[]).push([[31],{1181:function(e,t,n){"use strict";n.r(t);var r=n(25),a=n(29),i=n(36),o=n(35),c=n(27),s=n(1),l=n(201),u=n.n(l),d=n(1263),f=n(933),h=n(1279),p=n(934),v=n(38),m=n(349),y=n(71),j=n(777),b=n(1260),g=n(1182),x=n.n(g),O=n(47),w=n(369),N=n(0);t.default=function(e){var t=Object(j.a)(),n=Object(s.useContext)(y.a),l=Object(s.useContext)(v.a),g=Object(s.useContext)(m.BillingContext),k=Object(s.useState)(!1),C=Object(c.a)(k,2),_=C[0],L=C[1],P=g.summary,M=g.setSummary,E=g.cycleList,S=g.table,z=g.selectedPlan,I=g.cycleRef,F=g.total,D=g.billingLoader,G=g.setShowSessionPopup,T=g.subscribeLoader,R=g.setSubscribeLoader,A=x()(),H=Object(c.a)(A,1)[0],V=function(){var e=new FormData;return e.append("count","month"===P.cycle?1:12),e.append("planId",P.razorPayPlanId),e.append("custId",P.razorPayCustomerId),O.a.post("/payments/razorpay/createSubscription",e)},Y=function(e){var t=new FormData;return t.append("paymentId",e),O.a.post("/payments/razorpay/onPayment",t)},J=Object(s.useCallback)(Object(o.a)(Object(a.a)().mark((function e(){return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:R(!0),V().then((function(e){var n,r,a,o,c,s,u,d,f,h,p,v,m,y=null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.response,j=(m={key:"rzp_test_iHG0MZA1HbTFSn",key_secret:"73OejmyvhYa8OuOUIPvgUVF5",currency:null===l||void 0===l||null===(r=l.userConfig)||void 0===r?void 0:r.currency,amount:100*P.invoice[0].value,subscription_id:null===y||void 0===y?void 0:y.id,name:"".concat(z.planCode," - ").concat(t.formatMessage({id:z.planDescription,defaultMessage:z.planDescription})),plan_id:null===P||void 0===P?void 0:P.razorPayPlanId},Object(i.a)(m,"currency",null===P||void 0===P?void 0:P.currency),Object(i.a)(m,"handler",(function(e){var t=e.razorpay_payment_id;Y(t).then((function(e){var t,n=(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.response).status;"authorized"===n||"captured"===n?G(!0):myAlertContext.setConfig({show:!0,className:"alert-danger border-0 text-dark",type:"danger",dismissible:!1,heading:Object(N.jsx)(w.b,{}),content:Object(N.jsx)(w.a,{})})})).catch((function(e){return console.log(e)}))})),Object(i.a)(m,"modal",{escape:!1,handleback:!1,confirm_close:!0,ondismiss:function(){return!1},animation:!0}),Object(i.a)(m,"readonly",{contact:!0,email:!0,name:!0}),Object(i.a)(m,"hidden",{contact:!1,email:!1}),Object(i.a)(m,"prefill",{name:null===l||void 0===l||null===(a=l.userConfig)||void 0===a?void 0:a.name,email:null===l||void 0===l||null===(o=l.userConfig)||void 0===o?void 0:o.email,contact:null===l||void 0===l||null===(c=l.userConfig)||void 0===c?void 0:c.mobile,method:"card"}),Object(i.a)(m,"notes",{name:null===l||void 0===l||null===(s=l.userConfig)||void 0===s?void 0:s.name,mobile:null===l||void 0===l||null===(u=l.userConfig)||void 0===u?void 0:u.mobile,address1:null===l||void 0===l||null===(d=l.userConfig)||void 0===d?void 0:d.address1,address2:null===l||void 0===l||null===(f=l.userConfig)||void 0===f?void 0:f.address2,city:null===l||void 0===l||null===(h=l.userConfig)||void 0===h?void 0:h.city,country:null===l||void 0===l||null===(p=l.userConfig)||void 0===p?void 0:p.country,email:null===l||void 0===l||null===(v=l.userConfig)||void 0===v?void 0:v.email}),Object(i.a)(m,"theme",{color:document.documentElement.style.getPropertyValue("--app-theme-bg-color")}),m);new H(j).open()})).catch((function(e){return console.log(e)})).finally((function(){return R(!1)}));case 2:case"end":return e.stop()}}),e)}))),[P,t]),U=[{id:0,href:n.cancellationRefundPolicyLink,label:t.formatMessage({id:"cancellationPolicy",defaultMessage:"cancellationPolicy"})},{id:1,href:n.termsOfServiceLink,label:t.formatMessage({id:"termsOfService",defaultMessage:"termsOfService"})},{id:2,href:n.privacyPolicyLink,label:t.formatMessage({id:"privacyPolicy",defaultMessage:"privacyPolicy"})}];return Object(N.jsxs)("div",{className:"my-3",children:[Object(N.jsx)("div",{className:"fs-3",children:Object(N.jsx)(b.a,{id:"summary",defaultMessage:"summary"})}),Object(N.jsxs)(d.a,{className:"p-2",children:[Object(N.jsx)(f.a,{md:6,className:"receipt rounded",style:{"--theme-color":"dark"===l.userData.theme?"#111":"#eee"},children:Object(N.jsx)("div",{className:"p-4",style:{background:"dark"===l.userData.theme?"#111":"#eee",color:"dark"===l.userData.theme?"#fff":"#000"},children:Object(N.jsxs)("div",{style:{height:"12rem"},className:"position-relative",children:[P.invoice.map((function(e,t){return Object(N.jsxs)(f.a,{xs:12,className:"d-flex justify-content-between align-items-center py-1",children:[Object(N.jsxs)("div",{children:[Object(N.jsx)("span",{children:Object(N.jsx)(b.a,{id:e.id,defaultMessage:e.id})}),Object(N.jsx)("span",{className:"ps-2",children:e.title?"(".concat(e.title,")"):""})]}),Object(N.jsx)("div",{children:D?Object(N.jsx)("i",{className:"fa fa-circle-o-notch fa-spin"}):e.value})]},e.id)})),Object(N.jsxs)("div",{style:{borderTop:"dotted 5px #aeaeae",position:"absolute",width:"100%",bottom:0},className:"d-flex justify-content-between align-items-center py-2",children:[Object(N.jsx)("div",{children:Object(N.jsx)(b.a,{id:"total",defaultMessage:"total"})}),Object(N.jsx)("div",{children:F.toFixed(2)})]})]})})}),Object(N.jsxs)(f.a,{md:6,className:"p-2",children:[Object(N.jsxs)("div",{className:"d-flex justify-content-between align-items-center py-1",children:[Object(N.jsx)("div",{children:Object(N.jsx)(b.a,{id:"paymentCycle",defaultMessage:"paymentCycle"})}),Object(N.jsx)("div",{children:Object(N.jsx)(h.a.Select,{value:P.cycle,disabled:!z.planCode,size:"sm",onChange:function(e){var t=S.filter((function(e){return e.planCode===z.planCode}))[0][I[e.target.value].prop],n=S.filter((function(e){return e.planCode===z.planCode}))[0][I[e.target.value].razorPayProp];M((function(a){return Object(r.a)(Object(r.a)({},a),{},{razorPayPlanId:n,cycle:e.target.value,invoice:a.invoice.map((function(e){return"price"===e.id?Object.assign(e,{value:t}):e}))})}))},children:E.map((function(e,t){return Object(N.jsx)("option",{value:e.value,children:e.label},t)}))})})]}),U.map((function(e){return Object(N.jsx)("div",{className:"py-1",children:Object(N.jsx)("a",{target:"_blank",rel:"noreferrer",className:"link-primary",href:e.href,children:e.label})},e.id)})),Object(N.jsxs)("div",{className:"d-flex justify-content-between align-items-center py-1",children:[Object(N.jsx)("div",{children:Object(N.jsx)(b.a,{id:"iAgreeTerms",defaultMessage:"iAgreeTerms"})}),Object(N.jsx)("div",{children:Object(N.jsx)(u.a,{className:"".concat(z.planCode?"animate__animated animate__headShake infiniteAnimation":""),onColor:document.documentElement.style.getPropertyValue("--app-theme-bg-color"),offColor:document.documentElement.style.getPropertyValue("--app-theme-color"),offHandleColor:"dark"===l.userData.theme?"#555":"#ddd",onHandleColor:"dark"===l.userData.theme?"#555":"#ddd",handleDiameter:15,checkedIcon:!1,uncheckedIcon:!1,height:10,width:30,onChange:function(e){L(e)},checked:_})})]}),Object(N.jsx)("div",{className:"p-1",children:Object(N.jsxs)(p.a,{disabled:!(_&&F>0&&!D),className:"btn btn-bni w-100 border-0 d-flex justify-content-between align-items-center",onClick:J,children:[Object(N.jsx)(b.a,{id:"subscribeNow",defaultMessage:"subscribeNow"}),Object(N.jsx)("div",{children:T?Object(N.jsx)("i",{className:"fa p-1 fa-1x fa-circle-o-notch fa-spin py-2"}):Object(N.jsx)(m.CurrencyPrice,{amount:F,suffix:I[P.cycle].suffix,symbol:z.planPriceCurrencySymbol})})]})})]})]})]})}},1182:function(e,t,n){"use strict";var r=n(1183).default,a=n(468).default,i=n(240).default,o=n(241).default,c=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(a,i){function o(e){try{s(r.next(e))}catch(t){i(t)}}function c(e){try{s(r.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}s((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});var s=n(1),l=function(){function e(t){i(this,e),this.options=t,"undefined"!==typeof window&&(this.rzrpayInstannce=new window.Razorpay(this.options))}return o(e,[{key:"on",value:function(e,t){this.rzrpayInstannce.on(e,t)}},{key:"open",value:function(){this.rzrpayInstannce.open()}}]),e}();t.default=function(){var e=(0,s.useMemo)((function(){return"undefined"!==typeof window}),[]),t=(0,s.useState)(!1),n=a(t,2),i=n[0],o=n[1],u=(0,s.useCallback)((function(){return!(!e||!("Razorpay"in window))}),[]),d=(0,s.useCallback)((function(t){if(e)return new Promise((function(e,n){var r=document.createElement("script");r.src=t,r.onload=function(t){o(!0),e(t)},r.onerror=function(e){return n(e)},document.body.appendChild(r)}))}),[]);return(0,s.useEffect)((function(){u()||c(void 0,void 0,void 0,r().mark((function e(){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d("https://checkout.razorpay.com/v1/checkout.js");case 3:e.next=8;break;case 5:throw e.prev=5,e.t0=e.catch(0),new Error(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))}),[]),[l,i]}},1183:function(e,t,n){var r=n(242).default;function a(){"use strict";e.exports=a=function(){return t},e.exports.__esModule=!0,e.exports.default=e.exports;var t={},n=Object.prototype,i=n.hasOwnProperty,o=Object.defineProperty||function(e,t,n){e[t]=n.value},c="function"==typeof Symbol?Symbol:{},s=c.iterator||"@@iterator",l=c.asyncIterator||"@@asyncIterator",u=c.toStringTag||"@@toStringTag";function d(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{d({},"")}catch(E){d=function(e,t,n){return e[t]=n}}function f(e,t,n,r){var a=t&&t.prototype instanceof v?t:v,i=Object.create(a.prototype),c=new L(r||[]);return o(i,"_invoke",{value:N(e,n,c)}),i}function h(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(E){return{type:"throw",arg:E}}}t.wrap=f;var p={};function v(){}function m(){}function y(){}var j={};d(j,s,(function(){return this}));var b=Object.getPrototypeOf,g=b&&b(b(P([])));g&&g!==n&&i.call(g,s)&&(j=g);var x=y.prototype=v.prototype=Object.create(j);function O(e){["next","throw","return"].forEach((function(t){d(e,t,(function(e){return this._invoke(t,e)}))}))}function w(e,t){function n(a,o,c,s){var l=h(e[a],e,o);if("throw"!==l.type){var u=l.arg,d=u.value;return d&&"object"==r(d)&&i.call(d,"__await")?t.resolve(d.__await).then((function(e){n("next",e,c,s)}),(function(e){n("throw",e,c,s)})):t.resolve(d).then((function(e){u.value=e,c(u)}),(function(e){return n("throw",e,c,s)}))}s(l.arg)}var a;o(this,"_invoke",{value:function(e,r){function i(){return new t((function(t,a){n(e,r,t,a)}))}return a=a?a.then(i,i):i()}})}function N(e,t,n){var r="suspendedStart";return function(a,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw i;return M()}for(n.method=a,n.arg=i;;){var o=n.delegate;if(o){var c=k(o,n);if(c){if(c===p)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=h(e,t,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===p)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}function k(e,t){var n=t.method,r=e.iterator[n];if(void 0===r)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,k(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),p;var a=h(r,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,p;var i=a.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,p):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,p)}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function _(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function L(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function P(e){if(e){var t=e[s];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,r=function t(){for(;++n<e.length;)if(i.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:M}}function M(){return{value:void 0,done:!0}}return m.prototype=y,o(x,"constructor",{value:y,configurable:!0}),o(y,"constructor",{value:m,configurable:!0}),m.displayName=d(y,u,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,d(e,u,"GeneratorFunction")),e.prototype=Object.create(x),e},t.awrap=function(e){return{__await:e}},O(w.prototype),d(w.prototype,l,(function(){return this})),t.AsyncIterator=w,t.async=function(e,n,r,a,i){void 0===i&&(i=Promise);var o=new w(f(e,n,r,a),i);return t.isGeneratorFunction(n)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},O(x),d(x,u,"Generator"),d(x,s,(function(){return this})),d(x,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=P,L.prototype={constructor:L,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(_),!e)for(var t in this)"t"===t.charAt(0)&&i.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,r){return o.type="throw",o.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r],o=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=i.call(a,"catchLoc"),s=i.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=e,o.arg=t,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),_(n),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;_(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:P(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),p}},t}e.exports=a,e.exports.__esModule=!0,e.exports.default=e.exports},369:function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return s}));n(1);var r=n(1260),a=n(0),i=function(){return Object(a.jsx)("div",{children:Object(a.jsxs)("div",{className:"d-flex align-items-center",children:[Object(a.jsx)("i",{className:"fa fa-check fa-2x pt-2 text-success"}),Object(a.jsxs)("div",{className:"ps-2",children:[Object(a.jsx)("div",{className:"fs-3",children:Object(a.jsx)(r.a,{id:"success",defaultMessage:"success"})}),Object(a.jsx)("div",{className:"fs-6",children:Object(a.jsx)(r.a,{id:"paymentReceived",defaultMessage:"paymentReceived"})})]})]})})},o=function(){return Object(a.jsx)("div",{className:"d-flex align-items-center justify-content-between",children:Object(a.jsx)("div",{children:Object(a.jsx)("span",{className:"fs-6",children:Object(a.jsx)(r.a,{id:"paymentSuccessMessage",defaultMessage:"paymentSuccessMessage"})})})})},c=function(){return Object(a.jsx)("div",{children:Object(a.jsxs)("div",{className:"d-flex align-items-center",children:[Object(a.jsx)("i",{className:"fa fa-times-circle fa-2x pt-2 text-danger"}),Object(a.jsxs)("div",{className:"ps-2",children:[Object(a.jsx)("div",{className:"fs-3",children:Object(a.jsx)(r.a,{id:"failed",defaultMessage:"failed"})}),Object(a.jsx)("div",{className:"fs-6",children:Object(a.jsx)(r.a,{id:"paymentNotReceived",defaultMessage:"paymentNotReceived"})})]})]})})},s=function(){return Object(a.jsx)("div",{className:"d-flex align-items-center justify-content-between",children:Object(a.jsx)("div",{children:Object(a.jsx)("span",{className:"fs-6",children:Object(a.jsx)(r.a,{id:"paymentFailMessage",defaultMessage:"paymentFailMessage"})})})})}}}]);