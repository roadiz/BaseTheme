/**
 * Copyright © 2017, Rezo Zero
 *
 * @file BasicBlock.js
 * @author Ambroise Maupate
 */

import DefaultBlock from './DefaultBlock'

export default class ContentBlock extends DefaultBlock {
    constructor (container) {
        super(container, 'ContentBlock')
    }

    async init () {
        await super.init()
    }

    initEvents () {
        super.initEvents()
    }

    destroyEvents () {
        super.destroyEvents()
    }
}
