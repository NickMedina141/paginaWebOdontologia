<?php
session_start();
require_once('../modelo/verificacionUsuario.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $usuario = new Usuario();
    $rol = $usuario->verificarUsuario($email, $password);

    if ($rol < 0) {
        echo "<script>window.location.href = '../index2.php?Incorrecto';</script>";
    } else {
        $_SESSION['email'] = $email;
        $_SESSION['rol'] = $rol['rol'];
        $_SESSION['cedula'] = $rol['cedula'];

        header("Location: ../index2.php");
        exit();
    }
}
