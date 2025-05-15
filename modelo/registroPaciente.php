<?php
require_once '../php/conexion.php';

class Paciente{
    private $conexion;
    // private $id_usuario;
    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    public function existenciaPaciente($cedula){
        $consulta = "SELECT * FROM pacientes WHERE cedula = ?";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bind_param("i", $cedula);
        $stmt->execute();
        $resultado = $stmt->get_result();
        return $resultado->num_rows>0;
    }

    public function registrarUsuario($cedula,$correo,$encriptada,$rol){
        $sql = "INSERT INTO usuarios (cedula,correo,contraseña,rol) VALUES (?,?, ?, ?)";
        $stmt =$this->conexion->prepare($sql);
        $stmt->bind_param("isss",$cedula, $correo,$encriptada, $rol);
        // $this->id_usuario->$this->conexion->insert_id;       
        //  $id_usuario = $this->conexion->insert_id;
        if($stmt->execute()){
            echo "Se ha registrado correctamente al usuario";
            // $this->id_usuario = $this->conexion->insert_id;   
            return true;
        }else{
            return false;
        }

        // return $stmt->execute();
    }

    public function registrarPaciente($cedula,$nombres,$apellidos,$sexo,$edad,$telefono){
        $sql = "INSERT INTO pacientes (cedula,nombres,apellidos,sexo,edad,telefono) VALUES (?, ?, ?, ?, ?, ?)";
        echo "Se ha registrado correctamente al paciente";
        $stmt =$this->conexion->prepare($sql);
        $stmt->bind_param("issisi", $cedula,$nombres, $apellidos,$sexo,$edad,$telefono);
        return $stmt->execute();
    }


}

// session_start();
// require '../phpMailer/PHPMailer-master/src/PHPMailer.php';
// require '../phpMailer/PHPMailer-master/src/SMTP.php';
// require '../phpMailer/PHPMailer-master/src/Exception.php';
// include('../php/conexion.php');

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;


// // $mail = new PHPMailer(true);

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $cedula = intval(trim($_POST['cedula']));
//     $nombres = trim($_POST['nombre']);
//     $apellidos = trim($_POST['apellidos']);
//     $correo = trim($_POST['email']);
//     //manera 1
//     $sexo = trim($_POST['sexo']);
//     if($sexo == "masculino"){
//         $sexo = true;
//     }
//     else if ($sexo == "femenino"){
//         $sexo = false;
//     }
//     //manera 2
//     // $sexo = ($sexo == "masculino") ? 1: 0;
//     $telefono = intval(trim($_POST['telefono']));
    
    
//     // Verificar si el usuario ya existe
//     $consulta = "SELECT * FROM pacientes WHERE cedula = ?";
//     $stmt = $conexion->prepare($consulta);
//     $stmt->bind_param("i", $cedula);
//     $stmt->execute();
//     $resultado = $stmt->get_result();

//     if ($resultado->num_rows > 0) {
//         echo "Ya se encuentra registrado.";
//         $stmt->bind_result($id_usuario);
//         $stmt->fetch();
//         if ($stmt->execute()) {
//             header("Location: ../html/panelPaciente.html");
//             exit(); // Asegura que el script se detiene después de la redirección
//         } else {
//             echo "Error al registrar: " . $conexion->error;
//         }
//     } else {
//         // Insertar usuario
//         $sql = "INSERT INTO pacientes (cedula,nombres,apellidos,sexo,telefono,id_usuario) VALUES (?, ?, ?, ?, ?,?)";
//         echo "Se ha registrado correctamente, se ha enviado un correo";
//         $stmt = $conexion->prepare($sql);
//         $stmt->bind_param("issiii", $cedula,$nombres, $apellidos,$sexo,$telefono,$id_usuario);

//         if ($stmt->execute()) {
            

            
//             enviarCorreo($correo);
//             header("Location: ../html/panelPaciente.html");
//             exit();
//         } else {
//             echo "Error al registrar: " . $conexion->error;
//         }
//     }

//     $stmt->close();
//     $conexion->close();
// }

// function enviarCorreo($correo) {
//     $mail = new PHPMailer;
//     $mail->isSMTP();
//     $mail->Host = 'smtp.gmail.com'; // Usa tu SMTP
//     $mail->SMTPAuth = true;
//     $mail->Username = 'dianaOdontologia@gmai.com';
//     $mail->Password = '';
//     $mail->SMTPSecure = 'tls';
//     $mail->Port = 587;

//     $mail->setFrom('dianaOdontologia@gmai.com', 'Diana Odontologia');
//     $mail->addAddress($correo);
//     $mail->Subject = 'Cree su contraseña';
//     // $mail->Body = "Haz clic en el siguiente enlace para crear tu contraseña: $link";
//     // $mail->Body = "Haz clic en el siguiente enlace para crear tu contraseña:";
//     $link = "http://localhost/PLATAFORMA%20EN%20L%C3%8DNEA%20PARA%20LA%20ACCESIBILIDAD%20Y%20GESTI%C3%93N%20DE%20CITAS%20DE%20%E2%80%9CDIANA%20CAROLINA%20ODONTOLOG%C3%8DA%E2%80%9D/modelo/crear_contrasena.php?email=" . urlencode($correo);

//     // $link = "http://localhost/PLATAFORMA EN LÍNEA PARA LA ACCESIBILIDAD Y GESTIÓN DE CITAS DE “DIANA CARO/crear_contrasena.php?email=" . urlencode($correo);
//     $mail->Body = "Haz clic en el siguiente enlace para crear tu contraseña: $link";

//     if (!$mail->send()) {
//         echo "Error al enviar correo: " . $mail->ErrorInfo;
//         echo "no funciono";
//     }
// }