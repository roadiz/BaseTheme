/**
 * Copyright © 2017, Rezo Zero
 *
 * @file nav.js
 * @author Ambroise Maupate
 */
import $ from 'jquery';
import log from "loglevel";
import {Utils, BootstrapMedia, debounce, AbstractNav} from "starting-blocks";
import TweenLite from "TweenLite";
import CSSPlugin from "CSSPlugin";

/**
 *
 */
export default class Nav extends AbstractNav {
    constructor() {
        super();

        this.$cont = $('#nav');
        this.$list = $('#nav-list');
        this.$item = this.$list.find('.nav-item');
        this.$link = this.$list.find('.nav-link');
        this.$links = this.$cont.find('a').not('[target="_blank"]');

        this.$btn = $('#nav-btn');
        this.$overlay = $('#nav-overlay');

        this.minifyLimit = BootstrapMedia.isMinMD() ? 165 : 50;

        this.opened = false;
    }

    initEvents(router) {
        super.initEvents(router);

        if (router.options.ajaxEnabled) {
            this.$links.on('click', router.onLinkClick.bind(router));
        }

        this.$btn.on('click', this.btnClick.bind(this));
        this.$overlay.on('click', this.close.bind(this));

        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('resize', debounce(this.onResize.bind(this), 100, false));
    }

    /**
     * Update navigation state against a DOM container.
     *
     * @abstract
     * @param {AbstractPage} page
     */
    update(page) {
        /*
         * Remove active link on previous page.
         */
        if (this.page) {
            const $previousItem = $('#nav-item-' + this.page.name);
            if ($previousItem.length) {
                const $previousLink = $previousItem.find('.nav-link').eq(0);

                $previousLink.removeClass('active');
                $previousItem.removeClass('active');
            }
        }

        super.update(page);

        /*
         * Add active on new page.
         */
        const $currentItem = $('#nav-item-' + page.name);
        if ($currentItem.length) {
            const $currentLink = $currentItem.find('.nav-link').eq(0);

            $currentLink.addClass('active');
            $currentItem.addClass('active');
        }
        this.close();
    }

    destroyEvents(router) {
        super.destroyEvents(router);

        if (router.options.ajaxEnabled) {
            this.$links.off('click', router.onLinkClick.bind(router));
        }

        this.$btn.off('click', this.btnClick.bind(this));
        this.$overlay.off('click', this.close.bind(this));

        window.removeEventListener('scroll', this.onScroll.bind(this));
        window.removeEventListener('resize', debounce(this.onResize.bind(this), 100, false));
    }

    /**
     * Scroll
     */
    onScroll(e) {
        if(window.scrollY > this.minifyLimit){
            if(!this.minified) this.minify();
        }
        else{
            if(this.minified) this.unminify();
        }
    }

    minify() {
        Utils.addClass(document.body, 'nav-minified');
        this.minified = true;
    }

    unminify() {
        Utils.removeClass(document.body, 'nav-minified');
        this.minified = false;
    }


    /**
     * Btn click
     */
    btnClick(e) {
        if(!BootstrapMedia.isMinSM()) {
            if(!this.opened) this.open();
            else this.close();
        }
    }

    open() {
        if(!BootstrapMedia.isMinSM() && !this.opened){

            this.$cont[0].style.display = 'block';
            TweenLite.fromTo(this.$cont, 0.5, {xPercent:-100}, {xPercent:0});

            this.$overlay[0].style.display = 'block';
            TweenLite.to(this.$overlay, 1.2, {opacity:1});

            this.opened = true;
        }
    }

    close() {
        if(!BootstrapMedia.isMinSM() && this.opened){
            TweenLite.to(this.$cont, 0.5, {xPercent:-100, onComplete: () => {
                if(!this.opened) this.$cont[0].style.display = 'none';
            }});

            TweenLite.to(this.$overlay, 1.2, {opacity:0, onComplete: () => {
                this.$overlay[0].style.display = 'none';
            }});

            this.opened = false;
        }
    }

    onResize() {
        if(BootstrapMedia.isMinSM()) {
            this.$cont[0].style.display = '';
            this.$cont[0].style.transform = '';
            this.$overlay[0].style.display = '';
            this.opened = false;
        }
    }
}
