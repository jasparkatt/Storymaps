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
L.mapbox.accessToken = 'pk.eyJ1IjoiYnVkc3V0dHJlZSIsImEiOiJjand1dnRhbWowMGJtNDNwYndwamFnbDc3In0.CIQzTl7-lEJLZm9z2MaaoA'; 

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
        hillshade: {
            layer: L.mapbox.styleLayer('mapbox://styles/budsuttree/cjxxen8yq5twc1cqaapjf1my9')},

        satellite: {
            layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}')},

        class1: {
            layer: L.mapbox.styleLayer('mapbox://styles/budsuttree/cjxw63sdr03gj1cmy6y89ul89')},

        cartodb_light: {layer: L.tileLayer('http://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png')}
    };

    var scenes = {
        overview: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'Cover Page', layers: []},
        centralsands: {lat: 44.09, lng: -89.6, zoom: 9.5, name: 'The Central Sands', layers: [layers.cartodb_light, layers.class1, layers.counties]},
        wautoma: {lat: 44.061, lng: -89.297, zoom: 11.5, name: 'Heart of the Sands', layers: [layers.hillshade, layers.class1]},
        westfork: {lat: 43.5, lng: -90.95, zoom: 10, name: 'Avalanche', layers: [layers.ESRI, layers.counties, layers.class1]},
        salem: {lat: 44.09419055, lng: -89.60356407, zoom: 9, name: 'Salem', layers: [layers.cartodb_light]},
        driftless: {lat: 43.5, lng: -90.95, zoom: 10.5, name: 'The Driftless Area', layers: [layers.hillshade, layers.class1, layers.counties]},
        wisconsin: {lat: 44.7, lng: -90.95, zoom: 8, name: 'Wisconsin State', layers: [layers.counties]},
        end: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'The End'}
    };