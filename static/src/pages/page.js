/**
 * Copyright © 2016, Ambroise Maupate
 *
 * @file page.js
 * @copyright REZO ZERO 2016
 * @author Ambroise Maupate
 */

import {AbstractPage} from "abstract-page";

export class Page extends AbstractPage {
    constructor(router, id, context, type, isHome){
        super(router, id, context, type, isHome);
    }
}
