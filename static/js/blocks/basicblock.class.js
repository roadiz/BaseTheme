/**
 * Basic Block
 */
var BasicBlock = function(id){
    var _this = this;

    console.log('-> Basic Block - '+id);

    _this.init(id, 'basicblock');
};

$.extend(BasicBlock.prototype, AbstractBlock.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BasicBlock.prototype.init = function(id, type){
    var _this = this;
    console.log('-> Block init : '+id);
};
