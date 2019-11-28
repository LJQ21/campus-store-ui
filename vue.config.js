const resolve = dir => require('path').join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
   // 跨域配置
   devServer: {
    proxy: {
      '/campus-store-jpa': {
        target: 'http://192.168.137.1:8080/campus-store-jpa',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/campus-store-jpa': ''
        }
      }
    },
    disableHostCheck: true
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
