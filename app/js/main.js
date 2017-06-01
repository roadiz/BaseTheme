/**
 * Copyright © 2017, Rezo Zero
 *
 * @file main.js
 * @author Ambroise Maupate
 */
import $ from 'jquery'
import log from 'loglevel'
import {polyfills, gaTrackErrors, Utils, Router, GraphicLoader} from 'starting-blocks'
import isMobile from 'ismobilejs/isMobile'
import Nav from './common/nav'
import ClassFactory from './ClassFactory'
import TweenLite from 'TweenLite'
import Expo from 'Expo'
import '../scss/style.scss'

/**
 * Set max log level (most verbose) 0 ---> 5
 * @see https://github.com/pimterry/loglevel
 */
if (window.temp.devMode === true) {
    log.setLevel(0)
} else {
    log.setLevel(5)
}

if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.host
}

/**
 * Set default Tween ease
 */
TweenLite.defaultEase = Expo.easeOut

/**
 * Log credits
 */
Utils.logCredits(
    'BaseTheme',
    '#fff',
    [
        { name: 'Rezo Zero', website: 'www.rezo-zero.com' }
    ],
    [
        { name: 'Roadiz', website: 'www.roadiz.io' },
        { name: 'GSAP', website: 'www.greensock.com' },
        { name: 'Starting Blocks', website: 'http://startingblocks.rezo-zero.com' }
    ],
    '#000'
)

/*
 * Declare polyfills
 */
polyfills()

/**
 * Tracks erros with Analytics
 */
gaTrackErrors()

/*
 * Define vars
 */
const $body = $('body')
const dataHome = $body[0].getAttribute('data-is-home')
const isHome = (dataHome === '1')

/*
 * isMobile Test
 */
let deviceMobile = (isMobile.any !== false)
if (deviceMobile) Utils.addClass($body[0], 'is-mobile')
else Utils.addClass($body[0], 'is-desktop')

/*
 * IE Test
 */
if (navigator.userAgent.indexOf('MSIE') >= 0 ||
    navigator.userAgent.indexOf('Trident') >= 0) {
    Utils.addClass($body[0], 'ie-browser')
}

/**
 * Launch router
 */
const router = new Router(
    {
        homeHasClass: false,
        ajaxEnabled: true,
        lazyloadEnabled: true,
        pageClass: 'page-container'
    },
    new ClassFactory(),
    window.location.origin,
    new GraphicLoader(),
    new Nav()
)
router.initEvents()
router.boot($('.page-container').eq(0), 'static', isHome)
