/*
 * ============================================================================
 * DefaultTheme entry point
 * ============================================================================
 */

var DefaultTheme = {};

DefaultTheme.$window = null;
DefaultTheme.$body = null;


/**
 * On document ready
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
DefaultTheme.onDocumentReady = function( event ) {
    var _this = _this;

    DefaultTheme.init();
};


/**
 * Init
 * @return {[type]} [description]
 */
DefaultTheme.init = function(){
    var _this = this;

    // Selectors  
    _this.$window = $(window);
    _this.$body = $('body');
    
    // Events
    // _this.$window.on('resize', $.proxy(_this.resize, _this));
    // _this.$window.trigger('resize');
};


/**
 * Resize
 * @return {[type]} [description]
 */
DefaultTheme.resize = function(){
    var _this = this;

    
};


/*
 * ============================================================================
 * Plug into jQuery standard events
 * ============================================================================
 */
$(document).ready(DefaultTheme.onDocumentReady);