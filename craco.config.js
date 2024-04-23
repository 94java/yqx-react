const path = require('path')
const lessPlugin = require("craco-less");

module.exports = {
  style: {
    postcss: {
        mode: 'extends',
        loaderOptions: (postcssLoaderOptions, { env, paths }) => {
            postcssLoaderOptions.postcssOptions.plugins = [
                ...postcssLoaderOptions.postcssOptions.plugins,
                [
                    'autoprefixer',
                    {
                        overrideBrowserslist: [
                            'last 2 version',
                            '>1%',
                            'Android >= 4.0',
                            'iOS >= 7'
                        ]
                    }
                ],
                [
                    'postcss-pxtorem',
                    {
                        rootValue ({ file }) {
                            // return file.indexOf('antd-mobile') > -1 ? 37.5 : 75;
                            return 37.5;
                        },
                        unitPrecision: 2, //只转换到两位小数
                        propList: ['*']
                    }
                ]
            ];
            return postcssLoaderOptions;
        }
    }
  },
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