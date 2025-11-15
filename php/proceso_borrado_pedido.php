<?php
/*
    alta_tipo.php

    Pequeña API para insertar un nuevo registro en la tabla `tipo`.
    Versión adaptada al estilo seguro y didáctico usado en `alta_componente.php`:
    - Usa try/catch para manejar excepciones de mysqli.
    - Valida la entrada mínima y responde en JSON con responder().
    - Emplea prepared statement para evitar inyección SQL.

    Entrada esperada (POST):
      - 'tipo' (string) obligatorio
      - 'descripcion' (string) opcional

    Flujo:
      1) Incluir `config.php` y obtener conexión.
      2) Validar campos POST.
      3) Ejecutar INSERT con prepared statement.
      4) Responder en JSON usando responder().
*/

require_once('config.php');

try {
    $conexion = obtenerConexion();

    // Validación básica de entrada
    if (!isset($_POST['idPedido'])) {
        responder(null, false, "Falta el campo 'id_client_order' en POST", $conexion);
    }

    $idPedido = $_POST['idPedido'];

    if ($tipo === '') {
        responder(null, false, "El campo 'id_client_order' no puede estar vacío", $conexion);
    }

    // Prepared statement para insertar de forma segura
    // $sql = "DELETE FROM client_order WHERE id_client_order = $idpedido;";
    $sql = "DELETE FROM client_order WHERE id_client_order = ?";
    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar la consulta: ' . $conexion->error);
    }

    // Bind y ejecución ('s' -> string)
    $stmt->bind_param('s', $idPedido);
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al ejecutar DELETE: ' . $stmt->error);
    }

    // Éxito
    responder(null, true, 'Se ha borrado el pedido', $conexion);

} catch (mysqli_sql_exception $e) {
    // Responder con información controlada sobre el error de BBDD
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}

?>
