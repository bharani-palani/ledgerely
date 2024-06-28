(this["webpackJsonpbni-apps"]=this["webpackJsonpbni-apps"]||[]).push([[26],{1103:function(e,a,t){"use strict";t.r(a);var n=t(25),c=t(30),s=t(35),r=t(27),i=t(1),o=t.n(i),l=t(94),d=t(342),u=t(1269),b=t(934),p=t(46),m=t(39),f=t(105),g=t(776),_=t(1266),x=t(109),j=t.n(x),h=t(50),O=t.n(h),y=t(52),w=t.n(y),M=t(48),v=t(83),D=t(93),T=t(82),k=t(70),S=t(57),C=t(62),P=t(0),N=o.a.createContext(void 0);a.default=function(){var e,a,t,o,x,h=Object(g.a)(),y=Object(i.useContext)(m.a),R=Object(i.useContext)(k.a),I=Object(i.useContext)(C.a),E=Object(i.useState)(!1),Y=Object(r.a)(E,2),A=Y[0],V=Y[1],F=Object(i.useState)(!1),L=Object(r.a)(F,2),W=L[0],B=L[1],z=Object(i.useState)(!0),H=Object(r.a)(z,2),J=H[0],K=H[1],U=Object(i.useState)([]),Q=Object(r.a)(U,2),G=Q[0],q=Q[1],X=Object(i.useState)({category:"",startDate:O()().startOf("month").toDate(),endDate:O()().endOf("month").toDate()}),Z=Object(r.a)(X,2),$=Z[0],ee=Z[1],ae=Object(i.useState)([]),te=Object(r.a)(ae,2),ne=te[0],ce=te[1],se=Object(i.useState)([]),re=Object(r.a)(se,2),ie=re[0],oe=re[1],le={start:0,limit:10,searchString:""},de=Object(i.useState)(le),ue=Object(r.a)(de,2),be=ue[0],pe=ue[1],me=Object(i.useState)(le),fe=Object(r.a)(me,2),ge=fe[0],_e=fe[1],xe=Object(i.useState)(le),je=Object(r.a)(xe,2),he=je[0],Oe=je[1],ye={config:{header:{searchPlaceholder:h.formatMessage({id:"searchHere",defaultMessage:"searchHere"}),searchable:!0},footer:{total:{title:h.formatMessage({id:"total",defaultMessage:"total"}),maxDecimal:2},pagination:{currentPage:"first",maxPagesToShow:5}}},id:"categorizedBankTrx",Table:"categorizedBankTrx",label:"Categorized bank trx",TableRows:["inc_exp_name","inc_exp_date","inc_exp_amount","inc_exp_type","inc_exp_comments"],TableAliasRows:[h.formatMessage({id:"name",defaultMessage:"name"}),h.formatMessage({id:"date",defaultMessage:"date"}),h.formatMessage({id:"amount",defaultMessage:"amount"}),h.formatMessage({id:"type",defaultMessage:"type"}),h.formatMessage({id:"comments",defaultMessage:"comments"})],defaultValues:[],rowElements:["label","label","label","label","label"]},we={config:{header:{searchPlaceholder:h.formatMessage({id:"searchHere",defaultMessage:"searchHere"}),searchable:!0},footer:{total:{title:h.formatMessage({id:"total",defaultMessage:"total"}),maxDecimal:2},pagination:{currentPage:"first",maxPagesToShow:5}}},id:"catCreditCardTrx",Table:"categorizedCreditCardTrx",TableRows:["cc_transaction","cc_date","credit_card_name","cc_payment_credits","cc_purchases","cc_taxes_interest","cc_comments"],TableAliasRows:[h.formatMessage({id:"name",defaultMessage:"name"}),h.formatMessage({id:"date",defaultMessage:"date"}),h.formatMessage({id:"creditCard",defaultMessage:"creditCard"}),h.formatMessage({id:"credits",defaultMessage:"credits"}),h.formatMessage({id:"purchases",defaultMessage:"purchases"}),h.formatMessage({id:"interest",defaultMessage:"interest"}),h.formatMessage({id:"comments",defaultMessage:"comments"})],defaultValues:[],rowElements:["label","label","label","label","label","label","label"]},Me=function(){var e=Object(s.a)(Object(c.a)().mark((function e(){var a;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return K(!0),(a=new FormData).append("limit",be.limit),a.append("start",be.start),a.append("searchString",be.searchString),a.append("appId",y.userConfig.appId),e.abrupt("return",p.a.post("/account_planner/inc_exp_list",a).then((function(e){return q(e.data.response)})).catch((function(e){console.log(e)})).finally((function(){return K(!1)})));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ve=function(e){B(!0),ce([]),oe([]),setTimeout((function(){var a=function(){var e=new FormData;return e.append("limit",ge.limit),e.append("start",ge.start),e.append("searchString",ge.searchString),e.append("TableRows","a.inc_exp_name, a.inc_exp_date, a.inc_exp_amount, a.inc_exp_type, a.inc_exp_comments"),e.append("Table","categorizedBankTrx"),e.append("WhereClause","a.inc_exp_appId = '".concat(y.userConfig.appId,"' && b.inc_exp_cat_id = '").concat($.category,"' && d.bank_appId = '").concat(y.userConfig.appId,"' && a.inc_exp_date >= '").concat(O()($.startDate).format("YYYY-MM-DD").toString(),"' && a.inc_exp_date <= '").concat(O()($.endDate).format("YYYY-MM-DD").toString(),"'")),p.a.post("/account_planner/getAccountPlanner",e)}(),t=function(){var e=new FormData;return e.append("limit",he.limit),e.append("start",he.start),e.append("searchString",he.searchString),e.append("TableRows","a.cc_transaction, a.cc_date, d.credit_card_name, a.cc_payment_credits, a.cc_purchases, a.cc_taxes_interest, a.cc_comments"),e.append("Table","categorizedCreditCardTrx"),e.append("WhereClause","a.cc_appId = '".concat(y.userConfig.appId,"' && b.inc_exp_cat_id = '").concat($.category,"' && d.credit_card_appId = '").concat(y.userConfig.appId,"' && a.cc_date >= '").concat(O()($.startDate).format("YYYY-MM-DD").toString(),"' && a.cc_date <= '").concat(O()($.endDate).format("YYYY-MM-DD").toString(),"'")),p.a.post("/account_planner/getAccountPlanner",e)}();Promise.all([a,t]).then((function(a){var t=a[0].data.response,n=a[1].data.response;ce(t),oe(n);var c=(null===t||void 0===t?void 0:t.table.length)>0?"bank":"creditCard";"function"===typeof e&&e(c)})).catch((function(e){return console.log("bbb",e)})).finally((function(){B(!1),V(!0)}))}),100)};Object(i.useEffect)((function(){Me()}),[be]);var De=Object(D.a)(),Te={fetch:De.get("fetch"),categoryId:De.get("categoryId"),startDate:De.get("startDate"),endDate:De.get("endDate")},ke=Object(i.useState)(!1),Se=Object(r.a)(ke,2),Ce=Se[0],Pe=Se[1];Object(i.useEffect)((function(){"category"===Te.fetch&&Te.categoryId&&(Pe(!0),ee((function(e){return Object(n.a)(Object(n.a)({},e),{},{category:Te.categoryId,startDate:O()(Te.startDate).toDate(),endDate:O()(Te.endDate).toDate()})})))}),[JSON.stringify(Te)]),Object(i.useEffect)((function(){"category"===Te.fetch&&$.category&&$.startDate&&$.endDate&&Ce&&ve((function(e){Pe(!1),setTimeout((function(){var a,t="bank"===e?"categorizedBankTrx":"catCreditCardTrx";null===(a=document.getElementById(t))||void 0===a||a.scrollIntoView({behavior:"smooth",block:"center",inline:"start"})}),1e3)}))}),[JSON.stringify(Te),$.category,Ce]);var Ne=function(){return Object(P.jsx)("div",{className:"relativeSpinner",children:Object(P.jsx)(w.a,{type:M.a.loadRandomSpinnerIcon(),color:document.documentElement.style.getPropertyValue("--app-theme-bg-color"),height:100,width:100})})},Re=["id","name","isIncomeMetric","isPlanMetric"],Ie=["checkbox","textbox",{radio:{radioList:[{label:h.formatMessage({id:"yes",defaultMessage:"yes"}),value:"1",checked:!1},{label:h.formatMessage({id:"no",defaultMessage:"no"}),value:"0",checked:!0}]}},{radio:{radioList:[{label:h.formatMessage({id:"yes",defaultMessage:"yes"}),value:"1",checked:!1},{label:h.formatMessage({id:"no",defaultMessage:"no"}),value:"0",checked:!0}]}}],Ee=T.b.filter((function(e){return"incExpCat"===e.id})).map((function(e){var a={header:{searchPlaceholder:h.formatMessage({id:"searchHere",defaultMessage:"searchHere"}),searchable:!0},footer:{total:{locale:R.localeLanguage,currency:R.localeCurrency,maxDecimal:2},pagination:{currentPage:"last",maxPagesToShow:5}}};return e.config=a,e.TableAliasRows=Re.map((function(e){return h.formatMessage({id:e,defaultMessage:e})})),e.rowElements=Ie,e}))[0],Ye=Object(i.useState)([]),Ae=Object(r.a)(Ye,2),Ve=Ae[0],Fe=Ae[1],Le=function(){Fe([]);var e=function(e,a){var t=new FormData;return t.append("TableRows",a),t.append("Table",e),t.append("limit",be.limit),t.append("start",be.start),t.append("searchString",be.searchString),t.append("appId",y.userConfig.appId),p.a.post("/account_planner/getAccountPlanner",t)}(Ee.Table,Ee.TableRows);Promise.all([e]).then(function(){var e=Object(s.a)(Object(c.a)().mark((function e(a){return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Fe(a[0].data.response);case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}())};Object(i.useEffect)((function(){Le()}),[be]);return Object(i.useEffect)((function(){A&&ve()}),[ge,he,A]),Object(P.jsx)(N.Provider,{value:{incExpList:G,selection:$},children:Object(P.jsxs)(d.a,{fluid:!0,children:[Object(P.jsx)(l.a,{icon:"fa fa-sitemap",intlId:"category"}),J?Object(P.jsx)(Ne,{}):Object(P.jsxs)(P.Fragment,{children:[Ve&&(null===Ve||void 0===Ve||null===(e=Ve.table)||void 0===e?void 0:e.length)>0&&Object(P.jsx)(P.Fragment,{children:Object(P.jsx)(v.a,{className:"pt-3",config:Ee.config,Table:Ee.Table,TableRows:Ee.TableRows,TableAliasRows:Ee.TableAliasRows,rowElements:Ee.rowElements,defaultValues:Ee.defaultValues,dbData:Ve,postApiUrl:"/account_planner/postAccountPlanner",onPostApi:function(e){return function(e,a){var t=e.status,n=e.data;if(200===t){if(e&&n&&"boolean"===typeof n.response&&null!==n.response&&n.response&&y.renderToast({message:h.formatMessage({id:"transactionSavedSuccessfully",defaultMessage:"transactionSavedSuccessfully"})}),e&&n&&"boolean"===typeof n.response&&null!==n.response&&!1===n.response&&y.renderToast({type:"error",icon:"fa fa-times-circle",message:h.formatMessage({id:"noFormChangeFound",defaultMessage:"noFormChangeFound"})}),e&&n&&null===n.response&&I.setConfig({show:!0,className:"alert-danger border-0 text-dark",type:"danger",dismissible:!0,heading:Object(P.jsx)(S.b,{}),content:Object(P.jsx)(S.a,{})}),e&&n&&"object"===typeof n.response&&null!==n.response){var c;c=1451===n.response.number?"foreignKeyDeleteMessage":"",y.renderToast({type:"error",icon:"fa fa-times-circle",message:h.formatMessage({id:c,defaultMessage:c})})}}else y.renderToast({type:"error",icon:"fa fa-times-circle",message:h.formatMessage({id:"unableToReachServer",defaultMessage:"unableToReachServer"})})}(e,Ee.id)},apiParams:be,onChangeParams:function(e){return function(e){pe((function(a){return Object(n.a)(Object(n.a)({},a),e)}))}(e)},onReFetchData:function(){return Le()},cellWidth:Ee.cellWidth,ajaxButtonName:h.formatMessage({id:"submit",defaultMessage:"submit"}),appIdKeyValue:{key:"inc_exp_cat_appId",value:y.userConfig.appId},theme:y.userData.theme})}),Object(P.jsxs)(u.a,{children:[Object(P.jsx)(b.a,{sm:3,className:"react-responsive-ajax-data-table pb-2",children:Object(P.jsx)(f.a,{placeholder:"".concat(h.formatMessage({id:"select",defaultMessage:"select"})," ").concat(h.formatMessage({id:"category",defaultMessage:"category"})),onChange:function(e,a,t){ee((function(e){return Object(n.a)(Object(n.a)({},e),{},{category:a})}))},element:{fetch:{dropDownList:G.map((function(e){return{id:e.id,value:e.value}}))},searchable:!0},value:$.category,type:"single",searchable:!0,theme:y.userData.theme})}),Object(P.jsxs)(b.a,{sm:3,className:"d-flex align-items-center justify-content-between pb-2",children:[Object(P.jsx)("span",{children:Object(P.jsx)(_.a,{id:"startDate",defaultMessage:"startDate"})}),Object(P.jsx)(j.a,{className:"bg-white text-dark",value:$.startDate,format:"yyyy-MM-dd",clearIcon:null,onChange:function(e){ee((function(a){return Object(n.a)(Object(n.a)({},a),{},{startDate:e})}))},minDate:O()().subtract(1,"year").toDate(),maxDate:new Date,onKeyDown:function(e){e.preventDefault()}})]}),Object(P.jsxs)(b.a,{sm:3,className:"d-flex align-items-center justify-content-between pb-2",children:[Object(P.jsx)("span",{children:Object(P.jsx)(_.a,{id:"endDate",defaultMessage:"endDate"})}),Object(P.jsx)(j.a,{className:"bg-white text-dark",value:$.endDate,format:"yyyy-MM-dd",clearIcon:null,onChange:function(e){ee((function(a){return Object(n.a)(Object(n.a)({},a),{},{endDate:e})}))},minDate:O()().subtract(1,"year").toDate(),maxDate:new Date,onKeyDown:function(e){e.preventDefault()}})]}),Object(P.jsx)(b.a,{sm:3,className:"pb-2",children:Object(P.jsx)("button",{className:"btn btn-sm btn-bni w-100 border-0",onClick:function(){return ve()},disabled:W||!$.category,children:Object(P.jsx)(_.a,{id:"generate",defaultMessage:"generate"})})})]})]}),W&&Object(P.jsx)(Ne,{}),ne&&(null===ne||void 0===ne||null===(a=ne.table)||void 0===a?void 0:a.length)>0&&Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)("div",{className:"py-2",children:Object(P.jsx)("span",{className:"badge ".concat("dark"===y.userData.theme?"bg-secondary text-white":"bg-light text-dark"),children:h.formatMessage({id:"bankTransactions",defaultMessage:"bankTransactions"})})}),Object(P.jsx)(v.a,{id:ye.id,config:ye.config,Table:ye.Table,TableRows:ye.TableRows,TableAliasRows:ye.TableAliasRows,rowElements:ye.rowElements,defaultValues:ye.defaultValues,dbData:ne,cellWidth:[20,7,10,5,20],theme:y.userData.theme,apiParams:ge,onChangeParams:function(e){return function(e){_e((function(a){return Object(n.a)(Object(n.a)({},a),e)}))}(e)}})]}),ie&&(null===ie||void 0===ie||null===(t=ie.table)||void 0===t?void 0:t.length)>0>0&&Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)("div",{className:"py-2",children:Object(P.jsx)("span",{className:"badge ".concat("dark"===y.userData.theme?"bg-secondary text-white":"bg-light text-dark"),children:h.formatMessage({id:"creditCardTransactions",defaultMessage:"creditCardTransactions"})})}),Object(P.jsx)(v.a,{id:we.id,config:we.config,Table:we.Table,TableRows:we.TableRows,TableAliasRows:we.TableAliasRows,rowElements:we.rowElements,defaultValues:we.defaultValues,dbData:ie,cellWidth:[20,7,10,10,10,10,20],theme:y.userData.theme,apiParams:he,onChangeParams:function(e){return function(e){Oe((function(a){return Object(n.a)(Object(n.a)({},a),e)}))}(e)}})]}),0===(null===ie||void 0===ie||null===(o=ie.table)||void 0===o?void 0:o.length)&&0===(null===ne||void 0===ne||null===(x=ne.table)||void 0===x?void 0:x.length)&&A&&Object(P.jsx)("div",{className:"text-center py-2",children:Object(P.jsx)(_.a,{id:"noRecordsGenerated",defaultMessage:" "})})]})})}},342:function(e,a,t){"use strict";var n=t(25),c=t(28),s=t(36),r=t.n(s),i=t(1),o=t(43),l=t(0),d=["bsPrefix","fluid","as","className"],u=i.forwardRef((function(e,a){var t=e.bsPrefix,s=e.fluid,i=void 0!==s&&s,u=e.as,b=void 0===u?"div":u,p=e.className,m=Object(c.a)(e,d),f=Object(o.c)(t,"container"),g="string"===typeof i?"-".concat(i):"-fluid";return Object(l.jsx)(b,Object(n.a)(Object(n.a)({ref:a},m),{},{className:r()(p,i?"".concat(f).concat(g):f)}))}));u.displayName="Container",a.a=u},57:function(e,a,t){"use strict";t.d(a,"b",(function(){return r})),t.d(a,"a",(function(){return i}));t(1);var n=t(1266),c=t(58),s=t(0),r=function(){return Object(s.jsx)("div",{children:Object(s.jsxs)("div",{className:"d-flex align-items-center",children:[Object(s.jsx)("i",{className:"fa fa-exclamation-triangle fa-2x pt-2 text-danger"}),Object(s.jsxs)("div",{className:"ps-2",children:[Object(s.jsx)("div",{className:"fs-3",children:Object(s.jsx)(n.a,{id:"alert",defaultMessage:"alert"})}),Object(s.jsx)("div",{className:"fs-6",children:Object(s.jsx)(n.a,{id:"maximumQuotaExceeded",defaultMessage:"maximumQuotaExceeded"})})]})]})})},i=function(){return Object(s.jsx)("div",{className:"d-flex align-items-center justify-content-between",children:Object(s.jsxs)("div",{children:[Object(s.jsxs)(c.a,{className:"btn btn-sm btn-primary me-1 rounded-pill",to:"/billing",children:[Object(s.jsx)("i",{className:"fa fa-credit-card-alt pe-1"}),Object(s.jsx)(n.a,{id:"upgradeNow",defaultMessage:"upgradeNow"})]}),Object(s.jsx)("span",{className:"fs-6",children:Object(s.jsx)(n.a,{id:"accessUnlimitedStorage",defaultMessage:"accessUnlimitedStorage"})})]})})}},82:function(e,a,t){"use strict";t.d(a,"b",(function(){return s})),t.d(a,"c",(function(){return r})),t.d(a,"a",(function(){return i}));var n=t(50),c=t.n(n),s=[{id:"bankAccounts",Table:"banks",config:{footer:{total:{},pagination:{currentPage:"last",maxPagesToShow:5}}},label:"Bank accounts",TableRows:["bank_id","bank_name","bank_account_number","bank_swift_code","bank_account_type","bank_country","bank_sort","bank_locale","bank_currency"],defaultValues:[{bank_sort:"0"}],cellWidth:[4,13,11,11,13,13,5,13,13]},{id:"creditCardAccounts",Table:"credit_cards",label:"Credit cards",TableRows:["credit_card_id","credit_card_name","credit_card_number","credit_card_start_date","credit_card_end_date","credit_card_payment_date","credit_card_annual_interest","credit_card_locale","credit_card_currency"],defaultValues:[{credit_card_annual_interest:"48"}],cellWidth:[4,13,11,8,8,8,8,13,13]},{id:"incExpCat",config:{footer:{total:{},pagination:{currentPage:"last",maxPagesToShow:5}}},Table:"income_expense_category",label:"Income / expense categories",TableRows:["inc_exp_cat_id","inc_exp_cat_name","inc_exp_cat_is_metric","inc_exp_cat_is_plan_metric"],defaultValues:[{inc_exp_cat_is_metric:"0"},{inc_exp_cat_is_plan_metric:"0"}],cellWidth:[4,13,13,13]},{id:"incExpTemp",config:{footer:{total:{},pagination:{currentPage:"last",maxPagesToShow:5}}},Table:"income_expense_template",label:"Income expense template",TableRows:["template_id","temp_inc_exp_name","temp_amount","temp_inc_exp_type","temp_inc_exp_date","temp_category","temp_bank"],defaultValues:[{temp_inc_exp_date:"1"},{temp_inc_exp_type:"Dr"},{temp_amount:"0.00"}],cellWidth:[4,13,13,13,5,13,13]}],r=[{id:26,config:{footer:{total:{},pagination:{currentPage:"last",maxPagesToShow:5}}},Table:"income_expense",label:"Expenditures for selected month",TableRows:["inc_exp_id","inc_exp_name","inc_exp_amount","inc_exp_plan_amount","inc_exp_type","inc_exp_date","inc_exp_category","inc_exp_bank","inc_exp_comments"],TableAliasRows:[],defaultValues:[{inc_exp_type:"Dr"},{inc_exp_amount:0},{inc_exp_plan_amount:0},{inc_exp_date:c()(new Date).format("YYYY-MM-DD")}],rowElements:["checkbox","textbox","number","label",null,"date",{fetch:{dropDownList:[]}},{fetch:{dropDownList:[]}},"textbox"],showTooltipFor:["inc_exp_name","inc_exp_comments"]}],i=[{id:27,config:{footer:{total:{},pagination:{currentPage:"last",maxPagesToShow:5}},searchable:!0},Table:"credit_card_transactions",label:"Credit card transactions",TableRows:["cc_id","cc_transaction","cc_date","cc_opening_balance","cc_payment_credits","cc_purchases","cc_taxes_interest","cc_expected_balance","cc_for_card","cc_inc_exp_cat","cc_transaction_status","cc_comments","cc_added_at"],TableAliasRows:[],rowElements:["checkbox","textbox","date","number","number","number","number","label",{fetch:{dropDownList:[]}},{fetch:{dropDownList:[]}},{fetch:{dropDownList:[{checked:!1,id:"1",value:"Settled"},{checked:!1,id:"0",value:"Pending"},{checked:!1,id:"2",value:"Part payment"}]}},"textbox","relativeTime"],defaultValues:[{cc_date:c()().format("YYYY-MM-DD")},{cc_opening_balance:0},{cc_payment_credits:0},{cc_purchases:0},{cc_taxes_interest:0},{cc_expected_balance:0},{cc_transaction_status:"0"}],showTooltipFor:["cc_transaction","cc_comments"]}]},93:function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var n=t(1),c=t(72),s=function(){var e=Object(c.h)().search;return Object(n.useMemo)((function(){return new URLSearchParams(e)}),[e])}},94:function(e,a,t){"use strict";var n=t(25),c=t(28),s=t(1),r=t(1266),i=t(39),o=t(0),l=["icon","intlId","children"];a.a=function(e){var a=e.icon,t=e.intlId,d=e.children,u=Object(c.a)(e,l),b=Object(s.useContext)(i.a);return Object(o.jsx)("div",Object(n.a)(Object(n.a)({},u),{},{className:"bg-gradient ".concat("dark"===b.userData.theme?"bg-dark darkBoxShadow":"bg-white lightBoxShadow"," mt-2 ps-3 py-2 rounded-pill"),children:Object(o.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(o.jsxs)("div",{className:"d-flex align-items-center",children:[Object(o.jsx)("i",{className:"".concat(a," fa-1x")}),Object(o.jsx)("div",{className:"ps-2 mb-0",children:Object(o.jsx)(r.a,{id:t,defaultMessage:t})})]}),d]})}))}}}]);