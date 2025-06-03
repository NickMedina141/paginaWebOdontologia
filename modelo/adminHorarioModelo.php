<?php 
header("Content-Type: application/json");
require_once("../php/conexion.php");

class Horario{
    private $conexion;

    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }
    
    //Funcion para subir un horario 
    public function subirHorario($datos){
        $dia = $datos["dia_semana"] ?? null;
        $hora_inicio = $datos["hora_inicio"] ?? null;
        $hora_fin = $datos["hora_fin"] ?? null;
        $estado = $datos["estado"] ?? null;
        $fecha = $datos["fecha"] ?? null;

        if(!$dia || $estado === null || !$fecha){
        return ["success"=> false, "message"=>"Datos incompletos: falta dia_semana, estado o fecha"];
        }

        if(!$dia || !$estado === null || ($estado === 0 && (!$hora_inicio || !$hora_fin))){
            return ["success"=> false, "message"=>"Datos incompletos"];
        }

        if($estado !== 0){
            if(!$hora_inicio){
                $hora_inicio = "00:00:00";
            }
            if(!$hora_fin){
                $hora_fin = "00:00:00";
            }
        }
        
        if($estado === 0){
            $validar = "SELECT COUNT(*) as count FROM horarios Where fecha = ? AND
            estado= 0 AND NOT (hora_fin <= ? OR hora_inicio >= ?)";
            
            $stmtValidar = $this->conexion->prepare($validar);
            if(!$stmtValidar){
                return ["success"=> false, "message"=> "Error en el preparador de validación: ". $this->conexion->error];

            }

            $stmtValidar->bind_param("sss",$fecha,$hora_inicio,$hora_fin);
            $stmtValidar->execute();
            $resultado = $stmtValidar->get_result();
            $row = $resultado->fetch_assoc();

            if($row["count"] > 0){
                return ["success"=> false, "message"=> "Existe un horario en conflicto con este horario "];

            }
        }

        $sql = "INSERT INTO horarios (dia_semana, hora_inicio, hora_fin, estado, fecha) VALUES (?,?,?,?,?)";
        $stmt =$this->conexion->prepare($sql);
        if(!$stmt){
            return ["success"=> false, "message"=> "Error en el preparador". $this->conexion->error];
        }

        $stmt->bind_param("sssis", $dia,$hora_inicio,$hora_fin,$estado,$fecha);
        if($stmt->execute()){
            return ["success"=> true];
        }
        else{
            return ["success"=> false, "message"=> "Error al ejecutar". $this->conexion->error];
            
        }
    }
}

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $input = json_decode(file_get_contents("php://input"),true);
    if(!$input){
        echo json_encode(["success"=> false, "message"=>"No se recibió JSON valido"]);
        exit;
    }
    $horario = new Horario();
    $resultado = $horario->subirHorario($input);
    echo json_encode($resultado);
}
?>