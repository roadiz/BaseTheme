import { getViewportSize, ViewPortSize } from './Utils'

/**
 * Static class to get bootstrap breakpoints.
 */
export default class BootstrapMedia {
    private static instance: BootstrapMedia
    private viewportSize: ViewPortSize = getViewportSize()
    private breakpoints: object = {
        xs: 0,
        sm: 544,
        md: 768,
        lg: 992,
        xl: 1280
    }

    private constructor () {
        // Bind methods
        this.setValues = this.setValues.bind(this)

        window.addEventListener('resize', this.setValues)
    }

    static getInstance () {
        if (!BootstrapMedia.instance) {
            BootstrapMedia.instance = new BootstrapMedia()
        }

        return BootstrapMedia.instance
    }

    private setValues () {
        this.viewportSize = getViewportSize()
    }

    public isMin (breakpoint): boolean {
        if (!this.breakpoints[breakpoint]) {
            const errorMessage = `Breakpoint '${breakpoint}' do not exist`
            console.error(errorMessage)
            throw new Error(errorMessage)
        }

        return this.viewportSize.width >= this.breakpoints[breakpoint]
    }

    public only (breakpoint): boolean {
        if (!this.breakpoints[breakpoint]) {
            const errorMessage = `Breakpoint '${breakpoint}' do not exist`
            console.error(errorMessage)
            throw new Error(errorMessage)
        }

        let keys = Object.keys(this.breakpoints)
        let nextIndex = keys.indexOf(breakpoint) + 1
        let nextItem = keys[nextIndex]

        if (nextItem) {
            return this.viewportSize.width >= this.breakpoints[breakpoint] && this.viewportSize.width < this.breakpoints[nextItem]
        }

        return this.viewportSize.width >= this.breakpoints[breakpoint]
    }
}
