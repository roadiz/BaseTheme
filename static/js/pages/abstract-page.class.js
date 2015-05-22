
/**
 * Abstract page
 */
var BaseThemeAbstractPage = function(id, context, type){
    var _this = this;

    console.log('=> Abstract page - '+id);
};


/**
 * Init
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.init = function(id, context, type){
    var _this = this;

    _this.id = id;
    _this.context = context;
    _this.type = type;

    _this.loadDurationMin = 1200; // Time for animate loader

    // --- Selectors --- //
    _this.$cont = $('#page-content-'+_this.id);

    if(_this.$cont.length) _this.$link = _this.$cont.find('a').not('[target="_blank"]');
    else _this.$link = null;

    // Blocks
    _this.blocks = [];
    _this.$block = _this.$cont.find('.page-block');
    _this.blockLength = _this.$block.length;
    if(_this.blockLength) _this.initBlocks();

    // Ajax
    if(_this.context == 'ajax'){
        _this.initAjax();
    }

    // Events
    _this.initEvents();
};


/**
 * Destroy
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.destroy = function(){
    var _this = this;

    // console.log('=> Page Destroy');

    // --- Fade & remove --- //
    _this.$cont.remove();

    // --- Events --- //
    _this.destroyEvents();


    // --- Blocks --- //
    if(_this.blocks !== null){
        for(var blockIndex = 0; blockIndex < _this.blockLength; blockIndex++) {
            _this.blocks[blockIndex].destroy();
        }
    }
};


/**
 * Init events
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.initEvents = function(){
    var _this = this;

    _this.$cont.waitForImages({
        finished: $.proxy(_this.onLoad, _this),
        waitForAll: true
    });

    if(_this.$link !== null && BaseTheme.ajaxEnabled) _this.$link.on('click', $.proxy(BaseTheme.history.linkClick, BaseTheme.history));

    BaseTheme.$window.on('resize', debounce($.proxy(_this.onResize, _this), 100, false));
};


/**
 * Destroy events
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.destroyEvents = function(){
    var _this = this;

    if(_this.$link !== null && BaseTheme.ajaxEnabled) _this.$link.off('click', $.proxy(BaseTheme.history.linkClick, BaseTheme.history));

    BaseTheme.$window.off('resize', debounce($.proxy(_this.onResize, _this), 100, false));
};


/**
 * On load
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.onLoad = function(e){
    var _this = this;

    // console.log('=> Page onLoad');

    _this.loadDate = new Date();
    _this.loadDuration = _this.loadDate - BaseTheme.history.loadBeginDate;

    var delay = (_this.loadDuration > _this.loadDurationMin) ? 0 : _this.loadDurationMin - _this.loadDuration;

    // Hide loading
    setTimeout(function(){

    }, delay);

    // Show
    _this.show();

};


/**
 * Show
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.show = function(callback){
    var _this = this;

    // Animate
    TweenLite.to(_this.$cont, 0.6, {opacity:1, onComplete:function(){
        BaseTheme.history.transition = false;

        if(typeof callback !== 'undefined'){
            callback();
        }
    }});
};


/**
 * Hide
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.hide = function(callback){
    var _this = this;

    // Animate
    TweenLite.to(_this.$cont, 0.6, {opacity:0, onComplete:function(){
        if(typeof callback !== 'undefined'){
            callback();
        }
    }});
};


/**
 * Init ajax
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.initAjax = function(){
    var _this = this;

    // --- Change title --- //
    if(_this.$cont.length && _this.$cont[0].getAttribute('data-meta-title') !== ''){
        var metaTitle = _this.$cont[0].getAttribute('data-meta-title');
        if(metaTitle !== null && metaTitle !== '') document.title = metaTitle;
    }
};


/**
 * Init blocks
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.initBlocks = function(){
    var _this = this;

    for(var blockIndex = 0; blockIndex < _this.blockLength; blockIndex++) {
        var nodeType = _this.$block[blockIndex].getAttribute('data-node-type'),
            id = _this.$block[blockIndex].id;
        if (typeof BaseTheme.nodeTypesClasses[nodeType] !== "undefined") {
            _this.blocks[blockIndex] = new window[BaseTheme.nodeTypesClasses[nodeType]](id);
        }
    }
};


/**
 * Resize
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.onResize = function(){
    var _this = this;

    console.log('=> Page resize');
};