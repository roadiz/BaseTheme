// File: fade.ts
// Import Highway
import Highway from '@dogstudio/highway'

// GSAP Library
import TweenLite from 'gsap/TweenLite'

// Fade
class FadeTransition extends Highway.Transition {
    in ({ from, to, done }) {
        // Reset Scroll
        window.scrollTo(0, 0)

        // Remove Old View
        from.remove()

        // Animation
        TweenLite.fromTo(to, 0.25, {
            alpha: 0
        }, {
            alpha: 1,
            onComplete: done
        })
    }

    out ({ from, done }) {
        // Animation
        TweenLite.fromTo(from, 0.25, {
            alpha: 1
        }, {
            alpha: 0,
            onComplete: done
        })
    }
}

export default FadeTransition
