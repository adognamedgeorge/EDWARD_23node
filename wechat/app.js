'use strict'
// 引入web框架koa, 先命令行安装npm install koa sha1
var Koa = require('koa')
var wechat = require('./wechat/g')
// 声明对象字面量来存储配置信息
var config = {
    wechat: {
        appID: 'wx2653a64ef6582fab',
        appSecret: 'd7b88a86e2bfe6d78ccdc7cb29a9e469',
        token: 'edwardisveryhandsome'
    }
}

// 实例化koa的web服务器
var app = new Koa()
// 实例use一个中间件，前面带*说明是生成器函数
app.use(wechat(config.wechat))

app.listen(80)
console.log('Listening: 80')