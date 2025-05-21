<?php 

require_once("../php/conexion.php");

function actualizarDatos($nombre, $apellidos, $cedula, $email, $telefono, $sexo, $edad, $rol){
    $conn = new Conexion();
    $conexion = $conn->conectar();

    $nombre = $conexion->real_escape_string($nombre);
    $apellidos = $conexion->real_escape_string($apellidos);
    $cedula = $conexion->real_escape_string($cedula);
    $email = $conexion->real_escape_string($email);
    $telefono = $conexion->real_escape_string($telefono);
    $sexo = $conexion->real_escape_string($sexo);
    $edad = $conexion->real_escape_string($edad);
    $rol = $conexion->real_escape_string($rol);

    $sql1 = "UPDATE pacientes SET nombres = '$nombre',
        apellidos = '$apellidos',
        telefono = '$telefono',
        sexo = '$sexo',
        edad = '$edad'
        WHERE cedula = '$cedula'";

    $sql2 = "UPDATE usuarios SET correo = '$email', rol = '$rol' WHERE cedula = '$cedula'";

    // var_dump($cedula, $nombre, $apellidos, $email, $telefono, $sexo, $edad, $rol);
    // exit;

    $conexion->query($sql1);
    $conexion->query($sql2);
    // $conexion->close();
    return true;
}
?>