requirejs.config({
    baseUrl: '/themes/BaseTheme/static/dist',
    paths: {
        /*
         * CDN dependencies
         * TweenLite should not be loaded if TweenMax is used
         * except for optional libs like Draggable.
         */
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        TweenMax: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/TweenMax.min",
        TweenLite: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/TweenLite.min",
        // Internal dep
        Lazyload: '/themes/BaseTheme/static/bower_components/vanilla-lazyload/dist/lazyload',
        waitForImages: '/themes/BaseTheme/static/bower_components/waitForImages/dist/jquery.waitforimages.min',
        scrollTo: "/themes/BaseTheme/static/bower_components/gsap/src/minified/plugins/ScrollToPlugin.min",
        isMobile: "/themes/BaseTheme/static/bower_components/isMobile/isMobile.min",
        actual: "/themes/BaseTheme/static/bower_components/jquery.actual/jquery.actual.min",
        Hammer: "/themes/BaseTheme/static/bower_components/hammerjs/hammer.min",
        loglevel: "/themes/BaseTheme/static/bower_components/loglevel/dist/loglevel.min",
        // Utils functions and classes
        "utils/utils": "/themes/BaseTheme/static/bower_components/pageblock/dist/utils/utils",
        "utils/polyfills": "/themes/BaseTheme/static/bower_components/pageblock/dist/utils/polyfills",
        "utils/debounce": "/themes/BaseTheme/static/bower_components/pageblock/dist/utils/debounce",
        "utils/scroll": "/themes/BaseTheme/static/bower_components/pageblock/dist/utils/scroll",
        "utils/gaTrackErrors": "/themes/BaseTheme/static/bower_components/pageblock/dist/utils/gaTrackErrors",
        "utils/bootstrapMedia": "/themes/BaseTheme/static/bower_components/pageblock/dist/utils/bootstrapMedia",
        // Include current page-block sources from their location in bower_components
        // if you are using bower to fetch this lib.
        "state": "/themes/BaseTheme/static/bower_components/pageblock/dist/state",
        "router": "/themes/BaseTheme/static/bower_components/pageblock/dist/router",
        "graphicLoader": "/themes/BaseTheme/static/bower_components/pageblock/dist/graphicLoader",
        "abstract-nav": "/themes/BaseTheme/static/bower_components/pageblock/dist/abstract-nav",
        "abstract-page": "/themes/BaseTheme/static/bower_components/pageblock/dist/abstract-page",
        "abstract-block": "/themes/BaseTheme/static/bower_components/pageblock/dist/abstract-block",
        // If you want to use example Page and Home classes in your project
        // "pages/page": "/themes/BaseTheme/static/bower_components/pageblock/dist/pages/page",
        // "pages/home": "/themes/BaseTheme/static/bower_components/pageblock/dist/pages/home"
    }
});

require(['main']);
