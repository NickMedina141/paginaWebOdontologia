<?php
header('Content-Type: application/json'); // ¡Debe ir aquí arriba!

// Verificar si el parámetro 'id' está presente en la URL
if (!isset($_GET['id'])) {
    echo json_encode(['error' => true, 'message' => 'ID no proporcionado']);
    exit;
}

// include("conexion.php");
include_once("../php/conexion.php");
$conn = new Conexion();
$conexion = $conn->conectar();

$id = $_GET['id']; // Obtenemos el ID desde la URL

// Aseguramos que el ID esté correctamente escapado para prevenir inyección SQL
$id = $conexion->real_escape_string($id);

// $sql = "SELECT * FROM `pacientes` WHERE `cedula` = '$id'";
$sql = "SELECT p.*, u.correo AS email  FROM pacientes p LEFT JOIN usuarios u ON p.cedula where p.cedula = '$id'";
// $resultado = $conexion->query($sql);
$resultado = $conexion->query($sql);

// Verificamos si la consulta fue exitosa
if ($resultado) {
    $fila = $resultado->fetch_assoc(); // Obtener la primera fila

    if ($fila) {
        echo json_encode([$fila]); // Devuelve directamente la fila encontrada
    } else {
        echo json_encode([]); // No se encontraron resultados
    }
} else {
    echo json_encode(['error' => true, 'message' => 'Error en la consulta SQL']);
}

$conexion->close();
exit;
