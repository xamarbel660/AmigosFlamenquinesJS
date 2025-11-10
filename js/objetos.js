"use strict";

class Cliente {
    #id_client;
    #date_created_account;
    #age;
    #is_vip;
    #name;

    constructor(id_client, date_created_account, age, is_vip, name) {
        this.#id_client = id_client;
        this.#date_created_account = date_created_account;
        this.#age = age;
        this.#is_vip = is_vip;
        this.#name = name;
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
       
    toJSON() {
        let oCliente = {
            id_client: this.#id_client,
            date_created_account: this.#date_created_account,
            age: this.#age,
            is_vip: this.#is_vip,
            name: this.#name
        }
        return oCliente;
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

    //Reservas


    //Clientes
    async listadoClientes(){
        let listado="";
        let respuesta = await peticionGET("get_clientes.php", new FormData())

        if (!respuesta.ok) {
             listado = respuesta.mensaje;
         } else {
             listado = "<table class='table table-striped'>";
             listado += "<thead><tr><th>ID</th><th>NOMBRE</th><th>EDAD</th>><th>FECHA AÑADIDO</th><th>¿ES VIP?</th</tr></thead>";
             listado += "<tbody>";

            for (let cliente of respuesta.datos) {
                let es_vip = "No";
                if (parseInt(cliente.is_vip) == 1) {
                    es_vip = "Si"
                }

                let fechaSinFormato = cliente.date_created_account.trim().split("-");
                let fecha_anyadido = `${fechaSinFormato[2]}-${fechaSinFormato[1]}-${fechaSinFormato[0]}`;

                 listado += "<tr><td>" + cliente.id_client.trim() + "</td>";
                 listado += "<td>" + cliente.name.trim() + "</td>";
                 listado += "<td>" + cliente.age.trim() + "</td>";
                 listado += "<td>" + fecha_anyadido + "</td>";
                 listado += "<td>" +es_vip+ "</td></tr>";
                 
             }
             listado += "</tbody></table>";
         }

         return listado;

    }


    //Pedidos

    
}
