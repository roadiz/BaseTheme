/**
 * Block
 */

var BaseThemeBlock = function(id){
    var _this = this;

    // Selectors
    _this.$cont = $('#'+id);

    // Methods
    _this.init();

    
};


/**
 * Init
 * @return {[type]} [description]
 */
BaseThemeBlock.prototype.init = function(){
    var _this = this;

    // Events
    _this.initEvents();

};


/**
 * Init events
 * @return {[type]} [description]
 */
BaseThemeBlock.prototype.initEvents = function(){
    var _this = this;

    BaseTheme.$window.on('resize', debounce($.proxy(_this.resize, _this), 50, false));
};

/**
 * Destroy
 * @return {[type]} [description]
 */
BaseThemeBlock.prototype.destroy = function(){
    var _this = this;

    // Events
    _this.destroyEvents();
};


/**
 * Destroy events
 * @return {[type]} [description]
 */
BaseThemeBlock.prototype.destroyEvents = function(){
    var _this = this;

    BaseTheme.$window.off('resize', debounce($.proxy(_this.resize, _this), 50, false));
};


/**
 * Resize
 * @return {[type]} [description]
 */
BaseThemeBlock.prototype.resize = function(){
    var _this = this;

};
