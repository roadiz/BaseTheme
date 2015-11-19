/**
 * Nav
 */
var BaseNav = function(){
    var _this = this;

    // console.log('Nav');

    // Selectors
    _this.$cont = Base.$nav;
    _this.$list = $('#nav-list');
    _this.$item = _this.$list.find('.nav-item');
    _this.$link = _this.$list.find('.nav-link');

    _this.$btn = $('#nav-btn');
    _this.$overlay = $('#nav-overlay');

    _this.opened = false;

    // Methods
    _this.init();
};


/**
 * Init
 * @return {[type]} [description]
 */
BaseNav.prototype.init = function(){
    var _this = this;

    // Events
    _this.initEvents();
};


/**
 * Init events
 * @return {[type]} [description]
 */
BaseNav.prototype.initEvents = function(){
    var _this = this;

    if(!isMediaMinSM()) _this.$btn.on('click', $.proxy(_this.btnClick, _this));

    if(_this.$link.length && Base.ajaxEnabled) {
        _this.$link.on('click', $.proxy(Base.history.linkClick, Base.history));
    }

    Base.$window.on('resize', debounce($.proxy(_this.resize, _this), 100, false));
};


/**
 * Destroy events
 * @return {[type]} [description]
 */
BaseNav.prototype.destroyEvents = function(){
    var _this = this;

    if(!isMediaMinSM()) _this.$btn.off('click', $.proxy(_this.btnClick, _this));

    if(_this.$link.length && Base.ajaxEnabled) {
        _this.$link.off('click', $.proxy(Base.history.linkClick, Base.history));
    }

    Base.$window.off('resize', debounce($.proxy(_this.resize, _this), 100, false));
};


/**
 * Destroy
 * @return {[type]} [description]
 */
BaseNav.prototype.destroy = function(){
    var _this = this;

    // Events
    _this.destroyEvents();
};


/**
 * Btn click
 * @return {[type]} [description]
 */
BaseNav.prototype.btnClick = function(e){
    var _this = this;

    if(!_this.opened) _this.open();
    else _this.close();
};

/**
 * Open
 * @return {[type]} [description]
 */
BaseNav.prototype.open = function(e){
    var _this = this;

    if(!_this.opened){

        var contXfrom = Math.round(-0.8*Base.windowSize.width);
        TweenLite.fromTo(_this.$cont, 0.8, {x:contXfrom},{x:0});

        _this.$overlay[0].style.display = 'block';
        TweenLite.to(_this.$overlay, 1.2, {opacity:1});

        _this.opened = true;
    }
};

/**
 * Close
 * @return {[type]} [description]
 */
BaseNav.prototype.close = function(e){
    var _this = this;

    if(_this.opened){

        var contX = Math.round(-0.8*Base.windowSize.width);
        TweenLite.to(_this.$cont, 0.8, {x:contX});

        TweenLite.to(_this.$overlay, 1.2, {opacity:0, onComplete:function(){
            _this.$overlay[0].style.display = 'none';
        }});

        _this.opened = false;
    }
};


/**
 * Update
 * @return {[type]} [description]
 */
BaseNav.prototype.update = function(state){
    var _this = this;

    _this.$item.removeClass('active');
    _this.$link.removeClass('active');

    var $navItem = $('#nav-item-'+state.nodeName),
        $navLink = $('#nav-link-'+state.nodeName);

    if($navItem.length) addClass($navItem[0], 'active');
    if($navLink.length) addClass($navLink[0], 'active');

};


/**
 * Window resize callback
 * @return {[type]} [description]
 */
BaseNav.prototype.resize = function(){
    var _this = this;

    // console.log('-> Nav resize');
};
