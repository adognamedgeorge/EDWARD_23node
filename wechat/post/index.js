let http = require('http');
let querystring = require('querystring');
http.createServer((req, res) => {
    let result = [];
    // 数据依然在req里面,每发送一段执行一次data
    // 计算机发送文件都是以二进制的形式buffer
    req.on('data', buffer => {
        console.log(buffer);
        //<Buffer 75 73 65 72 6e 61 6d 65 3d 65 64 77 61 72 64 26 70 61 73
        // 73 77 6f 72 64 3d 36 36 36 36 36 36>
        result.push(buffer)
    });
    req.on('end', () => {
        console.log(result);
        //[ <Buffer 75 73 65 72 6e 61 6d 65 3d 65 64 77 61 72 64 26
        // 70 61 73 73 77 6f 72 64 3d 36 36 36 36 36 36> ]

        // concat()数组拼接
        Buffer.concat(result);
        let data = Buffer.concat(result);
        // 如果数据是文件，那么使用toString()是错误的
        // console.log(data.toString());
        //username=13071859541&password=666666

        console.log(querystring.parse(data.toString()));
        // [Object: null prototype] { username: '13071859541', password: '666666' }
    })
}).listen(8888);