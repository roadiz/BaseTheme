/**
 * Copyright © 2017, Rezo Zero
 *
 * @file Nav.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

import {
    EventTypes
} from 'starting-blocks'

/**
 * Nav Class
 */
export default class Nav {
    constructor () {
        /**
         * @type {HTMLElement | null}
         */
        this.container = document.getElementById('nav-container')

        /**
         * @type {Array<HTMLElement>}
         */
        this.linkElements = [...this.container.querySelectorAll('a')]

        this.onAfterPageBoot = this.onAfterPageBoot.bind(this)
    }

    init () {
        this.initEvents()
    }

    initEvents () {
        window.addEventListener(EventTypes.AFTER_PAGE_BOOT, this.onAfterPageBoot)
    }

    onAfterPageBoot () {
        // Remove all active class
        for (const linkElement of this.linkElements) {
            linkElement.classList.remove('active')

            if (linkElement.href === window.location.href) {
                linkElement.classList.add('active')
            }
        }
    }
}
