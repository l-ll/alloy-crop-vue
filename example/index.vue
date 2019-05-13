<template>
  <div class="demo">
    <div>
      <img :src="cropImg" alt="">
    </div>
    <div>
      <label for="">width: <input type="number" v-model.number="width"></label>
    </div>
    <br>
    <div>
      <label for="">height: <input type="number" v-model.number="height"></label>
    </div>
    <br>
    <div>
      <label for="">output: <input type="number" v-model.number="output"></label>
    </div>
    <hr>
    <div>
      <label for="">选择图片: <input type="file" @change="selectImg"></label>
    </div>
    <div class="fix-img">
      <canvas class="orientation-canvas" ref="orientation"></canvas>
    </div>
  </div>
</template>

<script>
import EXIF from 'exif-js'
export default {
  name: 'crop-demo',
  data () {
    return {
      width: 200,
      height: 100,
      output: 2,
      imgType: '',
      cropImg: ''
    }
  },
  methods: {
    selectImg (e) {
      if (!e.target.files || !e.target.files[0]) {
        return
      }
      let file = e.target.files[0]
      this.imgType = file.type
      const self = this
      EXIF.getData(file, function () {
        let orientation = EXIF.getTag(this,'Orientation')
        if (orientation && (orientation === 3 || orientation === 6 || orientation === 8)) {
          let img = new Image()
          img.onload = function () {
            let degree
            let width
            let height
            let drawWidth = this.naturalWidth
            let drawHeight = this.naturalHeight
            let canvas = document.createElement('canvas')
            canvas.width = width = drawWidth
            canvas.height = height = drawHeight
            let context = canvas.getContext('2d')
            switch (orientation) {
              case 3:
                degree = 180
                drawWidth = - width
                drawHeight = - height
                break
              case 6:
                canvas.width = height
                canvas.height = width
                degree = 90
                drawWidth = width
                drawHeight = - height
                break
              case 8:
                canvas.width = height
                canvas.height = width
                degree = 270
                drawWidth = - width
                drawHeight = height
                break
            }
            context.rotate(degree * Math.PI / 180)
            context.drawImage(img, 0, 0, drawWidth, drawHeight)
            canvas.toBlob(blob => {
              self.$crop({
                width: self.width,
                height: self.height,
                output: self.output,
                imgType: file.type,
                imgPath: URL.createObjectURL(blob)
              }).then(res => {
                if (res.type === 'confirm') {
                  self.cropImg = res.data.toDataURL(self.imgType)
                }
              })
            })
          }
          img.src = URL.createObjectURL(file)
        } else {
          self.$crop({
            width: self.width,
            height: self.height,
            output: self.output,
            imgType: file.type,
            imgPath: URL.createObjectURL(file)
          }).then(res => {
            if (res.type === 'confirm') {
              self.cropImg = res.data.toDataURL(self.imgType)
            }
          })
        }
      })
    }
  }
}
</script>
