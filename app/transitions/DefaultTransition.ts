import Application from '~/Application'
import CommonTransition from '~/transitions/CommonTransition'

// Default
export default class DefaultTransition extends CommonTransition {
    in ({ from, to, done }: any): void {
        // Reset Scroll
        window.scrollTo(0, 0)

        // Destroy old app
        window.app.$destroy()

        // Remove Old View
        from.remove()

        // Create new App
        window.app = new Application({
            el: to
        })

        done()
    }

    out ({ done }: any): void {
        done()
    }
}
