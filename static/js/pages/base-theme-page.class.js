/**
 * Page
 */

var BaseThemePage = function(id, context){
    var _this = this;

    console.log('-> Page - '+id);
    
    _this.init(id, context, 'page');
};

$.extend(BaseThemePage.prototype, BaseThemeAbstractPage.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BaseThemePage.prototype.init = function(id, context, type){
    var _this = this;   

    console.log('-> Page init : '+id);

    BaseThemeAbstractPage.prototype.init.call(this, id, context, type);
};
