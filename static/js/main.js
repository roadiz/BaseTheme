/*
 * ============================================================================
 * BaseTheme entry point
 * ============================================================================
 */

var Base = {};

Base.$window = null;
Base.$body = null;

Base.windowSize = {
    width: 1920,
    height: 1280
};

Base.firstResize = true;

Base.$nav = null;
Base.nav = null;

Base.isMobile = false;
Base.isIE = false;

Base.page = null;
Base.formerPage = null;

Base.nodeTypesClasses = {
    'page' : 'Page',
    'project' : 'Project',
    'basicblock' : 'BasicBlock',
    'mapblock' : 'MapBlock'
};

Base.$ajaxContainer = null;
Base.ajaxEnabled = true;
Base.gmapLoaded = false;

Base.creditsList = [
    {
        name:'roadiz',
        website:'www.roadiz.io'
    },
    {
        name:'GSAP',
        website:'www.greensock.com'
    }
];

/**
 * On document ready
 */
Base.onDocumentReady = function(e) {
    var _this = _this;

    // Store temp configuration
    for( var index in temp ){
        Base[index] = temp[index];
    }

    Base.init();
};


/**
 * Init
 */
Base.init = function(){
    var _this = this;

    logCredits('Base','#000', Base.creditsList);

    // Set default TweenLite ease
    TweenLite.defaultEase = Expo.easeOut;

    // Selectors
    _this.$window = $(window);
    _this.$body = $('body');

    _this.$ajaxContainer = $('#ajax-container');

    // Set first window size
    var viewport = getViewportSize();

    _this.windowSize = {
        width : viewport.width,
        height : viewport.height
    };

    // isMobile test
    _this.isMobile = (isMobile.any === false) ? false : true;
    if(_this.isMobile) addClass(_this.$body[0],'is-mobile');

    // IE Test
    if(navigator.userAgent.indexOf('MSIE') >= 0 ||
        navigator.userAgent.indexOf('Trident') >= 0){
        _this.isIE = true;
        addClass(_this.$body[0],'ie');
    }

    // Disable ajax if history is not available
    if(!Modernizr.history) Base.ajaxEnabled = false;

    // History
    _this.history = new BaseHistory();
    _this.history.boot(_this.$body[0].getAttribute('data-node-type'), _this.$body[0].id, 'static');

    // Nav
    _this.$nav = $('#nav');
    if(_this.$nav.length) _this.nav = new BaseNav();


    // Events
    _this.$window.on('resize', debounce($.proxy(_this.resize, _this), 50, false));
    _this.$window.on('orientationchange', debounce($.proxy(_this.resize, _this), 50, false));
    _this.$window.trigger('resize');

    gaTrackErrors();
};


/**
 * Resize
 */
Base.resize = function(){
    var _this = this;

    console.log('-> Resize');

    // Check is sizes has changed
    var viewport = getViewportSize();

    if(viewport.width !== _this.windowSize.width ||
        viewport.height !== _this.windowSize.height ||
        _this.firstResize){

        _this.windowSize = getViewportSize();

        console.log('ww : '+_this.windowSize.width);
        console.log('wh : '+_this.windowSize.height);

        if(_this.firstResize) _this.firstResize = false;
    }
};

/**
 * Dispatch Google Maps initialization
 * over every page blocks.
 *
 * This method must be called as a Google Map callback
 * after external JS lib has been loaded:
 *
 *     Base.gmapLoaded = true;
 *     var script = document.createElement('script');
 *     script.type = 'text/javascript';
 *     script.src = '//maps.googleapis.com/maps/api/js?key=' +
 *         Base.googleClientId +
 *         '&callback=Base.initMaps';
 *     document.body.appendChild(script);
 */
Base.initMaps = function () {
    var _this = this;

    _this.gmapLoaded = true;

    for(var blockIndex = 0; blockIndex < _this.page.blockLength; blockIndex++) {
        var block = _this.page.blocks[blockIndex];
        block.initMaps();
    }
};


/*
 * ============================================================================
 * Plug into jQuery standard events
 * ============================================================================
 */
$(document).ready(Base.onDocumentReady);
