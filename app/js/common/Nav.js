/**
 * Copyright © 2017, Rezo Zero
 *
 * @file Nav.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

import {
    BootstrapMedia,
    debounce,
    EventTypes
} from 'starting-blocks'
import { TweenLite, Power3 } from 'gsap/all'

/**
 * Nav Class
 */
export default class Nav {
    constructor () {
        /**
         * @type {HTMLElement}
         */
        this.container = document.getElementById('nav')

        /**
         * @type {HTMLElement}
         */
        this.list = document.getElementById('nav-list')

        /**
         * @type {NodeListOf<Element>}
         */
        this.items = this.list.querySelectorAll('.nav-item')

        /**
         * @type {NodeListOf<Element>}
         */
        this.links = this.list.querySelectorAll('.nav-link')

        /**
         * @type {HTMLElement}
         */
        this.btn = document.getElementById('nav-btn')

        /**
         * @type {HTMLElement}
         */
        this.overlay = document.getElementById('nav-overlay')

        // Values
        this.bootstrapMedia = new BootstrapMedia()
        this.minifyLimit = this.bootstrapMedia.isMin('md') ? 165 : 50
        this.opened = false
        this.windowWidth = window.innerWidth

        // Bind methods
        this.btnClick = this.btnClick.bind(this)
        this.close = this.close.bind(this)
        this.onScroll = this.onScroll.bind(this)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
    }

    init () {
        this.initEvents()
    }

    initEvents () {
        this.btn.addEventListener('click', this.btnClick)
        this.overlay.addEventListener('click', this.close)
        window.addEventListener(EventTypes.AFTER_PAGE_BOOT, this.update)
        window.addEventListener('scroll', this.onScroll, window.passiveSupported ? { passive: true } : false)
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
        for (let i = 0, l = this.items.length; i < l; i++) {
            this.items[i].classList.remove('active')
        }

        for (let i = 0, l = this.links.length; i < l; i++) {
            this.links[i].classList.remove('active')
        }

        // Add active on new page.
        const currentItem = document.getElementById(`nav-item-${page.name}`)

        if (currentItem) {
            const currentLink = currentItem.querySelector('.nav-link')

            if (currentLink) {
                currentLink.classList.add('active')
                currentItem.classList.add('active')
            }
        }

        this.close()
    }

    /**
     * Scroll
     */
    onScroll () {
        if (window.scrollY > this.minifyLimit) {
            if (!this.minified) {
                this.minify()
            }
        } else {
            if (this.minified) {
                this.unminify()
            }
        }
    }

    minify () {
        document.body.classList.add('nav-minified')
        this.minified = true
    }

    unminify () {
        document.body.classList.remove('nav-minified')
        this.minified = false
    }

    /**
     * Btn click
     */
    btnClick () {
        if (!this.bootstrapMedia.isMin('sm')) {
            if (!this.opened) {
                this.open()
            } else {
                this.close()
            }
        }
    }

    open () {
        if (!this.bootstrapMedia.isMin('sm') && !this.opened) {
            this.container.style.display = 'block'

            TweenLite.to(this.container, 0.5, {
                x: 0,
                ease: Power3.easeOut
            })

            TweenLite.to(this.overlay, 0.5, {
                autoAlpha: 1,
                pointerEvents: 'auto'
            })

            this.opened = true
        }
    }

    close () {
        if (!this.bootstrapMedia.isMin('sm') && this.opened) {
            TweenLite.to(this.container, 0.5, {
                x: -this.windowWidth * 0.8,
                ease: Power3.easeOut,
                onComplete: () => {
                    if (!this.opened) {
                        this.container.style.display = 'none'
                    }
                }
            })

            TweenLite.to(this.overlay, 1.2, {
                alpha: 0,
                pointerEvents: 'none'
            })

            this.opened = false
        }
    }

    onResize () {
        this.windowWidth = window.innerWidth

        if (this.bootstrapMedia.isMin('xs')) {
            this.container.style.display = ''
            this.container.style.transform = ''
            this.overlay.style.opacity = ''
            this.overlay.style.pointerEvents = ''
            this.opened = false
        }
    }
}
