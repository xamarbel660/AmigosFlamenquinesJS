"use strict";
class Reserva {
    #id_reservation;
    #reservation_date;
    #number_of_guests;
    #is_night_reservation;
    #comment;
    #id_board;
    #id_client;

    constructor({ id_reservation, reservation_date, number_of_guests, is_night_reservation, comment, id_board, id_client }) {
        this.#id_reservation = id_reservation;
        this.#reservation_date = reservation_date;
        this.#number_of_guests = number_of_guests;
        this.#is_night_reservation = is_night_reservation;
        this.#comment = comment;
        this.#id_board = id_board;
        this.#id_client = id_client;
    }

    get id_reservation() {
        return this.#id_reservation;
    }
    get reservation_date() {
        return this.#reservation_date;
    }
    get number_of_guests() {
        return this.#number_of_guests;
    }
    get is_night_reservation() {
        return this.#is_night_reservation;
    }
    get comment() {
        return this.#comment;
    }
    get id_board() {
        return this.#id_board;
    }
    get id_client() {
        return this.#id_client;
    }

    set reservation_date(reservation_date) {
        this.#reservation_date = reservation_date;
    }
    set number_of_guests(number_of_guests) {
        this.#number_of_guests = number_of_guests;
    }
    set is_night_reservation(is_night_reservation) {
        this.#is_night_reservation = is_night_reservation;
    }
    set comment(comment) {
        this.#comment = comment;
    }
    set id_board(id_board) {
        this.#id_board = id_board;
    }
    set id_client(id_client) {
        this.#id_client = id_client;
    }

    toJSON() {
        return {
            id_reservation: this.id_reservation,
            reservation_date: this.reservation_date,
            number_of_guests: this.number_of_guests,
            is_night_reservation: this.is_night_reservation,
            comment: this.comment,
            id_board: this.id_board,
            id_client: this.id_client
        }
    }
}

class Cliente {
    #id_client;
    #date_created_account;
    #age;
    #is_vip;
    #name;
    #id_category;

    constructor(id_client, date_created_account, age, is_vip, name, id_category) {
        this.#id_client = id_client;
        this.#date_created_account = date_created_account;
        this.#age = age;
        this.#is_vip = is_vip;
        this.#name = name;
        this.#id_category = id_category;

    }
    get id_client() {
        return this.#id_client;
    }
    get date_created_account() {
        return this.#date_created_account;
    }
    get age() {
        return this.#age;
    }
    get is_vip() {
        return this.#is_vip;
    }
    get name() {
        return this.#name;
    }

    get id_category() {
        return this.#id_category;
    }

    set id_client(id_client) {
        this.#id_client = id_client;
    }
    set date_created_account(date_created_account) {
        this.#date_created_account = date_created_account;
    }
    set age(age) {
        this.#age = age;
    }
    set is_vip(is_vip) {
        this.#is_vip = is_vip;
    }
    set name(name) {
        this.#name = name;
    }

    set id_category(id_category) {
        this.#id_category = id_category;
    }

    toJSON() {
        let oCliente = {
            id_client: this.#id_client,
            date_created_account: this.#date_created_account,
            age: this.#age,
            is_vip: this.#is_vip,
            name: this.#name,
            id_category: this.#id_category
        };
        return oCliente;
    }
}

class Pedido {
    #id_client_order;
    #client_order_date;
    #total_price;
    #is_completed;
    #comment;
    #id_client;

    constructor(id_client_order, client_order_date, total_price, is_completed, comment, id_client) {
        this.#id_client_order = id_client_order;
        this.#client_order_date = client_order_date;
        this.#total_price = total_price;
        this.#is_completed = is_completed;
        this.#comment = comment;
        this.#id_client = id_client;
    }

    get id_client_order() {
        return this.#id_client_order;
    }
    get client_order_date() {
        return this.#client_order_date;
    }
    get total_price() {
        return this.#total_price;
    }
    get is_completed() {
        return this.#is_completed;
    }
    get comment() {
        return this.#comment;
    }
    get id_client() {
        return this.#id_client;
    }

    set id_client_order(id_client_order) {
        this.#id_client_order = id_client_order;
    }
    set client_order_date(client_order_date) {
        this.#client_order_date = client_order_date;
    }
    set total_price(total_price) {
        this.#total_price = total_price;
    }
    set is_completed(is_completed) {
        this.#is_completed = is_completed;
    }
    set comment(comment) {
        this.#comment = comment;
    }
    set id_client(id_client) {
        this.#id_client = id_client;
    }

    toJSON() {
        let oPedido = {
            id_client_order: this.#id_client_order,
            client_order_date: this.#client_order_date,
            total_price: this.#total_price,
            is_completed: this.#is_completed,
            comment: this.#comment,
            id_client: this.#id_client
        }
        return oPedido;
    }
}

class Empresa {
    // async altaTipo(oTipo) {
    //     let datos = new FormData();

    //     datos.append("tipo", oTipo.tipo);
    //     datos.append("descripcion", oTipo.descripcion);

    //     let respuesta = await peticionPOST("alta_tipo.php", datos);

    //     return respuesta;
    // }

    // async listadoTipoComponentes() {
    //     let listado = "";

    //     let respuesta = await peticionGET("get_tipos.php", new FormData());

    //     if (!respuesta.ok) {
    //         listado = respuesta.mensaje;
    //     } else {
    //         listado = "<table class='table table-striped'>";
    //         listado += "<thead><tr><th>IDTIPO</th><th>TIPO</th><th>DESCRIPCIÓN</th></tr></thead>";
    //         listado += "<tbody>";

    //         for (let tipo of respuesta.datos) {
    //             listado += "<tr><td>" + tipo.idtipo + "</td>";
    //             listado += "<td>" + tipo.tipo + "</td>";
    //             listado += "<td>" + tipo.descripcion + "</td></tr>";
    //         }
    //         listado += "</tbody></table>";
    //     }

    //     return listado;
    // }

    //Recoger informacion para desplegables
    async opcionesCategoria() {
        let opciones = "";
        let respuesta = await peticionGET("get_categorias.php", new FormData());

        if (respuesta.ok) {
            for (let categoria of respuesta.datos) {
                opciones += "<option value='" + categoria.id_category + "'>" + categoria.category_name + "</option>";
            }
        }
        return opciones;
    }

    //Reservas
    async obtenerReservas(parametros = []) {
        let respuesta = await peticionGET("get_reservas.php", parametros)
        return respuesta;
    }

    async altaReserva(reserva) {
        let datos = new FormData();
        datos.append("reserva", JSON.stringify(reserva.toJSON()));

        let respuesta = await peticionPOST("alta_reserva.php", datos);

        return respuesta;
    }

    async borrarReserva(id_reserva) {
        let datos = new FormData();
        datos.append("id_reserva", id_reserva);

        let respuesta = await peticionPOST("borrar_reserva.php", datos);

        return respuesta;
    }

    async editarReserva(reserva) {
        let datos = new FormData();
        datos.append("reserva", JSON.stringify(reserva.toJSON()));

        let respuesta = await peticionPOST("editar_reserva.php", datos);

        return respuesta;
    }

    async obtenerClientes() {
        let respuesta = await peticionGET("get_clientes2.php", new FormData())
        return respuesta;
    }
    async obtenerMesas() {
        let respuesta = await peticionGET("get_mesas.php", new FormData())
        return respuesta;
    }

    //Cliente
    async altaCliente(cliente) {
        let datos = new FormData();
        datos.append("cliente", JSON.stringify(cliente.toJSON()));
        let respuesta = await peticionPOST("proceso_alta_cliente.php", datos);

        return respuesta;
    }

    async listadoClientes() {
        let listado = "";
        let respuesta = await peticionGET("get_clientes.php", new FormData());

        if (!respuesta.ok) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado +=
                "<thead><tr><th>ID</th><th>NOMBRE</th><th>EDAD</th><th>CATEGORIA</th><th>ES VIP</th><th>FECHA AÑADIDO</th></tr></thead>";
            listado += "<tbody>";

            for (let cliente of respuesta.datos) {
                let es_vip = "No";
                if (parseInt(cliente.is_vip) == 1) {
                    es_vip = "Si";
                }

                let fechaSinFormato = cliente.date_created_account.trim().split("-");
                let fecha_anyadido = `${fechaSinFormato[2]}-${fechaSinFormato[1]}-${fechaSinFormato[0]}`;

                listado += "<tr><td>" + cliente.id_client.trim() + "</td>";
                listado += "<td>" + cliente.name.trim() + "</td>";
                listado += "<td>" + cliente.age.trim() + "</td>";
                listado += "<td>" + cliente.category_name.trim() + "</td>";
                listado += "<td>" + es_vip + "</td>";
                listado += "<td>" + fecha_anyadido + "</td></tr>";
            }
            listado += "</tbody></table>";
        }

        return listado;
    }


    //Pedidos
    async borradoPedido(idPedido) {
        let datos = new FormData();
        datos.append("idPedido", idPedido);

        let respuesta = await peticionPOST("proceso_borrado_pedido.php", datos);

        return respuesta;
    }

    async getClientes() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_clientes.php", datos);

        return respuesta;
    }

    async getPlatos(idPlato) {
        let datos = new FormData();
        let respuesta;

        if (idPlato) {
            datos.append("idPlato", idPlato);
        }

        respuesta = await peticionGET("get_platos.php", datos);

        return respuesta;
    }

    async listadoPedidos(idCliente, estado) {
        let datos = new FormData();

        if (idCliente) {
            datos.append("idCliente", idCliente);
        }

        if (estado == "finalizada") {
            estado = 1
            datos.append("estado", estado);
        }
        
        if (estado == "preparandose") {
            estado = 0
            datos.append("estado", estado);
        }

        let respuesta = await peticionGET("get_pedidos.php", datos);

        return respuesta;
    }
}
