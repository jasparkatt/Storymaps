var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#3232ff",
    color: "#ffff00",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0.8
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
        ESRI: {layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')},
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
            layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw', {
                id: 'mapbox.satellite'
            })
        },
        cartodb_light: {layer: L.tileLayer('http://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png')}
    };

    var scenes = {
        overview: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'Cover Page', layers: []},
        centralsands: {lat: 44.09, lng: -89.6, zoom: 9.5, name: 'The Central Sands', layers: [layers.counties]},
        corvallis: {lat: 44.5701158, lng: -123.2949388, zoom: 14, name: 'Corvallis', layers: [layers.ESRI]},
        eugene: {lat: 44.0549563, lng: -123.0958048, zoom: 13, name: 'Eugene', layers: []},
        salem: {lat: 44.9419055, lng: -123.0356407, zoom: 13, name: 'Salem', layers: []},
        bend: {lat: 44.0519385, lng: -89.3042125, zoom: 8, name: 'Bend', layers: [layers.counties, layers.satellite]},
        oregon: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'Oregon State', layers: [layers.GEE]},
        end: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'The End'}
    };