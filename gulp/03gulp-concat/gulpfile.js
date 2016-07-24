/**
 * Created by Administrator on 2016/7/24.
 */
const gulp = require("gulp"),
    concat= require("gulp-concat"),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rev = require('gulp-rev')
gulp.task("concatcss",function () {
    return gulp.src("../style/*.css")
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dest'))
})
gulp.task("concatjs",function () {
    return gulp.src("../tmp/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest('./dest'))
})
gulp.task("default",['concatcss','concatjs'],function () {
    console.log("合并完毕")
})