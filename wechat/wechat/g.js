'use strict'
// 引入加密模块
var sha1 = require('sha1')

module.exports = function (opts) {
    return function *(next) {
        console.log(this.query)

        var token = opts.token
        var signature = this.query.signature
        var nonce = this.query.nonce
        var timestamp = this.query.timestamp
        var echostr = this.query.echostr
        var str = [token, timestamp, nonce].sort().join('')
        // 加密
        var sha = sha1(str)

        // 判断加密值是否等于签名
        if (sha === signature) {
            this.body = echostr + ''
        } else {
            this.body = 'wrong'
        }
    }
}