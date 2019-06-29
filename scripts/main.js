var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#3232ff",
    color: "#ffff00",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0.8
};
var CntyBndOptions = {
	color: "#CC6600",
    weight: 2,
    opacity: 0.65,
	dashArray: '5',
	fillOpacity: 0.1,
	fillColor: "none"
	};

var layers = {
    layer5: {
        layer:L.geoJson.ajax('https://opendata.arcgis.com/datasets/8b8a0896378449538cf1138a969afbc6_3.geojson', {
            style:CntyBndOptions
        })
     },
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
    scene2: { lat: 44.05, lng: -89.6, zoom: 10, layers: [ layers.layer1, layers.layer2, layers.layer5, layers.layer4], name: "scene 2" },
    scene3: { lat: 43.5, lng: -90.95, zoom: 9.3, layers: [layers.layer1, layers.layer2, layers.layer5, layers.layer4], name: "scene 3" }
};
