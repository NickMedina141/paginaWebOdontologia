<?php
header("Content-Type: application/json");
include_once("../php/conexion.php");

class Odontologo
{
    private $conexion;
    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    //Funcion para obtener la información de un odontologo mediante su cedula
    function obtenerInformacionOdontologo($cedula)
    {

        $sql = "SELECT nombre, apellido, cedula, telefono, rol FROM odontologos WHERE rol = '1' AND cedula = '$cedula'";
        $resultado = $this->conexion->query($sql);

        if ($resultado && $resultado->num_rows > 0) {
            $odontologo = $resultado->fetch_assoc();
        } else {
            $odontologo = ["error" => "No se encontró al odontólogo"];
        }

        $this->conexion->close();
        return $odontologo;
    }

    //Funcion para obtener las citas registradas recientes, 4 en total
    function obtenerCitasRecientes()
    {
        $sql = "SELECT servicio,fecha,hora_inicio,estado FROM cita 
    ORDER BY fecha DESC, hora_inicio DESC LIMIT 4";

        $resultado = $this->conexion->query($sql);
        if (!$resultado) {
            return ["error" => "Error en la consulta: " . $this->conexion->error];
        }

        $citas = [];
        if ($resultado && $resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                $fila["estado"] = $fila["estado"] == 1 ? "Completada" : "Pendiente";
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

    $odontologo = new Odontologo();

    switch ($input['accion']) {
        case 'obtenerInformacionOdontologo':
            $respuesta = $odontologo->obtenerInformacionOdontologo($input['cedula']);
            echo json_encode($respuesta);
            exit;
        case 'obtenerCitasRecientes':
            $respuesta = $odontologo->obtenerCitasRecientes();
            echo json_encode($respuesta);
            exit;
        default:
            http_response_code(400);
            echo json_encode(["error" => "Acción no válida"]);
    }
}
