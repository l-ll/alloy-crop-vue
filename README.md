# AlloyCrop-vue

AlloyCrop vue wrap [demo](https://l-ll.me/alloy-crop-vue/)

[AlloyTeam/AlloyCrop](https://github.com/AlloyTeam/AlloyCrop)


params

| Param | Description |
| ----- | ----------- |
| confirmText | confirmText |
| cancelText | cancelText |
| output | output |
| width | width |
| height | height |
| circle | circle |
| imgPath | imgPath |
| res.data | crop canvas |

> 💡️ try [exif-js](https://github.com/exif-js/exif-js) get orientation

example

js
```javascript
import AlloyCropVue from 'alloycrop-vue'
Vue.use(AlloyCropVue)
this.$crop({
  imgPath: URL.createObjectURL(file)
}).then(res => {
  if (res.type === 'confirm') {
    // base64 res.data.toDataURL('image/png')
    // blob res.data.toBlob(blob => {}, `image/png`)
  }
})
```

