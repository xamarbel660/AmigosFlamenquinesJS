//Mostrar formularios

//Registrar el click en los elementos del menú

document.querySelector("#mnuAltaCliente").addEventListener("click", mostrarFormularios);
document.querySelector("#mnuBuscarCliente").addEventListener("click", mostrarFormularios);
document.querySelector("#mnuListadoParametrizadoClientes").addEventListener("click", mostrarFormularios);


//Mostrar formularios tras la interacción con el elemento del menú


function mostrarFormularios(oEvento) {
      let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

      ocultarFormularios() ; //Ocultamos los formularios antes de revelar uno

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


        //Casos Pedidos
        case "value":
            
            break;

        default:
            break;
      }

    
}

//Ocultar formularios
function ocultarFormularios(){
    //Ocultar formularios reservas


    //Ocultar formularios clientes
    frmAltaCliente.classList.add("d-none");
    frmBuscarCliente.classList.add("d-none");
    frmListadoParametrizadoClientes.classList.add("d-none");
    //Ocultar formularios pedidos
}
