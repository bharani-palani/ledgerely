(self.webpackChunkledgerely_com=self.webpackChunkledgerely_com||[]).push([[6887],{33453:(e,t,r)=>{var s,l=Object.create,a=Object.defineProperty,o=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,n=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty,u=(e,t,r,s)=>{if(t&&"object"===typeof t||"function"===typeof t)for(let l of i(t))p.call(e,l)||l===r||a(e,l,{get:()=>t[l],enumerable:!(s=o(t,l))||s.enumerable});return e},c=(e,t,r)=>(((e,t,r)=>{t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r})(e,"symbol"!==typeof t?t+"":t,r),r),h={};((e,t)=>{for(var r in t)a(e,r,{get:t[r],enumerable:!0})})(h,{default:()=>g}),e.exports=(s=h,u(a({},"__esModule",{value:!0}),s));var y=((e,t,r)=>(r=null!=e?l(n(e)):{},u(!t&&e&&e.__esModule?r:a(r,"default",{value:e,enumerable:!0}),e)))(r(9950)),d=r(24261),b=r(30277);const f="https://connect.facebook.net/en_US/sdk.js",m="fbAsyncInit";class g extends y.Component{constructor(){super(...arguments),c(this,"callPlayer",d.callPlayer),c(this,"playerID",this.props.config.playerId||`facebook-player-${(0,d.randomString)()}`),c(this,"mute",(()=>{this.callPlayer("mute")})),c(this,"unmute",(()=>{this.callPlayer("unmute")}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e,t){t?(0,d.getSDK)(f,"FB",m).then((e=>e.XFBML.parse())):(0,d.getSDK)(f,"FB",m).then((e=>{e.init({appId:this.props.config.appId,xfbml:!0,version:this.props.config.version}),e.Event.subscribe("xfbml.render",(e=>{this.props.onLoaded()})),e.Event.subscribe("xfbml.ready",(e=>{"video"===e.type&&e.id===this.playerID&&(this.player=e.instance,this.player.subscribe("startedPlaying",this.props.onPlay),this.player.subscribe("paused",this.props.onPause),this.player.subscribe("finishedPlaying",this.props.onEnded),this.player.subscribe("startedBuffering",this.props.onBuffer),this.player.subscribe("finishedBuffering",this.props.onBufferEnd),this.player.subscribe("error",this.props.onError),this.props.muted?this.callPlayer("mute"):this.callPlayer("unmute"),this.props.onReady(),document.getElementById(this.playerID).querySelector("iframe").style.visibility="visible")}))}))}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){}seekTo(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.callPlayer("seek",e),t||this.pause()}setVolume(e){this.callPlayer("setVolume",e)}getDuration(){return this.callPlayer("getDuration")}getCurrentTime(){return this.callPlayer("getCurrentPosition")}getSecondsLoaded(){return null}render(){const{attributes:e}=this.props.config;return y.default.createElement("div",{style:{width:"100%",height:"100%"},id:this.playerID,className:"fb-video","data-href":this.props.url,"data-autoplay":this.props.playing?"true":"false","data-allowfullscreen":"true","data-controls":this.props.controls?"true":"false",...e})}}c(g,"displayName","Facebook"),c(g,"canPlay",b.canPlay.facebook),c(g,"loopOnEnded",!0)}}]);