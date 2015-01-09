/*
 * ============================================================================
 * Plugins
 * ============================================================================
 */

/**
 * Check if device is mobile or not.
 * @type {Object}
 */
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


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
 * JS / jQuery helper & plugins
 */

// --- jQuery Spamless --- //
(function($){$.fn.dcSpamless=function(options){var defaults={reverse:true,splitDomain:'[dot]',splitName:'[at]',mailto:true};var options=$.extend(defaults,options);return this.each(function(options){var domain=defaults.splitDomain,name=defaults.splitName;var email=$(this).is('a')?$(this).attr('href').replace('mailto:','').replace(domain,'.').replace(name,'@'):$(this).text().replace(domain,'.').replace(name,'@');email=defaults.reverse == true?email.split('').reverse().join(''):email;if($(this).is('a')){$(this).attr('href','mailto:'+email)}else{if(defaults.mailto===true){email='<a href="mailto:'+email+'">'+email+'</a>'}$(this).html(email)}})}})(jQuery);

// Actual
(function(a){a.fn.addBack=a.fn.addBack||a.fn.andSelf;
a.fn.extend({actual:function(b,l){if(!this[b]){throw'$.actual => The jQuery method "'+b+'" you called does not exist';}var f={absolute:false,clone:false,includeMargin:false};
var i=a.extend(f,l);var e=this.eq(0);var h,j;if(i.clone===true){h=function(){var m="position: absolute !important; top: -1000 !important; ";e=e.clone().attr("style",m).appendTo("body");
};j=function(){e.remove();};}else{var g=[];var d="";var c;h=function(){c=e.parents().addBack().filter(":hidden");d+="visibility: hidden !important; display: block !important; ";
if(i.absolute===true){d+="position: absolute !important; ";}c.each(function(){var m=a(this);var n=m.attr("style");g.push(n);m.attr("style",n?n+";"+d:d);
});};j=function(){c.each(function(m){var o=a(this);var n=g[m];if(n===undefined){o.removeAttr("style");}else{o.attr("style",n);}});};}h();var k=/(outer)/.test(b)?e[b](i.includeMargin):e[b]();
j();return k;}});})(jQuery);
