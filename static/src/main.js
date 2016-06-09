import $ from "jquery";
import TweenMax from "TweenMax";
import isMobile from "isMobile";
import {Utils} from "utils/utils";
import {polyfills} from "utils/polyfills";
import {gaTrackErrors} from "utils/gaTrackErrors";
import {Nav} from "common/nav";
import {Router} from "router";
import {GraphicLoader} from "graphicLoader";
import {ClassFactory} from "class-factory";

/**
 * Set max log level (most verbose)
 * @see https://github.com/pimterry/loglevel
 */
log.setLevel(0);

/**
 * Set default Tween ease
 */
TweenLite.defaultEase = Expo.easeOut;

/**
 * Log credits
 */
// Utils.logCredits(
//     'BaseTheme',
//     '#fff',
//     [
//         { name:'Rezo Zero', website:'www.rezo-zero.com' }
//     ],
//     [
//         { name:'roadiz', website:'www.roadiz.io' },
//         { name:'GSAP', website:'www.greensock.com' }
//     ],
//     '#000'
// );

/*
 * Declare polyfills
 */
polyfills();

/**
 * Tracks erros with Analytics
 */
gaTrackErrors();

/*
 * Define vars
 */
const $body = $('body');
const nodeType = $body[0].getAttribute('data-node-type') || 'page';
const dataHome = $body[0].getAttribute('data-is-home');
const bodyId = $body[0].id;
const isHome = (dataHome == '1') ? true : false;

/*
 * isMobile Test
 */
let deviceMobile = (isMobile.any === false) ? false : true;
if(deviceMobile) Utils.addClass($body[0],'is-mobile');
else Utils.addClass($body[0],'is-desktop');

/*
 * IE Test
 */
if(navigator.userAgent.indexOf('MSIE') >= 0 ||
    navigator.userAgent.indexOf('Trident') >= 0){
    Utils.addClass($body[0],'ie');
}

/**
 * Launch router
 */
const router = new Router(
    {
        homeHasClass: false,
        ajaxEnabled: true,
        pageClass:'page-container'
    },
    new ClassFactory(),
    // temp namespace is defined in your index.html
    temp.baseUrl,
    new GraphicLoader(),
    new Nav()
);
router.initEvents();
router.boot($('.page-container').eq(0), 'static', isHome);

