<?php
require_once("config.php");
$conexion = obtenerConexion();

$reserva = json_decode($_POST['reserva'], true);
$fechaHora = date('Y-m-d H:i:s', strtotime($reserva["reservation_date"]));
$hora = (int) date('H', strtotime($fechaHora));
$esNoche = ($hora >= 20) ? 1 : 0;
$numInvitados = $reserva["number_of_guests"];
$comentario = $reserva["comment"];
$idBoard = $reserva["id_board"];
$idCliente = $reserva["id_client"];

try {
    if (!DateTime::createFromFormat('Y-m-d H:i:s', $fechaHora)) {
        throw new Exception("Formato de fecha inválido. Usa 'Y-m-d H:i:s'");
    }

    if (!is_numeric($numInvitados) || $numInvitados <= 0) {
        throw new Exception("Número de invitados inválido.");
    }

    $sql = "INSERT INTO reservation (reservation_date, number_of_guests, is_night_reservation, comment, id_board, id_client)
            VALUES (?, ?, ?, ?, ?, ?)";

    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        throw new Exception("Error al preparar la consulta: " . $conexion->error);
    }

    $stmt->bind_param("siisii", $fechaHora, $numInvitados, $esNoche, $comentario, $idBoard, $idCliente);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        return responder(null, true, "Reserva creada con ID: ".$conexion->insert_id, $conexion);
    } else {
        throw new Exception("No se pudo insertar la reserva.");
    }
} catch (Exception $e) {
    error_log("Error al crear reserva: " . $e->getMessage());
    return responder(null, false, $e->getMessage(), $conexion);
}