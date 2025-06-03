<?php
// revisar
session_start();
if (isset($_SESSION['email'])) {
  if ($_SESSION['rol'] == "0" ||   $_SESSION["rol"] == "1") {
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
  <title>Agendas y Citas - Clínica Dental</title>
  <!-- Importación de estilos de Bootstrap y Bootstrap Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
  <!-- Importación de estilos personalizados -->
  <link rel="stylesheet" href="../css/styleAgendarCita.css">
  <link rel="icon" href="../img/logo-odontologia ICO.ico">

</head>

<body>
  <!-- Contenedor de notificaciones toast -->
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
    <!-- Logo de fondo con baja opacidad -->
    <div class="position-absolute w-100 h-100 d-flex align-items-center justify-content-center opacity-10 pointer-events-none">
      <div style="width: 400px; height: 400px;" class="position-relative">
        <img src="../img/logo.png" alt="Dra. Diana Noriega Logo" class="img-fluid">
      </div>
    </div>

    <!-- Contenido principal -->
    <main class="container py-4 position-relative">
      <div class="fade-in-animation">
        <!-- Encabezado con botón de regreso -->
        <div class="d-flex align-items-center mb-4">
          <a href="../vista/panelPaciente.php" class="text-primary">
            <i class="bi bi-chevron-left fs-4"></i>
          </a>
          <h1 class="fs-3 fw-bold mb-0 ms-3">Agendas y Citas</h1>
        </div>

        <!-- Área de contenido principal -->
        <div id="mainContent" class="bg-light rounded-3 p-4 mx-auto" style="max-width: 900px;">
          <!-- Vista de lista de citas -->
          <div id="citasListView">
            <h2 class="fs-4 fw-semibold mb-4">Listado de Citas del paciente</h2>

            <!-- Tabla de citas -->
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th class="text-secondary">Servicio odontológico</th>
                    <th class="text-secondary">Odontólogo</th>
                    <th class="text-secondary">Fecha</th>
                    <th class="text-secondary">Hora</th>
                    <th class="text-secondary">Estado</th>
                    <th class="text-secondary text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody id="citasTableBody">
                  <!-- Las citas se añadirán aquí dinámicamente -->
                </tbody>
              </table>
            </div>

            <!-- Botón para agregar nueva cita -->
            <div class="text-center mt-4">
              <button id="addCitaBtn" class="btn btn-primary rounded-pill px-4">
                <i class="bi bi-plus-lg me-2"></i>
                Agregar Cita
              </button>
            </div>
          </div>

          <!-- Paso 1: Selección de servicio -->
          <div id="agendarCitaStep1" style="display: none;">
            <div class="d-flex align-items-center mb-4">
              <a href="#" id="backToListBtn" class="text-primary">
                <i class="bi bi-chevron-left fs-4"></i>
              </a>
              <h2 class="fs-4 fw-semibold mb-0 ms-3">Agendar Cita</h2>
            </div>

            <h3 class="fs-5 fw-semibold mb-4">Servicios Odontológicos</h3>

            <!-- Tarjetas de servicios odontológicos -->
            <div class="row g-3">

            </div>

            <!-- Botones de navegación -->
            <div class="d-flex justify-content-between mt-4">
              <button id="cancelServiceBtn" class="btn btn-light rounded-pill px-4">Cancelar</button>
              <button id="nextToDateTimeBtn" class="btn btn-primary rounded-pill px-4">
                Siguiente
                <i class="bi bi-chevron-right ms-1"></i>
              </button>
            </div>
          </div>

          <!-- Paso 2: Selección de fecha y hora -->
          <div id="agendarCitaStep2" style="display: none;">
            <div class="d-flex align-items-center mb-4">
              <a href="#" id="backToServiceBtn" class="text-primary">
                <i class="bi bi-chevron-left fs-4"></i>
              </a>
              <h2 class="fs-4 fw-semibold mb-0 ms-3">Agendar Cita</h2>
            </div>

            <h3 class="fs-5 fw-semibold mb-3">Seleccione Fecha y Hora</h3>

            <!-- Selección de fecha -->
            <div class="mb-4">
              <p class="mb-2">Seleccione una fecha:</p>
              <div class="row g-2" id="dateOptions">
                <!-- Las opciones de fecha se generarán dinámicamente -->
              </div>
            </div>

            <!-- Selección de hora -->
            <div class="mb-4">
              <p class="mb-2">Seleccione una hora:</p>
              <div class="row g-2" id="timeOptions">
                <!-- Las opciones de hora se generarán dinámicamente -->
              </div>
            </div>

            <!-- Botones de navegación -->
            <div class="d-flex justify-content-between mt-4">
              <button id="backToServiceBtnBottom" class="btn btn-light rounded-pill px-4">
                <i class="bi bi-chevron-left me-1"></i>
                Anterior
              </button>
              <button id="confirmAppointmentBtn" class="btn btn-primary rounded-pill px-4">Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../controlador/pacienteAgendarCita_Controlador.js"></script>

</body>

</html>