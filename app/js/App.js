/**
 * Copyright © 2017, Rezo Zero
 *
 * @file App.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import StartingBlocks, {
    gaTrackErrors,
    Utils,
    Pjax,
    History
} from 'starting-blocks'
import Nav from './common/Nav'
import HomePage from './pages/HomePage'
import DefaultPage from './pages/DefaultPage'
import WebpackAsyncBlockBuilder from './factories/WebpackAsyncBlockBuilder'
import { CSSPlugin } from 'gsap/all'

// without this line, CSSPlugin  may get dropped by the bundler...
new CSSPlugin() // eslint-disable-line

/**
 * App entry.
 */
export default class App {
    constructor () {
        this.devMode = window.temp.devMode
        this.nav = new Nav()
        this.startingBlocks = new StartingBlocks({
            wrapperId: 'main-container',
            debug: 1
        })
    }

    init () {
        this.loadSvg(require.context('../svg/', true, /\.svg$/))
        this.setCredits()
        this.initConfig()

        // Config starting blocks
        // Enable ajax
        this.startingBlocks.bootableProvider('Pjax', Pjax)
        this.startingBlocks.provider('History', History)

        // Add pages
        this.startingBlocks.instanceFactory('DefaultPage', c => {
            return new DefaultPage(c)
        })

        this.startingBlocks.instanceFactory('HomePage', c => {
            return new HomePage(c)
        })

        // Override block builder
        this.startingBlocks.provider('BlockBuilder', WebpackAsyncBlockBuilder)

        this.nav.init()
        this.startingBlocks.boot()
    }

    // Require all svg
    loadSvg (r) {
        r.keys().forEach(r)
    }

    /**
     * Config
     */
    initConfig () {
        this.setIsIE()

        /** Tracks errors with Analytics **/
        gaTrackErrors()
    }

    /**
     * IE Test
     */
    setIsIE () {
        if (navigator.userAgent.indexOf('MSIE') >= 0 ||
            navigator.userAgent.indexOf('Trident') >= 0) {
            document.body.classList.add('ie-browser')
        }
    }

    /**
     * Log credits
     */
    setCredits () {
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
    }
}
