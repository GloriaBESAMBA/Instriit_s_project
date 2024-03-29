/*function loadMap() {
	// initialize the map
	 var map = L.map('map').setView([42.35, -71.08], 13);
	 
	var lc = L.locate().addTo(map);
	lc.start();
	map.on('dragstart', lc._stopFollowing, lc);

	// load a tile layer
	L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
	{
		attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
		maxZoom: 17,
		minZoom: 9,

	}).addTo(map);
	
}
//*/
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data � <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {
    attribution: osmAttrib,
    detectRetina: true
});

var token = 'pk.eyJ1IjoiZG9tb3JpdHoiLCJhIjoieENoTEhXUSJ9.kjCosRk1pmnOqTvfsjmgIg';
var mapboxUrl = 'http://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}@2x.png?access_token=' + token;
var mapboxAttrib = 'Map data � <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles from <a href="https://www.mapbox.com">Mapbox</a>.';
var mapbox = new L.TileLayer(mapboxUrl, {
  attribution: mapboxAttrib
});

var map = new L.Map('map', {
    layers: [mapbox],
    center: [51.505, -0.09],
    zoom: 10,
    zoomControl: true
});

// add location control to global name space for testing only
// on a production site, omit the "lc = "!
lc = L.control.locate({
    follow: true,
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(map);

map.on('startfollowing', function() {
    map.on('dragstart', lc._stopFollowing, lc);
}).on('stopfollowing', function() {
    map.off('dragstart', lc._stopFollowing, lc);
});