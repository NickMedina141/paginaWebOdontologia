<?php
require_once("../php/conexion.php");
require '../phpMailer/PHPMailer-master/PHPMailer-master/src/PHPMailer.php';
require '../phpMailer/PHPMailer-master/PHPMailer-master/src/SMTP.php';
require '../phpMailer/PHPMailer-master/PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

class Cuenta
{
    private $conexion;

    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    public function verificarCuenta($correo)
    {

        $consulta = "SELECT * FROM usuarios where correo = ?";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows === 1) {
            echo "LLEGO, BIEN HECHO: " . $correo;
            $this->enviarCorreo($correo);
            // return true;
        } else {
            echo "ERROR";
            return false;
        }
    }

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
        $mail->Subject = 'recupere su contraseña';
        $mail->isHTML(true); // Habilitar HTML


        $link = "http://localhost/CITAS/modelo/recuperarPassword.php?email=" . urlencode($correo);
        $mail->Body = "<div style='font-family: Arial, sans-serif; background: #f8f9fa; color: #000000; line-height: 1.6; 
            max-width: 600px; margin: auto; border: solid 2px #333; border-radius: 50px;  padding: 15px;'>
            <h1 style='color: #2980b9; text-align: center;'>Recuperación de Contraseña</h1>
            <p>Hola querido/a paciente Hemos recibido su solicitud para restablecer tu contraseña.</p>
            <p>Para restablecer su contraseña haga clic en el siguiente boton a continuación:</p>
            <p style='text-align: center; margin-top: 20px;'>
                <a href='$link' style='box-shadow: 10px 10px 20px 0px #2980b9; 
                background-color: #a4c9e8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; 
                font-size: 16px;'>Restablecer Contraseña</a>
            </p>
            <br>
            <p>Esperemos solucionar su preocupacion con respecto a su cuenta, todo esta protegido.</p>
            <p style='text-align: center; margin-top: 20px;'>
            
            </p>
            <p style='text-align: center; font-size: 14px; color: #777;'>Gracias por confiar en <strong>Diana odontologia.</strong>  Estamos aquí para ayudarte siempre que lo necesites.</p>
            <br>
            <p style='text-align: center; margin-top: 25px; font-size: 12px; color: #aaa;'>
                Este correo es generado automáticamente. Por favor, no respondas a este mensaje.
            </p>
            <br>
        </div>";

        if (!$mail->send()) {
            echo "Error al enviar correo: " . $mail->ErrorInfo;
            echo "no funciono";
        } else
            echo "envio exitos";
    }
}
