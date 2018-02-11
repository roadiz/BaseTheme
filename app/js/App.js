/*
 * Copyright (c) 2017. Ambroise Maupate and Julien Blanchet
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * N THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 *
 * @file App.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import * as log from 'loglevel'
import {gaTrackErrors, polyfills, Utils} from 'starting-blocks'
import {Expo, TweenLite} from 'gsap'
import AppRouter from './Router'

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
    }

    init () {
        this.setCredits()
        this.initConfig()
        // Start app router.
        this.router.init()
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