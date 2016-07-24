/**
 * Created by Administrator on 2016/7/24.
 */
const gulp = require("gulp"),
    concat=require("gulp-concat"),
    uglify= require("gulp-uglify"),
    pupm=require("pump"),
    rename=require("gulp-rename");
gulp.task('default',function () {
    return gulp.src("../tmp/*.js")
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dest"))
})
//处理报错 建议用pump pump官方描述：pump is a small node module that pipes streams together and destroys all of them if one of them closes.
//rename via string
gulp.task('default1',function (cb) {
    pupm([gulp.src("../tmp/*.js"),concat('all.min.js'),uglify(),rename('all.min.js'),gulp.dest("./dest")],cb)
})
//rename via function
gulp.task('default2',function (cb) {
    pupm([gulp.src("../tmp/*.js"),
        concat('all.min.js'),
        uglify(),
        rename(function (path) {
            console.log(path);
            path.dirname+='main/js';
            path.basename+="-global";
            path.extname+=".mz";
        }),
        gulp.dest("./dest")],cb)
})
//rename via hash
gulp.task('default3',function (cb) {
    return gulp.src("../tmp/*.js")
    .pipe(rename({
        dirname: "main/text/ciao",
        basename: "aloha",
        prefix: "bonjour-",
        suffix: "-hola",
        extname: ".md"}))
    .pipe(gulp.dest("./dist"))
})