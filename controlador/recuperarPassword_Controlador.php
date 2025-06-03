<?php 
session_start();
require_once("../modelo/recuperadorPassword.php");


if($_SERVER["REQUEST_METHOD"]== "POST"){
    $correo = trim($_POST["email"]);

    $cuenta = new Cuenta();
    if($cuenta->verificarCuenta($correo)){

    }
}

function enviarCorreo($correo){

}