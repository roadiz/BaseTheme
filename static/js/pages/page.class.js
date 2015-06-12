/**
 * Page
 */

var Page = function(id, context){
    var _this = this;

    console.log('-> Page - '+id);

    _this.init(id, context, 'page');
};

$.extend(Page.prototype, AbstractPage.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
Page.prototype.init = function(id, context, type){
    var _this = this;

    console.log('-> Page init : '+id);

    AbstractPage.prototype.init.call(this, id, context, type);
};
