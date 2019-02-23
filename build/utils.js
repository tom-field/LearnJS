'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
/*添加包*/
const glob = require('glob')
const PAGE_PATH = path.resolve(__dirname, '../src/pages')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

/*第一步 entries*/
exports.entries = function () {
  /*用于匹配 pages 下一级文件夹中的 index.js 文件 */
  var entryFiles = glob.sync(PAGE_PATH + '/*/index.js')
  var map = {}
  entryFiles.forEach((filePath) => {
    /* 下述两句代码用于取出 pages 下一级文件夹的名称 */
    var entryPath = path.dirname(filePath)
    var filename = entryPath.substring(entryPath.lastIndexOf('\/') + 1)
    /* 生成对应的键值对 */
    map[filename] = filePath
  })
  return map
}
/*第二步 htmlPlugin*/
exports.htmlPlugin = function () {
  let entryHtml = glob.sync(PAGE_PATH + '/*/index.html')
  let arr = []
  entryHtml.forEach((filePath) => {
    var entryPath = path.dirname(filePath)
    var filename = entryPath.substring(entryPath.lastIndexOf('\/') + 1)
    let conf = {
      template: filePath,
      filename: filename + `/index.html`,
      chunks: ['manifest', 'vendor', filename],
      inject: true
    }
    if (process.env.NODE_ENV === 'production') {
      let productionConfig = {
        minify: {
          removeComments: true,         // 移除注释
          collapseWhitespace: true,     // 删除空白符和换行符
          removeAttributeQuotes: true   // 移除属性引号
        },
        chunksSortMode: 'dependency'    // 对引入的chunk模块进行排序
      }
      conf = {...conf, ...productionConfig} //合并基础配置和生产环境专属配置
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}
