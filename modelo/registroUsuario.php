<?php
session_start();
include('../php/conexion.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cedula = intval(trim($_POST['cedula']));
    $nombre = trim($_POST['nombre']);
    $apellidos = trim($_POST['apellidos']);
    // $correo = trim($_POST['email']);
    $sexo = trim($_POST['sexo']);
    $telefono = intval(trim($_POST['telefono']));
    
    // $encriptada = password_hash($password, PASSWORD_DEFAULT);

    // Verificar si el usuario ya existe
    $consulta = "SELECT * FROM pacientes WHERE cedula = ?";
    $stmt = $conexion->prepare($consulta);
    $stmt->bind_param("s", $cedula);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        echo "Ya estás registrado.";
        if ($stmt->execute()) {
            header("Location: ../html/panelPaciente.html");
            exit(); // Asegura que el script se detiene después de la redirección
        } else {
            echo "Error al registrar: " . $conexion->error;
        }
    } else {
        // Insertar usuario
        echo "No esta registrado";
        // $sql = "INSERT INTO usuarios (nombre,apellidos,cedula,correo,sexo,telefono) VALUES (?, ?, ?, ?, ?, ?)";
        //$sql = "INSERT INTO `usuarios`(`usuario`, `password`) VALUES ('$user','$incritada')";
        // $sql = "INSERT INTO usuarios (cedula,nombres,apellidos,sexo,telefono) VALUES (?, ?, ?, ?, ?)";
        $sql = "INSERT INTO pacientes (cedula,nombres,apellidos,sexo,telefono) VALUES (?, ?, ?, ?, ?)";

        $stmt = $conexion->prepare($sql);
        // $stmt->bind_param("ss", $nombre, $apellidos,$cedula,$sexo,$telefono);
        $stmt->bind_param("ss", $cedula,$nombre, $apellidos,$sexo,$telefono);

    }

    $stmt->close();
    $conexion->close();
}

/*
datos para el registro:
nombre
apellidos
cedula
email
sexo
telefono
*/