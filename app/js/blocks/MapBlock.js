/**
 * Copyright © 2017, Rezo Zero
 *
 * @file map-block.js
 * @author Ambroise Maupate
 */

import DefaultBlock from './DefaultBlock'
import loadGoogleMapsAPI from 'load-google-maps-api'

export default class MapBlock extends DefaultBlock {
    constructor (container) {
        super(container, 'MapBlock')

        // Elements
        this.map = null
        this.marker = null
        this.mapElement = null
    }

    init () {
        super.init()

        /** {HTMLElement} */
        this.mapElement = this.rootElement.querySelector('.mapblock-canvas')

        if (this.mapElement.length) {
            this.location = JSON.parse(this.mapElement.getAttribute('data-geoloc'))
            /*
             * Prevent loading googleMaps multiple times
             */
            if (MapBlock.googleMaps === null) {
                loadGoogleMapsAPI({
                    'key': window.temp.googleClientId,
                    'language': window.temp.locale
                }).then((googleMaps) => {
                    MapBlock.googleMaps = googleMaps
                    this.createMap()
                })
                .catch((err) => {
                    console.debug(err)
                })
            } else {
                this.createMap()
            }
        }
    }

    createMap () {
        if (MapBlock.googleMaps.Map && MapBlock.googleMaps.Marker) {
            this.map = new MapBlock.googleMaps.Map(this.mapElement, {
                center: this.location,
                zoom: this.location.zoom
            })
            this.marker = new MapBlock.googleMaps.Marker({
                position: this.location,
                map: this.map
            })
        }
    }
}

MapBlock.googleMaps = null
