<template>
  <div class="crop-page" v-if="showCrop">
    <canvas ref="canvas" v-show="false"></canvas>
    <div class="wrap" ref="croppingBox" v-if="imgPath">
      <img :src="imgPath" alt="" ref="img" @load="init">
      <canvas class="cover-canvas" ref="cover"></canvas>
      <div class="btn cancel" @click="cancel">{{cancelText}}</div>
      <div class="btn confirm" @click="confirm">{{confirmText}}</div>
    </div>
  </div>
</template>

<script>
import AlloyFinger from 'alloyfinger'
import Transform from 'css3transform'
export default {
  name: 'AlloyCropVue',
  data () {
    return {
      alloyFingerList: [],
      img: null,
      croppingBox: null,
      cover: null,
      coverCtx: null,
      first: 1,
      initScale: '',
      originScale: '',
      imgWidth: 0,
      imgHeight: 0,
      cropRect: []
    }
  },
  props: {
    showCrop: {
      type: Boolean,
      default: false
    },
    callBack: {
      type: Function,
      default: () => {}
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    output: {
      type: Number,
      default: 1
    },
    width: {
      type: Number,
      default: 336 * 2
    },
    height: {
      type: Number,
      default: 182 * 2
    },
    circle: {
      type: Boolean,
      default: false
    },
    imgPath: String
  },
  methods: {
    init () {
      this.renderTo = document.body
      this.img = this.$refs.img
      this.imgWidth = this.$refs.img.naturalWidth
      this.imgHeight = this.$refs.img.naturalHeight
      Transform(this.img, true)
      let scalingX = window.innerWidth / this.imgWidth
      // let scalingY = window.innerHeight / this.imgHeight
      // let scaling = scalingX > scalingY ? scalingY : scalingX
      this.initScale = scalingX
      this.originScale = scalingX
      this.img.scaleX = this.img.scaleY = scalingX

      this.croppingBox = this.$refs.croppingBox
      this.cover = this.$refs.cover
      this.cover.width = window.innerWidth
      this.cover.height = window.innerHeight
      this.coverCtx = this.cover.getContext('2d')
      this.canvas = this.$refs.canvas
      this.canvas.width = this.width * this.output
      this.canvas.height = this.height * this.output
      this.ctx = this.canvas.getContext('2d')
      this.alloyFingerList.push(new AlloyFinger(this.croppingBox, {
        multipointStart: (evt) => {
          // reset origin x and y
          let centerX = (evt.touches[0].pageX + evt.touches[1].pageX) / 2
          let centerY = (evt.touches[0].pageY + evt.touches[1].pageY) / 2
          let cr = this.img.getBoundingClientRect()
          let imgCenterX = cr.left + cr.width / 2
          let imgCenterY = cr.top + cr.height / 2
          let offX = centerX - imgCenterX
          let offY = centerY - imgCenterY
          let preOriginX = this.img.originX
          let preOriginY = this.img.originY
          this.img.originX = offX / this.img.scaleX
          this.img.originY = offY / this.img.scaleY
          // reset translateX and translateY
          this.img.translateX += offX - preOriginX * this.img.scaleX
          this.img.translateY += offY - preOriginY * this.img.scaleX
          if (this.first === 1) {
            this.img.scaleX = this.img.scaleY = this.initScale * 1.1
            ++this.first
          }

          this.initScale = this.img.scaleX
        },
        pinch: (evt) => {
          let cr = this.img.getBoundingClientRect()
          let boxOffY = (document.documentElement.clientHeight - this.height) / 2
          let tempo = evt.zoom
          let dw = (cr.width * tempo - cr.width) / 2
          let dh = (cr.height - cr.height * tempo) / 2
          if ((this.initScale * tempo <= 1.6) && (this.initScale * tempo >= this.originScale) && (dw >= cr.left) && (-dw <= (cr.right - this.width)) && (dh <= (boxOffY - cr.top)) && (dh <= (cr.bottom - boxOffY - this.height))) {
            this.img.scaleX = this.img.scaleY = this.initScale * tempo
          }
        },
        pressMove: (evt) => {
          let cr = this.img.getBoundingClientRect()
          let boxOffY = (document.documentElement.clientHeight - this.height) / 2
          if ((boxOffY - cr.top - evt.deltaY >= 0) && (cr.bottom + evt.deltaY - boxOffY >= this.height)) {
            this.img.translateY += evt.deltaY
          }
          let boxOffX = (document.documentElement.clientWidth - this.width) / 2
          if ((cr.left + evt.deltaX <= boxOffX) && (cr.right + evt.deltaX - boxOffX >= this.width)) {
            this.img.translateX += evt.deltaX
          }
          evt.preventDefault()
        }
      }))
      this.renderCover()
      this.setStyle()
    },
    renderCover () {
      let ctx = this.coverCtx
      let w = this.cover.width
      let h = this.cover.height
      let cw = this.width
      let ch = this.height
      ctx.save()
      ctx.fillStyle = 'black'
      ctx.globalAlpha = 0.7
      ctx.fillRect(0, 0, this.cover.width, this.cover.height)
      ctx.restore()
      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      if (this.circle) {
        ctx.arc(w / 2, h / 2, cw / 2 - 4, 0, Math.PI * 2, false)
      } else {
        ctx.rect(w / 2 - cw / 2, h / 2 - ch / 2, cw, ch)
      }
      ctx.fill()
      ctx.restore()
      ctx.save()
      ctx.beginPath()
      ctx.strokeStyle = 'white'
      if (this.circle) {
        ctx.arc(w / 2, h / 2, cw / 2 - 4, 0, Math.PI * 2, false)
      } else {
        ctx.rect(w / 2 - cw / 2, h / 2 - ch / 2, cw, ch)
      }
      ctx.stroke()
    },
    setStyle () {
      this._css(this.cover, {
        position: 'fixed',
        zIndex: '100',
        left: '0px',
        top: '0px'
      })
      this._css(this.croppingBox, {
        color: 'white',
        textAlign: 'center',
        fontSize: '18px',
        textDecoration: 'none',
        visibility: 'visible'
      })
      this._css(this.img, {
        position: 'fixed',
        zIndex: '99',
        left: '50%',
        // error position in meizu when set the top  50%
        top: window.innerHeight / 2 + 'px',
        marginLeft: this.imgWidth / -2 + 'px',
        marginTop: this.imgHeight / -2 + 'px'
      })
    },
    _css (el, obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          el.style[key] = obj[key]
        }
      }
    },
    crop () {
      this.calculateRect()
      // this.ctx.drawImage(this.img, this.cropRect[0], this.cropRect[1], this.cropRect[2], this.cropRect[3], 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.img, this.cropRect[0], this.cropRect[1], this.cropRect[2], this.cropRect[3], 0, 0, this.cropRect[2] * this.img.scaleX * this.output, this.cropRect[3] * this.img.scaleY * this.output)
    },
    calculateRect () {
      let cr = this.img.getBoundingClientRect()
      let cLeft = window.innerWidth / 2 - this.width / 2
      let cTop = window.innerHeight / 2 - this.height / 2
      let coverRect = [cLeft, cTop, this.width + cLeft, this.height + cTop]
      let imgRect = [cr.left, cr.top, cr.width + cr.left, cr.height + cr.top]
      let intersectRect = this.getOverlap.apply(this, coverRect.concat(imgRect))
      let left = (intersectRect[0] - imgRect[0]) / this.img.scaleX
      let top = (intersectRect[1] - imgRect[1]) / this.img.scaleY
      let width = intersectRect[2] / this.img.scaleX
      let height = intersectRect[3] / this.img.scaleY

      if (left < 0) left = 0
      if (top < 0) top = 0
      if (left + width > this.imgWidth) width = this.imgWidth - left
      if (top + height > this.imgHeight) height = this.imgHeight - top

      this.cropRect = [left, top, width, height]
    },
    getOverlap (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
      if (ax2 < bx1 || ay2 < by1 || ax1 > bx2 || ay1 > by2) return [0, 0, 0, 0]
      let left = Math.max(ax1, bx1)
      let top = Math.max(ay1, by1)
      let right = Math.min(ax2, bx2)
      let bottom = Math.min(ay2, by2)
      return [left, top, right - left, bottom - top]
    },
    cancel () {
      this.callBack({
        type: 'cancel'
      })
      this.$emit('cancel')
    },
    confirm () {
      this.crop()
      this.callBack({
        type: 'confirm',
        data: this.canvas
      })
      this.$emit('confirm', this.canvas)
      this.destroy()
    },
    destroy () {
      this.alloyFingerList.forEach(function (alloyFinger) {
        alloyFinger.destroy()
      })
      // this.renderTo.removeChild(this.croppingBox)
      // for (let key in this) {
      //   delete this[key]
      // }
    }
  }
}
</script>

<style>
  .crop-page .wrap {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .crop-page .cover-canvas {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .crop-page .btn {
    position: absolute;
    bottom: 30px;
    z-index: 200;
    font-size: 16px;
    color: #fff;
    padding-left: 20px;
    padding-right: 20px;
  }
  .crop-page .btn.cancel {
    left: 30px;
  }
  .crop-page .btn.confirm {
    right: 30px;
  }
</style>
