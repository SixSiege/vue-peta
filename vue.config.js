const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     target: 'http://172.18.12.94:8080/',
  //     ws: true,
  //     changeOrigin: true
  //   }
  // }
})
