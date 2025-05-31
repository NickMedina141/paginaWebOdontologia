// ver todo ese maldito codigo!!!
let selectedDate = null;
let selectedTimeStart = null;
let selectedTimeEnd = null;
let selectedID_horario = null;


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

  // Botón para confirmar la cita
  confirmAppointmentBtn.addEventListener("click", function () {
    if (!selectedDate || !selectedTime) {
      showNotification("Por favor seleccione fecha y hora", "error");
      return;
    }


    // Verificar si estamos editando una cita existente
    const editingId = localStorage.getItem("editingAppointmentId");

    if (editingId) {
      updateAppointment(Number(editingId));
    } else {
      // addNewAppointment();
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

    // Generar opciones de hora
    // generateTimeOptions();
  }

  // Funciones - Gestión de datos

  function renderCitas() {
    fetch("../modelo/agendarCitaModelo.php", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion: "citasAgendadas" })
    })
      .then(respuesta => respuesta.json())
      .then(datos => {
        console.log("Datos recibidos:", datos);
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

          const hora = `${formatoHora(cita.hora_inicio)}`

          row.innerHTML = `
            <td>${cita.servicio}</td>
            <td>${cita.odontologo}</td>
            <td>${formatDate(cita.fecha)}</td>
            <td>${hora}</td>
            <td><span class="badge ${badgeClass}" rounded-pill> ${estadoTexto}</span></td>
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
    // luego asignar eventos
    document.querySelectorAll(".edit-btn").forEach(button => {
      console.log("Asignando evento a botón editar con id:", button.dataset.id);
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        console.log("Click en editar con id:", id);
        editAppointment(parseInt(id));
      });
    });
  }

  // justo después de todo
  document.body.addEventListener("click", (e) => {
    if (e.target.closest(".edit-btn")) {
      const id = e.target.closest(".edit-btn").getAttribute("data-id");
      console.log("Click delegado en editar id:", id);
      editAppointment(parseInt(id));
    }
  });

  function traducirEstado(estadoNum) {
    switch (estadoNum) {
      case "0": return "pendiente";
      case "1": return "completada";
      case "2": return "Cancelada";
      default: return "Desconocido";
    }
  }

  function generateDateOptions() {
    dateOptions.innerHTML = ""
    //dia de lunes a sabado, el domingo no se trabaja, debe incluir el dia de hoy
    const today = new Date();
    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    today.setDate(today.getDate());// Mantener el día de hoy como punto de partida
    while (dateOptions.children.length < 6) {
      // Incrementar el día, incluyendo el dia de Hoy
      if (today.getDay() === 0) {
        today.setDate(today.getDate() + 1); // Saltar el domingo
      }
      const dateStr = formatDateISO(today);
      const dayName = daysOfWeek[today.getDay() - 1]; // Ajustar para que coincida con el índice del array
      const dayNum = today.getDate();
      const monthName = today.toLocaleString('default', { month: '2-digit' });
      const year = today.getFullYear();
      const horaInicio = "8:00 AM"; // Hora de inicio fija
      const horaFin = "5:00 PM"; // Hora de fin fija
      const formattedDate = `${dayName}, ${dayNum} de ${monthName}\n\n${horaInicio} - ${horaFin}`;
      const dateCol = document.createElement("div");
      dateCol.className = "col-md-4";

      dateCol.innerHTML = `
            <div class="border rounded p-2 text-center date-option" 
              data-date="${dateStr}"
              data-id-horario="${dateStr.id_horario}"
              data-hora-inicio=""
              data-hora-fin=""
              id="num${dayNum}"
              value="${dayNum}-${monthName}-${year}"
              onclick="generateTimeOptions(document.getElementById('num${dayNum}').getAttribute('value'))"
              >
              
              ${dayName}, ${dayNum}/ ${monthName}/ ${year}
            </div>
          `;
      // Numero de la semana

      selectedID_horario = dateStr.id_horario || null; // Asegurarse de que el ID del horario esté definido
      dateOptions.appendChild(dateCol);
      // Incrementar el día para la siguiente iteración
      today.setDate(today.getDate() + 1);
    };

    // Activar eventos después de generar todo
    document.querySelectorAll(".date-option").forEach(option => {
      option.addEventListener("click", function () {
        // Quitar selección previa
        document.querySelectorAll(".date-option").forEach(opt => {
          opt.classList.remove("border-primary", "bg-light");
        });

        // Marcar actual
        this.classList.add("border-primary", "bg-light");

        // Almacenar valores seleccionados
        selectedDate = this.getAttribute("data-date");
        selectedID_horario = this.getAttribute("data-id-horario");

        // Mostrar por consola
        console.log("Fecha seleccionada:", selectedDate);
        console.log("ID de horario seleccionado:", selectedID_horario);

        // Cargar horas disponibles
        generateTimeOptions(selectedDate);
      });
    });



  }

  window.generateTimeOptions = function (fecha) {

    // alert("Fecha seleccionada: " + fecha);
    const [dia, mes, anio] = fecha.split("-");
    const dateObj = new Date(anio, mes - 1, dia);

    // Obtener número del día
    const numeroDia = dateObj.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    // alert("Número del día: " + numeroDia);

    const timeOptions = document.getElementById("timeOptions");
    timeOptions.innerHTML = "";

    fetch(`../modelo/agendarCitaModelo.php?dia=${numeroDia}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Datos recibidos:", data);
        if (data.success) {
          if (!data.horas || data.horas.length === 0) {
            timeOptions.innerHTML = `<div class="col-12 text-center">No hay horas disponibles para esta fecha</div>`;
            return;
          }
          const availableHours = data.horas;

          timeOptions.innerHTML = ""; // Limpiar antes de agregar

          availableHours.forEach(hour => {
            const hourCol = document.createElement("div");
            hourCol.className = "col-md-2 mb-2";
            hourCol.innerHTML = `
          <button type="button" class="btn btn-outline-primary w-100 time-option" data-time="${hour}">
            ${hour}
          </button>
        `;
            timeOptions.appendChild(hourCol);
          });

          // Activar selección
          document.querySelectorAll(".time-option").forEach(btn => {
            btn.addEventListener("click", function () {
              document.querySelectorAll(".time-option").forEach(b => b.classList.remove("active"));
              this.classList.add("active");

              const horaSeleccionada = this.dataset.time;
              const horaInicio = horaSeleccionada.split(":")[0];
              const horaFin = horaSeleccionada.split(":")[1];

              // selectedID_horario = this.getAttribute("data-id-horario") || null; // Asegurarse de que el ID del horario esté definido
              console.log("ID de horario seleccionado:", selectedID_horario);
              selectedTimesStart = horaInicio;
              selectedTimeEND = parseInt(horaFin) + 1; // Formato de hora de fin

              console.log("Hora seleccionada:", horaSeleccionada);
              selectedTime = horaSeleccionada;
            });
          });

        } else {
          showNotification(data.message || "Error al obtener horas disponibles", "error");
        }
      })
      .catch(error => {
        console.error("Error al obtener horas disponibles:", error);
        showNotification("Error de conexión", "error");
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

  function agregarCita() {
    const cita = {
      accion: "agregarCita",
      pacientes_cedula: 123456, // Cambiar por el ID del paciente real
      odontologos_cedula: 1322445566, // Cambiar por el ID del odontólogo real
      fecha: selectedDate,
      hora_inicio: selectedTimesStart,
      hora_fin: selectedTimeEND,
      estado: 1, //1 para pendiente, 0 para completado
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
  // function updateAppointment(id) {
  //   // Buscar el índice de la cita
  //   const index = citas.findIndex(cita => cita.id === id);

  //   if (index !== -1) {
  //     // Actualizar la cita
  //     citas[index] = {
  //       ...citas[index],
  //       servicio: selectedService.name,
  //       fecha: selectedDate,
  //       hora: selectedTime
  //     };

  //     // Guardar en localStorage
  //     localStorage.setItem("appointments", JSON.stringify(citas));

  //     // Limpiar el ID de edición
  //     localStorage.removeItem("editingAppointmentId");

  //     // Mostrar notificación de éxito
  //     showNotification("Cita actualizada correctamente", "success");

  //     // Volver a la vista de lista
  //     showCitasListView();

  //     // Actualizar la tabla
  //     renderCitas();
  //   }
  // }



  function editAppointment(id) {
    // Buscar la cita en arreglo global 'citas'
    // const appointment = citas.find(cita => String(cita.id_cita) === String(id));

    // if (!appointment) {
    //   console.error("Cita no encontrada con id:", id);
    //   return;
    // }

    console.log("id:", id);
    showAgendarCitaStep1();
    fetch(`../modelo/agendarCitaModelo.php?id_cita=${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
      .then(respuesta => respuesta.json())
      .then(datos => {
        console.log("Datos recibidos:", datos);
        if (datos.success) {
          // Asignar los datos de la cita a las variables globales
          selectedService = {
            nombre: datos.servicio,
            costo: "0" // No tenemos el precio almacenado en la cita
          };
          selectedDate = datos.fecha;
          selectedTimesStart = datos.hora_inicio;
          selectedTimeEND = datos.hora_fin;
          selectedID_horario = datos.id_horario;

          // Mostrar formulario de edición con los datos de la cita
          activarSeleccionServicio();
          showAgendarCitaStep1();

          // Cambiar título del formulario
          const formTitle = document.querySelector("#agendarCitaStep1 h2");
          if (formTitle) formTitle.textContent = "EditarCita";

          // Marcar tarjeta del servicio
          document.querySelectorAll(".service-card").forEach(card => {
            card.classList.toggle("border-primary", card.getAttribute("data-service") === datos.servicio);
          });

          // Precarga inputs de fecha y hora (si tienes inputs para esto)
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

    // Mostrar formulario de edición con los datos de la cita
    // activarSeleccionServicio();
    // selectedService = {
    //   nombre: selectedService,
    //   costo: selectedService
    // };

    console.log("Servicio seleccionado para editar:", selectedService);

    // // Si no hay un id guardado, significa que quieres cargar el formulario para editar
    // if (!localStorage.getItem("editingAppointmentId")) {
    //   // Guardar id para edición
    //   localStorage.setItem("editingAppointmentId", appointment.id_cita);

    //   // Precargar variables globales o de estado
    //   selectedService = {
    //     nombre: appointment.servicio,
    //     costo: "0"
    //   };
    //   selectedDate = appointment.fecha;
    //   selectedTimesStart = appointment.hora_inicio;
    //   selectedTimeEND = appointment.hora_fin;
    //   selectedID_horario = appointment.id_horario;

    //   // Mostrar formulario y precargar UI (ejemplo, adapta según tu estructura)
    //   showAgendarCitaStep1();

    //   // Cambiar título del formulario
    //   const formTitle = document.querySelector("#agendarCitaStep1 h2");
    //   if (formTitle) formTitle.textContent = "Editar Cita";

    //   // Marcar tarjeta del servicio
    //   document.querySelectorAll(".service-card").forEach(card => {
    //     card.classList.toggle("border-primary", card.getAttribute("data-service") === appointment.servicio);
    //   });

    //   // Precarga inputs de fecha y hora (si tienes inputs para esto)
    //   const inputFecha = document.querySelector("#inputFecha");
    //   if (inputFecha) inputFecha.value = selectedDate;

    //   const inputHoraInicio = document.querySelector("#inputHoraInicio");
    //   if (inputHoraInicio) inputHoraInicio.value = selectedTimesStart;

    //   const inputHoraFin = document.querySelector("#inputHoraFin");
    //   if (inputHoraFin) inputHoraFin.value = selectedTimeEND;

    //   return; // Termina aquí para esperar a que usuario edite y envíe
    // }

    // // Si sí hay un id en edición (modo guardar), prepara y envía datos
    // const datosCita = {
    //   accion: "editarCita",
    //   id_cita: localStorage.getItem("editingAppointmentId"),
    //   servicio: selectedService.nombre,
    //   fecha: selectedDate,
    //   hora_inicio: selectedTimesStart,
    //   hora_fin: selectedTimeEND,
    //   estado: 1,
    //   pacientes_cedula: 123456,
    //   odontologos_cedula: 1322445566,
    //   id_horario: selectedID_horario
    // };

    // fetch("../modelo/agendarCitaModelo.php", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(datosCita)
    // })
    //   .then(respuesta => respuesta.json())
    //   .then(datos => {
    //     if (datos.success) {
    //       showNotification("Cita actualizada correctamente", "success");
    //       showCitasListView();
    //       renderCitas();
    //       localStorage.removeItem("editingAppointmentId");
    //     } else {
    //       showNotification(datos.message || "Error al actualizar la cita", "error");
    //     }
    //   })
    //   .catch(error => {
    //     console.error("Error al actualizar cita:", error);
    //     showNotification("Error de conexión", "error");
    //   });
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
});