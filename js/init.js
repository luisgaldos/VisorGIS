require(["esri/geometry/Extent", "esri/geometry/SpatialReference"], function (Extent, SpatialReference) {

    crearExtensionMapa(Extent, SpatialReference);

});

require([
    "esri/Map",
    "esri/Basemap",
    "esri/layers/TileLayer",
    
    "esri/views/MapView"
], function (Map, Basemap, TileLayer, MapView) {

    mapa = new Map({
        //basemap: basemap,
        extent: extension
    });

    cargarCapaBase(serviciosOrtofotos.length - 1, Basemap, TileLayer);

    crearVista(MapView);
    setEscala(0);

    SELECT_CAPAS_BASE.addEventListener('change', function () {
        cargarCapaBase(this.selectedIndex, Basemap, TileLayer)
    });

});


require(["esri/widgets/CoordinateConversion"], function (CoordinateConversion) {

    var widgetCoordenadas = new CoordinateConversion({
        view: app.vista2D,
        multipleConversions: false,
        container: CONTENDOR_COORDENADAS
    });

});

// CAPA DE DIBUJO
require(["esri/widgets/Sketch", "esri/layers/GraphicsLayer"], function (Sketch, GraphicsLayer) {

    const capaGrafica = new GraphicsLayer(); // Crear una capa de dibujo
    mapa.layers.add(capaGrafica);    // Agregarla al mapa
    var herramientasDibujo = new Sketch({
        layer: capaGrafica,
        view: vista2D,
        container: "divHerramientasDibujo"
    });

    console.log("%o", herramientasDibujo)

});

require(["esri/widgets/DistanceMeasurement2D", "esri/widgets/AreaMeasurement2D"], function (DistanceMeasurement2D, AreaMeasurement2D) {

    widgetMedicionActivo = null;

    BTN_MEDIR_DISTANCIA_2D.addEventListener("click", function () {
        // TODO: medir distancia
    });

    BTN_MEDIR_AREA_2D.addEventListener("click", function () {
        // TODO: medir area 
    });


});




