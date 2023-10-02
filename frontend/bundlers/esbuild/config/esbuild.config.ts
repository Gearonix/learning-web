import EsBuild, {BuildOptions} from 'esbuild'
import path from 'path'
import {CleanPlugin} from './plugins/CleanPlugin'
import {ScssModulesPlugin} from "esbuild-scss-modules-plugin";
import {sassPlugin} from 'esbuild-sass-plugin'
import cssModulesPlugin from 'esbuild-css-modules-plugin'
import {livereloadPlugin} from '@jgoz/esbuild-plugin-livereload'
import {htmlPlugin} from '@jgoz/esbuild-plugin-html'


const mode = process.env.MODE || 'development'

const isDev = mode === 'development'

const config: BuildOptions =  {
    outdir: path.resolve(__dirname, '..', 'build'),
    entryPoints: [
        path.resolve(__dirname, '..', 'src', 'index.jsx'),
    ],
    entryNames: '[name].bundle',
    allowOverwrite: true,
    minify: true,
    bundle: true,
    sourcemap: true,
    metafile: true,
    tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
    loader: {
        '.jpg': 'file'
    },
    plugins: [CleanPlugin , ScssModulesPlugin({
        inject: false,
        minify: true,
        cssCallback: (css) => console.log(css),
    }), sassPlugin(), cssModulesPlugin(),
        livereloadPlugin(),
        htmlPlugin({
            template: path.resolve(__dirname, '..','public','index.html')
        })
    ]
}

export default config
