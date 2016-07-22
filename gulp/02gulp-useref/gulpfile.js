/**
 * Created by Administrator on 2016/7/22.
 */
//gulp黑名单:https://github.com/gulpjs/plugins/blob/master/src/blackList.json
//官方不建议使用gulp-usemin 推荐使用gulp-useref
var gulp = require('gulp'),
    useref = require('gulp-useref');
//基本使用
gulp.task('default', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});
//做一些其他修改 压缩移动等
var gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');
gulp.task('default1', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});
//在合并前修改文件的路径 把路劲中含有01的编程了02 所以01.css和01.js没有合并
gulp.task('default2', function () {
    return gulp.src('app/*.html')
        .pipe(useref({
            transformPath: function(filePath) {
                console.log(filePath);
                return filePath.replace('01','02')
            }
        }))
        .pipe(gulp.dest('dist'));
});