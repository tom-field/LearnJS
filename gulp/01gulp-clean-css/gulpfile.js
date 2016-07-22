/**
 * Created by Administrator on 2016/7/22.
 */
//gulp-minify-css被弃用了 建议使用gulp-clean-css；
const gulp = require("gulp"),
    cleanCss= require("gulp-clean-css"),
    //生成 source maps
    sourcemaps=require("gulp-sourcemaps");
gulp.task('default',function () {
    return gulp.src('src/style/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('dist'))
});
//兼容性设置 compatibility不加引号
//保存备注 /*!这种备注会被保存*/ /*这种备注不会被保存*/
gulp.task('default1',function () {
    return gulp.src('src/style/*.css')
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'))
});
//回调函数
gulp.task('default2',function () {
    return gulp.src('src/style/*.css')
        .pipe(cleanCss({compatibility: 'ie8'},function (details) {
            console.log(details);
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('dist'))
});
// 生成sourceMap文件
gulp.task('default3',function () {
    return gulp.src("src/*.css")
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write('map'))
        .pipe(gulp.dest('dist'));
});
