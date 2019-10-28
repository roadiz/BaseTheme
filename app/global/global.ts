/**
 * Copyright © 2018, Rezo Zero
 *
 * @file global.ts
 * @author Adrien Scholaert
 */

import { logCredits } from '../utils/Utils'
import CSSPlugin from 'gsap/CSSPlugin'
import App from './App'

(window as any).lazySizesConfig = (window as any).lazySizesConfig || {}

const build = async () => {
    import('lazysizes')

    // without this line, CSSPlugin  may get dropped by the bundler...
    // tslint:disable-next-line:no-unused-expression
    new CSSPlugin() // eslint-disable-line

    // tslint:disable-next-line:no-unused-expression
    new App()

    logCredits({
        siteName: 'BaseTheme',
        bgColor: '#fff',
        textColor: '#180F70',
        creditsList: [{
            name: 'Rezo Zero',
            website: 'www.rezo-zero.com'
        }],
        thanksList: [{
            name: 'Roadiz',
            website: 'www.roadiz.io'
        }, {
            name: 'GSAP',
            website: 'www.greensock.com'
        }, {
            name: 'Highway',
            website: 'https://highway.js.org/'
        }, {
            name: 'Stencil',
            website: 'https://stenciljs.com/'
        }]
    })
}

const initApp = () => {
    if ((window as any).temp.devMode) {
        build()
    } else {
        import('raven-js')
            .then(module => {
                const Raven = module.default

                Raven.config('https://749c8bc134f4436f82093fe64222fc0f@sentry.rezo-zero.com/25').install()
                Raven.context(function () {
                    build()
                })
            })
    }
}

export default initApp
