<?php
require_once("config.php");
$conexion = obtenerConexion();

$clienteCambios = json_decode($_POST["cliente"], true);
$sql = "UPDATE client 
SET name = '".$clienteCambios["name"]."',
age = ".$clienteCambios["age"].",
id_category = ".$clienteCambios["id_category"].",
is_vip = ".$clienteCambios["is_vip"]."
WHERE id_client = ".$clienteCambios["id_client"].";" ;
$resultado = mysqli_query($conexion, $sql);

responder($datos, true, "Cliente con ID:".$clienteCambios["id_client"]." editado.", $conexion);
