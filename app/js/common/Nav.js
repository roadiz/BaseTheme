/**
 * Copyright © 2017, Rezo Zero
 *
 * @file Nav.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

import $ from 'jquery'
import {
    Utils,
    BootstrapMedia,
    debounce,
    EventTypes
} from 'starting-blocks'
import { TweenLite } from 'gsap'

/**
 * Nav Class
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

        this.btnClick = this.btnClick.bind(this)
        this.close = this.close.bind(this)
        this.onScroll = this.onScroll.bind(this)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
    }

    init () {
        this.initEvents()
    }

    /**
     *
     * @param {Router} router
     */
    initEvents (router) {
        this.$btn.on('click', this.btnClick)
        this.$overlay.on('click', this.close)
        window.addEventListener(EventTypes.AFTER_PAGE_BOOT, this.update)
        window.addEventListener('scroll', this.onScroll)
        window.addEventListener('resize', debounce(this.onResize, 100, false))
    }

    /**
     * Update navigation state against a DOM container.
     *
     * @abstract
     * @param {CustomEvent} e
     */
    update (e) {
        /**
         * @type {AbstractPage}
         */
        const page = e.detail

        // Remove active link on previous page.
        this.$item.removeClass('active')
        this.$link.removeClass('active')

        // Add active on new page.
        const $currentItem = $('#nav-item-' + page.name)
        if ($currentItem.length) {
            const $currentLink = $currentItem.find('.nav-link').eq(0)

            $currentLink.addClass('active')
            $currentItem.addClass('active')
        }
        this.close()
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
            TweenLite.fromTo(this.$cont, 0.5, { xPercent: -100 }, { xPercent: 0 })

            this.$overlay[0].style.display = 'block'
            TweenLite.to(this.$overlay, 1.2, { opacity: 1 })

            this.opened = true
        }
    }

    close () {
        if (!BootstrapMedia.isMinSM() && this.opened) {
            TweenLite.to(this.$cont, 0.5, { xPercent: -100,
                onComplete: () => {
                    if (!this.opened) this.$cont[0].style.display = 'none'
                } })

            TweenLite.to(this.$overlay, 1.2, { opacity: 0,
                onComplete: () => {
                    this.$overlay[0].style.display = 'none'
                } })

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
