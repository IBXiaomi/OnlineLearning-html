var add = function (x, y) {
    return x + y;
};
var add2 = function (x, y) {
    return x + y + 2;
};
// 导出方法之后才能引用到
module.exports.add = add;