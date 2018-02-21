/**
 * Copyright © 2017, Rezo Zero
 *
 * @file Router.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import { GraphicLoader, Router } from 'starting-blocks'
import ClassFactory from './factories/ClassFactory'
import TransitionFactory from './factories/TransitionFactory'

const routerOptions = {
    ajaxEnabled: true,
    useCache: false,
    lazyloadEnabled: true,
    ajaxWrapperId: 'main-container',
    classFactory: new ClassFactory(),
    graphicLoader: new GraphicLoader(),
    transitionFactory: new TransitionFactory()
}

/**
 * App Router class. Extends base Router.
 * @extends {Router}
 */
class AppRouter extends Router {

}

export default new AppRouter(routerOptions)
