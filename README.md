
## 基本配置
  - 添加git cz, 安装 cz-customizable
  - 在package.json中进行配置
  - theme 支持less-vars-to-js
  - alias 支持别名
  - postCss配置支持移动端布局开发
  - ts配置, typings.d.ts, tsconfig.json,
      - tslint.yml继承于

          ```
          tslint-config-ali/react
          tslint-react
          tslint-eslint-rules
          ```
  - layout,通过正则匹配不同layout
  - 提供403/404/405三种exceptions路由页面
  - 提供axios和mtop两种请求方式
  - 动态加载组件loadingComponent配置
  - 支持less,scss写法, 开启cssModule
  - npm run analyze提供打包分析工具
  - exportStatic: { htmlSuffix : true } 打包切换多页

## 其他待定