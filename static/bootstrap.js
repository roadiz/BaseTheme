requirejs.config({
    baseUrl: '/themes/BaseTheme/static/dist',
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        waitForImages: '/themes/BaseTheme/static/bower_components/waitForImages/dist/jquery.waitforimages.min',
        TweenLite: "/themes/BaseTheme/static/bower_components/gsap/src/minified/TweenLite.min",
        TweenMax: "/themes/BaseTheme/static/bower_components/gsap/src/minified/TweenMax.min",
        isMobile: "/themes/BaseTheme/static/bower_components/isMobile/isMobile.min",
        actual: "/themes/BaseTheme/static/bower_components/jquery.actual/jquery.actual.min",
        jqueryTouchEvents: "/themes/BaseTheme/static/bower_components/jquery-touch-events/src/1.0.1/jquery.mobile-events.min",
        // Utils functions and classes
        "utils/utils": "/themes/BaseTheme/static/bower_components/pageblock/dist/utils/utils",
        "utils/polyfills": "/themes/BaseTheme/static/bower_components/pageblock/dist/utils/polyfills",
        "utils/debounce": "/themes/BaseTheme/static/bower_components/pageblock/dist/utils/debounce",
        "utils/gaTrackErrors": "/themes/BaseTheme/static/bower_components/pageblock/dist/utils/gaTrackErrors",
        "utils/bootstrapMedia": "/themes/BaseTheme/static/bower_components/pageblock/dist/utils/bootstrapMedia",
        // Include current page-block sources from their location in bower_components
        // if you are using bower to fetch this lib.
        "state": "/themes/BaseTheme/static/bower_components/pageblock/dist/state",
        "router": "/themes/BaseTheme/static/bower_components/pageblock/dist/router",
        "graphicLoader": "/themes/BaseTheme/static/bower_components/pageblock/dist/graphicLoader",
        "nav": "/themes/BaseTheme/static/bower_components/pageblock/dist/nav",
        "abstract-page": "/themes/BaseTheme/static/bower_components/pageblock/dist/abstract-page",
        "abstract-block": "/themes/BaseTheme/static/bower_components/pageblock/dist/abstract-block",
        // If you want to use example Page and Home classes in your project
        // "pages/page": "/themes/BaseTheme/static/bower_components/pageblock/dist/pages/page",
        // "pages/home": "/themes/BaseTheme/static/bower_components/pageblock/dist/pages/home"
    }
});

require(['main']);
