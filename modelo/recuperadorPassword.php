<?php 
require_once("../php/conexion.php");

class Cuenta{
    private $conexion;

    public function __construct(){
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    public function verificarCuenta($correo){
        $consulta = "SELECT * FROM usuarios where correo = ?";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bind_param("s",$correo);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if($resultado->num_rows === 1){
            echo "LLEGO, BIEN HECHO";
            return true;
        }
        else{
            echo"ERROR";
            return false;
        }

    }


}
?>