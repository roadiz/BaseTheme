/**
 * BaseHome
 */

var BaseHome = function(id, context){
    var _this = this;

    console.log('-> BaseHome - '+id);

    _this.init(id, context, 'home');
};

$.extend(BaseHome.prototype, BaseAbstractPage.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BaseHome.prototype.init = function(id, context, type){
    var _this = this;

    console.log('-> BaseHome init : '+id);

    BaseAbstractPage.prototype.init.call(this, id, context, type);
};
