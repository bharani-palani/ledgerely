(this["webpackJsonpbni-apps"]=this["webpackJsonpbni-apps"]||[]).push([[4],{105:function(e,t,_){"use strict";var a=_(28),n=_(25),r=_(42),c=_(30),s=_(35),o=_(27),l=_(1),i=_(92),u=_(0),d=["info","checked","marker"],p=function(e){var t=e.info,_=e.checked,r=e.marker,c=Object(a.a)(e,d);return Object(u.jsxs)("label",{className:"checkBoxComponent",children:[Object(u.jsx)("span",{children:t.value}),r&&Object(u.jsx)("span",{className:"sup",children:"*"}),Object(u.jsx)("input",Object(n.a)({checked:_,type:"checkbox"},c)),Object(u.jsx)("span",{className:"checkmark"})]})};p.defaultProps={checked:!1};var b=p,m=_(1269),O=_(435),j=_(1251),E=_(1287),P=["placement","arrowProps","show","popper","hasDoneInitialMeasure"],D=function(e){var t=e.index,_=e.type,d=e.primaryKey,p=e.searchable,O=e.element,D=e.value,h=e.placeholder,f=e.onChange,M=e.intl,g=e.theme,A=Object(l.useRef)(null),T=Object(l.useRef)(null),x=Object(l.useState)(!1),y=Object(o.a)(x,2),C=y[0],R=y[1],I=Object(l.useRef)(),w=function(){return M.formatMessage({id:h,defaultMessage:h})},v=function(){var e=D,t=O.fetch.dropDownList;return e="single"===_?(e=t.length>0&&t.filter((function(e){return e.id===D}))).length>0?e[0].value:w():"object"===typeof e&&e.length>0?e.map((function(e){return e.toString()})):[],[t,e]},K=v(),L=Object(o.a)(K,2),S=L[0],U=L[1],B=S.map((function(e){return e.checked=e.id&&(Array.isArray(U)?U.filter((function(t){return t.toString()===e.id.toString()})).length>0:U===e.value),e})),W="single"===_?S:B,k=Object(l.useState)(W),N=Object(o.a)(k,2),V=N[0],F=N[1],q=Object(l.useState)(U),H=Object(o.a)(q,2),G=H[0],$=H[1],z=Object(l.useState)(""),J=Object(o.a)(z,2),Y=J[0],X=J[1],Q=Object(l.useState)(U),Z=Object(o.a)(Q,2),ee=Z[0],te=Z[1];Object(l.useEffect)((function(){var e=v(),t=Object(o.a)(e,2),a=t[0],n=t[1],r=a.map((function(e){return e.checked=e.id&&(Array.isArray(n)?n.filter((function(t){return t.toString()===e.id.toString()})).length>0:n===e.value),e}));F("single"===_?a:r),$(n),te(n)}),[O]),Object(l.useEffect)((function(){"multiple"===_&&$(ne(U))}),[U]);var _e=function(){var e=Object(s.a)(Object(c.a)().mark((function e(t){var _;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return X(t),_=S.filter((function(e){return e.value.toString().toLowerCase().includes(t.toString().toLowerCase())})),e.next=4,F(_);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ae=function(e){X(""),_e("")},ne=function(e){var t=e.length>0&&S.filter((function(t){return t.id===e[0]}));return 1===t.length?(t=t[0].value,e.length>1?"".concat(t," + ").concat(e.length-1," more..."):t):w()},re=function(e,_){var a=e.target.checked,c=_.id&&a?[].concat(Object(r.a)(ee),[_.id]):ee.filter((function(e){return e!==_.id}));c=Object(r.a)(new Set(c));var s=V.map((function(e){return c.includes(e.id)?Object(n.a)(Object(n.a)({},e),{},{checked:!0}):Object(n.a)(Object(n.a)({},e),{},{checked:!1})}));F(s),te(c),$(ne(c)),f(t,c,d)};return Object(l.useEffect)((function(){C&&(I.current&&I.current.focus({preventScroll:!0}),T.current.focus({preventScroll:!0}),setTimeout((function(){T.current.scrollIntoView({behavior:"instant",block:"nearest"})}),1))}),[C]),Object(u.jsxs)("div",{ref:A,className:"filterSelectComponent ".concat(g),children:[Object(u.jsxs)("div",{onClick:function(){return R(!C)},className:"selected ".concat(C?"yes":"no"),children:[Object(u.jsx)("div",{className:"string",title:G,children:G||M.formatMessage({id:h,defaultMessage:h})}),Object(u.jsx)("div",{children:Object(u.jsx)(i.a,{className:"caretIcon ".concat(C?"down":"up"),entity:"&#9662;"})})]}),Object(u.jsx)(j.a,{target:A.current,show:C,placement:"bottom",rootClose:!0,rootCloseEvent:"click",onHide:function(e){return R(!1)},children:function(e){e.placement,e.arrowProps,e.show,e.popper,e.hasDoneInitialMeasure;var r=Object(a.a)(e,P);return Object(u.jsxs)("div",Object(n.a)(Object(n.a)({},r),{},{className:"wrapperFS ".concat(g),style:Object(n.a)({width:"".concat(null===A||void 0===A?void 0:A.current.clientWidth,"px")},r.style),children:[p&&Object(u.jsxs)("div",{className:"searchContent d-flex align-items-center",children:[Object(u.jsx)(E.a.Control,{ref:I,className:"inputText",onChange:function(e){e.preventDefault(),_e(e.target.value)},placeholder:M.formatMessage({id:"searchHere",defaultMessage:"searchHere"}),type:"text",value:Y}),Y&&Object(u.jsx)(i.a,{onClick:ae,className:"icon",entity:"&#10006;"})]}),Object(u.jsx)("div",{className:"listWrapper",style:{maxHeight:"20rem"},children:Object(u.jsx)("ul",{children:V.length>0?V.map((function(e,a){return Object(u.jsx)("li",{ref:e.checked?T:null,className:e.checked?"selectedSingle":"",children:"multiple"===_?Object(u.jsx)(b,{onChange:function(t){return re(t,e)},checked:e.checked,marker:e.marker,info:e},a):Object(u.jsxs)("div",{onClick:function(){return f(t,(a=e).id,d),$(a.value),void("single"===_&&R(!1));var a},children:[e.value,e.marker&&Object(u.jsx)("span",{className:"sup",children:"*"})]})},a)})):Object(u.jsx)("li",{className:"textCenter",children:Object(u.jsx)(m.a,{id:"noRecordsGenerated",defaultMessage:"noRecordsGenerated"})})})})]}))}})]})};D.defaultProps={type:"single",searchable:!0,placeholder:"select",theme:""};t.a=Object(O.c)(D)},193:function(e,t,_){"use strict";var a=_(25),n=_(42),r=_(27),c=_(1),s=_(0),o=function(e){var t=e.totalPages,_=e.maxPagesToShow,o=e.selectedPageString,l=e.onSetPage,i=Object(c.useState)(e.currentPage),u=Object(r.a)(i,2),d=u[0],p=u[1],b=function(e){return Array.from({length:e},(function(e,t){return++t}))},m=Object(c.useState)(b(t)),O=Object(r.a)(m,2),j=O[0],E=O[1];Object(c.useEffect)((function(){E(b(t));var e="first"===o?1:t;p(e),l(e)}),[t]),Object(c.useEffect)((function(){var e=[];_<t&&d>0&&(d<t-_?(e=[].concat(Object(n.a)(D(_,d)),["...",t]),E(e)):(e=Object(n.a)(D(_+1,t-_)),E(e)))}),[d]);var P=function(e){p(e),l(e)},D=function(e,t){return Array(e).fill().map((function(e,_){return t+_}))};return j.length>0&&Object(s.jsxs)("ul",{className:"page",children:[Object(s.jsx)("li",{onClick:function(){return d>1?P(1):null},className:"lt ".concat(d>1?"":"disabled"),children:"<<"}),Object(s.jsx)("li",{onClick:function(){return d>1?P(d-1):null},className:"lt ".concat(d>1?"":"disabled"),children:"<"}),j.map((function(e,_){return Object(s.jsx)("li",Object(a.a)(Object(a.a)({onClick:function(){return!isNaN(e)&&e<=t?P(e):null}},e===d&&{className:"active"}),{},{children:e}),function(e){return"page-".concat(e)}(_))})),Object(s.jsx)("li",{onClick:function(){return d<t?P(d+1):null},className:"gt ".concat(d===t?"disabled":""),children:">"}),Object(s.jsx)("li",{onClick:function(){return d<t?P(t):null},className:"gt ".concat(d===t?"disabled":""),children:">>"})]})};o.defaultProps={},t.a=o},194:function(e,t,_){"use strict";var a=_(27),n=_(1),r=_(92),c=_(779),s=_(0),o=function(e){var t=Object(c.a)(),_=e.defaultRecordsPerPage,o=e.config,l=e.onSearchChange,i=e.onDropDownChange,u=e.onDismissSearch,d=e.theme,p=Object(n.useState)(!1),b=Object(a.a)(p,2),m=b[0],O=b[1],j=Object(n.useState)(""),E=Object(a.a)(j,2),P=E[0],D=E[1],h=Object(n.useState)(_),f=Object(a.a)(h,2),M=f[0],g=f[1],A=Object(n.useRef)(null),T=Array.from({length:10},(function(e,t){return++t})).map((function(e,t){return t>=0&&t<=2?e*_:t>=3&&t<=5?e*_*5:t>=6&&t<=9?e*_*10:null})),x=function(e){A.current&&!A.current.contains(e.target)&&O(!1)};Object(n.useEffect)((function(){return document.addEventListener("click",x,!0),function(){document.removeEventListener("click",x,!0)}}),[]);return Object(s.jsxs)("div",{className:"group-input",children:[Object(s.jsxs)("div",{className:"inputWrapper",children:[Object(s.jsx)("input",{onChange:function(e){return function(e){var t=e.target.value;l(t),D(t)}(e)},placeholder:o.header.searchPlaceholder,type:"text",value:P,className:"join-input ".concat(d)}),P&&Object(s.jsx)(r.a,{onClick:function(){u(),D("")},className:"dismiss",entity:"&#215;"})]}),Object(s.jsxs)("div",{ref:A,onClick:function(){return O(!m)},title:t.formatMessage({id:"showNRecordsPerPage",defaultMessage:"showNRecordsPerPage"},{n:M}),className:"join-select",children:[Object(s.jsx)("div",{style:m?{borderBottomRightRadius:0}:{borderBottomRightRadius:"5px"},className:"selected",children:Object(s.jsxs)("div",{children:[Object(s.jsx)("span",{children:M}),Object(s.jsx)(r.a,{className:"icon up",entity:"&#9662;"})]})}),m&&Object(s.jsx)("ul",{children:T.map((function(e,t){return Object(s.jsx)("li",{onClick:function(){return g(t=e),void i(t);var t},children:e},t)}))})]})]})};o.defaultProps={property:"String name"},t.a=o},215:function(e,t,_){"use strict";var a=_(25),n=_(34),r=_(27),c=_(28),s=_(1),o=_(0),l=function(e){var t=e.index,_=e.primaryKey,a=e.onChange,n=e.element,c=e.value,l=t.i,i=t.j,u=Object(s.useState)(n.radio.radioList),d=Object(r.a)(u,1)[0],p=e.value||d.filter((function(e){return e.checked}))[0].value,b=Object(s.useState)(p),m=Object(r.a)(b,2),O=m[0],j=m[1];return Object(s.useEffect)((function(){j(c)}),[c]),Object(o.jsx)("div",{className:"radioComponent",children:d.length&&d.map((function(e,n){return Object(o.jsxs)("div",{className:"radioWrapper",children:[Object(o.jsx)("input",{type:"radio",onChange:function(n){j(n.target.value),a(t,e.value,_)},value:e.value,checked:e.value===O,name:"".concat(i,"-").concat(l),id:"".concat(i,"-").concat(n,"-").concat(l)})," ",Object(o.jsx)("span",{className:"checkmark"}),Object(o.jsx)("label",{htmlFor:"".concat(i,"-").concat(n,"-").concat(l),children:e.label})]},n)}))})};l.defaultProps={property:"String name"};var i=l,u=_(105),d=_(109),p=_.n(d),b=_(50),m=_.n(b),O=_(70),j=(_(235),_(321),["isPostable","config","index","value","element","primaryKey","onChange","placeholder","showDecrement","showIncrement","onDelete","onAddRow","theme"]);t.a=function(e){var t=Object(s.useContext)(O.a),_=e.isPostable,l=e.config,d=e.index,b=e.value,E=e.element,P=e.primaryKey,D=e.onChange,h=e.placeholder,f=e.showDecrement,M=e.showIncrement,g=e.onDelete,A=e.onAddRow,T=e.theme,x=Object(c.a)(e,j),y=Object(s.useRef)([]);y.current=[];var C=Object(s.useState)(b?new Date(b):new Date),R=Object(r.a)(C,2),I=R[0],w=R[1],v=Object(s.useState)(b?new Date(b):new Date),K=Object(r.a)(v,2),L=K[0],S=K[1],U=function(e,t,_,a){D(t,_,a)};return Object(o.jsx)("div",{children:function(e,r,c,s){if("string"===typeof r)switch(r){case"textbox":return Object(o.jsx)("input",Object(a.a)({type:"text",placeholder:h,onBlur:function(t){return U(0,e,t.target.value,s)},className:"inputText ".concat(T),defaultValue:c},x));case"number":return Object(o.jsx)("input",Object(a.a)({type:"number",min:"0",step:".01",placeholder:h,ref:function(t){return function(e,t){t&&!y.current.includes(t)&&y.current.push(Object(n.a)({},e.i,t))}(e,t)},onBlur:function(t){return U(0,e,t.target.value,s)},className:"inputText ".concat(T),defaultValue:Number(c).toFixed(l.footer.total.maxDecimal)},x));case"textarea":return Object(o.jsx)("textarea",Object(a.a)({placeholder:h,onBlur:function(t){return U(0,e,t.target.value,s)},rows:"3",className:"inputText ".concat(T),defaultValue:c},x));case"label":default:return Object(o.jsx)("div",Object(a.a)(Object(a.a)({},x),{},{children:c}));case"boolean":return Object(o.jsxs)("div",Object(a.a)(Object(a.a)({},x),{},{className:"text-center",children:[("1"===c||"True"===c||"true"===c||!0===c)&&Object(o.jsx)("i",{className:"fa fa-check"}),("0"===c||"False"===c||"false"===c||!1===c)&&Object(o.jsx)("i",{className:"fa fa-times"})]}));case"relativeTime":return Object(o.jsx)("div",{children:m()(c||new Date).locale(t.localeLanguage).tz(m.a.tz.guess()).fromNow()});case"checkbox":return _?Object(o.jsxs)("div",{className:"d-flex justify-content-between",children:[f&&Object(o.jsx)("i",{onClick:function(){return g(e)},style:{fontSize:"1.5rem",fontWeight:"700"},className:"fa fa-times-circle text-danger cursor-pointer"}),M&&Object(o.jsx)("i",{onClick:function(){return A(!0)},style:{fontSize:"1.5rem",fontWeight:"700"},className:"fa fa-plus-circle text-success cursor-pointer"})]}):Object(o.jsx)("div",Object(a.a)(Object(a.a)({},x),{},{children:c}));case"date":return Object(o.jsx)(p.a,{value:I||new Date,format:"y-MM-dd",clearIcon:null,onChange:function(t){w(t),D(e,function(e){var t=[e.getFullYear(),e.getMonth()+1>9?e.getMonth()+1:"0".concat(e.getMonth()+1),e.getDate()>9?e.getDate():"0".concat(e.getDate())],_=t[1],a=t[2];return"".concat(t[0],"-").concat(_,"-").concat(a)}(t),s)}});case"dateTime":return Object(o.jsx)(p.a,{value:L,format:"y-MM-dd H:mm:ss",clearIcon:null,onChange:function(t){S(t),D(e,function(e){var t=[e.getFullYear(),e.getMonth()+1>9?e.getMonth()+1:"0".concat(e.getMonth()+1),e.getDate()>9?e.getDate():"0".concat(e.getDate()),e.getHours(),e.getMinutes(),e.getSeconds()],_=t[1],a=t[2],n=t[3],r=t[4],c=t[5];return n=n<10?"0"+n:n,r=r<10?"0"+r:r,c=c<10?"0"+c:c,"".concat(t[0],"-").concat(_,"-").concat(a," ").concat(n,":").concat(r,":").concat(c)}(t),s)}})}else if("object"===typeof r&&null!==r){switch(Object.keys(r)[0]){case"fetch":return Object(o.jsx)(u.a,{index:e,primaryKey:s,onChange:function(e,t,_){return D(e,t,_)},element:r,value:c,type:Array.isArray(c)?"multiple":"single",searchable:r.searchable,theme:T});case"radio":return Object(o.jsx)(i,{index:e,primaryKey:s,onChange:function(e,t,_){return D(e,t,_)},element:r,value:c},"".concat(e.i,"-").concat(e.j));default:return Object(o.jsx)("div",{children:"Unknown Element"})}}}(d,E,b,P)})}},82:function(module,__webpack_exports__,__webpack_require__){"use strict";var _Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(25),_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(30),_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(35),_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(42),_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(27),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(1),react__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__),_services_apiServices__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(46),_FormElement__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(215),react_loader_spinner__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(52),react_loader_spinner__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(react_loader_spinner__WEBPACK_IMPORTED_MODULE_8__),_helpers__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(48),_Pagination__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(193),_FormElements_HtmlIcon__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(92),_FormElements_GroupElement__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(194),react_intl__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(779),react_intl__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(1269),react_intl__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(435),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(0),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16___default=__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__);function BackendCore(props){var intl=Object(react_intl__WEBPACK_IMPORTED_MODULE_13__.a)(),Table=props.Table,config=props.config,className=props.className||"",id=props.id,TableRows=props.TableRows,TableAliasRows=props.TableAliasRows,postApiUrl=props.postApiUrl,onPostApi=props.onPostApi,showTotal=props.showTotal,rowKeyUp=props.rowKeyUp,insertCloneData=props.insertCloneData,showTooltipFor=props.showTooltipFor,defaultValues=props.defaultValues,onTableUpdate=props.onTableUpdate,onReFetchData=props.onReFetchData,cellWidth=props.cellWidth,appIdKeyValue=props.appIdKeyValue,theme=props.theme,_useState=Object(react__WEBPACK_IMPORTED_MODULE_5__.useState)([]),_useState2=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.a)(_useState,2),rowElements=_useState2[0],setRowElements=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_5__.useState)(props.dbData),_useState4=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.a)(_useState3,2),dbData=_useState4[0],setDbData=_useState4[1],dbDataBackup=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__.a)(props.dbData),_useState5=Object(react__WEBPACK_IMPORTED_MODULE_5__.useState)([]),_useState6=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.a)(_useState5,2),deleteData=_useState6[0],setDeleteData=_useState6[1],_useState7=Object(react__WEBPACK_IMPORTED_MODULE_5__.useState)(!1),_useState8=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.a)(_useState7,2),loader=_useState8[0],setLoader=_useState8[1],_useState9=Object(react__WEBPACK_IMPORTED_MODULE_5__.useState)(!1),_useState10=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.a)(_useState9,2),btnLoader=_useState10[0],setBtnLoader=_useState10[1],_useState11=Object(react__WEBPACK_IMPORTED_MODULE_5__.useState)([]),_useState12=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.a)(_useState11,2),updatedIds=_useState12[0],setUpdatedIds=_useState12[1],_useState13=Object(react__WEBPACK_IMPORTED_MODULE_5__.useState)({}),_useState14=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.a)(_useState13,2),sortType=_useState14[0],setSortType=_useState14[1],_useState15=Object(react__WEBPACK_IMPORTED_MODULE_5__.useState)([]),_useState16=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.a)(_useState15,2),tableConfigErrors=_useState16[0],setTableConfigErrors=_useState16[1],pagination=config&&config.footer&&config.footer.pagination&&Object.keys(config.footer.pagination).length>0&&config.footer.pagination,cTotal=config&&config.footer&&config.footer.total,ajaxType=props.ajaxType,ajaxButtonName=props.ajaxButtonName,_useState17=Object(react__WEBPACK_IMPORTED_MODULE_5__.useState)(pagination&&pagination.recordsPerPage),_useState18=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.a)(_useState17,2),recordsPerPage=_useState18[0],setRecordsPerPage=_useState18[1],defaultRecordsPerPage=pagination&&pagination.recordsPerPage,_useState19=Object(react__WEBPACK_IMPORTED_MODULE_5__.useState)(Math.ceil(dbData.length/recordsPerPage)),_useState20=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.a)(_useState19,2),currentPage=_useState20[0],setCurrentPage=_useState20[1],maxPagesToShow=pagination&&pagination.maxPagesToShow,createElementPromise=function(){return props.rowElements.map((function(e){return new Promise((function(t,_){t(e)}))}))},runAllApis=function(e){setLoader(!0);var t=createElementPromise();Promise.all([t]).then(function(){var t=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__.a)(Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__.a)().mark((function t(_){return Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(_[0]).then((function(e){setRowElements(e),setLoader(!1)}));case 2:"function"===typeof e&&e();case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())};Object(react__WEBPACK_IMPORTED_MODULE_5__.useEffect)((function(){var e=[];return TableAliasRows.length!==TableRows.length&&e.push({error:'The "TableAliasRows" and "TableRows" props array length should be same.'}),Table&&0!==Table.toString().length&&""!==Table||e.push({error:'The "Table" props should be a valid string.'}),postApiUrl&&!["put","post","delete","patch","request","get","head","options"].includes(ajaxType)&&e.push({error:"Allowed XHR request types are put, post, delete, patch, request, get, head, options. Please use any one in ajaxType props. For further info, visit https://www.npmjs.com/package/axios"}),e.length>0&&setTableConfigErrors(e),function(){}}),[]),Object(react__WEBPACK_IMPORTED_MODULE_5__.useEffect)((function(){runAllApis()}),[TableRows,Table,props.rowElements]),Object(react__WEBPACK_IMPORTED_MODULE_5__.useEffect)((function(){dbData.length>0&&setDbData(dbData)}),[props.dbData]),Object(react__WEBPACK_IMPORTED_MODULE_5__.useEffect)((function(){if(insertCloneData&&insertCloneData.length>0){setLoader(!0);var e=[].concat(Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__.a)(insertCloneData),Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__.a)(dbData));setDbData(e),setTimeout((function(){setLoader(!1)}),500)}}),[insertCloneData]);var updateDbData=function updateDbData(index,data,primaryKey){var i=index.i,j=index.j;dbData[i][j]=data,setDbData(dbData);var id=dbData.filter((function(e,t){return t===i&&e}))[0][primaryKey]||"",array=id?[].concat(Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__.a)(updatedIds),[id]):Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__.a)(updatedIds);if(array=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__.a)(new Set(array)),setUpdatedIds(array),rowKeyUp){var _rowKeyUp$split=rowKeyUp.split("="),_rowKeyUp$split2=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.a)(_rowKeyUp$split,2),declare=_rowKeyUp$split2[0],operands=_rowKeyUp$split2[1];if(declare&&operands){var newDbData=dbData.map((function(row){return row[declare]=eval(operands),row}));setDbData(newDbData),onTableUpdate&&onTableUpdate(newDbData)}}onTableUpdate&&onTableUpdate(dbData)},_onAddRow=function(e){if(e){var t={};TableRows.map((function(e,_){var a=defaultValues.findIndex((function(t){return Object.keys(t)[0]===e}));return t[e]=a>-1?defaultValues[a][e]:"",null}));var _=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__.a)(dbData);_.push(t),setDbData(_)}},submitData=function(){setBtnLoader(!0);var e=dbData.filter((function(e){return""===e[TableRows[0]]})).map((function(e){return""===e[TableRows[0]]&&(e[TableRows[0]]=null),null!==appIdKeyValue&&void 0!==appIdKeyValue&&appIdKeyValue.key&&null!==appIdKeyValue&&void 0!==appIdKeyValue&&appIdKeyValue.value&&(e[null===appIdKeyValue||void 0===appIdKeyValue?void 0:appIdKeyValue.key]=null===appIdKeyValue||void 0===appIdKeyValue?void 0:appIdKeyValue.value),e})),t=dbData.filter((function(e){return updatedIds.includes(e[TableRows[0]])})).filter((function(e){return e&&("number"===typeof e[TableRows[0]]||"string"===typeof e[TableRows[0]])})).map((function(e){return null!==appIdKeyValue&&void 0!==appIdKeyValue&&appIdKeyValue.key&&null!==appIdKeyValue&&void 0!==appIdKeyValue&&appIdKeyValue.value&&(e[null===appIdKeyValue||void 0===appIdKeyValue?void 0:appIdKeyValue.key]=null===appIdKeyValue||void 0===appIdKeyValue?void 0:appIdKeyValue.value),e})),_=Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.a)(Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.a)(Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.a)(Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.a)({},(e.length>0||deleteData.length>0||t.length>0)&&{Table:Table}),e.length>0&&{insertData:e}),deleteData.length>0&&{deleteData:deleteData}),t.length>0&&{updateData:t}),a=new FormData;a.append("postData",JSON.stringify(_)),_services_apiServices__WEBPACK_IMPORTED_MODULE_6__.a[ajaxType](postApiUrl,a).then((function(_){onPostApi&&onPostApi(_),(e.length>0||t.length>0)&&(setLoader(!0),setTimeout((function(){onReFetchData(!0),setLoader(!1)}),1e3))})).catch((function(e){onPostApi&&onPostApi({error:e,status:!1})})).finally((function(){setDeleteData([]),setUpdatedIds([]),setBtnLoader(!1),t=[],e=[]}))},getColumnTotal=function(e){var t="";return showTotal.length>0&&showTotal.forEach((function(_,a){if("string"===typeof _&&String(_)===String(e))t=dbData.reduce((function(t,_){return Number(t)+Number(_[e])}),0),t=cTotal&&_helpers__WEBPACK_IMPORTED_MODULE_9__.a.countryCurrencyLacSeperator(cTotal.locale,cTotal.currency,t,cTotal.maxDecimal);else if("object"===typeof _&&_.whichKey===String(e)){var n=[];t=[_].map((function(t){return t.forValue.map((function(_,a){var r=dbData.filter((function(e){return e[t.forKey]===_.value})).reduce((function(t,_){return Number(t)+Number(_[e])}),0);return n.push(r),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div",{children:[cTotal&&_helpers__WEBPACK_IMPORTED_MODULE_9__.a.countryCurrencyLacSeperator(cTotal.locale,cTotal.currency,r,cTotal.maxDecimal),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span",{children:" (".concat(_.key,")")})]},a)}))})).concat(_.showDifference&&2===_.showDifference.indexes.length&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div",{className:"d-inline-block ".concat(checkSettlement(Number(n[_.showDifference.indexes[0]]).toFixed(cTotal.maxDecimal)-Number(n[_.showDifference.indexes[1]]).toFixed(cTotal.maxDecimal))),children:[cTotal&&_helpers__WEBPACK_IMPORTED_MODULE_9__.a.countryCurrencyLacSeperator(cTotal.locale,cTotal.currency,Number(n[_.showDifference.indexes[0]]).toFixed(cTotal.maxDecimal)-Number(n[_.showDifference.indexes[1]]).toFixed(cTotal.maxDecimal),cTotal.maxDecimal),"\xa0",_.showDifference.showStability&&checkSettlementString(Number(n[_.showDifference.indexes[0]]).toFixed(cTotal.maxDecimal)-Number(n[_.showDifference.indexes[1]]).toFixed(cTotal.maxDecimal))]},"totRow-".concat(a)))}})),t},checkSettlement=function(e){return 0===e?"text-success":e>0?"text-danger":e<0?"text-warning":void 0},checkSettlementString=function(e){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span",{children:"(=)"})},onSort=function(e){var t=null===dbData||void 0===dbData?void 0:dbData.map((function(t){return t[e]&&(t[e].toString().indexOf("-")>-1||t[e].toString().indexOf("/")>-1)&&"Invalid Date"!==new Date(String(t[e]).replace(/-/g,"/"))?"date":""===t[e]||isNaN(t[e])?"string":"number"})),_=[];"date"===(t=t.sort((function(e,_){return t.filter((function(t){return t===e})).length-t.filter((function(e){return e===_})).length})).pop())&&(_=onSortByDate(e)),"number"===t&&(_=onSortByNumber(e)),"string"===t&&(_=onSortByString(e)),setDbData(Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__.a)(_)),setSortType((function(t){return{asc:!t.asc,key:e}}))},onSortByNumber=function(e){return dbData.sort((function(t,_){return sortType.asc?_[e]-t[e]:t[e]-_[e]}))},onSortByDate=function(e){return dbData.sort((function(t,_){return sortType.asc?new Date(_[e])-new Date(t[e]):new Date(t[e])-new Date(_[e])}))},onSortByString=function(e){return dbData.sort((function(t,_){return sortType.asc?(_[e]>t[e])-(_[e]<t[e]):(t[e]>_[e])-(t[e]<_[e])}))},onSetCurrentPage=function(e){setCurrentPage(e)},showHideRows=function(e){return e>=(currentPage-1)*recordsPerPage&&e<=currentPage*recordsPerPage-1?"d-block":"d-none"},_onDelete=function(e){var t=e.i,_=dbData[t]&&dbData[t][TableRows[0]];_&&void 0!==_&&(deleteData.push(_),setDeleteData(deleteData));var a=dbData.filter((function(e,_){return _!==t}));setDbData(a),onTableUpdate&&onTableUpdate(a)},onSearch=function(e){var t=[];TableRows.map((function(_){return t.push((function(t){return t[_].toString().toLowerCase().includes(e.toString().toLowerCase())}))}));var _=dbDataBackup.filter((function(e){return t.some((function(t){return t(e)}))&&!deleteData.includes(e[TableRows[0]])}));setDbData(Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__.a)(_))},onRecordsChange=function(e){setRecordsPerPage(e)},getPageCounts=function(){var e=(currentPage-1)*recordsPerPage+1;e=e>0?e:0;var t=dbData.length>=currentPage*recordsPerPage?currentPage*recordsPerPage:dbData.length;return intl.formatMessage({id:"recordsLengthLine",defaultMessage:"recordsLengthLine"},{start:e,end:t,length:dbData?dbData.length:0})};return!1===loader?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"react-responsive-ajax-data-table ".concat(className),id:id,children:0===tableConfigErrors.length?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.Fragment,{children:[pagination&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div",{className:"biGrid",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"heading",title:getPageCounts(),children:getPageCounts()})}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_FormElements_GroupElement__WEBPACK_IMPORTED_MODULE_12__.a,{theme:theme,config:config,defaultRecordsPerPage:defaultRecordsPerPage,onSearchChange:function(e){return onSearch(e)},onDropDownChange:function(e){return onRecordsChange(e)},onDismissSearch:function(){return onSearch("")}})})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"grid-responsive",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div",{style:Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.a)(Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.a)({},Array.isArray(cellWidth)&&{gridTemplateColumns:"".concat(cellWidth.join("rem ")+"rem")}),"string"===typeof cellWidth&&{gridTemplateColumns:"repeat(".concat(TableRows.length,", ").concat(cellWidth,")")}),className:"grid-container responsive-grid",children:[TableAliasRows.map((function(e,t){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{onClick:function(){return onSort(TableRows[t])},className:"header",children:t>0||!postApiUrl?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.Fragment,{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span",{title:e,children:e})," ",TableRows[t]===sortType.key&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_FormElements_HtmlIcon__WEBPACK_IMPORTED_MODULE_11__.a,{className:"default",entity:sortType.asc?"&#8593;":"&#8595;"})]}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_FormElements_HtmlIcon__WEBPACK_IMPORTED_MODULE_11__.a,{className:"default",entity:"&#9776;"})},"key-".concat(t))})),dbData.length>0?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.Fragment,{children:[dbData.map((function(e,t){return TableRows.map((function(_,a){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"".concat(pagination?showHideRows(t):""),children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div",Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.a)(Object(_Applications_MAMP_htdocs_moneyPlanner_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.a)({},showTooltipFor.includes(_)&&{className:"tooltipContainer"}),{},{children:[""!==e[_]&&showTooltipFor.includes(_)&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span",{className:"tooltips",children:e[_]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_FormElement__WEBPACK_IMPORTED_MODULE_7__.a,{config:config,onDelete:function(e){return _onDelete(e)},onChange:function(e,t,_){updateDbData(e,t,_)},index:{i:t,j:_},placeholder:TableAliasRows[a],value:e[_],element:rowElements[a],showIncrement:dbData.length-1===t,showDecrement:!0,onAddRow:function(e){return _onAddRow(e)},primaryKey:TableRows[0],isPostable:Boolean(postApiUrl),theme:theme},"".concat(t,"-").concat(a))]}))},"".concat(e[_],"-").concat(a))}))})),showTotal&&showTotal.length>0&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.Fragment,{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"textCenter",children:cTotal.title}),TableRows.slice(1).map((function(e,t){var _=showTotal.includes(e)||showTotal.some((function(t){return t.whichKey===e}));return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:_?"totalColumn":"",children:_?getColumnTotal(e):""},t)}))]})]}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.Fragment,{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_FormElement__WEBPACK_IMPORTED_MODULE_7__.a,{index:{i:0,j:0},element:rowElements[0],showIncrement:!0,showDecrement:!1,onAddRow:function(e){return _onAddRow(e)}},-1),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"py-3 text-center",style:{gridColumn:"1 / span ".concat(TableRows.length)},children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_intl__WEBPACK_IMPORTED_MODULE_14__.a,{id:"noRecordsGenerated",defaultMessage:"noRecordsGenerated"})})]})]})}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div",{className:"footer",children:[pagination&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Pagination__WEBPACK_IMPORTED_MODULE_10__.a,{currentPage:currentPage,totalPages:Math.ceil(dbData.length/recordsPerPage),onSetPage:onSetCurrentPage,maxPagesToShow:maxPagesToShow,selectedPageString:pagination.currentPage}),postApiUrl&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"py-2 text-end",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("button",{onClick:function(){return submitData()},disabled:btnLoader,className:"btn btn-bni",children:btnLoader?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("i",{className:"fa fa-circle-o-notch fa-spin fa-fw"}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.Fragment,{children:ajaxButtonName})})})]})]}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div",{className:"errorWrapper",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("h5",{children:"Please resolve the following issues:"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("ol",{children:tableConfigErrors.map((function(e,t){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("li",{children:e.error},t)}))})]})}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"relativeSpinner",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_loader_spinner__WEBPACK_IMPORTED_MODULE_8___default.a,{type:_helpers__WEBPACK_IMPORTED_MODULE_9__.a.loadRandomSpinnerIcon(),color:document.documentElement.style.getPropertyValue("--app-theme-bg-color"),height:100,width:100})})}BackendCore.defaultProps={id:"",Table:"My table",TableRows:[],TableAliasRows:[],showTotal:[],rowKeyUp:"",rowElements:[],insertCloneData:[],showTooltipFor:[],ajaxType:"post",ajaxButtonName:"Submit",config:{header:{searchPlaceholder:"Search"},footer:{total:{title:"Total",locale:"en-IN",currency:"",maxDecimal:2},pagination:{currentPage:"first",recordsPerPage:10,maxPagesToShow:5}}},defaultValues:[],cellWidth:"13rem"},__webpack_exports__.a=Object(react_intl__WEBPACK_IMPORTED_MODULE_15__.c)(BackendCore)},92:function(e,t,_){"use strict";var a=_(25),n=_(28),r=(_(1),_(0)),c=["className","entity"],s=function(e){var t=e.className,_=e.entity,s=Object(n.a)(e,c);return Object(r.jsx)("span",Object(a.a)({className:"htmlIcon ".concat(t),dangerouslySetInnerHTML:{__html:_}},s))};s.defaultProps={property:"String name"},t.a=s}}]);