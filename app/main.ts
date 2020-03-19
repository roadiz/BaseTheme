/**
 * Copyright © 2020, Rezo Zero
 *
 * @file main.ts
 * @author Adrien Scholaert
 */

// Import style
import './scss/application.scss'

// Import some utils
import './utils/passive-supported'
import './utils/register-service-worker'
import './utils/register-svg'

// GSAP
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import CSSPlugin from 'gsap/CSSPlugin'

// Import main app
import Application from './Application'
import Router from '~/Router'

gsap.registerPlugin(ScrollToPlugin, CSSPlugin)

const initApp = (): void => {
    const appId = 'basetheme'

    // Create router
    window.router = new Router()
    window.router.init()

    // Mount the app
    window.app = new Application({
        el: `#${appId}`
    })

    // Dynamic imports (lazysizes, instant.page)
    import(/* webpackChunkName: "lazysizes" */ 'lazysizes' as any)
    // TODO: Check conflict with workbox-sw
    // import(/* webpackChunkName: "instant-page" */ 'instant.page' as any)
}

const checkReadyState = (): void => {
    if (document.readyState === 'interactive' && !window.appInitiated) {
        window.appInitiated = true
        initApp()
    }
}

document.addEventListener('readystatechange', () => {
    checkReadyState()
})

checkReadyState()
