/**
 * Page
 */

var BaseThemePage = function(id, context){
    var _this = this;

    console.log('-> Page - '+id);

    _this.type = 'page';
    _this.init(id, context);
};

$.extend(BaseThemePage.prototype, BaseThemeAbstractPage.prototype);
