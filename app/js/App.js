/**
 * Copyright © 2017, Rezo Zero
 *
 * @file App.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import { gaTrackErrors, polyfills, Utils } from 'starting-blocks'
import { TweenLite } from 'gsap'
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
