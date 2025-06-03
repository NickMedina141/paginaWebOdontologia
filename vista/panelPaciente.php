<?php
session_start();
if (isset($_SESSION['email'])) {
  if ($_SESSION['rol'] != "2") {
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
  <title>Panel del Paciente - Clínica Dental</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../css/stylePanelPaciente.css">
  <link rel="icon" href="../img/logo-odontologia ICO.ico">

  <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"> -->
  <!-- <link rel="stylesheet" href="../css/common.css">
  <link rel="stylesheet" href="../css/dashboard-admin.css"> -->
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

    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center" href="../vista/pacienteAgendarCita.php">
                <i class="bi bi-calendar me-2"></i>
                <span>Agendas y citas</span>
              </a>
            </li>
          </ul>
          <div class="d-flex">
            <a href="../controlador/cerrarsesion.php" class="btn btn-sm btn-light bg-white/20 text-white rounded-pill d-flex align-items-center">
              <i class="bi bi-box-arrow-right me-1"></i>
              <span>Salir</span>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="container py-4 position-relative">
      <div class="fade-in-animation">
        <h1 class="fs-3 fw-bold mb-4">Panel del Paciente</h1>

        <div class="row g-4 mb-4">
          <div class="col-md-6">
            <div class="card h-100 bg-light-blue">
              <div class="card-body p-4">
                <h2 class="fs-4 fw-semibold mb-3 d-flex align-items-center">
                  <i class="bi bi-person text-primary me-2"></i>
                  Información de cuenta
                </h2>
                <div id="userInfo" class="d-flex">
                  <div class=" bg-opacity-20 p-2 rounded-circle me-3">
                    <i class="bi bi-person-circle fs-3 text-primary"></i>
                  </div>
                  <div>
                    <div class="row g-2">
                      <div class="col-6 text-secondary">Nombre:</div>
                      <div class="col-6" id="userNombre"></div>

                      <div class="col-6 text-secondary">Apellidos:</div>
                      <div class="col-6" id="userApellidos"></div>

                      <div class="col-6 text-secondary">Cédula:</div>
                      <div class="col-6" id="userCedula"></div>

                      <div class="col-6 text-secondary">Teléfono:</div>
                      <div class="col-6" id="userTelefono"></div>

                      <div class="col-6 text-secondary">Rol:</div>
                      <div class="col-6" id="userRol"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card h-100 bg-light-blue">
              <div class="card-body p-4">
                <h2 class="fs-4 fw-semibold mb-3 d-flex align-items-center">
                  <i class="bi bi-calendar text-primary me-2"></i>
                  Historial clínico del paciente
                </h2>
                <div class="mb-3">
                  <label class="text-secondary mb-1">Tratamientos</label>
                  <input type="text" id="tratamientos" class="form-control bg-white border-primary-subtle" value="Limpieza dental, Blanqueamiento, Ortodoncia" disabled>
                </div>

                <div class="mb-3">
                  <label class="text-secondary mb-1">Medicamentos</label>
                  <input type="text" id="medicamentos" class="form-control bg-white border-primary-subtle" value="Ibuprofeno 400mg, Amoxicilina 500mg" disabled>
                </div>

                <div class="mb-3">
                  <label class="text-secondary mb-1">Padecimientos</label>
                  <input type="text" id="padecimientos" class="form-control bg-white border-primary-subtle" value="Sensibilidad dental, Bruxismo" disabled>
                </div>

                <div class="mb-3">
                  <label class="text-secondary mb-1">Alergias</label>
                  <input type="text" id="alergias" class="form-control bg-white border-primary-subtle" value="Ninguna" disabled>
                </div>

                <div class="mb-3">
                  <label class="text-secondary mb-1">Antecedentes</label>
                  <input type="text" id="antecedentes" class="form-control bg-white border-primary-subtle" value="Hipertensión" disabled>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  <script src="../controlador/panelPaciente_Controlador.js"></script>

</body>
</html>