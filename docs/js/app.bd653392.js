(function(t){function e(e){for(var n,r,c=e[0],s=e[1],h=e[2],u=0,p=[];u<c.length;u++)r=c[u],o[r]&&p.push(o[r][0]),o[r]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);l&&l(e);while(p.length)p.shift()();return a.push.apply(a,h||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],n=!0,c=1;c<i.length;c++){var s=i[c];0!==o[s]&&(n=!1)}n&&(a.splice(e--,1),t=r(r.s=i[0]))}return t}var n={},o={app:0},a=[];function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=n,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(i,n,function(e){return t[e]}.bind(null,n));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/alloy-crop-vue/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var h=0;h<c.length;h++)e(c[h]);var l=s;a.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("e35a")},"0e0a":function(t,e,i){e=t.exports=i("99a9")(!1),e.push([t.i,".crop-page .cover-canvas,.crop-page .wrap{position:absolute;left:0;top:0;right:0;bottom:0}.crop-page .cover-canvas{width:100%;height:100%}.crop-page .btn{position:absolute;bottom:30px;z-index:200;font-size:16px;color:#fff;padding-left:20px;padding-right:20px}.crop-page .btn.cancel{left:30px}.crop-page .btn.confirm{right:30px}",""])},"7cd6":function(t,e,i){"use strict";(function(t){var n=i("b0fa"),o=i.n(n),a=i("2b0e"),r=i("e8eb"),c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=a["a"].extend(r["a"]),i=new e({el:document.createElement("div"),propsData:t});return document.body.appendChild(i.$el),new o.a(function(t){i.callBack=function(e){i.showCrop=!1,t(e)},i.showCrop=!0})};function s(t){s.installed||(s.installed=!0,t.component("AlloyCropVue",r["a"]),t.$crop=t.prototype.$crop=c)}var h={install:s},l=null;"undefined"!==typeof window?l=window.Vue:"undefined"!==typeof t&&(l=t.Vue),l&&l.use(h),r["a"].install=s,e["a"]=r["a"]}).call(this,i("2475"))},"991d":function(t,e,i){var n=i("0e0a");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("793e").default;o("721fb1b7",n,!0,{sourceMap:!1,shadowMode:!1})},e35a:function(t,e,i){"use strict";i.r(e);i("1384"),i("69c2"),i("026e"),i("79ce");var n=i("2b0e"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"demo"},[i("div",[i("img",{attrs:{src:t.cropImg,alt:""}})]),i("div",[i("label",{attrs:{for:""}},[t._v("width: "),i("input",{directives:[{name:"model",rawName:"v-model.number",value:t.width,expression:"width",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.width},on:{input:function(e){e.target.composing||(t.width=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),i("br"),i("div",[i("label",{attrs:{for:""}},[t._v("height: "),i("input",{directives:[{name:"model",rawName:"v-model.number",value:t.height,expression:"height",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.height},on:{input:function(e){e.target.composing||(t.height=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),i("br"),i("div",[i("label",{attrs:{for:""}},[t._v("output: "),i("input",{directives:[{name:"model",rawName:"v-model.number",value:t.output,expression:"output",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.output},on:{input:function(e){e.target.composing||(t.output=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),i("hr"),i("div",[i("label",{attrs:{for:""}},[t._v("选择图片: "),i("input",{attrs:{type:"file"},on:{change:t.selectImg}})])]),i("div",{staticClass:"fix-img"},[i("canvas",{ref:"orientation",staticClass:"orientation-canvas"})])])},a=[],r=i("6f45"),c=i.n(r),s={name:"crop-demo",data:function(){return{width:200,height:100,output:2,imgType:"",cropImg:""}},methods:{selectImg:function(t){if(t.target.files&&t.target.files[0]){var e=t.target.files[0];this.imgType=e.type;var i=this;c.a.getData(e,function(){var t=c.a.getTag(this,"Orientation");if(t){var n=new Image;n.onload=function(){var o,a,r,c=this.naturalWidth,s=this.naturalHeight,h=document.createElement("canvas");h.width=a=c,h.height=r=s;var l=h.getContext("2d");switch(t){case 3:o=180,c=-a,s=-r;break;case 6:h.width=r,h.height=a,o=90,c=a,s=-r;break;case 8:h.width=r,h.height=a,o=270,c=-a,s=r;break}l.rotate(o*Math.PI/180),l.drawImage(n,0,0,c,s),h.toBlob(function(t){i.$crop({width:i.width,height:i.height,output:i.output,imgType:e.type,imgPath:URL.createObjectURL(t)}).then(function(t){"confirm"===t.type&&(i.cropImg=t.data.toDataURL(i.imgType))})})},n.src=URL.createObjectURL(e)}else i.$crop({width:i.width,height:i.height,output:i.output,imgType:e.type,imgPath:URL.createObjectURL(e)}).then(function(t){"confirm"===t.type&&(i.cropImg=t.data.toDataURL(i.imgType))})})}}}},h=s,l=i("95c6"),u=Object(l["a"])(h,o,a,!1,null,null,null),p=u.exports,g=i("7cd6");n["a"].use(g["a"]),n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(p)}}).$mount("#app")},e5f1:function(t,e,i){"use strict";var n=i("991d"),o=i.n(n);o.a},e8eb:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.showCrop?i("div",{staticClass:"crop-page"},[i("canvas",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"canvas"}),t.imgPath?i("div",{ref:"croppingBox",staticClass:"wrap"},[i("img",{ref:"img",attrs:{src:t.imgPath,alt:""},on:{load:t.init}}),i("canvas",{ref:"cover",staticClass:"cover-canvas"}),i("div",{staticClass:"btn cancel",on:{click:t.cancel}},[t._v(t._s(t.cancelText))]),i("div",{staticClass:"btn confirm",on:{click:t.confirm}},[t._v(t._s(t.confirmText))])]):t._e()]):t._e()},o=[],a=(i("5957"),i("1e9f"),i("1e5b"),i("b43e"),i("1384"),i("69c2"),i("026e"),i("79ce"),i("140a")),r=i.n(a),c=i("cc81"),s={name:"AlloyCropVue",data:function(){return{alloyFingerList:[],img:null,croppingBox:null,cover:null,coverCtx:null,first:1,initScale:"",originScale:"",imgWidth:0,imgHeight:0,cropRect:[]}},props:{showCrop:{type:Boolean,default:!1},callBack:{type:Function,default:function(){}},cancelText:{type:String,default:"取消"},confirmText:{type:String,default:"确定"},output:{type:Number,default:1},width:{type:Number,default:672},height:{type:Number,default:364},circle:{type:Boolean,default:!1},imgType:{type:String,default:"image/png"},orientation:Number,imgPath:String},methods:{init:function(){var t=this;this.renderTo=document.body,this.img=this.$refs.img,this.imgWidth=this.$refs.img.naturalWidth,this.imgHeight=this.$refs.img.naturalHeight,Object(c["a"])(this.img,!0);var e=window.innerWidth/this.imgWidth;this.initScale=e,this.originScale=e,this.img.scaleX=this.img.scaleY=e,this.croppingBox=this.$refs.croppingBox,this.cover=this.$refs.cover,this.cover.width=window.innerWidth,this.cover.height=window.innerHeight,this.coverCtx=this.cover.getContext("2d"),this.canvas=this.$refs.canvas,this.canvas.width=this.width*this.output,this.canvas.height=this.height*this.output,this.ctx=this.canvas.getContext("2d"),this.alloyFingerList.push(new r.a(this.croppingBox,{multipointStart:function(e){var i=(e.touches[0].pageX+e.touches[1].pageX)/2,n=(e.touches[0].pageY+e.touches[1].pageY)/2,o=t.img.getBoundingClientRect(),a=o.left+o.width/2,r=o.top+o.height/2,c=i-a,s=n-r,h=t.img.originX,l=t.img.originY;t.img.originX=c/t.img.scaleX,t.img.originY=s/t.img.scaleY,t.img.translateX+=c-h*t.img.scaleX,t.img.translateY+=s-l*t.img.scaleX,1===t.first&&(t.img.scaleX=t.img.scaleY=1.1*t.initScale,++t.first),t.initScale=t.img.scaleX},pinch:function(e){var i=t.img.getBoundingClientRect(),n=(document.documentElement.clientHeight-t.height)/2,o=e.zoom,a=(i.width*o-i.width)/2,r=(i.height-i.height*o)/2;t.initScale*o<=1.6&&t.initScale*o>=t.originScale&&a>=i.left&&-a<=i.right-t.width&&r<=n-i.top&&r<=i.bottom-n-t.height&&(t.img.scaleX=t.img.scaleY=t.initScale*o)},pressMove:function(e){var i=t.img.getBoundingClientRect(),n=(document.documentElement.clientHeight-t.height)/2;n-i.top-e.deltaY>=0&&i.bottom+e.deltaY-n>=t.height&&(t.img.translateY+=e.deltaY);var o=(document.documentElement.clientWidth-t.width)/2;i.left+e.deltaX<=o&&i.right+e.deltaX-o>=t.width&&(t.img.translateX+=e.deltaX),e.preventDefault()}})),this.renderCover(),this.setStyle()},renderCover:function(){var t=this.coverCtx,e=this.cover.width,i=this.cover.height,n=this.width,o=this.height;t.save(),t.fillStyle="black",t.globalAlpha=.7,t.fillRect(0,0,this.cover.width,this.cover.height),t.restore(),t.save(),t.globalCompositeOperation="destination-out",t.beginPath(),this.circle?t.arc(e/2,i/2,n/2-4,0,2*Math.PI,!1):t.rect(e/2-n/2,i/2-o/2,n,o),t.fill(),t.restore(),t.save(),t.beginPath(),t.strokeStyle="white",this.circle?t.arc(e/2,i/2,n/2-4,0,2*Math.PI,!1):t.rect(e/2-n/2,i/2-o/2,n,o),t.stroke()},setStyle:function(){this._css(this.cover,{position:"fixed",zIndex:"100",left:"0px",top:"0px"}),this._css(this.croppingBox,{color:"white",textAlign:"center",fontSize:"18px",textDecoration:"none",visibility:"visible"}),this._css(this.img,{position:"fixed",zIndex:"99",left:"50%",top:window.innerHeight/2+"px",marginLeft:this.imgWidth/-2+"px",marginTop:this.imgHeight/-2+"px"})},_css:function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t.style[i]=e[i])},crop:function(){this.calculateRect(),this.ctx.drawImage(this.img,this.cropRect[0],this.cropRect[1],this.cropRect[2],this.cropRect[3],0,0,this.cropRect[2]*this.img.scaleX*this.output,this.cropRect[3]*this.img.scaleY*this.output)},calculateRect:function(){var t=this.img.getBoundingClientRect(),e=window.innerWidth/2-this.width/2,i=window.innerHeight/2-this.height/2,n=[e,i,this.width+e,this.height+i],o=[t.left,t.top,t.width+t.left,t.height+t.top],a=this.getOverlap.apply(this,n.concat(o)),r=(a[0]-o[0])/this.img.scaleX,c=(a[1]-o[1])/this.img.scaleY,s=a[2]/this.img.scaleX,h=a[3]/this.img.scaleY;r<0&&(r=0),c<0&&(c=0),r+s>this.imgWidth&&(s=this.imgWidth-r),c+h>this.imgHeight&&(h=this.imgHeight-c),this.cropRect=[r,c,s,h]},getOverlap:function(t,e,i,n,o,a,r,c){if(i<o||n<a||t>r||e>c)return[0,0,0,0];var s=Math.max(t,o),h=Math.max(e,a),l=Math.min(i,r),u=Math.min(n,c);return[s,h,l-s,u-h]},cancel:function(){this.callBack({type:"cancel"}),this.$emit("cancel")},confirm:function(){this.crop(),this.callBack({type:"confirm",data:this.canvas}),this.$emit("confirm",this.canvas),this.destroy()},destroy:function(){this.alloyFingerList.forEach(function(t){t.destroy()})}}},h=s,l=(i("e5f1"),i("95c6")),u=Object(l["a"])(h,n,o,!1,null,null,null);e["a"]=u.exports}});