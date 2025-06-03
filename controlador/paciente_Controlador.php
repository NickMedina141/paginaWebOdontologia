<?php
session_start();
require_once('../modelo/registroPaciente.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cedula = intval(trim($_POST['cedula']));
    $nombres = trim($_POST['nombre']);
    $apellidos = trim($_POST['apellidos']);
    $correo = trim($_POST['email']);
    //manera 1
    $sexo = trim($_POST['sexo']);
    if($sexo == "Masculino" || $sexo == "masculino"){
        $sexo = true;
    }
    else if ($sexo == "Femenino" || $sexo == "femenino"){
        $sexo = false;
    }
    //manera 2
    $sexo = ($sexo == "Masculino" || $sexo == "masculino") ? 1: 0;
    $telefono = intval(trim($_POST['telefono']));
    $edad = str_replace("T"," ",$_POST["date"]); 
    $password = trim($_POST['password']);
    $encriptada = password_hash($password, PASSWORD_DEFAULT);

    $paciente = new Paciente();

    if($paciente->existenciaPaciente($cedula)){
        $_SESSION["cedula"] = $cedula;
        echo "<script>window.location.href = '../vista/panelPaciente.php?cedula={$cedula}';</script>";
        exit();
    }else{
        
        if($paciente->registrarPaciente($cedula,$nombres, $apellidos,$sexo,$edad,$telefono)){
            if($paciente->registrarUsuario($cedula,$correo,$encriptada,"paciente")){
                header("Location: ../index2.php");
                exit();
                } else{
                echo"Error";
                exit();
                } 
            }
            
        else{
            echo"Error";
            exit();
        }
    }
}
