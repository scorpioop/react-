//根据情况引入相关postcss 的插件
module.exports = {
  plugins: [
    // 预先加载这里面的css，常用来配置主题变量
    // require('postcss-prepend-imports')({
    //   path: `./src/themes/default`,
    //   files: ['variable.css']
    // }),
    // require('postcss-import')(),
    // require('postcss-nested')(),
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*', '!border'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      exclude: /node_modules/i
    }),
    // require('postcss-color-mod-function')(),
    // require('autoprefixer')({
    //   overrideBrowserslist: [
    //     "last 2 version",
    //     ">1%",
    //     "ios 7"
    //   ]
    // }),
    // require('postcss-functions')({
    //   // 这里可以写js方法供postcss调用
    //   functions: {}
    // }),
    // require('postcss-simple-vars')(),
    // require('cssnano')
  ]
}
