<?php
header('Content-Type: application/json');
include_once("../php/conexion.php");

class Gestion
{
    private $conexion;
    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    //Obtenemos la informacion del paciente mediante su cedula
    public function obtenerPacientePorCedula($id)
    {
        $id = $this->conexion->real_escape_string($id);

        $sql = "SELECT p.*, u.correo AS email FROM pacientes p LEFT JOIN usuarios u ON p.cedula = u.cedula WHERE p.cedula = '$id'";
        $resultado = $this->conexion->query($sql);
        if ($resultado) {
            $fila = $resultado->fetch_assoc();
            if ($fila) {
                return [$fila];
            } else {
                return [];
            }
        } else {
            return ["error" => true, "message" => "Error en la consulta SQL"];
        }
    }

    //Actualizamos la informacion del paciente mediante su Cedula
    public function actualizarPaciente($data)
    {
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

        if ($success1 && $success2) {
            return ["success" => true, "message" => "Paciente y usuario actualizados correctamente"];
        } else {
            return ["error" => true, "message" => "Error al actualizar la información"];
        }
    }
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

// Obtener los datos del cuerpo si es un GET
if (isset($_GET["id"])) {
    $gestion = new Gestion();
    $resultado = $gestion->obtenerPacientePorCedula($_GET["id"]);
    echo json_encode($resultado);
    exit;
} else {
    echo json_encode(["Error" => true, "message" => "ID no proporcionado"]);
    exit;
}
