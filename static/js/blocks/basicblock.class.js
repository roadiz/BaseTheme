/**
 * Basic Block
 */
var BasicBlock = function(id, type){
    AbstractBlock.call(this, id, type);
};

$.extend(BasicBlock.prototype, AbstractBlock.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BasicBlock.prototype.init = function(id, type){
    var _this = this;

    // console.log('-> BasicBlock init : '+id);

    AbstractBlock.prototype.init.call(this, id, type);
};
