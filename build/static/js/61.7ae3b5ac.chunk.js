(this["webpackJsonpbni-apps"]=this["webpackJsonpbni-apps"]||[]).push([[61],{1185:function(e,t,s){"use strict";s.r(t);var a=s(25),n=s(29),c=s(35),r=s(27),i=s(1),d=s(1282),u=s(349),o=s(47),l=s(38),j=s(65),f=s(369),b=s(1260),p=s(0);t.default=function(e){var t=Object(i.useContext)(l.a),s=Object(i.useContext)(u.BillingContext),x=Object(i.useContext)(j.a),h=s.showSessionPopup,O=s.setShowSessionPopup,m=s.summary,v=["hourglass-o","hourglass-start","hourglass-half","hourglass-end","hourglass"],g=Object(i.useState)(0),N=Object(r.a)(g,2),y=N[0],w=N[1],M=function(){var e=Object(c.a)(Object(n.a)().mark((function e(t){var s;return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(s=new FormData).append("appId",t),e.next=4,o.a.post("/getUserConfig",s);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(c.a)(Object(n.a)().mark((function e(){var s;return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(s=new FormData).append("customerId",m.razorPayCustomerId),s.append("expiryDate",t.userConfig.expiryDateTime),e.next=5,o.a.post("/payments/razorpay/isOrderPaid",s);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){var e=0,s=setInterval((function(){w(e=(e+=1)>v.length-1?0:e),k().then((function(e){var s;(null===e||void 0===e||null===(s=e.data)||void 0===s?void 0:s.response)&&M(t.userConfig.appId).then((function(e){var s=e.data.response;t.setUserConfig((function(e){return Object(a.a)(Object(a.a)({},e),s[0])})),x.setConfig({show:!0,className:"alert-success border-0 text-dark",type:"success",dismissible:!0,heading:Object(p.jsx)(f.d,{}),content:Object(p.jsx)(f.c,{})})})).catch((function(e){return console.error("Unable to fetch user config and order",e)})).finally((function(){return O(!1)}))})).catch((function(e){return console.error("fetch order error:",e)}))}),3e3);return function(){return clearInterval(s)}}),[]),Object(p.jsxs)(d.a,{show:h,onHide:function(){return O(!1)},style:{zIndex:1e4},keyboard:!1,backdrop:"static",children:[Object(p.jsx)(d.a.Header,{children:Object(p.jsxs)(d.a.Title,{className:"d-flex align-items-center",children:[Object(p.jsx)("i",{className:"px-2 fa-1x fa fa-hand-paper-o"}),Object(p.jsx)("span",{children:Object(p.jsx)(b.a,{id:"pleaseWait",defaultMessage:"pleaseWait"})})]})}),Object(p.jsx)(d.a.Body,{className:"rounded-bottom ".concat("dark"===t.userData.theme?"bg-dark text-white":"bg-white text-dark"),children:Object(p.jsxs)("div",{className:"text-center",children:[Object(p.jsx)("div",{children:Object(p.jsx)(b.a,{id:"doNotRefresh",defaultMessage:"doNotRefresh"})}),Object(p.jsx)("div",{className:"p-5",children:Object(p.jsx)("i",{className:"animate__animated animate__pulse animate__infinite fa fa-".concat(v[y]," fa-5x fa-fw")})})]})})]})}},369:function(e,t,s){"use strict";s.d(t,"d",(function(){return c})),s.d(t,"c",(function(){return r})),s.d(t,"b",(function(){return i})),s.d(t,"a",(function(){return d}));s(1);var a=s(1260),n=s(0),c=function(){return Object(n.jsx)("div",{children:Object(n.jsxs)("div",{className:"d-flex align-items-center",children:[Object(n.jsx)("i",{className:"fa fa-check fa-2x pt-2 text-success"}),Object(n.jsxs)("div",{className:"ps-2",children:[Object(n.jsx)("div",{className:"fs-3",children:Object(n.jsx)(a.a,{id:"success",defaultMessage:"success"})}),Object(n.jsx)("div",{className:"fs-6",children:Object(n.jsx)(a.a,{id:"paymentReceived",defaultMessage:"paymentReceived"})})]})]})})},r=function(){return Object(n.jsx)("div",{className:"d-flex align-items-center justify-content-between",children:Object(n.jsx)("div",{children:Object(n.jsx)("span",{className:"fs-6",children:Object(n.jsx)(a.a,{id:"paymentSuccessMessage",defaultMessage:"paymentSuccessMessage"})})})})},i=function(){return Object(n.jsx)("div",{children:Object(n.jsxs)("div",{className:"d-flex align-items-center",children:[Object(n.jsx)("i",{className:"fa fa-times-circle fa-2x pt-2 text-danger"}),Object(n.jsxs)("div",{className:"ps-2",children:[Object(n.jsx)("div",{className:"fs-3",children:Object(n.jsx)(a.a,{id:"failed",defaultMessage:"failed"})}),Object(n.jsx)("div",{className:"fs-6",children:Object(n.jsx)(a.a,{id:"paymentNotReceived",defaultMessage:"paymentNotReceived"})})]})]})})},d=function(){return Object(n.jsx)("div",{className:"d-flex align-items-center justify-content-between",children:Object(n.jsx)("div",{children:Object(n.jsx)("span",{className:"fs-6",children:Object(n.jsx)(a.a,{id:"paymentFailMessage",defaultMessage:"paymentFailMessage"})})})})}}}]);