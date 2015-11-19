/**
 * History
 */

var BaseHistory = function(options){
    var _this = this;

    _this.state = null;
    _this.stateBlock = true;
    _this.transition = false;
    _this.options = options;

    _this.init();
};

/**
 * Init.
 */
BaseHistory.prototype.init = function(){
    var _this = this;

    // Events
    if(Base.ajaxEnabled){
        window.onpopstate = $.proxy(_this.onPopState, _this);
    }
};

/**
 * Push first state
 * @return {[type]} [description]
 */
BaseHistory.prototype.pushFirstState = function(type, id, isHome){
    var _this = this;

    history.pushState({
        'firstPage': true,
        'href':  window.location.href,
        'nodeType':type,
        'isHome':isHome,
        'nodeName':id
    }, null, window.location.href);
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

        _this.transition = true;

        _this.loadPage(e, e.state);
    }
};

/**
 * Boot.
 */
BaseHistory.prototype.boot = function(nodeType, id, context, isHome){
    var _this = this;

    // console.log('Boot '+nodeType+' - '+id);

    if(context == 'static') _this.loadBeginDate = new Date();

    // Page
    if(isHome && _this.options.homeHasClass){
        Base.page = new BaseHome(id, context, nodeType, isHome);
    }
    else if(nodeType && typeof Base.nodeTypesClasses[nodeType] !== 'undefined') {
        Base.page = new window[Base.nodeTypesClasses[nodeType]](id, context, nodeType, isHome);
    } else {
        // Static pages
        Base.page = new BaseAbstractPage(id, context, nodeType, isHome);
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
                'href'          : e.currentTarget.href,
                'nodeType'      : e.currentTarget.getAttribute('data-node-type'),
                'nodeName'      : e.currentTarget.getAttribute('data-node-name'),
                'index'         : Number(e.currentTarget.getAttribute('data-index')),
                'transition'    : Base.page.type+'_to_'+e.currentTarget.getAttribute('data-node-type'),
                'context'       : context,
                'isHome'        : isHome
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
        url: state.href,
        type: 'get',
        success: function(data){

            if(this.url == history.state.href){
                Base.$ajaxContainer.append(data);

                // Disappear & destroy page
                Base.formerPage = Base.page;
                Base.page = null;

                // Init new page
                _this.boot(state.nodeType, state.nodeName, 'ajax', state.isHome);

                // Update nav
                Base.nav.update(state);

                // Analytics
                if(typeof ga !== "undefined") {
                    ga('send', 'pageview', {'page':state.href, 'title':document.title});
                }
            }
        }
    });
};
