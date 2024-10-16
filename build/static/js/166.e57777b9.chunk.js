"use strict";(self.webpackChunkledgerely_com=self.webpackChunkledgerely_com||[]).push([[166],{166:(i,a,e)=>{e.r(a),e.d(a,{VoronoiChart:()=>m,default:()=>s});var o=e(9950),t=e(4761),n=e(8927),l=e(2016),d=e(4414);const m=i=>{let{width:a,height:e,data:n,markerSize:m,lineColor:s,fillColor:r,strokeWidth:h,showTooltip:_,tooltipPrefix:u,tooltipSuffix:f,className:g,showAnimation:C,animationClass:w,opacity:v}=i;const p=(0,o.useMemo)((()=>t.scaleLinear().domain([0,t.max(n,(i=>i.x))]).range([0,a])),[a,n]),x=(0,o.useMemo)((()=>t.scaleLinear().domain([0,t.max(n,(i=>i.y))]).range([0,e])),[e,n]),c=(0,o.useMemo)((()=>{const i=n.map((i=>[p(i.x),x(i.y)]));return t.Delaunay.from(i)}),[p,x,n]),[b,L]=(0,o.useState)(null),z=(0,o.useMemo)((()=>c.voronoi([0,0,a,e])),[c,a,e]),k=n.map(((i,a)=>{const e=z.renderCell(a);return(0,d.jsx)("path",{d:e,stroke:s,strokeWidth:h,fill:"transparent",opacity:v,onMouseOver:()=>{L(a)}},a)})),B=n.map(((i,a)=>(0,d.jsxs)(o.Fragment,{children:[(0,d.jsx)("circle",{cx:p(i.x),cy:x(i.y),fill:r,r:m,className:`${g} ${C?w:""}`}),b===a&&(0,d.jsx)("circle",{cx:p(i.x),cy:x(i.y),r:m,fill:"transparent",stroke:"red",style:{zIndex:1},strokeWidth:3,onMouseOver:a=>{_&&(l.YL.style("padding","5px"),l.YL.style("opacity",.9),l.YL.html(`${u} ${i.label} ${f}`).style("left",a.pageX+5+"px").style("top",a.pageY-30+"px"))},onMouseLeave:()=>{l.YL.style("padding",0),l.YL.style("opacity",0)}})]},a)));return(0,d.jsxs)("svg",{width:a,height:e,children:[k,B]})};m.defaultProps=n.VB;const s=m},2016:(i,a,e)=>{e.d(a,{DZ:()=>t,Pb:()=>s,XD:()=>m,YL:()=>l,e_:()=>r,oz:()=>n,zB:()=>d});var o=e(4761);const t="#c2d82e",n="#000000",l=o.select("body").append("div").attr("class","tooltip").attr("role","tooltip").style("position","absolute").style("background","#222222").style("border-radius","5px").style("color","#ffffff"),d=[{id:"animate__animated animate__bounce",value:"Bounce"},{id:"animate__animated animate__flash",value:"Flash"},{id:"animate__animated animate__pulse",value:"Pulse"},{id:"animate__animated animate__rubberBand",value:"Rubberband"},{id:"animate__animated animate__shakeX",value:"Shake horizontal"},{id:"animate__animated animate__shakeY",value:"Shake vertical"},{id:"animate__animated animate__headShake",value:"Headshake"},{id:"animate__animated animate__swing",value:"Swing"},{id:"animate__animated animate__tada",value:"Tada"},{id:"animate__animated animate__wobble",value:"Wobble"},{id:"animate__animated animate__jello",value:"Jello"},{id:"animate__animated animate__heartBeat",value:"Heart beat"},{id:"animate__animated animate__backInDown",value:"Back in down"},{id:"animate__animated animate__backInLeft",value:"Back in left"},{id:"animate__animated animate__backInRight",value:"Back in right"},{id:"animate__animated animate__backInUp",value:"Back in up"},{id:"animate__animated animate__bounceIn",value:"Bounce in"},{id:"animate__animated animate__bounceInDown",value:"Bounce in down"},{id:"animate__animated animate__bounceInLeft",value:"Bounce in left"},{id:"animate__animated animate__bounceInRight",value:"Bounce in right"},{id:"animate__animated animate__bounceInUp",value:"Bounce in up"},{id:"animate__animated animate__fadeIn",value:"Fade in"},{id:"animate__animated animate__fadeInDown",value:"Fade in down"},{id:"animate__animated animate__fadeInDownBig",value:"Fade in down big"},{id:"animate__animated animate__fadeInLeft",value:"Fade in left"},{id:"animate__animated animate__fadeInLeftBig",value:"Fadeinleftbig"},{id:"animate__animated animate__fadeInRight",value:"Fade in right"},{id:"animate__animated animate__fadeInRightBig",value:"Fade in right big"},{id:"animate__animated animate__fadeInUp",value:"Fade in up"},{id:"animate__animated animate__fadeInUpBig",value:"Fade in up big"},{id:"animate__animated animate__fadeInTopLeft",value:"Fade in top left"},{id:"animate__animated animate__fadeInTopRight",value:"Fade in top right"},{id:"animate__animated animate__fadeInBottomLeft",value:"Fade in bottom left"},{id:"animate__animated animate__fadeInBottomRight",value:"Fade in bottom right"},{id:"animate__animated animate__flip",value:"Flip"},{id:"animate__animated animate__flipInX",value:"Flipin horizontal"},{id:"animate__animated animate__flipInY",value:"Flipin vertical"},{id:"animate__animated animate__lightSpeedInRight",value:"Light speed in right"},{id:"animate__animated animate__lightSpeedInLeft",value:"Light speed in left"},{id:"animate__animated animate__rotateIn",value:"Rotate in"},{id:"animate__animated animate__rotateInDownLeft",value:"Rotate in down left"},{id:"animate__animated animate__rotateInDownRight",value:"Rotate in down right"},{id:"animate__animated animate__rotateInUpLeft",value:"Rotate in up left"},{id:"animate__animated animate__rotateInUpLeft",value:"Rotate in up left"},{id:"animate__animated animate__jackInTheBox",value:"Jack in the box"},{id:"animate__animated animate__rollIn",value:"Roll in"},{id:"animate__animated animate__zoomIn",value:"Zoom in"},{id:"animate__animated animate__zoomInDown",value:"Zoom in down"},{id:"animate__animated animate__zoomInLeft",value:"Zoom in left"},{id:"animate__animated animate__zoomInRight",value:"Zoom in right"},{id:"animate__animated animate__zoomInUp",value:"Zoom in up"},{id:"animate__animated animate__slideInDown",value:"Slide in down"},{id:"animate__animated animate__slideInLeft",value:"Slide in left"},{id:"animate__animated animate__slideInRight",value:"Slide in right"},{id:"animate__animated animate__slideInUp",value:"Slide in up"}],m={0:"CIRCULAR",1:"BAR",2:"DISTRIBUTION",3:"CORRELATION",4:"SHAPES",5:"EMOJI"},s={minWidth:100,maxWidth:1e3,minHeight:100,maxHeight:1e3},r={chartLimit:Math.pow(2,5),sheetLimit:Math.pow(2,4)}},8927:(i,a,e)=>{e.d(a,{$C:()=>F,Ar:()=>V,MH:()=>ai,Pe:()=>M,Sg:()=>U,U0:()=>ti,U2:()=>oi,VB:()=>N,Vl:()=>P,_1:()=>K,_t:()=>W,bR:()=>O,bn:()=>Y,bz:()=>H,dP:()=>Q,e9:()=>ni,eJ:()=>G,iA:()=>E,kB:()=>T,n4:()=>$,n8:()=>q,oZ:()=>J,qm:()=>ii,tF:()=>j,tp:()=>R,uA:()=>X,yZ:()=>ei});var o,t,n,l,d,m,s,r,h,_,u,f,g,C,w,v,p,x,c,b,L,z,k,B,D,A,S,Z=e(2016),y=e(910),I=e(4761);const R={name:"Diverging chart",width:600,height:300,barHeight:20,marginTop:30,marginRight:60,marginBottom:10,marginLeft:60,metric:"relative",fillColor:Z.DZ,fontColor:"currentColor",lineColor:"currentColor",fontSize:14,data:y.Xu,showAnimation:!0,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",showXaxis:!0,showYaxis:!0,yTicks:6,padding:.1,animationClass:null===(o=Z.zB[0])||void 0===o?void 0:o.id,onClick:()=>{}},T={name:"Pannable chart",width:700,height:300,marginTop:10,marginRight:20,marginBottom:40,marginLeft:50,fillColor:Z.DZ,fontColor:Z.DZ,lineColor:"currentColor",yAxisLabel:"y-axis",data:y.yJ,showYaxisLine:!0,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,yTicks:6,showAnimation:!0,animationClass:null===(t=Z.zB[0])||void 0===t?void 0:t.id,onClick:()=>{}},Y={name:"Donut chart",width:350,height:350,outerRadius:100,innerRadius:70,data:[12,23,34,45,56].map(((i,a)=>({label:"Sample "+(a+1),value:i}))),fillColor:[Z.DZ,Z.oz],fontSize:12,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontColor:"currentColor",showAnimation:!0,showLegend:!0,showXaxisLabel:!0,xAxisLabel:"Sample",animationClass:null===(n=Z.zB[0])||void 0===n?void 0:n.id,onClick:()=>{}},X={name:"Horizontal bar chart",width:600,barHeight:20,data:new Array(10).fill("_").map(((i,a)=>({label:`C${a+1}`,value:Number((100*Math.random()).toFixed(2))}))),marginTop:30,marginRight:50,marginBottom:10,marginLeft:60,sortClause:"",padding:.05,style:{},fillColor:Z.DZ,fontColor:"currentColor",lineColor:Z.DZ,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontSize:12,showAnimation:!0,animationClass:null===(l=Z.zB[0])||void 0===l?void 0:l.id,onClick:()=>{}},F={name:"Pie chart",width:250,height:250,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fillColor:[Z.DZ,Z.oz],fontColor:"currentColor",data:[{label:"<5",value:45e3},{label:"5-9",value:3e4},{label:"10-14",value:4e4},{label:"15-19",value:5e4},{label:"20-24",value:6e4},{label:"25-29",value:7e4},{label:"30-34",value:8e4}],fontSize:12,showXaxisLabel:!0,showYaxisLabel:!0,sortClause:"",lineColor:"#555",showAnimation:!0,animationClass:null===(d=Z.zB[0])||void 0===d?void 0:d.id,className:"",onClick:()=>{}},P={name:"Stacked vertical bar chart",width:500,height:200,marginTop:10,marginRight:10,marginBottom:20,marginLeft:80,fillColor:[Z.DZ,Z.oz],fontColor:"currentColor",lineColor:"currentColor",showTooltip:!0,padding:.01,yTicks:6,showAnimation:!0,animationClass:null===(m=Z.zB[0])||void 0===m?void 0:m.id,sortClause:"",data:y.jU.filter((i=>["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL"].includes(i.label))),showYaxis:!0,showXaxis:!0,showXaxisLabel:!0,showXaxisLine:!0,showYaxisLine:!0,showYaxisLabel:!0,fontSize:12,onClick:()=>{}},W={name:"Vertical bar chart",width:700,height:200,marginTop:20,marginRight:10,marginBottom:40,marginLeft:60,fillColor:Z.DZ,fontColor:Z.DZ,lineColor:"currentColor",yAxisLabel:"y-axis",xAxisLabel:"x-axis",padding:.01,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,data:new Array(20).fill("_").map(((i,a)=>({label:`C${a+1}`,value:Number((100*Math.random()).toFixed(2))}))),showYaxisLine:!0,showXaxis:!0,showXaxisLabel:!0,showYaxis:!0,showYaxisLabel:!0,showAnimation:!0,showLegend:!0,animationClass:null===(s=Z.zB[0])||void 0===s?void 0:s.id,sortClause:"",xAxisTicksOrientation:"horizontal",fontSize:12,yTicks:6,onClick:()=>{}},M={name:"Zoomable circle packing chart",width:600,height:600,fillColor:[Z.DZ,Z.oz],padding:3,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontSize:10,showAnimation:!0,animationClass:null===(r=Z.zB[0])||void 0===r?void 0:r.id,data:y.xP,onClick:()=>{}},U={name:"Scatter plot chart",width:500,height:300,marginTop:60,marginRight:60,marginBottom:60,marginLeft:70,data:y.MS,fillColor:I.schemeSet1,fontColor:Z.DZ,lineColor:Z.DZ,xTicks:40,yTicks:40,markerSize:7,fontSize:14,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",yAxisLabel:"Y - Axis",xAxisLabel:"X - Axis",showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,animationClass:null===(h=Z.zB[0])||void 0===h?void 0:h.id,showAnimation:!0,showXaxis:!0,showYaxis:!0,onClick:()=>{}},O={name:"Density chart",width:300,height:200,data:y.lM,marginTop:30,marginRight:30,marginBottom:60,marginLeft:30,fillColor:Z.DZ,fontColor:Z.DZ,lineColor:Z.DZ,showXaxisLabel:!0,fontSize:12,xAxisLabel:"X - Axis",showXaxis:!0,animationClass:null===(_=Z.zB[0])||void 0===_?void 0:_.id,showAnimation:!0,onClick:()=>{}},j={name:"Box plot chart",width:300,height:200,data:y.RT,marginTop:30,marginRight:30,marginBottom:60,marginLeft:60,markerSize:1,fillColor:Z.DZ,fontColor:Z.DZ,lineColor:Z.DZ,padding:.7,fontSize:12,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,xAxisLabel:"x-axis",yAxisLabel:"y-axis",animationClass:null===(u=Z.zB[0])||void 0===u?void 0:u.id,showAnimation:!0,xAxisTicksOrientation:"horizontal",onClick:()=>{}},H={name:"Line chart",width:300,height:200,data:y.eo,marginTop:30,marginRight:30,marginBottom:50,marginLeft:60,markerSize:1,fontSize:12,fillColor:Z.DZ,fontColor:Z.DZ,lineColor:Z.DZ,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,xAxisLabel:"x-axis",yAxisLabel:"y-axis",showAnimation:!0,xAxisTicksOrientation:"horizontal",animationClass:null===(f=Z.zB[0])||void 0===f?void 0:f.id,onClick:()=>{}},N={name:"Voronoi chart",width:300,height:200,data:y.Lu,markerSize:7,strokeWidth:2,opacity:.3,lineColor:Z.oz,fillColor:Z.DZ,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",animationClass:null===(g=Z.zB[0])||void 0===g?void 0:g.id,showAnimation:!0,className:"",onClick:()=>{}},$={name:"Circular bar chart",width:400,height:400,data:y.r0,marginTop:30,marginRight:0,marginBottom:30,marginLeft:0,fontSize:12,fillColor:Z.DZ,fontColor:Z.DZ,lineColor:Z.DZ,innerRadius:10,padding:.2,opacity:.7,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",sortClause:"",showAnimation:!0,showLegend:!0,animationClass:null===(C=Z.zB[0])||void 0===C?void 0:C.id,onClick:()=>{}},V={name:"Word cloud chart",width:400,height:300,data:y.YA,fontColor:new Array(25).fill(Z.DZ),padding:1,showAnimation:!0,animationClass:null===(w=Z.zB[0])||void 0===w?void 0:w.id,opacity:1},J={name:"",width:100,height:100,fillColor:"transparent",fontColor:Z.DZ,lineColor:Z.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(v=Z.zB[0])||void 0===v?void 0:v.id},E={name:"",width:100,height:100,fillColor:"transparent",fontColor:Z.DZ,lineColor:Z.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(p=Z.zB[0])||void 0===p?void 0:p.id},q={name:"",width:100,height:100,fillColor:"transparent",fontColor:Z.DZ,lineColor:Z.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(x=Z.zB[0])||void 0===x?void 0:x.id,borderRadius:5},K={name:"",width:100,height:100,fillColor:"transparent",fontColor:Z.DZ,lineColor:Z.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(c=Z.zB[0])||void 0===c?void 0:c.id},G={width:100,height:100,name:"Text",fontColor:Z.oz,lineColor:Z.DZ,fontSize:60,strokeWidth:1,showAnimation:!0,animationClass:null===(b=Z.zB[0])||void 0===b?void 0:b.id,fontFamily:"Arial"},Q={width:100,height:50,strokeWidth:1,fillColor:Z.DZ,showAnimation:!0,animationClass:null===(L=Z.zB[0])||void 0===L?void 0:L.id},ii={width:100,height:50,strokeWidth:1,fillColor:Z.DZ,showAnimation:!0,animationClass:null===(z=Z.zB[0])||void 0===z?void 0:z.id},ai={name:"",width:200,height:100,fillColor:"transparent",fontColor:Z.DZ,lineColor:Z.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(k=Z.zB[0])||void 0===k?void 0:k.id,borderRadius:5},ei={name:"",width:75,height:100,fillColor:"transparent",fontSize:12,fontColor:Z.DZ,lineColor:Z.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(B=Z.zB[0])||void 0===B?void 0:B.id},oi={name:"",width:100,height:50,fillColor:Z.DZ,lineColor:Z.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(D=Z.zB[0])||void 0===D?void 0:D.id,flipXaxis:!1,flipYaxis:!1},ti={fontSize:50,emoji:"\ud83d\ude00",showAnimation:!0,animationClass:null===(A=Z.zB[0])||void 0===A?void 0:A.id},ni={name:"",height:50,width:100,fillColor:Z.DZ,lineColor:Z.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(S=Z.zB[0])||void 0===S?void 0:S.id}}}]);