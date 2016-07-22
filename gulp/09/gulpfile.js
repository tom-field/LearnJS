/**
 * Created by Administrator on 2016/7/22.
 */
var del = require('del'),
    gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    usemin = require('gulp-usemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    htmlreplace = require('gulp-html-replace'),
    glob = require("glob"),
    clean = require('gulp-clean'),
    revReplace = require('gulp-rev-replace'),
    fs = require('fs'),
    replace = require('gulp-replace'),
    html2js = require('gulp-html2js'),
    runsequence = require('gulp-run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    include = require('gulp-include'),
    fileinclude = require('gulp-file-include'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-ruby-sass'),
    connect = require('gulp-connect');

//gutil = require('gulp-util'),
//webpack = require('webpack'),
//webpackConfig = require('./webpack.config.js'),
//WebpackDevServer = require('webpack-dev-server');

var source = {
    js: [
        'js/jquery-1.10.2.min.js',
        'js/jquery-ui-1.10.3.custom.min.js',
        'js/underscore-min.js',
        'js/toastr/toastr.min.js',
        'js/jquery.validationEngine.js',
        'js/jquery.validationEngine-zh_CN.js',
        'js/bootstrap-datetimepicker.js',
        'fuelux/loader.min.js',
        'js/jquery.cookie.js',
        'timepicker/jquery.ui.timepicker.js',
        'js/heartcode-canvasloader-min-0.9.1.js',
        'js/version.js',
        'js/custom.js',
        'js/breakpoints.js',
        'js/app.js',
        'js/mmGrid.js',
        'js/mmPaginator.js',
        'js/fixedColumn.js',
        'js/formatMoney.js',
        'js/handlebars-v1.3.0.js',
        'js/tinyscrollbar.min.js',
        'js/jquery.multiple.select.js',
        'js/select2.min.js',
        'js/pagination.js',

        //上传
        'js/vendor/jquery.ui.widget.js',
        'js/tmpl.min.js',
        'js/load-image.min.js',
        'js/canvas-to-blob.min.js',
        'js/bootstrap-image-gallery.min.js',
        'js/jquery.iframe-transport.js',
        'js/jquery.fileupload.js',
        'js/jquery.fileupload-fp.js',
        'js/jquery.fileupload-ui.js',
        'js/jquery.fileupload-locale.js',
        'js/jquery.fileupload-main.js',
        "js/jquery.form.js",

        'js/offline/offline.min.js',
        'js/common/localStorage.js',
        'js/permission/permission.js'

    ],
    jsPropertyList: [
        'js/property/propertyList.js',
        'js/property/favManager.js'
    ],
    css: [
        'css/bootstrap.css',
        'css/custom.css',
        'css/custom_leftMenu.css',
        'css/loading.css',
        'static/css/animates.css',
        'css/smoothness/jquery-ui-1.10.3.custom.css',
        'css/toastr/toastr.min.css',
        'css/mmGrid.css',
        'css/mmGrid-bootstrap.css',
        'css/mmPaginator.css',
        'css/mmPaginator-bootstrap.css',
        'css/validationEngine.jquery.css',
        'css/font-awesome/css/font-awesome.css',
        'css/navChange.css',
        'css/navChange_blue.css',
        'css/multiple-select.css',
        'fuelux/css/fuelux.min.css',
        'fuelux/css/fuelux-responsive.min.css',
        'timepicker/jquery.ui.timepicker.css',
        'css/bootstrap-datetimepicker.min.css',
        'css/meum-top.css',
        'static/css/basic.css',
        'css/select2.min.css',
        'static/js/lib/dist/ui/trumbowyg.css',
        'static/js/lib/dist/plugins/colors/ui/trumbowyg.colors.css',
        'build/mediaelementplayer.min.css',
        'static/css/jquery.fancybox.css',
        'js/offline/offline-language-chinese.css',
        'js/offline/offline-theme-chrome.css',
        'css/pagination.css',

        //上传
        'css/colorbox.css',
        'css/bootstrap-image-gallery.min.css',
        'css/jquery.fileupload-ui.css',

        'css/color_zhongjie.css',

        //名片
        'newcss/userCard.css'
    ],
    template: [
        'static/view/menu/topMenu.html',
        'static/view/menu/leftMenu.html',
        'static/view/home/unreadRemind.html',
        'static/js/module/common/selectInput/index.html',

        'static/js/module/property/propertyDetail/showPropertyDetail.html',
        'static/js/module/property/propertyDetail/addPropertyDetail.html',
        'static/js/module/property/propertyDescribe/index.html',
        'static/view/property/propertyView.html',
        'static/view/contact/contact.list.edit.property.html',
        'static/view/employee/employee.list.property.edit.html',
        'static/view/property/property.edit.html',
        'static/view/property/proFollowPhotoTab.html',
        'static/view/follow/follow.list.property.html',
        'static/view/photo/photo.list.property.html',
        'static/view/common/address.html',

        'static/view/customer/customer.view.html',
        'static/view/employee/empInfoMenu.html',
        'static/view/contact/contact.list.edit.customer.html',
        'static/view/employee/employee.list.customer.edit.html',
        'static/view/customer/customer.edit.html',
        'static/view/follow/follow.list.customer.html',
        'static/view/inspection/inspection.list.customer.html',

        'static/view/home/home.html',
        'static/view/home/userInfo.html',
        'static/view/home/unread.html',
        'static/view/home/userbusiness.html',
        'static/view/home/usercount.html',
        'static/view/home/rankinglist.html',
        'static/view/home/usertodo.html'
    ]
}

//清理
gulp.task('clean', function() {
    return gulp.src(['./dist/', './static/dist/'], {
        read: false
    })
        .pipe(clean({
            force: true
        }));
});

//jsp页面
gulp.task('minjs', function() {
    return gulp.src(source.js)
        .pipe(sourcemaps.init())
        .pipe(concat('vorder.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest('./dist'));
});

//房源列表js
gulp.task('minListJs', function() {
    return gulp.src(source.jsPropertyList)
        .pipe(sourcemaps.init())
        .pipe(concat('vorder.jsPropertyList.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest('./dist'));
});

//压缩css
gulp.task('mincss', function() {
    return gulp.src(source.css)
        .pipe(sourcemaps.init())
        .pipe(concat('vorder.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss({
            keepSpecialComments: 0
        }))
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest('./dist'));
});

//添加版本号
gulp.task('rev', function() {
    return gulp.src(['./dist/*.min.css','./dist/*.min.js', './static/es6/dist/*.min.js'], {
        base: 'dist'
    })
        .pipe(rev())
        .pipe(gulp.dest('./dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist'));
});

//公共头部压缩css js
gulp.task('ajaxDisplayTagUsemin', function() {
    return gulp.src('./decorators/newDecorators/ajaxDisplayTagTop-src.jsp')
        .pipe(rename('ajaxDisplayTagTop.jsp'))
        .pipe(usemin({
            css: [
                function() {
                    return minifycss({
                        keepSpecialComments: 0
                    });
                },
                rev
            ],
            js: [
                function() {
                    return uglify({
                        compress: {
                            drop_console: true
                        },
                        mangle: false
                    });
                },
                rev
            ]
        }))
        .pipe(gulp.dest('./decorators/newDecorators/'));
});

//清理无用的css js
gulp.task('cleanmin', function() {
    return gulp.src(['./dist/*.min.css','./dist/*.min.js'], {
        read: false
    })
        .pipe(clean({
            force: true
        }));
});

//静态资源前需要添加maven变量
gulp.task('ajaxDisplayTagReplacePath', function() {
    return gulp.src('./decorators/newDecorators/ajaxDisplayTagTop.jsp')
        .pipe(replace(/href="\.\.\/\.\.\//g, 'href="${staticHost}/'))
        .pipe(replace(/src="\.\.\/\.\.\//g, 'src="${staticHost}/'))
        .pipe(gulp.dest('./decorators/newDecorators/'));
});

//路径替换
gulp.task('path', function() {
    fs.readFile('dist/rev-manifest.json', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split('"');
        data = data.filter(function(ele) {
            return ele.indexOf('dist') == -1 && (ele.indexOf('vorder') != -1) && (ele.indexOf('vorder') != -1);
        });
        var path = {
            css: {
                tpl: '<link rel="stylesheet" href="${staticHost}/dist/%s">'
            },
            js: {
                tpl: '<script src="${staticHost}/dist/%s"></script>'
            },
            jsPropertyList: {
                tpl: '<script src="${staticHost}/dist/%s"></script>'
            },
            webpack: {
                tpl: '<script src="${staticHost}/es6/dist/%s"></script>'
            }
        }

        path.css.src = data.filter(function(ele) {
            return ele.match(/vorder\..*\.css$/);
        })[0];
        path.js.src = data.filter(function(ele) {
            return ele.match(/vorder\.min.*\.js$/);
        })[0];

        path.jsPropertyList.src = data.filter(function(ele) {
            return ele.match(/vorder\.jsPropertyList\.min.*\.js$/);
        })[0];

        gulp.src('decorators/newDecorators/mainTop-src.jsp')
            .pipe(htmlreplace(path))
            .pipe(rename('mainTop.jsp'))
            .pipe(gulp.dest('decorators/newDecorators/'));

        gulp.src('decorators/newDecorators/script-property-list-src.jsp')
            .pipe(htmlreplace(path))
            .pipe(rename('script-property-list.jsp'))
            .pipe(gulp.dest('decorators/newDecorators/'));

    });
});

//angular页面转js
gulp.task('angularTemplate', function() {
    return gulp.src(source.template)
        .pipe(html2js({
            outputModuleName: 'commonTemplates',
            rename: function(moduleName) {
                return '/' + moduleName;
            }
        }))
        .pipe(concat('commonTemplates.js'))
        .pipe(gulp.dest('./static/js/module/common/'));
});

//angular页面压缩css js
gulp.task('angularUsemin', function() {
    return gulp.src('./index1.html')
        .pipe(rename('index.html'))
        .pipe(usemin({
            css: [
                function() {
                    return minifycss({
                        keepSpecialComments: 0
                    });
                },
                rev
            ],
            js: [
                function() {
                    return uglify({
                        compress: {
                            drop_console: true
                        },
                        mangle: false
                    });
                },
                rev
            ]
        }))
        .pipe(gulp.dest('./'));
});

//angular页面添加maven变量
gulp.task('angularReplacePath', function() {
    return gulp.src('./index.html')
        .pipe(replace(/href="/g, 'href="${staticHost}/'))
        .pipe(replace(/src="/g, 'src="${staticHost}/'))
        .pipe(gulp.dest('./'));
});

//ready页面
gulp.task('ready', function() {
    //获取文件夹中的文件
    function scanFolder(path) {
        var fileList = [],
            folderList = [],
            walk = function(path, fileList, folderList) {
                files = fs.readdirSync(path);
                files.forEach(function(item) {
                    var tmpPath = path + '/' + item,
                        stats = fs.statSync(tmpPath);

                    if (stats.isDirectory()) {
                        walk(tmpPath, fileList, folderList);
                        folderList.push(tmpPath);
                    } else {
                        fileList.push(tmpPath);
                    }
                });
            };

        walk(path, fileList, folderList);

        return {
            'files': fileList,
            'folders': folderList
        }
    }

    var gulpFile = scanFolder('dist'),
        gruntFile = scanFolder('static/dist'),
        fileArr = [],
        fileArrOther = [];
    gulpFile.files.forEach(function(item) {
        if (item.match(/\-.*\.(css|js)$/)) {
            fileArr.push(item);
        } else {
            if (!item.match('rev-manifest.json') || !item.match('.map')) {
                fileArrOther.push(item);
            }
        }
    });
    gruntFile.files.forEach(function(item) {
        if (item.match(/.*\.min\-.*\.(css|js)$/)) {
            fileArr.push(item)
        } else {
            fileArrOther.push(item);
        }
    });

    fileArr.forEach(function(item, index) {
        fileArr[index] = '${staticHost}/' + item;
    });

    gulp.src('ready1.html')
        .pipe(replace('{fileArr}', fileArr))
        .pipe(rename('ready.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('build', function(cb) {
    runsequence('clean', ['minjs', 'minListJs', 'mincss', 'angularTemplate'], ['rev', 'angularUsemin', 'ajaxDisplayTagUsemin'], 'cleanmin', ['ajaxDisplayTagReplacePath', 'path', 'angularReplacePath'], 'ready');
});

gulp.task('buildJsp', function(cb) {
    runsequence('clean', ['minjs', 'minListJs', 'mincss'], 'rev', 'ajaxDisplayTagUsemin', 'cleanmin', 'ajaxDisplayTagReplacePath', 'path');
});

gulp.task('buildAngular', function(cb) {
    runsequence('clean', 'angularTemplate', 'angularUsemin','angularReplacePath');
});

//新版html

var newsource = {
    sass:[
        'newsass/**/*.scss'
    ],
    css:[
        'newlib/**/*.css',
        '!newlib/**/bootstrap-theme.min.css'
    ],
    html:[
        'newhtmlsrc/**/*.html',
        '!newhtmlsrc/common/**/*'
    ]
}

gulp.task('newdel',function(){
    return del.sync(['newcss','newdist'],{
        force:true
    });
});

gulp.task('newdelsasscss',function(){
    return del.sync(['newcss'],{
        force:true
    });
});

gulp.task('newsass',function(){
    return sass(newsource.sass,{
        style:'expanded'
    })
        .pipe(gulp.dest('newcss'))
        .pipe(connect.reload());
});

gulp.task('newsasscss',function(){
    return gulp.src([
        'newcss/**/*.css',
        '!newcss/lib.min.css'
    ])
        .pipe(concat('master.min.css'))
        .pipe(minifycss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('newcss'));
});

gulp.task('newsassmin',function(){
    return  runsequence('newdelsasscss','newsass', 'newsasscss')
});

gulp.task('newcss',function(){
    return gulp.src(newsource.css)
        .pipe(concat('lib.min.css'))
        .pipe(minifycss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('newcss'));
});

gulp.task('newhtml',function(){
    return gulp.src(newsource.html)
        .pipe(fileinclude())
        .pipe(gulp.dest('newhtml'))
        .pipe(connect.reload());
});

gulp.task('newusemin', function() {
    return gulp.src('./newpages/header-src.jsp')
        .pipe(rename('header.jsp'))
        .pipe(usemin({
            css: [
                function() {
                    return minifycss({
                        keepSpecialComments: 0
                    });
                },
                rev
            ],
            js: [
                function() {
                    return uglify({
                        compress: {
                            drop_console: true
                        },
                        mangle: false
                    });
                },
                rev
            ]
        }))
        .pipe(gulp.dest('./newpages/'));
});

gulp.task('newreplace', function() {
    return gulp.src('./newpages/header.jsp')
        .pipe(replace(/href="\.\.\//g, 'href="${staticHost}/'))
        .pipe(replace(/src="\.\.\//g, 'src="${staticHost}/'))
        .pipe(gulp.dest('./newpages/'));
});

//gulp.task('webpack', function(callback) {
//	var myConfig = Object.create(webpackConfig);
//
//	myConfig.plugins = [
//		new webpack.optimize.DedupePlugin(),
//		new webpack.optimize.UglifyJsPlugin(),
//        new webpack.SourceMapDevToolPlugin({
//            filename: '[file].map',
//            include: ['fxt.js'],
//            columns: true
//        })
//	];
//
//	webpack(myConfig, function(err, stats) {
//		if (err) throw new gutil.PluginError('webpack', err);
//		gutil.log('[webpack]', stats.toString({
//			colors: true,
//			progress: true
//		}));
//		callback();
//	});
//});
//
//gulp.task('server', ['webpack'], function(callback) {
//	var myConfig = Object.create(webpackConfig);
//	var filterList = [".html", ".css", ".js"];
//	myConfig.devtool = 'eval';
//	myConfig.debug = true;
//
//	new WebpackDevServer(webpack(myConfig), {
//		publicPath: '/' + myConfig.output.publicPath,
//		stats: {
//			colors: true,
//			// keepAlive: true,
//   			// watch: true
//		},
//		hot: true,
//		proxy: {
//        	'.*\.(js|html|css)$': "http://localhost:8080/"
//    	}
//	}).listen(8090, 'localhost', function(err) {
//		if(err) throw new gutil.PluginError('webpack-dev-server', err);
//		gutil.log('[webpack-dev-server]', 'http://localhost:8090/webpack-dev-server/index1.html');
//	});
//});

gulp.task('newconnect',function(){
    connect.server({
        port: 8008,
        livereload: true
    });
});

gulp.task('newwatch',function(){
    gulp.watch('newsass/**/*.scss',function(){
        return runsequence('newsass', 'newsasscss')
    });
    gulp.watch('newhtmlsrc/**/*.html', ['newhtml']);
});

gulp.task('newcssbuild', function() {
    return runsequence('newdel', ['newsass', 'newcss', 'newhtml'], 'newsasscss');
});

gulp.task('newbuild', function() {
    return runsequence('newdel', ['newsass', 'newcss', 'newhtml'], 'newsasscss', 'newusemin', 'newreplace');
});

gulp.task('newstatic', function() {
    return runsequence('newdel', 'newconnect', ['newsass', 'newcss', 'newhtml'], 'newsasscss', 'newwatch');
});

gulp.task('default', function(){
    return runsequence('newdel', ['newsass', 'newcss', 'newhtml'], 'newsasscss', 'newusemin', 'newreplace', 'clean', ['minjs', 'minListJs', 'mincss', 'angularTemplate'], ['rev', 'angularUsemin', 'ajaxDisplayTagUsemin'], 'cleanmin', ['ajaxDisplayTagReplacePath', 'path', 'angularReplacePath'], 'ready');
});