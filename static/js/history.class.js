/**
 * History
 */

var BaseThemeHistory = function(){
    var _this = this;

    _this.state = null;
    _this.stateBlock = true;
    _this.transition = false;

    // Methods
    _this.init();
};


/**
 * Init
 * @return {[type]} [description]
 */
BaseThemeHistory.prototype.init = function(){
    var _this = this;

    // Events
    if(BaseTheme.ajaxEnabled && Modernizr.history){

        // Push first state
        history.pushState({'firstPage': true, 'href':  window.location.href}, null, window.location.href);
        window.onpopstate = $.proxy(_this.onPopState, _this);
    }
};


/**
 * On pop state
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
BaseThemeHistory.prototype.onPopState = function(e) {
    var _this = this;

    if (typeof e.state !== "undefined" && e.state !== null) {
        // console.log('------------');
        // console.log('-> Pop state');
        // console.log(event.state);
        // console.log('------------');
        _this.loadPage(e, e.state);
    }
};


/**
 * Boot
 * @return {[type]} [description]
 */
BaseThemeHistory.prototype.boot = function(nodeType, id, context){
    var _this = this;

    // console.log('Boot '+nodeType+' - '+id);

    // Page 
    if(nodeType && typeof BaseTheme.nodeTypesClasses[nodeType] !== 'undefined'){
        BaseTheme.page = new window[BaseTheme.nodeTypesClasses[nodeType]](id, context);
    }
    // Static pages
    else BaseTheme.page = new BaseThemeAbstractPage(id, context);
};


/**
 * Destroy
 * @return {[type]} [description]
 */
BaseThemeHistory.prototype.destroy = function(){
    var _this = this;

    // Events

};


/**
 * Link click
 * @return {[type]} [description]
 */
BaseThemeHistory.prototype.linkClick = function(e){
    var _this = this;

    // console.log('-> Link click');

    var linkClassName = e.currentTarget.className,
        linkHref = e.currentTarget.href;

    // No mailto
    if(linkHref.indexOf('mailto:') == -1){

        e.preventDefault();

        // Check if link is not active
        if( linkClassName.indexOf('active') == -1 && 
            linkClassName.indexOf('no-ajax-link') == -1 && 
            !_this.transition) {

            _this.transition = true;

            var context = (e.currentTarget.className.indexOf('nav-link') >= 0) ? 'nav' : 'link',
                dataHome = e.currentTarget.getAttribute('data-is-home'),
                isHome = (dataHome == '1') ? true : false,
                title = e.currentTarget.getAttribute('data-title');

            if(title === '') title = e.currentTarget.innerHTML;

            var state = {
                'nodeType'      : e.currentTarget.getAttribute('data-node-type'),
                'nodeName'      : e.currentTarget.getAttribute('data-node-name'),
                'index'         : Number(e.currentTarget.getAttribute('data-index')),
                'transition'    : BaseTheme.page.type+'_to_'+e.currentTarget.getAttribute('data-node-type'),
                'context'       : context,
                'is_home'       : isHome
            };

            history.pushState(state, title, e.currentTarget.href);

            _this.loadPage(e, state);
        }
    }
};


/**
 * Load page
 * @return {[type]} [description]
 */
BaseThemeHistory.prototype.loadPage = function(e, state){
    var _this = this;
    
    // console.log('-> History load page');

    _this.loadBeginDate = new Date();

    // Load content
    $.ajax({
        url: e.currentTarget.href,
        type: 'get',
        success: function(data){

            // console.log('-> History page loaded');

            BaseTheme.$ajaxContainer.append(data);

            // Disappear & destroy page
            BaseTheme.formerPage = BaseTheme.page;
            BaseTheme.page = null;
            BaseTheme.formerPage.hide($.proxy(BaseTheme.formerPage.destroy, BaseTheme.formerPage));

            // Init new page
            _this.boot(state.nodeType, state.nodeName, 'ajax');

            // Update nav
            BaseTheme.nav.update(state);

            // Update body id
            BaseTheme.$body[0].id = state.nodeName;

            // Analytics
            if(typeof ga !== "undefined") ga('send', 'pageview', {'page':state.href, 'title':document.title});
        }
    });

};
