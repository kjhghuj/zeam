import { defineConfig } from 'umi';
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      'target': 'https://www.freetogame.com/api',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
  routes: [
    {
      path: '/', component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/home' },
        { path: '/detail', component: '@/pages/detail' },
        { path: '/favorites', component: '@/pages/favorites' },
      ]
    },
  ],
  // devtool: false, // 关闭sourceMap，减小体积，提高编译速度
  // chainWebpack: function (config, { webpack }) {
  //   // 打包加速
  //   config.plugin('hardSource').use(HardSourceWebpackPlugin);
  //   // 对下面配置的 module 不进行缓存
  //   config.plugin('hardSourceExcludeModule').use(HardSourceWebpackPlugin.ExcludeModulePlugin, [
  //     [
  //       {
  //         test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
  //       },
  //       {
  //         test: /eslint-loader/,
  //       },
  //       {
  //         test: /.*\.DS_Store/,
  //       },
  //     ],
  //   ]);
  //   config.plugin('CompressionPlugin').use(new CompressionPlugin({
  //     filename: "[path].gz[query]",
  //     algorithm: "gzip",
  //     test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
  //     // 只处理大于xx字节 的文件，默认：0
  //     threshold: 10240,
  //     // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
  //     minRatio: 0.8, // 默认: 0.8
  //     // 是否删除源文件，默认: false
  //     deleteOriginalAssets: true
  //   }));
  // },
  // fastRefresh: {},
  // mfsu: {},
});
