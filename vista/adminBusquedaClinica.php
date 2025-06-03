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
  <title>Búsqueda Clínica - Clínica Dental</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../css/styleBusquedaClinica.css">
  <link rel="icon" href="../img/logo-odontologia ICO.ico">

</head>

<body>

  <div id="notification"></div>

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
          <a href="../vista/panelAdministrador.php" class="me-3 text-primary">
            <i class="bi bi-chevron-left fs-4"></i>
          </a>
          <h1 class="fs-3 fw-bold mb-0">Búsqueda Clínica</h1>
        </div>

        <div class="card bg-light-blue mx-auto" style="max-width: 768px;">
          <div class="card-body p-4">
            <form id="searchForm" class="mb-4">
              <div class="row g-3">
                <div class="col-sm-8">
                  <label for="documento" class="form-label small fw-medium">Número de documento</label>
                  <input type="text" id="documento" maxlength="10" inputmode="numeric" pattern="\d*" class="form-control"
                    placeholder="Ingrese el numero de documento del paciente">
                </div>
                <div class="col-sm-4 d-flex align-items-end">
                  <button type="submit" class="btn btn-primary rounded-pill w-100 d-flex align-items-center justify-content-center">
                    <i class="bi bi-search me-2"></i>
                    Buscar
                  </button>
                </div>
              </div>
            </form>

            <div id="patientInfoSection" class="mt-4" style="display: none;">
              <h2 class="fs-5 fw-semibold mb-3">Información del Paciente</h2>

              <div id="viewUserInfo" class="card bg-white border-primary-subtle mb-3">
                <div class="card-body p-3">
                  <div class="row g-3">
                    <div class="col-sm-6">
                      <p class="small text-secondary mb-1">Nombre:</p>
                      <p class="fw-medium mb-0" id="patientName">Carlos Rodríguez</p>
                    </div>
                    <div class="col-sm-6">
                      <p class="small text-secondary mb-1">Cédula:</p>
                      <p class="fw-medium mb-0" id="patientCedula">123456789</p>
                    </div>
                    <div class="col-sm-6">
                      <p class="small text-secondary mb-1">Email:</p>
                      <p class="fw-medium mb-0" id="patientEmail">carlos@example.com</p>
                    </div>
                    <div class="col-sm-6">
                      <p class="small text-secondary mb-1">Teléfono:</p>
                      <p class="fw-medium mb-0" id="patientTelefono">555-123-4567</p>
                    </div>
                    <div class="col-sm-6">
                      <p class="small text-secondary mb-1">Sexo:</p>
                      <p class="fw-medium mb-0" id="patientSexo">Masculino</p>
                    </div>
                    <div class="col-sm-6">
                      <p class="small text-secondary mb-1">Edad:</p>
                      <p class="fw-medium mb-0" id="patientEdad">35</p>
                    </div>
                  </div>
                </div>
              </div>


              <div class="d-flex flex-column flex-sm-row gap-3">
                <a href="../vista/adminHistorialClinico.php?cedula=<?php echo $_SESSION['cedula']; ?>" class="btn btn-primary rounded-pill btn-historial" data-cedula="">Historial Clínico</a>
                <a href="../vista/adminProcedimientos.php?cedula=<?php echo $_SESSION['cedula']; ?>" class="btn btn-primary rounded-pill btn-procedimientos" data-cedula="">Procedimientos</a>
              </div>
            </div>
            <div id="respuestas"></div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../js/busquedaClinica.js"></script>
  <script src="../js/busquedaClinicaValidaciones.js"></script>
</body>

</html>