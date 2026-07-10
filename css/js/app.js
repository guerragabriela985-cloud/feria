/*=========================================
    FERIA MANAGER
    APP.JS
==========================================*/

const sidebar = document.getElementById("sidebar");
const menu = document.querySelector(".menu");

menu.addEventListener("click", () => {
    sidebar.classList.toggle("abierto");
});

document.addEventListener("click", (e) => {

    if (window.innerWidth > 768) return;

    if (
        !sidebar.contains(e.target) &&
        !menu.contains(e.target)
    ) {
        sidebar.classList.remove("abierto");
    }

});

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {
        sidebar.classList.remove("abierto");
    }

});

/*=========================================
    EFECTO ACTIVO MENÚ
==========================================*/

const opciones = document.querySelectorAll(".sidebar li");

opciones.forEach(opcion => {

    opcion.addEventListener("click", () => {

        opciones.forEach(o => o.classList.remove("activo"));

        opcion.classList.add("activo");

    });

});

/*=========================================
    ANIMACIÓN TARJETAS
==========================================*/

const tarjetas = document.querySelectorAll(".tarjeta, .detalle");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.15
});

tarjetas.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = ".4s ease";

    observer.observe(card);

});

/*=========================================
    ATAJOS DE TECLADO
==========================================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowLeft") {

        btnAnterior.click();

    }

    if (e.key === "ArrowRight") {

        btnSiguiente.click();

    }

});

/*=========================================
    MENSAJE BIENVENIDA
==========================================*/

console.log("%cFeria Manager iniciado correctamente",
"color:#2F80ED;font-size:16px;font-weight:bold;");