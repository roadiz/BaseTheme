import Highway from '@dogstudio/highway'
import Application from '~/Application'
import gsap from 'gsap'
import EventBus from '~/utils/EventBus'
import { EVENTS } from '~/config/constants'

export default class CommonTransition extends Highway.Transition {
    animationComplete (newApp: Application, from: HTMLElement, done: Function): void {
        // Destroy old app
        window.app.$destroy()

        // Scroll to top and clear props
        gsap.set(window, { scrollTo: 0 })
        gsap.set(newApp.$el, { clearProps: 'all' })

        // Remove Old View
        from.remove()

        // Save new App
        window.app = newApp

        // Dispatch en event
        EventBus.$emit(EVENTS.TRANSITION_END)

        done()
    }
}
