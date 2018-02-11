/**
 * Copyright © 2017, Rezo Zero
 *
 * @file Nav.js
 * @author Ambroise Maupate
 */
import $ from 'jquery'
import {
    Utils,
    BootstrapMedia,
    debounce
} from 'starting-blocks'
import { TweenLite } from 'gsap'

/**
 *
 */
export default class Nav {
    constructor () {
        this.$cont = $('#nav')
        this.$list = $('#nav-list')
        this.$item = this.$list.find('.nav-item')
        this.$link = this.$list.find('.nav-link')
        this.$btn = $('#nav-btn')
        this.$overlay = $('#nav-overlay')
        this.minifyLimit = BootstrapMedia.isMinMD() ? 165 : 50
        this.opened = false
    }

    /**
     *
     * @param {Router} router
     */
    initEvents (router) {
        this.$btn.on('click', this.btnClick.bind(this))
        this.$overlay.on('click', this.close.bind(this))

        window.addEventListener('scroll', this.onScroll.bind(this))
        window.addEventListener('resize', debounce(this.onResize.bind(this), 100, false))
    }

    /**
     * Update navigation state against a DOM container.
     *
     * @abstract
     * @param {AbstractPage} page
     */
    update (page) {
        /*
         * Remove active link on previous page.
         */
        this.$item.removeClass('active')
        this.$link.removeClass('active')

        /*
         * Add active on new page.
         */
        const $currentItem = $('#nav-item-' + page.name)
        if ($currentItem.length) {
            const $currentLink = $currentItem.find('.nav-link').eq(0)

            $currentLink.addClass('active')
            $currentItem.addClass('active')
        }
        this.close()
    }

    destroyEvents (router) {
        this.$btn.off('click', this.btnClick.bind(this))
        this.$overlay.off('click', this.close.bind(this))

        window.removeEventListener('scroll', this.onScroll.bind(this))
        window.removeEventListener('resize', debounce(this.onResize.bind(this), 100, false))
    }

    /**
     * Scroll
     */
    onScroll () {
        if (window.scrollY > this.minifyLimit) {
            if (!this.minified) this.minify()
        } else {
            if (this.minified) this.unminify()
        }
    }

    minify () {
        Utils.addClass(document.body, 'nav-minified')
        this.minified = true
    }

    unminify () {
        Utils.removeClass(document.body, 'nav-minified')
        this.minified = false
    }

    /**
     * Btn click
     */
    btnClick () {
        if (!BootstrapMedia.isMinSM()) {
            if (!this.opened) this.open()
            else this.close()
        }
    }

    open () {
        if (!BootstrapMedia.isMinSM() && !this.opened) {
            this.$cont[0].style.display = 'block'
            TweenLite.fromTo(this.$cont, 0.5, {xPercent: -100}, {xPercent: 0})

            this.$overlay[0].style.display = 'block'
            TweenLite.to(this.$overlay, 1.2, {opacity: 1})

            this.opened = true
        }
    }

    close () {
        if (!BootstrapMedia.isMinSM() && this.opened) {
            TweenLite.to(this.$cont, 0.5, {xPercent: -100,
                onComplete: () => {
                    if (!this.opened) this.$cont[0].style.display = 'none'
                }})

            TweenLite.to(this.$overlay, 1.2, {opacity: 0,
                onComplete: () => {
                    this.$overlay[0].style.display = 'none'
                }})

            this.opened = false
        }
    }

    onResize () {
        if (BootstrapMedia.isMinSM()) {
            this.$cont[0].style.display = ''
            this.$cont[0].style.transform = ''
            this.$overlay[0].style.display = ''
            this.opened = false
        }
    }
}
