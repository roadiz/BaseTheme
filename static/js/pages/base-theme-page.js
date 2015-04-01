
/**
 * Page
 * @param {[type]} id      [identifier]
 * @param {[type]} context ["static" or "ajax"]
 */
var BaseThemePage = function(id, context){
    var _this = this;

    // console.log('Page - '+id);

    _this.id = id;
    _this.context = context;


    // --- Selectors --- //
    _this.$cont = $('#page-content-'+_this.id);
    _this.type = (_this.$cont.length) ? _this.$cont[0].getAttribute('data-node-type') : 'page';

    // --- Methods --- //
    if(_this.context == 'static' && _this.$cont.length) _this.init();
};


/**
 * Init
 * @return {[type]} [description]
 */
BaseThemePage.prototype.init = function(){
    var _this = this;

    // First loading
    if(_this.context == 'static'){

    }

    // Blocks
    _this.initBlocks();

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
BaseThemePage.prototype.initEvents = function(){
    var _this = this;


};


/**
 * Destroy events
 * @return {[type]} [description]
 */
BaseThemePage.prototype.destroyEvents = function(){
    var _this = this;


};


/**
 * Init ajax
 * @return {[type]} [description]
 */
BaseThemePage.prototype.initAjax = function(){
    var _this = this;

    // --- Change title --- //

    var metaTitle = _this.$cont[0].getAttribute('data-meta-title');
    if(metaTitle !== null && metaTitle !== '') document.title = metaTitle;
};


/**
 * Init blocks (carrousel, thumbnails, activities)
 * @return {[type]} [description]
 */
BaseThemePage.prototype.initBlocks = function(){
    var _this = this;

    // Blocks carrousel
    _this.$blockCarrousel = _this.$cont.find('.block-carrousel');

    for(var carrouselIndex = 0, carrouselLength = _this.$blockCarrousel.length; carrouselIndex < carrouselLength; carrouselIndex++) {
        _this.carrousel[carrouselIndex] = new MraBlockCarrousel(_this.$blockCarrousel[carrouselIndex].id);
    }

    // Blocks thumbnails
    _this.$blockThumbnails = _this.$cont.find('.block-thumbnails');

    for(var thumbIndex = 0, thumbLength = _this.$blockThumbnails.length; thumbIndex < thumbLength; thumbIndex++) {
        _this.thumbnails[thumbIndex] = new MraBlockThumbnails(_this.$blockThumbnails[thumbIndex].id, _this.isHome);
    }

    // Blocks activities
    _this.$blockActivities = _this.$cont.find('.block-activities');

    for(var activitiesIndex = 0, activitiesLength = _this.$blockActivities.length; activitiesIndex < activitiesLength; activitiesIndex++) {
        _this.activities[activitiesIndex] = new MraBlockActivities(_this.$blockActivities[activitiesIndex].id);
    }
};


/**
 * Destroy
 * @return {[type]} [description]
 */
BaseThemePage.prototype.destroy = function(){
    var _this = this;

    // --- Fade & remove --- //
    TweenLite.to(_this.$cont, 0.6, {opacity:0, onComplete:function(){
        _this.$cont.remove();
    }});

    // --- Events --- //
    _this.destroyEvents();


    // --- Blocks --- //
    if(_this.blocks !== null) _this.blocks.destroy();
};


/**
 * Resize
 * @return {[type]} [description]
 */
BaseThemePage.prototype.resize = function(){
    var _this = this;

    // console.log('-> Page resize');

    // --- Canvas --- //
    if(_this.canvas !== null) _this.canvas.resize();


    // --- Blocks --- //
    if(_this.blocks !== null) _this.blocks.resize();
};
