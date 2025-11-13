"use strict";

// MAIN PROGRAM
var oEmpresa = new Empresa();

registrarEventos();

//Registrar el click en los elementos del menú y los botones de los formularios
// Registro de eventos
function registrarEventos() {
    // Opciones de menú (navbar)
    document
        .querySelector("#mnuAltaCliente")
        .addEventListener("click", mostrarFormularios);
    document
        .querySelector("#mnuBuscarCliente")
        .addEventListener("click", mostrarFormularios);
    document
        .querySelector("#mnuListadoParametrizadoClientes")
        .addEventListener("click", mostrarFormularios);
    document
        .querySelector("#mnuMostrarClientes")
        .addEventListener("click", mostrarFormularios);

    // Botones
    document
        .querySelector("#btnAceptarAltaCliente")
        .addEventListener("click", procesarAltaCliente);
}


//Mostrar formularios tras la interacción con el elemento del menú
function mostrarFormularios(oEvento) {
    let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios(); //Ocultamos los formularios antes de revelar uno

    switch (opcionMenu) {
        //Casos Reservas

        case "value":
            break;

        //Casos Clientes
        case "mnuAltaCliente":
            frmAltaCliente.classList.remove("d-none");
            break;

        case "mnuBuscarCliente":
            frmBuscarCliente.classList.remove("d-none");
            break;

        case "mnuListadoParametrizadoClientes":
            frmListadoParametrizadoClientes.classList.remove("d-none");
            break;

        case "mnuMostrarClientes":
            mostrarListadoClientes();
            break;

        //Casos Pedidos
        case "value":
            break;
    }
}

//Ocultar formularios
function ocultarFormularios() {
    //Ocultar formularios reservas

    //Ocultar formularios clientes
    frmAltaCliente.classList.add("d-none");
    frmBuscarCliente.classList.add("d-none");
    frmListadoParametrizadoClientes.classList.add("d-none");
    //Ocultar formularios pedidos


    //Ocultar listados
    // Borrado del contenido de capas con resultados
    document.querySelector("#resultadoBusqueda").innerHTML = "";
    document.querySelector("#listados").innerHTML = "";
}

//Funciones reservas

//Funciones clientes
async function mostrarListadoClientes() {
    let tabla = await oEmpresa.listadoClientes();
    document.querySelector("#listados").innerHTML = tabla;
}

async function procesarAltaCliente() {
    //Esto es para obtener la fecha actual en formato YYYY-MM-DD
    let hoy = new Date();
    let año = hoy.getFullYear();
    let mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
    let dia = String(hoy.getDate()).padStart(2, "0");

    let fechaAnyadido = `${año}-${mes}-${dia}`;
    let edad = parseInt(frmAltaCliente.edadCliente.value.trim());
    let esVip = parseInt(frmAltaCliente.radioVIP.value.trim());
    let nombre = frmAltaCliente.nombreCliente.value.trim();

    // He repasado todo, por lo que veo ya funciona todo, tanto lo de validar como el instert en la base de datos
    //Le he cambiado el nombre porque lo tenias como validarAltaComponente y no tenia sentido
    if (validarAltaCliente()) {
        let cliente = new Cliente(null, fechaAnyadido, edad, esVip, nombre);
        let respuesta = await oEmpresa.altaCliente(cliente);

        //Esto lo tienes que modificar para que salga un modal en vez de un alert
        alert(respuesta.mensaje);

        //tu antes tenias: if (!respuesta.error) y estaba mal, porque asin solo se reseteaba y ocultaba el formulario si habia error
        if (respuesta.error) {
            frmAltaCliente.reset();
            frmAltaCliente.classList.add("d-none");
        }

    }
    //esto ya estaba comentado antes
    // if (respuesta.ok) {
    //     // Si NO hay error
    //     //Resetear formulario
    //     frmAltaTipo.reset();
    //     // Ocultar el formulario
    //     frmAltaTipo.classList.add("d-none");
    // }
}

// La funcion de abajo valida los datos del formulario de alta de cliente
function validarAltaCliente() {
    // Recuperar datos del formulario frmModificarComponente
    let edad = parseInt(frmAltaCliente.edadCliente.value.trim());
    let esVip = parseInt(frmAltaCliente.radioVIP.value.trim());
    let nombre = frmAltaCliente.nombreCliente.value.trim();

    let valido = true;
    let errores = "";

    //esta bien que lo compruebes pero en el formulario tienes el value=18
    if (isNaN(edad)) {
        valido = false;
        errores += "La edad del cliente debe ser numérica \n";
    }

    //esto creo yo que nunca va a pasar porque son radio buttons, pero bueno, bien comprobado
    if (esVip != 1 && esVip != 0) {
        valido = false;
        errores += "Error: No se ha podido reconocer si es VIP \n";
    }

    if (nombre.length == 0) {
        valido = false;
        errores += "El nombre no puede estar vacío";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

//Funciones pedidos
