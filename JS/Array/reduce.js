/**
 * Created by Administrator on 2016/10/23.
 */
var arr = [1,2,3,4,5];

var newarr = arr.reduce(function (prev,curr, index, arr) {
    "use strict";
    return prev+curr
})

console.log(newarr);
