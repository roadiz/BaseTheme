/**
 * Copyright © 2017, Rezo Zero
 *
 * @file DefaultBlock.js
 * @author Maxime Bérard
 */

import { AbstractBlock } from 'starting-blocks'

/**
 * Abstract class to do common actions on every blocks (like inView, etc.). Do not instanciate this class.
 */
export default class DefaultBlock extends AbstractBlock {
    init () {
        return super.init()
    }

    initEvents () {
        return super.initEvents()
    }

    destroy () {
        return super.destroy()
    }

    destroyEvents () {
        return super.destroyEvents()
    }

    onResize () {
        return super.onResize()
    }

    onPageReady () {
        return super.onPageReady()
    }
}
