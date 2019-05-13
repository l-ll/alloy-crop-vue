!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("vue"),require("alloyfinger"),require("css3transform")):"function"==typeof define&&define.amd?define(["exports","vue","alloyfinger","css3transform"],e):e((t=t||self).AlloyCropVue={},t.Vue,t.AlloyFinger,t.Transform)}(this,function(t,e,i,n){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e,i=i&&i.hasOwnProperty("default")?i.default:i,n=n&&n.hasOwnProperty("default")?n.default:n;var o={name:"AlloyCropVue",data:function(){return{alloyFingerList:[],img:null,croppingBox:null,cover:null,coverCtx:null,first:1,initScale:"",originScale:"",imgWidth:0,imgHeight:0,cropRect:[]}},props:{showCrop:{type:Boolean,default:!1},callBack:{type:Function,default:function(){}},cancelText:{type:String,default:"取消"},confirmText:{type:String,default:"确定"},output:{type:Number,default:1},width:{type:Number,default:672},height:{type:Number,default:364},circle:{type:Boolean,default:!1},imgType:{type:String,default:"image/png"},orientation:Number,imgPath:String},methods:{init:function(){var t=this;this.renderTo=document.body,this.img=this.$refs.img,this.imgWidth=this.$refs.img.naturalWidth,this.imgHeight=this.$refs.img.naturalHeight,n(this.img,!0);var e=window.innerWidth/this.imgWidth;this.initScale=e,this.originScale=e,this.img.scaleX=this.img.scaleY=e,this.croppingBox=this.$refs.croppingBox,this.cover=this.$refs.cover,this.cover.width=window.innerWidth,this.cover.height=window.innerHeight,this.coverCtx=this.cover.getContext("2d"),this.canvas=this.$refs.canvas,this.canvas.width=this.width*this.output,this.canvas.height=this.height*this.output,this.ctx=this.canvas.getContext("2d"),this.alloyFingerList.push(new i(this.croppingBox,{multipointStart:function(e){var i=(e.touches[0].pageX+e.touches[1].pageX)/2,n=(e.touches[0].pageY+e.touches[1].pageY)/2,o=t.img.getBoundingClientRect(),s=i-(o.left+o.width/2),a=n-(o.top+o.height/2),r=t.img.originX,c=t.img.originY;t.img.originX=s/t.img.scaleX,t.img.originY=a/t.img.scaleY,t.img.translateX+=s-r*t.img.scaleX,t.img.translateY+=a-c*t.img.scaleX,1===t.first&&(t.img.scaleX=t.img.scaleY=1.1*t.initScale,++t.first),t.initScale=t.img.scaleX},pinch:function(e){var i=t.img.getBoundingClientRect(),n=(document.documentElement.clientHeight-t.height)/2,o=e.zoom,s=(i.width*o-i.width)/2,a=(i.height-i.height*o)/2;t.initScale*o<=1.6&&t.initScale*o>=t.originScale&&s>=i.left&&-s<=i.right-t.width&&a<=n-i.top&&a<=i.bottom-n-t.height&&(t.img.scaleX=t.img.scaleY=t.initScale*o)},pressMove:function(e){var i=t.img.getBoundingClientRect(),n=(document.documentElement.clientHeight-t.height)/2;n-i.top-e.deltaY>=0&&i.bottom+e.deltaY-n>=t.height&&(t.img.translateY+=e.deltaY);var o=(document.documentElement.clientWidth-t.width)/2;i.left+e.deltaX<=o&&i.right+e.deltaX-o>=t.width&&(t.img.translateX+=e.deltaX),e.preventDefault()}})),this.renderCover(),this.setStyle()},renderCover:function(){var t=this.coverCtx,e=this.cover.width,i=this.cover.height,n=this.width,o=this.height;t.save(),t.fillStyle="black",t.globalAlpha=.7,t.fillRect(0,0,this.cover.width,this.cover.height),t.restore(),t.save(),t.globalCompositeOperation="destination-out",t.beginPath(),this.circle?t.arc(e/2,i/2,n/2-4,0,2*Math.PI,!1):t.rect(e/2-n/2,i/2-o/2,n,o),t.fill(),t.restore(),t.save(),t.beginPath(),t.strokeStyle="white",this.circle?t.arc(e/2,i/2,n/2-4,0,2*Math.PI,!1):t.rect(e/2-n/2,i/2-o/2,n,o),t.stroke()},setStyle:function(){this._css(this.cover,{position:"fixed",zIndex:"100",left:"0px",top:"0px"}),this._css(this.croppingBox,{color:"white",textAlign:"center",fontSize:"18px",textDecoration:"none",visibility:"visible"}),this._css(this.img,{position:"fixed",zIndex:"99",left:"50%",top:window.innerHeight/2+"px",marginLeft:this.imgWidth/-2+"px",marginTop:this.imgHeight/-2+"px"})},_css:function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t.style[i]=e[i])},crop:function(){this.calculateRect(),this.ctx.drawImage(this.img,this.cropRect[0],this.cropRect[1],this.cropRect[2],this.cropRect[3],0,0,this.cropRect[2]*this.img.scaleX*this.output,this.cropRect[3]*this.img.scaleY*this.output)},calculateRect:function(){var t=this.img.getBoundingClientRect(),e=window.innerWidth/2-this.width/2,i=window.innerHeight/2-this.height/2,n=[e,i,this.width+e,this.height+i],o=[t.left,t.top,t.width+t.left,t.height+t.top],s=this.getOverlap.apply(this,n.concat(o)),a=(s[0]-o[0])/this.img.scaleX,r=(s[1]-o[1])/this.img.scaleY,c=s[2]/this.img.scaleX,l=s[3]/this.img.scaleY;a<0&&(a=0),r<0&&(r=0),a+c>this.imgWidth&&(c=this.imgWidth-a),r+l>this.imgHeight&&(l=this.imgHeight-r),this.cropRect=[a,r,c,l]},getOverlap:function(t,e,i,n,o,s,a,r){if(i<o||n<s||t>a||e>r)return[0,0,0,0];var c=Math.max(t,o),l=Math.max(e,s);return[c,l,Math.min(i,a)-c,Math.min(n,r)-l]},cancel:function(){this.callBack({type:"cancel"}),this.$emit("cancel")},confirm:function(){this.crop(),this.callBack({type:"confirm",data:this.canvas}),this.$emit("confirm",this.canvas),this.destroy()},destroy:function(){this.alloyFingerList.forEach(function(t){t.destroy()})}}};var s=function(t,e,i,n,o,s,a,r,c,l){"boolean"!=typeof a&&(c=r,r=a,a=!1);var h,d="function"==typeof i?i.options:i;if(t&&t.render&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,o&&(d.functional=!0)),n&&(d._scopeId=n),s?(h=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,c(t)),t&&t._registeredComponents&&t._registeredComponents.add(s)},d._ssrRegister=h):e&&(h=a?function(){e.call(this,l(this.$root.$options.shadowRoot))}:function(t){e.call(this,r(t))}),h)if(d.functional){var p=d.render;d.render=function(t,e){return h.call(e),p(t,e)}}else{var g=d.beforeCreate;d.beforeCreate=g?[].concat(g,h):[h]}return i},a="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());var r=document.head||document.getElementsByTagName("head")[0],c={};var l=s({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.showCrop?i("div",{staticClass:"crop-page"},[i("canvas",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"canvas"}),t._v(" "),t.imgPath?i("div",{ref:"croppingBox",staticClass:"wrap"},[i("img",{ref:"img",attrs:{src:t.imgPath,alt:""},on:{load:t.init}}),t._v(" "),i("canvas",{ref:"cover",staticClass:"cover-canvas"}),t._v(" "),i("div",{staticClass:"btn cancel",on:{click:t.cancel}},[t._v(t._s(t.cancelText))]),t._v(" "),i("div",{staticClass:"btn confirm",on:{click:t.confirm}},[t._v(t._s(t.confirmText))])]):t._e()]):t._e()},staticRenderFns:[]},function(t){t&&t("data-v-095f42b6_0",{source:".crop-page .wrap{position:absolute;left:0;top:0;right:0;bottom:0}.crop-page .cover-canvas{position:absolute;left:0;top:0;right:0;bottom:0;width:100%;height:100%}.crop-page .btn{position:absolute;bottom:30px;z-index:200;font-size:16px;color:#fff;padding-left:20px;padding-right:20px}.crop-page .btn.cancel{left:30px}.crop-page .btn.confirm{right:30px}",map:void 0,media:void 0})},o,void 0,!1,void 0,function(t){return function(t,e){return function(t,e){var i=a?e.media||"default":t,n=c[i]||(c[i]={ids:new Set,styles:[]});if(!n.ids.has(t)){n.ids.add(t);var o=e.source;if(e.map&&(o+="\n/*# sourceURL="+e.map.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e.map))))+" */"),n.element||(n.element=document.createElement("style"),n.element.type="text/css",e.media&&n.element.setAttribute("media",e.media),r.appendChild(n.element)),"styleSheet"in n.element)n.styles.push(o),n.element.styleSheet.cssText=n.styles.filter(Boolean).join("\n");else{var s=n.ids.size-1,l=document.createTextNode(o),h=n.element.childNodes;h[s]&&n.element.removeChild(h[s]),h.length?n.element.insertBefore(l,h[s]):n.element.appendChild(l)}}}(t,e)}},void 0),h=function(t){void 0===t&&(t={});var i=new(e.extend(l))({el:document.createElement("div"),propsData:t});return document.body.appendChild(i.$el),new Promise(function(t){i.callBack=function(e){i.showCrop=!1,t(e)},i.showCrop=!0})};function d(t){d.installed||(d.installed=!0,t.component("AlloyCropVue",l),t.$crop=t.prototype.$crop=h)}var p={install:d},g=null;"undefined"!=typeof window?g=window.Vue:"undefined"!=typeof global&&(g=global.Vue),g&&g.use(p),l.install=d,t.default=l,Object.defineProperty(t,"__esModule",{value:!0})});