<?php
header('Content-Type: application/json');
include_once("../php/conexion.php");

class Gestion {
    private $conexion;
    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    public function obtenerPacientePorCedula($id){
        $id = $this->conexion->real_escape_string($id);

        $sql = "SELECT p.*, u.correo AS email FROM pacientes p LEFT JOIN usuarios u ON p.cedula = u.cedula WHERE p.cedula = '$id'";
        $resultado = $this->conexion->query($sql);
        if($resultado){
            $fila = $resultado->fetch_assoc();
            if($fila){
                return [$fila];
            }else{
                return [];
            }
        } else{
            return ["error" =>true, "message" => "Error en la consulta SQL"];
        }
    }

    public function actualizarPaciente($data){
        $stmt1 = $this->conexion->prepare("UPDATE pacientes SET nombres=?, apellidos=?,cedula=?, telefono=?, sexo=?, edad=? WHERE cedula=?");
        $stmt1->bind_param(
            "ssssisi",
            $data->nombre,
            $data->apellidos,
            $data->cedula,
            $data->telefono,
            $data->sexo,
            $data->edad,
            $data->cedula_original
        );
        $success1 = $stmt1->execute();

        $stmt2 = $this->conexion->prepare("UPDATE usuarios SET correo=?, rol=?, cedula=? WHERE cedula=?");
        $stmt2->bind_param(
            "sssi",
            $data->email,
            $data->rol,
            $data->cedula,
            $data->cedula_original
        );
        $success2 = $stmt2->execute();

        if($success1 && $success2){
            return ["success"=>true, "message"=> "Paciente y usuario actualizados correctamente"];
        }else{
            return ["error"=>true, "message"=> "Error al actualizar la información"];

        }
    }

//     public function actualizarPaciente($data){
//     // Preparar consulta para pacientes
//     $stmt1 = $this->conexion->prepare("UPDATE pacientes SET nombres=?, apellidos=?, cedula=?, telefono=?, sexo=?, edad=? WHERE cedula=?");
//     $stmt1->bind_param(
//         "ssssisi",
//         $data->nombre,       // s
//         $data->apellidos,    // s
//         $data->cedula,       // s (cedula nueva si cambia)
//         $data->telefono,     // s
//         $data->sexo,         // i
//         $data->edad,         // i
//         $data->cedula        // s (cedula actual)
//     );
//     $success1 = $stmt1->execute();

//     // Preparar consulta para usuarios
//     $stmt2 = $this->conexion->prepare("UPDATE usuarios SET correo=?, rol=? WHERE cedula=?");
//     $stmt2->bind_param(
//         "ssi",
//         $data->email,        // s
//         $data->rol,          // s
//         $data->cedula        // i
//     );
//     $success2 = $stmt2->execute();

//     if($success1 && $success2){
//         return ["success"=>true, "message"=> "Paciente y usuario actualizados correctamente"];
//     } else {
//         return ["error"=>true, "message"=> "Error al actualizar la información"];
//     }
// }

}

// Obtener datos del cuerpo si es POST
$json = file_get_contents("php://input");
$data = json_decode($json);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $data) {
    $gestion = new Gestion();
    $resultado = $gestion->actualizarPaciente($data);
    echo json_encode($resultado);
    exit;
}


if (isset($_GET["id"])){
    $gestion = new Gestion();
    $resultado = $gestion->obtenerPacientePorCedula($_GET["id"]);
    echo json_encode($resultado);
    exit;
} else{
    echo json_encode(["Error" =>true, "message" => "ID no proporcionado"]);
    exit;
}

// header('Content-Type: application/json');
// include_once("../php/conexion.php");

// class Gestion {
//     private $conexion;

//     public function __construct() {
//         $conn = new Conexion();
//         $this->conexion = $conn->conectar();
//     }

//     public function obtenerPacientePorCedula($id) {
//         $id = $this->conexion->real_escape_string($id);

//         $sql = "SELECT p.*, u.correo AS email  
//                 FROM pacientes p 
//                 LEFT JOIN usuarios u ON p.cedula = u.cedula 
//                 WHERE p.cedula = '$id'";

//         $resultado = $this->conexion->query($sql);

//         if ($resultado) {
//             $fila = $resultado->fetch_assoc();
//             if ($fila) {
//                 return [$fila]; // Retorna array con un solo objeto, como antes
//             } else {
//                 return []; // No se encontraron resultados
//             }
//         } else {
//             return ['error' => true, 'message' => 'Error en la consulta SQL'];
//         }
//     }
// }

// Controlador interno del mismo archivo
// if (isset($_GET['id'])) {
//     $gestion = new Gestion();
//     $resultado = $gestion->obtenerPacientePorCedula($_GET['id']);
//     echo json_encode($resultado);
//     exit;
// } else {
//     echo json_encode(['error' => true, 'message' => 'ID no proporcionado']);
//     exit;
// }

// header('Content-Type: application/json'); // ¡Debe ir aquí arriba!
// include("conexion.php");
// // Verificar si el parámetro 'id' está presente en la URL
// if (!isset($_GET['id'])) {
//     echo json_encode(['error' => true, 'message' => 'ID no proporcionado']);
//     exit;
// }


// $conn = new Conexion();
// $conexion = $conn->conectar();

// $id = $_GET['id']; // Obtenemos el ID desde la URL

// // Aseguramos que el ID esté correctamente escapado para prevenir inyección SQL
// $id = $conexion->real_escape_string($id);

// // $sql = "SELECT * FROM `pacientes` WHERE `cedula` = '$id'";
// $sql = "SELECT p.*, u.correo AS email  FROM pacientes p LEFT JOIN usuarios u ON p.cedula = u.cedula where p.cedula = '$id'";
// $resultado = $conexion->query($sql);

// // Verificamos si la consulta fue exitosa
// if ($resultado) {
//     $fila = $resultado->fetch_assoc(); // Obtener la primera fila

//     if ($fila) {
//         echo json_encode([$fila]); // Devuelve directamente la fila encontrada
//     } else {
//         echo json_encode([]); // No se encontraron resultados
//     }
// } else {
//     echo json_encode(['error' => true, 'message' => 'Error en la consulta SQL']);
// }

// $conexion->close();
// exit;
