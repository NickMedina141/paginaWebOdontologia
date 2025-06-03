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
    <title>Reportes - Clínica Dental</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../css/styleReporte.css">
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
                    <a href="../vista/panelAdministrador.php" class="me-3 text-primary">
                        <i class="bi bi-chevron-left fs-4"></i>
                    </a>
                    <h1 class="fs-3 fw-bold mb-0" id="pageTitle">Reportes</h1>
                </div>

                <div class="card bg-light-blue mx-auto" style="max-width: 900px;">
                    <div class="card-body p-4">
                        <div id="reportsListView">
                            <h2 class="fs-5 fw-semibold mb-3">Listado de Reportes</h2>

                            <div class="table-responsive mb-4">
                                <table class="table">
                                    <thead class="bg-light">
                                        <tr>
                                            <th class="small fw-medium text-secondary">ID Reporte</th>
                                            <th class="small fw-medium text-secondary">Fecha de Creación</th>
                                            <th class="small fw-medium text-secondary">Mes</th>
                                            <th class="small fw-medium text-secondary text-end">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="reportsTableBody">
                                    </tbody>
                                </table>
                            </div>

                            <div class="text-center">
                                <button id="addReportBtn" class="btn btn-primary rounded-pill d-inline-flex align-items-center">
                                    <i class="bi bi-plus-lg me-2"></i>
                                    Agregar Reporte
                                </button>
                            </div>
                        </div>

                        <div id="addReportView" style="display: none;">
                            <h2 class="fs-5 fw-semibold mb-3">Seleccione un Mes</h2>

                            <div class="row g-3 mb-4" id="monthsGrid">
                            </div>

                            <div class="d-flex flex-column flex-sm-row gap-3">
                                <button id="confirmAddBtn" class="btn btn-primary rounded-pill flex-grow-1">Confirmar</button>
                                <button id="cancelAddBtn" class="btn btn-danger rounded-pill flex-grow-1">Cancelar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
    <script src="../controlador/reportes_controlador.js"></script>
</body>

</html>