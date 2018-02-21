/**
 * Copyright © 2017, Rezo Zero
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
