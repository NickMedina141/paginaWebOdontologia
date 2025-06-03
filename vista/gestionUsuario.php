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
    <title>Gestión de Usuarios - Clínica Dental</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

    <link rel="stylesheet" href="../css/styleGestionUsuario.css">
    <link rel="icon" href="../img/logo-odontologia ICO.ico">

</head>
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

    <div class="min-vh-100">


        <main class="container py-4 position-relative">
            <div class="fade-in-animation">
                <div class="d-flex align-items-center mb-4">
                    <a href="../vista/panelAdministrador.php" class="me-3 text-primary">
                        <i class="bi bi-chevron-left fs-4"></i>
                    </a>
                    <h1 class="fs-3 fw-bold mb-0">Gestión de Usuarios</h1>
                </div>

                <div class="card bg-light-blue mx-auto" style="max-width: 768px;">
                    <div class="card-body p-4">
                        <form id="searchForm" class="mb-4">
                            <div class="row g-3">
                                <div class="col-sm-8">
                                    <label for="documento" class="form-label small fw-medium">Número de
                                        documento</label>
                                    <input type="text" id="documento" maxlength="10" inputmode="numeric" pattern="\d*" class="form-control"
                                        placeholder="Ingrese el numero de documento del paciente">
                                </div>
                                <div class="col-sm-4 d-flex align-items-end">
                                    <button type="submit" id="searchButton"
                                        class="btn btn-primary rounded-pill w-100 d-flex align-items-center justify-content-center">
                                        <i class="bi bi-search me-2"></i>
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div id="userInfoSection" class="mt-4" style="display: none;">
                            <h2 class="fs-5 fw-semibold mb-3">Información del Usuario</h2>

                            <div id="viewUserInfo" class="card bg-white border-primary-subtle mb-3">
                                <div class="card-body p-3">
                                    <div class="row g-3">
                                        <div class="col-sm-6">
                                            <p class="small text-secondary mb-1">Nombre:</p>
                                            <p class="fw-medium mb-0" id="viewNombre"></p>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="small text-secondary mb-1">Apellidos:</p>
                                            <p class="fw-medium mb-0" id="viewApellidos"></p>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="small text-secondary mb-1">Cédula:</p>
                                            <p class="fw-medium mb-0" id="viewCedula"></p>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="small text-secondary mb-1">Email:</p>
                                            <p class="fw-medium mb-0" id="viewEmail"></p>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="small text-secondary mb-1">Teléfono:</p>
                                            <p class="fw-medium mb-0" id="viewTelefono"></p>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="small text-secondary mb-1">Sexo:</p>
                                            <p class="fw-medium mb-0" id="viewSexo"></p>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="small text-secondary mb-1">Edad:</p>
                                            <p class="fw-medium mb-0" id="viewEdad"></p>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="small text-secondary mb-1">Rol:</p>
                                            <p class="fw-medium mb-0" id="viewRol"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="editUserInfo" class="card bg-white border-primary-subtle mb-3"
                                style="display: none;">
                                <div class="card-body p-3">
                                    <div class="row g-3">
                                        <div class="col-sm-6">
                                            <label for="editNombre" class="form-label small fw-medium">Nombre:</label>
                                            <input type="text" class="form-control" id="editNombre" required>
                                        </div>
                                        <div class="col-sm-6">
                                            <label for="editApellidos"
                                                class="form-label small fw-medium">Apellidos:</label>
                                            <input type="text" class="form-control" id="editApellidos" required>
                                        </div>
                                        <div class="col-sm-6">
                                            <label for="editCedula" class="form-label small fw-medium">Cédula:</label>
                                            <input type="text" class="form-control" id="editCedula" required>
                                        </div>
                                        <div class="col-sm-6">
                                            <label for="editEmail" class="form-label small fw-medium">Email:</label>
                                            <input type="email" class="form-control" id="editEmail" required>
                                        </div>
                                        <div class="col-sm-6">
                                            <label for="editTelefono"
                                                class="form-label small fw-medium">Teléfono:</label>
                                            <input type="text" class="form-control" id="editTelefono" required>
                                        </div>
                                        <div class="col-sm-6">
                                            <label for="editSexo" class="form-label small fw-medium">Sexo:</label>
                                            <input type="text" class="form-control" id="editSexo" required>
                                        </div>
                                        <div class="col-sm-6">
                                            <label for="editEdad" class="form-label small fw-medium">Edad:</label>
                                            <input type="datetime-local" class="form-control" id="editEdad" required>
                                        </div>
                                        <div class="col-sm-6">
                                            <label for="editRol" class="form-label small fw-medium">Rol:</label>
                                            <input type="text" class="form-control" id="editRol" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div id="viewButtons" class="d-flex flex-column flex-sm-row gap-3">
                                        <div class="row">
                                            <div class="col-6">
                                                <button id="updateButton"
                                                    class="btn btn-primary rounded-pill">Actualizar</button>
                                            </div>
                                            <div class="col-6">
                                                <button style="display: none;" id="confirmButton" class="btn btn-primary rounded-pill">
                                                    Confirmar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="editButtons" class="col-6">
                                    <div class="d-flex flex-column flex-sm-row gap-3">
                                        <div class="row">

                                            <div class="col-6"> <button id="cancelButton"
                                                    class="btn btn-secondary rounded-pill">Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="respuestas"></div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/gestionUsuario.js"></script>
    <script src="../js/gestionUsuarioValidaciones.js"></script>
</body>

</html>