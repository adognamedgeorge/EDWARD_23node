// 引入http模块
let http = require('http');
// url模块，处理url,url.parse()解析方法；
let url = require('url');
http.createServer((req, res) => {
    // console.log(req.url)//服务器输出/aaa?username=edward&password=666666

    // console.log(url.parse(req.url))
    // 输出Url {
    //     protocol: null,
    //         slashes: null,
    //         auth: null,
    //         host: null,
    //         port: null,
    //         hostname: null,
    //         hash: null,
    //         search: '?username=edward&password=666666',
    //         query: 'username=edward&password=666666',
    //         pathname: '/aaa',
    //         path: '/aaa?username=edward&password=666666',
    //         href: '/aaa?username=edward&password=666666' }

    // console.log(url.parse(req.url, true));
    // 参数true表示处理query
    // 输出query不同：query:
    //     [Object: null prototype] { username: 'edward2', password: '888888' },

    let {pathname, query} = url.parse(req.url, true);
    console.log(pathname, query);
    // 输出/aaa [Object: null prototype] { username: 'edward3', password: '666888' }
}).listen(8888);
