<?php
session_start();
require_once('../modelo/registroPaciente.php');
// require '../phpMailer/PHPMailer-master/src/PHPMailer.php';
// require '../phpMailer/PHPMailer-master/src/SMTP.php';
// require '../phpMailer/PHPMailer-master/src/Exception.php';


// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;


// $mail = new PHPMailer(true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cedula = intval(trim($_POST['cedula']));
    $nombres = trim($_POST['nombre']);
    $apellidos = trim($_POST['apellidos']);
    $correo = trim($_POST['email']);
    //manera 1
    $sexo = trim($_POST['sexo']);
    if($sexo == "Masculino"){
        $sexo = true;
    }
    else if ($sexo == "Femenino"){
        $sexo = false;
    }
    //manera 2
    // $sexo = ($sexo == "masculino") ? 1: 0;
    $telefono = intval(trim($_POST['telefono']));
    $edad = str_replace("T"," ",$_POST["date"]); // REVISAR
    $password = trim($_POST['password']);
    $encriptada = password_hash($password, PASSWORD_DEFAULT);

    $paciente = new Paciente();

    if($paciente->existenciaPaciente($cedula)){
        header("Location: ../vista/panelPaciente.html");
        exit();
    }else{
        // if($paciente->registrarUsuario($correo,$encriptada,"paciente")){
        //     if($paciente->registrarPaciente($cedula,$nombres, $apellidos,$sexo,$telefono)){
        //     // enviarCorreo($correo);
        //     header("Location: ../index.html");
        //     exit();
        //     }else{
        //         echo"Error";
        //         exit();
        //     } 
        // }
        
        if($paciente->registrarPaciente($cedula,$nombres, $apellidos,$sexo,$edad,$telefono)){
            if($paciente->registrarUsuario($cedula,$correo,$encriptada,"paciente")){
                // enviarCorreo($correo);
                header("Location: ../index.html");
                exit();
                } else{
                echo"Error";
                exit();
                } 
            }
            
        else{
            echo"Error";
            exit();
        }
    }
}

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