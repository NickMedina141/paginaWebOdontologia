<?php 
session_start();
include_once("../modelo/historialClinicoModelo.php");

if($_SERVER["REQUEST_METHOD"] === "POST"){

    $cedula = intval(trim($_POST["cedula"]));
    $tratamientos = trim($_POST["tratamientos"]);
    $medicamentos = trim($_POST["medicamentos"]);
    $padecimientos = trim($_POST["padecimientos"]);
    $alergias = trim($_POST["alergias"]);
    $antecedentes = trim($_POST["antecedentes"]);

    $historial = new Historial();

    if($historial->actualizarDatosPaciente($cedula,$tratamientos,$medicamentos,$padecimientos,$alergias,$antecedentes)){
        header("Location: ../vista/adminHistorialClinico.php?cedula=$cedula");
        exit;
    }

}
?>