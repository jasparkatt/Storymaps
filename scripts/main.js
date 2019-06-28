var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#3232ff",
    color: "#ffff00",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0.8
};

var layers = {
    layer4: {
        layer: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png')
    },
    layer3: {
        layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}')
    },
    layer2: {
        layer: L.geoJson.ajax('https://raw.githubusercontent.com/jasparkatt/Storymaps/master/data/SpotX.geojson', {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions).bindTooltip(feature.properties.Stream, { className: 'label_tooltip' });
            }
        })
    },
    layer1: {
        layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}')
    }
};
var scenes = {
    scene1: { lat: 44, lng: -91.00, zoom: 7, layers: [layers.layer2], name: "scene 1" },
    scene2: { lat: 44.05, lng: -89.6, zoom: 10, layers: [layers.layer4, layers.layer1, layers.layer2], name: "scene 2" },
    scene3: { lat: 43.5, lng: -90.95, zoom: 9.3, layers: [layers.layer1, layers.layer2], name: "scene 3" }
};