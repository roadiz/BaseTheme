/**
 * Copyright © 2017, Rezo Zero
 *
 * @file FadeTransition.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import { AbstractTransition } from 'starting-blocks'
// import { TweenLite } from 'gsap'

/**
 * Fade Transition class example. Fade Out / Fade In content.
 *
 * @extends {AbstractTransition}
 */
export default class FadeTransition extends AbstractTransition {
    /**
     * Entry point of the animation
     * Automatically called on init()
     */
    start () {
        // Wait new content and the end of fadeOut animation
        // this.newContainerLoading is a Promise which is resolved when the new content is loaded
        Promise.all([this.newContainerLoading, this.fadeOut()])
        // then fadeIn the new content
            .then(this.fadeIn.bind(this))
    }

    /**
     * Fade out the old content.
     * @returns {Promise}
     */
    fadeOut () {
        return new Promise((resolve) => {
            // TweenLite.to(this.oldContainer, 0.5, {
            //     alpha: 0,
            //     onComplete: resolve
            // })
        })
    }

    /**
     * Fade in the new content
     */
    fadeIn () {
        // Remove old content from the DOM
        this.oldContainer.hide()

        // Prepare new content css properties for the fade animation
        this.newContainer.css({
            visibility: 'visible',
            opacity: 0
        })

        // Scroll top
        document.body.scrollTop = 0

        // TweenLite.to(this.newContainer, 0.5, {
        //     alpha: 1,
        //     onComplete: () => {
        //         this.done()
        //     }
        // })
    }
}
