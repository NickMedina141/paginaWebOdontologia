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
  <title>Subir historiales Clínicos</title>
  <!-- Importación de estilos de Bootstrap y Bootstrap Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../css/styleSubidaHistorial.css">
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
          <a href="../vista/panelAdministrador.php" class="text-primary">
            <i class="bi bi-chevron-left fs-4"></i>
          </a>
          <h1 class="fs-3 fw-bold mb-0 ms-3">Subida de Historial Clinico</h1>
        </div>

        <!-- Área de contenido principal -->
        <div id="mainContent" class="bg-light rounded-3 p-4 mx-auto" style="max-width: 900px;">
          <!-- Vista de lista de citas -->
          <div id="pacientesListView">
            <h2 class="fs-4 fw-semibold mb-4">Listado de Pacientes por cargar su Historial clinico</h2>

            <!-- Tabla de citas -->
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th class="text-secondary">Cedula</th>
                    <th class="text-secondary">Nombre</th>
                    <th class="text-secondary">Apellido</th>
                    <th class="text-secondary">Genero</th>
                    <th class="text-secondary">Estado</th>
                    <th class="text-secondary text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody id="pacientesTableBody">
                  <!-- Las citas se añadirán aquí dinámicamente -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <div class="container-fluid">
    <!-- Inicio ventana modal Registro -->
    <!-- The Modal -->
    <div class="modal fade" id="subidaHistorial" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

          <button type="button" class="btn border-0 bg-transparent position-absolute start-0 top-0 p-3" data-bs-dismiss="modal" aria-label="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-left">
              <path d="m15 18-6-6 6-6" style="color: #000000;" />
            </svg>
          </button>
          <div class="modal-body">
            <div class="logo_circle">
              <img src="../img/logo.png" alt="Logo">
            </div>

            <h4 class="fw-bold mb-3">Historial Clínico</h4>
            <p>Por fabor complete su información clínica</p>

            <form action="../controlador/subirHistorial_Controlador.php" method="post">
              <input type="hidden" name="cedula" id="cedula">
              <div class="mb-3 text-start">
                <label for="tratamientos" class="form-label">Tratamientos</label>
                <input type="text" class="form-control" name="tratamientos" id="tratamientos" placeholder="Ej:Limpieza dental, Blanqueamiento, Ortodoncia" required>
              </div>
              <div class="mb-3 text-start">
                <label for="medicamentos" class="form-label">Medicamentos</label>
                <input type="text" class="form-control" name="medicamentos" id="medicamentos" placeholder="Ej: Ibuprofeno 400mg, Amoxicilina 500 mg" required>
              </div>
              <div class="mb-3 text-start">
                <label for="padecimientos" class="form-label">Padecimientos</label>
                <input type="text" class="form-control" name="padecimientos" id="padecimientos" placeholder="Ej: Sensibilidad dental, Bruxismo" required>
              </div>
              <div class="mb-3 text-start">
                <label for="alergias" class="form-label">Alergias</label>
                <input type="text" class="form-control" name="alergias" id="alergias" placeholder="Ej: Penicilina, Látex" required>
              </div>
              <div class="mb-3 text-start">
                <label for="antecedentes" class="form-label">Antecedentes médicos</label>
                <input type="text" class="form-control" name="antecedentes" id="antecedentes" placeholder="Ej: Hipertensión, Diabetes" required>
              </div>
              <button type="submit" id="submitGuardar" class="btn btn-primary">Guardar información</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin ventana modal inicio de sesion-->
  </div>

  <!-- Importación de scripts de Bootstrap y personalizados -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../controlador/subidaHistorial_Controlador.js"></script>
  <script src="../js/subidaHistorialValidaciones.js"></script>
</body>

</html>