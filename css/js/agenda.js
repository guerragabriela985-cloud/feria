const form = document.getElementById("formAgenda");

const lista = document.getElementById("listaAgenda");

const buscar = document.getElementById("buscar");

let indiceEditar = null;

mostrarAgenda();

form.addEventListener("submit", guardar);

buscar.addEventListener("input", mostrarAgenda);

function guardar(e){

e.preventDefault();

const datos = obtenerDatos();

const emprendedor={

nombre:document.getElementById("nombre").value,

rubro:document.getElementById("rubro").value,

telefono:document.getElementById("telefono").value,

instagram:document.getElementById("instagram").value,

feria:document.getElementById("feria").value

};

if(indiceEditar===null){

datos.agenda.push(emprendedor);

}else{

datos.agenda[indiceEditar]=emprendedor;

indiceEditar=null;

}

guardarDatos(datos);

form.reset();

mostrarAgenda();

}

function mostrarAgenda(){

const datos=obtenerDatos();

const texto=buscar.value.toLowerCase();

lista.innerHTML="";

datos.agenda.forEach((persona,index)=>{

if(

persona.nombre.toLowerCase().includes(texto)||

persona.rubro.toLowerCase().includes(texto)

){

const card=document.createElement("div");

card.className="emprendedor";

card.innerHTML=`

<h3>${persona.nombre}</h3>

<p>${persona.rubro}</p>

<p>${persona.telefono}</p>

<p>${persona.instagram}</p>

<p>${persona.feria}</p>

<button onclick="editar(${index})">

Editar

</button>

<button onclick="eliminar(${index})">

Eliminar

</button>

`;

lista.appendChild(card);

}

});

}

function editar(i){

const datos=obtenerDatos();

const p=datos.agenda[i];

nombre.value=p.nombre;

rubro.value=p.rubro;

telefono.value=p.telefono;

instagram.value=p.instagram;

feria.value=p.feria;

indiceEditar=i;

}

function eliminar(i){

const datos=obtenerDatos();

datos.agenda.splice(i,1);

guardarDatos(datos);

mostrarAgenda();

}