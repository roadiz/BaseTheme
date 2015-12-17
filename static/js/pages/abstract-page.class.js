
/**
 * Abstract page
 */
var AbstractPage = function(id, context, type, isHome){
    type = type || 'page';

    // console.log('=> Abstract page - '+id);

    this.init(id, context, type, isHome);
    this.initEvents();
};

/**
 * Init
 * @return {[type]} [description]
 */
AbstractPage.prototype.init = function(id, context, type, isHome){
    var _this = this;

    _this.id = id;
    _this.context = context;
    _this.type = type;
    _this.isHome = isHome;

    _this.loadDurationMin = 1200; // Time for animate loader

    // --- Selectors --- //
    _this.$cont = $('#page-content-'+_this.id).eq(0);


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
        Base.history.pushFirstState(_this.type, _this.id, _this.isHome);
    }
    else if(_this.context == 'ajax'){
        _this.initAjax();
    }
};

/**
 * Destroy
 * @return {[type]} [description]
 */
AbstractPage.prototype.destroy = function(){
    var _this = this;


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
    //console.log('=> Destroyed: '+_this.id);
};

/**
 * Init events
 * @return {[type]} [description]
 */
AbstractPage.prototype.initEvents = function(){
    var _this = this;

    if (_this.$cont.find('a').length) {
        _this.$cont.waitForImages({
            finished: $.proxy(_this.onLoad, _this),
            waitForAll: true
        });
    } else {
        _this.onLoad();
    }

    if(_this.$link !== null && Base.ajaxEnabled) {
        _this.$link.on('click', $.proxy(Base.history.linkClick, Base.history));
    }

    Base.$window.on('resize', debounce($.proxy(_this.onResize, _this), 100, false));
};

/**
 * Destroy events
 * @return {[type]} [description]
 */
AbstractPage.prototype.destroyEvents = function(){
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
AbstractPage.prototype.onLoad = function(e){
    var _this = this;

    // console.log('=> Page onLoad');

    _this.loadDate = new Date();
    _this.loadDuration = _this.loadDate - Base.history.loadBeginDate;

    var delay = (_this.loadDuration > _this.loadDurationMin) ? 0 : _this.loadDurationMin - _this.loadDuration;

    // Hide loading
    setTimeout(function(){
        if(_this.context == 'static'){
            // _this.show();
        } else if(_this.context == 'ajax'){

            // Update body id
            Base.$body[0].id = history.state.nodeName;

            // Hide formerPages - show
            if (Base.formerPages.length > 0) {

                var formerPage = Base.formerPages[(Base.formerPages.length - 1)],
                    formerPageDestroy = $.proxy(formerPage.destroy, formerPage);

                //console.log('=> Req destroy on '+formerPage.id);
                /*
                 * Very important,
                 * DO NOT animate if there are more than 1 page
                 * in destroy queue!
                 */
                if (Base.formerPages.length > 1) {
                    formerPageDestroy();
                } else {
                    formerPage.hide(formerPageDestroy);
                }
                Base.formerPages.pop();
            }
            //console.log(Base.formerPages);
            _this.show();
        }
    }, delay);
};

/**
 * Show
 * @return {[type]} [description]
 */
AbstractPage.prototype.show = function(callback){
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
AbstractPage.prototype.hide = function(callback){
    var _this = this;

    // Animate
    //console.log('=> Hiding: '+_this.id);
    TweenLite.to(_this.$cont, 0.6, {opacity:0, onComplete:callback});
};

/**
 * Init ajax
 * @return {[type]} [description]
 */
AbstractPage.prototype.initAjax = function(){
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
AbstractPage.prototype.initBlocks = function(){
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
AbstractPage.prototype.onResize = function(){
    var _this = this;

    // console.log('=> Page resize');
};
