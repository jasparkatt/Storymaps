var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#3232ff",
    color: "#ffff00",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0.8
};

var classOne = {
    "color": "#7380D8",
    "weight": 2,
    "opacity": 0.8,
    "dashArray": '3',
    "fillOpacity": 0.6
};


    // Create Legend Contents in html format
    var county_legend = '<i style="background: orange; opacity: 0.5"></i><p><b>Counties</b></p>';
    var forest_legend = '<i style="background: green; opacity: 0.5"></i><p><b>Forest</b></p>';

    // For each layer, the first variable is the layer, the second is the legend. The layer variable can be any kinds of layers that leaflet.js supports.
    // var layers = {
    //      layer1: {layer: layer1, legend: legend1},
    //      layer2: {layer: layer2, legend: legend2}
    //      ...
    // }

    var layers = {
        ESRI: {layer: L.tileLayer('https://server.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade_Dark/MapServer/tile/{z}/{y}/{x}')},
        counties: {
            layer: L.geoJson.ajax('https://raw.githubusercontent.com/jasparkatt/Storymaps/master/data/SpotX.geojson', {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions).bindTooltip(feature.properties.Stream, { className: 'label_tooltip' });
            }
        })
    },
        GEE: {
            layer: L.tileLayer('http://earthengine.google.org/static/hansen_2013/tree_alpha/{z}/{x}/{y}.png'),
            legend: forest_legend
        },
        satellite: {
            layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}')},

        class1: {
            layer: L.geoJson.ajax('https://opendata.arcgis.com/datasets/a95d409126754d349ecc565698683d9e_9.geojson', {
            style: classOne
        })},
        cartodb_light: {layer: L.tileLayer('http://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png')}
    };

    var scenes = {
        overview: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'Cover Page', layers: []},
        centralsands: {lat: 44.09, lng: -89.6, zoom: 9.5, name: 'The Central Sands', layers: [layers.counties, layers.class1]},
        wautoma: {lat: 44.119, lng: -89.45, zoom: 10.5, name: 'Linch Pin Of The Sands', layers: [layers.satellite, layers.class1]},
        eugene: {lat: 44.0549563, lng: -123.0958048, zoom: 13, name: 'Eugene', layers: []},
        salem: {lat: 44.9419055, lng: -123.0356407, zoom: 13, name: 'Salem', layers: []},
        driftless: {lat: 43.5, lng: -90.95, zoom: 9.3, name: 'The Driftless Area', layers: [layers.class1, layers.ESRI, layers.counties]},
        oregon: {lat: 44.0000000, lng: -89.6, zoom: 7, name: 'Oregon State', layers: [layers.GEE]},
        end: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'The End'}
    };