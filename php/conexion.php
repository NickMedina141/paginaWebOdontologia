<?php
class Conexion{
    private $host = "localhost"; // Servidor
    private $usuario = "root"; // Usuario de la BD
    private $password = ""; // Contraseña de la BD
    private $bd = "clinicadental"; // Nombre de la base de datos
    private $port = "3306"; // Puerto
    private $conexion;

    public function conectar(){
        $this->conexion = new mysqli($this->host,$this->usuario,$this->password,$this->bd,$this->port);
        if($this->conexion->connect_error){
            die("Error de conexión: " . $this->conexion->connect_error);
        }

        // if($this->conexion){
        //     echo "Lo logre!!!";
        // }else{
        //     echo "Todo es culpa de gabriel!!!";
        // }
        return $this->conexion;
    }
}

