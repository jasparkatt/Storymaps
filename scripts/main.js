var geojsonMarkerOptions = {
    radius: 7,
    fillColor: "#ff9900",
    color: "#003366",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var layers = {
    layer1: {
        layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
        legend: '<i style="background: black; opacity: 0.5"></i><p><b>legend 1</b></p>'
    },
    layer2: {
        layer: L.geoJson.ajax('https://raw.githubusercontent.com/jasparkatt/Storymaps/master/Data/SpotX.geojson', {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }),
        legend: '<i style="background: orange; opacity: 0.5"></i><p><b>legend 2</b></p>'
    },
    layer3: {
        layer: L.tileLayer('http://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png')
    }
};
var scenes = {
    scene1: { lat: 44, lng: -89.00, zoom: 7, layers: [layers.layer2], name: "scene 1" },
    scene2: { lat: 44.5701158, lng: -89.00, zoom: 10, layers: [layers.layer2], name: "scene 2" },
    scene3: { lat: 45.111235, lng: -89.00, zoom: 12, layers: [layers.layer1, layers.layer2], name: "scene 3" }
};
$('#storymap').storymap({
    scenes: scenes,
    baselayer: layers.layer3,
    legend: true,
    loader: true,
    flyto: true,
    credits: "Build with <i class='material-icons' style='color: red; font-size: 10px;'>favorite</i> from Bo Zhao",
    scalebar: true,
    scrolldown: true,
    progressline: true,
    navwidget: true,
    createMap: function() {
        var map = L.map($(".storymap-map")[0], { zoomControl: false }).setView([44, -120], 7);
        basemap = this.baselayer.layer.addTo(map);
        return map;
    }
});