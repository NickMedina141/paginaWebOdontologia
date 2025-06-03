<?php
include_once("../php/conexion.php");

class Paciente
{
    private $conexion;

    public function __construct()
    {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    //funcion que busca en la tabla de historial si existe la cedula de los pacientes y sino traerlos para saber que no tienen
    public function obtenerPacientesSinHistorial()
    {
        $sql = "SELECT p.cedula, p.nombres, p.apellidos, p.sexo FROM pacientes p LEFT JOIN historial h
        ON p.cedula = h.paciente_cedula where h.paciente_cedula IS NULL";

        $resultado = $this->conexion->query($sql);
        if (!$resultado) {
            die("Error en la consulta" . $this->conexion->error);
        }
        $pacientes = [];
        while ($fila = $resultado->fetch_assoc()) {
            $fila["estado"] = "Sin subir";
            $pacientes[] = $fila;
        }
        return $pacientes;
    }

    //Funcion para subir el historial clinico de los pacientes que no tienen
    public function subirHistorial($cedula, $padecimientos, $tratamientos, $medicamentos, $alergias, $antecedentes)
    {
        $sql = "INSERT INTO historial (paciente_cedula,padecimientos,tratamientos,medicamentos,alergias,antecedentes) values (?,?,?,?,?,?)";
        echo "Se ha registrado correctamente el historial del paciente";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("isssss", $cedula, $padecimientos, $tratamientos, $medicamentos, $alergias, $antecedentes);
        return $stmt->execute();
    }
}

header("Content-Type: application/json");

$paciente = new Paciente();
echo json_encode($paciente->obtenerPacientesSinHistorial());
