/**
 * Project
 */

var BaseThemeProject = function(id, context){
    var _this = this;

    console.log('-> Project');

    _this.init(id, context, 'project');
};

$.extend(BaseThemeProject.prototype, BaseThemeAbstractPage.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
BaseThemeProject.prototype.init = function(id, context, type){
    var _this = this;   

    console.log('-> Project init : '+id);

    BaseThemeAbstractPage.prototype.init.call(this, id, context, type);
};
