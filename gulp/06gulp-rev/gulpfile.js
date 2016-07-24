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
    cleancss = require('gulp-clean-css'),
    rev = require('gulp-rev'),
    revreplace = require('gulp-rev-replace'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps')
gulp.task('newdel',function () {
    /*return del.sync('./dist/!**')*/
})
gulp.task('default1',["newdel"], function () {
    return gulp.src('app/*.html')
        .pipe(sourcemaps.init())
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleancss()))
        .pipe(rev())
        .pipe(revreplace())
        .pipe(rev.manifest())
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest('dist'));
});