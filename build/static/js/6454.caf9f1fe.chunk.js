"use strict";(self.webpackChunkledgerely_com=self.webpackChunkledgerely_com||[]).push([[6454],{6454:(i,a,e)=>{e.r(a),e.d(a,{default:()=>l});e(9950);var t=e(8927),n=e(4414);const o=i=>{let{id:a,width:e,height:t,fillColor:o,showAnimation:l,animationClass:d,strokeWidth:m}=i;return(0,n.jsxs)("svg",{width:e,height:t,viewBox:`0 0 ${e} ${t}`,className:`${l?d:""} shape`,children:[(0,n.jsx)("defs",{children:(0,n.jsx)("marker",{id:`${a}-1`,className:"shape",markerUnits:"strokeWidth",markerWidth:e,markerHeight:t,viewBox:`0 0 ${e} ${t}`,refX:"6",refY:"6",orient:"auto",children:(0,n.jsx)("path",{d:"M2,2 L10,6 L2,10 L6,6 L2,2",className:"shape",fill:o})})}),(0,n.jsx)("line",{x1:0,x2:e-.4*t,y1:t/2,y2:t/2,stroke:o,strokeWidth:m,markerEnd:`url(#${a}-1)`,className:"shape"})]})};o.defaultProps=t.dP;const l=o},2016:(i,a,e)=>{e.d(a,{DZ:()=>n,Pb:()=>s,XD:()=>m,YL:()=>l,e_:()=>r,oz:()=>o,zB:()=>d});var t=e(4761);const n="#c2d82e",o="#000000",l=t.select("body").append("div").attr("class","tooltip").attr("role","tooltip").style("position","absolute").style("background","#222222").style("border-radius","5px").style("color","#ffffff"),d=[{id:"animate__animated animate__bounce",value:"Bounce"},{id:"animate__animated animate__flash",value:"Flash"},{id:"animate__animated animate__pulse",value:"Pulse"},{id:"animate__animated animate__rubberBand",value:"Rubberband"},{id:"animate__animated animate__shakeX",value:"Shake horizontal"},{id:"animate__animated animate__shakeY",value:"Shake vertical"},{id:"animate__animated animate__headShake",value:"Headshake"},{id:"animate__animated animate__swing",value:"Swing"},{id:"animate__animated animate__tada",value:"Tada"},{id:"animate__animated animate__wobble",value:"Wobble"},{id:"animate__animated animate__jello",value:"Jello"},{id:"animate__animated animate__heartBeat",value:"Heart beat"},{id:"animate__animated animate__backInDown",value:"Back in down"},{id:"animate__animated animate__backInLeft",value:"Back in left"},{id:"animate__animated animate__backInRight",value:"Back in right"},{id:"animate__animated animate__backInUp",value:"Back in up"},{id:"animate__animated animate__bounceIn",value:"Bounce in"},{id:"animate__animated animate__bounceInDown",value:"Bounce in down"},{id:"animate__animated animate__bounceInLeft",value:"Bounce in left"},{id:"animate__animated animate__bounceInRight",value:"Bounce in right"},{id:"animate__animated animate__bounceInUp",value:"Bounce in up"},{id:"animate__animated animate__fadeIn",value:"Fade in"},{id:"animate__animated animate__fadeInDown",value:"Fade in down"},{id:"animate__animated animate__fadeInDownBig",value:"Fade in down big"},{id:"animate__animated animate__fadeInLeft",value:"Fade in left"},{id:"animate__animated animate__fadeInLeftBig",value:"Fadeinleftbig"},{id:"animate__animated animate__fadeInRight",value:"Fade in right"},{id:"animate__animated animate__fadeInRightBig",value:"Fade in right big"},{id:"animate__animated animate__fadeInUp",value:"Fade in up"},{id:"animate__animated animate__fadeInUpBig",value:"Fade in up big"},{id:"animate__animated animate__fadeInTopLeft",value:"Fade in top left"},{id:"animate__animated animate__fadeInTopRight",value:"Fade in top right"},{id:"animate__animated animate__fadeInBottomLeft",value:"Fade in bottom left"},{id:"animate__animated animate__fadeInBottomRight",value:"Fade in bottom right"},{id:"animate__animated animate__flip",value:"Flip"},{id:"animate__animated animate__flipInX",value:"Flipin horizontal"},{id:"animate__animated animate__flipInY",value:"Flipin vertical"},{id:"animate__animated animate__lightSpeedInRight",value:"Light speed in right"},{id:"animate__animated animate__lightSpeedInLeft",value:"Light speed in left"},{id:"animate__animated animate__rotateIn",value:"Rotate in"},{id:"animate__animated animate__rotateInDownLeft",value:"Rotate in down left"},{id:"animate__animated animate__rotateInDownRight",value:"Rotate in down right"},{id:"animate__animated animate__rotateInUpLeft",value:"Rotate in up left"},{id:"animate__animated animate__rotateInUpLeft",value:"Rotate in up left"},{id:"animate__animated animate__jackInTheBox",value:"Jack in the box"},{id:"animate__animated animate__rollIn",value:"Roll in"},{id:"animate__animated animate__zoomIn",value:"Zoom in"},{id:"animate__animated animate__zoomInDown",value:"Zoom in down"},{id:"animate__animated animate__zoomInLeft",value:"Zoom in left"},{id:"animate__animated animate__zoomInRight",value:"Zoom in right"},{id:"animate__animated animate__zoomInUp",value:"Zoom in up"},{id:"animate__animated animate__slideInDown",value:"Slide in down"},{id:"animate__animated animate__slideInLeft",value:"Slide in left"},{id:"animate__animated animate__slideInRight",value:"Slide in right"},{id:"animate__animated animate__slideInUp",value:"Slide in up"}],m={0:"CIRCULAR",1:"BAR",2:"DISTRIBUTION",3:"CORRELATION",4:"SHAPES",5:"EMOJI"},s={minWidth:100,maxWidth:1e3,minHeight:100,maxHeight:1e3},r={chartLimit:Math.pow(2,5),sheetLimit:Math.pow(2,4)}},8927:(i,a,e)=>{e.d(a,{$C:()=>F,Ar:()=>E,MH:()=>ai,Pe:()=>U,Sg:()=>H,U0:()=>ni,U2:()=>ti,VB:()=>M,Vl:()=>W,_1:()=>K,_t:()=>P,bR:()=>N,bn:()=>X,bz:()=>j,dP:()=>Q,e9:()=>oi,eJ:()=>G,iA:()=>V,kB:()=>y,n4:()=>O,n8:()=>q,oZ:()=>J,qm:()=>ii,tF:()=>$,tp:()=>T,uA:()=>Y,yZ:()=>ei});var t,n,o,l,d,m,s,r,h,_,u,f,w,g,C,v,x,p,c,b,L,k,z,B,A,D,Z,S=e(2016),I=e(910),R=e(4761);const T={name:"Diverging chart",width:600,height:300,barHeight:20,marginTop:30,marginRight:60,marginBottom:10,marginLeft:60,metric:"relative",fillColor:S.DZ,fontColor:"currentColor",lineColor:"currentColor",fontSize:14,data:I.Xu,showAnimation:!0,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",showXaxis:!0,showYaxis:!0,yTicks:6,padding:.1,animationClass:null===(t=S.zB[0])||void 0===t?void 0:t.id,onClick:()=>{}},y={name:"Pannable chart",width:700,height:300,marginTop:10,marginRight:20,marginBottom:40,marginLeft:50,fillColor:S.DZ,fontColor:S.DZ,lineColor:"currentColor",yAxisLabel:"y-axis",data:I.yJ,showYaxisLine:!0,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,yTicks:6,showAnimation:!0,animationClass:null===(n=S.zB[0])||void 0===n?void 0:n.id,onClick:()=>{}},X={name:"Donut chart",width:350,height:350,outerRadius:100,innerRadius:70,data:[12,23,34,45,56].map(((i,a)=>({label:"Sample "+(a+1),value:i}))),fillColor:[S.DZ,S.oz],fontSize:12,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontColor:"currentColor",showAnimation:!0,showLegend:!0,showXaxisLabel:!0,xAxisLabel:"Sample",animationClass:null===(o=S.zB[0])||void 0===o?void 0:o.id,onClick:()=>{}},Y={name:"Horizontal bar chart",width:600,barHeight:20,data:new Array(10).fill("_").map(((i,a)=>({label:`C${a+1}`,value:Number((100*Math.random()).toFixed(2))}))),marginTop:30,marginRight:50,marginBottom:10,marginLeft:60,sortClause:"",padding:.05,style:{},fillColor:S.DZ,fontColor:"currentColor",lineColor:S.DZ,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontSize:12,showAnimation:!0,animationClass:null===(l=S.zB[0])||void 0===l?void 0:l.id,onClick:()=>{}},F={name:"Pie chart",width:250,height:250,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fillColor:[S.DZ,S.oz],fontColor:"currentColor",data:[{label:"<5",value:45e3},{label:"5-9",value:3e4},{label:"10-14",value:4e4},{label:"15-19",value:5e4},{label:"20-24",value:6e4},{label:"25-29",value:7e4},{label:"30-34",value:8e4}],fontSize:12,showXaxisLabel:!0,showYaxisLabel:!0,sortClause:"",lineColor:"#555",showAnimation:!0,animationClass:null===(d=S.zB[0])||void 0===d?void 0:d.id,className:"",onClick:()=>{}},W={name:"Stacked vertical bar chart",width:500,height:200,marginTop:10,marginRight:10,marginBottom:20,marginLeft:80,fillColor:[S.DZ,S.oz],fontColor:"currentColor",lineColor:"currentColor",showTooltip:!0,padding:.01,yTicks:6,showAnimation:!0,animationClass:null===(m=S.zB[0])||void 0===m?void 0:m.id,sortClause:"",data:I.jU.filter((i=>["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL"].includes(i.label))),showYaxis:!0,showXaxis:!0,showXaxisLabel:!0,showXaxisLine:!0,showYaxisLine:!0,showYaxisLabel:!0,fontSize:12,onClick:()=>{}},P={name:"Vertical bar chart",width:700,height:200,marginTop:20,marginRight:10,marginBottom:40,marginLeft:60,fillColor:S.DZ,fontColor:S.DZ,lineColor:"currentColor",yAxisLabel:"y-axis",xAxisLabel:"x-axis",padding:.01,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,data:new Array(20).fill("_").map(((i,a)=>({label:`C${a+1}`,value:Number((100*Math.random()).toFixed(2))}))),showYaxisLine:!0,showXaxis:!0,showXaxisLabel:!0,showYaxis:!0,showYaxisLabel:!0,showAnimation:!0,showLegend:!0,animationClass:null===(s=S.zB[0])||void 0===s?void 0:s.id,sortClause:"",xAxisTicksOrientation:"horizontal",fontSize:12,yTicks:6,onClick:()=>{}},U={name:"Zoomable circle packing chart",width:600,height:600,fillColor:[S.DZ,S.oz],padding:3,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontSize:10,showAnimation:!0,animationClass:null===(r=S.zB[0])||void 0===r?void 0:r.id,data:I.xP,onClick:()=>{}},H={name:"Scatter plot chart",width:500,height:300,marginTop:60,marginRight:60,marginBottom:60,marginLeft:70,data:I.MS,fillColor:R.schemeSet1,fontColor:S.DZ,lineColor:S.DZ,xTicks:40,yTicks:40,markerSize:7,fontSize:14,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",yAxisLabel:"Y - Axis",xAxisLabel:"X - Axis",showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,animationClass:null===(h=S.zB[0])||void 0===h?void 0:h.id,showAnimation:!0,showXaxis:!0,showYaxis:!0,onClick:()=>{}},N={name:"Density chart",width:300,height:200,data:I.lM,marginTop:30,marginRight:30,marginBottom:60,marginLeft:30,fillColor:S.DZ,fontColor:S.DZ,lineColor:S.DZ,showXaxisLabel:!0,fontSize:12,xAxisLabel:"X - Axis",showXaxis:!0,animationClass:null===(_=S.zB[0])||void 0===_?void 0:_.id,showAnimation:!0,onClick:()=>{}},$={name:"Box plot chart",width:300,height:200,data:I.RT,marginTop:30,marginRight:30,marginBottom:60,marginLeft:60,markerSize:1,fillColor:S.DZ,fontColor:S.DZ,lineColor:S.DZ,padding:.7,fontSize:12,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,xAxisLabel:"x-axis",yAxisLabel:"y-axis",animationClass:null===(u=S.zB[0])||void 0===u?void 0:u.id,showAnimation:!0,xAxisTicksOrientation:"horizontal",onClick:()=>{}},j={name:"Line chart",width:300,height:200,data:I.eo,marginTop:30,marginRight:30,marginBottom:50,marginLeft:60,markerSize:1,fontSize:12,fillColor:S.DZ,fontColor:S.DZ,lineColor:S.DZ,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,xAxisLabel:"x-axis",yAxisLabel:"y-axis",showAnimation:!0,xAxisTicksOrientation:"horizontal",animationClass:null===(f=S.zB[0])||void 0===f?void 0:f.id,onClick:()=>{}},M={name:"Voronoi chart",width:300,height:200,data:I.Lu,markerSize:7,strokeWidth:2,opacity:.3,lineColor:S.oz,fillColor:S.DZ,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",animationClass:null===(w=S.zB[0])||void 0===w?void 0:w.id,showAnimation:!0,className:"",onClick:()=>{}},O={name:"Circular bar chart",width:400,height:400,data:I.r0,marginTop:30,marginRight:0,marginBottom:30,marginLeft:0,fontSize:12,fillColor:S.DZ,fontColor:S.DZ,lineColor:S.DZ,innerRadius:10,padding:.2,opacity:.7,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",sortClause:"",showAnimation:!0,showLegend:!0,animationClass:null===(g=S.zB[0])||void 0===g?void 0:g.id,onClick:()=>{}},E={name:"Word cloud chart",width:400,height:300,data:I.YA,fontColor:new Array(25).fill(S.DZ),padding:1,showAnimation:!0,animationClass:null===(C=S.zB[0])||void 0===C?void 0:C.id,opacity:1},J={name:"",width:100,height:100,fillColor:"transparent",fontColor:S.DZ,lineColor:S.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(v=S.zB[0])||void 0===v?void 0:v.id},V={name:"",width:100,height:100,fillColor:"transparent",fontColor:S.DZ,lineColor:S.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(x=S.zB[0])||void 0===x?void 0:x.id},q={name:"",width:100,height:100,fillColor:"transparent",fontColor:S.DZ,lineColor:S.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(p=S.zB[0])||void 0===p?void 0:p.id,borderRadius:5},K={name:"",width:100,height:100,fillColor:"transparent",fontColor:S.DZ,lineColor:S.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(c=S.zB[0])||void 0===c?void 0:c.id},G={width:100,height:100,name:"Text",fontColor:S.oz,lineColor:S.DZ,fontSize:60,strokeWidth:1,showAnimation:!0,animationClass:null===(b=S.zB[0])||void 0===b?void 0:b.id,fontFamily:"Arial"},Q={width:100,height:50,strokeWidth:1,fillColor:S.DZ,showAnimation:!0,animationClass:null===(L=S.zB[0])||void 0===L?void 0:L.id},ii={width:100,height:50,strokeWidth:1,fillColor:S.DZ,showAnimation:!0,animationClass:null===(k=S.zB[0])||void 0===k?void 0:k.id},ai={name:"",width:200,height:100,fillColor:"transparent",fontColor:S.DZ,lineColor:S.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(z=S.zB[0])||void 0===z?void 0:z.id,borderRadius:5},ei={name:"",width:75,height:100,fillColor:"transparent",fontSize:12,fontColor:S.DZ,lineColor:S.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(B=S.zB[0])||void 0===B?void 0:B.id},ti={name:"",width:100,height:50,fillColor:S.DZ,lineColor:S.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(A=S.zB[0])||void 0===A?void 0:A.id,flipXaxis:!1,flipYaxis:!1},ni={fontSize:50,emoji:"\ud83d\ude00",showAnimation:!0,animationClass:null===(D=S.zB[0])||void 0===D?void 0:D.id},oi={name:"",height:50,width:100,fillColor:S.DZ,lineColor:S.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(Z=S.zB[0])||void 0===Z?void 0:Z.id}}}]);