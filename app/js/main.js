/**
 * Copyright © 2018, Rezo Zero
 *
 * @file main.js
 * @author Ambroise Maupate
 */

import StartingBlocks, {
    Utils,
    gaTrackErrors,
    Pjax,
    History,
    Prefetch,
    CacheProvider,
    polyfills
} from 'starting-blocks'
import WebpackAsyncBlockBuilder from './services/WebpackAsyncBlockBuilder'
import TransitionFactory from './factories/TransitionFactory'
import HomePage from './pages/HomePage'
import Nav from './common/Nav'
import DefaultPage from './pages/DefaultPage'
import { CSSPlugin } from 'gsap/all'
import 'lazysizes'
import '../scss/style.scss'

window.passiveSupported = false

try {
    const options = Object.defineProperty({}, 'passive', {
        get: function () {
            window.passiveSupported = true
        }
    })

    window.addEventListener('test', options, options)
    window.removeEventListener('test', options, options)
} catch (err) {
    window.passiveSupported = false
}

// Require all svg
const loadSvg = (r) => {
    r.keys().forEach(r)
}

(() => {
    Utils.logCredits(
        'BaseTheme',
        '#fff',
        [{
            name: 'Rezo Zero',
            website: 'www.rezo-zero.com'
        }],
        [{
            name: 'Roadiz',
            website: 'www.roadiz.io'
        }, {
            name: 'GSAP',
            website: 'www.greensock.com'
        }, {
            name: 'Starting Blocks',
            website: 'https://startingblocks.rezo-zero.com'
        }],
        '#000'
    )

    // without this line, CSSPlugin  may get dropped by the bundler...
    new CSSPlugin() // eslint-disable-line

    loadSvg(require.context('../svg/', true, /\.svg$/))
    /** Tracks errors with Analytics **/
    gaTrackErrors()

    // BEING IMPORTANT (Bug Safari 10.1)
    // DO NOT REMOVE
    if (window.MAIN_EXECUTED) {
        throw new Error('Safari 10')
    }

    window.MAIN_EXECUTED = true
    // END IMPORTANT

    /**
     * Declare polyfills
     */
    polyfills()

    /**
     * Build nav
     * @type {Nav}
     */
    const nav = new Nav()

    /**
     * Build a new starting blocks
     */
    const startingBlocks = new StartingBlocks({
        debug: window.temp.devMode ? 1 : 0,
        wrapperId: 'main-container'
    })

    // Add services
    startingBlocks.provider('TransitionFactory', TransitionFactory)
    startingBlocks.provider('History', History)
    startingBlocks.provider('CacheProvider', CacheProvider)

    // Custom block builder (dynamic import)
    startingBlocks.provider('BlockBuilder', WebpackAsyncBlockBuilder)

    // Add bootable services
    startingBlocks.bootableProvider('Prefetch', Prefetch)
    startingBlocks.bootableProvider('Pjax', Pjax)

    // Register pages
    startingBlocks.instanceFactory('Home', c => {
        return new HomePage(c)
    })
    startingBlocks.instanceFactory('DefaultPage', c => {
        return new DefaultPage(c)
    })

    nav.init()
    startingBlocks.boot()
})()

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope)
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err)
        })
    })
}
