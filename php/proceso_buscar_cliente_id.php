<?php
require_once("config.php");
$conexion = obtenerConexion();

$idClienteBuscar = $_GET["idClienteBuscar"];
$sql = "SELECT * FROM client INNER JOIN category ON client.id_category = category.id_category;" ;

if($idClienteBuscar != ""){
    $sql = "SELECT * FROM client INNER JOIN category ON client.id_category = category.id_category WHERE id_client = $idClienteBuscar;" ;
}

$resultado = mysqli_query($conexion, $sql);
$datos = [];
while($fila = mysqli_fetch_assoc($resultado)){
    $datos[] = $fila;
}

if(count($datos) > 0){
    responder($datos, true, "Datos recuperados", $conexion);
}else{
    responder($datos, false, "No se ha encontrado ningún cliente con ese ID", $conexion);
}