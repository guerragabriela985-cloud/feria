const modulo1 = document.getElementById("modulo1");

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

function dibujarPuestos(){

modulo1.innerHTML="";

const datos=obtenerDatos();

for(let i=1;i<=20;i++){

const div=document.createElement("div");

const ubicacion=normalizarUbicacion(datos.ubicaciones[i]);

div.className="puesto";

div.dataset.numero=i;

const numero=document.createElement("strong");

numero.textContent=i;

div.appendChild(numero);

if(ubicacion){

const nombre=document.createElement("small");

nombre.textContent=ubicacion.nombre;

div.appendChild(nombre);

div.classList.add("ocupado", ubicacion.estadoPago === "pago" ? "puestoPago" : "puestoNoPago");

div.title=`${ubicacion.nombre} - ${ubicacion.estadoPago === "pago" ? "Pago" : "No pago"}`;

}

div.onclick=()=>{

puestoActual=i;

puestoSeleccionado.textContent="Puesto "+i;

if(ubicacion){

estadoPago.value=ubicacion.estadoPago;

const indicePersona=datos.agenda.findIndex(persona=>persona.nombre === ubicacion.nombre);

if(indicePersona >= 0){

emprendedor.value=indicePersona;

}

}

};

modulo1.appendChild(div);

}

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
