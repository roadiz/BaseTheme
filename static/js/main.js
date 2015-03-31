/*
 * ============================================================================
 * BaseTheme entry point
 * ============================================================================
 */

var BaseTheme = {};

BaseTheme.$window = null;
BaseTheme.$body = null;

BaseTheme.isMobile = false;
BaseTheme.windowSize = {
    width: 1920,
    height: 1280
};


/**
 * On document ready
 * @param event
 */
BaseTheme.onDocumentReady = function(e) {
    var _this = _this;

    // Store temp configuration
    for( var index in temp ){
        BaseTheme[index] = temp[index];
    }

    BaseTheme.init();
};


/**
 * Init
 * @return {[type]} [description]
 */
BaseTheme.init = function(){
    var _this = this;

    // Selectors
    _this.$window = $(window);
    _this.$body = $('body');

    // isMobile test
    _this.isMobile = (isMobile.any() === null) ? false : true;
    if(_this.isMobile) addClass(_this.$body[0],'is-mobile');

    // Events
    _this.$window.on('resize', $.proxy(_this.windowResize, _this));
    _this.$window.trigger('resize');
};


/**
 * Window resize event
 * @return {[type]} [description]
 */
BaseTheme.windowResize = function(e){
    var _this = this;

    requestAnimFrame($.proxy(_this.resize, _this));
};


/**
 * Resize
 * @return {[type]} [description]
 */
BaseTheme.resize = function(){
    var _this = this;

    // Check is sizes has changed
    var viewport = getViewportSize();

    if(viewport.width !== windowSize.width || windowSize.height !== windowSize.height){

        _this.windowSize = getViewportSize();
    }

};


/*
 * ============================================================================
 * Plug into jQuery standard events
 * ============================================================================
 */
$(document).ready(BaseTheme.onDocumentReady);
