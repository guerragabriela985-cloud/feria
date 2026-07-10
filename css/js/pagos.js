const formPago=document.getElementById("formPago");

const emprendedorPago=document.getElementById("emprendedorPago");

const listaPagos=document.getElementById("listaPagos");

cargarEmprendedores();

mostrarPagos();

formPago.addEventListener("submit",guardarPago);

function cargarEmprendedores(){

const datos=obtenerDatos();

emprendedorPago.innerHTML="";

datos.agenda.forEach((persona,index)=>{

const option=document.createElement("option");

option.value=index;

option.textContent=persona.nombre;

emprendedorPago.appendChild(option);

});

}

function guardarPago(e){

e.preventDefault();

const datos=obtenerDatos();

const persona=datos.agenda[emprendedorPago.value];

if(!persona){

alert("Primero cargue un emprendedor en la agenda.");

return;

}

const pago={

nombre:persona.nombre,

monto:document.getElementById("monto").value,

metodo:document.getElementById("metodo").value,

fecha:new Date().toLocaleDateString()

};

datos.pagos.push(pago);

guardarDatos(datos);

formPago.reset();

mostrarPagos();

}

function mostrarPagos(){

const datos=obtenerDatos();

listaPagos.innerHTML="";

datos.pagos.forEach((pago,index)=>{

const card=document.createElement("div");

card.className="pago";

card.innerHTML=`

<h3>${pago.nombre}</h3>

<p>Monto: $${pago.monto}</p>

<p>Método: ${pago.metodo}</p>

<p>Fecha: ${pago.fecha}</p>

<button onclick="eliminarPago(${index})">

Eliminar

</button>

`;

listaPagos.appendChild(card);

});

}

function eliminarPago(index){

const datos=obtenerDatos();

datos.pagos.splice(index,1);

guardarDatos(datos);

mostrarPagos();

}
