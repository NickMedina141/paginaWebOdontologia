<?php 

session_start();
require_once("../modelo/gestionUsuarioActualizarModelo.php");
if($_SERVER["REQUEST_METHOD"]=== "POST"){
    $nombre = trim($_POST["hiddenNombre"]);
    $apellidos = trim($_POST["hiddenApellidos"]);
    $cedula = intval(trim($_POST["hiddenCedula"]));
    $email= trim($_POST["hiddenEmail"]);
    $telefono = intval(trim($_POST["hiddenTelefono"]));
    $sexo = trim($_POST["hiddenSexo"]);
    if($sexo == "Masculino"){
        $sexo = true;
    }else if($sexo == "Femenino"){
        $sexo = false;
    }
    $edad = str_replace("T"," ",$_POST["hiddenEdad"]); 
    $rol = trim($_POST["hiddenRol"]);
    if(actualizarDatos($nombre,$apellidos,$cedula,$email,$telefono,$sexo,$edad,$rol)){
        header("Location: ../vista/gestionUsuario.html");
    };
}

?>