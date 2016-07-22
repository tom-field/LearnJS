const gulp = require("gulp"),
    del = require('del');
//删除单个文件
gulp.task("default",function () {
    return del("01.html",function (paths) {
        console.log(paths);
        console.log(1);
    });
})
//删除多个文件
gulp.task("default1",function () {
    return del(["test/01.html","test/02.html"],function (paths) {
        
    })
})
//同步删除文件
gulp.task("default2",function () {
    return del.sync(["test/01.html","test/02.html"],function (paths) {

    })
});
//忽略某些文件
gulp.task("default3",function () {
    return del.sync(["test/*.html","!test/02.html"],function (paths) {

    })
});
//删除文件夹
gulp.task("default4",function () {
    return del.sync('test',function (paths) {

    })
});
//全局符号**会匹配到问价夹以及以下的文件
gulp.task("default5",function () {
    return del.sync('test/**',function (paths) {

    })
});
//——————————注意这种情况并不会保留下02.html,因为**匹配到问价夹把文件夹也删除了
gulp.task("default6",function () {
    return del.sync(['test/**','!test/02.html'],function (paths) {

    })
});
//解决方法 02.html也保留下来了
gulp.task("default7",function () {
    return del.sync(['test/**',,'!test','!test/02.html'],function (paths) {

    })
});