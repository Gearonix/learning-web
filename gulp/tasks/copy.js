const {src , dest , series, watch} = require('gulp')
const config = require('./../config/path')

const copy = () => {
    return src(config.src.files).pipe(dest(config.build.files))
}


module.exports = copy
