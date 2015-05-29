/**
 * Map block
 */
var MapBlock = function(id){
    var _this = this;

    console.log('-> MapBlock - '+id);

    _this.type = 'mapblock';
    _this.init(id);
    _this.initEvents();
};

$.extend(MapBlock.prototype, AbstractBlock.prototype);

/**
 * Init
 */
MapBlock.prototype.init = function(id){
    var _this = this;

    AbstractBlock.prototype.init.call(this, id);

    _this.options = null;
    _this.objects = [];
    _this.data = [];
    _this.options = [];
    _this.zoom = [];
    _this.marker = [];

    _this.$mapCanvas = _this.$cont.find('.block-map-canvas');

    if(_this.$mapCanvas.length) {
        if (typeof google == "undefined" && !Base.gmapLoaded) {
            Base.gmapLoaded = true;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//maps.googleapis.com/maps/api/js?key='+Base.googleClientId +
                '&callback=Base.initMaps';
            document.body.appendChild(script);
        }
    }
};


/**
 * Init maps.
 *
 * Your mapCanvas must have a “data-geoloc” attribute containing
 * JSON informations.
 */
MapBlock.prototype.initMaps = function(){
    var _this = this;

    // console.log(_this);
    console.log('Init map : '+_this.type);

    for(var i = 0; i < _this.$mapCanvas.length; i++) {
        var mapCanvas = _this.$mapCanvas[i];
        // Store data
        _this.data[i] = JSON.parse(mapCanvas.getAttribute('data-geoloc'));
        _this.zoom[i] = _this.data[i].zoom;

        // Set options
        _this.options[i] = {
            center: new google.maps.LatLng(_this.data[i].lat, _this.data[i].lng),
            zoom: _this.data[i].zoom,
            styles: Base.mapsStyle,
            mapTypeControl : false,
            scrollwheel : false,
            panControl : false,
            draggable : Base.isMobile ? false : true,
            streetViewControl : false,
            disableDoubleClickZoom : false,
            zoomControl : false,
            scaleControl : false
        };

        // Init map
        _this.objects[i] = new google.maps.Map(
            document.getElementById(mapCanvas.id),
            _this.options[i]
        );

        // Init events
        _this.initMapEvents(i);

        // Init marker
        _this.marker[i] = new google.maps.Marker({
            map: _this.objects[i],
            position: new google.maps.LatLng(_this.data[i].lat, _this.data[i].lng),
            icon : Base.baseUrl+Base.resourcesUrl+'img/marker.png'
        });
    }
};


/**
 * Init events
 */
MapBlock.prototype.initEvents = function(){
    var _this = this;

    AbstractBlock.prototype.initEvents.call(this);
};

/**
 * Destroy events
 */
MapBlock.prototype.destroyEvents = function(){
    var _this = this;

    AbstractBlock.prototype.destroyEvents.call(this);
};


/**
 * Init map events
 * @return {[type]} [description]
 */
MapBlock.prototype.initMapEvents = function(index){
    var _this = this;

    google.maps.event.addListener(_this.objects[index], 'zoom_changed', function() {
        _this.zoom[index] = _this.objects[index].getZoom();
    });
};
