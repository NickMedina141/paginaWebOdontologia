// Funciones comunes para todas las páginas
function showNotification(message, type) {
  const toastEl = document.getElementById("notificationToast")
  const toastHeader = document.getElementById("toastHeader")
  const toastTitle = document.getElementById("toastTitle")
  const toastMessage = document.getElementById("toastMessage")

  if (!toastEl || !toastHeader || !toastMessage) return

  const toast = new bootstrap.Toast(toastEl)

  if (type === "success") {
    toastTitle.textContent = "Éxito"
    toastHeader.classList.remove("bg-danger", "text-white")
    toastHeader.classList.add("bg-success", "text-white")
  } else {
    toastTitle.textContent = "Error"
    toastHeader.classList.remove("bg-success", "text-white")
    toastHeader.classList.add("bg-danger", "text-white")
  }

  toastMessage.textContent = message
  toast.show()
}

// Función para añadir efectos hover a las filas de tablas
function setupTableRowHoverEffects() {
  document.querySelectorAll("tbody tr").forEach((row) => {
    row.addEventListener("mouseenter", function () {
      const actions = this.querySelector(".opacity-0")
      if (actions) {
        actions.classList.remove("opacity-0")
        actions.classList.add("opacity-100")
      }
    })

    row.addEventListener("mouseleave", function () {
      const actions = this.querySelector(".opacity-100")
      if (actions && actions.classList.contains("group-hover-opacity-100")) {
        actions.classList.remove("opacity-100")
        actions.classList.add("opacity-0")
      }
    })
  })
}

// Inicializar elementos comunes cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Configurar efectos hover para tablas si existen
  setupTableRowHoverEffects()
})


document.addEventListener("DOMContentLoaded", function() {
      // Elementos DOM - Vistas
      const citasListView = document.getElementById("citasListView");
      const agendarCitaStep1 = document.getElementById("agendarCitaStep1");
      const agendarCitaStep2 = document.getElementById("agendarCitaStep2");
      
      // Elementos DOM - Botones
      const addCitaBtn = document.getElementById("addCitaBtn");
      const backToListBtn = document.getElementById("backToListBtn");
      const cancelServiceBtn = document.getElementById("cancelServiceBtn");
      const nextToDateTimeBtn = document.getElementById("nextToDateTimeBtn");
      const backToServiceBtn = document.getElementById("backToServiceBtn");
      const backToServiceBtnBottom = document.getElementById("backToServiceBtnBottom");
      const confirmAppointmentBtn = document.getElementById("confirmAppointmentBtn");
      
      // Elementos DOM - Contenido
      const citasTableBody = document.getElementById("citasTableBody");
      const dateOptions = document.getElementById("dateOptions");
      const timeOptions = document.getElementById("timeOptions");
      
      // Elementos para notificaciones toast
      const toastEl = document.getElementById("notificationToast");
      const toast = new bootstrap.Toast(toastEl);
      const toastHeader = document.getElementById("toastHeader");
      const toastTitle = document.getElementById("toastTitle");
      const toastMessage = document.getElementById("toastMessage");
      
      // Variables de estado
      let selectedService = null; // Almacena el servicio seleccionado
      let selectedDate = null;    // Almacena la fecha seleccionada
      let selectedTime = null;    // Almacena la hora seleccionada
      
      // Datos de ejemplo de citas
      let citas = [
        {
          id: 1,
          servicio: "Limpieza dental",
          fecha: "2023-05-15",
          hora: "10:30",
          odontologo: "Dra. Diana Noriega",
          estado: "Completada"
        },
        {
          id: 2,
          servicio: "Revisión de ortodoncia",
          fecha: "2023-05-28",
          hora: "15:00",
          odontologo: "Dr. Carlos Mendoza",
          estado: "Pendiente"
        },
        {
          id: 3,
          servicio: "Extracción de muela",
          fecha: "2023-06-05",
          hora: "11:15",
          odontologo: "Dra. Diana Noriega",
          estado: "Pendiente"
        }
      ];
      
      // Cargar citas desde localStorage si están disponibles
      const storedCitas = localStorage.getItem("appointments");
      if (storedCitas) {
        citas = JSON.parse(storedCitas);
      }
      
      // Inicializar la página
      renderCitas();
      
      // Event Listeners - Navegación
      
      // Botón para agregar nueva cita
      addCitaBtn.addEventListener("click", function() {
        showAgendarCitaStep1();
      });
      
      // Botón para volver a la lista desde el paso 1
      backToListBtn.addEventListener("click", function() {
        localStorage.removeItem("editingAppointmentId");
        showCitasListView();
      });
      
      // Botón para cancelar la selección de servicio
      cancelServiceBtn.addEventListener("click", function() {
        localStorage.removeItem("editingAppointmentId");
        showCitasListView();
      });
      
      // Botón para avanzar al paso 2 (selección de fecha y hora)
      nextToDateTimeBtn.addEventListener("click", function() {
        if (!selectedService) {
          showNotification("Por favor seleccione un servicio", "error");
          return;
        }
        
        showAgendarCitaStep2();
      });
      
      // Botón para volver al paso 1 desde el paso 2
      backToServiceBtn.addEventListener("click", function() {
        showAgendarCitaStep1();
      });
      
      // Botón alternativo para volver al paso 1 desde el paso 2
      backToServiceBtnBottom.addEventListener("click", function() {
        showAgendarCitaStep1();
      });
      
      // Botón para confirmar la cita
      confirmAppointmentBtn.addEventListener("click", function() {
        if (!selectedDate || !selectedTime) {
          showNotification("Por favor seleccione fecha y hora", "error");
          return;
        }
        
        // Verificar si estamos editando una cita existente
        const editingId = localStorage.getItem("editingAppointmentId");
        
        if (editingId) {
          updateAppointment(Number(editingId));
        } else {
          addNewAppointment();
        }
      });
      
      // Agregar evento de clic a las tarjetas de servicios
      document.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("click", function() {
          // Quitar clase seleccionada de todas las tarjetas
          document.querySelectorAll(".service-card").forEach(c => {
            c.classList.remove("border-primary");
          });
          
          // Agregar clase seleccionada a la tarjeta clicada
          this.classList.add("border-primary");
          
          // Almacenar servicio seleccionado
          selectedService = {
            name: this.getAttribute("data-service"),
            price: this.getAttribute("data-price")
          };
        });
      });
      
      // Funciones - Gestión de vistas
      
      // Mostrar vista de lista de citas
      function showCitasListView() {
        citasListView.style.display = "block";
        agendarCitaStep1.style.display = "none";
        agendarCitaStep2.style.display = "none";
        
        // Resetear selecciones
        selectedService = null;
        selectedDate = null;
        selectedTime = null;
        
        // Limpiar ID de edición
        localStorage.removeItem("editingAppointmentId");
        
        // Quitar clase seleccionada de todas las tarjetas de servicios
        document.querySelectorAll(".service-card").forEach(card => {
          card.classList.remove("border-primary");
        });
      }
      
      // Mostrar paso 1: Selección de servicio
      function showAgendarCitaStep1() {
        citasListView.style.display = "none";
        agendarCitaStep1.style.display = "block";
        agendarCitaStep2.style.display = "none";
      }
      
      // Mostrar paso 2: Selección de fecha y hora
      function showAgendarCitaStep2() {
        citasListView.style.display = "none";
        agendarCitaStep1.style.display = "none";
        agendarCitaStep2.style.display = "block";
        
        // Generar opciones de fecha
        generateDateOptions();
        
        // Generar opciones de hora
        generateTimeOptions();
      }
      
      // Funciones - Gestión de datos
      
      // Renderizar lista de citas
      function renderCitas() {
        citasTableBody.innerHTML = "";
        
        citas.forEach(cita => {
          const row = document.createElement("tr");
          
          // Determinar clase de badge según estado
          let badgeClass = "";
          let badgeText = cita.estado;
          
          switch (cita.estado.toLowerCase()) {
            case "completada":
              badgeClass = "estado-completada";
              break;
            case "pendiente":
              badgeClass = "estado-pendiente";
              break;
            case "cancelada":
              badgeClass = "bg-danger";
              break;
            default:
              badgeClass = "bg-secondary";
          }
          
          // Crear fila de la tabla con los datos de la cita
          row.innerHTML = `
            <td>${cita.servicio}</td>
            <td>${cita.odontologo}</td>
            <td>${formatDate(cita.fecha)}</td>
            <td>${cita.hora}</td>
            <td><span class="badge ${badgeClass} rounded-pill">${badgeText}</span></td>
            <td class="text-end">
              <div class="action-buttons">
                <button class="btn btn-sm btn-link text-primary edit-btn" data-id="${cita.id}">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-link text-danger delete-btn" data-id="${cita.id}">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </td>
          `;
          
          citasTableBody.appendChild(row);
        });
        
        // Agregar event listeners a los botones de editar y eliminar
        document.querySelectorAll(".edit-btn").forEach(btn => {
          btn.addEventListener("click", function() {
            const id = Number(this.getAttribute("data-id"));
            editAppointment(id);
          });
        });
        
        document.querySelectorAll(".delete-btn").forEach(btn => {
          btn.addEventListener("click", function() {
            const id = Number(this.getAttribute("data-id"));
            deleteAppointment(id);
          });
        });
      }
      
      // Generar opciones de fecha
      function generateDateOptions() {
        dateOptions.innerHTML = "";
        
        // Generar fechas para los próximos 7 días
        const today = new Date();
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        
        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          
          const dateStr = formatDateISO(date);
          const dayName = days[date.getDay()];
          const dayNum = date.getDate();
          const monthName = months[date.getMonth()];
          
          // Crear columna para la opción de fecha
          const dateCol = document.createElement("div");
          dateCol.className = "col-md-4";
          
          dateCol.innerHTML = `
            <div class="border rounded p-2 text-center date-option" data-date="${dateStr}">
              ${dayName}, ${dayNum} De ${monthName}
            </div>
          `;
          
          dateOptions.appendChild(dateCol);
        }
        
        // Agregar evento de clic a las opciones de fecha
        document.querySelectorAll(".date-option").forEach(option => {
          option.addEventListener("click", function() {
            // Quitar clase seleccionada de todas las opciones
            document.querySelectorAll(".date-option").forEach(opt => {
              opt.classList.remove("border-primary", "bg-light");
            });
            
            // Agregar clase seleccionada a la opción clicada
            this.classList.add("border-primary", "bg-light");
            
            // Almacenar fecha seleccionada
            selectedDate = this.getAttribute("data-date");
          });
        });
      }
      
      // Generar opciones de hora
      function generateTimeOptions() {
        timeOptions.innerHTML = "";
        
        // Generar franjas horarias desde las 6:00 AM hasta las 6:00 PM
        const timeSlots = [
          "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", 
          "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
          "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
        ];
        
        timeSlots.forEach(time => {
          // Crear columna para la opción de hora
          const timeCol = document.createElement("div");
          timeCol.className = "col-md-3";
          
          timeCol.innerHTML = `
            <div class="border rounded p-2 text-center time-option" data-time="${time}">
              ${time}
            </div>
          `;
          
          timeOptions.appendChild(timeCol);
        });
        
        // Agregar evento de clic a las opciones de hora
        document.querySelectorAll(".time-option").forEach(option => {
          option.addEventListener("click", function() {
            // Quitar clase seleccionada de todas las opciones
            document.querySelectorAll(".time-option").forEach(opt => {
              opt.classList.remove("border-primary", "bg-light");
            });
            
            // Agregar clase seleccionada a la opción clicada
            this.classList.add("border-primary", "bg-light");
            
            // Almacenar hora seleccionada
            selectedTime = this.getAttribute("data-time");
          });
        });
      }
      
      // Agregar nueva cita
      function addNewAppointment() {
        // Crear nueva cita
        const newAppointment = {
          id: Date.now(),
          servicio: selectedService.name,
          fecha: selectedDate,
          hora: selectedTime,
          odontologo: "Dra. Diana Noriega",
          estado: "Pendiente"  // Aseguramos que el estado sea "Pendiente"
        };
        
        // Agregar al array de citas (al final)
        citas.push(newAppointment);
        
        // Guardar en localStorage
        localStorage.setItem("appointments", JSON.stringify(citas));
        
        // Mostrar notificación de éxito
        showNotification("Cita agendada correctamente", "success");
        
        // Volver a la vista de lista
        showCitasListView();
        
        // Actualizar la tabla
        renderCitas();
      }
      
      // Editar cita existente
      function editAppointment(id) {
        // Buscar la cita
        const appointment = citas.find(cita => cita.id === id);
        
        if (appointment) {
          // Mostrar formulario de edición con los datos de la cita
          selectedService = {
            name: appointment.servicio,
            price: "0" // No tenemos el precio almacenado en la cita
          };
          
          // Mostrar el primer paso del formulario de cita
          showAgendarCitaStep1();
          
          // Establecer título del formulario
          const formTitle = document.querySelector("#agendarCitaStep1 h2");
          if (formTitle) {
            formTitle.textContent = "Editar Cita";
          }
          
          // Seleccionar la tarjeta de servicio que coincide con el servicio de la cita
          document.querySelectorAll(".service-card").forEach(card => {
            if (card.getAttribute("data-service") === appointment.servicio) {
              card.classList.add("border-primary");
            } else {
              card.classList.remove("border-primary");
            }
          });
          
          // Almacenar el ID de la cita para uso posterior
          localStorage.setItem("editingAppointmentId", appointment.id);
        }
      }
      
      // Actualizar cita existente
      function updateAppointment(id) {
        // Buscar el índice de la cita
        const index = citas.findIndex(cita => cita.id === id);
        
        if (index !== -1) {
          // Actualizar la cita
          citas[index] = {
            ...citas[index],
            servicio: selectedService.name,
            fecha: selectedDate,
            hora: selectedTime
          };
          
          // Guardar en localStorage
          localStorage.setItem("appointments", JSON.stringify(citas));
          
          // Limpiar el ID de edición
          localStorage.removeItem("editingAppointmentId");
          
          // Mostrar notificación de éxito
          showNotification("Cita actualizada correctamente", "success");
          
          // Volver a la vista de lista
          showCitasListView();
          
          // Actualizar la tabla
          renderCitas();
        }
      }
      
      // Eliminar cita
      function deleteAppointment(id) {
        // Eliminar cita del array sin diálogo de confirmación
        citas = citas.filter(cita => cita.id !== id);
        
        // Guardar en localStorage
        localStorage.setItem("appointments", JSON.stringify(citas));
        
        // Actualizar la tabla
        renderCitas();
        
        // Mostrar notificación de éxito
        showNotification("Cita eliminada correctamente", "success");
      }
      
      // Funciones auxiliares
      
      // Formatear fecha para mostrar
      function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES');
      }
      
      // Formatear fecha en formato ISO
      function formatDateISO(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      
      // Mostrar notificación toast
      function showNotification(message, type) {
        if (type === "success") {
          toastTitle.textContent = "Éxito";
          toastHeader.classList.remove("bg-danger", "text-white");
          // Cambiar a azul claro en lugar de verde para notificaciones de éxito
          toastHeader.classList.add("bg-info", "text-white");
        } else {
          toastTitle.textContent = "Error";
          toastHeader.classList.remove("bg-info", "text-white");
          toastHeader.classList.add("bg-danger", "text-white");
        }
        
        toastMessage.textContent = message;
        toast.show();
      }
    });