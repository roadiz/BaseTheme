/**
 * Project
 */

var Project = function(id, context){
    var _this = this;

    console.log('-> Project');

    _this.init(id, context, 'project');
};

$.extend(Project.prototype, AbstractPage.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
Project.prototype.init = function(id, context, type){
    var _this = this;

    console.log('-> Project init : '+id);

    AbstractPage.prototype.init.call(this, id, context, type);
};
