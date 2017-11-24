/*
 * Copyright (c) 2017. Ambroise Maupate and Julien Blanchet
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * N THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 *
 * @file FadeTransition.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import { AbstractTransition } from 'starting-blocks'
import { TweenLite } from 'gsap'

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
            TweenLite.to(this.oldContainer, 0.5, {
                alpha: 0,
                onComplete: resolve
            })
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

        TweenLite.to(this.newContainer, 0.5, {
            alpha: 1,
            onComplete: () => {
                this.done()
            }
        })
    }
}
