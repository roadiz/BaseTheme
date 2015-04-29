/**
 * Abstract block
 */

var BaseThemeAbstractBlock = function(id){
    var _this = this;

    console.log('=> Abstract block - '+id);    
};


/**
 * Init
 * @return {[type]} [description]
 */
BaseThemeAbstractBlock.prototype.init = function(id, type){
    var _this = this;

    _this.id = id;
    _this.type = type;

    // Selectors
    _this.$cont = $('#'+id);

    // Events
    _this.initEvents();
};


/**
 * Init events
 * @return {[type]} [description]
 */
BaseThemeAbstractBlock.prototype.initEvents = function(){
    var _this = this;

    BaseTheme.$window.on('resize', debounce($.proxy(_this.resize, _this), 50, false));
};


/**
 * Destroy
 * @return {[type]} [description]
 */
BaseThemeAbstractBlock.prototype.destroy = function(){
    var _this = this;

    // Events
    _this.destroyEvents();
};


/**
 * Destroy events
 * @return {[type]} [description]
 */
BaseThemeAbstractBlock.prototype.destroyEvents = function(){
    var _this = this;

    BaseTheme.$window.off('resize', debounce($.proxy(_this.resize, _this), 50, false));
};


/**
 * Resize
 * @return {[type]} [description]
 */
BaseThemeAbstractBlock.prototype.resize = function(){
    var _this = this;

};
