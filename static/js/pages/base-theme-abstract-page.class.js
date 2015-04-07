
/**
 * Abstract page
 * @param {[type]} id      [identifier]
 * @param {[type]} context ["static" or "ajax"]
 */
var BaseThemeAbstractPage = function(id, context){
    var _this = this;

    console.log('Page - '+id);

    _this.init(id, context);
};


/**
 * Init
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.init = function(id, context){
    var _this = this;

    _this.id = id;
    _this.context = context;


    // --- Selectors --- //
    _this.$cont = $('#page-content-'+_this.id);
    _this.type = (_this.$cont.length) ? _this.$cont[0].getAttribute('data-node-type') : 'page';

    _this.blocks = [];
    _this.$block = _this.$cont.find('.page-block');
    _this.blockLength = _this.$block.length;

    // --- Methods --- //
    if(_this.context == 'static' && _this.$cont.length) _this.init();

    // First loading
    if(_this.context == 'static'){

    }

    // Blocks
    if(_this.blockLength) _this.initBlocks();

    // Ajax
    if(_this.context == 'ajax'){
        _this.initAjax();
    }

    // Events
    _this.initEvents();
};


/**
 * Init events
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.initEvents = function(){
    var _this = this;

    BaseTheme.$window.on('resize', debounce($.proxy(_this.resize, _this), 100, false));
};


/**
 * Destroy
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.destroy = function(){
    var _this = this;

    // --- Fade & remove --- //
    TweenLite.to(_this.$cont, 0.6, {opacity:0, onComplete:function(){
        _this.$cont.remove();
    }});

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
 * Destroy events
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.destroyEvents = function(){
    var _this = this;

    BaseTheme.$window.off('resize', debounce($.proxy(_this.resize, _this), 100, false));
};


/**
 * Init ajax
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.initAjax = function(){
    var _this = this;

    // --- Change title --- //
    var metaTitle = _this.$cont[0].getAttribute('data-meta-title');
    if(metaTitle !== null && metaTitle !== '') document.title = metaTitle;
};


/**
 * Init blocks
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.initBlocks = function(){
    var _this = this;

    for(var blockIndex = 0; blockIndex < _this.blockLength; blockIndex++) {
        _this.blocks[blockIndex] = new BaseThemeBlock(_this.$block[blockIndex].id);
    }
};


/**
 * Resize
 * @return {[type]} [description]
 */
BaseThemeAbstractPage.prototype.resize = function(){
    var _this = this;

    console.log('-> Page resize');
};
