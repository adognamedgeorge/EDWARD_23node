// 创建一个http服务器
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
// 自定义json假数据
let user = {
    admin:123456
}
http.createServer((req, res) => {
    // 获取数据
    let path, get, post;
    if (req.method == 'GET') {
        let {pathname, query} = url.parse(req.url, true);
        path = pathname,
        get = query

        complete()
    } else if (req.method == 'POST') {
        let arr = [];
        req.on('data', buffer => {
            arr.push(buffer)
        });
        req.on('end', () => {
            // 如果是文件则不可使用toString()
            let data = Buffer.concat(arr).toString();
            post = querystring.parse(data);
        })

        complete()
    }

    function complete () {
        // res.writeHead(200, {
        //     "Content-Type": "text/plain; charset=utf-8"
        // })

        if (path == '/login') {
            let {username, password} = get
            if (!user[username]) {
                // res.end只能跟字符串，否则报错，
                // 我们可以使用 JSON.stringify() 方法将 JavaScript 对象转换为字符串
                // JSON 通常用于与服务端交换数据。在向服务器发送数据时一般是字符串
                res.end(JSON.stringify({
                    err: 1,
                    msg: '用户名不存在'
                }))
            } else if (user[password] !== password) {
                res.end(JSON.stringify({
                    err: 1,
                    msg: '密码错误'
                }))
            } else {
                res.end(JSON.stringify({
                    err: 0,
                    msg: '登录成功'
                }))
            }
        } else if (path == '/reg') {
            let {username, password} = post
            if (user[username]) {
                res.end(JSON.stringify({
                    err: 1,
                    msg: '用户名已存在'
                }))
            } else {
                res.end(JSON.stringify({
                    err: 0,
                    msg: '注册成功'
                }))
            }
        } else {
            fs.readFile(`${path}`, (err, data) => {
                if (err) {
                    res.end('404')
                } else {
                    res.end(data)
                }
            })
        }
    }
}).listen(8080);