/*=========================================
    FERIA MANAGER
    STORAGE.JS
==========================================*/

/*
    Este archivo será el encargado de guardar
    y recuperar toda la información de la aplicación.

    En futuras etapas también almacenará:

    - Agenda
    - Pagos
    - Ubicaciones
*/

/*=========================================
    CLAVE PRINCIPAL
==========================================*/

const STORAGE_KEY = "feriaManager";

/*=========================================
    ESTRUCTURA INICIAL
==========================================*/

const estructuraInicial = {

    calendario:{},

    agenda:[],

    ubicaciones:{},

    pagos:[]

};

/*=========================================
    CREAR BASE SI NO EXISTE
==========================================*/

function inicializarStorage(){

    if(localStorage.getItem(STORAGE_KEY) === null){

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(estructuraInicial)

        );

    }

}

/*=========================================
    OBTENER TODA LA BASE
==========================================*/

function obtenerDatos(){

    const datosGuardados = localStorage.getItem(STORAGE_KEY);

    if (!datosGuardados) {

        return JSON.parse(JSON.stringify(estructuraInicial));

    }

    try {

        return {

            ...JSON.parse(JSON.stringify(estructuraInicial)),

            ...JSON.parse(datosGuardados)

        };

    } catch (error) {

        console.warn("No se pudieron leer los datos guardados. Se reinicia la base local.", error);

        guardarDatos(estructuraInicial);

        return JSON.parse(JSON.stringify(estructuraInicial));

    }

}

/*=========================================
    GUARDAR TODA LA BASE
==========================================*/

function guardarDatos(datos){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(datos)

    );

}

/*=========================================
    CALENDARIO
==========================================*/

function guardarEvento(fecha,nombre,cantidad){

    const datos=obtenerDatos();

    datos.calendario[fecha]={

        nombre:nombre,

        cantidad:cantidad

    };

    guardarDatos(datos);

}

function obtenerEvento(fecha){

    const datos=obtenerDatos();

    return datos.calendario[fecha] || null;

}

function eliminarEvento(fecha){

    const datos=obtenerDatos();

    delete datos.calendario[fecha];

    guardarDatos(datos);

}

/*=========================================
    INICIAR
==========================================*/

inicializarStorage();
