/**
 * Basic Block
 */

var BaseThemeBasicBlock = function(id){
    var _this = this;

    console.log('-> Basic Block - '+id);

    _this.init(id, 'basicblock');
};

$.extend(BaseThemeBasicBlock.prototype, BaseThemeAbstractBlock.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BaseThemeBasicBlock.prototype.init = function(id, type){
    var _this = this;

    console.log('-> Block init : '+id);

};
