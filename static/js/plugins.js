/*
 * ============================================================================
 * Plugins
 * ============================================================================
 */


/**
 * Check if an element is set.
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
var isset = function(element) {
    if (typeof(element) != "undefined") {
        return true;
    }
    return false;
};


/**
 * Debounce
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * http://davidwalsh.name/javascript-debounce-function
 *
 * @param  {[function]} func     [function to debounce]
 * @param  {[Number]} wait       [time to wait]
 * @param  {[boolean]} immediate []
 * @return {[type]}           [description]
 */
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


/**
 * Match CSS media queries and JavaScript window width.
 *
 * @see http://stackoverflow.com/a/11310353
 * @return Object
 */
var getViewportSize = function() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
};

/*
 * Bootstrap media queries breakpoints tests.
 */
var isMediaMinSM = function () {
    var size = getViewportSize();

    if (size.width >= 768) {
        return true;
    } else {
        return false;
    }
};
var isMediaMinMD = function () {
    var size = getViewportSize();

    if (size.width >= 992) {
        return true;
    } else {
        return false;
    }
};
var isMediaMinLG = function () {
    var size = getViewportSize();

    if (size.width >= 1200) {
        return true;
    } else {
        return false;
    }
};

/**
 * Request animation frame polyfill
 */
window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60); // 60fps
        }
    );
}();

window.cancelAnimFrame = function(){
    return (
        window.cancelAnimationFrame       ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame    ||
        window.oCancelAnimationFrame      ||
        window.msCancelAnimationFrame     ||
        function(id){
            window.clearTimeout(id);
        }
    );
}();

/**
 * Add class custom.
 * @param  {[object]} el                [dom element]
 * @param  {[string]} classToAdd        [class to add]
 * @return {[type]}                     [description]
 */
var addClass = function(el, classToAdd){

    if (el.classList) el.classList.add(classToAdd);
    else el.className += ' ' + classToAdd;
};

/**
 * Remove class custom.
 * @param  {[object]} el                [dom element]
 * @param  {[string]} classToRemove     [class to remove]
 * @return {[type]}                     [description]
 */
var removeClass = function(el, classToRemove){

    if(el.classList) el.classList.remove(classToRemove);
    else{
        el.className = el.className.replace(new RegExp('(^|\\b)' + classToRemove.split(' ').join('|') + '(\\b|$)', 'gi'), '');

        var posLastCar = el.className.length-1;
        if(el.className[posLastCar] == ' ') el.className = el.className.substring(0, posLastCar);
    }
};

/**
 * Get random number.
 * @param  {[number]} min [min value]
 * @param  {[number]} max [max value]
 * @param  {[decimal]} decimal [decimal amount]
 * @return {[type]}     [description]
 */
function getRandomNumber(min, max, decimal) {
    var result = Math.random() * (max - min) + min;

    if(typeof decimal !== 'undefined'){
        return result.toFixed(decimal);
    }
    else return result;
}

/**
 * Get random integer.
 * @param  {[int]} min [min value]
 * @param  {[int]} max [max value]
 * @return {[type]}     [description]
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get style value
 * @param  {[jQuery element ]}  $el     [element to check]
 * @param  {[string]}           style   [description]
 * @return {[int]}                      [value]
 */
function getStyleVal($el, style){
    var elStyle = $el.css(style);
    return Math.round(Number(elStyle.substr(0, elStyle.length - 2)));
}

/**
 * Log credits
 * @param  {string} siteName
 * @param  {string} bgColor
 * @param  {array}  creditsList
 * @param  {array}  thanksList
 * @param  {string} textColor (optional)
 */
function logCredits(siteName, bgColor, creditsList, thanksList, textColor){

    var color = '#fff';
    if(typeof textColor !== 'undefined') color = textColor;

    console.log('%c   ', 'font-size:3px;');
    console.log('%c'+siteName, 'background:'+bgColor+'; color: '+color+'; font-size:14px; padding:5px 10px;');
    console.log('%c   ', 'font-size:3px;');

    var creditsLength = creditsList.length;
    if (creditsLength){
        for(var indexCredit = 0; indexCredit < creditsLength; indexCredit++) {
            console.log(creditsList[indexCredit].name +' - '+creditsList[indexCredit].website);
        }
    }

    var thanksLength = thanksList.length;
    if (thanksLength){
        console.log("-");
        console.log("Thanks to");
        for(var indexThanks = 0; indexThanks < thanksLength; indexThanks++) {
            console.log(thanksList[indexThanks].name +' ('+thanksList[indexThanks].website+')');
        }
    }

    console.log("-");
    console.log(" ");
}

/**
 * Add target blank on external link
 * @param  {[array]}  links
 * @param  {[string]} baseUrl
 */
function externalLinkTarget($links, baseUrl){

    var linksLength = $links.length,
        abstractBaseUrl = baseUrl.split('://');

    abstractBaseUrl = abstractBaseUrl[1];

    for(var linkIndex = 0; linkIndex < linksLength; linkIndex++){
        var link = $links[linkIndex];

        if(link.href.indexOf(abstractBaseUrl) == -1 &&
           link.href.indexOf('javascript') == -1 &&
           link.href.indexOf('mailto:') == -1 &&
           link.href.charAt(0) != '/' &&
           link.href.charAt(0) != '#')
        {
            $links[linkIndex].target = '_blank';
        }
    }
}

/**
 * Replace placeholder
 * @return {[type]} [description]
 */
var replacePlaceholder = function() {

    if(!Modernizr.input.placeholder){

        $('[placeholder]').focus(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
          }
        }).blur(function() {
          var input = $(this);
          if (input.val() === '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
          }
        }).blur();
        $('[placeholder]').parents('form').submit(function() {
          $(this).find('[placeholder]').each(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
              input.val('');
            }
          });
        });
    }
};


/**
 * Strip Trailing slash
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
var stripTrailingSlash = function(str) {
    if(str.substr(-1) == '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
};


/**
 * Disable/enable scroll
 */
var keys = [37, 38, 39, 40, 33, 34, 35];
// left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

function disableScroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
}

function enableScroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}


/**
 * Avoid `console` errors in browsers that lack a console.
 * @return {[type]} [description]
 */
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


/**
 * Tracks errors with Analytics
 * http://blog.gospodarets.com/track_javascript_angularjs_and_jquery_errors_with_google_analytics/
 * @return {[type]} [description]
 */
var gaTrackErrors = function(){

    if(typeof ga !== 'undefined'){

        // Pure JavaScript errors handler
        window.addEventListener('error', function (err) {
            var lineAndColumnInfo = err.colno ? ' line:' + err.lineno +', column:'+ err.colno : ' line:' + err.lineno;
            ga(
                'send',
                'event',
                'JavaScript Error',
                err.message,
                err.filename + lineAndColumnInfo + ' -> ' +  navigator.userAgent,
                0,
                true
            );
        });

        // jQuery errors handler (jQuery API)
        jQuery.error = function (message) {
            ga(
                'send',
                'event',
                'jQuery Error',
                message,
                navigator.userAgent,
                0,
                true
            );
        }

        // jQuery AJAX errors handler (jQuery API)
        $(document).ajaxError(function (event, request, settings) {
            ga(
                'send',
                'event',
                'jQuery Ajax Error',
                settings.url,
                JSON.stringify({
                    result: event.result,
                    status: request.status,
                    statusText: request.statusText,
                    crossDomain: settings.crossDomain,
                    dataType: settings.dataType
                }),
                0,
                true
            );
        });
    }
};


/**
 * Get a css property with the vendor prefix
 * @param  {String} property the css property
 * @return {String}          the prefixed property
 */
function prefixProperty(property){
    var prefixes = ['', 'ms', 'Webkit', 'Moz', 'O'];
    var numPrefixes = prefixes.length;
    var tmp = document.createElement("div");

    for(var i = 0; i < numPrefixes; i++) {
        var prefix = prefixes[i];
        property = prefix === '' ? property : property.charAt(0).toUpperCase() + property.substring(1).toLowerCase();
        var prop = prefix + property;

        if(typeof tmp.style[prop] != "undefined")
            return prop;
    }
}


/**
* Gets normalized ratio of value inside range.
* from https://github.com/mout/mout/blob/master/src/math/norm.js
*/
function getNormRatio(val, min, max){
    if (val < min) return 0;
    if (val > max) return 1;

    return val === max ? 1 : (val - min) / (max - min);
}

/**
 * JS / jQuery helper & plugins
 */

// --- jQuery Spamless --- //
(function($){$.fn.dcSpamless=function(options){var defaults={reverse:true,splitDomain:'[dot]',splitName:'[at]',mailto:true};var options=$.extend(defaults,options);return this.each(function(options){var domain=defaults.splitDomain,name=defaults.splitName;var email=$(this).is('a')?$(this).attr('href').replace('mailto:','').replace(domain,'.').replace(name,'@'):$(this).text().replace(domain,'.').replace(name,'@');email=defaults.reverse == true?email.split('').reverse().join(''):email;if($(this).is('a')){$(this).attr('href','mailto:'+email)}else{if(defaults.mailto===true){email='<a href="mailto:'+email+'">'+email+'</a>'}$(this).html(email)}})}})(jQuery);

