const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const config = require('./base.config')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  // 入口
  entry: {
    main:[
    　　'webpack-hot-middleware/client', // 热加载
    　　'./src/main.js'
    　　],
    },
  mode: 'development', // 开发环境
  devtool: 'inline-source-map', // 原始源代码
  devServer: {
    // 它指定了服务器资源的根目录，如果不写入contentBase的值，那么contentBase默认是项目的目录。
    clientLogLevel: 'warning',
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ]
    },
     // 设置热替换
     hot: true,
     // 设置页面引入
     inline: true,
     // 一切服务都启用gzip 压缩：
     compress: true,
     // 启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
     noInfo: true,
     // 将运行进度输出到控制台
    //  progress: true,
     // 提供给外部访问地址、端口
     host: HOST || config.dev.host,
     port: PORT || config.dev.port,
     overlay: config.dev.errorOverlay
       ? { warnings: false, errors: true }
       : false,
     // 此路径下的打包文件可在浏览器中访问
     publicPath: config.dev.assetsPublicPath,
      // 如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。
     proxy: config.dev.proxyTable,
     // 除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
     quiet: true,
     open: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',  // 输出文件【注意：这里的根路径是module.exports.output.path】
      template: './src/index.html', // 源模板文件
      favicon: './favicon.ico'

    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
 

