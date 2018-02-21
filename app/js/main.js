/**
 * Copyright © 2017, Rezo Zero
 *
 * @file main.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import App from './App'
import '../scss/style.scss'

(() => {
    /** Create the app **/
    const app = new App() // eslint-disable-line
    app.init()
})()
