const path = require('path')
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  // assetsDir: 'static',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('lin', resolve('src/lin')).set('assets', resolve('src/assets'))
    config.module.rule('ignore').test(/\.md$/).use('ignore-loader').loader('ignore-loader').end()
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.html'],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/shared.scss";`,
      },
    },
  },
  devServer: {
    open: true,
    port: port,
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: `http://101.43.132.47:5000`,
        // target: `http://localhost:5000`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_URL]: '',
        },
      },
    },
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    // before: require('./mock/mock-server.js')
  },
  // node_modules依赖项es6语法未转换问题
  transpileDependencies: ['vuex-persist'],
}
