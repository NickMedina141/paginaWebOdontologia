<?php
require_once '../php/conexion.php';

class Usuario{
    private $conexion;

    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    //Funcion para verificar si existe un usuario en el sistema o no y si existe traerse el rol
    public function verificarUsuario($correo,$password){
        $consulta = "SELECT * FROM usuarios WHERE correo = ?";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if($resultado->num_rows === 1){
            $fila = $resultado->fetch_assoc();
            if(password_verify($password,$fila["contraseña"])){
                return [
                'cedula' => $fila['cedula'],
                'rol' => $fila['rol']
            ];
            } else{
                return -1;
            }
        };
        return false;
    }
}
?>
