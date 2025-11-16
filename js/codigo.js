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
  document
    .querySelector("#mnuAltaPedido")
    .addEventListener("click", mostrarFormularios);
  document
    .querySelector("#mnuListadoPedidos")
    .addEventListener("click", procesarListadoPedidos);
  document
    .querySelector("#mnuListadoPedidosParametrizado")
    .addEventListener("click", mostrarFormularios);
  // Botones
  // Botones formularios Reservas
  document
    .querySelector("#frmBuscarReserva")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const params = new URLSearchParams(formData);

      mostrarListadoReservas(params);
    });
  document.querySelector("#frmAltaReserva").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = Object.fromEntries(formData.entries());

    procesarAltaReserva(params);
  });
  document
    .querySelector("#frmEditarReserva")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const params = Object.fromEntries(formData.entries());

      procesarEditarReserva(params);
    });

  // Botones formularios Clientes
  document
    .querySelector("#btnAceptarAltaCliente")
    .addEventListener("click", procesarAltaCliente);

  document
    .querySelector("#btnAceptarBuscarCliente")
    .addEventListener("click", procesarBuscarClienteId);

  document
    .querySelector("#btnAceptarEditarCliente")
    .addEventListener("click", procesarEditarCliente);

  document
    .querySelector("#btnAceptarListadoParametrizadoClientes")
    .addEventListener("click", procesarListadoClientesParametrizado);

    
  // Botones formularios Pedidos
  document
    .querySelector("#btnAceptarAltaPedido")
    .addEventListener("click", procesarAltaPedido);
  document
    .querySelector("#btnAñadirPlatoAltaPedido")
    .addEventListener("click", procesarAñadirPlatoPedido);
  document
    .querySelector("#btnAceptarListadoPedidosParametrizado")
    .addEventListener("click", procesarListadoPedidosParametrizado);
}

//Mostrar formularios tras la interacción con el elemento del menú
async function mostrarFormularios(oEvento) {
  let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)
  actualizarDesplegablesCategoria();
  ocultarFormularios(); //Ocultamos los formularios antes de revelar uno

  switch (opcionMenu) {
    //Casos Reservas
    case "mnuListadoReserva":
      mostrarListadoReservas();
      break;

    case "mnuBuscarReserva":
      frmBuscarReserva.classList.remove("d-none");
      cargarSelectClientes("selClient");
      cargarSelectMesas("selBoard");
      break;

    case "mnuAltaReserva":
      frmAltaReserva.classList.remove("d-none");
      cargarSelectClientes("id_client");
      cargarSelectMesas("id_board");
      break;

    case "frmEditarReserva":
      let formData = new FormData(oEvento.target);
      let params = Object.fromEntries(formData.entries());

      frmEditarReserva.classList.remove("d-none");

      await cargarSelectClientes("sel_id_client");
      await cargarSelectMesas("sel_id_board");

      frmEditarReserva.id_reservation.value = params.id_reservation;
      frmEditarReserva.sel_id_client.value = params.id_client;
      frmEditarReserva.sel_id_board.value = params.id_board;
      frmEditarReserva.reservation_date.value = params.reservation_date;
      frmEditarReserva.number_of_guests.value = params.number_of_guests;
      frmEditarReserva.comment.value = params.comment || "";
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
    case "mnuAltaPedido":
      frmAltaPedido.classList.remove("d-none");
      //ponemos undefined para que no seleccione nada en concreto
      //porque undefined es como no pasar nada
      desplegableClientes(undefined); // Cargar el desplegable de clientes
      desplegablePlatos(undefined);
      break;
    case "mnuListadoPedidosParametrizado":
      frmListadoPedidosParametrizado.classList.remove("d-none");
      desplegableClientes(undefined);
      break;
  }
}

//Ocultar formularios
function ocultarFormularios() {
  //Ocultar formularios reservas
  frmAltaReserva.classList.add("d-none");
  frmBuscarReserva.classList.add("d-none");
  let frmEditarReserva = document.getElementById("frmEditarReserva");
  frmEditarReserva.classList.add("d-none");

  //Ocultar formularios clientes
  frmAltaCliente.classList.add("d-none");
  frmEditarCliente.classList.add("d-none");
  frmBuscarCliente.classList.add("d-none");
  frmBuscarCliente.idClienteBuscar.value = "";
  frmListadoParametrizadoClientes.classList.add("d-none");
  frmListadoParametrizadoClientes.nombreCliente.value = "";
  frmListadoParametrizadoClientes.lstCategorias.value = -1 ;
  frmListadoParametrizadoClientes.lstEsVip.value = -1 ;
  frmListadoParametrizadoClientes.fechaAnyadido.value = "";
  frmListadoParametrizadoClientes.edadCliente.value = "" ;
  //Ocultar formularios pedidos
  frmAltaPedido.classList.add("d-none");
  frmModificarPedido.classList.add("d-none");
  frmListadoPedidosParametrizado.classList.add("d-none");
  //Ocultar listados
  // Borrado del contenido de capas con resultados
  document.querySelector("#resultadoBusqueda").innerHTML = "";
  document.querySelector("#listados").innerHTML = "";
}



async function actualizarDesplegablesCategoria() {
  let optCategorias = await oEmpresa.opcionesCategoria();
  frmAltaCliente.lstCategorias.innerHTML = optCategorias;
  frmEditarCliente.lstCategorias.innerHTML = optCategorias;
  frmListadoParametrizadoClientes.lstCategorias.innerHTML = "<option value='-1' selected>Elige una categoria</option>"+ optCategorias;
}


//Llamar modales
function llamarModalCorrecto(titulo) {
  document.querySelector("#tituloModal").innerHTML = titulo;
  document.querySelector("#imagenModal").src =
    "./assets/flamenquin_correcto.png";
  const modal = new bootstrap.Modal(document.querySelector("#modal"));
  modal.show();
}

function llamarModalError(titulo) {
  document.querySelector("#tituloModal").innerHTML = titulo;
  document.querySelector("#imagenModal").src = "./assets/flamenquin_error.png";
  const modal = new bootstrap.Modal(document.querySelector("#modal"));
  modal.show();
}

//Funciones reservas
async function mostrarListadoReservas(parametros = []) {
  let resultado = await oEmpresa.obtenerReservas(parametros);

  let mensaje = "";

  if (!resultado.ok) {
    mensaje = resultado.mensaje;
  } else if (resultado.datos) {
    mensaje = "<h2 class='text-center'>Listado de reservas</h2>";
    mensaje += "<table class='table table-striped text-center'>";
    mensaje +=
      "<thead><tr><th>CLIENTE</th><th>DIA_RESERVA</th><th>HORA_RESERVA</th><th>NUM_INVITADOS</th><th>RESERVA_NOCHE</th><th>MESA</th><th>COMENTARIOS</th><th>ACCIONES</th></tr></thead><tbody>";

    for (let fila of resultado.datos) {
      let idReservation = fila["id_reservation"];
      let clientNameReservation = fila["client_name"];
      let clientIsVip = fila["client_is_vip"] ? "VIP" : "";
      let date = new Date(fila["reservation_date"]);
      let reservationDate = date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      let reservationTime = date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      let numberGuestsReservation = fila["number_of_guests"];
      let nightReservation = fila["is_night_reservation"] ? "Sí" : "No";
      let boardLocationReservation = fila["board_location"];
      let commentReservation = fila["comment"];

      mensaje += "<tr>";
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
                                    <input type='hidden' name='reservation_date' value="${fila["reservation_date"]}" />
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
    mensaje +=
      "<h2 class='text-center'>No se han encontrado coincidencias.</h2>";
  }

  document.querySelector("#listados").innerHTML = mensaje;

  document.querySelectorAll(".frmBorrarReserva").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const params = Object.fromEntries(formData.entries());

      procesarBorrarReserva(params);
    });
  });

  document.querySelectorAll(".frmEditarReserva").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      mostrarFormularios(e);
    });
  });
}

function validarParametrosReserva(parametros) {
  const errores = [];

  // Cliente seleccionado
  if (!parametros.id_client || parametros.id_client.trim() === "") {
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
  if (!parametros.id_board || parametros.id_board.trim() === "") {
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
            <ul>${errores.map((e) => `<li>${e}</li>`).join("")}</ul>
        </div>`;
    document.querySelector("#listados").innerHTML = mensajeError;
    return { ok: false, errores };
  }

  let reserva = new Reserva({ id_reservation: null, ...parametros });
  let respuesta = await oEmpresa.altaReserva(reserva);

  let mensaje = `<h2 class='text-center'>${respuesta.mensaje}</h2>`;
  document.querySelector("#listados").innerHTML = mensaje;
  return respuesta;
}

async function procesarBorrarReserva(parametros) {
  let idReserva = parseInt(parametros["id_reservation"]);
  let respuesta = await oEmpresa.borrarReserva(idReserva);

  let mensaje = `<h2 class='text-center'>${respuesta.mensaje}</h2>`;
  document.querySelector("#listados").innerHTML = mensaje;
  return respuesta;
}

async function procesarEditarReserva(parametros) {
  let reserva = new Reserva({
    ...parametros,
    id_board: parametros["sel_id_board"],
    id_client: parametros["sel_id_client"],
  });
  let respuesta = await oEmpresa.editarReserva(reserva);

  let mensaje = `<h2 class='text-center'>${respuesta.mensaje}</h2>`;
  document.querySelector("#listados").innerHTML = mensaje;
  return respuesta;
}

// Cargar options en los select de reserva
async function cargarSelectClientes(selectId) {
  let selClient = document.getElementById(selectId);

  while (selClient.options.length > 1) {
    selClient.remove(1);
  }

  let resultado = await oEmpresa.obtenerClientes();

  if (resultado.ok) {
    for (let cliente of resultado.datos) {
      let option = document.createElement("option");
      option.value = cliente["id_client"];
      option.textContent = cliente["name"];
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

  if (resultado.ok) {
    for (let mesa of resultado.datos) {
      let option = document.createElement("option");
      option.value = mesa["id_board"];
      option.textContent = mesa["location"];
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
    let cliente = new Cliente(
      null,
      fechaAnyadido,
      edad,
      esVip,
      nombre,
      categoria
    );
    let respuesta = await oEmpresa.altaCliente(cliente);

    llamarModalCorrecto(respuesta.mensaje);
    frmAltaCliente.edadCliente.value = 18;
    frmAltaCliente.radioVIP.value = 0;
    frmAltaCliente.lstCategorias.value = 1;
    frmAltaCliente.nombreCliente.value = "";
  } else {
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

async function procesarBuscarClienteId() {
  let idClienteBuscar = frmBuscarCliente.idClienteBuscar.value;
  let respuesta = await oEmpresa.buscarClienteId(idClienteBuscar);

  if (respuesta.datos.length == 0) {
    llamarModalError(respuesta.mensaje);
  } else {
    let tabla =
      "<table id='listadoClientesResultado' name='listadoClientesResultado' class='table table-striped text-center align-middle mt-3'>";
    tabla +=
      "<thead><tr><th>ID</th><th>NOMBRE</th><th>EDAD</th><th>CATEGORIA</th><th>ES VIP</th><th>FECHA AÑADIDO</th><th>ACCION</th></tr></thead>";
    tabla += "<tbody>";
    for (const registro of respuesta.datos) {
      let esVip = "No";
      if (registro.is_vip == 1) {
        esVip = "Si";
      }
      let fechaAhoraSinMod = registro.date_created_account;
      let fechaAhoraMod = fechaAhoraSinMod.split("-").reverse().join("-");

      tabla += "<tr>";

      tabla += "<td>" + registro.id_client + "</td>";
      tabla += "<td>" + registro.name + "</td>";
      tabla += "<td>" + registro.age + "</td>";
      tabla += "<td>" + registro.category_name + "</td>";
      tabla += "<td>" + esVip + "</td>";
      tabla += "<td>" + fechaAhoraMod + "</td>";
      tabla +=
        "<td><button name='btnEditarCliente' id='btnEditarCliente' class='btn bg-secondary m-2' data-cliente='" +
        JSON.stringify(registro).replace(/'/g, "&#39;") +
        "'><i class='bi bi-pencil-square'></i></button>";
      tabla +=
        "<button name='btnBorrarCliente' id='btnBorrarCliente' class='btn btn-danger m-2' data-cliente='" +
        registro.id_client +
        "'><i class='bi bi-trash'></i></button></td>";

      tabla += "</tr>";
    }

    tabla += "</tbody>";
    tabla += "</table>";

    document.querySelector("#listados").innerHTML = tabla;

    document
      .querySelector("#listadoClientesResultado")
      .addEventListener("click", procesarBorrarEditarCliente);
  }
}

async function procesarBorrarEditarCliente(oEvento) {
  let boton = null;
  // Verificamos si han hecho clic sobre el botón o el icono
  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
    if (oEvento.target.nodeName == "I") {
      // Pulsacion sobre el icono
      boton = oEvento.target.parentElement; // El padre es el boton
    } else {
      boton = oEvento.target;
    }

    let respuesta = null;

    if (boton.id == "btnBorrarCliente") {
      let idCliente = boton.dataset.cliente;
      respuesta = await oEmpresa.borrarCliente(idCliente);
      procesarBuscarClienteId();
      llamarModalCorrecto(respuesta.mensaje);
    } else if (boton.id == "btnEditarCliente") {
      ocultarFormularios();
      let cliente = JSON.parse(boton.dataset.cliente);
      document.querySelector("#idClienteEditar").innerHTML = cliente.id_client;
      frmEditarCliente.nombreCliente.value = cliente.name;
      frmEditarCliente.edadCliente.value = cliente.age;
      frmEditarCliente.lstCategorias.value = cliente.id_category;
      frmEditarCliente.radioVIP.value = cliente.is_vip;
      frmEditarCliente.classList.remove("d-none");
    }
  }
}

async function procesarEditarCliente() {
  let idCliente = document.querySelector("#idClienteEditar").textContent;
  let nombreCliente = frmEditarCliente.nombreCliente.value;
  let edadCliente = frmEditarCliente.edadCliente.value;
  let categoriaCliente = frmEditarCliente.lstCategorias.value;
  let esVipCliente = frmEditarCliente.radioVIP.value;

  let clienteCambios = new Cliente(
    idCliente,
    "",
    edadCliente,
    esVipCliente,
    nombreCliente,
    categoriaCliente
  );

  let respuesta = await oEmpresa.editarCliente(clienteCambios);

  llamarModalCorrecto(respuesta.mensaje);
  ocultarFormularios();
}

async function procesarListadoClientesParametrizado() {
    let nameCli = frmListadoParametrizadoClientes.nombreCliente.value;
    let fechaAny = frmListadoParametrizadoClientes.fechaAnyadido.value;
    let ageCli = frmListadoParametrizadoClientes.edadCliente.value;
    let categoriaCli = frmListadoParametrizadoClientes.lstCategorias.value;
    let esVipCli = frmListadoParametrizadoClientes.lstEsVip.value;

    let cliParam = new Cliente(null,fechaAny, ageCli, esVipCli, nameCli, categoriaCli)

    let respuesta = await oEmpresa.listadoParametrizadoClientes(cliParam);

    if (respuesta.datos.length == 0) {
    llamarModalError(respuesta.mensaje);
  } else {
    let tabla =
      "<table id='listadoClientesParamResultado' name='listadoClientesParamResultado' class='table table-striped text-center align-middle mt-3'>";
    tabla +=
      "<thead><tr><th>ID</th><th>NOMBRE</th><th>EDAD</th><th>CATEGORIA</th><th>ES VIP</th><th>FECHA AÑADIDO</th></tr></thead>";
    tabla += "<tbody>";
    for (const registro of respuesta.datos) {
      let esVip = "No";
      if (registro.is_vip == 1) {
        esVip = "Si";
      }
      let fechaAhoraSinMod = registro.date_created_account;
      let fechaAhoraMod = fechaAhoraSinMod.split("-").reverse().join("-");

      tabla += "<tr>";

      tabla += "<td>" + registro.id_client + "</td>";
      tabla += "<td>" + registro.name + "</td>";
      tabla += "<td>" + registro.age + "</td>";
      tabla += "<td>" + registro.category_name + "</td>";
      tabla += "<td>" + esVip + "</td>";
      tabla += "<td>" + fechaAhoraMod + "</td>";

      tabla += "</tr>";
    }

    tabla += "</tbody>";
    tabla += "</table>";

    document.querySelector("#listados").innerHTML = tabla;



  }
}

//Funciones pedidos
// Proceso para dar de alta un pedido
// No hecho
async function procesarAltaPedido() {
  // Recuperar datos del formulario frmAltaComponente
  let idCliente = frmAltaPedido.lstClienteAltaPedido.value;
  let fechaAhora = new Date(); //obtener la fecha y hora actual
  // slice es para decir donde empieza y acaba la cadena, y con replace le decimos que la T la cambie por un espacio
  // ya que el formato por defecto de toISOString es YYYY-MM-DDTHH:MM:SS
  let fechaPedido = fechaAhora.toISOString().slice(0, 19).replace("T", " ");
  let comentarioPedido =
    frmAltaPedido.textAreaComentarioAltaPedido.value.trim();

  let descripcion = frmAltaPedido.txtAltaDescripcion.value.trim();
  let precio = parseFloat(frmAltaPedido.txtAltaPrecio.value.trim());

  // Validar datos del formulario
  if (validarAltaPedido()) {
    let respuesta = await oEmpresa.altaComponente(
      new Componente(null, nombre, descripcion, precio, idTipo)
    );
    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmAltaComponente.reset();
      // Ocultar el formulario
      frmAltaComponente.classList.add("d-none");
    }
  }
}

// Validacion de valores para añadir un pedido
// No hecho
function validarAltaPedido() {
  // Recuperar datos del formulario frmModificarComponente
  let comentarioPedido =
    frmAltaPedido.textAreaComentarioAltaPedido.value.trim();

  let nombre = frmAltaComponente.txtAltaNombre.value.trim();
  let descripcion = frmAltaComponente.txtAltaDescripcion.value.trim();
  let precio = parseFloat(frmAltaComponente.txtAltaPrecio.value.trim());
  let idTipo = frmAltaComponente.lstAltaTipo.value;

  let valido = true;
  let errores = "";

  if (comentarioPedido.length == 0) {
    valido = false;
    errores += "El comentario del pedido no puede estar vacío";
  }

  // Verificar de que nota no es vacio

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

// Proceso para añadir platos a pedidos
// No hecho
async function procesarAñadirPlatoPedido() {
  let idPlato = frmAltaPedido.lstPlatosAltaPedido.value;
  let notaPlato = frmAltaPedido.notaPlatoAltaPedido.value.trim();
  let cantidadPlatos = frmAltaPedido.cantidadPlatosAltaPedido.value;

  let respuesta = await oEmpresa.getPlatos(idPlato);
  let platoSelec = "";
  if (notaPlato === "") {
    platoSelec = `<option value="${respuesta.datos.id_plate}">${cantidadPlatos} ${respuesta.datos.name}</option>`;
  } else {
    platoSelec = `<option value="${respuesta.datos.id_plate}">${cantidadPlatos} ${respuesta.datos.name} (${notaPlato})</option>`;
  }
  // Agrego los options generados a partir del contenido de la BD en todos los desplegables
  frmAltaPedido.lstPlatosSelectAltaPedido.innerHTML += platoSelec;
}

async function procesarBotonEditarBorrarPedido(oEvento) {
  let boton = null;

  // Verificamos si han hecho clic sobre el botón o el icono
  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
    if (oEvento.target.nodeName == "I") {
      // Pulsacion sobre el icono
      boton = oEvento.target.parentElement; // El padre es el boton
    } else {
      boton = oEvento.target;
    }

    // Diferenciar por clase CSS
    // Todavia no hecho
    if (boton.classList.contains("btn-primary")) {
      // Botón editar
      ocultarFormularios();
      frmModificarPedido.classList.remove("d-none");
      let pedido = JSON.parse(boton.dataset.pedido);

      frmModificarPedido.textAreaComentarioModificarPedido.value =
        pedido.comment;
      if (pedido.is_completed == 1) {
        document.getElementById("finalizado").checked = true;
      } else {
        document.getElementById("en_preparacion").checked = true;
      }

      // frmModificarPedido.txtModNombre.value = componente.nombre;
      // frmModificarPedido.txtModDescripcion.value = componente.descripcion;
      // frmModificarPedido.txtModPrecio.value = componente.precio;
      desplegableClientes(pedido.id_client);
    } else if (boton.classList.contains("btn-danger")) {
      // Botón borrar
      let pedido = JSON.parse(boton.dataset.pedido);
      // constructor(id_client_order, client_order_date, total_price, is_completed, comment, id_client)
      let respuesta = await oEmpresa.borradoPedido(pedido.id_client_order);

      alert(respuesta.mensaje);

      if (respuesta.ok) {
        // Si NO hay error
        // Ocultar el formulario
        ocultarFormularios();
      }
    }
  }
}

// Helper: formatea 'YYYY-MM-DD HH:MM:SS' o formatos ISO a 'DD/MM/YYYY'
// Funcion para dar formato a la fecha
function formatDate(dateTimeString) {
  if (!dateTimeString) return "";
  // Tomar solo la parte de fecha (soporta 'YYYY-MM-DD HH:MM:SS' y 'YYYY-MM-DDTHH:MM:SS')
  let datePart = dateTimeString.split(" ")[0].split("T")[0];
  let parts = datePart.split("-");
  if (parts.length !== 3) return dateTimeString;
  return parts[2] + "/" + parts[1] + "/" + parts[0];
}

async function procesarListadoPedidos() {
  //Obtener el listado de componentes
  let respuesta = await oEmpresa.listadoPedidos();

  let listado = "<table class='table table-striped' id='listadoPedidos'>";
  listado +=
    "<thead><tr><th>Cliente</th><th>FECHA PEDIDO</th><th>COMENTARIO</th><th>ESTADO</th><th>PRECIO TOTAL</th></tr></thead>";
  listado += "<tbody>";
  for (let fila of respuesta.datos) {
    listado += "<tr><td>" + fila.name + "</td>";
    // Formateo la fecha
    listado += "<td>" + formatDate(fila.client_order_date) + "</td>";
    listado += "<td>" + fila.comment + "</td>";
    listado +=
      "<td>" +
      (fila.is_completed == 1 ? "Finalizado" : "En preparación") +
      "</td>";
    listado += "<td>" + fila.total_price + "</td>";

    // Editar
    listado +=
      "<td><button class='btn btn-primary' data-pedido='" +
      JSON.stringify(fila) +
      "'><i class='bi bi-pencil-square'></i></button></td>";
    // Borrar
    listado +=
      "<td><button class='btn btn-danger' data-pedido='" +
      JSON.stringify(fila) +
      "'><i class='bi bi-trash'></i></button></td></tr>";
  }
  listado += "</tbody></table>";

  //agregamos el contenido a la capa de listados
  ocultarFormularios();
  document.querySelector("#listados").innerHTML = listado;
  // Agregar manejador de evento para toda la tabla
  document
    .querySelector("#listadoPedidos")
    .addEventListener("click", procesarBotonEditarBorrarPedido);
}

async function procesarListadoPedidosParametrizado() {
  // Recuperar idCliente seleccionado
  let idCliente;
  if (
    frmListadoPedidosParametrizado.lstClientesListadoPedidosParametrizado
      .value != 0
  ) {
    idCliente =
      frmListadoPedidosParametrizado.lstClientesListadoPedidosParametrizado
        .value;
  }

  let estado;
  if (
    frmListadoPedidosParametrizado.finalizadoListadoPedidosParametrizado.checked
  ) {
    estado = "finalizada";
  }
  if (
    frmListadoPedidosParametrizado.enPreparacionListadoPedidosParametrizado
      .checked
  ) {
    estado = "preparandose";
  }

  let respuesta = await oEmpresa.listadoPedidos(idCliente, estado);

  let listadoParametrizado =
    "<table class='table table-striped' id='listadoPedidosParametrizado'>";
  listadoParametrizado +=
    "<thead><tr><th>Cliente</th><th>FECHA PEDIDO</th><th>COMENTARIO</th><th>ESTADO</th><th>PRECIO TOTAL</th></tr></thead>";
  listadoParametrizado += "<tbody>";
  for (let fila of respuesta.datos) {
    listadoParametrizado += "<tr><td>" + fila.name + "</td>";
    // Formateo la fecha
    listadoParametrizado +=
      "<td>" + formatDate(fila.client_order_date) + "</td>";
    listadoParametrizado += "<td>" + fila.comment + "</td>";
    listadoParametrizado +=
      "<td>" +
      (fila.is_completed == 1 ? "Finalizado" : "En preparación") +
      "</td>";
    listadoParametrizado += "<td>" + fila.total_price + "</td>";

    // Editar
    listadoParametrizado +=
      "<td><button class='btn btn-primary' data-pedido='" +
      JSON.stringify(fila) +
      "'><i class='bi bi-pencil-square'></i></button></td>";
    // Borrar
    listadoParametrizado +=
      "<td><button class='btn btn-danger' data-pedido='" +
      JSON.stringify(fila) +
      "'><i class='bi bi-trash'></i></button></td></tr>";
  }
  listadoParametrizado += "</tbody></table>";

  //agregamos el contenido a la capa de listados
  ocultarFormularios();
  //Esto es para reiniciar el formulario
  document.getElementById("frmListadoPedidosParametrizado").reset();
  // //Resetear formulario
  // frmAltaTipo.reset();
  document.querySelector("#listados").innerHTML = listadoParametrizado;
  // Agregar manejador de evento para toda la tabla
  document
    .querySelector("#listadoPedidosParametrizado")
    .addEventListener("click", procesarBotonEditarBorrarPedido);
}

async function desplegableClientes(idClienteSeleccionado) {
  let respuesta = await oEmpresa.getClientes();
  let options = "";

  for (let cliente of respuesta.datos) {
    if (idClienteSeleccionado && idClienteSeleccionado == cliente.id_client) {
      // Si llega el parámetro ( != undefined )
      options +=
        "<option selected value='" +
        cliente.id_client +
        "' >" +
        cliente.name +
        "</option>";
    } else {
      options +=
        "<option value='" +
        cliente.id_client +
        "' >" +
        cliente.name +
        "</option>";
    }
  }
  // Agrego los options generados a partir del contenido de la BD en todos los desplegables
  frmAltaPedido.lstClienteAltaPedido.innerHTML = options;
  // Añado el cliente a modificar pedido
  frmModificarPedido.lstClienteModificarPedido.innerHTML = options;
  // Añado los clientes para el listado parametrizado
  frmListadoPedidosParametrizado.lstClientesListadoPedidosParametrizado.innerHTML =
    "<option value='0'>Selecione un cliente</option>" + options;
}

async function desplegablePlatos(idPlatoSeleccionado) {
  let respuesta = await oEmpresa.getPlatos();
  let options = "";

  for (let plato of respuesta.datos) {
    if (idPlatoSeleccionado && idPlatoSeleccionado == plato.id_plate) {
      // Si llega el parámetro ( != undefined )
      options +=
        "<option selected value='" +
        plato.id_plate +
        "' >" +
        plato.name +
        "__" +
        plato.price +
        "</option>";
    } else {
      options +=
        "<option value='" +
        plato.id_plate +
        "' >" +
        plato.name +
        "__" +
        plato.price +
        "</option>";
    }
  }
  // Agrego los options generados a partir del contenido de la BD en todos los desplegables
  frmAltaPedido.lstPlatosAltaPedido.innerHTML = options;
  // Me servira mas adelante si hago modificacion de pedidos
  // frmModificarComponente.lstModTipo.innerHTML = options;
  // frmAltaComponente.lstAltaTipo.innerHTML = options;
}
