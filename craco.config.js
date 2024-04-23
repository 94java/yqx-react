const path = require('path')
const lessPlugin = require("craco-less");

module.exports = {
  // 插件
  plugins: [
    {
      plugin: lessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // antdv 主题之类的配置
            // modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}