/**
 * Copyright © 2017, Rezo Zero
 *
 * @file map-block.js
 * @author Ambroise Maupate
 */

import DefaultBlock from './DefaultBlock'

export default class MapBlock extends DefaultBlock {
    constructor (container) {
        super(container, 'MapBlock')

        // Elements
        this.map = null
        this.marker = null
        this.mapElement = null
    }

    async init () {
        await super.init()

        /** {HTMLElement} */
        this.mapElement = this.rootElement.querySelector('.mapblock-canvas')

        if (this.mapElement.length) {
            this.location = JSON.parse(this.mapElement.getAttribute('data-geoloc'))
        }
    }
}
