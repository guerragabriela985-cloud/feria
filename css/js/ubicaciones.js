const modulos = document.querySelectorAll(".gridPuestos");

const emprendedor = document.getElementById("emprendedor");

const estadoPago = document.getElementById("estadoPago");

const puestoSeleccionado = document.getElementById("puestoSeleccionado");

const guardarBtn = document.getElementById("guardarUbicacion");

const liberarBtn = document.getElementById("liberarPuesto");

let puestoActual = null;

cargarEmprendedores();

dibujarPuestos();

guardarBtn.addEventListener("click",guardarUbicacion);

liberarBtn.addEventListener("click",liberarUbicacion);

function cargarEmprendedores(){

const datos=obtenerDatos();

emprendedor.innerHTML="";

datos.agenda.forEach((e,i)=>{

const option=document.createElement("option");

option.value=i;

option.textContent=e.nombre;

emprendedor.appendChild(option);

});

}

function normalizarUbicacion(ubicacion){

if(!ubicacion)return null;

if(typeof ubicacion === "string"){

return {

nombre:ubicacion,

estadoPago:"noPago"

};

}

return {

nombre:ubicacion.nombre,

estadoPago:ubicacion.estadoPago || "noPago"

};

}

function crearPuesto(numeroPuesto, ubicacion, datos){

const div=document.createElement("div");

div.className="puesto";

div.dataset.numero=numeroPuesto;

const numero=document.createElement("strong");

numero.textContent=numeroPuesto;

div.appendChild(numero);

if(ubicacion){

const nombre=document.createElement("small");

nombre.textContent=ubicacion.nombre;

div.appendChild(nombre);

div.classList.add("ocupado", ubicacion.estadoPago === "pago" ? "puestoPago" : "puestoNoPago");

div.title=`${ubicacion.nombre} - ${ubicacion.estadoPago === "pago" ? "Pago" : "No pago"}`;

}else{

div.title="Puesto libre";

}

div.addEventListener("click",()=>{

puestoActual=numeroPuesto;

puestoSeleccionado.textContent="Puesto "+numeroPuesto;

document.querySelectorAll(".puesto").forEach(puesto=>puesto.classList.remove("puestoSeleccionado"));

div.classList.add("puestoSeleccionado");

if(ubicacion){

estadoPago.value=ubicacion.estadoPago;

const indicePersona=datos.agenda.findIndex(persona=>persona.nombre === ubicacion.nombre);

if(indicePersona >= 0){

emprendedor.value=indicePersona;

}

}

});

return div;

}

function dibujarPuestos(){

const datos=obtenerDatos();

modulos.forEach(modulo=>{

modulo.innerHTML="";

const inicio=Number(modulo.dataset.inicio);

const fin=Number(modulo.dataset.fin);

for(let i=inicio;i<=fin;i++){

const ubicacion=normalizarUbicacion(datos.ubicaciones[i]);

modulo.appendChild(crearPuesto(i, ubicacion, datos));

}

});

}

function guardarUbicacion(){

if(!puestoActual)return;

const datos=obtenerDatos();

const persona=datos.agenda[emprendedor.value];

if(!persona){

alert("Primero cargue un emprendedor en la agenda.");

return;

}

datos.ubicaciones[puestoActual]={

nombre:persona.nombre,

estadoPago:estadoPago.value

};

guardarDatos(datos);

dibujarPuestos();

}

function liberarUbicacion(){

if(!puestoActual)return;

const datos=obtenerDatos();

delete datos.ubicaciones[puestoActual];

guardarDatos(datos);

dibujarPuestos();

}
