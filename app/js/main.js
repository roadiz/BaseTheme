/**
 * Copyright © 2018, Rezo Zero
 *
 * @file main.js
 * @author Ambroise Maupate
 */

import StartingBlocks, {
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
import 'gsap/CSSPlugin'
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

(() => {
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

    // console.log(StartingBlocks)

    /**
     * Build a new starting blocks
     */
    const startingBlocks = new StartingBlocks({
        debug: 1,
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
