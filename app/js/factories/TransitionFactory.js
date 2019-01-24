/**
 * Copyright © 2018, Rezo Zero
 *
 * @file TransitionFactory.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */
import DefaultTransition from '../transitions/DefaultTransition'
import FadeTransition from '../transitions/FadeTransition'
import { AbstractTransitionFactory } from 'starting-blocks'

/**
 * Transition mapper class.
 * This class maps your `data-transition` with your *ES6* classes.
 */
export default class TransitionFactory extends AbstractTransitionFactory {
    /**
     * Get Transition
     *
     * @param {Object} previousState
     * @param {Object} state
     * @returns {AbstractTransition}
     */
    getTransition (previousState, state) {
        /**
         * You can customise transition logic with the previousState and the new state
         *
         * Ex: when back or prev button its pressed we use FadeTransition
         */
        if (state && state.context === 'history') {
            return new FadeTransition()
        }

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
