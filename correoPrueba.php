<?php
// require 'phpMailer/PHPMailer-master/src/PHPMailer.php';
// require 'phpMailer/PHPMailer-master/src/SMTP.php';
// require 'phpMailer/PHPMailer-master/src/Exception.php';
require 'phpMailer/PHPMailer-master/PHPMailer-master/src/PHPMailer.php';
require 'phpMailer/PHPMailer-master/PHPMailer-master/src/SMTP.php';
require 'phpMailer/PHPMailer-master/PHPMailer-master/src/Exception.php';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$mail = new PHPMailer(true);

$correo = "bohorquezmedinicolassuares@gmail.com";
enviarCorreo($correo);

function enviarCorreo($correo) {
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Usa tu SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'nbohorquezm@unicesar.edu.co';
    $mail->Password = '';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 105;

    $mail->setFrom('nbohorquezm@unicesar.edu.co', 'Diana Odontologia');
    $mail->addAddress($correo);
    $mail->Subject = 'Cree su contraseña';
    // $mail->Body = "Haz clic en el siguiente enlace para crear tu contraseña: $link";
    // $mail->Body = "Haz clic en el siguiente enlace para crear tu contraseña:";
    $link = "http://localhost/PLATAFORMA EN LÍNEA PARA LA ACCESIBILIDAD Y GESTIÓN DE CITAS DE “DIANA CAROLINA ODONTOLOGÍA”/correoPrueba.php?email=" . urlencode($correo);

    // $link = "http://localhost/PLATAFORMA EN LÍNEA PARA LA ACCESIBILIDAD Y GESTIÓN DE CITAS DE “DIANA CARO/crear_contrasena.php?email=" . urlencode($correo);
    $mail->Body = "Haz clic en el siguiente enlace para crear tu contraseña: $link";

    if (!$mail->send()) {
        echo "Error al enviar correo: " . $mail->ErrorInfo;
        echo "no funciono";
    }
}