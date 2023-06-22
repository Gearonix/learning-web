const ESBuild = require('esbuild')
const path = require('path')
const config = require('./esbuild.config')

const mode = process.env.MODE || 'development'

const isDev = mode === 'development'

console.log(isDev)

ESBuild.build(config)
