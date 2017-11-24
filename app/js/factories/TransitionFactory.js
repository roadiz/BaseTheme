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
 * @file TransitionFactory.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import DefaultTransition from '../transitions/DefaultTransition'
import FadeTransition from '../transitions/FadeTransition'

/**
 * Transition mapper class.
 * This class maps your `data-transition` with your *ES6* classes.
 */
export default class TransitionFactory {
    /**
     * Get Transition
     *
     * @param {Object} previousState
     * @param {Object} state
     * @param {String} direction ('back' or 'forward')
     * @returns {AbstractTransition}
     */
    getTransition (previousState, state, direction = null) {
        let transition

        switch (state.transitionName) {
        case 'fade':
            transition = new FadeTransition()
            break
        default:
            transition = new DefaultTransition()
            break
        }

        return transition
    }
}
