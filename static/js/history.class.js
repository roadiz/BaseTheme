/**
 * History
 */

var BaseHistory = function(){
    var _this = this;

    _this.state = null;
    _this.stateBlock = true;
    _this.transition = false;
    _this.init();
};

/**
 * Init.
 */
BaseHistory.prototype.init = function(){
    var _this = this;

    // Events
    if(Base.ajaxEnabled && Modernizr.history){

        // Push first state
        history.pushState({
            'firstPage': true,
            'href':  window.location.href
        }, null, window.location.href);
        window.onpopstate = $.proxy(_this.onPopState, _this);
    }
};


/**
 * On pop state.
 */
BaseHistory.prototype.onPopState = function(e) {
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
 * Boot.
 */
BaseHistory.prototype.boot = function(nodeType, id, context){
    var _this = this;

    // console.log('Boot '+nodeType+' - '+id);

    if(context == 'static') _this.loadBeginDate = new Date();

    // Page
    if(nodeType && typeof Base.nodeTypesClasses[nodeType] !== 'undefined') {
        Base.page = new window[Base.nodeTypesClasses[nodeType]](id, context);
    } else {
        // Static pages
        Base.page = new AbstractPage(id, context);
    }
};

/**
 * Destroy.
 */
BaseHistory.prototype.destroy = function(){
    var _this = this;

    // Events

};

/**
 * Link click.
 */
BaseHistory.prototype.linkClick = function(e){
    var _this = this;

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
                'transition'    : Base.page.type+'_to_'+e.currentTarget.getAttribute('data-node-type'),
                'context'       : context,
                'is_home'       : isHome
            };

            history.pushState(state, title, e.currentTarget.href);

            _this.loadPage(e, state);
        }
    }
};


/**
 * Load page.
 */
BaseHistory.prototype.loadPage = function(e, state){
    var _this = this;

    _this.loadBeginDate = new Date();

    // Load content
    $.ajax({
        url: e.currentTarget.href,
        type: 'get',
        success: function(data){
            Base.$ajaxContainer.append(data);

            // Disappear & destroy page
            Base.formerPage = Base.page;
            Base.page = null;
            Base.formerPage.hide($.proxy(Base.formerPage.destroy, Base.formerPage));

            // Init new page
            _this.boot(state.nodeType, state.nodeName, 'ajax');

            // Update nav
            Base.nav.update(state);

            // Update body id
            Base.$body[0].id = state.nodeName;

            // Analytics
            if(typeof ga !== "undefined") {
                ga('send', 'pageview', {'page':state.href, 'title':document.title});
            }
        }
    });
};
