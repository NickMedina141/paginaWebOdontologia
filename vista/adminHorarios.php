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
  <title>Gestión de Horarios - Clínica Dental Dra. Diana Noriega</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="../css/styleHorario.css">
  <link rel="icon" href="../img/logo-odontologia ICO.ico">


  </style>
</head>
<body>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Background Logo -->
    <div class="page-content">
      <div class="container py-8 z-10 relative">
        <div class="flex items-center mb-6">
          <a href="panelAdministrador.php" class="mr-4">
            <i class="fas fa-chevron-left text-primary text-xl"></i>
          </a>
          <h1 class="text-2xl font-bold text-gray-800">Gestión de Horarios</h1>
        </div>

        <div class="bg-primary-light-20 rounded-lg p-6 max-w-4xl mx-auto">
          <div class="flex justify-between items-center mb-6">
            
            <div class="flex items-center space-x-2">
              <button id="prevMonthBtn" class="btn bg-white text-gray-800 hover:bg-gray-100">
                <i class="fas fa-chevron-left"></i>
              </button>
              <span id="currentMonthYear" class="text-lg font-medium text-gray-800">Mayo 2023</span>
              <button id="nextMonthBtn" class="btn bg-white text-gray-800 hover:bg-gray-100">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div class="calendar-header">
            <div class="text-center font-medium text-gray-600">Lun</div>
            <div class="text-center font-medium text-gray-600">Mar</div>
            <div class="text-center font-medium text-gray-600">Mié</div>
            <div class="text-center font-medium text-gray-600">Jue</div>
            <div class="text-center font-medium text-gray-600">Vie</div>
            <div class="text-center font-medium text-gray-600">Sáb</div>
          </div>

          <div id="calendar" class="calendar">
          </div>
          

          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Configuración de Horarios</h3>
            
            <div id="dayConfigSection" class="hidden">
              <div class="bg-white rounded-lg p-4 mb-4">
                <h4 id="selectedDateDisplay" class="font-medium text-gray-800 mb-2">Configuración para el 15 de Mayo, 2023</h4>
                
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-600 mb-1">
                    Estado del día
                  </label>
                  <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                      <input type="radio" name="dayStatus" value="available" class="form-radio text-primary" checked>
                      <span class="ml-2 text-gray-700">Disponible</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="radio" name="dayStatus" value="blocked" class="form-radio text-red-500">
                      <span class="ml-2 text-gray-700">Bloqueado</span>
                    </label>
                  </div>
                </div>
                
                <div id="hoursSection" class="mb-4">
                  <label class="block text-sm font-medium text-gray-600 mb-1">
                    Horas disponibles
                  </label>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="form-checkbox text-primary" value="08:00">
                      <span class="ml-2 text-gray-700">8:00 AM</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="form-checkbox text-primary" value="09:00">
                      <span class="ml-2 text-gray-700">9:00 AM</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="form-checkbox text-primary" value="10:00">
                      <span class="ml-2 text-gray-700">10:00 AM</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="form-checkbox text-primary" value="11:00">
                      <span class="ml-2 text-gray-700">11:00 AM</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="form-checkbox text-primary" value="14:00">
                      <span class="ml-2 text-gray-700">2:00 PM</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="form-checkbox text-primary" value="15:00">
                      <span class="ml-2 text-gray-700">3:00 PM</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="form-checkbox text-primary" value="16:00">
                      <span class="ml-2 text-gray-700">4:00 PM</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="form-checkbox text-primary" value="17:00">
                      <span class="ml-2 text-gray-700">5:00 PM</span>
                    </label>
                  </div>
                </div>
                
                <div class="flex justify-end">
                  <button id="saveDayConfigBtn" class="btn btn-custom rounded">
                    Guardar Configuración
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="notification" class="notification">
    <span id="notificationMessage"></span>
  </div>
  <script src="../controlador/adminHorarios_Controlador.js"></script>
</body>
</html>
