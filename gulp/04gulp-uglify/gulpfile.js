/**
 * Created by Administrator on 2016/7/24.
 */
const gulp = require("gulp"),
    concat=require("gulp-concat"),
    uglify= require("gulp-uglify"),
    pupm=require("pump");
gulp.task('default',function () {
    return gulp.src("../tmp/*.js")
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dest"))
})
//处理报错 建议用pump pump官方描述：pump is a small node module that pipes streams together and destroys all of them if one of them closes.
gulp.task('default1',function (cb) {
    pupm([gulp.src("../tmp/*.js"),concat('all.min.js'),uglify(),gulp.dest("./dest")],cb)
}) 