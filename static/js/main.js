/*
 * ============================================================================
 * BaseTheme entry point
 * ============================================================================
 */

var BaseTheme = {};

BaseTheme.$window = null;
BaseTheme.$body = null;

BaseTheme.isMobile = false;

BaseTheme.windowWidth = 1920;
BaseTheme.windowHeight = 1280;


/**
 * On document ready
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
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
    _this.$window.on('resize', $.proxy(_this.resize, _this));
    _this.$window.trigger('resize');
};


/**
 * Resize
 * @return {[type]} [description]
 */
BaseTheme.resize = function(){
    var _this = this;

    _this.windowWidth = _this.$window.innerWidth();
    _this.windowHeight = _this.$window.innerHeight();
};


/*
 * ============================================================================
 * Plug into jQuery standard events
 * ============================================================================
 */
$(document).ready(BaseTheme.onDocumentReady);
