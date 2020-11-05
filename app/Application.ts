import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import EventBus from './utils/EventBus'
import { EVENTS } from '~/config/constants'
import store from './store'
import raf from 'raf'
import { Action } from 'vuex-class'
import gsap, { Power2 } from 'gsap'
import BootstrapMedia from '~/utils/BootstrapMedia'
import { getViewportSize } from '~/utils/utils'

// Components

// Import VueJS filters
import './filters/filters'

// Config vue
Vue.config.productionTip = false
Vue.prototype.$resourcesUrl = window.temp.resourcesUrl
Vue.prototype.$translations = window.translations

const namespace = 'ui'

@Component({
    delimiters: ['${', '}'], // Change default delimiter for twig files
    store,
    components: {
        ContactForm: (): Promise<any> => import(/* webpackChunkName: "async-contact-form" */'./components/Form/ContactForm')
    }
})
export default class Application extends Vue {
    @Action('setNavOpen', { namespace }) setNavOpen!: Function
    @Action('setNavMinify', { namespace }) setNavMinify!: Function

    public scrollY!: number
    private rafId!: number
    private ticking!: boolean
    private root!: HTMLElement
    private minifyPosY!: number

    created (): void {
        this.root = document.documentElement
        this.ticking = false
        this.scrollY = window.pageYOffset
        this.minifyPosY = this.getMinifyLimit()

        this.setNavOpen(false)

        window.addEventListener('resize', this.onResize, window.passiveSupported ? { passive: true } : false)
        window.addEventListener('keydown', this.onKeyDown, window.passiveSupported ? { passive: true } : false)
        window.addEventListener('scroll', this.onScroll, window.passiveSupported ? { passive: true } : false)

        EventBus.$on(EVENTS.NAVIGATION_MOUNTED, this.refreshLinks)
    }

    beforeDestroy (): void {
        window.removeEventListener('resize', this.onResize)
        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('scroll', this.onScroll)

        EventBus.$off(EVENTS.NAVIGATION_MOUNTED, this.refreshLinks)
    }

    mounted (): void {
        const closeBar = this.$el.querySelector('#close-bar')

        if (window.referer && window.referer !== '' && closeBar !== null) {
            closeBar.setAttribute('href', window.referer)
        } else {
            window.referer = ''
        }
    }

    refreshLinks (): void {
        if (window.router) {
            window.router.detach(window.router.links)
            window.router.attach(document.querySelectorAll('a:not([target]):not([data-router-disabled])'))
        }
    }

    update (): void {
        // reset the tick so we can
        // capture the next onScroll
        this.ticking = false
        this.root.style.setProperty('--scroll-y', `${this.scrollY}px`)
        this.setNavMinify(this.scrollY > this.minifyPosY)
    }

    requestTick (): void {
        if (!this.ticking) {
            this.rafId = raf(this.update)
        }

        this.ticking = true
    }

    onResize (): void {
        this.minifyPosY = this.getMinifyLimit()
        EventBus.$emit(EVENTS.WINDOW_RESIZE)
    }

    onScroll (): void {
        this.scrollY = window.pageYOffset
        this.requestTick()
    }

    onKeyDown (e: KeyboardEvent): void {
        if (e.key === 'Escape') {
            EventBus.$emit(EVENTS.KEY_UP_ESCAPE)
            // TODO: call store action to close ui components like  the Navigation or the Search
        }
    }

    getMinifyLimit (): number {
        if (BootstrapMedia.getInstance().isMin('lg')) {
            return getViewportSize().height / 2
        }

        return 120
    }

    reachTop (): void {
        gsap.to(window, {
            duration: 1.2,
            scrollTo: 0,
            ease: Power2.easeOut
        })
    }
}
