<?php 
$host = "localhost";
$usuario = "root";
$contrasena = "";
$nombre_bd = "clinicadental";

// Ruta completa donde se guardará el archivo .sql
$carpetaDestino = "C:\\xampp\\htdocs\\citas\\copiasSeguridad";
$nombreArchivo = "copiaSeguridad_" . date("Y-m-d_H-i-s") . ".sql";
$rutaArchivo = $carpetaDestino . "\\" . $nombreArchivo;

// Usa la ruta completa a mysqldump si es necesario
$mysqldump = "C:\\xampp\\mysql\\bin\\mysqldump.exe"; // Ajusta si tienes otro path

// Prepara el comando sin --password si está vacío
if ($contrasena === "") {
    $comando = "\"$mysqldump\" --host=$host --user=$usuario $nombre_bd > \"$rutaArchivo\"";
} else {
    $comando = "\"$mysqldump\" --host=$host --user=$usuario --password=$contrasena $nombre_bd > \"$rutaArchivo\"";
}

// Ejecuta el comando
exec($comando, $output, $resultado);

// Verifica si se creó correctamente
if ($resultado !== 0) {
    echo json_encode([
        "success" => false,
        "message" => "Error al crear la copia de seguridad.",
        "comando" => $comando,
        "resultado" => $resultado
    ]);
    exit;
}

// Ahora fuerza la descarga del archivo al navegador
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . $nombreArchivo . '"');
header('Content-Length: ' . filesize($rutaArchivo));
header('Pragma: no-cache');
header('Expires: 0');
readfile($rutaArchivo);
exit;
?>
