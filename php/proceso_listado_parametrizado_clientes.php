<?php
include_once("config.php");

$conexion = obtenerConexion();
$clienteParam = json_decode($_GET["cliente"], true);

$sql = "SELECT * FROM client INNER JOIN category ON client.id_category = category.id_category";
$nombreCliente = trim($clienteParam["name"] ?? "");
$edadCliente = trim($clienteParam["age"]  ?? "");
$fechaAnyadido = trim($clienteParam["date_created_account"] ?? "");
$esVip = trim($clienteParam["is_vip"]  ?? "-1");
$idCategory = trim($clienteParam["id_category"] ?? "-1");


$condiciones = [];

if ($nombreCliente !== "") {
    $condiciones[] = "name LIKE '%$nombreCliente%'";
}
if ($edadCliente !== "") {
    $condiciones[] = "age = " . intval($edadCliente);
}
if ($fechaAnyadido !== "") {
    $condiciones[] = "date_created_account = '$fechaAnyadido'";
}
if ($esVip !== "-1") {
    $condiciones[] = "is_vip = " . intval($esVip);
}

if ($idCategory !== "-1") {
    $condiciones[] = "client.id_category = " . intval($idCategory);
}

if (!empty($condiciones)) {
    $sql .= " WHERE " . implode(" AND ", $condiciones);
}

$sql .= ";";

    
$resultado = mysqli_query($conexion, $sql);

$datos = [];
while($fila = mysqli_fetch_assoc($resultado)){
    $datos[] = $fila;
}

if(count($datos) > 0){
    responder($datos, true, "Datos recuperados", $conexion);
}else{
    responder($datos, false, "No se ha encontrado ningún cliente con esos parametros", $conexion);
}