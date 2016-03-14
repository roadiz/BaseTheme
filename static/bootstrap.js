requirejs.config({
    baseUrl: '/themes/PITheme/static/dist',
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        waitForImages: '/themes/PITheme/static/bower_components/waitForImages/dist/jquery.waitforimages.min',
        TweenLite: "/themes/PITheme/static/bower_components/gsap/src/minified/TweenMax.min",
        // Include current page-block sources from their location in bower_components
        // if you are using bower to fetch this lib.
        "state": "/themes/PITheme/static/bower_components/pageblock/dist/state",
        "router": "/themes/PITheme/static/bower_components/pageblock/dist/router",
        "graphicLoader": "/themes/PITheme/static/bower_components/pageblock/dist/graphicLoader",
        "nav": "/themes/PITheme/static/bower_components/pageblock/dist/nav",
        "abstract-page": "/themes/PITheme/static/bower_components/pageblock/dist/abstract-page",
        "abstract-block": "/themes/PITheme/static/bower_components/pageblock/dist/abstract-block",
        // Utils functions and classes
        "utils/utils": "/themes/PITheme/static/bower_components/pageblock/dist/utils/utils",
        "utils/gaTrackErrors": "/themes/PITheme/static/bower_components/pageblock/dist/utils/gaTrackErrors",
        "utils/debounce": "/themes/PITheme/static/bower_components/pageblock/dist/utils/debounce",
        "utils/bootstrapMedia": "/themes/PITheme/static/bower_components/pageblock/dist/utils/bootstrapMedia",
        "utils/polyfills": "/themes/PITheme/static/bower_components/pageblock/dist/utils/polyfills",
        // If you want to use example Page and Home classes in your project
        "pages/page": "/themes/PITheme/static/bower_components/pageblock/dist/pages/page"
    }
});

require(['main']);
