/**
 * Block basic
 */

var BaseThemeBlockBasic = function(id){
    var _this = this;

    console.log('-> Block - '+id);

    _this.type = 'block-basic';
    _this.init(id);
};

$.extend(BaseThemeBlockBasic.prototype, BaseThemeAbstractBlock.prototype);
