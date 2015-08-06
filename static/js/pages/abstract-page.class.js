
/**
 * Abstract page
 */
var BaseAbstractPage = function(id, context, type, isHome){
    type = type || 'page';

    console.log('=> Abstract page - '+id);

    this.init(id, context, type, isHome);
    this.initEvents();
};

/**
 * Init
 * @return {[type]} [description]
 */
BaseAbstractPage.prototype.init = function(id, context, type, isHome){
    var _this = this;

    _this.id = id;
    _this.context = context;
    _this.type = type;
    _this.isHome = isHome;

    _this.loadDurationMin = 1200; // Time for animate loader

    // --- Selectors --- //
    _this.$cont = $('#page-content-'+_this.id);


    // --- Link --- //

    if(_this.$cont.length) _this.$link = _this.$cont.find('a').not('[target="_blank"]');
    else _this.$link = null;

    // Add target blank on external link
    if(null !== _this.$link && _this.$link.length){
        externalLinkTarget(_this.$link, Base.baseUrl);
        _this.$link = _this.$cont.find('a').not('[target="_blank"]');
    }


    // --- Blocks --- //
    _this.blocks = [];
    _this.$block = _this.$cont.find('.page-block');
    _this.blockLength = _this.$block.length;
    if(_this.blockLength) _this.initBlocks();


    // --- Context --- //
    if(_this.context == 'static' && Base.ajaxEnabled){
        Base.history.pushFirstState(_this.type, _this.id);
    }
    else if(_this.context == 'ajax'){
        _this.initAjax();
    }
};

/**
 * Destroy
 * @return {[type]} [description]
 */
BaseAbstractPage.prototype.destroy = function(){
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
BaseAbstractPage.prototype.initEvents = function(){
    var _this = this;

    _this.$cont.waitForImages({
        finished: $.proxy(_this.onLoad, _this),
        waitForAll: true
    });

    if(_this.$link !== null && Base.ajaxEnabled) {
        _this.$link.on('click', $.proxy(Base.history.linkClick, Base.history));
    }

    Base.$window.on('resize', debounce($.proxy(_this.onResize, _this), 100, false));
};

/**
 * Destroy events
 * @return {[type]} [description]
 */
BaseAbstractPage.prototype.destroyEvents = function(){
    var _this = this;

    if(_this.$link !== null && Base.ajaxEnabled) {
        _this.$link.off('click', $.proxy(Base.history.linkClick, Base.history));
    }

    Base.$window.off('resize', debounce($.proxy(_this.onResize, _this), 100, false));
};

/**
 * On load
 * @return {[type]} [description]
 */
BaseAbstractPage.prototype.onLoad = function(e){
    var _this = this;

    // console.log('=> Page onLoad');

    _this.loadDate = new Date();
    _this.loadDuration = _this.loadDate - Base.history.loadBeginDate;

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
BaseAbstractPage.prototype.show = function(callback){
    var _this = this;

    // Animate
    TweenLite.to(_this.$cont, 0.6, {opacity:1, onComplete:function(){
        Base.history.transition = false;

        if(typeof callback !== 'undefined'){
            callback();
        }
    }});
};

/**
 * Hide
 * @return {[type]} [description]
 */
BaseAbstractPage.prototype.hide = function(callback){
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
BaseAbstractPage.prototype.initAjax = function(){
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
BaseAbstractPage.prototype.initBlocks = function(){
    var _this = this;

    for(var blockIndex = 0; blockIndex < _this.blockLength; blockIndex++) {
        var type = _this.$block[blockIndex].getAttribute('data-node-type'),
            id = _this.$block[blockIndex].id;

        if (typeof Base.nodeTypesClasses[type] !== "undefined") {
            _this.blocks[blockIndex] = new window[Base.nodeTypesClasses[type]](id, type);
        } else _this.blocks[blockIndex] = new AbstractBlock(id, type);
    }
};

/**
 * Resize
 * @return {[type]} [description]
 */
BaseAbstractPage.prototype.onResize = function(){
    var _this = this;

    console.log('=> Page resize');
};
