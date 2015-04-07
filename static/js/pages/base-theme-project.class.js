/**
 * Project
 */

var BaseThemeProject = function(id, context){
    var _this = this;

    console.log('-> Project');

    _this.init(id, context);
};

$.extend(BaseThemeProject.prototype, BaseThemeAbstractPage.prototype);
