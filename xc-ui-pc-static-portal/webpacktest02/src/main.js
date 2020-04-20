// 导入
var {add} = require("./model01.js");
var Vue = require("./vue.min.js");

var vm = new Vue({
    el: '#a',
    data: {
        name: "吧嘻小米",
        num1: 0,
        num2: 0,
        result: 0
    },
    methods: {
        change: function () {
            // this.result = Number.parseInt(this.num1) + Number.parseInt(this.num2)
            this.result = add(Number.parseInt(this.num1) ,Number.parseInt(this.num2))
        }
    }
});
