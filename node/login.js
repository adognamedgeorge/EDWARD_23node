const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
let user = {
    edward:123456
};
http.createServer((req, res) => {
    // 获取数据
    let path, getData, postData;
    if (req.method == 'GET') {
        let {pathname, query} = url.parse(req.url, true);
        path = pathname;
        getData = query;
        complete()
    } else if (req.method == 'POST') {
        path = req.url;
        let arr = [];
        req.on('data', buffer => {
            arr.push(buffer)
        });
        req.on('end', () => {
            postData = querystring.parse(Buffer.concat(arr).toString());
            complete()
        })
    }

    // 定义拿到数据之后的回调函数
    function complete() {
        // 编码解决汉字乱码
        // res.writeHead(200, {
        //     "Content-Type": "text/plain;charset=utf-8"
        // });

        if (path == '/login') {
            let {username, password} = getData;

            if (!user[username]) {
                res.end(JSON.stringify({
                    err: 1,
                    msg: '用户名不存在'
                }))
            } else if (user[username] != password) {
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
            let {username, password} = postData;
            if (user[username]) {
                res.end(JSON.stringify({
                    err: 1,
                    msg: '用户已存在'
                }))
            } else {
                user[username] = password;
                res.end(JSON.stringify({
                    err: 0,
                    msg: '注册成功'
                }))
            }
        } else {
            fs.readFile(`./${path}`, (err, data) => {
                if (err) {
                    res.end('404')
                } else {
                    res.end(data)
                }
            })
        }
    }
}).listen(8080);