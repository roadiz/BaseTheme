/**
 * Abstract block
 */
var AbstractBlock = function(id, type){
    var _this = this;

    console.log('=> Abstract block - '+id);

    _this.init(id, type);
    _this.initEvents();
};

/**
 * Init
 */
AbstractBlock.prototype.init = function(id, type){
    var _this = this;

    _this.id = id;
    _this.type = type;

    // Selectors
    _this.$cont = $('#'+id);
};


/**
 * Init events
 */
AbstractBlock.prototype.initEvents = function(){
    var _this = this;

    Base.$window.on('resize', debounce($.proxy(_this.resize, _this), 50, false));
};


/**
 * Destroy
 */
AbstractBlock.prototype.destroy = function(){
    var _this = this;

    // Events
    _this.destroyEvents();
};


/**
 * Destroy events
 */
AbstractBlock.prototype.destroyEvents = function(){
    var _this = this;

    Base.$window.off('resize', debounce($.proxy(_this.resize, _this), 50, false));
};


/**
 * Resize
 */
AbstractBlock.prototype.resize = function(){
    var _this = this;

};

/**
 * Init maps.
 *
 * This method must be dispatched by Base.initMaps callback
 * method.
 */
AbstractBlock.prototype.initMaps = function(){
    var _this = this;

};
