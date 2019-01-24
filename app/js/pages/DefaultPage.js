/**
 * Copyright © 2018, Rezo Zero
 *
 * @file DefaultPage.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
import { AbstractPage } from 'starting-blocks'

/**
 * Abstract class to do common actions on every pages (like custom lazyload actions, etc.). Do not instanciate this class.
 */
export default class DefaultPage extends AbstractPage {
    constructor (container) {
        super(container, 'DefaultPage')
    }
}
