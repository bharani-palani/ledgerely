(this["webpackJsonpbni-apps"]=this["webpackJsonpbni-apps"]||[]).push([[18],{1154:function(t,e,n){"use strict";n.r(e),n.d(e,"VoronoiChart",(function(){return l}));var o=n(26),r=n(1),c=n.n(r),i=n(54),a=n(69),s=n(76),u=n(0),l=function(t){var e=t.width,n=t.height,a=t.data,l=t.markerSize,p=t.lineColor,f=t.fillColor,d=t.showTooltip,m=t.tooltipPrefix,h=t.tooltipSuffix,x=t.className,b=t.showAnimation,j=t.animationClass,y=Object(r.useMemo)((function(){return i.z().domain([0,i.t(a,(function(t){return t.x}))]).range([0,e])}),[e,a]),O=Object(r.useMemo)((function(){return i.z().domain([0,i.t(a,(function(t){return t.y}))]).range([0,n])}),[n,a]),g=Object(r.useMemo)((function(){var t=a.map((function(t){return[y(t.x),O(t.y)]}));return i.a.from(t)}),[y,O,a]),v=Object(r.useState)(null),M=Object(o.a)(v,2),k=M[0],w=M[1],C=Object(r.useMemo)((function(){return g.voronoi([0,0,e,n])}),[g,e,n]),z=a.map((function(t,e){var n=C.renderCell(e);return Object(u.jsx)("path",{d:n,stroke:p,fill:"currentColor",opacity:.1,onMouseOver:function(){w(e)}},e)})),S=a.map((function(t,e){return Object(u.jsxs)(c.a.Fragment,{children:[Object(u.jsx)("circle",{cx:y(t.x),cy:O(t.y),fill:f,r:l,className:"".concat(x," ").concat(b?j:"")}),k===e&&Object(u.jsx)("circle",{cx:y(t.x),cy:O(t.y),r:l,fill:"transparent",stroke:"red",style:{zIndex:1},strokeWidth:3,onMouseOver:function(e){d&&(s.d.style("padding","5px"),s.d.style("opacity",.9),s.d.html("".concat(m," ").concat(t.label," ").concat(h)).style("left",e.pageX+5+"px").style("top",e.pageY-30+"px"))},onMouseLeave:function(){s.d.style("padding",0),s.d.style("opacity",0)}})]},e)}));return Object(u.jsxs)("svg",{width:e,height:n,children:[z,S]})};l.defaultProps=a.m,e.default=l}}]);
//# sourceMappingURL=18.4f73f64d.chunk.js.map