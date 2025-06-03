<?php
require_once '../php/conexion.php';

class Paciente
{
    private $conexion;
    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    public function existenciaPaciente($cedula)
    {
        $consulta = "SELECT * FROM pacientes WHERE cedula = ?";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bind_param("i", $cedula);
        $stmt->execute();
        $resultado = $stmt->get_result();
        return true;
    }

    //Funcion para registrar al usuario al sistema
    public function registrarUsuario($cedula, $correo, $encriptada, $rol)
    {
        $sql = "INSERT INTO usuarios (cedula,correo,contraseña,rol) VALUES (?,?, ?, ?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("isss", $cedula, $correo, $encriptada, $rol);

        if ($stmt->execute()) {
            echo "Se ha registrado correctamente al usuario";
            return true;
        } else {
            return false;
        }
    }

    //Funcion para regisrar un paciente al sistema
    public function registrarPaciente($cedula, $nombres, $apellidos, $sexo, $edad, $telefono)
    {
        $sql = "INSERT INTO pacientes (cedula,nombres,apellidos,sexo,edad,telefono) VALUES (?, ?, ?, ?, ?, ?)";
        echo "Se ha registrado correctamente al paciente";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("issisi", $cedula, $nombres, $apellidos, $sexo, $edad, $telefono);
        return $stmt->execute();
    }
}
