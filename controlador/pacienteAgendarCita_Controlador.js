let selectedDate = null;
let selectedTimeStart = null;
let selectedTimeEnd = null;
let selectedID_horario = null;
let editingAppointmentId = null;
const urlParams = new URLSearchParams(window.location.search);
let cedula = urlParams.get('cedula');


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

document.addEventListener("DOMContentLoaded", async () => {
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
  let selectedID_horario = null; // revisar

  // Inicializar la página
  renderCitas();
  // Event Listeners - Navegación

  // Botón para agregar nueva cita
  addCitaBtn.addEventListener("click", function () {
    showAgendarCitaStep1();
  });

  // Botón para volver a la lista desde el paso 1
  backToListBtn.addEventListener("click", function () {
    localStorage.removeItem("editingAppointmentId");
    showCitasListView();
  });

  // Botón para cancelar la selección de servicio
  cancelServiceBtn.addEventListener("click", function () {
    localStorage.removeItem("editingAppointmentId");
    showCitasListView();
  });

  // Botón para avanzar al paso 2 (selección de fecha y hora)
  nextToDateTimeBtn.addEventListener("click", function () {
    if (!selectedService) {
      showNotification("Por favor seleccione un servicio", "error");
      return;
    }
    showAgendarCitaStep2();
  });

  // Botón para volver al paso 1 desde el paso 2
  backToServiceBtn.addEventListener("click", function () {
    showAgendarCitaStep1();
  });

  // Botón alternativo para volver al paso 1 desde el paso 2
  backToServiceBtnBottom.addEventListener("click", function () {
    showAgendarCitaStep1();
  });

  confirmAppointmentBtn.addEventListener("click", function () {
    if (!selectedDate || !selectedTime) {
      showNotification("Por favor seleccione fecha y hora", "error");
      return;
    }
    if (editingAppointmentId !== null) {
      //Editando
      updateAppointment(editingAppointmentId);
    } else {
      //Agregando una nueva cita
      agregarCita();
    }
  });

  // Agregar evento de clic a las tarjetas de servicios
  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", function () {
      // Quitar clase seleccionada de todas las tarjetas
      document.querySelectorAll(".service-card").forEach(c => {
        c.classList.remove("border-primary");
      });

      // Agregar clase seleccionada a la tarjeta clicada
      this.classList.add("border-primary");

      // Almacenar servicio seleccionado
      selectedService = {
        nombre: this.getAttribute("data-service"),
        costo: this.getAttribute("data-price")
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
    selectedID_horario = null;
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
  }

  // Funciones - Gestión de datos

  function renderCitas() {
    fetch("../modelo/agendarCitaModelo.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion: "citasAgendadasPaciente", cedula })
    })
      .then(respuesta => respuesta.json())
      .then(datos => {
        citas = datos; // Actualizar el array de citas
        const citasTableBody = document.getElementById("citasTableBody");
        citasTableBody.innerHTML = "";

        datos.forEach(cita => {
          const row = document.createElement("tr");

          let badgeClass = "";
          let estadoTexto = traducirEstado(cita.estado);
          switch (estadoTexto.toLowerCase()) {
            case "completada":
              badgeClass = "estado-completada";
              break;
            case "pendiente":
              badgeClass = "estado-pendiente";
              break;
            case "cancelada":
              badgeClass = "bg-danger";
              break;
          }

          const hora = `${formatoHora(cita.hora_inicio)}`;

          row.innerHTML = `
          <td>${cita.servicio}</td>
          <td>${cita.odontologo}</td>
          <td>${formatDate(cita.fecha)}</td>
          <td>${hora}</td>
          <td><span class="badge ${badgeClass}" rounded-pill>${estadoTexto}</span></td>
          <td class="text-end">
            <div class="action-buttons">
              <button class="btn btn-sm btn-link text-primary edit-btn" data-id="${cita.id_cita}">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-link text-danger delete-btn" data-id="${cita.id_cita}">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        `;
          citasTableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error("Error al cargar citas: ", error);
        showNotification("Error al cargar citas", "error");
      });
  }

  // Delegación de eventos para los botones de editar y eliminar
  document.body.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
      const id = deleteBtn.getAttribute("data-id");
      deleteAppointment(id);
      return;
    }

    const editBtn = e.target.closest(".edit-btn");
    if (editBtn) {
      const id = editBtn.getAttribute("data-id");
      console.log("Click delegado en editar id:", id);
      editAppointment(parseInt(id));
    }
  });

  function traducirEstado(estadoNum) {
    switch (estadoNum.toString()) {
      case "0": return "pendiente";
      case "1": return "completada";
      case "2": return "cancelada";
      default: return "desconocido";
    }
  }

  function generateDateOptions() {
    dateOptions.innerHTML = "";
    const today = new Date();
    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    today.setDate(today.getDate()); // Mantiene el día de hoy

    while (dateOptions.children.length < 6) {
      if (today.getDay() === 0) { // Saltar domingo
        today.setDate(today.getDate() + 1);
        continue;
      }

      const dateStr = formatDateISO(today); // yyyy-mm-dd
      const dayName = daysOfWeek[today.getDay() - 1];
      const dayNum = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const horaInicio = "8:00 AM";
      const horaFin = "5:00 PM";

      const dateCol = document.createElement("div");
      dateCol.className = "col-md-4";

      const isSelected = selectedDate === dateStr;
      const selectedClass = isSelected ? "border-primary bg-light" : "";

      dateCol.innerHTML = `
      <div class="border rounded p-2 text-center date-option ${selectedClass}" 
        data-date="${dateStr}"
        id="date-${dateStr}"
      >
        ${dayName}, ${dayNum}/ ${month.toString().padStart(2, '0')}/ ${year}
        <br><small>${horaInicio} - ${horaFin}</small>
      </div>
    `;

      dateOptions.appendChild(dateCol);
      today.setDate(today.getDate() + 1);
    }

    document.querySelectorAll(".date-option").forEach(option => {
      option.addEventListener("click", function () {
        const dateClicked = this.getAttribute("data-date");

        if (selectedDate === dateClicked) return; // evitar recargas innecesarias

        selectedDate = dateClicked;
        selectedID_horario = ""; // Resetear por nueva fecha

        // Limpiar clases seleccionadas
        document.querySelectorAll(".date-option").forEach(opt =>
          opt.classList.remove("border-primary", "bg-light")
        );
        this.classList.add("border-primary", "bg-light");

        generateTimeOptions(selectedDate);
      });
    });
  }

  window.generateTimeOptions = function (fechaISO) {
    function createDateLocal(isoDate) {
      const parts = isoDate.split('-'); // ["YYYY", "MM", "DD"]
      return new Date(parts[0], parts[1] - 1, parts[2]); // Mes base 0 en JS
    }

    const dateObj = createDateLocal(fechaISO);

    if (isNaN(dateObj.getTime())) {
      return;
    }

    const numeroDia = dateObj.getDay(); // 0 = domingo, 1 = lunes...

    const timeOptions = document.getElementById("timeOptions");
    timeOptions.innerHTML = `<div class="col-12 text-center">Cargando horas disponibles...</div>`;

    fetch(`../modelo/agendarCitaModelo.php?dia=${numeroDia}&fecha=${fechaISO}`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        if (!data.success || !data.horas || data.horas.length === 0) {
          timeOptions.innerHTML = `<div class="col-12 text-center">No hay horas disponibles para esta fecha</div>`;
          return;
        }

        // Array con horas ocupadas (ejemplo: ["08:00:00", "09:00:00"])
        const horasOcupadas = data.horas_ocupadas || [];

        timeOptions.innerHTML = "";

        data.horas.forEach(hourObj => {
          const isOcupada = horasOcupadas.includes(hourObj.hora_inicio);

          const hourCol = document.createElement("div");
          hourCol.className = "col-md-2 mb-2";

          // Botón deshabilitado si la hora está ocupada
          hourCol.innerHTML = `
          <button 
            type="button" 
            class="btn btn-outline-primary w-100 time-option ${isOcupada ? "disabled" : ""}" 
            data-time="${hourObj.hora}" 
            data-hora-inicio="${hourObj.hora_inicio}" 
            data-hora-fin="${hourObj.hora_fin}" 
            data-id-horario="${hourObj.id_horario}"
            ${isOcupada ? "disabled" : ""}>
            ${hourObj.hora}
          </button>
        `;

          timeOptions.appendChild(hourCol);
        });

        // Activar selección solo para botones habilitados
        document.querySelectorAll(".time-option:not(.disabled)").forEach(btn => {
          btn.addEventListener("click", function () {
            document.querySelectorAll(".time-option").forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            selectedTime = this.dataset.time;
            selectedTimesStart = this.dataset.horaInicio;
            selectedTimeEND = this.dataset.horaFin;
            selectedID_horario = this.dataset.idHorario;
          });
        });
      })
      .catch(error => {
        console.error("Error al obtener horas disponibles:", error);
        showNotification("Error al obtener horas disponibles", "error");
        timeOptions.innerHTML = `<div class="col-12 text-center">No se pudieron cargar las horas</div>`;
      });
  };


  function agregarCita() {
    const cita = {
      accion: "agregarCita",
      pacientes_cedula: cedula, // Cambiar por el ID del paciente real
      odontologos_cedula: 1322445566, 
      fecha: selectedDate,
      hora_inicio: selectedTimesStart,
      hora_fin: selectedTimeEND,
      estado: 0, //1 para pendiente, 0 para completado
      servicio: selectedService.nombre,
      id_horario: selectedID_horario
    };

    fetch("../modelo/agendarCitaModelo.php", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cita)
    })
      .then(respuesta => respuesta.json())
      .then(datos => {
        if (datos.success) {
          showNotification("Cita registrada exitosamente", "success");
          renderCitas();
          showCitasListView();
        } else {
          showNotification(datos.message || "Error al registrar la cita", "error");
        }
      })
      .catch(error => {
        console.error("Error al registrar cita: ", error);
        showNotification("Error de conexión", "error");
      });
  }

  // Actualizar cita existente
  function updateAppointment(idCita) {
    const datos = {
      id_cita: idCita,
      servicio: selectedService.nombre,
      fecha: selectedDate,
      hora_inicio: selectedTimesStart,
      hora_fin: selectedTimeEND
    };

    fetch("../modelo/agendarCitaModelo.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ accion: 'editarCita', datos })
    })
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          showNotification("Cita actualizada correctamente", "success");
          editingAppointmentId = null; // Limpiar el estado
          renderCitas();
          showCitasListView();
        } else {
          showNotification("Error al actualizar la cita", "error");
        }
      })
      .catch(err => {
        console.error("Error:", err);
        showNotification("Error del servidor", "error");
      });
  }

  function editAppointment(id) {
    editingAppointmentId = id;
    showAgendarCitaStep1();
    fetch(`../modelo/agendarCitaModelo.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion: "obtenerCitaPorID", id_cita: id })
    })
      .then(respuesta => respuesta.json())
      .then(datos => {
        if (datos.success) {
          const cita = datos.cita;

          selectedService = {
            nombre: cita.servicio,
            costo: "0"
          };
          selectedDate = cita.fecha;
          selectedTimesStart = cita.hora_inicio;
          selectedTimeEND = cita.hora_fin;
          selectedID_horario = cita.id_horario;
          selectedID_cita = cita.id_cita; // para usar al actualizar

          // Lógica de precarga visual
          activarSeleccionServicio();
          showAgendarCitaStep1();

          // Ajusta formulario
          const formTitle = document.querySelector("#agendarCitaStep1 h2");
          if (formTitle) formTitle.textContent = "Editar Cita";

          // Marcar tarjeta del servicio
          document.querySelectorAll(".service-card").forEach(card => {
            card.classList.toggle("border-primary", card.getAttribute("data-service") === cita.servicio);
          });

          const inputFecha = document.querySelector("#inputFecha");
          if (inputFecha) inputFecha.value = selectedDate;

          const inputHoraInicio = document.querySelector("#inputHoraInicio");
          if (inputHoraInicio) inputHoraInicio.value = selectedTimesStart;

          const inputHoraFin = document.querySelector("#inputHoraFin");
          if (inputHoraFin) inputHoraFin.value = selectedTimeEND;
        } else {
          showNotification(datos.message || "Error al cargar la cita", "error");
        }
      })
      .catch(error => {
        console.error("Error al cargar cita:", error);
        showNotification("Error de conexión", "error");
      });
  }

  // Eliminar cita
  function deleteAppointment(id) {
    fetch("../modelo/agendarCitaModelo.php", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion: "eliminarCita", id_cita: id })
    })
      .then(respuestas => respuestas.json())
      .then(datos => {
        if (datos.success) {
          renderCitas();
          showNotification("Cita eliminada correctamente", "success");
        } else {
          showNotification(datos.message || "No se pudo eliminar", "error");
        }
      })
      .catch(error => {
        console.log("Error eliminando cita: ", error);
        showNotification("Error de servidor", "error");
      })
  }

  // Funciones auxiliares

  function formatDate(fechaISO) {
    const partes = fechaISO.split('-'); // ["YYYY", "MM", "DD"]
    const fecha = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));

    return fecha.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  }

  function formatoHora(horaStr) {
    const [horas, minutos] = horaStr.split(":");
    let hora = parseInt(horas);
    const siglas = hora >= 12 ? "PM" : "AM";
    hor = hora % 12 || 12;
    return `${hora}: ${minutos} ${siglas}`
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

  const servicios = await obtenerServicios();
  renderizarServicios(servicios);

  async function obtenerServicios() {
    try {
      const response = await fetch("../modelo/agendarCitaModelo.php"
        , {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accion: "servicios" })
        });
      if (!response.ok) throw new Error("error al cargar los servicios");
      return await response.json();
    } catch (error) {
      console.error("error");
      return []
    }
  }

  function renderizarServicios(servicios) {
    const contenedor = document.querySelector(".row.g-3");
    contenedor.innerHTML = "";

    servicios.forEach(servicios => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "col-12";

      tarjeta.innerHTML = `
        <div class="d-flex justify-content-between align-items-start p-3 border rounded shadow-sm service-card" role="button" data-service="${servicios.nombre}" data-price="${servicios.costo}"> 
            <div>
                <div class="fw-semibold"> ${servicios.nombre}</div>
                <div class = "text-muted small">${servicios.descripcion}</div>
        </div>
        <div class ="text-primary fw-smibold">
            $${Number(servicios.costo).toLocaleString("es-CO")}
        </div>
        </div>
        `;
      contenedor.appendChild(tarjeta);
    });
    activarSeleccionServicio(); // Reactiva la selección al hacer click
  }

  function activarSeleccionServicio() {
    document.querySelectorAll(".service-card").forEach(card => {
      card.addEventListener("click", function () {
        document.querySelectorAll(".service-card").forEach(card2 => {
          card2.classList.remove("border-primary");
        });

        this.classList.add("border-primary");

        selectedService = {
          nombre: this.getAttribute("data-service"),
          costo: this.getAttribute("data-price")
        };
      });
    });
  }

  const enlaceVolver = document.querySelector('a.text-primary[href="../vista/panelPaciente.php"]');

  if (enlaceVolver) {
    enlaceVolver.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = `../vista/panelPaciente.php?cedula=${cedula}`;
    });
  } else {
    console.warn("⚠️ No se encontró el enlace de volver.");
  }
});

