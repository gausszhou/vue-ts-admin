const path = require('path');

module.exports = {
  lintOnSave: false, // 是否在开发环境下每次保存代码时都启用 eslint 验证
  chainWebpack: (config) => {
    // TODO
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
        '@views': path.join(__dirname, './src/views'),
        '@components': path.join(__dirname, './src/components'),
        '@utils': path.join(__dirname, './src/utils')
      }
    }
  }
}