/**
 * Copyright REZO ZERO 2016
 *
 * @file nav.js
 * @copyright REZO ZERO 2016
 * @author Ambroise Maupate
 */
import $ from 'jquery';
import {AbstractNav} from 'abstract-nav';

export class Nav extends AbstractNav {
    constructor() {
        super();

        this.$cont = $('#nav');
        this.$links = this.$cont.find('a').not('[target="_blank"]');
    }

    initEvents(router) {
        super.initEvents(router);
        if (router.options.ajaxEnabled) {
            this.$links.on('click', router.onLinkClick.bind(router));
        }
    }
}
