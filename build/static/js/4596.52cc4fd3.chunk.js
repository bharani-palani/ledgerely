"use strict";(self.webpackChunkledgerely_com=self.webpackChunkledgerely_com||[]).push([[4596],{4596:(a,t,i)=>{i.r(t),i.d(t,{default:()=>s});var n=i(9950),e=i(2016),o=i(4761),l=i(8927),r=i(4414);const d=a=>{const t=(0,n.useRef)(null),{width:i,height:l,outerRadius:d,innerRadius:s,data:m,fillColor:h,style:u,fontSize:g,showTooltip:_,tooltipPrefix:f,tooltipSuffix:c,onClick:v,fontColor:p,showAnimation:w,animationClass:x,showLegend:C,showXaxisLabel:A,xAxisLabel:b}=a;return(0,n.useEffect)((()=>{const a=24;let n,r,u=[],L=[],z=[];const I=o.pie().value((function(a){return a.value})),k=o.scaleLinear().domain([0,m.length]).range(h).interpolate(o.interpolateHcl),D=o.arc().startAngle((function(a){return a.startAngle})).endAngle((function(a){return a.endAngle})).innerRadius(s).outerRadius(d),B=o.select(t.current).attr("width",i).attr("height",l);B.selectAll("g").remove();const S=B.append("svg:g").attr("class","arc").attr("transform","translate("+i/2+","+l/2+")"),Z=B.append("svg:g").attr("class","labelGroup").attr("transform","translate("+i/2+","+l/2+")"),y=B.append("svg:g").attr("class","centerGroup").attr("transform","translate("+i/2+","+l/2+")");function R(a,t){let i,n;L[t]?(i=L[t].startAngle,n=L[t].endAngle):!L[t]&&L[t-1]?(i=L[t-1].endAngle,n=L[t-1].endAngle):!L[t-1]&&L.length>0?(i=L[L.length-1].endAngle,n=L[L.length-1].endAngle):(i=0,n=0);const e=o.interpolate({startAngle:i,endAngle:n},{startAngle:a.startAngle,endAngle:a.endAngle});return function(a){const t=e(a);return D(t)}}function T(a){const t=2*Math.PI,i=2*Math.PI,n=o.interpolate({startAngle:a.startAngle,endAngle:a.endAngle},{startAngle:t,endAngle:i});return function(a){const t=n(a);return D(t)}}function P(t,i){let n;n=L[i]?(L[i].startAngle+L[i].endAngle-Math.PI)/2:!L[i]&&L[i-1]?(L[i-1].startAngle+L[i-1].endAngle-Math.PI)/2:!L[i-1]&&L.length>0?(L[L.length-1].startAngle+L[L.length-1].endAngle-Math.PI)/2:0;const e=(t.startAngle+t.endAngle-Math.PI)/2,l=o.interpolateNumber(n,e);return function(t){const i=l(t);return"translate("+Math.cos(i)*(d+a)+","+Math.sin(i)*(d+a)+")"}}A&&y.append("text").html(b).attr("fill",p).attr("font-size",g).attr("text-anchor","middle"),function(t){L=z,u=I(t);let i=0;z=u.filter((function(a,n){return a.name=t[n].label,a.value=t[n].value,i+=a.value,a.value>0}));const o=S.selectAll("path").data(z);if(o.enter().append("svg:path").on("click",((a,t)=>{v(a,t)})).on("mousemove",((a,t)=>{_&&(e.YL.style("padding","5px"),e.YL.style("opacity",1),e.YL.html(`<div>${f} ${t.name}</div><div>${t.value.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</div><div>${(t.value/i*100).toFixed(2)}%</div><div>${c}</div>`).style("left",a.pageX+15+"px").style("top",a.pageY-30+"px"))})).on("mouseout",(()=>{e.YL.style("padding",0),e.YL.style("opacity",0)})).attr("fill",(function(a,t){return k(t)})),o.enter().selectAll("path").attr("class",w?x:"").transition().duration(0).attrTween("d",R),o.exit().transition().duration(0).attrTween("d",T).remove(),C){const t=Z.selectAll("line").data(z);t.enter().append("svg:line").attr("x1",0).attr("x2",0).attr("y1",-d-3).attr("y2",-d-15).attr("stroke","gray").attr("transform",(function(a){return"rotate("+(a.startAngle+a.endAngle)/2*(180/Math.PI)+")"})),t.transition().duration(0).attr("transform",(function(a){return"rotate("+(a.startAngle+a.endAngle)/2*(180/Math.PI)+")"})),t.exit().remove(),n=Z.selectAll("text.value").data(z).attr("dy",(function(a){return(a.startAngle+a.endAngle)/2>Math.PI/2&&(a.startAngle+a.endAngle)/2<1.5*Math.PI?5:-7})).attr("text-anchor",(function(a){return(a.startAngle+a.endAngle)/2<Math.PI?"beginning":"end"})).text((function(a){return(a.value/i*100).toFixed(1)+"%"})),n.enter().append("svg:text").attr("class","value").attr("fill","currentColor").attr("font-size",g).attr("transform",(function(t){return"translate("+Math.cos((t.startAngle+t.endAngle-Math.PI)/2)*(d+a)+","+Math.sin((t.startAngle+t.endAngle-Math.PI)/2)*(d+a)+")"})).attr("dy",(function(a){return(a.startAngle+a.endAngle)/2>Math.PI/2&&(a.startAngle+a.endAngle)/2<1.5*Math.PI?5:-7})).attr("text-anchor",(function(a){return(a.startAngle+a.endAngle)/2<Math.PI?"beginning":"end"})).attr("fill",p).text((function(a){return(a.value/i*100).toFixed(2)+"%"})),n.transition().duration(0).attrTween("transform",P),n.exit().remove(),r=Z.selectAll("text.units").data(z).attr("dy",(function(a){return(a.startAngle+a.endAngle)/2>Math.PI/2&&(a.startAngle+a.endAngle)/2<1.5*Math.PI?17:5})).attr("text-anchor",(function(a){return(a.startAngle+a.endAngle)/2<Math.PI?"beginning":"end"})).text((function(a){return a.name})),r.enter().append("svg:text").attr("class","units").attr("font-size",g).attr("transform",(function(t){return"translate("+Math.cos((t.startAngle+t.endAngle-Math.PI)/2)*(d+a)+","+Math.sin((t.startAngle+t.endAngle-Math.PI)/2)*(d+a)+")"})).attr("dy",(function(a){return(a.startAngle+a.endAngle)/2>Math.PI/2&&(a.startAngle+a.endAngle)/2<1.5*Math.PI?25:10})).attr("text-anchor",(function(a){return(a.startAngle+a.endAngle)/2<Math.PI?"beginning":"end"})).attr("fill",p).text((function(a){return a.name})),r.transition().duration(0).attrTween("transform",P),r.exit().remove()}}(m)}),[JSON.stringify(a)]),(0,r.jsx)("svg",{style:u,ref:t})};d.defaultProps=l.bn;const s=d},2016:(a,t,i)=>{i.d(t,{DZ:()=>e,Pb:()=>s,XD:()=>d,YL:()=>l,e_:()=>m,oz:()=>o,zB:()=>r});var n=i(4761);const e="#c2d82e",o="#000000",l=n.select("body").append("div").attr("class","tooltip").attr("role","tooltip").style("position","absolute").style("background","#222222").style("border-radius","5px").style("color","#ffffff"),r=[{id:"animate__animated animate__bounce",value:"Bounce"},{id:"animate__animated animate__flash",value:"Flash"},{id:"animate__animated animate__pulse",value:"Pulse"},{id:"animate__animated animate__rubberBand",value:"Rubberband"},{id:"animate__animated animate__shakeX",value:"Shake horizontal"},{id:"animate__animated animate__shakeY",value:"Shake vertical"},{id:"animate__animated animate__headShake",value:"Headshake"},{id:"animate__animated animate__swing",value:"Swing"},{id:"animate__animated animate__tada",value:"Tada"},{id:"animate__animated animate__wobble",value:"Wobble"},{id:"animate__animated animate__jello",value:"Jello"},{id:"animate__animated animate__heartBeat",value:"Heart beat"},{id:"animate__animated animate__backInDown",value:"Back in down"},{id:"animate__animated animate__backInLeft",value:"Back in left"},{id:"animate__animated animate__backInRight",value:"Back in right"},{id:"animate__animated animate__backInUp",value:"Back in up"},{id:"animate__animated animate__bounceIn",value:"Bounce in"},{id:"animate__animated animate__bounceInDown",value:"Bounce in down"},{id:"animate__animated animate__bounceInLeft",value:"Bounce in left"},{id:"animate__animated animate__bounceInRight",value:"Bounce in right"},{id:"animate__animated animate__bounceInUp",value:"Bounce in up"},{id:"animate__animated animate__fadeIn",value:"Fade in"},{id:"animate__animated animate__fadeInDown",value:"Fade in down"},{id:"animate__animated animate__fadeInDownBig",value:"Fade in down big"},{id:"animate__animated animate__fadeInLeft",value:"Fade in left"},{id:"animate__animated animate__fadeInLeftBig",value:"Fadeinleftbig"},{id:"animate__animated animate__fadeInRight",value:"Fade in right"},{id:"animate__animated animate__fadeInRightBig",value:"Fade in right big"},{id:"animate__animated animate__fadeInUp",value:"Fade in up"},{id:"animate__animated animate__fadeInUpBig",value:"Fade in up big"},{id:"animate__animated animate__fadeInTopLeft",value:"Fade in top left"},{id:"animate__animated animate__fadeInTopRight",value:"Fade in top right"},{id:"animate__animated animate__fadeInBottomLeft",value:"Fade in bottom left"},{id:"animate__animated animate__fadeInBottomRight",value:"Fade in bottom right"},{id:"animate__animated animate__flip",value:"Flip"},{id:"animate__animated animate__flipInX",value:"Flipin horizontal"},{id:"animate__animated animate__flipInY",value:"Flipin vertical"},{id:"animate__animated animate__lightSpeedInRight",value:"Light speed in right"},{id:"animate__animated animate__lightSpeedInLeft",value:"Light speed in left"},{id:"animate__animated animate__rotateIn",value:"Rotate in"},{id:"animate__animated animate__rotateInDownLeft",value:"Rotate in down left"},{id:"animate__animated animate__rotateInDownRight",value:"Rotate in down right"},{id:"animate__animated animate__rotateInUpLeft",value:"Rotate in up left"},{id:"animate__animated animate__rotateInUpLeft",value:"Rotate in up left"},{id:"animate__animated animate__jackInTheBox",value:"Jack in the box"},{id:"animate__animated animate__rollIn",value:"Roll in"},{id:"animate__animated animate__zoomIn",value:"Zoom in"},{id:"animate__animated animate__zoomInDown",value:"Zoom in down"},{id:"animate__animated animate__zoomInLeft",value:"Zoom in left"},{id:"animate__animated animate__zoomInRight",value:"Zoom in right"},{id:"animate__animated animate__zoomInUp",value:"Zoom in up"},{id:"animate__animated animate__slideInDown",value:"Slide in down"},{id:"animate__animated animate__slideInLeft",value:"Slide in left"},{id:"animate__animated animate__slideInRight",value:"Slide in right"},{id:"animate__animated animate__slideInUp",value:"Slide in up"}],d={0:"CIRCULAR",1:"BAR",2:"DISTRIBUTION",3:"CORRELATION",4:"SHAPES",5:"EMOJI"},s={minWidth:100,maxWidth:1e3,minHeight:100,maxHeight:1e3},m={chartLimit:Math.pow(2,5),sheetLimit:Math.pow(2,4)}},8927:(a,t,i)=>{i.d(t,{$C:()=>Y,Ar:()=>j,MH:()=>ta,Pe:()=>W,Sg:()=>U,U0:()=>ea,U2:()=>na,VB:()=>$,Vl:()=>X,_1:()=>q,_t:()=>F,bR:()=>H,bn:()=>P,bz:()=>N,dP:()=>Q,e9:()=>oa,eJ:()=>K,iA:()=>V,kB:()=>T,n4:()=>J,n8:()=>G,oZ:()=>E,qm:()=>aa,tF:()=>O,tp:()=>R,uA:()=>M,yZ:()=>ia});var n,e,o,l,r,d,s,m,h,u,g,_,f,c,v,p,w,x,C,A,b,L,z,I,k,D,B,S=i(2016),Z=i(910),y=i(4761);const R={name:"Diverging chart",width:600,height:300,barHeight:20,marginTop:30,marginRight:60,marginBottom:10,marginLeft:60,metric:"relative",fillColor:S.DZ,fontColor:"currentColor",lineColor:"currentColor",fontSize:14,data:Z.Xu,showAnimation:!0,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",showXaxis:!0,showYaxis:!0,yTicks:6,padding:.1,animationClass:null===(n=S.zB[0])||void 0===n?void 0:n.id,onClick:()=>{}},T={name:"Pannable chart",width:700,height:300,marginTop:10,marginRight:20,marginBottom:40,marginLeft:50,fillColor:S.DZ,fontColor:S.DZ,lineColor:"currentColor",yAxisLabel:"y-axis",data:Z.yJ,showYaxisLine:!0,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,yTicks:6,showAnimation:!0,animationClass:null===(e=S.zB[0])||void 0===e?void 0:e.id,onClick:()=>{}},P={name:"Donut chart",width:350,height:350,outerRadius:100,innerRadius:70,data:[12,23,34,45,56].map(((a,t)=>({label:"Sample "+(t+1),value:a}))),fillColor:[S.DZ,S.oz],fontSize:12,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontColor:"currentColor",showAnimation:!0,showLegend:!0,showXaxisLabel:!0,xAxisLabel:"Sample",animationClass:null===(o=S.zB[0])||void 0===o?void 0:o.id,onClick:()=>{}},M={name:"Horizontal bar chart",width:600,barHeight:20,data:new Array(10).fill("_").map(((a,t)=>({label:`C${t+1}`,value:Number((100*Math.random()).toFixed(2))}))),marginTop:30,marginRight:50,marginBottom:10,marginLeft:60,sortClause:"",padding:.05,style:{},fillColor:S.DZ,fontColor:"currentColor",lineColor:S.DZ,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontSize:12,showAnimation:!0,animationClass:null===(l=S.zB[0])||void 0===l?void 0:l.id,onClick:()=>{}},Y={name:"Pie chart",width:250,height:250,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fillColor:[S.DZ,S.oz],fontColor:"currentColor",data:[{label:"<5",value:45e3},{label:"5-9",value:3e4},{label:"10-14",value:4e4},{label:"15-19",value:5e4},{label:"20-24",value:6e4},{label:"25-29",value:7e4},{label:"30-34",value:8e4}],fontSize:12,showXaxisLabel:!0,showYaxisLabel:!0,sortClause:"",lineColor:"#555",showAnimation:!0,animationClass:null===(r=S.zB[0])||void 0===r?void 0:r.id,className:"",onClick:()=>{}},X={name:"Stacked vertical bar chart",width:500,height:200,marginTop:10,marginRight:10,marginBottom:20,marginLeft:80,fillColor:[S.DZ,S.oz],fontColor:"currentColor",lineColor:"currentColor",showTooltip:!0,padding:.01,yTicks:6,showAnimation:!0,animationClass:null===(d=S.zB[0])||void 0===d?void 0:d.id,sortClause:"",data:Z.jU.filter((a=>["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL"].includes(a.label))),showYaxis:!0,showXaxis:!0,showXaxisLabel:!0,showXaxisLine:!0,showYaxisLine:!0,showYaxisLabel:!0,fontSize:12,onClick:()=>{}},F={name:"Vertical bar chart",width:700,height:200,marginTop:20,marginRight:10,marginBottom:40,marginLeft:60,fillColor:S.DZ,fontColor:S.DZ,lineColor:"currentColor",yAxisLabel:"y-axis",xAxisLabel:"x-axis",padding:.01,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,data:new Array(20).fill("_").map(((a,t)=>({label:`C${t+1}`,value:Number((100*Math.random()).toFixed(2))}))),showYaxisLine:!0,showXaxis:!0,showXaxisLabel:!0,showYaxis:!0,showYaxisLabel:!0,showAnimation:!0,showLegend:!0,animationClass:null===(s=S.zB[0])||void 0===s?void 0:s.id,sortClause:"",xAxisTicksOrientation:"horizontal",fontSize:12,yTicks:6,onClick:()=>{}},W={name:"Zoomable circle packing chart",width:600,height:600,fillColor:[S.DZ,S.oz],padding:3,tooltipPrefix:"",tooltipSuffix:"",showTooltip:!0,fontSize:10,showAnimation:!0,animationClass:null===(m=S.zB[0])||void 0===m?void 0:m.id,data:Z.xP,onClick:()=>{}},U={name:"Scatter plot chart",width:500,height:300,marginTop:60,marginRight:60,marginBottom:60,marginLeft:70,data:Z.MS,fillColor:y.schemeSet1,fontColor:S.DZ,lineColor:S.DZ,xTicks:40,yTicks:40,markerSize:7,fontSize:14,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",yAxisLabel:"Y - Axis",xAxisLabel:"X - Axis",showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,animationClass:null===(h=S.zB[0])||void 0===h?void 0:h.id,showAnimation:!0,showXaxis:!0,showYaxis:!0,onClick:()=>{}},H={name:"Density chart",width:300,height:200,data:Z.lM,marginTop:30,marginRight:30,marginBottom:60,marginLeft:30,fillColor:S.DZ,fontColor:S.DZ,lineColor:S.DZ,showXaxisLabel:!0,fontSize:12,xAxisLabel:"X - Axis",showXaxis:!0,animationClass:null===(u=S.zB[0])||void 0===u?void 0:u.id,showAnimation:!0,onClick:()=>{}},O={name:"Box plot chart",width:300,height:200,data:Z.RT,marginTop:30,marginRight:30,marginBottom:60,marginLeft:60,markerSize:1,fillColor:S.DZ,fontColor:S.DZ,lineColor:S.DZ,padding:.7,fontSize:12,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,xAxisLabel:"x-axis",yAxisLabel:"y-axis",animationClass:null===(g=S.zB[0])||void 0===g?void 0:g.id,showAnimation:!0,xAxisTicksOrientation:"horizontal",onClick:()=>{}},N={name:"Line chart",width:300,height:200,data:Z.eo,marginTop:30,marginRight:30,marginBottom:50,marginLeft:60,markerSize:1,fontSize:12,fillColor:S.DZ,fontColor:S.DZ,lineColor:S.DZ,showXaxis:!0,showYaxis:!0,showYaxisLabel:!0,showXaxisLabel:!0,showYaxisLine:!0,showXaxisLine:!0,xAxisLabel:"x-axis",yAxisLabel:"y-axis",showAnimation:!0,xAxisTicksOrientation:"horizontal",animationClass:null===(_=S.zB[0])||void 0===_?void 0:_.id,onClick:()=>{}},$={name:"Voronoi chart",width:300,height:200,data:Z.Lu,markerSize:7,strokeWidth:2,opacity:.3,lineColor:S.oz,fillColor:S.DZ,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",animationClass:null===(f=S.zB[0])||void 0===f?void 0:f.id,showAnimation:!0,className:"",onClick:()=>{}},J={name:"Circular bar chart",width:400,height:400,data:Z.r0,marginTop:30,marginRight:0,marginBottom:30,marginLeft:0,fontSize:12,fillColor:S.DZ,fontColor:S.DZ,lineColor:S.DZ,innerRadius:10,padding:.2,opacity:.7,showTooltip:!0,tooltipPrefix:"",tooltipSuffix:"",sortClause:"",showAnimation:!0,showLegend:!0,animationClass:null===(c=S.zB[0])||void 0===c?void 0:c.id,onClick:()=>{}},j={name:"Word cloud chart",width:400,height:300,data:Z.YA,fontColor:new Array(25).fill(S.DZ),padding:1,showAnimation:!0,animationClass:null===(v=S.zB[0])||void 0===v?void 0:v.id,opacity:1},E={name:"",width:100,height:100,fillColor:"transparent",fontColor:S.DZ,lineColor:S.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(p=S.zB[0])||void 0===p?void 0:p.id},V={name:"",width:100,height:100,fillColor:"transparent",fontColor:S.DZ,lineColor:S.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(w=S.zB[0])||void 0===w?void 0:w.id},G={name:"",width:100,height:100,fillColor:"transparent",fontColor:S.DZ,lineColor:S.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(x=S.zB[0])||void 0===x?void 0:x.id,borderRadius:5},q={name:"",width:100,height:100,fillColor:"transparent",fontColor:S.DZ,lineColor:S.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(C=S.zB[0])||void 0===C?void 0:C.id},K={width:100,height:100,name:"Text",fontColor:S.oz,lineColor:S.DZ,fontSize:60,strokeWidth:1,showAnimation:!0,animationClass:null===(A=S.zB[0])||void 0===A?void 0:A.id,fontFamily:"Arial"},Q={width:100,height:50,strokeWidth:1,fillColor:S.DZ,showAnimation:!0,animationClass:null===(b=S.zB[0])||void 0===b?void 0:b.id},aa={width:100,height:50,strokeWidth:1,fillColor:S.DZ,showAnimation:!0,animationClass:null===(L=S.zB[0])||void 0===L?void 0:L.id},ta={name:"",width:200,height:100,fillColor:"transparent",fontColor:S.DZ,lineColor:S.DZ,fontSize:12,strokeWidth:1,showAnimation:!0,animationClass:null===(z=S.zB[0])||void 0===z?void 0:z.id,borderRadius:5},ia={name:"",width:75,height:100,fillColor:"transparent",fontSize:12,fontColor:S.DZ,lineColor:S.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(I=S.zB[0])||void 0===I?void 0:I.id},na={name:"",width:100,height:50,fillColor:S.DZ,lineColor:S.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(k=S.zB[0])||void 0===k?void 0:k.id,flipXaxis:!1,flipYaxis:!1},ea={fontSize:50,emoji:"\ud83d\ude00",showAnimation:!0,animationClass:null===(D=S.zB[0])||void 0===D?void 0:D.id},oa={name:"",height:50,width:100,fillColor:S.DZ,lineColor:S.DZ,strokeWidth:1,showAnimation:!0,animationClass:null===(B=S.zB[0])||void 0===B?void 0:B.id}}}]);