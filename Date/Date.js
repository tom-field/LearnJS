/**
 * Created by Administrator on 2016/10/23.
 */
var time = Date.parse("2015-08-24 08:25")
console.log(time);
var time = new Date("2015-08-24 08:25")
console.log(time);
console.log(new Date(2016, 10, 23, 11, 52));

var start = new Date();
for(var i = 0;i<100000000;i++){

}
var end= new Date();
console.log(end - start);
console.log(new Date().toDateString());