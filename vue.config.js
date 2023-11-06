const { defineConfig } = require('@vue/cli-service')
const { publicPath } = require("./src/config.js");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: publicPath,
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    }
  }
})
