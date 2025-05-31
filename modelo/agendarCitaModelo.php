<?php
header('Content-Type: application/json');
require_once '../php/conexion.php';

class Cita
{
    private $conexion;

    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    public function obtenerServicios()
    {
        $sql = "SELECT nombre, descripcion, costo FROM servicios";
        $resultado = $this->conexion->query($sql);

        if (!$resultado) {
            http_response_code(400);
            echo json_encode(["error" => "Error en la consulta de servicios" . $this->conexion->error]);
            exit;
        }

        $servicios = [];
        while ($fila = $resultado->fetch_assoc()) {
            $servicios[] = $fila;
        }
        return $servicios;
    }

    public function obtenerFechasDisponibles()
    {
        $sql = "SELECT fecha, hora_inicio, hora_fin, id_horario FROM horarios WHERE estado = 0 ORDER BY fecha ASC, hora_inicio ASC";

        $resultado = $this->conexion->query($sql);

        if (!$resultado) {
            http_response_code(500);
            echo json_encode(["Error" => "Error en la consulta de fechas: " . $this->conexion->error]);
            // exit;
        }

        $fechas = [];
        while ($fila = $resultado->fetch_assoc()) {
            $fechas[] = [
                "fecha" => $fila["fecha"],
                "hora_inicio" => $fila["hora_inicio"],
                "hora_fin" => $fila["hora_fin"],
                "id_horario" => $fila["id_horario"]
            ];
        }
        return $fechas;
    }

    public function agregarCitas($datos)
    {
        $pacientes_cedula = $datos["pacientes_cedula"];
        $odontologos_cedula = $datos["odontologos_cedula"];
        $fecha = $datos["fecha"];
        $hora_inicio = $datos["hora_inicio"];
        $hora_fin = $datos["hora_fin"];
        $estado = $datos["estado"];
        $servicio = $datos["servicio"];
        $id_horario = $datos["id_horario"];

        $sql = "SELECT COUNT(*) AS total FROM cita WHERE fecha = ? AND 
        hora_inicio < ? AND hora_fin > ? ";

        $stmtVerificar = $this->conexion->prepare($sql);
        $stmtVerificar->bind_param("sss", $fecha, $hora_inicio, $hora_fin);
        $stmtVerificar->execute();
        $resultado = $stmtVerificar->get_result();
        $existe = $resultado->fetch_assoc()["total"];


        if ($existe > 0) {
            return ["success" => false, "message" => "ya existe una cita registrada para ese rango en esa fecha."];
        }

        $sqlInsertar = "INSERT INTO cita (pacientes_cedula, odontologos_cedula, fecha, hora_inicio, hora_fin, estado, servicio, id_horario)
        VALUES (?,?,?,?,?,?,?,?)";
        $stmtInsertar = $this->conexion->prepare($sqlInsertar);
        $stmtInsertar->bind_param("iisssisi", $pacientes_cedula, $odontologos_cedula, $fecha, $hora_inicio, $hora_fin, $estado, $servicio, $id_horario);

        if ($stmtInsertar->execute()) {
            return ["success" => true, "message" => "Cita registrada exitosamente"];
        } else {
            return ["success" => false, "message" => "Error al registrar la cita: " . $this->conexion->error];
        }
    }

    public function obtenerCitasAgendadas(){
        $sql = "SELECT c.servicio, o.nombre AS odontologo, c.fecha, c.hora_inicio, c.hora_fin, c.estado
        FROM cita c INNER JOIN odontologos o ON c.odontologos_cedula = o.cedula ORDER BY c.fecha ASC,
        c.hora_inicio ASC";
        $sql = "SELECT c.id_cita, c.servicio, o.nombre AS odontologo, c.fecha, c.hora_inicio, c.estado
        FROM cita c INNER JOIN odontologos o ON c.odontologos_cedula = o.cedula ORDER BY c.fecha ASC,
        c.hora_inicio ASC, c.hora_inicio ASC";
        $resultado = $this->conexion->query($sql);

        if (!$resultado) {
            http_response_code(500);
            echo json_encode(["error" => "Error al obtener citas: " . $this->conexion->error]);
            exit;
        }

        $citas = [];
        while ($fila = $resultado->fetch_assoc()) {
            $citas[] = $fila;
        }
        return $citas;
    }

    public function editarCita($id_cita, $pacientes_cedula, $odontologos_cedula, $fecha, $hora_inicio, $hora_fin, $estado, $servicio, $id_horario)
    {
        // Verificar si la cita existe
        $sqlVerificar = "SELECT COUNT(*) AS total FROM cita WHERE id_cita = ?";
        $stmtVerificar = $this->conexion->prepare($sqlVerificar);
        $stmtVerificar->bind_param("i", $id_cita);
        $stmtVerificar->execute();
        $resultado = $stmtVerificar->get_result();
        $existe = $resultado->fetch_assoc()["total"];

        if ($existe == 0) {
            return ["success" => false, "message" => "La cita no existe."];
        }

        // Actualizar la cita
        $sqlActualizar = "UPDATE cita SET pacientes_cedula = ?, odontologos_cedula = ?, fecha = ?, hora_inicio = ?, hora_fin = ?, estado = ?, servicio = ?, id_horario = ? WHERE id_cita = ?";
        $stmtActualizar = $this->conexion->prepare($sqlActualizar);
        $stmtActualizar->bind_param("iisssisi", $pacientes_cedula, $odontologos_cedula, $fecha, $hora_inicio, $hora_fin, $estado, $servicio, $id_horario, $id_cita);

        if ($stmtActualizar->execute()) {
            return ["success" => true, "message" => "Cita actualizada exitosamente"];
        } else {
            return ["success" => false, "message" => "Error al actualizar la cita: " . $this->conexion->error];
        }

    }
}

// VOLVER A ESCRIBIR POR TI MISMO
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input['accion'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "JSON inválido o falta acción"]);
        exit;
    }

    $cita = new Cita();

    switch ($input['accion']) {
        case 'servicios':
            echo json_encode($cita->obtenerServicios());
            exit;

        case 'fechas':
            echo json_encode($cita->obtenerFechasDisponibles());
            exit;
        case 'agregarCita':
            echo json_encode($cita->agregarCitas($input));
            exit;
        case 'citasAgendadas':
            echo json_encode($cita->obtenerCitasAgendadas());
            exit;
        case 'editarCita':
            $id_cita = $input['id_cita'];
            $pacientes_cedula = $input['pacientes_cedula'];
            $odontologos_cedula = $input['odontologos_cedula'];
            $fecha = $input['fecha'];
            $hora_inicio = $input['hora_inicio'];
            $hora_fin = $input['hora_fin'];
            $estado = $input['estado'];
            $servicio = $input['servicio'];
            $id_horario = $input['id_horario'];
            echo json_encode($cita->editarCita($id_cita, $pacientes_cedula, $odontologos_cedula, $fecha, $hora_inicio, $hora_fin, $estado, $servicio, $id_horario));
        default:
            http_response_code(400);
            echo json_encode(["error" => "Acción no válida"]);
    }
} else {
    if (isset($_GET['dia'])) {
        $dia = intval($_GET['dia']);
        $horarios = [];

        $conexiones = new Conexion();
        $conn = $conexiones->conectar();

        $sql = "SELECT hora_inicio, hora_fin, id_horario FROM horarios WHERE estado = 0 AND dia_semana = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $dia);

        if ($stmt->execute()) {
            $resultado = $stmt->get_result();

            while ($fila = $resultado->fetch_assoc()) {
                // Convertimos hora_inicio y hora_fin a intervalos de una hora (por ejemplo, 8:00 AM, 9:00 AM)
                $inicio = strtotime($fila['hora_inicio']);
                $fin = strtotime($fila['hora_fin']);

                while ($inicio < $fin) {
                    $horarios[] = date("g:i A", $inicio); // formato 12h con AM/PM
                    // $horarios[] = $fila['id_horario']; // Guardamos el id_horario
                    $inicio = strtotime("+1 hour", $inicio);
                }
            }

            echo json_encode([
                "success" => true,
                "horas" => array_unique($horarios)
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Error al ejecutar la consulta"
            ]);
        }

        $stmt->close();
        $conn->close();
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Solo se aceptan peticiones POST"]);
    }
}



// 
