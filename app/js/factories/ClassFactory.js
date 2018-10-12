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
 * @file ClassFactory.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 *
 */

import Page from '../pages/Page'
import Home from '../pages/Home'

/**
 * This class need to be redefined for each of your projects.
 */
export default class ClassFactory {
    /**
     * Returns an AbstractPage child class instance
     * according to the nodeTypeName or an AbstractPage as default.
     *
     * @param  {Router}  router
     * @param  {HTMLElement}  container
     * @param  {String}  context
     * @param  {String}  nodeType
     * @return {AbstractPage}
     */
    getPageInstance (router, container, context, nodeType) {
        switch (nodeType.toLowerCase()) {
        case 'home':
            return new Home(router, container, context, nodeType)
        default:
            console.info('"' + nodeType + '" has no defined route, using Page.')
            return new Page(router, container, context, nodeType)
        }
    }

    /**
     * Returns an AbstractBlock child class instance
     * according to the nodeTypeName or an AbstractBlock as default.
     *
     * @param  {AbstractPage} page
     * @param  {HTMLElement}  container
     * @param  {String}  nodeType
     * @return {AbstractBlock}
     */
    async getBlockInstance (page, container, nodeType) {
        try {
            const Block = await this.getModule(nodeType)
            return new Block(page, container, nodeType)
        } catch (e) {
            console.error(e.message)
        }

        // Standard import
        // switch (nodeType.toLowerCase()) {
        // case 'contactblock':
        //     return new ContactBlock(page, $cont, nodeType)
        // case 'mapblock':
        //     return new MapBlock(page, $cont, nodeType)
        // case 'basicblock':
        //     return new BasicBlock(page, $cont, nodeType)
        // default:
        //     console.info('    "' + nodeTypeName + '" has no defined route, using AbstractBlock.')
        //     return new AbstractBlock(page, $cont, nodeType)
        // }
    }

    async getModule (moduleName) {
        return import(`../blocks/${moduleName}` /* webpackChunkName: "block-" */)
            .then(block => {
                return block.default
            })
    }
}
