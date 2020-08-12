import Highway from '@dogstudio/highway'

// Transitions
import DefaultTransition from '~/transitions/DefaultTransition'

export default class Router {
    public links: NodeList | [] = []
    private highway: Highway.Core

    constructor () {
        this.highway = new Highway.Core({
            transitions: {
                default: DefaultTransition,
                contextual: {}
            }
        })

        // this.onNavigateIn = this.onNavigateIn.bind(this)
        this.onNavigateOut = this.onNavigateOut.bind(this)
        // this.onNavigateEnd = this.onNavigateEnd.bind(this)
    }

    init (): void {
        // this.highway.on('NAVIGATE_IN', this.onNavigateIn)
        this.highway.on('NAVIGATE_OUT', this.onNavigateOut)
        this.highway.on('NAVIGATE_END', this.onNavigateEnd)
    }

    // onNavigateIn ({ to, trigger, location }: any) {}

    onNavigateOut ({ from }: any): void {
        if (!window.refererFixed && !from.view.getAttribute('data-context')) {
            window.referer = from.page.URL
        }
    }

    // onNavigateEnd ({ to, from, trigger, location }: any) {}

    /**
     * Send page view to any existing trackers
     */
    onNavigateEnd (): void {
        if (window.ga) {
            window.ga('send', 'pageview')
        }

        if (window._paq) {
            window._paq.push(['trackPageView'])
        }
    }

    attach (links: Array<Element>|NodeList): void {
        this.highway.attach(links)
    }

    detach (links: Array<Element>|NodeList): void {
        this.highway.detach(links)
    }
}
