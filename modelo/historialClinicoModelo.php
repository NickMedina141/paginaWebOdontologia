<?php
header('Content-Type: application/json');
include_once("../php/conexion.php");

class Historial
{
    private $conexion;

    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }


    //Funcion para obtener la información del historial del paciente si es que lo tiene
    public function obtenerDatos($cedula)
    {
        $cedula = $this->conexion->real_escape_string($cedula);
        $sql = "SELECT h.paciente_cedula, h.padecimientos, h.tratamientos, h.medicamentos, h.antecedentes AS historial, 
        h.alergias,p.nombres, p.apellidos FROM historial h JOIN pacientes p ON h.paciente_cedula = p.cedula
        WHERE h.paciente_cedula = '$cedula'";

        $resultado = $this->conexion->query($sql);
        if ($resultado) {
            $historial = [];

            while ($fila = $resultado->fetch_assoc()) {
                $historial[] = $fila;
            }
            return $historial;
        } else {
            return ["error" => true, "message" => "Error en la consulta SQL"];
        }
    }

    //Funcion para actualizar los datos del historial Clinico del paciente
    public function actualizarDatosPaciente($cedula, $tratamientos, $medicamentos, $padecimientos, $alergias, $antecedentes)
    {
        $sql = "UPDATE historial SET tratamientos = '$tratamientos', medicamentos= '$medicamentos', 
        padecimientos='$padecimientos', alergias= '$alergias', antecedentes= '$antecedentes' WHERE paciente_cedula = '$cedula'";

        if ($this->conexion->query($sql)) {
            return true;
        } else {
            echo "Error al actualizar el historial: " . $this->conexion->error;
            return false;
        }
    }
}


//verificar si se envio la cedula o no
if (isset($_GET["cedula"])) {
    $historial = new Historial();
    $datos = $historial->obtenerDatos($_GET["cedula"]);
    echo json_encode($datos);
} else {
    echo json_encode(["error" => true, "message" => "cedula no proporcionada"]);
}
