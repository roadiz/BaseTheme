/**
 * BasePage
 */

var BasePage = function(id, context){
    var _this = this;

    console.log('-> BasePage - '+id);

    _this.init(id, context, 'page');
};

$.extend(BasePage.prototype, BaseAbstractPage.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BasePage.prototype.init = function(id, context, type){
    var _this = this;

    console.log('-> BasePage init : '+id);

    BaseAbstractPage.prototype.init.call(this, id, context, type);
};
