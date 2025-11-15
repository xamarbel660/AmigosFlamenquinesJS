<?php
require_once('config.php');

try {
    // Obtener conexión a la BBDD (usa la configuración centralizada)
    $conexion = obtenerConexion();

    if (isset($_GET['idCliente']) || isset($_GET['estado'])) {
        $sql = "SELECT * FROM client_order o, client c WHERE o.id_client = c.id_client";

        if (isset($_GET['idCliente'])) {
            $idCliente = json_decode($_GET['idCliente']);
            $sql .= " AND o.id_client = " . $idCliente;
        }

        if (isset($_GET['estado'])) {
            $estado = json_decode($_GET['estado']);
            $sql .= " AND is_completed = " . $estado;
        }

        $sql .= ";";
        $resultado = $conexion->query($sql);

        // Recolectamos las filas en un array asociativo para serializar a JSON
        $datos = [];
        while ($fila = $resultado->fetch_assoc()) {
            $datos[] = $fila; // cada $fila es un array asociativo (columna => valor)
        }

        // responder() enviará un JSON con estructura { ok, datos, mensaje }
        // y cerrará la conexión si se le pasa.
        responder($datos, true, "Datos recuperados correctamente", $conexion);
    } else {
        // Listado por defecto
        $sql = "SELECT * FROM client_order o, client c WHERE o.id_client = c.id_client;";

        $resultado = $conexion->query($sql);

        // Recolectamos las filas en un array asociativo para serializar a JSON
        $datos = [];
        while ($fila = $resultado->fetch_assoc()) {
            $datos[] = $fila; // cada $fila es un array asociativo (columna => valor)
        }

        // responder() enviará un JSON con estructura { ok, datos, mensaje }
        // y cerrará la conexión si se le pasa.
        responder($datos, true, "Datos recuperados correctamente", $conexion);
    }
} catch (mysqli_sql_exception $e) {
    // Errores específicos de mysqli (p. ej. problemas con la consulta o la conexión)
    // Enviamos un JSON de error. Usamos $conexion ?? null para evitar usar
    // una variable no definida si la conexión falló al crearse.
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    // Captura cualquier otra excepción / error inesperado
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}

// Forma sencilla de recuperar la informacion
// $conexion = obtenerConexion();
// // Datos de entrada
// $idtipo = $_GET['idtipo'];
// // SQL
// $sql = "SELECT * FROM client_order o, client c WHERE o.id_client = c.id_client;";
// $resultado = mysqli_query($conexion, $sql);
// while ($fila = mysqli_fetch_assoc($resultado)) {
//     $datos[] = $fila; // Insertar la fila en el array
// }
// responder($datos, true, "Datos recuperados", $conexion);