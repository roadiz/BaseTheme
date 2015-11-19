/**
 * BaseHome
 */
var BaseHome = function(id, context, type, isHome){
    BaseAbstractPage.call(this, id, context, type, isHome);
};

$.extend(BaseHome.prototype, BaseAbstractPage.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BaseHome.prototype.init = function(id, context, type, isHome){
    var _this = this;

    // console.log('-> Home init : '+id);

    BaseAbstractPage.prototype.init.call(this, id, context, type, isHome);
};
