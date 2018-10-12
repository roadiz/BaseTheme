/**
 * Copyright © 2017, Rezo Zero
 *
 * @file map-block.js
 * @author Ambroise Maupate
 */

import DefaultBlock from './DefaultBlock'
import loadGoogleMapsAPI from 'load-google-maps-api'

export default class MapBlock extends DefaultBlock {
    init () {
        super.init()

        this.mapContainer = this.container.querySelector('.mapblock-canvas')

        if (this.mapContainer) {
            this.location = JSON.parse(this.mapContainer.getAttribute('data-geoloc'))

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

    initEvents () {
        super.initEvents()
    }

    destroyEvents () {
        super.destroyEvents()
    }

    createMap () {
        this.map = new MapBlock.googleMaps.Map(this.mapContainer, {
            center: this.location,
            zoom: this.location.zoom
        })

        this.marker = new MapBlock.googleMaps.Marker({
            position: this.location,
            map: this.map
        })
    }
}

MapBlock.googleMaps = null
