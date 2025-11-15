<?php
require_once("config.php");
$conexion = obtenerConexion();

$idReserva = $_POST['id_reserva'];

try {
    if (!is_numeric($idReserva)) {
        throw new Exception("ID de reserva inválido.");
    }

    $sql = "DELETE FROM reservation WHERE id_reservation = ?";

    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        throw new Exception("Error al preparar la consulta: " . $conexion->error);
    }

    $stmt->bind_param("i", $idReserva);
    $stmt->execute();

    if ($stmt->affected_rows < 1) {
        throw new Exception("No se pudo borrar la reserva.");
    }
    
    return responder(null, true, "Reserva borrada correctamente.", $conexion);
} catch (Exception $e) {
    error_log("Error al borrar la reserva: " . $e->getMessage());
    return responder(null, false, $e->getMessage(), $conexion);
}