import { getViewportSize, ViewPortSize } from './utils'

interface Breakpoint {
    [key: string]: number
}

/**
 * Static class to get bootstrap breakpoints.
 */
export default class BootstrapMedia {
    private static instance: BootstrapMedia
    private viewportSize: ViewPortSize = getViewportSize()
    private readonly breakpoints: Breakpoint

    private constructor () {
        this.viewportSize = getViewportSize()
        this.breakpoints = {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 1024,
            xl: 1440,
            xxl: 1680
        }

        // Bind methods
        this.setValues = this.setValues.bind(this)

        window.addEventListener('resize', this.setValues, window.passiveSupported ? { passive: true } : false)
    }

    static getInstance (): BootstrapMedia {
        if (!BootstrapMedia.instance) {
            BootstrapMedia.instance = new BootstrapMedia()
        }

        return BootstrapMedia.instance
    }

    private setValues (): void {
        this.viewportSize = getViewportSize()
    }

    public isMin (breakpoint: any): boolean {
        if (!this.breakpoints[breakpoint]) {
            const errorMessage = `Breakpoint '${breakpoint}' do not exist`
            console.error(errorMessage)
            throw new Error(errorMessage)
        }

        return this.viewportSize.width >= this.breakpoints[breakpoint]
    }

    public isMobile (): boolean {
        return !this.isMin('lg')
    }

    public isDesktop (): boolean {
        return this.isMin('lg')
    }

    public only (breakpoint: string): boolean {
        if (!this.breakpoints[breakpoint]) {
            const errorMessage = `Breakpoint '${breakpoint}' do not exist`
            console.error(errorMessage)
            throw new Error(errorMessage)
        }

        const keys = Object.keys(this.breakpoints)
        const nextIndex = keys.indexOf(breakpoint) + 1
        const nextItem = keys[nextIndex]

        if (nextItem) {
            return this.viewportSize.width >= this.breakpoints[breakpoint] && this.viewportSize.width < this.breakpoints[nextItem]
        }

        return this.viewportSize.width >= this.breakpoints[breakpoint]
    }
}
