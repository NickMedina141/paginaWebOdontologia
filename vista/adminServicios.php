<?php
session_start();
if (isset($_SESSION['email'])) {
  if ($_SESSION['rol'] != "0") {
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
  <title>Servicios</title>
  <!-- Importación de estilos de Bootstrap y Bootstrap Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
  <!-- Importación de estilos personalizados -->
  <link rel="stylesheet" href="../css/styleServicios.css">
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
          <h1 class="fs-3 fw-bold mb-0 ms-3">Agregar Servicios</h1>
        </div>

        <!-- Área de contenido principal -->
        <div id="mainContent" class="bg-light rounded-3 p-4 mx-auto" style="max-width: 900px;">
          <!-- Vista de lista de servicios -->
          <div id="serviciosListView">
            <h2 class="fs-4 fw-semibold mb-4">Listado de servicios</h2>

            <!-- Tabla de servicios -->
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th class="text-secondary">ID</th>
                    <th class="text-secondary">Nombre</th>
                    <th class="text-secondary">Descripcion</th>
                    <th class="text-secondary">Costo</th>
                    <th class="text-secondary text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody id="servicioTableBody">
                  <!-- Los servicios se añadirán aquí dinámicamente -->
                </tbody>
              </table>
            </div>

            <!-- Botón para agregar un nuevo servicio-->
            <div class="text-center mt-4">
              <button id="addServicioBtn" class="btn btn-primary rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#registroServicio">
                <i class="bi bi-plus-lg me-2"></i>
                Agregar servicio
              </button>
            </div>
          </div>
        </div>


        <!-- Área de contenido principal -->
        <div id="serviciosEdit" class="bg-light rounded-3 p-4 mx-auto" style="max-width: 900px; display: none;">
          <!-- Vista de lista de servicios -->
          <div class="d-flex align-items-center mb-4">
            <a href="../vista/adminServicios.php" class="text-primary">
              <i class="bi bi-chevron-left fs-4"></i>
            </a>
            <h1 class="fs-3 fw-bold mb-0 ms-3">Servicios</h1>
          </div>

          <div id="serviciosEditor">
            <input type="hidden" id="idEdit">

            <label for="nombre">Nombre servicio:</label>
            <input type="text" class="form-control" name="nombre" id="nombreEdit">

            <label for="descripcion">Descripción:</label>
            <input type="text" class="form-control" name="descripcion" id="descripcionEdit">

            <label for="costo">Costo:</label>
            <input type="number" class="form-control" name="costo" step="0.01" id="costoEdit">

            <!-- Botón para agregar un nuevo servicio-->
            <div class="text-center mt-4">
              <button id="updateServicioBtn" class="btn btn-primary rounded-pill px-4">
                <i class="bi bi-arrow-up-circle me-2"></i>
                Actualizar
              </button>
            </div>
          </div>
        </div>


      </div>
    </main>
  </div>

  <div class="container-fluid">
    <!-- Inicio ventana modal Registro -->
    <!-- The Modal -->
    <div class="modal fade" id="registroServicio" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centeted">
        <div class="modal-content">

          <button type="button" class="btn border-0 bg-transparent position-absolute star-0 top-0 p-3" data-bs-dismiss="modal" aria-label="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-left">
              <path d="m15 18-6-6 6-6" style="color: #000000;" />
            </svg>
          </button>
          <div class="modal-body">

            <h4 class="fw-bold mb-3">Registro de servicio</h4>
            <p>Por favor rellene todos los datos correctamente</p>

            <form action="../controlador/servicios_Controlador.php" method="post">
              <div class="mb-3 text-start">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese el nombre del servicio" required>
              </div>
              <div class="mb-3 text-start">
                <label for="descripcion" class="form-label">Descripcion</label>
                <input type="text" class="form-control" name="descripcion" id="descripcion" placeholder="Ingrese la descripcion del servicio" required>
              </div>
              <div class="mb-3 text-start">
                <label for="costo" class="form-label">Costo</label>
                <input type="number" class="form-control" name="costo" id="costo" step="0.01" min="0" placeholder="Ingrese el costo del servicio" required>
              </div>
              <button type="submit" class="btn btn-primary">Guardar servicio</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
  <!-- Importación de scripts de Bootstrap y personalizados -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../controlador/adminServicios_Controlador.js"></script>
  <script src="../js/serviciosValidaciones.js"></script>
</body>

</html>