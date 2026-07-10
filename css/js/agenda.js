const form = document.getElementById("formAgenda");

const lista = document.getElementById("listaAgenda");

const buscar = document.getElementById("buscar");

const resumenAgenda = document.getElementById("resumenAgenda");

const nombreInput = document.getElementById("nombre");

const rubroInput = document.getElementById("rubro");

const telefonoInput = document.getElementById("telefono");

const instagramInput = document.getElementById("instagram");

const feriaInput = document.getElementById("feria");

let indiceEditar = null;

mostrarAgenda();

form.addEventListener("submit", guardar);

buscar.addEventListener("input", mostrarAgenda);

function guardar(e){

e.preventDefault();

const datos = obtenerDatos();

const emprendedor={

nombre:nombreInput.value.trim(),

rubro:rubroInput.value.trim(),

telefono:telefonoInput.value.trim(),

instagram:instagramInput.value.trim(),

feria:feriaInput.value

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

function coincideBusqueda(persona,texto){

return [persona.nombre, persona.rubro, persona.telefono, persona.instagram, persona.feria]

.some(valor => (valor || "").toLowerCase().includes(texto));

}

function mostrarResumenAgenda(datos){

const total=datos.agenda.length;

const totalEuca=datos.agenda.filter(persona=>persona.feria === "EUCA").length;

const totalPlate=datos.agenda.filter(persona=>persona.feria === "PLATE").length;

resumenAgenda.innerHTML="";

[

{etiqueta:"Total", valor:total},

{etiqueta:"EUCA", valor:totalEuca},

{etiqueta:"PLATE", valor:totalPlate}

].forEach(item=>{

const card=document.createElement("div");

card.className="resumenAgendaCard";

const valor=document.createElement("strong");

valor.textContent=item.valor;

const etiqueta=document.createElement("span");

etiqueta.textContent=item.etiqueta;

card.appendChild(valor);

card.appendChild(etiqueta);

resumenAgenda.appendChild(card);

});

}

function mostrarAgenda(){

const datos=obtenerDatos();

const texto=buscar.value.toLowerCase();

lista.innerHTML="";

mostrarResumenAgenda(datos);

const emprendedoresFiltrados=datos.agenda

.map((persona,index)=>({persona,index}))

.filter(({persona})=>coincideBusqueda(persona,texto));

if(emprendedoresFiltrados.length === 0){

const fila=document.createElement("tr");

const celda=document.createElement("td");

celda.colSpan=6;

celda.className="agendaVacia";

celda.textContent=datos.agenda.length === 0 ? "Todavía no hay emprendedores cargados." : "No hay emprendedores que coincidan con la búsqueda.";

fila.appendChild(celda);

lista.appendChild(fila);

return;

}

emprendedoresFiltrados.forEach(({persona,index})=>{

const fila=document.createElement("tr");

[persona.nombre, persona.rubro, persona.telefono, persona.instagram, persona.feria].forEach(valor=>{

const celda=document.createElement("td");

celda.textContent=valor || "-";

fila.appendChild(celda);

});

const acciones=document.createElement("td");

const editarBtn=document.createElement("button");

editarBtn.type="button";

editarBtn.textContent="Editar";

editarBtn.addEventListener("click",()=>editar(index));

const eliminarBtn=document.createElement("button");

eliminarBtn.type="button";

eliminarBtn.textContent="Eliminar";

eliminarBtn.className="btnEliminar";

eliminarBtn.addEventListener("click",()=>eliminar(index));

acciones.appendChild(editarBtn);

acciones.appendChild(eliminarBtn);

fila.appendChild(acciones);

lista.appendChild(fila);

});

}

function editar(i){

const datos=obtenerDatos();

const p=datos.agenda[i];

if(!p)return;

nombreInput.value=p.nombre;

rubroInput.value=p.rubro;

telefonoInput.value=p.telefono;

instagramInput.value=p.instagram;

feriaInput.value=p.feria;

indiceEditar=i;

}

function eliminar(i){

const datos=obtenerDatos();

datos.agenda.splice(i,1);

guardarDatos(datos);

mostrarAgenda();

}
