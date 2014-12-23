/*
 * ============================================================================
 * BaseTheme entry point
 * ============================================================================
 */

var BaseTheme = {};

BaseTheme.$window = null;
BaseTheme.$body = null;


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
    
    // Events
    // _this.$window.on('resize', $.proxy(_this.resize, _this));
    // _this.$window.trigger('resize');
};


/**
 * Resize
 * @return {[type]} [description]
 */
BaseTheme.resize = function(){
    var _this = this;

    
};


/*
 * ============================================================================
 * Plug into jQuery standard events
 * ============================================================================
 */
$(document).ready(BaseTheme.onDocumentReady);