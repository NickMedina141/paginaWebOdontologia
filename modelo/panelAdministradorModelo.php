<?php 
header("Content-Type: application/json");
include_once("../php/conexion.php");

class Administrador{
    private $conexion;
    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }


function obtenerInformacionAdministrador(){

    $sql = "SELECT nombre, apellido, cedula, telefono, rol FROM odontologos WHERE rol = 'administrador' LIMIT 1";
    $resultado = $this->conexion->query($sql);

    if($resultado && $resultado->num_rows > 0){
        $admin = $resultado->fetch_assoc();
    }else{
        $admin = ["error" => "No se encontró al administrador"];
    }


    $this->conexion->close();
    return $admin;
    }


function obtenerCitasRecientes(){
    $sql = "SELECT servicio,fecha,hora_inicio,estado FROM cita 
    ORDER BY fecha DESC, hora_inicio DESC LIMIT 4";
    
    $resultado = $this->conexion->query($sql);
    if (!$resultado) {
        return ["error" => "Error en la consulta: " . $this->conexion->error];
    }

    $citas = [];
    if($resultado && $resultado->num_rows > 0){
        while ($fila = $resultado->fetch_assoc()) {
            $fila["estado"] = $fila["estado"] == 1 ? "Completada": "Pendiente";
            $citas[] = $fila;
        }
    }

    return $citas;
}




}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input['accion'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "JSON inválido o falta acción"]);
        exit;
    }

    $administrador = new Administrador();

    switch ($input['accion']) {
        case 'obtenerInformacionAdministrador':
            $respuesta = $administrador->obtenerInformacionAdministrador();
            echo json_encode($respuesta);
            exit;
        case 'obtenerCitasRecientes':
            $respuesta = $administrador->obtenerCitasRecientes();
            echo json_encode($respuesta);
            exit;
        default:
            http_response_code(400);
            echo json_encode(["error" => "Acción no válida"]);
    }
}



// class Administrador{
//     private $conexion;

//     public function __construct()
//     {
//         $db = new Conexion();
//         $this->conexion = $db->conectar();
//     }

//     public function obtenerPacientesSinHistorial(){
//         $sql = "SELECT p.cedula, p.nombres, p.apellidos, p.sexo FROM pacientes p LEFT JOIN historial h
//         ON p.cedula = h.paciente_cedula where h.paciente_cedula IS NULL"; 
        
//         $resultado = $this->conexion->query($sql);
//         if(!$resultado){
//             die("Error en la consulta". $this->conexion->error);
//         }
//         $pacientes = [];
//         while($fila = $resultado->fetch_assoc()){
//             $fila["estado"] = "Sin subir";
//             $pacientes[] = $fila;
//         }
//         return $pacientes;
//     }

//     public function subirHistorial($cedula,$padecimientos,$tratamientos,$medicamentos,$alergias,$antecedentes){
//         $sql = "INSERT INTO historial (paciente_cedula,padecimientos,tratamientos,medicamentos,alergias,antecedentes) values (?,?,?,?,?,?)";
//         echo "Se ha registrado correctamente el historial del paciente";
//         $stmt = $this->conexion->prepare($sql);
//         $stmt->bind_param("isssss",$cedula,$padecimientos,$tratamientos,$medicamentos,$alergias,$antecedentes);
//         return $stmt->execute();
//     }
// }

// header("Content-Type: application/json");

// $paciente = new Paciente();
// echo json_encode($paciente->obtenerPacientesSinHistorial());

?>