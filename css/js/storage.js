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

    actualizarCantidadesCalendario(datos);

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
    FERIAS Y CONTEOS AUTOMÁTICOS
==========================================*/

function normalizarFerias(feria){

    if(Array.isArray(feria)){

        return feria;

    }

    if(!feria){

        return [];

    }

    return [feria];

}

function formatearFerias(feria){

    const ferias=normalizarFerias(feria);

    return ferias.length ? ferias.join(" / ") : "-";

}

function personaParticipaEnFeria(persona,nombreFeria){

    return normalizarFerias(persona.feria).includes(nombreFeria);

}

function normalizarUbicacionGuardada(ubicacion){

    if(!ubicacion){

        return null;

    }

    if(typeof ubicacion === "string"){

        return { nombre:ubicacion, estadoPago:"noPago" };

    }

    return ubicacion;

}

function actualizarCantidadesCalendario(datos){

    Object.values(datos.calendario).forEach(evento=>{

        if(!evento.nombre){

            return;

        }

        evento.cantidad=Object.values(datos.ubicaciones)

            .map(normalizarUbicacionGuardada)

            .filter(Boolean)

            .filter(ubicacion=>{

                const persona=datos.agenda.find(item=>item.nombre === ubicacion.nombre);

                return persona && personaParticipaEnFeria(persona, evento.nombre);

            }).length;

    });

    return datos;

}

/*=========================================
    INICIAR
==========================================*/

inicializarStorage();
