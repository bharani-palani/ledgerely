(this["webpackJsonpbni-apps"]=this["webpackJsonpbni-apps"]||[]).push([[7],{1159:function(t,e,n){t.exports={scatterplotCircle:"scatterplot_scatterplotCircle__1qlsx",dimmed:"scatterplot_dimmed__2KlUQ"}},1248:function(t,e,n){"use strict";n.r(e);var i=n(37),o=n(26),a=n(54),r=n(1159),s=n.n(r),c=n(1),l=n(0),x=function(t){var e=t.yScale,n=t.pixelsPerTick,i=t.width,o=t.fontSize,a=t.fontColor,r=t.lineColor,s=t.xTicks,x=t.showXaxisLine,p=t.showYaxis,h=e.range(),f=Object(c.useMemo)((function(){var t=h[0]-h[1],i=Math.floor(t/n);return e.ticks(i).map((function(t){return{value:t,yOffset:e(t)}}))}),[e]);return Object(l.jsx)(l.Fragment,{children:f.map((function(t){var e=t.value,n=t.yOffset;return Object(l.jsxs)("g",{transform:"translate(0, ".concat(n,")"),shapeRendering:"crispEdges",children:[x&&Object(l.jsx)("line",{x1:-s,x2:i+s,stroke:r,strokeWidth:.5}),p&&Object(l.jsx)("text",{style:{fontSize:"".concat(o,"px"),textAnchor:"middle",transform:"translateX(-20px)",fill:a},children:e},e)]},e)}))})},p=function(t){var e=t.xScale,n=t.pixelsPerTick,i=t.height,o=t.fontSize,a=t.fontColor,r=t.lineColor,s=t.yTicks,x=t.showYaxisLine,p=t.showXaxis,h=e.range(),f=Object(c.useMemo)((function(){var t=h[1]-h[0],i=Math.floor(t/n);return e.ticks(i).map((function(t){return{value:d3.format(".1s")(t),xOffset:e(t)}}))}),[e]);return Object(l.jsx)(l.Fragment,{children:f.map((function(t,e){var n=t.value,c=t.xOffset;return Object(l.jsxs)("g",{transform:"translate(".concat(c,", 0)"),shapeRendering:"crispEdges",children:[x&&Object(l.jsx)("line",{y1:s,y2:-i-s,stroke:r,strokeWidth:1}),p&&Object(l.jsx)("text",{style:{fontSize:"".concat(o,"px"),textAnchor:"middle",transform:"translateY(20px)",fill:a},children:n},n)]},e)}))})},h=n(48),f=n(71),u=function(t){var e=t.width,n=t.height,r=t.data,h=t.marginTop,u=t.marginRight,d=t.marginBottom,m=t.marginLeft,j=t.fillColor,g=t.xTicks,b=t.yTicks,y=t.markerSize,O=t.fontSize,w=t.fontColor,k=t.lineColor,v=t.showTooltip,S=t.tooltipPrefix,C=t.tooltipSuffix,z=t.yAxisLabel,L=t.xAxisLabel,M=t.showYaxisLabel,T=t.showXaxisLabel,X=t.showYaxisLine,Y=t.showXaxisLine,A=t.showAnimation,P=t.animationClass,_=t.showXaxis,R=t.showYaxis,q=e-u-m,E=n-h-d,F=Object(c.useState)(null),J=Object(o.a)(F,2),W=J[0],B=J[1],G=a.z().domain([Math.min.apply(Math,Object(i.a)(r.map((function(t){return t.y})))),Math.max.apply(Math,Object(i.a)(r.map((function(t){return t.y}))))]).range([E,0]),K=a.z().domain([0,Math.max.apply(Math,Object(i.a)(r.map((function(t){return t.x}))))]).range([0,q]),N=r.map((function(t){return String(t.group)})),Q=a.A().domain(N).range(j),U=r.map((function(t,e){var n=W&&t.group!==W?s.a.scatterplotCircle+" "+s.a.dimmed:s.a.scatterplotCircle;return Object(l.jsx)("circle",{r:y,cx:K(t.x),cy:G(t.y),className:"".concat(n," ").concat(A?P:""),stroke:Q(t.group),fill:Q(t.group),onMouseOver:function(e){B(t.group),v&&(f.e.style("padding","5px"),f.e.style("opacity",.9),f.e.html("".concat(S,"  ").concat(t.group," \u2192 ").concat(t.subGroup," \u2192 ").concat(t.size," ").concat(C)).style("left",e.pageX+5+"px").style("top",e.pageY-30+"px"))},onMouseLeave:function(){B(null),f.e.style("padding",0),f.e.style("opacity",0)}},e)}));return Object(l.jsx)("div",{children:Object(l.jsxs)("svg",{width:e,height:n,children:[M&&Object(l.jsx)("text",{fontSize:O,x:-n/2,y:"20",fill:w,transform:"rotate(270)",style:{textAnchor:"middle"},children:z}),Object(l.jsxs)("g",{width:q,height:E,transform:"translate(".concat([m,h].join(","),")"),children:[Object(l.jsx)(x,{yScale:G,pixelsPerTick:b,width:q,fontSize:O,fontColor:w,lineColor:k,xTicks:g,showXaxisLine:Y,showYaxis:R}),Object(l.jsx)("g",{transform:"translate(0, ".concat(E,")"),children:Object(l.jsx)(p,{xScale:K,pixelsPerTick:b,height:E,fontSize:O,fontColor:w,lineColor:k,yTicks:b,showYaxisLine:X,showXaxis:_})}),U]}),T&&Object(l.jsx)("text",{fontSize:O,x:e/2,y:n-10,fill:w,style:{textAnchor:"middle"},children:L})]})})};u.defaultProps=h.q;e.default=u}}]);