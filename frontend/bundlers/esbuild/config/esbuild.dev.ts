import ESBuild from 'esbuild'
import path from 'path'
import config from './esbuild.config'


const PORT = process.env.PORT || 3000

ESBuild.context(config).then((ctx: any) => {
    ctx.serve({
        servedir: config.outdir,
        port: PORT
    })
}).then(() => {
    console.log('server started')
}).catch((e) => {
    console.log(e)
})
