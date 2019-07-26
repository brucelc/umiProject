// import pxToViewPort from 'postcss-px-to-viewport'; 设置移动端适配
import { IConfig } from 'umi-types';
import { resolve } from 'path';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        // immer: true,
      },
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/Loader',
      },
      title: 'umiProject',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  theme: './config/theme.config.js',
  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    models: resolve(__dirname, './src/models'),
    routes: resolve(__dirname, './src/routes'),
    services: resolve(__dirname, './src/services'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
    constants: resolve(__dirname, './src/constants'),
  },
  // exportStatic: true,
  exportStatic: { htmlSuffix : true }, // 配置打包生成静态htnl
  // extraPostCSSPlugins: [
  //   pxToViewPort({
  //     viewportWidth: 750,
  //     viewportHeight: 1334,
  //     unitPrecision: 3,
  //     viewportUnit: 'vw',
  //     selectorBlackList: ['.ignore', '.hairlines'],
  //     minPixelValue: 1,
  //     mediaQuery: false,
  //   }),
  // ],
};

export default config;
