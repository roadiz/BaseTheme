// Import Highway
import Highway from '@dogstudio/highway'

// Fade
class FadeTransition extends Highway.Transition {
    in ({ from, done }) {
        // Reset Scroll
        window.scrollTo(0, 0)

        // Remove Old View
        from.remove()

        done()
    }

    out ({ done }) {
        done()
    }
}

export default FadeTransition
