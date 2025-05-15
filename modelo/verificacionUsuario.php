<?php
require_once '../php/conexion.php';

class Usuario{
    private $conexion;

    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    public function verificarUsuario($correo,$password){
        $consulta = "SELECT * FROM usuarios WHERE correo = ?";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $resultado = $stmt->get_result();
        // return $resultado->num_rows >0;
        if($resultado->num_rows === 1){
            $fila = $resultado->fetch_assoc();
            if(password_verify($password,$fila["contraseña"])){
                return true;
            } else{
                echo "ERROR de contraseña";
                return false;
            }
        };
        return false;
    }


}
// session_start();
// include('conexion.php'); // Asegúrate de que $conexion sea una instancia válida de mysqli

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $email = trim($_POST['email']);
//     $password = trim($_POST['password']);

//     // Buscar el usuario por correo
//     $consulta = "SELECT * FROM usuarios WHERE correo = ?";
//     $stmt = $conexion->prepare($consulta);
//     $stmt->bind_param("s", $correo);
//     $stmt->execute();
//     $resultado = $stmt->get_result();
//     if ($resultado->num_rows === 1) {
//         $fila = $resultado->fetch_assoc();

//         // Validar la contraseña con hash
//         if (password_verify($password, $fila['password'])) {
//             // Autenticación correcta
//             echo "Llego a la autentificacion";
//             $_SESSION['email'] = $fila['correo']; // puedes almacenar más datos si quieres
//             header("Location: ../html/panelPaciente.html");
//             exit();
//         } else {
//             echo "Contraseña incorrecta.";
//         }
//     } else {
//         echo "El usuario no existe.";
//     }
    

//     $stmt->close();
//     $conexion->close();
// }
?>
