<?php
header('Content-Type: application/json');
require_once '../php/conexion.php';

class Procedimiento
{
    private $conexion;

    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    //Funcion para obtener la informacion del procedimientos del paciente
    function obtenerProcedimientos($idPaciente){
        $sql = "SELECT p.id_cita, p.descripcion, p.id_procedimiento, CONCAT(pac.nombres, ' ', pac.apellidos) AS nombre_paciente FROM procedimientos p
            JOIN pacientes pac ON p.pacientes_cedula = pac.cedula WHERE p.pacientes_cedula = ?";
        $stmt = $this->conexion->prepare($sql);
        if (!$stmt) {
            return ["success" => false, "message" => "Error en consulta: " . $this->conexion->error];
        }

        $stmt->bind_param("s", $idPaciente);
        $stmt->execute();
        $resultado = $stmt->get_result();

        $citas = [];
        while ($row = $resultado->fetch_assoc()) {
            $citas[] = $row;
        }

        $stmt->close();

        return $citas;
    }

    //Funcion para obtener las citas agendadas del paciente
    function obtenerCitas($idPaciente){
        $sql = "SELECT id_cita, servicio, fecha, estado FROM cita WHERE pacientes_cedula = ?";
        $stmt = $this->conexion->prepare($sql);
        if (!$stmt) {
            return ["success" => false, "message" => "Error en consulta: " . $this->conexion->error];
        }

        $stmt->bind_param("s", $idPaciente);
        $stmt->execute();
        $resultado = $stmt->get_result();

        $citas = [];
        while ($filas = $resultado->fetch_assoc()) {
            $citas[] = $filas;
        }

        $stmt->close();
        return $citas;
    }

    //Funcion para agregar un procedimiento a una cita de un paciente
    function agregarProcedimiento($paciente_cedula, $id_cita, $descripcion){
        $sql = "INSERT INTO procedimientos (pacientes_cedula,id_cita,descripcion) VALUES (?, ?, ?)";
        $stmt = $this->conexion->prepare($sql);
        if (!$stmt) {
            return ["success" => false, "message" => "Error en consulta: " . $this->conexion->error];
        }

        $stmt->bind_param("iis", $paciente_cedula, $id_cita, $descripcion);

        if ($stmt->execute()) {
            $stmt->close();
            return ["success" => true, "message" => "Procedimiento agregado exitosamente"];
        } else {
            $stmt->close();
            return ["success" => false, "message" => "Error al agregar procedimiento: " . $this->conexion->error];
        }
    }

    //Funcion para eliminar un procedimiento de un paciente
    function eliminarProcedimiento($id_procedimiento){
        $sql = "DELETE FROM procedimientos WHERE id_procedimiento = ?";
        $stmt = $this->conexion->prepare($sql);
        if (!$stmt) {
            return ["success" => false, "message" => "Error en consulta: " . $this->conexion->error];
        }

        $stmt->bind_param("i", $id_procedimiento);

        if ($stmt->execute()) {
            $stmt->close();
            return ["success" => true, "message" => "Procedimiento eliminado exitosamente"];
        } else {
            $stmt->close();
            return ["success" => false, "message" => "Error al eliminar procedimiento: " . $this->conexion->error];
        }
    }

    //Funcion para editar la información de un procedimiento ya agregado
    function editarProcedimiento($id_procedimiento, $descripcion){
        $sql = "UPDATE procedimientos SET descripcion = ? WHERE id_procedimiento = ?";

        $stmt = $this->conexion->prepare($sql);
        if (!$stmt) {
            return ["success" => false, "message" => "Error en consulta: " . $this->conexion->error];
        }

        $stmt->bind_param("si", $descripcion, $id_procedimiento);

        if ($stmt->execute()) {
            $stmt->close();
            return ["success" => true, "message" => "Procedimiento editado exitosamente"];
        } else {
            $stmt->close();
            return ["success" => false, "message" => "Error al editar procedimiento: " . $this->conexion->error];
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input['accion'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "JSON inválido o falta acción"]);
        exit;
    }

    $procedimiento = new Procedimiento();

    switch ($input['accion']) {
        case 'obtenerProcedimientos':
            if (!isset($input['paciente_cedula'])) {
                http_response_code(400);
                echo json_encode(["succes" => false, "message" => "ID de paciente no proporcionado"]);
                exit;
            }
            $idPaciente = intval($input['paciente_cedula']);
            $respuesta = $procedimiento->obtenerProcedimientos($idPaciente);
            echo json_encode($respuesta);
            exit;
        case 'obtenerCitas':
            if (!isset($input['id_paciente'])) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "ID de paciente no proporcionado"]);
                exit;
            }
            $idPaciente = intval($input['id_paciente']);
            $respuesta = $procedimiento->obtenerCitas($idPaciente);
            echo json_encode($respuesta);
            exit;
        case 'agregarProcedimiento':
            if (!isset($input['id_cita']) || !isset($input['descripcion']) || !isset($input['paciente_cedula'])) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Datos incompletos para agregar procedimiento"]);
                exit;
            }
            $paciente_cedula = intval($input['paciente_cedula']);
            $id_cita = intval($input['id_cita']);
            $descripcion = $input['descripcion'];

            $respuesta = $procedimiento->agregarProcedimiento($paciente_cedula, $id_cita, $descripcion);
            echo json_encode($respuesta);
            exit;
        case "eliminarProcedimiento":
            if (!isset($input['id_procedimiento'])) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "ID de procedimiento no proporcionado"]);
                exit;
            }
            $id_procedimiento = intval($input['id_procedimiento']);
            $respuesta = $procedimiento->eliminarProcedimiento($id_procedimiento);
            echo json_encode($respuesta);
            exit;
        case 'editarProcedimiento':
            if (!isset($input['id_procedimiento']) || !isset($input['descripcion'])) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Datos incompletos para editar procedimiento"]);
                exit;
            }
            $id_procedimiento = intval($input['id_procedimiento']);
            $descripcion = $input['descripcion'];

            $respuesta = $procedimiento->editarProcedimiento($id_procedimiento, $descripcion);
            echo json_encode($respuesta);
            exit;
        default:
            http_response_code(400);
            echo json_encode(["error" => "Acción no válida"]);
    }
}
