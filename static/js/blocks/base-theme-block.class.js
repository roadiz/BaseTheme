/**
 * Block basic
 */

var BaseThemeBlockBasic = function(id){
    var _this = this;

    console.log('-> Block - '+id);

    _this.init(id, 'block-basic');
};

$.extend(BaseThemeBlockBasic.prototype, BaseThemeAbstractBlock.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BaseThemeBlockBasic.prototype.init = function(id, type){
    var _this = this;   

    console.log('-> Block init : '+id);

};
