module.exports = {
    publicPath: './', // 根路径
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录(js,css,img,fonts)
    lintOnSave: false, // 是否开启eslint保存检测,有效值（true||false||error)
    devServer: {
      port: 8000,
      proxy: {
        // 配置跨域
        '/wypapi': {
          target: 'http://39.108.184.152:9001',
          ws: true, // 是否跨域
          changeOrigin: true,
          // 重写地址
          pathRewrite: {
            '^/wypapi': ''
          }
        }
      }
    }
  }
