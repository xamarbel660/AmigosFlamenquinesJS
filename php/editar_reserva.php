<?php
require_once("config.php");
$conexion = obtenerConexion();

$reserva = json_decode($_POST['reserva'], true);
$idReserva = $reserva["id_reservation"];
$fechaHora = date('Y-m-d H:i:s', strtotime($reserva["reservation_date"]));
$hora = (int) date('H', strtotime($fechaHora));
$esNoche = ($hora >= 20) ? 1 : 0;
$numInvitados = $reserva["number_of_guests"];
$comentario = $reserva["comment"];
$idBoard = $reserva["id_board"];
$idCliente = $reserva["id_client"];

try {
    if(!$idReserva) {
        throw new Exception("Error: idReserva no pasado como parámetro.");
    }

    if (!DateTime::createFromFormat('Y-m-d H:i:s', $fechaHora)) {
        throw new Exception("Formato de fecha inválido. Usa 'Y-m-d H:i:s'");
    }

    if (!is_numeric($numInvitados) || $numInvitados <= 0) {
        throw new Exception("Número de invitados inválido.");
    }

    $sql = "UPDATE reservation SET reservation_date = ?, 
            number_of_guests = ?, 
            is_night_reservation = ?, 
            comment = ?, 
            id_board = ?, 
            id_client = ? 
            WHERE id_reservation = ?";

    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        throw new Exception("Error al preparar la consulta: " . $conexion->error);
    }

    $stmt->bind_param("siisiii", $fechaHora, $numInvitados, $esNoche, $comentario, $idBoard, $idCliente, $idReserva);
    $stmt->execute();

    if ($stmt->affected_rows >= 0) {
        return responder(null, true, "Reserva con ID ".$idReserva." editada correctamente.", $conexion);
    } else {
        throw new Exception("No se pudo editar la reserva.");
    }
} catch (Exception $e) {
    error_log("Error al editar la reserva: " . $e->getMessage());
    return responder(null, false, $e->getMessage(), $conexion);
}