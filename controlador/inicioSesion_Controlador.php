<?php
session_start();
require_once('../modelo/verificacionUsuario.php');


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $usuario = new Usuario();

    if($usuario->verificarUsuario($email,$password)){
        $_SESSION['email'] = $email;
        // header("Location: ../vista/panelPaciente.html");
        header("Location: ../index2.php");

        exit();
    }else{
        echo '<script>alert("¡El usuario no existe o la contraseña es incorrecta!");</script>';

    }
}
?>
