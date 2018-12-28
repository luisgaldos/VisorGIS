const LONGITUD_INICIAL = -2.930842;
const LATITUD_INICIAL = 43.250414;
const ESCALA_INICIAL = 300000;


const ESCALAS_RECOMENDADAS = [300000.0, 200000.0, 100000.0, 50000.0, 25000.0, 10000.0, 5000.0, 4000.0, 3000.0, 2000.0, 1000.0, 500.0];


//  ELEMENTOS DEL DOM    //
// -------------------- //
const CONTENDOR_MAPA = document.getElementById('divMapa');
const CONTENDOR_BUSCADOR = document.getElementById('divBuscador');
const CONTENDOR_COORDENADAS = document.getElementById('divCoordenadas');
const CONTENEDOR_ENCUENTRAME = document.getElementById('divEncuentrame');


const SELECT_CAPAS_BASE = document.getElementById('selectCapasBase');
const SELECT_ESCALAS = document.getElementById('selectEscalas');


const BTN_MEDIR_DISTANCIA_2D = document.getElementById('btnMedirDistancia2D');
const BTN_MEDIR_AREA_2D = document.getElementById('btnMedirArea2D');

//  VARIABLES GLOBALES   //
// -------------------- //
var  app = {
    centro: [LONGITUD_INICIAL, LATITUD_INICIAL],  // Longitud, latitud
    escala: ESCALAS_RECOMENDADAS,
    mapabase: null,
    padding: {
        top: 50,
        bottom: 0
    },
    componentes: [],
    vista2D: null,
    vista3D: null,
    vistaActiva: null,
    escalaminima: ESCALAS_RECOMENDADAS[ESCALAS_RECOMENDADAS.length - 1],
    escalamaxima: ESCALAS_RECOMENDADAS[0]
};
var mapa;
var vistaActiva;
var vista2D;
var vista3D;
var extension;
var mapabase;
var widgetMedicionActivo;   // Necesario para evitar problemas
var indEscalaActual = 0;

//     SERVICIOS        //
// -------------------- //
var serviciosOrtofotos = new Array()

serviciosOrtofotos[0] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_1945/MapServer";
serviciosOrtofotos[1] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_1956/MapServer";
serviciosOrtofotos[2] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_1977/MapServer";
serviciosOrtofotos[3] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_1984/MapServer";
serviciosOrtofotos[4] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_1990/MapServer";
serviciosOrtofotos[5] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2001/MapServer";
serviciosOrtofotos[6] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2002/MapServer";
serviciosOrtofotos[7] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2004/MapServer";
serviciosOrtofotos[8] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2005/MapServer";
serviciosOrtofotos[9] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2006/MapServer";
serviciosOrtofotos[10] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2007/MapServer";
serviciosOrtofotos[11] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2008/MapServer";
serviciosOrtofotos[12] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2009/MapServer";
serviciosOrtofotos[13] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2010/MapServer";
serviciosOrtofotos[14] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2011/MapServer";
serviciosOrtofotos[15] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2012_AMPLIADO/MapServer";
serviciosOrtofotos[16] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2013_AMPLIADO/MapServer";
serviciosOrtofotos[17] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2014_AMPLIADO/MapServer";
serviciosOrtofotos[18] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2015_AMPLIADO/MapServer";
serviciosOrtofotos[19] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2016_AMPLIADO/MapServer";
serviciosOrtofotos[20] = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2017_AMPLIADO/MapServer";
