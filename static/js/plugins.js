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
 * @return {[type]}     [description]
 */
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
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
 * JS / jQuery helper & plugins
 */

// --- jQuery Spamless --- //
(function($){$.fn.dcSpamless=function(options){var defaults={reverse:true,splitDomain:'[dot]',splitName:'[at]',mailto:true};var options=$.extend(defaults,options);return this.each(function(options){var domain=defaults.splitDomain,name=defaults.splitName;var email=$(this).is('a')?$(this).attr('href').replace('mailto:','').replace(domain,'.').replace(name,'@'):$(this).text().replace(domain,'.').replace(name,'@');email=defaults.reverse == true?email.split('').reverse().join(''):email;if($(this).is('a')){$(this).attr('href','mailto:'+email)}else{if(defaults.mailto===true){email='<a href="mailto:'+email+'">'+email+'</a>'}$(this).html(email)}})}})(jQuery);

