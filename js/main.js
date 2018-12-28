
inicializar();

function inicializar() {
    cargarSelectCapasBase();
    cargarSelectEscalas();
    addListeners();
}

function addListeners() {

    // LISTENERS
    CONTENDOR_MAPA.addEventListener('wheel', function () {

        var evt = window.event || e;
        var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta //Detecta dirección de la rueda
        zoom(delta);

    });
}
function crearVista2D(MapView) {
    vista2D = new MapView({
        container: "divMapa",
        map: mapa,
        scale: app.escala,
        ui: app.componentes,
        center: app.centro,
        minscale: app.escalaminima,
        maxscale: app.escalamaxima
    });

    vista2D.on("mouse-wheel", function (event) {

        event.stopPropagation();    // Bloquea la rueda del ratón para hacer zoom
    });
    vista2D.on("double-click", function (event) {

        event.stopPropagation();    // Bloquea del doble click para hacer zoom
    });

    app.vista2D = vista2D  // Guardamos la vista2D en la clase app
}

function activarVista(){
    var is3D = app.vistaActiva.type === "3d";
  
    // remove the reference to the container for the previous view
    appConfig.activeView.container = null;
  
    if (is3D){
      // if the input view is a SceneView, set the viewpoint on the
      // mapView instance. Set the container on the mapView and flag
      // it as the active view
      appConfig.mapView.viewpoint = appConfig.activeView.viewpoint.clone();
      appConfig.mapView.container = appConfig.container;
      appConfig.activeView = appConfig.mapView;
      switchButton.value = "3D";
    } else {
      appConfig.sceneView.viewpoint = appConfig.activeView.viewpoint.clone();
      appConfig.sceneView.container = appConfig.container;
      appConfig.activeView = appConfig.sceneView;
      switchButton.value = "2D";
    }
  }

function crearExtensionMapa(Extent, SpatialReference) {
    extension = new Extent({
        xmin: 463007.343155309,
        ymin: 4749769.80390383,
        xmax: 548340.971062945,
        ymax: 4821769.4696159,
        spatialReference: new SpatialReference({
            wkid: 25830
        })
    });

    app.extension = extension;  // Guardamos la extensión en la clase app
}

function cargarSelectCapasBase() {
    let anio;
    let option;
    serviciosOrtofotos.forEach(function (el, index) {

        anio = el.replace(/[^\d]/g, '');    // Obtener los años de la URL

        option = document.createElement('option');
        option.value = index;
        option.innerHTML = anio;
        SELECT_CAPAS_BASE.appendChild(option);  // Agregamos la opción al select

    });
}

function cargarSelectEscalas() {
    let option;
    ESCALAS_RECOMENDADAS.forEach(function(element, index) {
        option = document.createElement('option');
        option.value = index;
        option.innerHTML = element.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;

        SELECT_ESCALAS.appendChild(option);
    });

    SELECT_ESCALAS.addEventListener('change', function () {
        setEscala(this.selectedIndex);
    });
}

function cargarCapaBase(ind, Basemap, TileLayer) {

    mapabase = new Basemap({
        baseLayers: [
            new TileLayer(serviciosOrtofotos[ind])
        ]
    });

    app.mapabase = mapabase;     // Guardamos el mapa base en la clase app
    mapa.basemap = mapabase;
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

    vista2D.scale = ESCALAS_RECOMENDADAS[indice];
    escalaActual = indice;
    SELECT_ESCALAS.selectedIndex = indice;
}


