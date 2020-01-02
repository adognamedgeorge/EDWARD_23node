// let http = require('http');
// // 参数request
// http.createServer((request, response) => {
//     // console.log('fuck world')
//     // response.write('fuck world');
//     // response.end()
//     // 浏览器localhost:8888展示出fuck world
//     // 上述两行简写
//     // response.end('fuck the world')
//     console.log(request.url)//浏览器显示/代表首页
//     // 在浏览器地址栏后输入1.html，命令行显示/1.html
//     // 通过request.url判断访问的东西
// }).listen(8888);

let http = require('http');
// 系统模块，用于文件读写操作
let fs = require('fs');
http.createServer((req, res) => {
    // `${expression}`字符串占位符
    // 在一个模板字面量中，你可以把任何合法的JavaScript表达式嵌入
    // 到占位符中将其作为字符串的一部分输出到结果中。
    // 占位符${expression}中间可以包含任意的JavaScript表达式
    fs.readFile(`./${req.url}`, (err, data) => {
        if (err) {
            res.writeHead(404)//给出一个状态码
            res.end('404 not found')
        } else {
            res.writeHead(200)//默认写上，可省略
            res.end(data)
        }
    })
}).listen(8888);
// localhost:8888/1.html
// localhost:8888/timg.jpg直接读取图片