<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$pedido = json_decode($_POST['pedido']);

$platosDataJSON = $_POST['platosDelPedido'];
$platosData = json_decode($platosDataJSON, true); //true para obtener array asociativo
// UPDATE `client_order` SET `client_order_date` = '$pedido->client_order_date', `total_price` = '$pedido->total_price', `is_completed` = '$pedido->is_completed', `comment` = '$pedido->comment', `id_client` = '$pedido->id_client' WHERE `client_order`.`id_client_order` = $pedido->id_client_order;
$sql = "UPDATE `client_order` SET `client_order_date` = '$pedido->client_order_date', `total_price` = '$pedido->total_price', `is_completed` = '$pedido->is_completed', `comment` = '$pedido->comment', `id_client` = '$pedido->id_client' WHERE `client_order`.`id_client_order` = $pedido->id_client_order; ";

mysqli_query($conexion, $sql);

foreach($platosData as $plato){
    $idPlato = $plato['idPlato'];
    $cantidad = $plato['cantidad'];
    $nota= $plato['nota'];
    $sql2 = "INSERT INTO order_dish(`id_client_order`, `id_plate`, `quantity`, `notes`) 
                    VALUES (" . $pedido->id_client_order . ", ".$idPlato.", ".$cantidad.", '".$nota."');";
    // Ejecutar consulta
    $resultado = mysqli_query($conexion, $sql2);
}


if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$ok,$mensaje,$conexion)
    responder(null, true, "Se ha modificado el Pedido", $conexion);
}
?>