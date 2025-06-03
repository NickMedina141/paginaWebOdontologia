<?php 
session_start();
require_once("../modelo/serviciosModelo.php");


if($_SERVER["REQUEST_METHOD"] === "POST"){

    $nombre = trim($_POST["nombre"]);
    $descripcion = trim($_POST["descripcion"]);
    $costo = floatval($_POST["costo"]);

    $servicios = new Servicios();
    if($servicios->cargarServicios($nombre,$descripcion,$costo)){
        header("Location: ../vista/adminServicios.php");
    }
}

?>