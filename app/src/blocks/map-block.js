/**
 * Copyright © 2017, Rezo Zero
 *
 * @file map-block.js
 * @author Ambroise Maupate
 */
import log                from "loglevel";
import DefaultBlock       from "./default-block";
import Promise            from 'es6-promise';
import loadGoogleMapsAPI  from 'load-google-maps-api';

export default class MapBlock extends DefaultBlock {

    static googleMaps = null;

    init() {
        super.init();
        this.$mapCont = this.$cont.find('.mapblock-canvas').eq(0);

        if (this.$mapCont.length) {
            this.location = JSON.parse(this.$mapCont.attr('data-geoloc'));

            /*
             * Prevent loading googleMaps multiple times
             */
            if (null === MapBlock.googleMaps) {
                Promise.polyfill();
                loadGoogleMapsAPI({
                    'key': window.temp.googleClientId,
                    'language': window.temp.locale,
                }).then((googleMaps) => {
                    MapBlock.googleMaps = googleMaps;
                    this.createMap();
                })
                .catch((err) => {
                    log.debug(err);
                });
            } else {
                this.createMap();
            }
        }
    }

    initEvents() {
        super.initEvents();
    }

    destroyEvents() {
        super.destroyEvents();
    }

    createMap() {
        this.map = new MapBlock.googleMaps.Map(this.$mapCont.get(0), {
            center: this.location,
            zoom: this.location.zoom
        });

        this.marker = new MapBlock.googleMaps.Marker({
            position: this.location,
            map: this.map
        })
    }
}

