(this["webpackJsonpbni-apps"]=this["webpackJsonpbni-apps"]||[]).push([[29],{1208:function(t,e,a){"use strict";a.r(e);var n=a(26),r=a(1),l=a(54),i=a(71),o=a(48),s=a(0),c=function(t){var e=Object(r.useRef)(null),a=t.width,o=t.height,c=t.marginTop,u=t.marginRight,d=t.marginBottom,f=t.marginLeft,x=t.fillColor,m=t.fontColor,p=t.lineColor,h=t.yAxisLabel,v=t.xAxisLabel,b=t.padding,g=t.style,y=t.tooltipPrefix,w=t.tooltipSuffix,A=t.showTooltip,k=t.data,j=t.showYaxisLine,z=t.showXaxis,L=t.showXaxisLabel,N=t.showYaxis,O=t.showYaxisLabel,C=t.showLegend,S=t.sortClause,T=t.showAnimation,X=t.xAxisTicksOrientation,Y=t.animationClass,E=t.onClick,F=t.fontSize,J=t.yTicks;return Object(r.useEffect)((function(){if(!isNaN(a)){var t=function(){switch(arguments.length>0&&void 0!==arguments[0]?arguments[0]:null){case"desc":return l.l(k,(function(t){var e=Object(n.a)(t,1)[0];return-Number(e.value)}),(function(t){return t.label}));case"asc":return l.l(k,(function(t){var e=Object(n.a)(t,1)[0];return Number(e.value)}),(function(t){return t.label}));default:return k.map((function(t){return t.label}))}}(S),r=l.y().domain(t).range([f,a-u]).padding(b),s=l.d(r).tickSizeOuter(0),g=l.z().domain([0,l.t(k,(function(t){return Number(t.value)}))]).nice().range([o-d,c]),B=l.N(e.current).attr("width",a).attr("height",o+10).attr("viewBox",[0,0,a,o]).call((function(t){var e=[[f,c],[a-u,o-c]];t.call(l.T().scaleExtent([1,8]).translateExtent(e).extent(e).on("zoom",(function(e){r.range([f,a-u].map((function(t){return e.transform.applyX(t)}))),t.selectAll(".bars rect").attr("x",(function(t){return r(t.label)})).attr("width",r.bandwidth()),t.selectAll(".x-axis").call(s),t.selectAll(".legends text").attr("x",(function(t){return r(t.label)})).attr("width",r.bandwidth()),t.selectAll(".x-axis").call(s)})))}));B.selectAll(".bars").remove(),B.selectAll(".legends").remove(),B.append("g").attr("class","bars ".concat(T?Y:"")).selectAll().data(k).join("rect").on("click",(function(t,e){E(t,e)})).on("mousemove",(function(t,e){A&&(i.e.style("padding","5px"),i.e.style("opacity",1),i.e.html("<div>".concat(y,"<div><div>").concat(e.label,"</div><div>").concat(Number(e.value).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),"</div><div>").concat(w,"</div>")).style("left",t.pageX+10+"px").style("top",t.pageY-50+"px"))})).on("mouseout",(function(t){i.e.style("padding",0),i.e.style("opacity",0)})).attr("width",r.bandwidth()).attr("x",(function(t){return r(t.label)})).attr("fill",x).attr("y",(function(t){return g(t.value)})).attr("height",(function(t){return g(0)-g(t.value)})),C&&B.append("g").attr("class","legends ".concat(T?Y:"")).selectAll().data(k).join("text").text((function(t){return t.value})).attr("width",r.bandwidth()).attr("fill",m).attr("font-size",F).attr("x",(function(t){return r(t.label)})).attr("y",(function(t){return g(t.value)-5})).attr("height",(function(t){return g(0)-g(t.value)})),B.selectAll("#x-axis").remove(),z&&(B.append("g").attr("id","x-axis").attr("class","x-axis").attr("transform","translate(0,".concat(o-d,")")).call(s).call((function(t){return L?t.append("text").style("text-anchor","start").attr("font-size",F).attr("x",a/2).attr("y",d).attr("fill",m).text(v):t})),"vertical"===X&&B.selectAll(".x-axis .tick text").attr("font-size",F).style("text-anchor","end").attr("y","15").attr("dx","-1em").attr("dy",".15em").attr("transform","rotate(-60)")),B.selectAll("#y-axis").remove(),N&&(B.append("g").attr("id","y-axis").attr("class","y-axis").attr("transform","translate(".concat(f,",0)")).call(l.e(g).ticks(J).tickFormat(l.j(".2s"))).call((function(t){return j?t:t.select(".domain").remove()})).call((function(t){return O?t.append("text").style("text-anchor","middle").attr("font-size",F).attr("x",-(o-d)/2).attr("y",-(f-20)).attr("fill",m).attr("transform","rotate(270)").text(h):t})),B.selectAll(".domain").attr("stroke",p),B.selectAll(".tick text").attr("stroke",m).attr("font-size",F).attr("fill",m),B.selectAll(".tick line").attr("stroke",p))}}),[JSON.stringify(t)]),Object(s.jsx)("svg",{style:g,ref:e})};c.defaultProps=o.v,e.default=c}}]);