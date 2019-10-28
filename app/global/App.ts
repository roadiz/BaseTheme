import 'whatwg-fetch'
import './routing/instant-page'
import './polyfills/ArrayFrom'
import './polyfills/Assign'
import Router from './routing/Router'
import TweenLite from 'gsap/TweenLite'
import Highway from '@dogstudio/highway'
import { Power3 } from 'gsap/EasePack'
import { getPort } from '../utils/Utils'

// Transitions
import FadeTransition from './transitions/FadeTransition'

// Manual scroll
if ('scrollRestoration' in (window as any).history) {
    (window as any).history.scrollRestoration = 'manual'
}

export default class App {
    navLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.nav a')
    router: Highway.Core = null

    constructor () {
        // Bind methods
        this.update = this.update.bind(this)

        // Remove no-js class
        document.documentElement.classList.remove('no-js')

        // Bind foot note refs
        this.bindFootnoteRefs()

        // Check links
        this.checkLinks()

        this.router = new Router({
            transitions: {
                default: FadeTransition
            }
        })

        // Listen Events
        this.router.on('NAVIGATE_END', this.update)
    }

    private update ({ location }): void {
        // Change attributes
        if (location.href === (window as any).temp.homeUrl) {
            document.body.setAttribute('data-is-home', '1')
        } else {
            document.body.setAttribute('data-is-home', '')
        }

        // Check Active Links
        for (let i = 0; i < this.navLinks.length; i++) {
            const link = this.navLinks[i]

            // Clean class
            link.classList.remove('active')
            link.parentElement.classList.remove('active')

            // Active link
            if (link.href === location.href) {
                link.classList.add('active')
                link.parentElement.classList.add('active')
            }
        }

        // Send data to google analytics
        if (typeof (window as any).ga !== 'undefined') {
            console.debug('🚩 Push Analytics for: ' + (window as any).location.pathname)
            ;(window as any).ga('send', 'pageview', {
                'page': (window as any).location.pathname,
                'title': document.title
            })
        }

        // Bind foot note refs
        this.bindFootnoteRefs()

        // Check links
        this.checkLinks()

        // Check for images
        ;(window as any).lazySizes.loader.checkElems()
        ;(window as any).lazySizesConfig.loadMode = 2
    }

    private bindFootnoteRefs () {
        const els: Array<any> = [
            ...Array.from(document.querySelectorAll('.footnote-ref')),
            ...Array.from(document.querySelectorAll('.footnote-backref'))
        ]

        for (const el of els) {
            el.addEventListener('click', this.footerNoteRefClick.bind(this))
        }
    }

    private footerNoteRefClick (e: any) {
        e.preventDefault()

        const hash = e.currentTarget.hash
        const hashId = hash.substr(1)
        const target = document.getElementById(String(hashId))

        if (target !== null) {
            const offsetTop = target.getBoundingClientRect().top
            const scrollTop = (window as any).scrollY || document.documentElement.scrollTop || document.body.scrollTop
            const navHeight = 165
            const scrollY = offsetTop + scrollTop - navHeight

            TweenLite.to(window, 1, {
                scrollTo: {
                    y: scrollY
                },
                ease: Power3.easeInOut
            })
        }

        return false
    }

    checkLinks () {
        const linkEls: HTMLAnchorElement[] = Array.from(document.querySelectorAll('a'))

        for (const link of linkEls) {
            // If external link
            if (((window as any).location.protocol !== link.protocol ||
                (window as any).location.hostname !== link.hostname) ||
                getPort() !== getPort(link.port)) {
                link.setAttribute('target', '_blank')
                link.setAttribute('rel', 'noopener')
            }
        }
    }
}
