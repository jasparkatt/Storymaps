var geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#f78102",
    color: "#0a121f",
    weight: 0.4,
    opacity: 0.7,
    fillOpacity: 0.5
};

var classOne = {
    color: "#7380D8",
    weight: 1.5,
    opacity: 0.8,
    dashArray: '1',
    fillOpacity: 0.6
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
            layer: L.tileLayer('https://api.mapbox.com/styles/v1/jasparkatt/cjxtgxkcs87at1cpoc3b4svt0.html?fresh=true&title=true&access_token=pk.eyJ1IjoiamFzcGFya2F0dCIsImEiOiJ0dFVNWUxvIn0.c2iL93m2nRg0gnqSlm5bhA#8.0/44.716105/-90.012333/0'),
            legend: forest_legend
        },
        satellite: {
            layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}')},

        class1: {
            layer: L.geoJson.ajax('https://raw.githubusercontent.com/jasparkatt/Storymaps/master/data/newSpotX.geojson', {
            style: classOne
        })},
        cartodb_light: {layer: L.tileLayer('http://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png')}
    };

    var scenes = {
        overview: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'Cover Page', layers: []},
        centralsands: {lat: 44.09, lng: -89.6, zoom: 9.5, name: 'The Central Sands', layers: [layers.counties]},
        wautoma: {lat: 44.119, lng: -89.45, zoom: 10.5, name: 'Linch Pin Of The Sands', layers: [layers.satellite]},
        westfork: {lat: 43.5, lng: -90.95, zoom: 10, name: 'Avalanche', layers: [layers.counties]},
        salem: {lat: 44.09419055, lng: -89.60356407, zoom: 9, name: 'Salem', layers: [layers.counties]},
        driftless: {lat: 43.5, lng: -90.95, zoom: 9.3, name: 'The Driftless Area', layers: [layers.ESRI, layers.counties]},
        wisconsin: {lat: 44.7, lng: -90.95, zoom: 7, name: 'Wisconsin State', layers: [layers.class1, layers.counties]},
        end: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'The End'}
    };