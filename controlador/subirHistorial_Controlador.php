<?php 
session_start();
require_once("../modelo/subirHistorialModelo.php");

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $cedula = trim($_POST["cedula"]);
    $tratamientos = trim($_POST["tratamientos"]);
    $medicamentos = trim($_POST["medicamentos"]);
    $padecimientos = trim($_POST["padecimientos"]);
    $alergias = trim($_POST["alergias"]);
    $antecedentes = trim($_POST["antecedentes"]);

    $paciente = new Paciente();

    if($paciente->subirHistorial($cedula,$padecimientos,$tratamientos,$medicamentos,$alergias,$antecedentes)){
        header("Location: ../vista/administradorSubidaHistorial.html");
    }

}
?>