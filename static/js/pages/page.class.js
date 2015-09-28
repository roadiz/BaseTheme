/**
 * BasePage
 */
var BasePage = function(id, context, type, isHome){
    BaseAbstractPage.call(this, id, context, type, isHome);
};

$.extend(BasePage.prototype, BaseAbstractPage.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BasePage.prototype.init = function(id, context, type, isHome){
    var _this = this;

    console.log('-> Page init : '+id);

    BaseAbstractPage.prototype.init.call(this, id, context, type, isHome);
};
