/**
 * Copyright © 2017, Rezo Zero
 *
 * @file App.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import * as log from 'loglevel'
import { gaTrackErrors, polyfills, Utils } from 'starting-blocks'
import { Expo, TweenLite } from 'gsap'
import AppRouter from './Router'
import Nav from './common/Nav'

/**
 * App entry.
 */
export default class App {
    constructor () {
        this.devMode = window.temp.devMode
        this.$body = document.getElementsByTagName('body')[0]
        this.dataHome = this.$body.getAttribute('data-is-home')
        this.isHome = (this.dataHome === '1')
        this.router = AppRouter
        this.nav = new Nav()
    }

    init () {
        this.loadSvg(require.context('../svg/', true, /\.svg$/))
        this.setCredits()
        this.initConfig()
        // Start app router.
        this.nav.init()
        this.router.init()
    }

    // Require all svg
    loadSvg (r) {
        r.keys().forEach(r)
    }

    /**
     * Config
     */
    initConfig () {
        this.setLogLevel()
        this.setIsIE()

        /** Declare polyfills **/
        polyfills()

        /** Tracks errors with Analytics **/
        gaTrackErrors()

        /** Set default Tween ease **/
        TweenLite.defaultEase = Expo.easeOut
    }

    /**
     * IE Test
     */
    setIsIE () {
        if (navigator.userAgent.indexOf('MSIE') >= 0 ||
            navigator.userAgent.indexOf('Trident') >= 0) {
            Utils.addClass(this.$body, 'ie-browser')
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

    /**
     * Set max log level (most verbose) 0 ---> 5
     * @see https://github.com/pimterry/loglevel
     */
    setLogLevel () {
        if (this.devMode === true) {
            log.setLevel(0)
        } else {
            log.setLevel(5)
        }
    }
}
