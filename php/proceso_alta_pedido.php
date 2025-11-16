<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$pedido = json_decode($_POST['pedido']);

$platosDataJSON = $_POST['platosDelPedido'];
$platosData = json_decode($platosDataJSON, true); //true para obtener array asociativo

$sql = "INSERT INTO client_order VALUES(null, '$pedido->client_order_date' , $pedido->total_price, $pedido->is_completed, '$pedido->comment', $pedido->id_client); ";

mysqli_query($conexion, $sql);

// Obtenemos el ID que acabamos de insertar.
$id_client_order = mysqli_insert_id($conexion);

foreach($platosData as $plato){
    $idPlato = $plato['idPlato'];
    $cantidad = $plato['cantidad'];
    $nota= $plato['nota'];
    $sql2 = "INSERT INTO order_dish(`id_client_order`, `id_plate`, `quantity`, `notes`) 
                    VALUES (" . $id_client_order . ", ".$idPlato.", ".$cantidad.", '".$nota."');";
    // Ejecutar consulta
    $resultado = mysqli_query($conexion, $sql2);
}

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$ok,$mensaje,$conexion)
    responder(null, true, "Se ha dado de alta el Pedido", $conexion);
}
?>