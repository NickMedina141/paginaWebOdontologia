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
  <title>Procedimientos - Clínica Dental</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../css/styleProcedimiento.css">
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
          <h1 class="fs-3 fw-bold mb-0">Procedimientos</h1>
        </div>

        <div class="card bg-light-blue mx-auto" style="max-width: 900px;">
          <div class="card-body p-4">
            <div class="mb-3">
              <h2 class="fs-5 fw-semibold">Paciente: <span id="patientName"></span></h2>
            </div>

            <div id="procedimientosListView">
              <div class="mb-3">
                <h3 class="fs-6 fw-medium mb-2">Historial de Procedimientos</h3>

                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr>
                        <th class="small fw-medium text-secondary">ID Cita</th>
                        <th class="small fw-medium text-secondary">Descripción</th>
                        <th class="small fw-medium text-secondary text-end">Acciones</th>
                      </tr>
                    </thead>
                    <tbody id="procedimientosTableBody">
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="text-center">
                <button id="addProcedimientoBtn" class="btn btn-primary rounded-pill d-inline-flex align-items-center">
                  <i class="bi bi-plus-lg me-2"></i>
                  Agregar Procedimiento
                </button>
              </div>
            </div>

            <div id="addProcedimientoForm" style="display: none;">
              <div class="card bg-white border-primary-subtle mb-3">
                <div class="card-body p-3">
                  <h3 class="fs-6 fw-medium mb-3">Agregar Procedimiento</h3>

                  <div class="mb-3">
                    <label class="form-label small fw-medium">Seleccione una cita</label>
                    <div class="row g-2" id="citasContainer">
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="descripcion" class="form-label small fw-medium">Descripción del procedimiento</label>
                    <textarea id="descripcion" class="form-control" rows="3"
                      placeholder="Describa el procedimiento realizado"></textarea>
                  </div>

                  <div class="d-flex flex-column flex-sm-row gap-3">
                    <button id="confirmAddBtn" class="btn btn-primary rounded-pill">Confirmar</button>
                    <button id="cancelAddBtn" class="btn btn-secondary rounded-pill">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>

            <div id="editProcedimientoForm" style="display: none;">
              <div class="card bg-white border-primary-subtle mb-3">
                <div class="card-body p-3">
                  <h3 class="fs-6 fw-medium mb-3">Modificar Procedimiento</h3>

                  <div class="mb-3">
                    <label for="editDescripcion" class="form-label small fw-medium">Descripción del procedimiento</label>
                    <textarea id="editDescripcion" class="form-control" rows="3"
                      placeholder="Describa el procedimiento realizado"></textarea>
                  </div>

                  <div class="d-flex flex-column flex-sm-row gap-3">
                    <button id="confirmEditBtn" class="btn btn-primary rounded-pill">Confirmar</button>
                    <button id="cancelEditBtn" class="btn btn-secondary rounded-pill">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../controlador/adminProcedimiento_Controlador.js"></script>
  <script src="../js/procedimientosValidaciones.js"></script>
</body>

</html>