var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revreplace = require('gulp-rev-replace');

gulp.task('javascript', function() {
    return gulp.src('../tmp/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('vorder.min.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(sourcemaps.write("./map"))
        .pipe(gulp.dest('dist'));
});
