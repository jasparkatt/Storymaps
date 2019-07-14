var geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#ffd900",
    color: "#000",
    weight: 1,
    opacity: 0.7,
    fillOpacity: 0.6
};

L.mapbox.accessToken = 'pk.eyJ1IjoiYnVkc3V0dHJlZSIsImEiOiJjanh6Y3R1dWYwMW82M2Nya3BiajFjYXRsIn0.KfnC6zslYrBhd4L0flo-WA'; 

    // Create Legend Contents in html format
    var classLegend ='<p style ="font-weight: bold;">Trout Fishing Wisconsin Key</p><i style="background: #0130b2; opacity: 0.8"></i><p>Class I</p><i style="background: #b16b02; opacity: 0.8"></i><p>Class II</p><i style="background: #e3ae5f; opacity: 0.8"></i><p>Class III</p><i style="background: #f78102; opacity: 0.8"></i><p>Spot X</p><i style="background: #feffcd; opacity: 0.8"></i><p>0 - 25</p>'



    var layers = {
        ESRI: {layer: L.tileLayer('https://server.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade_Dark/MapServer/tile/{z}/{y}/{x}')},

        counties: {layer: L.geoJson.ajax('https://raw.githubusercontent.com/jasparkatt/Storymaps/master/data/SpotX.geojson', {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions).bindTooltip(feature.properties.Stream, { className: 'label_tooltip' });
            }
        })
    },
        hillshade: {
            layer: L.mapbox.styleLayer('mapbox://styles/budsuttree/cjxxen8yq5twc1cqaapjf1my9')},

        labels: {
            layer: L.mapbox.styleLayer('mapbox://styles/budsuttree/cjxzb1lq71k3y1cob7ha24xw1')},    

        satellite: {
            layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}')},

        class1: {
            layer: L.mapbox.styleLayer('mapbox://styles/budsuttree/cjxw63sdr03gj1cmy6y89ul89'),
            legend: classLegend
        },

        cartodb_light: {layer: L.tileLayer('http://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png')}
    };

    var scenes = {
        overview: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'Cover Page', layers: []},
        centralsands: {lat: 44.09, lng: -89.6, zoom: 9.5, name: 'The Central Sands', layers: [layers.labels, layers.class1, layers.counties]},
        wautoma: {lat: 44.061, lng: -89.297, zoom: 11.5, name: 'Heart of the Sands', layers: [layers.hillshade, layers.labels, layers.class1]},
        westfork: {lat: 43.5, lng: -90.95, zoom: 12, name: 'Avalanche', layers: [layers.hillshade, layers.labels, layers.counties, layers.class1]},
        salem: {lat: 44.09419055, lng: -89.60356407, zoom: 9, name: 'Salem', layers: [layers.cartodb_light]},
        driftless: {lat: 43.5, lng: -90.95, zoom: 11, name: 'The Driftless Area', layers: [layers.hillshade, layers.labels, layers.class1, layers.counties]},
        wisconsin: {lat: 44.7, lng: -90.95, zoom: 8, name: 'Wisconsin State', layers: [layers.counties]},
        end: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'The End'}
    };