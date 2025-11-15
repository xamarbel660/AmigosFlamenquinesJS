<?php
require_once('config.php');
$conexion = obtenerConexion();

try {
    $mesas = [];
    $resultMesas = $conexion->query("SELECT id_board, location FROM board ORDER BY location ASC");
    if ($resultMesas) {
        while ($row = $resultMesas->fetch_assoc()) {
            $mesas[] = $row;
        }
    }
    return responder($mesas, true, "OK", $conexion);
} catch (Exception $e) {
    error_log("Error al obtener reservas: " . $e->getMessage());
    return responder( null, false, $e->getMessage(), $conexion);
}