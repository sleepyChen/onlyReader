# OnlyReader
> vue电影应用

# api：

>- 时光阅读：https://github.com/huanghui0906/API/blob/master/Time.md#movie_detail
 
>- 开眼：https://github.com/huanghui0906/API/blob/master/Eyepetizer.md

>- ？？ ：https://github.com/zce/douban-api-docs/blob/master/docs/movie.md


# 配置vant
>- 安装vant: npm i vant --save
>- 配置vant按需引入: npm i babel-plugin-import --save-dev
```javascript
//在babel.config.js写入以下内容
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
```
>- 配置rem: npm i postcss-pxtorem lib-flexible -D
```javascript
//在postcss.config.js写入以下内容
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```

# axios
>- axios基于promise的http请求库
>- 安装axios、vue-axios：npm i axios vue-axios --save

keep-alive
保持失活路由的状态，如果再次查看该路由时，不会重新触发生命周期钩子


技术问题：
  1、vue-router返回上一级路由，上一级路由无法获取元素滚动距离

定位key
YYTBZ-GFSRX-JSX4Z-7PG44-Y6P2T-IIFD2


collectionMovieData: {
  用户名1: [
    {每一部电影},
    {每一部电影},
  ],
  用户名2: [
    {每一部电影},
    {每一部电影},
  ]
}

阻止事件冒泡
@click.stop

https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2569098573.jpg

```
<div class="chair chair2">
  <span></span>
  <span></span>
  <span class="s3"></span>
  <span></span>
  <span class="buying"></span>
  <span></span>
  <span></span>
  <span class="s8"></span>
  <span></span>
</div>
```
```
//所有电影的电影票
movieTick: {

  //电影id
  '367421123': {
    date: '事件戳',
    users: {
      //用户名称
      Kevin: [{}, {}],

      Mark: [{}, {}]
    }
  },

  //电影id
  '36547241': {
    date: 购买日期,
    users: {
      //用户名称
      Kevin: [{}, {}, {}]
    }
  },
}
```

打包, 把所有console.log语句去除

创建配置文件
vue.config.js

写入以下内容
```
 module.exports = {
  publicPath: './'
 }
```

执行命令
> npm run build


# 配置使用百度地图api

>- npm install vue-baidu-map --save

>- 百度地图引入说明文档： https://dafrok.github.io/vue-baidu-map/#/zh/index