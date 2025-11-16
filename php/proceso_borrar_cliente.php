<?php
require_once("config.php");
$conexion = obtenerConexion();

$idClienteBorrar = $_POST["idClienteBorrar"];
$sql = "DELETE FROM client WHERE id_client = $idClienteBorrar;" ;

$resultado = mysqli_query($conexion, $sql);

responder($datos, true, "Cliente con ID:$idClienteBorrar eliminado.", $conexion);
