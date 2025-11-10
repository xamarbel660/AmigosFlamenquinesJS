<?php
require_once('config.php');
$conexion = obtenerConexion();

// SQL
$sql = "SELECT * FROM client;";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, true, "Datos recuperados", $conexion);