function inicializarApp() {

    app = {
        center: [LONGITUD_INICIAL, LATITUD_INICIAL],  // Longitud, latitud
        scale: ESCALAS_RECOMENDADAS,
        basemap: null,
        viewPadding: {
            top: 50,
            bottom: 0
        },
        uiComponents: ["zoom", "compass", "attribution"],
        mapView: null,
        sceneView: null,
        minScale: ESCALAS_RECOMENDADAS[ESCALAS_RECOMENDADAS.length - 1],
        maxScale: ESCALAS_RECOMENDADAS[0]
    };

}

inicializarApp();

require([
    "esri/Map",
    "esri/Basemap",
    "esri/layers/TileLayer",
    "esri/geometry/Extent",
    "esri/geometry/SpatialReference",
    "esri/views/MapView"
], function (Map, Basemap, TileLayer, Extent, SpatialReference, MapView) {

    var basemap = new Basemap({
        baseLayers: [
            new TileLayer('http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2017_AMPLIADO/MapServer')
        ]
    });

    crearExtensionMapa(Extent, SpatialReference);

    map = new Map({
        basemap: basemap,
        extent: extent
    });

    crearVista(MapView);
    setEscala(0);

});


require(["esri/widgets/CoordinateConversion"], function (CoordinateConversion) {

    var widgetCoordenadas = new CoordinateConversion({
        view: view
    });

    // Adds widget in the bottom left corner of the view
    view.ui.add(widgetCoordenadas, "bottom-right");
});

