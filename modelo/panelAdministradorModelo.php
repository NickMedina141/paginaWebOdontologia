<?php
header("Content-Type: application/json");
include_once("../php/conexion.php");

class Administrador
{
    private $conexion;
    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    //Funcion para obtener la información del administrador
    function obtenerInformacionAdministrador(){
        $sql = "SELECT nombre, apellido, cedula, telefono, rol FROM odontologos WHERE rol = '0' LIMIT 1";
        $resultado = $this->conexion->query($sql);

        if ($resultado && $resultado->num_rows > 0) {
            $admin = $resultado->fetch_assoc();
        } else {
            $admin = ["error" => "No se encontró al administrador"];
        }

        $this->conexion->close();
        return $admin;
    }

    //Funcion para obtener las citas recientemente registradas, 4 en general
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
