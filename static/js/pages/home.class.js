/**
 * BaseHome
 */
var BaseHome = function(id, context, type, isHome){
    AbstractPage.call(this, id, context, type, isHome);
};

$.extend(BaseHome.prototype, AbstractPage.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BaseHome.prototype.init = function(id, context, type, isHome){
    var _this = this;

    // console.log('-> Home init : '+id);

    AbstractPage.prototype.init.call(this, id, context, type, isHome);
};
