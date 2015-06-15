/**
 * BasePage
 */

var BasePage = function(id, context){
    var _this = this;

    console.log('-> BasePage - '+id);

    _this.init(id, context, 'page');
};

$.extend(BasePage.prototype, AbstractBasePage.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BasePage.prototype.init = function(id, context, type){
    var _this = this;

    console.log('-> BasePage init : '+id);

    AbstractBasePage.prototype.init.call(this, id, context, type);
};
