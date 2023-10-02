const copy = require('./tasks/copy')
const gulp = require('gulp')
const config = require('./config/path')

const watcher = () => {
    gulp.watch(config.src.files, copy)
}


gulp.task('default', gulp.series(copy,watcher))

