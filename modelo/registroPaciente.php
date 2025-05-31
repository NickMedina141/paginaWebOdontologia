<?php
require_once '../php/conexion.php';

class Paciente{
    private $conexion;
    // private $id_usuario;
    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    public function existenciaPaciente($cedula){
        $consulta = "SELECT * FROM pacientes WHERE cedula = ?";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bind_param("i", $cedula);
        $stmt->execute();
        $resultado = $stmt->get_result();
        // return $resultado->num_rows>0;
        return true;
    }

    public function registrarUsuario($cedula,$correo,$encriptada,$rol){
        $sql = "INSERT INTO usuarios (cedula,correo,contraseña,rol) VALUES (?,?, ?, ?)";
        $stmt =$this->conexion->prepare($sql);
        $stmt->bind_param("isss",$cedula, $correo,$encriptada, $rol);
        // $this->id_usuario->$this->conexion->insert_id;       
        //  $id_usuario = $this->conexion->insert_id;
        if($stmt->execute()){
            echo "Se ha registrado correctamente al usuario";
            // $this->id_usuario = $this->conexion->insert_id;   
            return true;
        }else{
            return false;
        }

        // return $stmt->execute();
    }

    public function registrarPaciente($cedula,$nombres,$apellidos,$sexo,$edad,$telefono){
        $sql = "INSERT INTO pacientes (cedula,nombres,apellidos,sexo,edad,telefono) VALUES (?, ?, ?, ?, ?, ?)";
        echo "Se ha registrado correctamente al paciente";
        $stmt =$this->conexion->prepare($sql);
        $stmt->bind_param("issisi", $cedula,$nombres, $apellidos,$sexo,$edad,$telefono);
        return $stmt->execute();
    }


}
