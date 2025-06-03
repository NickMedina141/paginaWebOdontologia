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

    //Funcion para llamar al modelo de subir Historial Clinico y luego redirigir a la vista de subir Historial
    if($paciente->subirHistorial($cedula,$padecimientos,$tratamientos,$medicamentos,$alergias,$antecedentes)){
        header("Location: ../vista/administradorSubidaHistorial.php");
    }

}
?>