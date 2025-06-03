<?php
// header('Content-Type: application/json');
require_once '../php/conexion.php';
require '../phpMailer/PHPMailer-master/PHPMailer-master/src/PHPMailer.php';
require '../phpMailer/PHPMailer-master/PHPMailer-master/src/SMTP.php';
require '../phpMailer/PHPMailer-master/PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Cita
{
    private $conexion;

    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    //Funcion para obtener la información de los servicios de la tabla servicios
    public function obtenerServicios(){
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

    //Funcion para obtener los correos de los pacientes mediante su cedula
    private function obtenerCorreoPorCedula($cedula){
        $sql = "SELECT correo FROM usuarios WHERE cedula = ?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("i", $cedula);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($fila = $resultado->fetch_assoc()) {
            return $fila["correo"];
        }
        return false;
    }

    //Funcion para agregar las citas al sistema
    public function agregarCitas($datos){
        $pacientes_cedula = $datos["pacientes_cedula"];
        $odontologos_cedula = $datos["odontologos_cedula"];
        $fecha = $datos["fecha"];
        $hora_inicio = $datos["hora_inicio"];
        $hora_fin = $datos["hora_fin"];
        $estado = $datos["estado"];
        $servicio = $datos["servicio"];
        $id_horario = $datos["id_horario"];

        $correoPaciente = $this->obtenerCorreoPorCedula($pacientes_cedula);
        if (!$correoPaciente) {
            return ["success" => false, "message" => "No se pudo obtener el correo del paciente."];
        }

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
            //Enviar el correo de confirmacion
            $this->enviarCorreo($correoPaciente);
            return ["success" => true, "message" => "Cita registrada exitosamente"];
        } else {
            return ["success" => false, "message" => "Error al registrar la cita: " . $this->conexion->error];
        }
    }

    //Funcion para obtener las citas agendadas de la tabla cita
    public function obtenerCitasAgendadas(){

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

    //Funcion para obtener la cita en especifico mediante su id
    public function obtenerCitaPorID($id_cita){
        $sql = "SELECT * FROM cita WHERE id_cita = ?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("i", $id_cita);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows === 0) {
            return ["success" => false, "message" => "No se encontró la cita"];
        }

        $cita = $resultado->fetch_assoc();
        return ["success" => true, "cita" => $cita];
    }

    //Funcion para actualizar los datos de la cita en especifico
    public function editarCita($id_cita, $fecha, $hora_inicio, $hora_fin, $servicio){
        $sql = "UPDATE cita SET fecha = ?, hora_inicio = ?, hora_fin = ?, servicio = ?
            WHERE id_cita = ?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("ssssi", $fecha, $hora_inicio, $hora_fin, $servicio, $id_cita);

        if ($stmt->execute()) {
            return ["success" => true, "message" => "Cita actualizada correctamente"];
        } else {
            return ["success" => false, "message" => "Error al actualizar la cita: " . $stmt->error];
        }
    }

    //Funcion para eliminar una cita mediante su id
    public function eliminarCita($id_cita){
        $sql = "DELETE FROM cita WHERE id_cita = ?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("i", $id_cita);

        if ($stmt->execute()) {
            return ["success" => true, "message" => "Cita eliminada Correctamente"];
        } else {
            return ["success" => false, "message" => "Error al eliminar la cita" . $stmt->error];
        }
    }

    //Funcion para enviar el correo de verificacion al paciente
    public function enviarCorreo($correo)
    {
        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Usa tu SMTP
        $mail->SMTPAuth = true;
        $mail->Username = "bohorquezmedinicolassuares@gmail.com";
        $mail->Password = 'omtswvwikdnzyyom';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->setFrom('bohorquezmedinicolassuares@gmail.com', 'Diana Odontologia');
        $mail->addAddress($correo);
        $mail->Subject = '';
        $mail->isHTML(true); // Habilitar HTML


        $link = "http://localhost/CITAS/modelo/recuperarPassword.php?email=" . urlencode($correo);
        $mail->Body = "
        <div style='font-family: Arial, sans-serif; background: #f8f9fa; color: #000000; line-height: 1.6; 
        max-width: 600px; margin: auto; border: 1px solid #a4c9e8; border-radius: 20px; padding: 30px;'>

        <div style='text-align: center; margin-bottom: 20px;'>
        <h1 style='color: #1da1f2;'>Confirmación de Cita</h1>
        <p style='font-size: 16px; color: #555;'>¡Gracias por agendar tu cita con <strong>Diana Odontología</strong>!</p>
        </div>

        <p style='font-size: 15px;'>Hola querido/a paciente,</p>
        <p style='font-size: 15px;'>Hemos recibido con éxito el registro de tu cita. Nos alegra poder atenderte y ayudarte a mantener una sonrisa saludable.</p>

        <div style='background-color: #e8f4fc; padding: 15px; border-radius: 10px; margin: 20px 0; font-size: 14px;'>
            <p style='margin: 0;'>Tu información está protegida y segura con nosotros. Nos comprometemos a brindarte el mejor servicio.</p>
        </div>

        <p style='font-size: 14px; color: #555;'>Si tienes alguna duda o necesitas modificar tu cita, no dudes en contactarnos.</p>

        <p style='text-align: center; font-size: 14px; margin-top: 30px; color: #777;'>
            Gracias por confiar en <strong>Diana Odontología</strong>. Estamos aquí para ayudarte siempre que lo necesites.
        </p>

        <hr style='border: none; border-top: 1px solid #ddd; margin: 30px 0;'>

        <p style='text-align: center; font-size: 12px; color: #aaa;'>
            Este correo fue generado automáticamente. Por favor, no respondas a este mensaje.
        </p>
        </div>";


        if (!$mail->send()) {
            return false;
        } else
            return true;
    }

    public function obtenerCitasAgendadasPaciente($cedula)
    {
        $sql = "SELECT c.id_cita, c.servicio, o.nombre AS odontologo, c.fecha, c.hora_inicio, c.estado
            FROM cita c 
            INNER JOIN odontologos o ON c.odontologos_cedula = o.cedula 
            WHERE c.pacientes_cedula = ? 
            ORDER BY c.fecha ASC, c.hora_inicio ASC";

        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("i", $cedula); // Aquí vinculamos la cédula correctamente
        $stmt->execute();
        $resultado = $stmt->get_result();

        $citas = [];
        while ($fila = $resultado->fetch_assoc()) {
            $citas[] = $fila;
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

    $cita = new Cita();

    switch ($input['accion']) {
        case 'servicios':
            echo json_encode($cita->obtenerServicios());
            exit;
        case 'agregarCita':
            echo json_encode($cita->agregarCitas($input));
            exit;
        case 'citasAgendadas':
            echo json_encode($cita->obtenerCitasAgendadas());
            exit;
        case 'citasAgendadasPaciente':
            if (!isset($input['cedula'])) {
                echo json_encode(["success" => false, "message" => "Falta el id de la cita"]);
                exit;
            }
            echo json_encode($cita->obtenerCitasAgendadasPaciente($input["cedula"]));
            exit;
        case 'obtenerCitaPorID':
            if (!isset($input['id_cita'])) {
                echo json_encode(["success" => false, "message" => "Falta el id de la cita"]);
                exit;
            }
            echo json_encode($cita->obtenerCitaPorID($input["id_cita"]));
            exit;

        case 'editarCita':
            $id_cita = $input['datos']['id_cita'];
            $fecha = $input['datos']['fecha'];
            $hora_inicio = $input['datos']['hora_inicio'];
            $hora_fin = $input['datos']['hora_fin'];
            $servicio = $input['datos']['servicio'];
            echo json_encode($cita->editarCita($id_cita, $fecha, $hora_inicio, $hora_fin, $servicio));
            exit;
        case 'eliminarCita':
            if (!isset($input['id_cita'])) {
                echo json_encode(["success" => false, "message" => "Falta el id de la cita"]);
                exit;
            }
            echo json_encode($cita->eliminarCita($input["id_cita"]));
            exit;


        default:
            http_response_code(400);
            echo json_encode(["error" => "Acción no válida"]);
    }
} else {
    if (isset($_GET['dia']) && isset($_GET['fecha'])) {
        $dia = intval($_GET['dia']);
        $fecha = $_GET['fecha'];

        $horarios = [];
        $horasOcupadas = [];

        $conexiones = new Conexion();
        $conn = $conexiones->conectar();

        $sql = "SELECT hora_inicio, hora_fin, id_horario FROM horarios WHERE estado = 0 AND dia_semana = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $dia);

        if ($stmt->execute()) {
            $resultado = $stmt->get_result();

            while ($fila = $resultado->fetch_assoc()) {
                $inicio = strtotime($fila['hora_inicio']);
                $fin = strtotime($fila['hora_fin']);

                while ($inicio < $fin) {
                    $horaFormateada = date("g:i A", $inicio); // ejemplo: 8:00 AM

                    $horarios[] = [
                        "hora" => $horaFormateada,
                        "hora_inicio" => date("H:i:s", $inicio),
                        "hora_fin" => date("H:i:s", strtotime("+1 hour", $inicio)),
                        "id_horario" => $fila['id_horario']
                    ];

                    $inicio = strtotime("+1 hour", $inicio);
                }
            }
            $stmt->close();

            $sqlCitas = "SELECT hora_inicio FROM cita WHERE fecha = ? AND estado = 0";
            $stmtCitas = $conn->prepare($sqlCitas);
            $stmtCitas->bind_param("s", $fecha);

            if ($stmtCitas->execute()) {
                $resultadoCitas = $stmtCitas->get_result();
                while ($filaCita = $resultadoCitas->fetch_assoc()) {
                    $horasOcupadas[] = $filaCita['hora_inicio'];
                }
                $stmtCitas->close();
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "Error al obtener horas ocupadas"
                ]);
                $conn->close();
                exit;
            }

            echo json_encode([
                "success" => true,
                "horas" => $horarios,
                "horas_ocupadas" => $horasOcupadas
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Error al ejecutar la consulta de horarios"
            ]);
        }

        $conn->close();
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Solo se aceptan peticiones POST"]);
    }
}
