<?php
$host = "localhost"; // Servidor
$usuario = "root"; // Usuario de la BD
$password = ""; // Contraseña de la BD
$bd = "dianaodontologia"; // Nombre de la base de datos
$port = "3306"; // Puerto

$conexion = new mysqli($host, $usuario, $password, $bd, $port);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
if($conexion){
    echo "Lo logre!!!";
}else{
    echo("Todo es culpa de gabriel");
}

// $bbdd = "localhost"; // base de datos
// $password = ""; // contraseña
// $port = "3306"; // puerto
// $user = "root"; // usuario
// $userBB = "database"; //tabla 


// $conexion = new mysqli($bbdd,$user,$password,$userBB,$port);

// if($conexion){
//     echo "Lo logre!!!";
// } else{
//     echo "Todo culpa de ilder";
// }
