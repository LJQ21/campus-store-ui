const resolve = dir => require('path').join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  lintOnSave: true,
  devServer: {
    open: IS_PROD,
    host: '0.0.0.0',
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: {
     '/api': {
      target: process.env.VUE_APP_BASE_API || 'http://127.0.0.1:8080',
      changeOrigin: true
     }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src/'))
      .set('_a', resolve('src/assets'))
      .set('_c', resolve('src/components'))
      .set('_v', resolve('src/views'))
      .set('_u', resolve('src/utils'))
      .set('_api', resolve('src/api'))
      .set('_lib', resolve('src/lib'))
      .set('_store', resolve('src/store'))
      .set('_plugins', resolve('src/plugins'))
      .set('_router', resolve('src/router'))
  }
}
