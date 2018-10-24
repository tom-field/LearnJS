var gulp = require('gulp')
var sftp = require('gulp-sftp')

//虚拟机环境
const localConfig = {
    host: '192.168.20.202',
    port: 22,
    user: 'root',
    pass: 'root',
    remotePath: '/home/project/egg_example_test/app'
}

gulp.task('uploadlocal', function () {
    return gulp.src('./app/**')
        .pipe(sftp(localConfig))
})