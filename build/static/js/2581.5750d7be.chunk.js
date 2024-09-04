"use strict";(self.webpackChunkledgerely_com=self.webpackChunkledgerely_com||[]).push([[2581],{70613:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=c(n(48738)),o=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=f(e)&&"function"!=typeof e)return{default:e};var n=s(t);if(n&&n.has(e))return n.get(e);var r={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&{}.hasOwnProperty.call(e,a)){var i=o?Object.getOwnPropertyDescriptor(e,a):null;i&&(i.get||i.set)?Object.defineProperty(r,a,i):r[a]=e[a]}return r.default=e,n&&n.set(e,r),r}(n(9950)),a=c(n(11942)),i=c(n(30853)),l=n(79328),u=n(44414);function s(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(s=function(e){return e?n:t})(e)}function c(e){return e&&e.__esModule?e:{default:e}}function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function d(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"===typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,t)}(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){l=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw a}}}}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,_(r.key),r)}}function m(e,t,n){return t=b(t),function(e,t){if(t&&("object"===f(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,v()?Reflect.construct(t,n||[],b(e).constructor):t.apply(e,n))}function v(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(v=function(){return!!e})()}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}function y(e,t){return y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},y(e,t)}function g(e,t,n){return(t=_(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _(e){var t=function(e,t){if("object"!=f(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=f(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==f(t)?t:t+""}var w={orientation:{horizontal:{dimension:"width",direction:"left",reverseDirection:"right",coordinate:"x"},vertical:{dimension:"height",direction:"top",reverseDirection:"bottom",coordinate:"y"}}},j=function(e){function t(e,n){var o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),g(o=m(this,t,[e,n]),"handleFormat",(function(e){var t=o.props.format;return t?t(e):e})),g(o,"handleUpdate",(function(){if(o.slider){var e=o.props.orientation,t=(0,l.capitalize)(w.orientation[e].dimension),n=o.slider["offset".concat(t)],r=o.handle["offset".concat(t)];o.setState({limit:n-r,grab:r/2})}})),g(o,"handleStart",(function(e){var t=o.props.onChangeStart;document.addEventListener("mousemove",o.handleDrag),document.addEventListener("mouseup",o.handleEnd),o.setState({active:!0},(function(){t&&t(e)}))})),g(o,"handleDrag",(function(e){e.stopPropagation();var t=o.props.onChange,n=e.target,r=n.className,a=n.classList,i=n.dataset;if(t&&"rangeslider__labels"!==r){var l=o.position(e);a&&a.contains("rangeslider__label-item")&&i.value&&(l=parseFloat(i.value)),t&&t(l,e)}})),g(o,"handleEnd",(function(e){var t=o.props.onChangeComplete;o.setState({active:!1},(function(){t&&t(e)})),document.removeEventListener("mousemove",o.handleDrag),document.removeEventListener("mouseup",o.handleEnd)})),g(o,"handleKeyDown",(function(e){e.preventDefault();var t,n=e.keyCode,r=o.props,a=r.value,i=r.min,l=r.max,u=r.step,s=r.onChange;switch(n){case 38:case 39:t=a+u>l?l:a+u,s&&s(t,e);break;case 37:case 40:t=a-u<i?i:a-u,s&&s(t,e)}})),g(o,"getPositionFromValue",(function(e){var t=o.state.limit,n=o.props,r=n.min,a=(e-r)/(n.max-r);return Math.round(a*t)})),g(o,"getValueFromPosition",(function(e){var t=o.state.limit,n=o.props,r=n.orientation,a=n.min,i=n.max,u=n.step,s=(0,l.clamp)(e,0,t)/(t||1),c=u*Math.round(s*(i-a)/u),f="horizontal"===r?c+a:i-c;return(0,l.clamp)(f,a,i)})),g(o,"position",(function(e){var t=o.state.grab,n=o.props,r=n.orientation,a=n.reverse,i=o.slider,u=w.orientation[r].coordinate,s=a?w.orientation[r].reverseDirection:w.orientation[r].direction,c="client".concat((0,l.capitalize)(u)),f=e.touches?e.touches[0][c]:e[c],d=i.getBoundingClientRect()[s],p=a?d-f-t:f-d-t;return o.getValueFromPosition(p)})),g(o,"coordinates",(function(e){var t=o.state,n=t.limit,r=t.grab,a=o.props.orientation,i=o.getValueFromPosition(e),l=o.getPositionFromValue(i),u="horizontal"===a?l+r:l;return{fill:"horizontal"===a?u:n-u,handle:u,label:u}})),g(o,"renderLabels",(function(e){return(0,u.jsx)("ul",{ref:function(e){o.labels=e},className:(0,r.default)("rangeslider__labels"),children:e})})),o.state={active:!1,limit:0,grab:0},o}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&y(e,t)}(t,e),n=t,(o=[{key:"componentDidMount",value:function(){this.handleUpdate(),new i.default(this.handleUpdate).observe(this.slider)}},{key:"render",value:function(){var e=this,t=this.props,n=t.value,o=t.orientation,a=t.className,i=t.tooltip,l=t.reverse,s=t.labels,c=t.min,f=t.max,p=t.handleLabel,h=this.state.active,m=w.orientation[o].dimension,v=l?w.orientation[o].reverseDirection:w.orientation[o].direction,b=this.getPositionFromValue(n),y=this.coordinates(b),_=g({},m,"".concat(y.fill,"px")),j=g({},v,"".concat(y.handle,"px")),O=i&&h,P=[],S=Object.keys(s);if(S.length>0){var x,D=d(S=S.sort((function(e,t){return l?e-t:t-e})));try{for(D.s();!(x=D.n()).done;){var E=x.value,M=this.getPositionFromValue(E),C=this.coordinates(M),k=g({},v,"".concat(C.label,"px"));P.push((0,u.jsx)("li",{className:(0,r.default)("rangeslider__label-item"),"data-value":E,onMouseDown:this.handleDrag,onTouchStart:this.handleStart,onTouchEnd:this.handleEnd,style:k,children:this.props.labels[E]},E))}}catch(T){D.e(T)}finally{D.f()}}return(0,u.jsxs)("div",{ref:function(t){e.slider=t},className:(0,r.default)("rangeslider","rangeslider-".concat(o),{"rangeslider-reverse":l},a),onMouseDown:this.handleDrag,onMouseUp:this.handleEnd,onTouchStart:this.handleStart,onTouchEnd:this.handleEnd,"aria-valuemin":c,"aria-valuemax":f,"aria-valuenow":n,"aria-orientation":o,children:[(0,u.jsx)("div",{className:"rangeslider__fill",style:_}),(0,u.jsxs)("div",{ref:function(t){e.handle=t},className:"rangeslider__handle",onMouseDown:this.handleStart,onTouchMove:this.handleDrag,onTouchEnd:this.handleEnd,onKeyDown:this.handleKeyDown,style:j,tabIndex:0,children:[O&&(0,u.jsx)("div",{ref:function(t){e.tooltip=t},className:"rangeslider__handle-tooltip",children:(0,u.jsx)("span",{children:this.handleFormat(n)})}),(0,u.jsx)("div",{className:"rangeslider__handle-label",children:p})]}),s&&this.renderLabels(P)]})}}])&&h(n.prototype,o),a&&h(n,a),Object.defineProperty(n,"prototype",{writable:!1}),n;var n,o,a}(o.Component);g(j,"propTypes",{min:a.default.number,max:a.default.number,step:a.default.number,value:a.default.number,orientation:a.default.string,tooltip:a.default.bool,reverse:a.default.bool,labels:a.default.object,handleLabel:a.default.string,format:a.default.func,onChangeStart:a.default.func,onChange:a.default.func,onChangeComplete:a.default.func}),g(j,"defaultProps",{min:0,max:100,step:1,value:0,orientation:"horizontal",tooltip:!0,reverse:!1,labels:{},handleLabel:""});t.default=j},92581:(e,t,n)=>{t.A=void 0;var r,o=(r=n(70613))&&r.__esModule?r:{default:r};t.A=o.default},79328:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.capitalize=function(e){return e.charAt(0).toUpperCase()+e.substr(1)},t.clamp=function(e,t,n){return Math.min(Math.max(e,t),n)}}}]);