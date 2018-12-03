/**
 * Copyright © 2017, Rezo Zero
 *
 * @file main.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import '../scss/style.scss'
import App from './App'

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
    /** Create the app **/
    const app = new App()
    app.init()
})()
