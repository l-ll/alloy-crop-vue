module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/alloy-crop-vue/'
    : '/',
  css: {
    extract: false
  }
}
