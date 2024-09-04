"use strict";(self.webpackChunkledgerely_com=self.webpackChunkledgerely_com||[]).push([[2633],{2633:(i,a,e)=>{e.r(a),e.d(a,{default:()=>f});var t=e(14761);const o="scatterplot_scatterplotCircle__XfGMB",n="scatterplot_dimmed__nBvPM";var l=e(9950),s=e(44414);const r=i=>{let{yScale:a,pixelsPerTick:e,width:t,fontSize:o,fontColor:n,lineColor:r,xTicks:d,showXaxisLine:m,showYaxis:h}=i;const _=a.range(),f=(0,l.useMemo)((()=>{const i=_[0]-_[1],t=Math.floor(i/e);return a.ticks(t).map((i=>({value:i,yOffset:a(i)})))}),[a]);return(0,s.jsx)(s.Fragment,{children:f.map((i=>{let{value:a,yOffset:e}=i;return(0,s.jsxs)("g",{transform:`translate(0, ${e})`,shapeRendering:"crispEdges",children:[m&&(0,s.jsx)("line",{x1:-d,x2:t+d,stroke:r,strokeWidth:.5}),h&&(0,s.jsx)("text",{style:{fontSize:`${o}px`,textAnchor:"middle",transform:"translateX(-20px)",fill:n},children:a},a)]},a)}))})},d=i=>{let{xScale:a,pixelsPerTick:e,height:o,fontSize:n,fontColor:r,lineColor:d,yTicks:m,showYaxisLine:h,showXaxis:_}=i;const f=a.range(),u=(0,l.useMemo)((()=>{const i=f[1]-f[0],o=Math.floor(i/e);return a.ticks(o).map((i=>({value:t.format(".1s")(i),xOffset:a(i)})))}),[a]);return(0,s.jsx)(s.Fragment,{children:u.map(((i,a)=>{let{value:e,xOffset:t}=i;return(0,s.jsxs)("g",{transform:`translate(${t}, 0)`,shapeRendering:"crispEdges",children:[h&&(0,s.jsx)("line",{y1:m,y2:-o-m,stroke:d,strokeWidth:1}),_&&(0,s.jsx)("text",{style:{fontSize:`${n}px`,textAnchor:"middle",transform:"translateY(20px)",fill:r},children:e},e)]},a)}))})};var m=e(88927),h=e(19635);const _=i=>{let{width:a,height:e,data:m,marginTop:_,marginRight:f,marginBottom:u,marginLeft:x,fillColor:g,xTicks:c,yTicks:w,markerSize:p,fontSize:C,fontColor:v,lineColor:b,showTooltip:L,tooltipPrefix:z,tooltipSuffix:k,yAxisLabel:S,xAxisLabel:A,showYaxisLabel:B,showXaxisLabel:D,showYaxisLine:y,showXaxisLine:Z,showAnimation:T,animationClass:I,showXaxis:R,showYaxis:Y}=i;const X=a-f-x,F=e-_-u,[P,j]=(0,l.useState)(null),M=t.scaleLinear().domain([Math.min(...m.map((i=>i.y))),Math.max(...m.map((i=>i.y)))]).range([F,0]),W=t.scaleLinear().domain([0,Math.max(...m.map((i=>i.x)))]).range([0,X]),$=m.map((i=>String(i.group))),O=t.scaleOrdinal().domain($).range(g),U=m.map(((i,a)=>{const e=P&&i.group!==P?o+" "+n:o;return(0,s.jsx)("circle",{r:p,cx:W(i.x),cy:M(i.y),className:`${e} ${T?I:""}`,stroke:O(i.group),fill:O(i.group),onMouseOver:a=>{j(i.group),L&&(h.YL.style("padding","5px"),h.YL.style("opacity",.9),h.YL.html(`${z}  ${i.group} \u2192 ${i.subGroup} \u2192 ${i.size} ${k}`).style("left",a.pageX+5+"px").style("top",a.pageY-30+"px"))},onMouseLeave:()=>{j(null),h.YL.style("padding",0),h.YL.style("opacity",0)}},a)}));return(0,s.jsx)("div",{children:(0,s.jsxs)("svg",{width:a,height:e,children:[B&&(0,s.jsx)("text",{fontSize:C,x:-e/2,y:"20",fill:v,transform:"rotate(270)",style:{textAnchor:"middle"},children:S}),(0,s.jsxs)("g",{width:X,height:F,transform:`translate(${[x,_].join(",")})`,children:[(0,s.jsx)(r,{yScale:M,pixelsPerTick:w,width:X,fontSize:C,fontColor:v,lineColor:b,xTicks:c,showXaxisLine:Z,showYaxis:Y}),(0,s.jsx)("g",{transform:`translate(0, ${F})`,children:(0,s.jsx)(d,{xScale:W,pixelsPerTick:w,height:F,fontSize:C,fontColor:v,lineColor:b,yTicks:w,showYaxisLine:y,showXaxis:R})}),U]}),D&&(0,s.jsx)("text",{fontSize:C,x:a/2,y:e-10,fill:v,style:{textAnchor:"middle"},children:A})]})})};_.defaultProps=m.Sg;const f=_},19635:(i,a,e)=>{e.d(a,{DZ:()=>o,Pb:()=>d,XD:()=>r,YL:()=>l,e_:()=>m,oz:()=>n,zB:()=>s});var t=e(14761);const o="#c2d82e",n="#000000",l=t.select("body").append("div").attr("class","tooltip").attr("role","tooltip").style("position","absolute").style("background","#222222").style("border-radius","5px").style("color","#ffffff"),s=[{id:"animate__animated animate__bounce",value:"Bounce"},{id:"animate__animated animate__flash",value:"Flash"},{id:"animate__animated animate__pulse",value:"Pulse"},{id:"animate__animated animate__rubberBand",value:"Rubberband"},{id:"animate__animated animate__shakeX",value:"Shake horizontal"},{id:"animate__animated animate__shakeY",value:"Shake vertical"},{id:"animate__animated animate__headShake",value:"Headshake"},{id:"animate__animated animate__swing",value:"Swing"},{id:"animate__animated animate__tada",value:"Tada"},{id:"animate__animated animate__wobble",value:"Wobble"},{id:"animate__animated animate__jello",value:"Jello"},{id:"animate__animated animate__heartBeat",value:"Heart beat"},{id:"animate__animated animate__backInDown",value:"Back in down"},{id:"animate__animated animate__backInLeft",value:"Back in left"},{id:"animate__animated animate__backInRight",value:"Back in right"},{id:"animate__animated animate__backInUp",value:"Back in up"},{id:"animate__animated animate__bounceIn",value:"Bounce in"},{id:"animate__animated animate__bounceInDown",value:"Bounce in down"},{id:"animate__animated animate__bounceInLeft",value:"Bounce in left"},{id:"animate__animated animate__bounceInRight",value:"Bounce in right"},{id:"animate__animated animate__bounceInUp",value:"Bounce in up"},{id:"animate__animated animate__fadeIn",value:"Fade in"},{id:"animate__animated animate__fadeInDown",value:"Fade in down"},{id:"animate__animated animate__fadeInDownBig",value:"Fade in down big"},{id:"animate__animated animate__fadeInLeft",value:"Fade in left"},{id:"animate__animated animate__fadeInLeftBig",value:"Fadeinleftbig"},{id:"animate__animated animate__fadeInRight",value:"Fade in right"},{id:"animate__animated animate__fadeInRightBig",value:"Fade in right big"},{id:"animate__animated animate__fadeInUp",value:"Fade in up"},{id:"animate__animated animate__fadeInUpBig",value:"Fade in up big"},{id:"animate__animated animate__fadeInTopLeft",value:"Fade in top left"},{id:"animate__animated animate__fadeInTopRight",value:"Fade in top right"},{id:"animate__animated animate__fadeInBottomLeft",value:"Fade in bottom left"},{id:"animate__animated animate__fadeInBottomRight",value:"Fade in bottom right"},{id:"animate__animated animate__flip",value:"Flip"},{id:"animate__animated animate__flipInX",value:"Flipin horizontal"},{id:"animate__animated animate__flipInY",value:"Flipin vertical"},{id:"animate__animated animate__lightSpeedInRight",value:"Light speed in right"},{id:"animate__animated animate__lightSpeedInLeft",value:"Light speed in left"},{id:"animate__animated animate__rotateIn",value:"Rotate in"},{id:"animate__animated animate__rotateInDownLeft",value:"Rotate in down left"},{id:"animate__animated animate__rotateInDownRight",value:"Rotate in down right"},{id:"animate__animated animate__rotateInUpLeft",value:"Rotate in up left"},{id:"animate__animated animate__rotateInUpLeft",value:"Rotate in up left"},{id:"animate__animated animate__jackInTheBox",value:"Jack in the box"},{id:"animate__animated animate__rollIn",value:"Roll in"},{id:"animate__animated animate__zoomIn",value:"Zoom in"},{id:"animate__animated animate__zoomInDown",value:"Zoom in down"},{id:"animate__animated animate__zoomInLeft",value:"Zoom in left"},{id:"animate__animated animate__zoomInRight",value:"Zoom in right"},{id:"animate__animated animate__zoomInUp",value:"Zoom in up"},{id:"animate__animated animate__slideInDown",value:"Slide in down"},{id:"animate__animated animate__slideInLeft",value:"Slide in left"},{id:"animate__animated animate__slideInRight",value:"Slide in right"},{id:"animate__animated animate__slideInUp",value:"Slide in up"}],r={0:"CIRCULAR",1:"BAR",2:"DISTRIBUTION",3:"CORRELATION",4:"SHAPES",5:"EMOJI"},d={minWidth:100,maxWidth:1e3,minHeight:100,maxHeight:1e3},m={chartLimit:Math.pow(2,5),sheetLimit:Math.pow(2,4)}},88927:(i,a,e)=>{e.d(a,{$C:()=>F,Ar:()=>E,MH:()=>ai,Pe:()=>M,Sg:()=>W,U0:()=>oi,U2:()=>ti,VB:()=>H,Vl:()=>P,_1:()=>q,_t:()=>j,bR:()=>$,bn:()=>Y,bz:()=>U,dP:()=>Q,e9:()=>ni,eJ:()=>K,iA:()=>V,kB:()=>R,n4:()=>N,n8:()=>G,oZ:()=>J,qm:()=>ii,tF:()=>O,tp:()=>I,uA:()=>X,yZ:()=>ei});var t,o,n,l,s,r,d,m,h,_,f,u,x,g,c,w,p,C,v,b,L,z,k,S,A,B,D,y=e(19635),Z=e(50910),T=e(14761);const I={name:"Diverging chart",width:600,height:300,barHeight:20,marginTop:30,marginRight:60,marginBottom:10,marginLeft:60,metric:"relative",fillColor:y.DZ,fontColor:"currentColor",lineColor:"currentColor",fontSize:14,data:Z.Xu,showAnimation:!0,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",showXaxis:!0,showYaxis:!0,yTicks:6,padding:.1,showAnimation:!0,animationClass:null===(t=y.zB[0])||void 0===t?void 0:t.id,onClick:()=>{}},R={name:"Pannable chart",width:700,height:300,marginTop:10,marginRight:20,marginBottom:40,marginLeft:50,fillColor:y.DZ,fontColor:y.DZ,lineColor:"currentColor",yAxisLabel:"y-axis",data:Z.yJ,showYaxisLine:!0,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,yTicks:6,showAnimation:!0,animationClass:null===(o=y.zB[0])||void 0===o?void 0:o.id,onClick:()=>{}},Y={name:"Donut chart",width:350,height:350,outerRadius:100,innerRadius:70,data:[12,23,34,45,56].map(((i,a)=>({label:"Sample "+(a+1),value:i}))),fillColor:[y.DZ,y.oz],fontSize:12,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontColor:"currentColor",showAnimation:!0,showLegend:!0,showXaxisLabel:!0,xAxisLabel:"Sample",showXaxisLabel:!0,animationClass:null===(n=y.zB[0])||void 0===n?void 0:n.id,onClick:()=>{}},X={name:"Horizontal bar chart",width:600,barHeight:20,data:new Array(10).fill("_").map(((i,a)=>({label:`C${a+1}`,value:Number((100*Math.random()).toFixed(2))}))),marginTop:30,marginRight:50,marginBottom:10,marginLeft:60,sortClause:"",padding:.05,style:{},fillColor:y.DZ,fontColor:"currentColor",lineColor:y.DZ,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontSize:12,showAnimation:!0,animationClass:null===(l=y.zB[0])||void 0===l?void 0:l.id,onClick:()=>{}},F={name:"Pie chart",width:250,height:250,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fillColor:[y.DZ,y.oz],fontColor:"currentColor",data:[{label:"<5",value:45e3},{label:"5-9",value:3e4},{label:"10-14",value:4e4},{label:"15-19",value:5e4},{label:"20-24",value:6e4},{label:"25-29",value:7e4},{label:"30-34",value:8e4}],fontSize:12,showXaxisLabel:!0,showYaxisLabel:!0,sortClause:"",lineColor:"#555",showAnimation:!0,animationClass:null===(s=y.zB[0])||void 0===s?void 0:s.id,className:"",onClick:()=>{}},P={name:"Stacked vertical bar chart",width:500,height:200,marginTop:10,marginRight:10,marginBottom:20,marginLeft:80,fillColor:[y.DZ,y.oz],fontColor:"currentColor",lineColor:"currentColor",showTooltip:!0,padding:.01,yTicks:6,showAnimation:!0,animationClass:null===(r=y.zB[0])||void 0===r?void 0:r.id,sortClause:"",data:Z.jU.filter((i=>["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL"].includes(i.label))),showYaxis:!0,showXaxis:!0,showXaxisLabel:!0,showXaxisLine:!0,showYaxisLine:!0,showYaxisLabel:!0,fontSize:12,onClick:()=>{}},j={name:"Vertical bar chart",width:700,height:200,marginTop:20,marginRight:10,marginBottom:40,marginLeft:60,fillColor:y.DZ,fontColor:y.DZ,lineColor:"currentColor",yAxisLabel:"y-axis",xAxisLabel:"x-axis",padding:.01,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,data:new Array(20).fill("_").map(((i,a)=>({label:`C${a+1}`,value:Number((100*Math.random()).toFixed(2))}))),showYaxisLine:!0,showXaxis:!0,showXaxisLabel:!0,showYaxis:!0,showYaxisLabel:!0,showAnimation:!0,showLegend:!0,animationClass:null===(d=y.zB[0])||void 0===d?void 0:d.id,sortClause:"",xAxisTicksOrientation:"horizontal",fontSize:12,yTicks:6,onClick:()=>{}},M={name:"Zoomable circle packing chart",width:600,height:600,fillColor:[y.DZ,y.oz],padding:3,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontSize:10,showAnimation:!0,animationClass:null===(m=y.zB[0])||void 0===m?void 0:m.id,data:Z.xP,onClick:()=>{}},W={name:"Scatter plot chart",width:500,height:300,marginTop:60,marginRight:60,marginBottom:60,marginLeft:70,data:Z.MS,fillColor:T.schemeSet1,fontColor:y.DZ,lineColor:y.DZ,xTicks:40,yTicks:40,markerSize:7,fontSize:14,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",yAxisLabel:"Y - Axis",xAxisLabel:"X - Axis",showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,animationClass:null===(h=y.zB[0])||void 0===h?void 0:h.id,showAnimation:!0,showXaxis:!0,showYaxis:!0,onClick:()=>{}},$={name:"Density chart",width:300,height:200,data:Z.lM,marginTop:30,marginRight:30,marginBottom:60,marginLeft:30,fillColor:y.DZ,fontColor:y.DZ,lineColor:y.DZ,showXaxisLabel:!0,fontSize:12,xAxisLabel:"X - Axis",showXaxis:!0,animationClass:null===(_=y.zB[0])||void 0===_?void 0:_.id,showAnimation:!0,onClick:()=>{}},O={name:"Box plot chart",width:300,height:200,data:Z.RT,marginTop:30,marginRight:30,marginBottom:60,marginLeft:60,markerSize:1,fillColor:y.DZ,fontColor:y.DZ,lineColor:y.DZ,padding:.7,fontSize:12,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,xAxisLabel:"x-axis",yAxisLabel:"y-axis",animationClass:null===(f=y.zB[0])||void 0===f?void 0:f.id,showAnimation:!0,xAxisTicksOrientation:"horizontal",onClick:()=>{}},U={name:"Line chart",width:300,height:200,data:Z.eo,marginTop:30,marginRight:30,marginBottom:50,marginLeft:60,markerSize:1,fontSize:12,fillColor:y.DZ,fontColor:y.DZ,lineColor:y.DZ,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,xAxisLabel:"x-axis",yAxisLabel:"y-axis",showAnimation:!0,xAxisTicksOrientation:"horizontal",animationClass:null===(u=y.zB[0])||void 0===u?void 0:u.id,onClick:()=>{}},H={name:"Voronoi chart",width:300,height:200,data:Z.Lu,markerSize:7,strokeWidth:2,opacity:.3,lineColor:y.oz,fillColor:y.DZ,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",animationClass:null===(x=y.zB[0])||void 0===x?void 0:x.id,showAnimation:!0,className:"",onClick:()=>{}},N={name:"Circular bar chart",width:400,height:400,data:Z.r0,marginTop:30,marginRight:0,marginBottom:30,marginLeft:0,fontSize:12,fillColor:y.DZ,fontColor:y.DZ,lineColor:y.DZ,innerRadius:10,padding:.2,opacity:.7,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",sortClause:"",showAnimation:!0,showLegend:!0,animationClass:null===(g=y.zB[0])||void 0===g?void 0:g.id,onClick:()=>{}},E={name:"Word cloud chart",width:400,height:300,data:Z.YA,fontColor:new Array(25).fill(y.DZ),padding:1,showAnimation:!0,animationClass:null===(c=y.zB[0])||void 0===c?void 0:c.id,opacity:1},J={name:"",width:100,height:100,fillColor:"transparent",fontColor:y.DZ,lineColor:y.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(w=y.zB[0])||void 0===w?void 0:w.id},V={name:"",width:100,height:100,fillColor:"transparent",fontColor:y.DZ,lineColor:y.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(p=y.zB[0])||void 0===p?void 0:p.id},G={name:"",width:100,height:100,fillColor:"transparent",fontColor:y.DZ,lineColor:y.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(C=y.zB[0])||void 0===C?void 0:C.id,borderRadius:5},q={name:"",width:100,height:100,fillColor:"transparent",fontColor:y.DZ,lineColor:y.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(v=y.zB[0])||void 0===v?void 0:v.id},K={width:100,height:100,name:"Text",fontColor:y.oz,lineColor:y.DZ,fontSize:60,strokeWidth:1,showAnimation:!0,animationClass:null===(b=y.zB[0])||void 0===b?void 0:b.id,fontFamily:"Arial"},Q={width:100,height:50,strokeWidth:1,fillColor:y.DZ,showAnimation:!0,animationClass:null===(L=y.zB[0])||void 0===L?void 0:L.id},ii={width:100,height:50,strokeWidth:1,fillColor:y.DZ,showAnimation:!0,animationClass:null===(z=y.zB[0])||void 0===z?void 0:z.id},ai={name:"",width:200,height:100,fillColor:"transparent",fontColor:y.DZ,lineColor:y.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(k=y.zB[0])||void 0===k?void 0:k.id,borderRadius:5},ei={name:"",width:75,height:100,fillColor:"transparent",fontSize:12,fontColor:y.DZ,lineColor:y.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(S=y.zB[0])||void 0===S?void 0:S.id},ti={name:"",width:100,height:50,fillColor:y.DZ,lineColor:y.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(A=y.zB[0])||void 0===A?void 0:A.id,flipXaxis:!1,flipYaxis:!1},oi={fontSize:50,emoji:"\ud83d\ude00",showAnimation:!0,animationClass:null===(B=y.zB[0])||void 0===B?void 0:B.id},ni={name:"",height:50,width:100,fillColor:y.DZ,lineColor:y.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(D=y.zB[0])||void 0===D?void 0:D.id}}}]);