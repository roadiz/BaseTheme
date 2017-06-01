/**
 * Copyright © 2017, Rezo Zero
 *
 * @file ClassFactory.js
 * @author Ambroise Maupate
 */
import log from 'loglevel'
import Page from './pages/page'
import Home from './pages/home'
import ContactBlock from './blocks/ContactBlock'
import BasicBlock from './blocks/BasicBlock'
import MapBlock from './blocks/MapBlock'

/**
 * This class need to be redefined for each of your projects.
 */
export default class ClassFactory {
    /**
     * Returns an AbstractPage child class instance
     * according to the nodeTypeName or an AbstractPage as default.
     *
     * @param  {String}  nodeTypeName
     * @param  {Router}  router
     * @param  {jQuery}  $cont
     * @param  {String}  context
     * @param  {String}  nodeType
     * @param  {Boolean} isHome
     * @return {AbstractPage}
     */
    getPageInstance (nodeTypeName, router, $cont, context, nodeType, isHome) {
        switch (nodeTypeName) {
        case 'home':
            return new Home(router, $cont, context, nodeType, isHome)
        default:
            log.info('"' + nodeTypeName + '" has no defined route, using Page.')
            return new Page(router, $cont, context, nodeType, isHome)
        }
    }

    /**
     * Returns an AbstractBlock child class instance
     * according to the nodeTypeName or an AbstractBlock as default.
     *
     * @param  {String}  nodeTypeName
     * @param  {AbstractPage} page
     * @param  {jQuery}  $cont
     * @return {AbstractBlock}
     */
    getBlockInstance (nodeTypeName, page, $cont) {
        switch (nodeTypeName) {
        case 'contactblock':
            return new ContactBlock(page, $cont, nodeTypeName)
        case 'mapblock':
            return new MapBlock(page, $cont, nodeTypeName)
        case 'basicblock':
            return new BasicBlock(page, $cont, nodeTypeName)
        default:
                /* log.info('    "' + nodeTypeName + '" has no defined route, using AbstractBlock.');
                return new AbstractBlock(page, $cont, nodeTypeName); */
        }
    }
}
