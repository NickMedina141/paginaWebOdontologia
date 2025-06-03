<?php
header("Content-Type: application/json");
include_once("../php/conexion.php");

class Paciente
{
    private $conexion;
    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }


    //Funcion para obtener la información de un paciente mediante su cedula
    function obtenerInformacionPaciente($cedula)
    {

        $sql = "SELECT p.nombres, p.apellidos, p.cedula, p.telefono, u.rol FROM pacientes p INNER JOIN usuarios u ON p.cedula = u.cedula WHERE u.rol = '2' AND p.cedula = ?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("s", $cedula);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado && $resultado->num_rows > 0) {
            $paciente = $resultado->fetch_assoc();
        } else {
            $paciente = ["error" => "No se encontró al paciente con cédula: $cedula"];
        }

        $this->conexion->close();
        return $paciente;
    }

    //Funcion para obtener el historial clinico del paciente si lo tiene
    function obtenerHistorialClinico($cedula)
    {
        $sql = "SELECT padecimientos, tratamientos, medicamentos, alergias, antecedentes FROM historial 
    WHERE paciente_cedula = '$cedula'";

        $resultado = $this->conexion->query($sql);
        if (!$resultado) {
            return ["error" => "Error en la consulta: " . $this->conexion->error];
        }
        if ($resultado->num_rows > 0) {
            $historial = $resultado->fetch_assoc();
        } else {
            $historial = ["error" => "No se encontró historial clínico para la cédula: $cedula"];
        }

        return $historial;
    }
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input['accion'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "JSON inválido o falta acción"]);
        exit;
    }

    $paciente = new Paciente();

    switch ($input['accion']) {
        case 'obtenerInformacionPaciente':
            $respuesta = $paciente->obtenerInformacionPaciente($input['cedula']);
            echo json_encode($respuesta);
            exit;
        case 'obtenerHistorialClinico':
            $respuesta = $paciente->obtenerHistorialClinico($input['cedula']);
            echo json_encode($respuesta);
            exit;
        default:
            http_response_code(400);
            echo json_encode(["error" => "Acción no válida"]);
    }
}
