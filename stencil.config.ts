import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

export const config: Config = {
    namespace: 'basetheme',
    hashFileNames: true,
    srcDir: 'app',
    outputTargets: [{
        type: 'www',
        dir: 'static',
        serviceWorker: null, // disable service workers
        empty: false,
        baseUrl: ''
    }],
    globalScript: 'app/global/global.ts',
    plugins: [
        sass({
            injectGlobalPaths: [
                'app/scss/base/vars.scss',
                'app/scss/base/mixins.scss',
                'app/scss/base/functions.scss',
                'app/scss/base/easing.scss'
            ]
        })
    ]
}
