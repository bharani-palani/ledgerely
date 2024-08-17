"use strict";(self.webpackChunkledgerely_com=self.webpackChunkledgerely_com||[]).push([[6693],{2016:(e,a,t)=>{t.d(a,{DZ:()=>n,Pb:()=>_,XD:()=>l,YL:()=>m,e_:()=>s,oz:()=>d,zB:()=>o});var i=t(4761);const n="#c2d82e",d="#000000",m=i.select("body").append("div").attr("class","tooltip").attr("role","tooltip").style("position","absolute").style("background","#222222").style("border-radius","5px").style("color","#ffffff"),o=[{id:"animate__animated animate__bounce",value:"Bounce"},{id:"animate__animated animate__flash",value:"Flash"},{id:"animate__animated animate__pulse",value:"Pulse"},{id:"animate__animated animate__rubberBand",value:"Rubberband"},{id:"animate__animated animate__shakeX",value:"Shake horizontal"},{id:"animate__animated animate__shakeY",value:"Shake vertical"},{id:"animate__animated animate__headShake",value:"Headshake"},{id:"animate__animated animate__swing",value:"Swing"},{id:"animate__animated animate__tada",value:"Tada"},{id:"animate__animated animate__wobble",value:"Wobble"},{id:"animate__animated animate__jello",value:"Jello"},{id:"animate__animated animate__heartBeat",value:"Heart beat"},{id:"animate__animated animate__backInDown",value:"Back in down"},{id:"animate__animated animate__backInLeft",value:"Back in left"},{id:"animate__animated animate__backInRight",value:"Back in right"},{id:"animate__animated animate__backInUp",value:"Back in up"},{id:"animate__animated animate__bounceIn",value:"Bounce in"},{id:"animate__animated animate__bounceInDown",value:"Bounce in down"},{id:"animate__animated animate__bounceInLeft",value:"Bounce in left"},{id:"animate__animated animate__bounceInRight",value:"Bounce in right"},{id:"animate__animated animate__bounceInUp",value:"Bounce in up"},{id:"animate__animated animate__fadeIn",value:"Fade in"},{id:"animate__animated animate__fadeInDown",value:"Fade in down"},{id:"animate__animated animate__fadeInDownBig",value:"Fade in down big"},{id:"animate__animated animate__fadeInLeft",value:"Fade in left"},{id:"animate__animated animate__fadeInLeftBig",value:"Fadeinleftbig"},{id:"animate__animated animate__fadeInRight",value:"Fade in right"},{id:"animate__animated animate__fadeInRightBig",value:"Fade in right big"},{id:"animate__animated animate__fadeInUp",value:"Fade in up"},{id:"animate__animated animate__fadeInUpBig",value:"Fade in up big"},{id:"animate__animated animate__fadeInTopLeft",value:"Fade in top left"},{id:"animate__animated animate__fadeInTopRight",value:"Fade in top right"},{id:"animate__animated animate__fadeInBottomLeft",value:"Fade in bottom left"},{id:"animate__animated animate__fadeInBottomRight",value:"Fade in bottom right"},{id:"animate__animated animate__flip",value:"Flip"},{id:"animate__animated animate__flipInX",value:"Flipin horizontal"},{id:"animate__animated animate__flipInY",value:"Flipin vertical"},{id:"animate__animated animate__lightSpeedInRight",value:"Light speed in right"},{id:"animate__animated animate__lightSpeedInLeft",value:"Light speed in left"},{id:"animate__animated animate__rotateIn",value:"Rotate in"},{id:"animate__animated animate__rotateInDownLeft",value:"Rotate in down left"},{id:"animate__animated animate__rotateInDownRight",value:"Rotate in down right"},{id:"animate__animated animate__rotateInUpLeft",value:"Rotate in up left"},{id:"animate__animated animate__rotateInUpLeft",value:"Rotate in up left"},{id:"animate__animated animate__jackInTheBox",value:"Jack in the box"},{id:"animate__animated animate__rollIn",value:"Roll in"},{id:"animate__animated animate__zoomIn",value:"Zoom in"},{id:"animate__animated animate__zoomInDown",value:"Zoom in down"},{id:"animate__animated animate__zoomInLeft",value:"Zoom in left"},{id:"animate__animated animate__zoomInRight",value:"Zoom in right"},{id:"animate__animated animate__zoomInUp",value:"Zoom in up"},{id:"animate__animated animate__slideInDown",value:"Slide in down"},{id:"animate__animated animate__slideInLeft",value:"Slide in left"},{id:"animate__animated animate__slideInRight",value:"Slide in right"},{id:"animate__animated animate__slideInUp",value:"Slide in up"}],l={0:"CIRCULAR",1:"BAR",2:"DISTRIBUTION",3:"CORRELATION",4:"SHAPES",5:"EMOJI"},_={minWidth:100,maxWidth:1e3,minHeight:100,maxHeight:1e3},s={chartLimit:Math.pow(2,5),sheetLimit:Math.pow(2,4)}},68:(e,a,t)=>{t.d(a,{A:()=>i});const i=t(9950).createContext({})},6693:(e,a,t)=>{t.r(a),t.d(a,{default:()=>k});var i=t(9950),n=t(8311),d=t(2083),m=t(9288),o=t(7956),l=t(4570),_=t(2016),s=t(2436),r=t(68),u=t(1308),c=t(4414);const h=(0,i.lazy)((()=>t.e(6231).then(t.bind(t,6231)).then((e=>({default:e.VerticalPanes}))))),v=(0,i.lazy)((()=>t.e(6231).then(t.bind(t,6231)).then((e=>({default:e.Pane}))))),p=(0,i.lazy)((()=>Promise.all([t.e(1432),t.e(8045),t.e(853),t.e(3314)]).then(t.bind(t,3314)))),f=(0,i.lazy)((()=>t.e(6241).then(t.bind(t,6241)))),b=(0,i.lazy)((()=>Promise.all([t.e(1432),t.e(910),t.e(7903)]).then(t.bind(t,7903)))),g=(0,i.lazy)((()=>Promise.all([t.e(1432),t.e(1770)]).then(t.bind(t,1770)))),I=(0,i.lazy)((()=>Promise.all([t.e(1432),t.e(3932),t.e(6275),t.e(8477),t.e(892)]).then(t.bind(t,892)))),k=e=>{var a;const t=(0,m.A)(),k=(0,i.useContext)(u.F);document.title=`${k.appName} - ${t.formatMessage({id:"workbook",defaultMessage:"workbook"})}`;const w=(0,i.useRef)(null),x=(0,i.useContext)(s.R),y=[{id:(0,o.A)(),order:0,label:`${t.formatMessage({id:"sheet",defaultMessage:"sheet"})} 1`,charts:[],zoom:100}],[S,L]=(0,i.useState)(y),[R,B]=(0,i.useState)(""),[F,j]=(0,i.useState)(""),[z,D]=(0,i.useState)(!1),[C,A]=(0,i.useState)({start:"10%",middle:"75%",end:"20%",expanded:!0}),[E,T]=(0,i.useState)({id:null,name:"",appId:x.userConfig.appId,isSaved:!0}),[M,N]=(0,i.useState)(!1),[P,U]=(0,i.useState)([]),Z=()=>{const e=new FormData;e.append("appId",x.userConfig.appId),l.A.post("workbook/getSavedQueryLists",e).then((e=>{let{data:a}=e;D(a.response)})).catch((e=>x.renderToast({type:"error",icon:"fa fa-times-circle",position:"bottom-center",message:t.formatMessage({id:"unableToReachServer",defaultMessage:"unableToReachServer"})})))},$=e=>{const a=S.map((a=>(a.id===R&&(a.charts=a.charts.filter((a=>a.id!==e))),a)));L(a),T((e=>({...e,isSaved:!1})))},H=e=>{e.preventDefault(),e.stopImmediatePropagation();return e.returnValue="",e.returnValue},W=e=>{if(("Delete"===e.key||"Backspace"===e.key)&&"text"!==document.activeElement.type){const e=[...document.body.classList];w.current&&!e.includes("modal-open")&&$(F)}};(0,i.useEffect)((()=>{Z()}),[]),(0,i.useEffect)((()=>(E.isSaved||window.addEventListener("beforeunload",H,{capture:!0}),()=>{window.removeEventListener("beforeunload",H,{capture:!0})})),[E]),(0,i.useEffect)((()=>([...S].map((e=>e.charts.filter((e=>e.id===F)).length>0)).every((e=>!1===e))&&j(""),document.body.addEventListener("keydown",W),()=>{document.body.removeEventListener("keydown",W)})),[S,F]);return(0,c.jsx)(i.Suspense,{fallback:(0,c.jsx)("div",{className:"relativeSpinner middle",children:(0,c.jsx)(n.A,{type:d.A.loadRandomSpinnerIcon(),color:document.documentElement.style.getPropertyValue("--app-theme-bg-color"),height:100,width:100})}),children:(0,c.jsxs)(r.A.Provider,{value:{defaultSheet:y,sheets:S,setSheets:L,theme:x.userData.theme,activeSheet:R,setActiveSheet:B,activeChart:F,setActiveChart:j,deleteChart:$,cloneChart:async e=>{var a;if((null===(a=S.filter((e=>e.id===R))[0])||void 0===a?void 0:a.charts).length<_.e_.chartLimit){const a=(0,o.A)(),t=S.map((t=>(t.id===R&&(t.charts=[...t.charts,{...e,id:a,x:0,y:0,z:0}]),t)));L(t),setTimeout((()=>{j(a),T((e=>({...e,isSaved:!1})))}),100)}else x.renderToast({type:"warn",icon:"fa fa-exclamation-triangle",position:"bottom-center",message:t.formatMessage({id:"chartLimitExceeded",defaultMessage:"chartLimitExceeded"})})},workbookRef:w,file:E,setFile:T,saveLoading:M,setSaveLoading:N,savedWorkbooks:P,setSavedWorkbooks:U,savedQueryList:z,setSavedQueryList:D,fetchSavedQueryList:Z},children:[(0,c.jsx)(f,{}),(0,c.jsxs)("div",{className:"workbook container-fluid small d-none d-sm-block",ref:w,children:[(0,c.jsxs)(h,{theme:x.userData.theme,className:`border border-1 ${null===x||void 0===x||null===(a=x.userConfig)||void 0===a?void 0:a.webMenuType} ${"dark"===x.userData.theme?"border-secondary":""} rounded-top`,children:[(0,c.jsx)(v,{width:C.start,className:"text-center overflow-auto",children:(0,c.jsx)(b,{})}),(0,c.jsx)(v,{width:F?C.middle:"100%",className:`border border-1 ${"dark"===x.userData.theme?"border-secondary":""} border-top-0 border-bottom-0`,children:(0,c.jsx)(g,{})}),F&&(0,c.jsxs)(v,{width:C.end,className:"position-relative",children:[(0,c.jsx)("button",{className:"btn btn-sm btn-bni position-absolute",style:{left:"-30px",paddingBottom:"2px",...C.expanded?{borderRadius:"0"}:{borderRadius:"0 0.25rem 0 0"}},onClick:()=>{A((e=>({...e,middle:C.expanded?"95%":"75%",end:C.expanded?"0%":"25%",expanded:!C.expanded})))},children:(0,c.jsx)("i",{className:"fa fa-arrow-"+(C.expanded?"right":"left")})}),(0,c.jsx)("div",{className:"",style:{...C.expanded?{display:"block"}:{display:"none"}},children:(0,c.jsx)(I,{})})]})]}),(0,c.jsx)(p,{})]})]})})}}}]);