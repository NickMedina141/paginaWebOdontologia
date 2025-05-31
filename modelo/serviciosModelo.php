<?php 
include_once("../php/conexion.php");
header("Content-Type: application/json");
class Servicios{
    private $conexion;

    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    public function obtenerServicios(){
        $sql = "SELECT id_servicios, nombre, descripcion, costo FROM servicios";
        $resultado = $this->conexion->query($sql);

        if(!$resultado){
            http_response_code(400);
            echo json_encode(["error"=> "Error en la consulta". $this->conexion->error]);
            exit;
        }

        $servicios = [];
        while($fila = $resultado->fetch_assoc()){
            $servicios[] = $fila;
        }
        return $servicios;
    }

    public function cargarServicios($nombre,$descripcion,$costo){
        $sql = "INSERT INTO servicios (nombre, descripcion, costo) VALUES (?,?,?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("ssi",$nombre,$descripcion,$costo);

        if($stmt->execute()){
            echo "Se ha registrado correctamente al servicio";
            return true;
        }
        else{
            return false;
        }
    }

    public function eliminarServicios($id){
        $sql = "DELETE FROM servicios WHERE id_servicios = ?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("i",$id);
        if($stmt->execute()){
            return ["success"=> true, "message" => "Servicio  eliminado correctamente"];
        }
        else{
            return ["success"=> false, "message" => "Error al eliminar el servicio" .$stmt->error];

        }
    }

    public function actualizacionServicios($id,$nombre,$descripcion,$costo){
        // $sql = "INSERT INTO servicios (nombre, descripcion, costo) VALUES (?,?,?)";
        $sql = "UPDATE servicios SET nombre=?, descripcion=?, costo=? WHERE id_servicios=?";

        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("ssii",$nombre,$descripcion,$costo,$id);

        if($stmt->execute()){
            return ["success"=> true, "message" => "Servicio actualizado correctamente"];
        }
        else{
            return ["success"=> false, "message" => "Error al actualizar el servicio" .$stmt->error];

        }
    }
}

$servicio = new Servicios(); 

if($_SERVER["REQUEST_METHOD"]==="POST"){
    $datos = json_decode(file_get_contents("php://input"),true);

    if(isset($datos["id"], $datos["nombre"],$datos["descripcion"],$datos["costo"],)){
        $id = (int)$datos["id"];
        $nombre = $datos["nombre"];
        $descripcion = $datos["descripcion"];
        $costo = (float)$datos["costo"];

        echo json_encode($servicio->actualizacionServicios($id,$nombre,$descripcion,$costo));
    }else{
        echo json_encode(["success"=> true, "message" => "Datos incompletos"]);

    }
    // if(isset($datos["nombre"],$datos["descripcion"],$datos["costo"])){
        
    //     $nombre = $datos["nombre"];
    //     $descripcion = $datos["descripcion"];
    //     $costo = (float)$datos["costo"];

    //     if(isset($datos["id"])){
    //         $id = (int)$datos["id"];
    //         echo json_encode($servicio->actualizacionServicios($id,$nombre,$descripcion,$costo));
    //     }else{
    //         echo json_encode($servicio->cargarServicios($nombre,$descripcion,$costo));
    //     }
    // }else{
    //     echo json_encode(["success"=> false, "message" => "Datos incompletos"]);

    // }
    // exit;
}


if($_SERVER["REQUEST_METHOD"]==="DELETE"){
    $datos = json_decode(file_get_contents("php://input"),true);

    if(isset($datos["id"])){
        $id = (int)$datos["id"];
        echo json_encode($servicio->eliminarServicios($id));
    }else{
        echo json_encode(["success"=> true, "message" => "ID no proporcionado para eliminar"]);

    }
    exit;
}

if($_SERVER["REQUEST_METHOD"]=== "GET"){
    echo json_encode($servicio->obtenerServicios());
    exit;
}


?>