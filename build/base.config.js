'use strict'

const path = require('path')
//项目编译输出目录
const outputPath = 'dist/web'

module.exports = {
  // 开发环境配置项
  dev: {
    // 用来指明开发环境
    env: 'development',
    // Paths
    assetsSubDirectory: 'static/',
    assetsPublicPath: '/',
    // 跨域代理设置代理表，建一个虚拟api服务器用来代理本机的请求，只能用于开发模式
    proxyTable: {
      '/backendApi': {
        target: 'http://58.83.189.150:18888/',
        changeOrigin: true, //如果接口跨域，需要进行这个参数配置
        secure: false,  // 如果是https接口，需要配置这个参数
      },
      '/weather-web/resources': {
        target: 'http://58.83.189.150:18888/',
        changeOrigin: true, // // 如果接口跨域，需要进行这个参数配置
        secure: false,  // 如果是https接口，需要配置这个参数
      },
    },
    // dev-server的端口号，可以自行更改
    port: 8082,
    devtool: 'cheap-module-eval-source-map',
    // 是否生成css，map文件，
    cssSourceMap: false
  },
  // 线上环境配置项
  build: {
    // 只要用来指定当前环境（生产环境）
    env: 'production',
    // Template for index.html
    // 相对路径的拼接，假如当前跟目录是config，那么下面配置的index属性的属性值就是dist/index.html
    index: path.resolve(__dirname, `./${outputPath}/index.html`), // html入口文件
    // 定义的是静态资源的根目录 也就是dist目录
    assetsRoot: path.resolve(__dirname, `./${outputPath}/`), // 打包后的目录设置
    // 定义的是静态资源根目录的子目录static，也就是dist目录下面的static
    assetsSubDirectory: 'static/', // 打后的静态资源
    // 下面定义的是静态资源的公开路径，也就是真正的引用路径(服务器路径)
    // assetsPublicPath: 'http://58.83.189.232:18001',
    assetsPublicPath: '/',
    // 是否生成生产环境的sourcmap，sourcmap是用来debug编译后文件的，通过映射到编译前文件来实现
    productionSourceMap: false,
    // 下面是是否在生产环境中压缩代码，如果要压缩必须安装compression-webpack-plugin
    productionGzip: true,
    // 下面定义要压缩哪些类型的文件
    productionGzipExtensions: ['js', 'css'],
    // 下面是用来开启编译完成后的报告，可以通过设置值为true和false来开启或关闭
    // 下面的process.env.npm_config_report表示定义的一个npm_config_report环境变量，可以自行设置
    bundleAnalyzerReport: process.env.npm_config_report,
    //项目名称
    outputPath: outputPath
  }
}
