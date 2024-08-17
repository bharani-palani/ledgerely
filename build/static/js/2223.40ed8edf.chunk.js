"use strict";(self.webpackChunkledgerely_com=self.webpackChunkledgerely_com||[]).push([[2223],{9595:(e,a,t)=>{t.d(a,{I:()=>r});var s=t(9950),n=t(8429);const r=()=>{const{search:e}=(0,n.zy)();return(0,s.useMemo)((()=>new URLSearchParams(e)),[e])}},2223:(e,a,t)=>{t.r(a),t.d(a,{default:()=>S});var s=t(9950),n=t(3058),r=t(5358),l=t(6781),o=t(8459),c=t(4570),d=t(1308),i=t(2436),u=t(970),p=t(9288),m=t(3027),g=t(3932),f=t(9051),b=t.n(f),h=t(8311),x=t(2083),D=t(8630),y=t(9595),M=t(3177),k=t(7391),w=t(6731),j=t(9845),A=t(2097),T=t(4414);const _=s.createContext(void 0),S=()=>{var e;const a=(0,p.A)(),t=(0,s.useContext)(d.F);document.title=`${t.appName} - ${a.formatMessage({id:"bank",defaultMessage:"bank"})}`;const f=(0,s.useContext)(i.R),S=(0,s.useContext)(k.U),v=(0,s.useContext)(j.O),[C,I]=(0,s.useState)(!1),[R,N]=(0,s.useState)(!1),[P,E]=(0,s.useState)(!0),[F,L]=(0,s.useState)([]),[O,V]=(0,s.useState)({bank:"",startDate:b()().startOf("month").toDate(),endDate:b()().endOf("month").toDate()}),[$,Y]=(0,s.useState)([]),H={start:0,limit:10,searchString:""},[K,U]=(0,s.useState)(H),[W,B]=(0,s.useState)(H),G={config:{header:{searchPlaceholder:a.formatMessage({id:"searchHere",defaultMessage:"searchHere"}),searchable:!0},footer:{total:{title:a.formatMessage({id:"total",defaultMessage:"total"}),maxDecimal:2},pagination:{currentPage:"first",maxPagesToShow:5}}},id:"bankTable",Table:"bankTrx",label:"Bank trx",TableRows:["inc_exp_name","inc_exp_date","inc_exp_amount","inc_exp_type","inc_exp_comments"],TableAliasRows:[a.formatMessage({id:"name",defaultMessage:"name"}),a.formatMessage({id:"date",defaultMessage:"date"}),a.formatMessage({id:"amount",defaultMessage:"amount"}),a.formatMessage({id:"type",defaultMessage:"type"}),a.formatMessage({id:"comments",defaultMessage:"comments"})],defaultValues:[],rowElements:["label","label","label","label","label"]},J=e=>{N(!0),Y([]),setTimeout((()=>{const a=(()=>{const e=new FormData;return e.append("limit",W.limit),e.append("start",W.start),e.append("searchString",W.searchString),e.append("TableRows","a.inc_exp_name, a.inc_exp_date, a.inc_exp_amount, a.inc_exp_type, a.inc_exp_comments"),e.append("Table","bankTrx"),e.append("WhereClause",`a.inc_exp_appId = '${f.userConfig.appId}' && a.inc_exp_bank = '${O.bank}' && d.bank_appId = '${f.userConfig.appId}' && a.inc_exp_date >= '${b()(O.startDate).format("YYYY-MM-DD").toString()}' && a.inc_exp_date <= '${b()(O.endDate).format("YYYY-MM-DD").toString()}'`),c.A.post("/account_planner/getAccountPlanner",e)})();Promise.all([a]).then((a=>{Y(a[0].data.response),"function"===typeof e&&e()})).catch((e=>console.log("bbb",e))).finally((()=>{N(!1),I(!0)}))}),100)};(0,s.useEffect)((()=>{(async()=>{E(!0);const e=new FormData;e.append("limit",K.limit),e.append("start",K.start),e.append("searchString",K.searchString),e.append("appId",f.userConfig.appId),c.A.post("/account_planner/bank_list",e).then((e=>{L(e.data.response)})).catch((e=>{console.log(e)})).finally((()=>E(!1)))})()}),[]);const z=(0,y.I)(),q={fetch:z.get("fetch"),bankId:z.get("bankId"),startDate:z.get("startDate"),endDate:z.get("endDate")},[Q,X]=(0,s.useState)(!1);(0,s.useEffect)((()=>{"bank"===q.fetch&&q.bankId&&(X(!0),V((e=>({...e,bank:q.bankId,startDate:b()(q.startDate).toDate(),endDate:b()(q.endDate).toDate()}))))}),[JSON.stringify(q)]),(0,s.useEffect)((()=>{"bank"===q.fetch&&O.bank&&O.startDate&&O.endDate&&Q&&J((()=>{X(!1),setTimeout((()=>{var e;null===(e=document.getElementById("bankTable"))||void 0===e||e.scrollIntoView({behavior:"smooth",block:"center",inline:"start"})}),200)}))}),[JSON.stringify(q),O.bank,Q]);const Z=()=>(0,T.jsx)("div",{className:"relativeSpinner middle",children:(0,T.jsx)(h.A,{type:x.A.loadRandomSpinnerIcon(),color:document.documentElement.style.getPropertyValue("--app-theme-bg-color"),height:100,width:100})}),ee=["id","bank","accountNumber","swiftCode","type","country","sort","localeLanguage","localeCurrency"],ae=["checkbox","textbox","textbox","textbox",{fetch:{dropDownList:[{id:"SAV",value:a.formatMessage({id:"savingsAccount",defaultMessage:"savingsAccount"})},{id:"CUR",value:a.formatMessage({id:"currentAccount",defaultMessage:"currentAccount"})}]}},{fetch:{dropDownList:A.HH},searchable:!0},"number",{fetch:{dropDownList:A.HF},searchable:!0},{fetch:{dropDownList:A.Mi},searchable:!0}],te=M.GG.filter((e=>"bankAccounts"===e.id)).map((e=>{const t={header:{searchPlaceholder:a.formatMessage({id:"searchHere",defaultMessage:"searchHere"}),searchable:!0},footer:{total:{locale:S.localeLanguage,currency:S.localeCurrency,maxDecimal:2},pagination:{currentPage:"last",maxPagesToShow:5}}};return e.config=t,e.TableAliasRows=ee.map((e=>a.formatMessage({id:e,defaultMessage:e}))),e.rowElements=ae,e}))[0],[se,ne]=(0,s.useState)([]),re=()=>{ne([]);const e=((e,a)=>{const t=new FormData;return t.append("TableRows",a),t.append("Table",e),t.append("limit",K.limit),t.append("start",K.start),t.append("searchString",K.searchString),t.append("appId",f.userConfig.appId),c.A.post("/account_planner/getAccountPlanner",t)})(te.Table,te.TableRows);Promise.all([e]).then((async e=>{ne(e[0].data.response)}))};(0,s.useEffect)((()=>{re()}),[K]);return(0,s.useEffect)((()=>{C&&J()}),[W,C]),(0,T.jsx)(_.Provider,{value:{bankList:F,selection:O},children:(0,T.jsxs)(r.A,{fluid:!0,children:[(0,T.jsx)(n.A,{icon:"fa fa-bank",intlId:"bank"}),P?(0,T.jsx)(Z,{}):(0,T.jsxs)(T.Fragment,{children:[se&&(null===(e=Object.keys(se))||void 0===e?void 0:e.length)>0&&(0,T.jsx)(T.Fragment,{children:(0,T.jsx)(D.A,{className:"pt-3",config:te.config,Table:te.Table,TableRows:te.TableRows,TableAliasRows:te.TableAliasRows,rowElements:te.rowElements,defaultValues:te.defaultValues,dbData:se,postApiUrl:"/account_planner/postAccountPlanner",onPostApi:e=>(e=>{const{status:t,data:s}=e;if(200===t){if(e&&s&&"boolean"===typeof s.response&&null!==s.response&&s.response&&f.renderToast({message:a.formatMessage({id:"transactionSavedSuccessfully",defaultMessage:"transactionSavedSuccessfully"})}),e&&s&&"boolean"===typeof s.response&&null!==s.response&&!1===s.response&&f.renderToast({type:"error",icon:"fa fa-times-circle",message:a.formatMessage({id:"noFormChangeFound",defaultMessage:"noFormChangeFound"})}),e&&s&&null===s.response&&v.setConfig({show:!0,className:"alert-danger border-0 text-dark",type:"danger",dismissible:!0,heading:(0,T.jsx)(w.x,{}),content:(0,T.jsx)(w.E,{})}),e&&s&&"object"===typeof s.response&&null!==s.response){let e;e=1451===s.response.number?"foreignKeyDeleteMessage":"",f.renderToast({type:"error",icon:"fa fa-times-circle",message:a.formatMessage({id:e,defaultMessage:e})})}}else f.renderToast({type:"error",icon:"fa fa-times-circle",message:a.formatMessage({id:"unableToReachServer",defaultMessage:"unableToReachServer"})})})(e,te.id),apiParams:K,onChangeParams:e=>(e=>{U((a=>({...a,...e})))})(e),onReFetchData:()=>re(),cellWidth:te.cellWidth,ajaxButtonName:a.formatMessage({id:"submit",defaultMessage:"submit"}),appIdKeyValue:{key:"bank_appId",value:f.userConfig.appId},theme:f.userData.theme})}),(0,T.jsxs)(l.A,{className:"align-items-center "+(Object.keys($).length>0?"":"pb-5"),children:[(0,T.jsx)(o.A,{sm:3,className:"react-responsive-ajax-data-table pb-2",children:(0,T.jsx)(u.A,{placeholder:`${a.formatMessage({id:"select",defaultMessage:"select"})} ${a.formatMessage({id:"bank",defaultMessage:"bank"})}`,onChange:(e,a,t)=>{V((e=>({...e,bank:a})))},element:{fetch:{dropDownList:F.map((e=>({id:e.id,value:e.value})))},searchable:!0},value:O.bank,type:"single",searchable:!0,theme:f.userData.theme})}),(0,T.jsxs)(o.A,{sm:3,className:"d-flex align-items-center justify-content-between pb-2",children:[(0,T.jsx)("span",{children:(0,T.jsx)(m.A,{id:"startDate",defaultMessage:"startDate"})}),(0,T.jsx)(g.A,{className:"bg-white text-dark",value:O.startDate,format:"yyyy-MM-dd",clearIcon:null,onChange:e=>{V((a=>({...a,startDate:e})))},maxDate:new Date,onKeyDown:e=>{e.preventDefault()}})]}),(0,T.jsxs)(o.A,{sm:3,className:"d-flex align-items-center justify-content-between pb-2",children:[(0,T.jsx)("span",{children:(0,T.jsx)(m.A,{id:"endDate",defaultMessage:"endDate"})}),(0,T.jsx)(g.A,{className:"bg-white text-dark",value:O.endDate,format:"yyyy-MM-dd",clearIcon:null,onChange:e=>{V((a=>({...a,endDate:e})))},maxDate:new Date,onKeyDown:e=>{e.preventDefault()}})]}),(0,T.jsx)(o.A,{sm:3,className:"pb-2",children:(0,T.jsx)("button",{className:"btn btn-sm btn-bni w-100 border-0",onClick:()=>J(),disabled:R||!O.bank,children:(0,T.jsx)(m.A,{id:"generate",defaultMessage:"generate"})})})]})]}),R&&(0,T.jsx)(Z,{}),$&&Object.keys($).length>0&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)("div",{className:"py-2",children:(0,T.jsx)("span",{className:"badge "+("dark"===f.userData.theme?"bg-secondary text-white":"bg-light text-dark"),children:a.formatMessage({id:"bankTransactions",defaultMessage:"bankTransactions"})})}),(0,T.jsx)(D.A,{id:G.id,config:G.config,Table:G.Table,TableRows:G.TableRows,TableAliasRows:G.TableAliasRows,rowElements:G.rowElements,defaultValues:G.defaultValues,dbData:$,cellWidth:[25,7,10,5,20],theme:f.userData.theme,apiParams:W,onChangeParams:e=>(e=>{B((a=>({...a,...e})))})(e)})]}),0===Object.keys($).length&&C&&!R&&(0,T.jsx)("div",{className:"text-center py-2",children:(0,T.jsx)(m.A,{id:"noRecordsGenerated",defaultMessage:" "})})]})})}}}]);