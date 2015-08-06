/**
 * Contact Block
 */
var ContactBlock = function(id, type){
    AbstractBlock.call(this, id, type);
};

$.extend(ContactBlock.prototype, AbstractBlock.prototype);

/**
 * Init
 * @return {[type]} [description]
 */
ContactBlock.prototype.init = function(id, type){
    var _this = this;

    console.log('-> ContactBlock init : '+id);

    AbstractBlock.prototype.init.call(this, id, type);

    _this.$form = _this.$cont.find('form');
    _this.$formBtn = _this.$form.find('button');
    _this.$submitBtn = _this.$cont.find('.contactblock-submit-btn');
    _this.$formMessage = _this.$cont.find('.form-message');

    _this.initEvents();
};


/**
 * Init events
 * @return {[type]} [description]
 */
ContactBlock.prototype.initEvents = function(e){
    var _this = this;

    AbstractBlock.prototype.initEvents.call(this, e);

    if(_this.$form.length) _this.$form.on('submit', $.proxy(_this.formSubmit, _this));
    if(_this.$submitBtn.length) _this.$submitBtn.on('click', $.proxy(_this.submitBtnClick, _this));
};


/**
 * Destroy events
 * @return {[type]} [description]
 */
ContactBlock.prototype.destroyEvents = function(e){
    var _this = this;

    AbstractBlock.prototype.destroyEvents.call(this, e);

    if(_this.$form.length) _this.$form.off('submit', $.proxy(_this.formSubmit, _this));
    if(_this.$submitBtn.length) _this.$submitBtn.off('click', $.proxy(_this.submitBtnClick, _this));
};


/**
 * Submit btn click
 * @return {[type]} [description]
 */
ContactBlock.prototype.submitBtnClick = function(e){
    var _this = this;

    if(_this.$formBtn.length) _this.$formBtn.trigger('click');
};

/**
 * Form submit
 * @return {[type]} [description]
 */
ContactBlock.prototype.formSubmit = function(e){
    var _this = this;

    $.ajax({
        url: e.currentTarget.action,
        data : _this.$form.serialize(),
        type: 'post',
        dataType: 'json',
        success: function(data){
            // console.log(data.status);
            if (data.status != 'success') {
                _this.$formMessage[0].className = 'form-message form-message-'+data.status;
                _this.$formMessage[0].innerHTML = data.message;
            } else {
                _this.$formMessage[0].className = 'form-message form-message-'+data.status;
                _this.$formMessage[0].innerHTML = data.message;
            }
        },
        error: function(data){
            data = data.responseJSON;
            // console.log(data);
            _this.$formMessage[0].className = 'form-message form-message-error form-message-'+data.status;
            _this.$formMessage[0].innerHTML = data.errors;
        }
    });

    e.preventDefault();
};
