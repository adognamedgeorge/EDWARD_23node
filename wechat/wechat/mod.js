// exports.a = 1;
// exports.b =2;
// let c = 3;
// module.exports = {
//     a:2,
//     b:3
// }
// module.exports = function () {
//     console.log('fuck world')
// }
// module.exports = () => {
//     console.log('hhh')
// }
module.exports = class {
    constructor(name) {
        this.NAME = name
    }
    show() {
        console.log(this.NAME)
    }
}