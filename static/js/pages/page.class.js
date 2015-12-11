/**
 * BasePage
 */
var BasePage = function(id, context, type, isHome){
    AbstractPage.call(this, id, context, type, isHome);
};

$.extend(BasePage.prototype, AbstractPage.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BasePage.prototype.init = function(id, context, type, isHome){
    var _this = this;

    // console.log('-> Page init : '+id);

    AbstractPage.prototype.init.call(this, id, context, type, isHome);
};
