<?php
session_start();
if (isset($_SESSION['email'])) {
  if ($_SESSION['rol'] == "2") {
    header("Location: ../index2.php");
    exit; // Muy recomendable para detener la ejecución del script
  }
} else {
  header("Location: ../index2.php");
  exit; // Muy recomendable para detener la ejecución del script
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historial Clínico - Clínica Dental</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../css/styleHistorialClinico.css">
  <link rel="icon" href="../img/logo-odontologia ICO.ico">

</head>
<body>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div id="notificationToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header" id="toastHeader">
        <strong class="me-auto" id="toastTitle">Notificación</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body" id="toastMessage"></div>
    </div>
  </div>

  <div class="min-vh-100 bg-white">
    <!-- Background Logo -->
    <div class="position-absolute w-100 h-100 d-flex align-items-center justify-content-center opacity-10 pointer-events-none">
      <div style="width: 400px; height: 400px;" class="position-relative">
        <img src="../img/logo.png" alt="Dra. Diana Noriega Logo" class="img-fluid">
      </div>
    </div>

    <main class="container py-4 position-relative">
      <div class="fade-in-animation">
        <div class="d-flex align-items-center mb-4">
          <a href="../vista/adminBusquedaClinica.php" class="me-3 text-primary">
            <i class="bi bi-chevron-left fs-4"></i>
          </a>
          <h1 class="fs-3 fw-bold mb-0">Historial Clínico</h1>
        </div>

        <div class="card bg-light-blue mx-auto" style="max-width: 768px;">
          <div class="card-body p-4">
            <div class="mb-3">
              <h2 class="fs-5 fw-semibold">Paciente: <span id="patientName"></span></h2>
            </div>

            <form id="clinicalForm" method="post" action="../controlador/adminHistorialClinico_Controlador.php">
              
              <input type="hidden" name="cedula" value="" id="cedulaOculta">

              <div class="mb-3">
                <label for="tratamientos" class="form-label small fw-medium">Tratamientos</label>
                <input type="text" class="form-control bg-white border-primary-subtle" name="tratamientos" id="tratamientos" 
                  placeholder="Ej: Limpieza dental, Blanqueamiento, Ortodoncia">
              </div>

              <div class="mb-3">
                <label for="medicamentos" class="form-label small fw-medium">Medicamentos</label>
                <input type="text" class="form-control bg-white border-primary-subtle" name="medicamentos" id="medicamentos" 
                  placeholder="Ej: Ibuprofeno 400mg, Amoxicilina 500mg">
              </div>

              <div class="mb-3">
                <label for="padecimientos" class="form-label small fw-medium">Padecimientos</label>
                <input type="text" class="form-control bg-white border-primary-subtle" name="padecimientos" id="padecimientos" 
                  placeholder="Ej: Sensibilidad dental, Bruxismo">
              </div>

              <div class="mb-3">
                <label for="alergias" class="form-label small fw-medium">Alergias</label>
                <input type="text" class="form-control bg-white border-primary-subtle" name ="alergias" id="alergias" 
                  placeholder="Ej: Penicilina, Látex">
              </div>

              <div class="mb-3">
                <label for="antecedentes" class="form-label small fw-medium">Antecedentes médicos</label>
                <input type="text" class="form-control bg-white border-primary-subtle" name = "antecedentes" id="antecedentes" 
                  placeholder="Ej: Hipertensión, Diabetes">
              </div>

              <div class="d-flex flex-column flex-sm-row gap-3 pt-3">
                <button type="submit" class="btn btn-primary rounded-pill flex-grow-1">Confirmar</button>
                <a href="../vista/adminBusquedaClinica.php" class="btn btn-secondary rounded-pill flex-grow-1">Cancelar</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../controlador/adminHistorialClinico_Controlador.js"></script>
  <script src="../js/historialClinicoValidaciones.js"></script>
</body>
</html>
