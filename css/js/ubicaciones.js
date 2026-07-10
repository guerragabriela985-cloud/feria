const modulo1 = document.getElementById("modulo1");

const emprendedor = document.getElementById("emprendedor");

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

function dibujarPuestos(){

modulo1.innerHTML="";

const datos=obtenerDatos();

for(let i=1;i<=20;i++){

const div=document.createElement("div");

div.className="puesto";

div.dataset.numero=i;

div.textContent=i;

if(datos.ubicaciones[i]){

div.classList.add("ocupado");

div.title=datos.ubicaciones[i];

}

div.onclick=()=>{

puestoActual=i;

puestoSeleccionado.textContent="Puesto "+i;

};

modulo1.appendChild(div);

}

}

function guardarUbicacion(){

if(!puestoActual)return;

const datos=obtenerDatos();

const persona=datos.agenda[emprendedor.value];

datos.ubicaciones[puestoActual]=persona.nombre;

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