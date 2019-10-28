import { Config } from '@stencil/core'

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
    globalScript: 'app/global/global.ts'
}
