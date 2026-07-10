/*=========================================
    FERIA MANAGER
    CALENDARIO.JS
==========================================*/

const calendario = document.getElementById("calendario");
const mesActual = document.getElementById("mesActual");
const detalleDia = document.getElementById("detalleDia");

const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");

const nombreFeria = document.getElementById("nombreFeria");
const cantidadFeriantes = document.getElementById("cantidadFeriantes");
const guardarFeria = document.getElementById("guardarFeria");
const fechaTexto = document.getElementById("fechaSeleccionada");

const meses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

let fechaActual = new Date();

let mes = fechaActual.getMonth();
let año = fechaActual.getFullYear();

let fechaSeleccionada = null;

dibujarCalendario();

/*=============================
BOTONES MES
=============================*/

btnAnterior.addEventListener("click",()=>{

    mes--;

    if(mes<0){

        mes=11;
        año--;

    }

    dibujarCalendario();

});

btnSiguiente.addEventListener("click",()=>{

    mes++;

    if(mes>11){

        mes=0;
        año++;

    }

    dibujarCalendario();

});

/*=============================
DIBUJAR CALENDARIO
=============================*/

function dibujarCalendario(){

    calendario.innerHTML="";

    mesActual.textContent = meses[mes] + " " + año;

    const primerDia = new Date(año,mes,1).getDay();

    const diasMes = new Date(año,mes+1,0).getDate();

    for(let i=0;i<primerDia;i++){

        const vacio=document.createElement("div");

        vacio.classList.add("dia","vacio");

        calendario.appendChild(vacio);

    }

    for(let dia=1;dia<=diasMes;dia++){

        const celda=document.createElement("div");

        celda.classList.add("dia");

        const fecha = obtenerFecha(año,mes,dia);

        const evento = obtenerEvento(fecha);

        if(evento){

            celda.classList.add("feria");

            celda.innerHTML=`

                <div class="contenidoFeria">

                    <strong>${dia}</strong>

                    <small>${evento.nombre}</small>

                    <span>👥 ${evento.cantidad}</span>

                </div>

            `;

        }else{

            celda.textContent = dia;

        }

        if(

            dia===fechaActual.getDate() &&
            mes===fechaActual.getMonth() &&
            año===fechaActual.getFullYear()

        ){

            celda.classList.add("hoy");

        }

        celda.addEventListener("click",()=>{

            document.querySelectorAll(".dia").forEach(d=>{

                d.classList.remove("seleccionado");

            });

            celda.classList.add("seleccionado");

            fechaSeleccionada=fecha;

            mostrarDetalle();

        });

        calendario.appendChild(celda);

    }

}

/*=============================
FORMATO FECHA
=============================*/

function obtenerFecha(a,m,d){

    const mm=String(m+1).padStart(2,"0");

    const dd=String(d).padStart(2,"0");

    return `${a}-${mm}-${dd}`;

}

/*=============================
MOSTRAR DETALLE
=============================*/

function mostrarDetalle(){

    fechaTexto.textContent = fechaSeleccionada;

    const evento = obtenerEvento(fechaSeleccionada);

    if(evento){

        nombreFeria.value = evento.nombre;

        cantidadFeriantes.value = evento.cantidad;

        detalleDia.innerHTML=`

            <strong>${evento.nombre}</strong>

            <br><br>

            👥 ${evento.cantidad} feriantes

        `;

    }else{

        nombreFeria.value="";

        cantidadFeriantes.value="";

        detalleDia.innerHTML="No hay ninguna feria cargada.";

    }

}

/*=============================
GUARDAR
=============================*/

guardarFeria.addEventListener("click",()=>{

    if(!fechaSeleccionada){

        alert("Seleccione un día.");

        return;

    }

    guardarEvento(

        fechaSeleccionada,

        nombreFeria.value,

        cantidadFeriantes.value

    );

    mostrarDetalle();

    dibujarCalendario();

});