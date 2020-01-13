## aone数据统计分析工具

### 基本配置

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

### 其他待定
    - "precommit": "lint-staged" // 暂时去掉
    - "@ali/venice-utils": "^1.0.0", // 暂时去掉
    - docker build的时候, 报项目名字不能为大写,必须修改为小写

  ### 作为docker实现的第一个spa引用, 每次提交到githu代码都会重新生成一次镜像, 然后nginx只要更新镜像就会重新更新内容
  - nginx配置history路由重定向到html
  - docker配置只需要拉取镜像就可以了

  ## docker教程
## 概念
- Docker是用来做隔离的, 和之前的虚拟机功能类似, 但是更加强大. 最大的好处是开发,测试,生产环境一致.
- Docker 由镜像(Image)、容器(Container)、仓库(Repository) 三部分组成。
- docker解决的问题, linux知识不懂, 手动部署服务器改动成本高,服务器配置脏乱差, 重装系统不会
- 2个核心概念, 容器和镜像
- 我们自己的操作系统是宿主机. docker用的是镜像;

## 注册
- 官网地址: https://hub.docker.com/ 账号是18201430329 密码是老密码,
- 查看每次build过程,https://www.travis-ci.org/
- 下载docker安装包, 652mb,很大的;
- docker在mac安装下载太慢 ,可以先去下面地址安装, 然后再执行更新
- 下载地址: http://get.daocloud.io/
https://dn-dao-github-mirror.qbox.me/docker/install/mac/Docker.dmg
- 这里安装的只是1.8的版本, 太旧,不能用
- 在linux上安装

```
 curl https://get.docker.com/ > install-docker.sh # 下载安装脚本
 sh install-docker.sh # 执行安装脚本
```
- 查看docker版本 docker version
## 核心api
- 写一个 Dockerfile
- 使用docker image build来将Dockerfile打包成镜像
- 使用docker container create来根据镜像创建一个容器
- 使用docker container start来启动一个创建好的容器

** 自己测试生成镜像 **
- docker image build ./ -t hello-docker:1.0.0 # 打包镜像
- docker container create -p 2333:80 hello-docker:1.0.0 创建容器
- docker container start xxx # xxx 为上一条命令运行得到的结果

** 错误解决 **
- 在服务器上第一次执行上述命令的时候, 会报docker没有初始化的错误, 需要执行
- Cannot connect to the Docker daemon at unix:/var/run/docker.sock. Is the docker daemon running?
- 解决: systemctl start docker
- Error response from daemon: pull access denied for 18201430329/umiproject, repository does not exist or may require 'docker login': denied: requested access to the resource is denied
- 一般都是container名字写错了



- 每次新生成docker之后, 必须要在服务器上执行下面的命令,启动新的docker镜像,页面改动才会生效

- 在docker上生成自己的端口
- docker image pull 18201430329/umiprojects:latest
- docker container create -p 7000:80 18201430329/umiprojects:latest # 得到 yyy
- docker container stop xxx # xxx 为当前运行的容器ID，可用 docker container ls 查看容器list;
- docker container start yyy # yyy 第二条命令返回值


** 上面的命令过于繁杂 **
- docker提供了compose来解决这个问题, 安装docker-compose

```
$ curl -L https://github.com/docker/compose/releases/download/1.8.0/run.sh > /usr/local/bin/docker-compose
$ chmod +x /usr/local/bin/docker-compose
$ docker-compose --version
```

** 对于spa应用, nginx配置必须全部指向html **
- 这样才能保证history路由不会找不到
```
location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    proxy_set_header Host $host;

    if (!-f $request_filename) {
      rewrite ^.*$ /index.html break;
    }
}
```




- docker-compose已经在线上服务器安装成功, 但是使用还是有问题, 需要一个根目录来放置compose的文件, 在哪放?



[30分钟快速入门docker](https://juejin.im/post/5cacbfd7e51d456e8833390c)
[写给前端的docker教程实战](https://juejin.im/post/5d8440ebe51d4561eb0b2751)
