/**
 * Nav
 */
var BaseNav = function(){
    var _this = this;

    console.log('Nav');

    // Selectors
    _this.$cont = Base.$nav;
    _this.$list = $('#nav-list');
    _this.$item = _this.$list.find('.nav-item');
    _this.$link = _this.$list.find('.nav-link');

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

    console.log('-> Nav resize');
};
