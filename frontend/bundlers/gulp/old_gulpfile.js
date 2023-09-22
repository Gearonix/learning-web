const {src , dest , series, watch} = require('gulp')
const sass = require('sass')
const gulpSass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const {deleteAsync} = import('del')
const sync = require('browser-sync').create()
const concat = require('gulp-concat')


const html = () => {
    return src('src/**.html').pipe(include({
        prefix: '@@'
    })).pipe(htmlmin({
        collapseWhitespace: true
    }))
        .pipe(dest('dist'))
}


const scss = () => {
    return src('src/**.scss').pipe(gulpSass(sass).sync())
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))
}

const clear = () => {
    // return deleteAsync('dist')
}

const serve = () => {
    sync.init({
        server: './dist'
    })
    watch('src/**', html).on('change',sync.reload)
    watch('src/**', scss).on('change',sync.reload)
}

exports.html = html

exports.scss = scss


exports.clear = clear

exports.build = series(html,scss)

exports.serve = series(html, scss, serve)
