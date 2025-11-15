<?php
require_once('config.php');
$conexion = obtenerConexion();

$cliente = $_GET['selClient'] ?? null;
$fecha = $_GET['inpDate'] ?? null;
$hora = $_GET['inpTime'] ?? null;
$numClientes = $_GET['numClients'] ?? null;
$reservaNoche = $_GET['selNight'] ?? null;
$mesa = $_GET['selBoard'] ?? null;

try {
    $sql = "SELECT r.*, b.location AS board_location, c.name AS client_name, c.is_vip AS client_is_vip
            FROM reservation r 
            JOIN board b ON r.id_board = b.id_board
            JOIN client c ON r.id_client = c.id_client";
    $params = [];
    $where = [];
    $types = "";

    if ($cliente) {
        $where[] = "r.id_client = ?";
        $params[] = $cliente;
        $types .= "s";
    }
    if ($fecha) {
        $where[] = "DATE(r.reservation_date) = ?";
        $params[] = $fecha;
        $types .= "s";
    }
    if ($hora) {
        $where[] = "TIME(r.reservation_date) = ?";
        $params[] = $hora;
        $types .= "s";
    }
    if ($numClientes) {
        $where[] = "r.number_of_guests = ?";
        $params[] = $numClientes;
        $types .= "i";
    }
    if (isset($reservaNoche) && $reservaNoche !== '') {
        $where[] = "r.is_night_reservation = ?";
        $params[] = $reservaNoche;
        $types .= "i";
    }
    if ($mesa) {
        $where[] = "r.id_board = ?";
        $params[] = $mesa;
        $types .= "s";
    }

    if (!empty($where)) {
        $sql .= " WHERE " . implode(" AND ", $where);
    }

    $sql .= " ORDER BY r.reservation_date ASC";
    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        throw new Exception("Error al preparar la consulta: " . $conexion->error);
    }

    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();

    foreach ($stmt->get_result() as $key => $value) {
        $datos[$key] = $value;
    }

    return responder($datos, true, "OK", $conexion);
} catch (Exception $e) {
    error_log("Error al obtener reservas: " . $e->getMessage());
    return responder( null, false, $e->getMessage(), $conexion);
}