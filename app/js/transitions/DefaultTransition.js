/**
 * Copyright © 2017, Rezo Zero
 *
 * @file DefaultTransition.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import { AbstractTransition } from 'starting-blocks'

/**
 * Default Transition. Show / Hide content.
 *
 * @extends {AbstractTransition}
 */
export default class DefaultTransition extends AbstractTransition {
    start () {
        Promise.all([this.newPageLoading])
            .then(this.finish.bind(this))
    }

    finish () {
        // Scroll top
        document.body.scrollTop = 0

        this.done()
    }
}
