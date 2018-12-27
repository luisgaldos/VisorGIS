CONTENDOR_MAPA.addEventListener("mousemove", function() {

    var lblsCoordenadas = document.getElementsByClassName('esri-coordinate-conversion__display');

});

CONTENDOR_MAPA.addEventListener('wheel', function () {

    var evt = window.event || e;
    var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta //Detecta dirección de la rueda
    zoom(delta);

});

CONTENDOR_MAPA.addEventListener('dblclick', function () {
    zoom(120);
});

function crearVista(MapView) {
    view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 4,
        scale: app.scale,
        ui: app.uiComponents,
        center: app.center,
        minscale: app.minScale,
        maxscale: app.maxScale
    });

    view.on("mouse-wheel", function (event) {

        event.stopPropagation();    // Bloquea la rueda del ratón para hacer zoom
    });
}



function crearExtensionMapa(Extent, SpatialReference) {
    extent = new Extent({
        xmin: 463007.343155309,
        ymin: 4749769.80390383,
        xmax: 548340.971062945,
        ymax: 4821769.4696159,
        spatialReference: new SpatialReference({
            wkid: 25830
        })
    });
}

function cargarCapaBase(Basemap, TileLayer) {

    basemap = new Basemap({
        baseLayers: [
            new TileLayer(URLortoActual)
        ]
    });

    map.basemap = basemap;
}


function zoom(delta) {

    if (delta > 0) {

        if (indEscalaActual < ESCALAS_RECOMENDADAS.length - 1) {
            console.log('Aumentar escala');
            indEscalaActual++;
            setEscala(indEscalaActual);
        }
    } else {
        if (indEscalaActual > 0) {
            console.log('Disminuir escala');
            indEscalaActual--;
            setEscala(indEscalaActual);
        }
    }
}

function setEscala(indice) {

    view.scale = ESCALAS_RECOMENDADAS[indice];
    escalaActual = indice;
    LBL_ESCALA.innerHTML = ESCALAS_RECOMENDADAS[indice];
}
