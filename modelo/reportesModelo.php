<?php
header('Content-Type: application/json');
require_once '../php/conexion.php';
class Reportes
{
    private $conexion;

    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    //Funcion para obtener los reportes disponibles en la tabla reportes
    public function obtenerReportes()
    {
        $sql = "SELECT * FROM reportes";
        $stmt = $this->conexion->prepare($sql);
        if (!$stmt) {
            return ["success" => false, "message" => "Error en consulta: " . $this->conexion->error];
        }

        $stmt->execute();
        $resultado = $stmt->get_result();

        $reportes = [];
        while ($row = $resultado->fetch_assoc()) {
            $reportes[] = [
                'id_reporte' => $row['id_reporte'],
                'mes' => $row['mes_reporte'],
                'fecha_creacion' => $row['fecha_creacion'],
            ];
        }

        $stmt->close();

        return [
            'success' => true,
            'data' => $reportes
        ];
    }

    //Funcion para traer las citas de la tabla cita de dicho mes seleccionado
    function obtenerCitas($mes)
    {
        $sql = "SELECT c.id_cita, c.pacientes_cedula, c.odontologos_cedula,
            c.fecha, c.hora_inicio, c.hora_fin, c.estado, c.servicio, c.id_horario
            FROM cita AS c
            WHERE DATE_FORMAT(c.fecha, '%Y-%m') = ?";

        $stmt = $this->conexion->prepare($sql);
        if (!$stmt) {
            return ["success" => false, "message" => "Error en consulta: " . $this->conexion->error];
        }
        $stmt->bind_param("s", $mes);
        if (!$stmt) {
            return ["success" => false, "message" => "Error al preparar la consulta: " . $this->conexion->error];
        }
        $stmt->execute();
        $stmt->bind_result($id_cita, $paciente, $odontologo, $fecha, $hora_inicio, $hora_fin, $estado, $servicio, $id_horario);
        $citas = [];
        while ($stmt->fetch()) {
            $citas[] = [
                'id_cita' => $id_cita,
                'pacientes_cedula' => $paciente,
                'odontologos_cedula' => $odontologo,
                'fecha' => $fecha,
                'hora_inicio' => $hora_inicio,
                'hora_fin' => $hora_fin,
                'estado' => $estado,
                'servicio' => $servicio,
                'id_horario' => $id_horario
            ];
        }
        $stmt->close();
        return [
            'success' => true,
            'data' => $citas
        ];
    }

    //Funcion para subir un reporte al sistema
    function subirReporte($mes, $fecha_creacion)
    {
        $sql = "INSERT INTO reportes (mes_reporte, fecha_creacion) VALUES (?, ?)";
        $stmt = $this->conexion->prepare($sql);
        if (!$stmt) {
            return ["success" => false, "message" => "Error en consulta: " . $this->conexion->error];
        }

        $stmt->bind_param("ss", $mes, $fecha_creacion);
        if (!$stmt->execute()) {
            return ["success" => false, "message" => "Error al insertar el reporte: " . $stmt->error];
        }

        $stmt->close();
        return ["success" => true, "message" => "Reporte subido exitosamente"];
    }

    //Funcion para eliminar un reporte del sistema
    function eliminarReporte($id_reporte)
    {
        $sql = "DELETE FROM reportes WHERE id_reporte = ?";
        $stmt = $this->conexion->prepare($sql);
        if (!$stmt) {
            return ["success" => false, "message" => "Error en consulta: " . $this->conexion->error];
        }

        $stmt->bind_param("i", $id_reporte);
        if (!$stmt->execute()) {
            return ["success" => false, "message" => "Error al eliminar el reporte: " . $stmt->error];
        }

        if ($stmt->affected_rows === 0) {
            return ["success" => false, "message" => "No se encontró el reporte con ID: $id_reporte"];
        }

        $stmt->close();
        return ["success" => true, "message" => "Reporte eliminado exitosamente"];
    }
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input['accion'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "JSON inválido o falta acción"]);
        exit;
    }

    $reportes = new Reportes();

    // casos de acciones para que el programa sepa por donde tiene que ir mediante acciones
    switch ($input['accion']) {
        case 'obtenerReportes':
            $respuesta = $reportes->obtenerReportes();
            echo json_encode($respuesta);
            exit;
        case "obtenerCitas":
            if (!isset($input['mes'])) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Mes no proporcionado"]);
                exit;
            }
            $respuesta = $reportes->obtenerCitas($input['mes']);
            echo json_encode($respuesta);
            exit;
        case 'subirReporte':
            if (!isset($input["mes"]) || !isset($input["fecha_creacion"])) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Mes o fecha de creación no proporcionados"]);
                exit;
            }
            $respuesta = $reportes->subirReporte($input['mes'], $input['fecha_creacion']);
            echo json_encode($respuesta);
            exit;
        case 'eliminarReporte':
            if (!isset($input['id_reporte'])) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "ID de reporte no proporcionado"]);
                exit;
            }
            $respuesta = $reportes->eliminarReporte($input['id_reporte']);
            echo json_encode($respuesta);
            exit;
        default:
            http_response_code(400);
            echo json_encode(["error" => "Acción no válida"]);
    }
}
