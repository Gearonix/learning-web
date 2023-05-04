const path = require('path')


const rootFolder = path.basename(path.resolve())
const buildDir = 'dist'
const srcDir = 'src'


module.exports = {
    build : {
        files: `${buildDir}`
    },
    src: {
        files: `${srcDir}/**/*.*`
    },
    watch: {},
    clean: buildDir,
    buildFolder: buildDir,
    srcFolter: srcDir,
    rootFolder,
    ftp: ''
}
