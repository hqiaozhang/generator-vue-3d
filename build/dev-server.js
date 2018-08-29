const config = require('./base.config')
const webpackConfig = require('./webpack.dev.js')
const express = require('express')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
// 跨域代理设置插件
const proxyMiddleware = require('http-proxy-middleware')
const app = express()
const proxyTable = config.dev.proxyTable
const port = process.env.PORT || config.dev.port
const compiler = webpack(webpackConfig)

// 解决跨域问题
Object.keys(proxyTable).forEach(function (context) {
  const options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// 静态资源路径设置
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// 解决路由使用history，刷新页面404的问题
app.use(require('connect-history-api-fallback')())

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

// 使用热加载
app.use(require("webpack-hot-middleware")(compiler))

// Serve the files on port 
app.listen(port, function () {
  console.log('Listening at http://localhost:' + port + '\n')
})
 