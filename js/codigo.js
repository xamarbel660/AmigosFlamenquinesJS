"use strict";

// MAIN PROGRAM
var oEmpresa = new Empresa();

registrarEventos();

//Registrar el click en los elementos del menú y los botones de los formularios
// Registro de eventos
function registrarEventos() {
    // Opciones de menú (navbar)
    // Reservas
    document
        .querySelector("#mnuListadoReserva")
        .addEventListener("click", mostrarFormularios);
    document
        .querySelector("#mnuBuscarReserva")
        .addEventListener("click", mostrarFormularios);
    document
        .querySelector("#mnuAltaReserva")
        .addEventListener("click", mostrarFormularios);

    // Clientes
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

    // Pedidos

    // Botones
    // Botones formularios Reservas
    document.querySelector("#frmBuscarReserva").addEventListener("submit", e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const params = new URLSearchParams(formData);
            
        mostrarListadoReservas(params)
    });
    document.querySelector("#frmAltaReserva").addEventListener("submit", e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const params = Object.fromEntries(formData.entries());
            
        procesarAltaReserva(params)
    });
    document.querySelector("#frmEditarReserva").addEventListener("submit", e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const params = Object.fromEntries(formData.entries());
            
        procesarEditarReserva(params)
    });

    // Botones formularios Clientes
    document
        .querySelector("#btnAceptarAltaCliente")
        .addEventListener("click", procesarAltaCliente);
    // Botones formularios Pedidos
    
}


//Mostrar formularios tras la interacción con el elemento del menú
async function mostrarFormularios(oEvento) {
    let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios(); //Ocultamos los formularios antes de revelar uno

    switch (opcionMenu) {
        //Casos Reservas
        case "mnuListadoReserva":
            mostrarListadoReservas();
            break;

        case "mnuBuscarReserva":
            frmBuscarReserva.classList.remove("d-none");
            cargarSelectClientes("selClient")
            cargarSelectMesas("selBoard")
            break;

        case "mnuAltaReserva":
            frmAltaReserva.classList.remove("d-none");
            cargarSelectClientes("id_client")
            cargarSelectMesas("id_board")
            break;
        
        case "frmEditarReserva":
            let formData = new FormData(oEvento.target);
            let params = Object.fromEntries(formData.entries());
            
            frmEditarReserva.classList.remove("d-none");

            await cargarSelectClientes("sel_id_client")
            await cargarSelectMesas("sel_id_board")

            frmEditarReserva.id_reservation.value = params.id_reservation;
            frmEditarReserva.sel_id_client.value = params.id_client;
            frmEditarReserva.sel_id_board.value = params.id_board;
            frmEditarReserva.reservation_date.value = params.reservation_date;
            frmEditarReserva.number_of_guests.value = params.number_of_guests;
            frmEditarReserva.comment.value = params.comment || '';
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

//Actualizar desplegables
function actualizarDesplegables(){
    actualizarDesplegablesCategoria();
}

async function actualizarDesplegablesCategoria(){
    let optCategorias = await oEmpresa.opcionesCategoria();
    document.querySelector("#lstCategorias").innerHTML = optCategorias;

}


//Llamar modales
function llamarModalCorrecto(titulo){
    document.querySelector("#tituloModal").innerHTML = titulo;
    document.querySelector("#imagenModal").src = "./assets/flamenquin_correcto.png"
    const modal = new bootstrap.Modal(document.querySelector('#modal'));
    modal.show();
}

function llamarModalError(titulo){
    document.querySelector("#tituloModal").innerHTML = titulo;
    document.querySelector("#imagenModal").src = "./assets/flamenquin_error.png"
    const modal = new bootstrap.Modal(document.querySelector('#modal'));
    modal.show();
}

//Funciones reservas
async function mostrarListadoReservas(parametros = []) {
    let resultado = await oEmpresa.obtenerReservas(parametros);
    
    let mensaje = ""

    if(!resultado.ok) {
        mensaje = resultado.mensaje;
    } else if(resultado.datos) {
        mensaje = "<h2 class='text-center'>Listado de reservas</h2>";
        mensaje += "<table class='table table-striped text-center'>";
        mensaje += "<thead><tr><th>CLIENTE</th><th>DIA_RESERVA</th><th>HORA_RESERVA</th><th>NUM_INVITADOS</th><th>RESERVA_NOCHE</th><th>MESA</th><th>COMENTARIOS</th><th>ACCIONES</th></tr></thead><tbody>";

        for (let fila of resultado.datos) {        
            let idReservation = fila['id_reservation'];
            let clientNameReservation = fila['client_name'];
            let clientIsVip = fila['client_is_vip']?"VIP":"";
            let date = new Date(fila['reservation_date'])
            let reservationDate = date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            let reservationTime = date.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            let numberGuestsReservation = fila['number_of_guests'];
            let nightReservation = fila['is_night_reservation']?"Sí":"No";
            let boardLocationReservation = fila['board_location'];
            let commentReservation = fila['comment'];
            
            mensaje += "<tr>"
            mensaje += `<td>${clientNameReservation}<sup> ${clientIsVip}</sup></td>
                            <td>${reservationDate}</td>
                            <td>${reservationTime}</td>
                            <td>${numberGuestsReservation}</td>
                            <td>${nightReservation}</td>
                            <td>${boardLocationReservation}</td>
                            <td>${commentReservation}</td>
                            <td>
                                <form class='d-inline me-1 frmEditarReserva' id="frmEditarReserva" name="frmEditarReserva">
                                    <input type='hidden' name='id_reservation' value="${idReservation}" />
                                    <input type='hidden' name='reservation_date' value="${fila['reservation_date']}" />
                                    <input type='hidden' name='number_of_guests' value="${numberGuestsReservation}" />
                                    <input type='hidden' name='is_night_reservation' value="${nightReservation}" />
                                    <input type='hidden' name='comment' value="${commentReservation}" />
                                    <input type='hidden' name='id_board' value="${fila["id_board"]}" />
                                    <input type='hidden' name='id_client' value="${fila["id_client"]}" />
                                    <button name='Editar' class='btn btn-primary'><i class='bi bi-pencil-square'></i></button>
                                </form>
                                <form class='d-inline frmBorrarReserva' id="frmBorrarReserva" name="frmBorrarReserva">
                                    <input type='hidden' name='id_reservation' value='${idReservation}'/>
                                    <button name='Borrar' class='btn btn-danger'><i class='bi bi-trash'></i></button>
                                </form>
                            </td>
                        </tr>`;
        }

        mensaje += "</tbody></table>";
    } else {
        mensaje += "<h2 class='text-center'>No se han encontrado coincidencias.</h2>"
    }

    document.querySelector("#listados").innerHTML = mensaje;

    document.querySelectorAll(".frmBorrarReserva").forEach(form => {        
        form.addEventListener("submit", e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const params = Object.fromEntries(formData.entries());

            procesarBorrarReserva(params);
        });
    });

    document.querySelectorAll(".frmEditarReserva").forEach(form => {        
        form.addEventListener("submit", mostrarFormularios);
    });
}

function validarParametrosReserva(parametros) {
  const errores = [];

  // Cliente seleccionado
  if (!parametros.id_client || parametros.id_client.trim() === '') {
    errores.push("Debes seleccionar un cliente.");
  }

  // Fecha válida y futura
  if (!parametros.reservation_date) {
    errores.push("Debes indicar una fecha de reserva.");
  } else {
    const fechaReserva = new Date(parametros.reservation_date);
    const ahora = new Date();
    if (isNaN(fechaReserva.getTime())) {
      errores.push("La fecha de reserva no es válida.");
    } else if (fechaReserva < ahora) {
      errores.push("La fecha de reserva debe ser futura.");
    }
  }

  // Número de invitados
  const invitados = parseInt(parametros.number_of_guests);
  if (isNaN(invitados) || invitados < 1) {
    errores.push("El número de invitados debe ser al menos 1.");
  }

  // Comentario opcional, pero limitado
  if (parametros.comment && parametros.comment.length > 50) {
    errores.push("El comentario no puede superar los 50 caracteres.");
  }

  // Mesa seleccionada
  if (!parametros.id_board || parametros.id_board.trim() === '') {
    errores.push("Debes seleccionar una mesa.");
  }

  return errores;
}
async function procesarAltaReserva(parametros) {    
    let errores = validarParametrosReserva(parametros);

    if (errores.length > 0) {
        let mensajeError = `
        <br>
        <div class="alert alert-danger">
            <ul>${errores.map(e => `<li>${e}</li>`).join('')}</ul>
        </div>`;
        document.querySelector("#listados").innerHTML = mensajeError;
        return { ok: false, errores };
    }
    
    let reserva = new Reserva({id_reservation: null, ...parametros})
    let respuesta = await oEmpresa.altaReserva(reserva);

    let mensaje = `<h2 class='text-center'>${respuesta.mensaje}</h2>`
    document.querySelector("#listados").innerHTML = mensaje;
    return respuesta;
}

async function procesarBorrarReserva(parametros) {    
    let idReserva = parseInt(parametros["id_reservation"])
    let respuesta = await oEmpresa.borrarReserva(idReserva);

    let mensaje = `<h2 class='text-center'>${respuesta.mensaje}</h2>`
    document.querySelector("#listados").innerHTML = mensaje;
    return respuesta;
}

async function procesarEditarReserva(parametros) {
    let reserva = new Reserva({...parametros, id_board: parametros["sel_id_board"], id_client: parametros["sel_id_client"]})
    let respuesta = await oEmpresa.editarReserva(reserva);

    let mensaje = `<h2 class='text-center'>${respuesta.mensaje}</h2>`
    document.querySelector("#listados").innerHTML = mensaje;
    return respuesta;
}

async function cargarSelectClientes(selectId) {
    let selClient = document.getElementById(selectId);

    while (selClient.options.length > 1) {
        selClient.remove(1);
    }

    let resultado = await oEmpresa.obtenerClientes();
    
    if(resultado.ok) {
        for(let cliente of resultado.datos) {
            let option = document.createElement("option");
            option.value = cliente['id_client'];
            option.textContent = cliente['name'];
            selClient.appendChild(option);
        }
    }
}
async function cargarSelectMesas(selectId) {
    let selBoard = document.getElementById(selectId);

    while (selBoard.options.length > 1) {
        selBoard.remove(1);
    }

    let resultado = await oEmpresa.obtenerMesas();
    
    if(resultado.ok) {
        for(let mesa of resultado.datos) {
            let option = document.createElement("option");
            option.value = mesa['id_board'];
            option.textContent = mesa['location'];
            selBoard.appendChild(option);
        }
    }
}

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
    let categoria = parseInt(frmAltaCliente.lstCategorias.value.trim());
    let validacion = validarAltaCliente();
    if (validacion.get("valido")) {
        let cliente = new Cliente(null, fechaAnyadido, edad, esVip, nombre, categoria);
        let respuesta = await oEmpresa.altaCliente(cliente);

        llamarModalCorrecto(respuesta.mensaje);
        frmAltaCliente.edadCliente.value = 18;
        frmAltaCliente.radioVIP.value = 0;
        frmAltaCliente.lstCategorias.value = 1;
        frmAltaCliente.nombreCliente.value = "";

    }else{
        llamarModalError(validacion.get("errores"));
    }
}

// La funcion de abajo valida los datos del formulario de alta de cliente
function validarAltaCliente() {
    // Recuperar datos del formulario frmModificarComponente
    let edad = parseInt(frmAltaCliente.edadCliente.value.trim());
    let esVip = parseInt(frmAltaCliente.radioVIP.value.trim());
    let nombre = frmAltaCliente.nombreCliente.value.trim();

    const resultado = new Map();

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

    resultado.set("valido", valido);
    resultado.set("errores", errores);

    return resultado;
}

//Funciones pedidos
