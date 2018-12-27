const LONGITUD_INICIAL = -2.930842;
const LATITUD_INICIAL = 43.250414;
const ESCALA_INICIAL = 300000;

const CONTENDOR_MAPA = document.getElementById('viewDiv');
const ESCALAS_RECOMENDADAS = [300000.0, 200000.0, 100000.0, 50000.0, 25000.0, 10000.0, 5000.0, 4000.0, 3000.0, 2000.0, 1000.0, 500.0];


// ELEMENTOS DEL DOM
const LBL_ESCALA = document.getElementById('lblEscala');

var app;
var map;
var view;
var extent;
var basemap;
var indEscalaActual = 0;