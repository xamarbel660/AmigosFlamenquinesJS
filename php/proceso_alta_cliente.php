<?php
require_once("config.php");
$conexion = obtenerConexion();

// Recuperar parámetros
$cliente = json_decode($_POST['cliente'], true);

// No validamos, suponemos que la entrada de datos es correcta

// Definir insert
// $sql = "INSERT INTO client (date_created_account, age, is_vip, name)
//         VALUES ('".$cliente['date_created_account']."', ".$cliente['age'].", ".$cliente['is_vip'].", '".$cliente['name']."')";

//por ahora pongo la categoria en el id 1, pero hay que cambiar el formulario para que elija categoria
$sql = "INSERT INTO client
        VALUES (null,'".$cliente['date_created_account']."', ".$cliente['age'].", ".$cliente['is_vip'].", '".$cliente['name']."',".$cliente['id_category'].")";

// Ejecutar consulta
$resultado = mysqli_query($conexion, $sql);

// Verificar si hay error y almacenar mensaje
if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta al cliente", $conexion); 
}
?>