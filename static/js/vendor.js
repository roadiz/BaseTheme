/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/ismobilejs/isMobile.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * isMobile.js v0.4.1
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
(function (global) {

    var apple_phone         = /iPhone/i,
        apple_ipod          = /iPod/i,
        apple_tablet        = /iPad/i,
        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet      = /Android/i,
        amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone       = /Windows Phone/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7

            '|' +           // OR

            'BNTV250' +     // B&N Nook Tablet 7 inch

            '|' +           // OR

            'Kindle Fire' + // Kindle Fire

            '|' +           // OR

            'Silk' +        // Kindle Fire, Silk Accelerated

            '|' +           // OR

            'GT-P1000' +    // Galaxy Tab 7 inch

            ')',            // End non-capturing group

            'i');           // Case-insensitive matching

    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;

        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        // Twitter mobile app's integrated browser on iPad adds a "Twitter for
        // iPhone" string. Same probable happens on other tablet platforms.
        // This will confuse detection so strip it out if it exists.
        tmp = ua.split('Twitter');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone:  match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone:  match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone:  match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry:   match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera:        match(other_opera, ua),
            firefox:      match(other_firefox, ua),
            chrome:       match(other_chrome, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;

        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module !== 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module !== 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (true) {
        //AMD
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (global.isMobile = instantiate()),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        global.isMobile = instantiate();
    }

})(this);


/***/ }),

/***/ "../node_modules/jquery.waitforimages/dist/jquery.waitforimages.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! waitForImages jQuery Plugin - v2.1.0 - 2016-01-04
* https://github.com/alexanderdickson/waitForImages
* Copyright (c) 2016 Alex Dickson; Licensed MIT */
;(function (factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        // CommonJS / nodejs module
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    // Namespace all events.
    var eventNamespace = 'waitForImages';

    // CSS properties which contain references to images.
    $.waitForImages = {
        hasImageProperties: [
            'backgroundImage',
            'listStyleImage',
            'borderImage',
            'borderCornerImage',
            'cursor'
        ],
        hasImageAttributes: ['srcset']
    };

    // Custom selector to find all `img` elements with a valid `src` attribute.
    $.expr[':']['has-src'] = function (obj) {
        // Ensure we are dealing with an `img` element with a valid
        // `src` attribute.
        return $(obj).is('img[src][src!=""]');
    };

    // Custom selector to find images which are not already cached by the
    // browser.
    $.expr[':'].uncached = function (obj) {
        // Ensure we are dealing with an `img` element with a valid
        // `src` attribute.
        if (!$(obj).is(':has-src')) {
            return false;
        }

        return !obj.complete;
    };

    $.fn.waitForImages = function () {

        var allImgsLength = 0;
        var allImgsLoaded = 0;
        var deferred = $.Deferred();

        var finishedCallback;
        var eachCallback;
        var waitForAll;

        // Handle options object (if passed).
        if ($.isPlainObject(arguments[0])) {

            waitForAll = arguments[0].waitForAll;
            eachCallback = arguments[0].each;
            finishedCallback = arguments[0].finished;

        } else {

            // Handle if using deferred object and only one param was passed in.
            if (arguments.length === 1 && $.type(arguments[0]) === 'boolean') {
                waitForAll = arguments[0];
            } else {
                finishedCallback = arguments[0];
                eachCallback = arguments[1];
                waitForAll = arguments[2];
            }

        }

        // Handle missing callbacks.
        finishedCallback = finishedCallback || $.noop;
        eachCallback = eachCallback || $.noop;

        // Convert waitForAll to Boolean
        waitForAll = !! waitForAll;

        // Ensure callbacks are functions.
        if (!$.isFunction(finishedCallback) || !$.isFunction(eachCallback)) {
            throw new TypeError('An invalid callback was supplied.');
        }

        this.each(function () {
            // Build a list of all imgs, dependent on what images will
            // be considered.
            var obj = $(this);
            var allImgs = [];
            // CSS properties which may contain an image.
            var hasImgProperties = $.waitForImages.hasImageProperties || [];
            // Element attributes which may contain an image.
            var hasImageAttributes = $.waitForImages.hasImageAttributes || [];
            // To match `url()` references.
            // Spec: http://www.w3.org/TR/CSS2/syndata.html#value-def-uri
            var matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g;

            if (waitForAll) {

                // Get all elements (including the original), as any one of
                // them could have a background image.
                obj.find('*').addBack().each(function () {
                    var element = $(this);

                    // If an `img` element, add it. But keep iterating in
                    // case it has a background image too.
                    if (element.is('img:has-src') &&
                        !element.is('[srcset]')) {
                        allImgs.push({
                            src: element.attr('src'),
                            element: element[0]
                        });
                    }

                    $.each(hasImgProperties, function (i, property) {
                        var propertyValue = element.css(property);
                        var match;

                        // If it doesn't contain this property, skip.
                        if (!propertyValue) {
                            return true;
                        }

                        // Get all url() of this element.
                        while (match = matchUrl.exec(propertyValue)) {
                            allImgs.push({
                                src: match[2],
                                element: element[0]
                            });
                        }
                    });

                    $.each(hasImageAttributes, function (i, attribute) {
                        var attributeValue = element.attr(attribute);
                        var attributeValues;

                        // If it doesn't contain this property, skip.
                        if (!attributeValue) {
                            return true;
                        }

                        allImgs.push({
                            src: element.attr('src'),
                            srcset: element.attr('srcset'),
                            element: element[0]
                        });
                    });
                });
            } else {
                // For images only, the task is simpler.
                obj.find('img:has-src')
                    .each(function () {
                    allImgs.push({
                        src: this.src,
                        element: this
                    });
                });
            }

            allImgsLength = allImgs.length;
            allImgsLoaded = 0;

            // If no images found, don't bother.
            if (allImgsLength === 0) {
                finishedCallback.call(obj[0]);
                deferred.resolveWith(obj[0]);
            }

            $.each(allImgs, function (i, img) {

                var image = new Image();
                var events =
                  'load.' + eventNamespace + ' error.' + eventNamespace;

                // Handle the image loading and error with the same callback.
                $(image).one(events, function me (event) {
                    // If an error occurred with loading the image, set the
                    // third argument accordingly.
                    var eachArguments = [
                        allImgsLoaded,
                        allImgsLength,
                        event.type == 'load'
                    ];
                    allImgsLoaded++;

                    eachCallback.apply(img.element, eachArguments);
                    deferred.notifyWith(img.element, eachArguments);

                    // Unbind the event listeners. I use this in addition to
                    // `one` as one of those events won't be called (either
                    // 'load' or 'error' will be called).
                    $(this).off(events, me);

                    if (allImgsLoaded == allImgsLength) {
                        finishedCallback.call(obj[0]);
                        deferred.resolveWith(obj[0]);
                        return false;
                    }

                });

                if (img.srcset) {
                    image.srcset = img.srcset;
                }
                image.src = img.src;
            });
        });

        return deferred.promise();

    };
}));


/***/ }),

/***/ "../node_modules/loglevel/dist/loglevel.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! loglevel - v1.4.1 - https://github.com/pimterry/loglevel - (c) 2016 Tim Perry - licensed MIT */
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module === 'object' && module.exports) {
        module.exports = definition();
    } else {
        root.log = definition();
    }
}(this, function () {
    "use strict";
    var noop = function() {};
    var undefinedType = "undefined";

    function realMethod(methodName) {
        if (typeof console === undefinedType) {
            return false; // We can't build a real method without a console to log to
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // these private functions always need `this` to be set properly

    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }
    }

    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      var storageKey = "loglevel";
      if (name) {
        storageKey += ":" + name;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public API
       *
       */

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Package-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    return defaultLogger;
}));


/***/ }),

/***/ "../node_modules/loglevel/lib/loglevel.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module === 'object' && module.exports) {
        module.exports = definition();
    } else {
        root.log = definition();
    }
}(this, function () {
    "use strict";
    var noop = function() {};
    var undefinedType = "undefined";

    function realMethod(methodName) {
        if (typeof console === undefinedType) {
            return false; // We can't build a real method without a console to log to
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // these private functions always need `this` to be set properly

    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }
    }

    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      var storageKey = "loglevel";
      if (name) {
        storageKey += ":" + name;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public API
       *
       */

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Package-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    return defaultLogger;
}));


/***/ }),

/***/ "../node_modules/starting-blocks/bundle.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.BootstrapMedia=e.debounce=e.gaTrackErrors=e.polyfills=e.Scroll=e.Utils=e.AbstractBlock=e.AbstractNav=e.AbstractPage=e.GraphicLoader=e.CacheProvider=e.State=e.Router=void 0;var o=n(1),a=i(o),s=n(26),r=i(s),l=n(27),u=i(l),d=n(30),c=i(d),h=n(31),f=i(h),p=n(35),v=i(p),y=n(36),g=i(y),m=n(25),b=i(m),_=n(37),w=i(_),k=n(38),E=i(k),A=n(39),P=i(A),T=n(34),L=i(T),x=n(42),O=i(x);e.Router=a.default,e.State=r.default,e.CacheProvider=u.default,e.GraphicLoader=c.default,e.AbstractPage=f.default,e.AbstractNav=v.default,e.AbstractBlock=g.default,e.Utils=b.default,e.Scroll=w.default,e.polyfills=E.default,e.gaTrackErrors=P.default,e.debounce=L.default,e.BootstrapMedia=O.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(3),r=i(s),l=n(22),u=i(l),d=n(23),c=i(d),h=n(24),f=i(h),p=n(25),v=i(p),y=n(26),g=i(y),m=n(27),b=i(m),_=n(28),w=i(_),k=n(29),E=function(){function t(e,n,i,o,s){if((0,a.default)(this,t),!i)throw"Router needs baseUrl to be defined.";if(!o)throw"Router needs a GraphicLoader instance to be defined.";if(!n)throw"Router needs a ClassFactory instance to be defined.";if(!s)throw"Router needs a Nav instance to be defined.";this.classFactory=n,this.baseUrl=i,this.loader=o,this.nav=s,this.nav.router=this,this.state=null,this.formerPages=[],this.page=null,this.stateBlock=!0,this.transition=!1,this.loading=!1,this.$window=(0,u.default)(window),this.$body=(0,u.default)("body"),this.deviceType=c.default.any===!1?"desktop":"mobile",v.default.addClass(this.$body[0],"is-"+this.deviceType),this.window=this.$window,this.currentRequest=null,this.cacheProvider=new b.default,this.options={homeHasClass:!1,ajaxEnabled:!0,pageClass:"page-content",objectTypeAttr:"data-node-type",ajaxLinkTypeAttr:"data-node-type",noAjaxLinkClass:"no-ajax-link",navLinkClass:"nav-link",activeClass:"active",pageBlockClass:".page-block",lazyloadEnabled:!1,lazyloadSrcAttr:"data-src",lazyloadClass:"lazyload",lazyloadSrcSetAttr:"data-srcset",lazyloadThreshold:300,lazyloadThrottle:150,$ajaxContainer:(0,u.default)("#ajax-container"),minLoadDuration:0,preLoadPageDelay:0,useCache:!0,postLoad:function(t,e){},preLoad:function(t){},prePushState:function(t){},onDestroy:function(){},preBoot:function(t,e,n){}},null!==e&&(this.options=u.default.extend(this.options,e))}return(0,r.default)(t,[{key:"destroy",value:function(){this.options.ajaxEnabled&&window.removeEventListener("popstate",this.onPopState.bind(this),!1);var t=this.options.onDestroy.bind(this);t()}},{key:"initEvents",value:function(){this.options.ajaxEnabled&&window.addEventListener("popstate",this.onPopState.bind(this),!1),this.nav.initEvents(this)}},{key:"onPopState",value:function(t){"undefined"!=typeof t.state&&null!==t.state&&(this.transition=!0,this.loadPage(t,t.state))}},{key:"boot",value:function(t,e,n){"static"===e&&(this.loadBeginDate=new Date);var i=this.options.preBoot.bind(this);i(t,e,n),null===this.state&&(this.state=new g.default(this,null),window.history.replaceState(this.state,null,null));var o=t.attr(this.options.objectTypeAttr);this.page=this.classFactory.getPageInstance(o,this,t,e,o,n),"ajax"===e&&this.state.update(this.page),w.default.commit(k.AFTER_PAGE_BOOT,this.page)}},{key:"onLinkClick",value:function(t){var e=t.currentTarget.className,n=t.currentTarget.href;if(n.indexOf("mailto:")===-1&&e.indexOf(this.options.noAjaxLinkClass)===-1)if(t.preventDefault(),this.isNotCurrentPageLink(t.currentTarget)){this.transition=!0,this.state=new g.default(this,t.currentTarget,{previousType:this.page.type,previousName:this.page.name,navLinkClass:this.options.navLinkClass,previousHref:window.location.href});var i=this.options.prePushState.bind(this);i(this.state),window.history.pushState&&window.history.pushState(this.state,this.state.title,this.state.href),this.loadPage(t,this.state)}else f.default.debug("⛔️ Same page requested… do nothing.")}},{key:"isNotCurrentPageLink",value:function(t){var e=t.className;return e.indexOf(this.options.activeClass)===-1&&!this.transition}},{key:"loadPage",value:function(t,e){this.currentRequest&&4!==this.currentRequest.readyState&&this.currentRequest.abort(),this.loader.show(),this.loadBeginDate=new Date;var n=this.options.preLoad.bind(this);n(e),w.default.commit(k.BEFORE_PAGE_LOAD,e),setTimeout(this.doPageLoad.bind(this,e),this.options.preLoadPageDelay)}},{key:"doPageLoad",value:function(t){var e=this;this.options.useCache&&this.cacheProvider.exists(t.href)?(f.default.debug("📎 Use cache-provider for: "+t.href),this._onDataLoaded(this.cacheProvider.fetch(t.href),t)):this.currentRequest=u.default.ajax({url:t.href,dataType:"html",headers:{"X-Allow-Partial":1},cache:!1,type:"get",success:function(n){e.options.useCache&&e.cacheProvider.save(t.href,n),e._onDataLoaded(n,t)}})}},{key:"_onDataLoaded",value:function(t,e){var n=null,i=(0,u.default)(u.default.parseHTML(t.trim()));n=i.hasClass(this.options.pageClass)?i:i.find("."+this.options.pageClass),w.default.commit(k.AFTER_PAGE_LOAD,n),this.options.$ajaxContainer.append(n),w.default.commit(k.AFTER_DOM_APPENDED,n),this.formerPages.push(this.page),this.updatePageTitle(n),this.boot(n,"ajax",e.isHome);var o=this.options.postLoad.bind(this);o(e,n),"undefined"!=typeof ga&&(f.default.debug("🚩 Push Analytics for: "+window.location.pathname),ga("send","pageview",{page:window.location.pathname,title:document.title}))}},{key:"updatePageTitle",value:function(t){if(t.length&&""!==t.attr("data-meta-title")){var e=t.attr("data-meta-title");null!==e&&""!==e&&(document.title=e)}}}]),t}();e.default=E},function(t,e){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(4),a=i(o);e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,a.default)(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}()},function(t,e,n){t.exports={default:n(5),__esModule:!0}},function(t,e,n){n(6);var i=n(9).Object;t.exports=function(t,e,n){return i.defineProperty(t,e,n)}},function(t,e,n){var i=n(7);i(i.S+i.F*!n(17),"Object",{defineProperty:n(13).f})},function(t,e,n){var i=n(8),o=n(9),a=n(10),s=n(12),r="prototype",l=function(t,e,n){var u,d,c,h=t&l.F,f=t&l.G,p=t&l.S,v=t&l.P,y=t&l.B,g=t&l.W,m=f?o:o[e]||(o[e]={}),b=m[r],_=f?i:p?i[e]:(i[e]||{})[r];f&&(n=e);for(u in n)d=!h&&_&&void 0!==_[u],d&&u in m||(c=d?_[u]:n[u],m[u]=f&&"function"!=typeof _[u]?n[u]:y&&d?a(c,i):g&&_[u]==c?function(t){var e=function(e,n,i){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,i)}return t.apply(this,arguments)};return e[r]=t[r],e}(c):v&&"function"==typeof c?a(Function.call,c):c,v&&((m.virtual||(m.virtual={}))[u]=c,t&l.R&&b&&!b[u]&&s(b,u,c)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,t.exports=l},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var i=n(11);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,o){return t.call(e,n,i,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var i=n(13),o=n(21);t.exports=n(17)?function(t,e,n){return i.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var i=n(14),o=n(16),a=n(20),s=Object.defineProperty;e.f=n(17)?Object.defineProperty:function(t,e,n){if(i(t),e=a(e,!0),i(n),o)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var i=n(15);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(17)&&!n(18)(function(){return 7!=Object.defineProperty(n(19)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=!n(18)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var i=n(15),o=n(8).document,a=i(o)&&i(o.createElement);t.exports=function(t){return a?o.createElement(t):{}}},function(t,e,n){var i=n(15);t.exports=function(t,e){if(!i(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!i(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!i(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!i(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){t.exports=__webpack_require__(0)},function(t,e){t.exports=__webpack_require__("../node_modules/ismobilejs/isMobile.js")},function(t,e){t.exports=__webpack_require__("../node_modules/loglevel/lib/loglevel.js")},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(3),r=i(s),l=n(22),u=i(l),d=function(){function t(){(0,a.default)(this,t)}return(0,r.default)(t,null,[{key:"stripTrailingSlash",value:function(t){return"/"==t.substr(-1)?t.substr(0,t.length-1):t}},{key:"logCredits",value:function(t,e,n,i,o){var a="#fff";if("undefined"!=typeof o&&(a=o),console.log("%c   ","font-size:3px;"),console.log("%c"+t,"background:"+e+"; color: "+a+"; font-size:14px; padding:5px 10px;"),console.log("%c   ","font-size:3px;"),null!==n){var s=n.length;if(s)for(var r=0;r<s;r++)console.log(n[r].name+" - "+n[r].website)}if(null!==i){var l=i.length;if(l){console.log("-"),console.log("Thanks to");for(var u=0;u<l;u++)console.log(i[u].name+" ("+i[u].website+")")}}console.log("-"),console.log(" ")}},{key:"getStyleVal",value:function(t,e){var n=t.css(e);return Math.round(Number(n.substr(0,n.length-2)))}},{key:"addClass",value:function(t,e){t.classList?t.classList.add(e):t.className+=" "+e}},{key:"removeClass",value:function(t,e){if(t.classList)t.classList.remove(e);else{t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi"),"");var n=t.className.length-1;" "==t.className[n]&&(t.className=t.className.substring(0,n))}}},{key:"getRandomNumber",value:function(t,e,n){var i=Math.random()*(e-t)+t;return"undefined"!=typeof n?Number(i.toFixed(n)):i}},{key:"getRandomInt",value:function(t,e){return Math.floor(Math.random()*(e-t+1))+t}},{key:"replacePlaceholder",value:function(){"undefined"!=typeof Modernizr&&(Modernizr.input.placeholder||((0,u.default)("[placeholder]").focus(function(){var t=(0,u.default)(this);t.val()==t.attr("placeholder")&&(t.val(""),t.removeClass("placeholder"))}).blur(function(){var t=(0,u.default)(this);""!==t.val()&&t.val()!=t.attr("placeholder")||(t.addClass("placeholder"),t.val(t.attr("placeholder")))}).blur(),(0,u.default)("[placeholder]").parents("form").submit(function(){(0,u.default)(this).find("[placeholder]").each(function(){var t=(0,u.default)(this);t.val()==t.attr("placeholder")&&t.val("")})})))}},{key:"getViewportSize",value:function(){var t=window,e="inner";return"innerWidth"in window||(e="client",t=document.documentElement||document.body),{width:t[e+"Width"],height:t[e+"Height"]}}},{key:"prefixProperty",value:function(t){for(var e=["","ms","Webkit","Moz","O"],n=e.length,i=document.createElement("div"),o=0;o<n;o++){var a=e[o];t=""===a?t:t.charAt(0).toUpperCase()+t.substring(1).toLowerCase();var s=a+t;if("undefined"!=typeof i.style[s])return s}}},{key:"getNormRatio",value:function(t,e,n){return t<e?0:t>n?1:t===n?1:(t-e)/(n-e)}}]),t}();e.default=d},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(3),r=i(s),l=n(22),u=i(l),d=function(){function t(e,n,i){if((0,a.default)(this,t),this.options={previousType:"page",previousName:"home",navLinkClass:"nav-link",previousHref:window.location.href},null!==i&&(this.options=u.default.extend(this.options,i)),this.title=window.document.title,this.href=window.location.href,this.nodeName="",this.index=0,this.nodeType="page",this.context="history",this.isHome=!1,null!==n){this.context=n.className.indexOf(this.options.navLinkClass)>=0?"nav":"link";var o=n.getAttribute("data-is-home");if(this.isHome="1"==o,this.title=n.getAttribute("data-title"),""===this.title&&(this.title=n.innerHTML),this.nodeType=n.getAttribute(e.options.ajaxLinkTypeAttr),null===this.nodeType||""===this.nodeType){var s=n.getAttribute(e.options.objectTypeAttr);null!==s&&""!==s&&(this.nodeType=s)}this.nodeName=n.getAttribute("data-node-name"),this.index=Number(n.getAttribute("data-index")),this.href=n.href}this.transition=this.options.previousType+"_to_"+this.nodeType}return(0,r.default)(t,[{key:"update",value:function(t){this.transition=this.options.previousType+"_to_"+t.type,this.nodeName=t.name,this.isHome=t.isHome,this.nodeType=t.type}}]),t}();e.default=d},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(3),r=i(s),l=function(){function t(){(0,a.default)(this,t),this.hash={}}return(0,r.default)(t,[{key:"exists",value:function(t){return t in this.hash}},{key:"fetch",value:function(t){return this.hash[t]}},{key:"save",value:function(t,e){return this.hash[t]=e,this}}]),t}();e.default=l},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(3),r=i(s),l=n(24),u=i(l),d=function(){function t(){(0,a.default)(this,t)}return(0,r.default)(t,[{key:"commit",value:function(t,e){var n=new CustomEvent(t,{detail:e});u.default.debug("🚩 Dispatched "+t),window.dispatchEvent(n)}}]),t}();e.default=new d},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.BEFORE_PAGE_LOAD="BEFORE_PAGE_LOAD",e.AFTER_PAGE_LOAD="AFTER_PAGE_LOAD",e.AFTER_DOM_APPENDED="AFTER_DOM_APPENDED",e.AFTER_PAGE_BOOT="AFTER_PAGE_BOOT",e.BEFORE_PAGE_SHOW="BEFORE_PAGE_SHOW",e.AFTER_PAGE_SHOW="AFTER_PAGE_SHOW",e.BEFORE_PAGE_HIDE="BEFORE_PAGE_HIDE",e.AFTER_PAGE_HIDE="AFTER_PAGE_HIDE"},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(3),r=i(s),l=n(24),u=i(l),d=function(){function t(){(0,a.default)(this,t)}return(0,r.default)(t,[{key:"show",value:function(){u.default.debug("🌀 Show loader")}},{key:"hide",value:function(){u.default.debug("🌀 Hide loader")}}]),t}();e.default=d},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(3),r=i(s),l=n(24),u=i(l),d=n(32),c=(i(d),n(22)),h=i(c),f=n(33),p=i(f),v=n(34),y=i(v),g=n(28),m=i(g),b=n(29),_=function(){function t(e,n,i,o,s){if((0,a.default)(this,t),o=o||"page",!n)throw"AbstractPage need a $cont (JQuery) to be defined.";if(!e)throw"AbstractPage need a Router instance to be defined.";this.router=e,this.$cont=n,this.id=n[0].id,this.context=i,this.type=o,this.isHome=s,this.lazyload=null,"1"==this.$cont[0].getAttribute("data-is-home")&&(this.isHome=!0),this.ready=!1,this.blocks=[],this.name=this.$cont.length?this.$cont[0].getAttribute("data-node-name"):"",this.onResizeDebounce=(0,y.default)(this.onResize.bind(this),50,!1),u.default.debug("✳️ #"+this.id+" %c["+o+"] ["+this.context+"]","color:grey"),this.init(),this.initEvents()}return(0,r.default)(t,[{key:"init",value:function(){this.$link=this.$cont.find("a").not('[target="_blank"]').not('[href="#"]'),this.bindedLinkClick=this.router.onLinkClick.bind(this.router),this.bindedUpdateBlocks=this.updateBlocks.bind(this),this.$link.length&&(this.externalLinkTarget(this.$link,this.router.baseUrl),this.$link=this.$cont.find("a").not('[target="_blank"]').not('[href="#"]')),this.$blocks=this.$cont.find(this.router.options.pageBlockClass),this.blockLength=this.$blocks.length,this.blockLength&&this.initBlocks(),this.router.options.ajaxEnabled&&"ajax"===this.context&&this.initAjax(),this.router.options.lazyloadEnabled&&(this.beforeLazyload(),this.lazyload=new p.default({threshold:this.router.options.lazyloadThreshold,throttle:this.router.options.lazyloadThrottle,elements_selector:"."+this.router.options.lazyloadClass,data_src:this.router.options.lazyloadSrcAttr.replace("data-",""),data_srcset:this.router.options.lazyloadSrcSetAttr.replace("data-",""),callback_set:this.onLazyImageSet.bind(this),callback_load:this.onLazyImageLoad.bind(this),callback_processed:this.onLazyImageProcessed.bind(this)}))}},{key:"destroy",value:function(){if(u.default.debug("🗑 #"+this.id),this.$cont.remove(),this.destroyEvents(),null!==this.router.page&&this.router.page.name!==this.name&&this.router.$body.removeClass(this.name),null!==this.router.page&&this.router.page.type!==this.type&&this.router.$body.removeClass(this.type),null!==this.blocks)for(var t in this.blocks)this.blocks[t].destroy();null!==this.lazyload&&this.lazyload.destroy()}},{key:"initEvents",value:function(){this.$cont.find("img").length?this.$cont.waitForImages({finished:this.onLoad.bind(this),waitForAll:!0}):this.onLoad(),this.$link.length&&this.router.options.ajaxEnabled&&this.$link.on("click",this.bindedLinkClick),this.router.$window.on("resize",this.onResizeDebounce),this.domObserver=new MutationObserver(this.bindedUpdateBlocks),this.domObserver.observe(this.$cont.get(0),{childList:!0,attributes:!1,characterData:!1,subtree:!0})}},{key:"destroyEvents",value:function(){this.$link.off("click",this.bindedLinkClick),this.router.$window.off("resize",this.onResizeDebounce),this.domObserver.disconnect()}},{key:"onLoad",value:function(t){var e=this;this.loadDate=new Date,this.loadDuration=this.loadDate-this.router.loadBeginDate,this.router.nav.update(this);var n=this.loadDuration>this.router.options.minLoadDuration?0:this.router.options.minLoadDuration-this.loadDuration;setTimeout(function(){var t=e.onShowEnded.bind(e);if(e.ready=!0,e.router.loader.hide(),m.default.commit(b.BEFORE_PAGE_SHOW,e),"static"===e.context)e.show(t);else if("ajax"===e.context){if(null!==e.name&&""!==e.name&&(document.body.id=e.name,e.router.$body.addClass(e.name)),e.router.$body.addClass(e.type),e.router.formerPages.length>0){var n=e.router.formerPages[e.router.formerPages.length-1],i=n.destroy.bind(n);e.router.formerPages.length>1?i():n.hide(i),e.router.formerPages.pop()}e.show(t)}},n)}},{key:"show",value:function(t){u.default.debug("▶️ #"+this.id),this.$cont[0].style.opacity="1","undefined"!=typeof t&&t()}},{key:"showEnded",value:function(){this.onShowEnded()}},{key:"onShowEnded",value:function(){this.router.transition=!1,this.$cont.removeClass(this.router.options.pageClass+"-ajax"),this.$cont.removeClass(this.router.options.pageClass+"-transitioning"),m.default.commit(b.AFTER_PAGE_SHOW,this)}},{key:"hide",value:function(t){m.default.commit(b.BEFORE_PAGE_HIDE,this),u.default.debug("◀️ #"+this.id),this.$cont[0].style.opacity="0","undefined"!=typeof t&&t(),m.default.commit(b.AFTER_PAGE_HIDE,this)}},{key:"initAjax",value:function(){this.$cont.addClass(this.router.options.pageClass+"-transitioning")}},{key:"initBlocks",value:function(){for(var t=0;t<this.blockLength;t++){var e=this.initSingleBlock(this.$blocks.eq(t));e&&this.blocks.push(e)}for(var n=this.blocks.length-1;n>=0;n--)"function"==typeof this.blocks[n].onPageReady&&this.blocks[n].onPageReady()}},{key:"updateBlocks",value:function(){var t=this;u.default.debug("\t📯 Page DOM changed…"),this.lazyload&&this.lazyload.update(),this.$blocks=this.$cont.find(this.router.options.pageBlockClass),this.blockLength=this.$blocks.length,this.$blocks.each(function(e,n){var i=t.getBlockById((0,h.default)(n).attr("id"));if(null===i){var o=t.initSingleBlock(t.$blocks.eq(e));o&&(t.blocks.push(o),o.onPageReady())}})}},{key:"initSingleBlock",value:function(t){var e=t[0].getAttribute(this.router.options.objectTypeAttr);t[0].id;return this.router.classFactory.getBlockInstance(e,this,t)}},{key:"getBlockById",value:function(t){for(var e in this.blocks)if(this.blocks[e]&&this.blocks[e].id&&this.blocks[e].id==t)return this.blocks[e];return null}},{key:"getBlockIndexById",value:function(t){for(var e in this.blocks)if(this.blocks[e]&&this.blocks[e].id&&this.blocks[e].id==t)return e;return null}},{key:"getFirstBlockByType",value:function(t){for(var e in this.blocks)if(this.blocks[e]&&this.blocks[e].type&&this.blocks[e].type==t)return this.blocks[e];return null}},{key:"getFirstBlockIndexByType",value:function(t){for(var e in this.blocks)if(this.blocks[e]&&this.blocks[e].type&&this.blocks[e].type==t)return e;return null}},{key:"onResize",value:function(){}},{key:"beforeLazyload",value:function(){}},{key:"onLazyImageSet",value:function(t){u.default.debug("\t🖼 «"+t.id+"» set")}},{key:"onLazyImageLoad",value:function(t){u.default.debug("\t🖼 «"+t.id+"» load")}},{key:"onLazyImageProcessed",value:function(t){u.default.debug("\t🖼 Lazy load processed")}},{key:"externalLinkTarget",value:function(t,e){var n=t.length,i=e.split("://");i=i[1];for(var o=0;o<n;o++){var a=t[o],s=a.getAttribute("href");s.indexOf(i)===-1&&s.indexOf("javascript")===-1&&s.indexOf("mailto:")===-1&&"/"!=s.charAt(0)&&"#"!=s.charAt(0)&&(t[o].target="_blank")}}}]),t}();e.default=_},function(t,e){t.exports=__webpack_require__("../node_modules/jquery.waitforimages/dist/jquery.waitforimages.js")},function(t,e,n){var i,o,a;!function(n,s){o=[],i=s,a="function"==typeof i?i.apply(e,o):i,!(void 0!==a&&(t.exports=a))}(this,function(){function t(){g||(f={elements_selector:"img",container:window,threshold:300,throttle:50,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null},p=!!window.addEventListener,v=!!window.attachEvent,y=!!document.body.classList,g=!0)}function e(t,e,n){return p?void t.addEventListener(e,n):void(v&&(t.attachEvent("on"+e,function(t){return function(){n.call(t,window.event)}}(t)),t=null))}function n(t,e,n){return p?void t.removeEventListener(e,n):void(v&&t.detachEvent("on"+e,n))}function i(t,e,n){function i(){return window.innerWidth||c.documentElement.clientWidth||document.body.clientWidth}function o(){return window.innerHeight||c.documentElement.clientHeight||document.body.clientHeight}function a(t){return t.getBoundingClientRect().top+h-c.documentElement.clientTop}function s(t){return t.getBoundingClientRect().left+f-c.documentElement.clientLeft}function r(){var i;return i=e===window?o()+h:a(e)+e.offsetHeight,i<=a(t)-n}function l(){var o;return o=e===window?i()+window.pageXOffset:s(e)+i(),o<=s(t)-n}function u(){var i;return i=e===window?h:a(e),i>=a(t)+n+t.offsetHeight}function d(){var i;return i=e===window?f:s(e),i>=s(t)+n+t.offsetWidth}var c,h,f;return c=t.ownerDocument,h=window.pageYOffset||c.body.scrollTop,f=window.pageXOffset||c.body.scrollLeft,!(r()||u()||l()||d())}function o(){var t=new Date;return t.getTime()}function a(t,e){var n,i={};for(n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);for(n in e)e.hasOwnProperty(n)&&(i[n]=e[n]);return i}function s(t){try{return Array.prototype.slice.call(t)}catch(o){var e,n=[],i=t.length;for(e=0;i>e;e++)n.push(t[e]);return n}}function r(t,e){return y?void t.classList.add(e):void(t.className+=(t.className?" ":"")+e)}function l(t,e){return y?void t.classList.remove(e):void(t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,""))}function u(t,e){var n=t.parentElement;if("PICTURE"===n.tagName)for(var i=0;i<n.children.length;i++){var o=n.children[i];if("SOURCE"===o.tagName){var a=o.getAttribute("data-"+e);a&&o.setAttribute("srcset",a)}}}function d(t,e,n){var i=t.tagName,o=t.getAttribute("data-"+n);if("IMG"===i){u(t,e);var a=t.getAttribute("data-"+e);return a&&t.setAttribute("srcset",a),void(o&&t.setAttribute("src",o))}return"IFRAME"===i?void(o&&t.setAttribute("src",o)):void(t.style.backgroundImage="url("+o+")")}function c(t,e){return function(){return t.apply(e,arguments)}}function h(n){t(),this._settings=a(f,n),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._handleScrollFn=c(this.handleScroll,this),e(window,"resize",this._handleScrollFn),this.update()}var f,p,v,y,g=!1;return h.prototype._showOnAppear=function(t){function i(){null!==o&&(o.callback_load&&o.callback_load(t),l(t,o.class_loading),r(t,o.class_loaded),n(t,"load",i))}var o=this._settings;("IMG"===t.tagName||"IFRAME"===t.tagName)&&(e(t,"load",i),e(t,"error",function(){n(t,"load",i),l(t,o.class_loading),o.callback_error&&o.callback_error(t)}),r(t,o.class_loading)),d(t,o.data_srcset,o.data_src),o.callback_set&&o.callback_set(t)},h.prototype._loopThroughElements=function(){var t,e,n=this._settings,o=this._elements,a=o?o.length:0,s=[];for(t=0;a>t;t++)e=o[t],n.skip_invisible&&null===e.offsetParent||i(e,n.container,n.threshold)&&(this._showOnAppear(e),s.push(t),e.wasProcessed=!0);for(;s.length>0;)o.splice(s.pop(),1),n.callback_processed&&n.callback_processed(o.length);0===a&&this._stopScrollHandler()},h.prototype._purgeElements=function(){var t,e,n=this._elements,i=n.length,o=[];for(t=0;i>t;t++)e=n[t],e.wasProcessed&&o.push(t);for(;o.length>0;)n.splice(o.pop(),1)},h.prototype._startScrollHandler=function(){this._isHandlingScroll||(this._isHandlingScroll=!0,e(this._settings.container,"scroll",this._handleScrollFn))},h.prototype._stopScrollHandler=function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,n(this._settings.container,"scroll",this._handleScrollFn))},h.prototype.handleScroll=function(){var t,e,n;this._settings&&(e=o(),n=this._settings.throttle,0!==n?(t=n-(e-this._previousLoopTime),0>=t||t>n?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=e,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(c(function(){this._previousLoopTime=o(),this._loopTimeout=null,this._loopThroughElements()},this),t))):this._loopThroughElements())},h.prototype.update=function(){this._elements=s(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},h.prototype.destroy=function(){n(window,"resize",this._handleScrollFn),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null},h})},function(t,e){"use strict";function n(t,e,n){var i=void 0;return function(){var o=this,a=arguments,s=function(){i=null,n||t.apply(o,a)},r=n&&!i;clearTimeout(i),i=setTimeout(s,e),r&&t.apply(o,a)}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(3),r=i(s),l=function(){function t(){(0,a.default)(this,t),this.$cont=null,this.router=null,this.page=null}return(0,r.default)(t,[{key:"update",value:function(t){if(!t)throw"Nav update method needs a Page object.";this.page=t}},{key:"initEvents",value:function(t){if(!t)throw"Nav initEvents method needs a Router object."}}]),t}();e.default=l},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(3),r=i(s),l=n(24),u=i(l),d=n(32),c=(i(d),n(22)),h=(i(c),n(34)),f=i(h),p=function(){function t(e,n,i){(0,a.default)(this,t),i=i||"block",this.page=e,this.$cont=n,this.id=n[0].id,this.type=i,this.name=this.$cont.length?this.$cont[0].getAttribute("data-node-name"):"",this.onResizeDebounce=(0,f.default)(this.onResize.bind(this),50,!1),u.default.debug("\t✳️ #"+this.id+" %c["+i+"]","color:grey"),this.init(),this.initEvents()}return(0,r.default)(t,[{key:"init",value:function(){}},{key:"initEvents",value:function(){this.$cont.find("img").length?this.$cont.waitForImages({finished:this.onLoad.bind(this),waitForAll:!0}):this.onLoad(),this.page.router.$window.on("resize",this.onResizeDebounce)}},{key:"destroy",value:function(){u.default.debug("\t🗑 #"+this.id),this.destroyEvents()}},{key:"destroyEvents",value:function(){this.page.router.$window.off("resize",this.onResizeDebounce)}},{key:"onResize",value:function(){}},{key:"onLoad",value:function(){}},{key:"onPageReady",value:function(){}}]),t}();e.default=p},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(3),r=i(s),l=function(){function t(){(0,a.default)(this,t)}return(0,r.default)(t,null,[{key:"_preventDefault",value:function(t){t=t||window.event,t.preventDefault&&t.preventDefault(),t.returnValue=!1}},{key:"_keydown",value:function(e){for(var n=[37,38,39,40,33,34,35],i=n.length;i--;)if(e.keyCode===n[i])return void t._preventDefault(e)}},{key:"_wheel",value:function(e){t._preventDefault(e)}},{key:"disable",value:function(){window.addEventListener&&window.addEventListener("DOMMouseScroll",t._wheel,!1),window.onmousewheel=document.onmousewheel=t._wheel,document.onkeydown=t._keydown}},{key:"enable",value:function(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",t._wheel,!1),window.onmousewheel=document.onmousewheel=document.onkeydown=null}}]),t}();e.default=l},function(t,e){"use strict";function n(){window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}(),window.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){window.clearTimeout(t)}}();for(var t=void 0,e=function(){},n=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],i=n.length,o=window.console=window.console||{};i--;)t=n[i],o[t]||(o[t]=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(){"undefined"!=typeof ga&&(window.addEventListener("error",function(t){var e=t.colno?" line:"+t.lineno+", column:"+t.colno:" line:"+t.lineno;ga("send","event","JavaScript Error",t.message,t.filename+e+" -> "+navigator.userAgent,0,!0)}),l.default.error=function(t){ga("send","event","jQuery Error",t,navigator.userAgent,0,!0)},(0,l.default)(document).ajaxError(function(t,e,n){ga("send","event","jQuery Ajax Error",n.url,(0,s.default)({result:t.result,status:e.status,statusText:e.statusText,crossDomain:n.crossDomain,dataType:n.dataType}),0,!0)}))}Object.defineProperty(e,"__esModule",{value:!0});var a=n(40),s=i(a);e.default=o;var r=n(22),l=i(r)},function(t,e,n){t.exports={default:n(41),__esModule:!0}},function(t,e,n){var i=n(9),o=i.JSON||(i.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{
default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(3),r=i(s),l=n(25),u=i(l),d=function(){function t(){(0,a.default)(this,t)}return(0,r.default)(t,null,[{key:"isMinXS",value:function(){var t=u.default.getViewportSize();return t.width>=480}},{key:"isMinSM",value:function(){var t=u.default.getViewportSize();return t.width>=768}},{key:"isMinMD",value:function(){var t=u.default.getViewportSize();return t.width>=992}},{key:"isMinLG",value:function(){var t=u.default.getViewportSize();return t.width>=1200}},{key:"isMinXL",value:function(){var t=u.default.getViewportSize();return t.width>=1920}}]),t}();e.default=d}]);

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../node_modules/starting-blocks/bundle.js");
__webpack_require__("../node_modules/loglevel/dist/loglevel.js");
module.exports = __webpack_require__("../node_modules/ismobilejs/isMobile.js");


/***/ })

/******/ });
//# sourceMappingURL=vendor.js.map