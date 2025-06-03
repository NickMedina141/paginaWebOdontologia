// para cargar los datos del administrador
document.addEventListener("DOMContentLoaded", () => {
  let cedula = null;
  fetch("../modelo/panelAdministradorModelo.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ accion: "obtenerInformacionAdministrador" })
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error(data.error);
        return;
      }
      cedula = data.cedula;
      showNotification("Se cargo con exito la informacion del administrador", "success");
      document.getElementById("userNombre").textContent = data.nombre;
      document.getElementById("userApellidos").textContent = data.apellido;
      document.getElementById("userCedula").textContent = data.cedula;
      document.getElementById("userTelefono").textContent = data.telefono;
      document.getElementById("userRol").textContent = "Administrador";

      const enlaceAgendarCita = document.querySelector('.nav-link[href="../vista/adminAgendarCita.php"]');

      enlaceAgendarCita.href = `../vista/adminAgendarCita.php?cedula=${cedula}`;

    })
    .catch(error => {
      console.log("Error al obtener los datos del administrador:", error);
      showNotification("Error al cargar al administrador.", "error");
    });


  const toastEl = document.getElementById("notificationToast");
  const toast = new bootstrap.Toast(toastEl);
  const toastHeader = document.getElementById("toastHeader");
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");

  // Mostrar notificación toast
  function showNotification(message, type) {
    if (type === "success") {
      toastTitle.textContent = "Éxito";
      toastHeader.classList.remove("bg-danger", "text-white");
      toastHeader.classList.add("bg-info", "text-white");
    } else {
      toastTitle.textContent = "Error";
      toastHeader.classList.remove("bg-info", "text-white");
      toastHeader.classList.add("bg-danger", "text-white");
    }
    toastMessage.textContent = message;
    toast.show();
  }

  cargarCitasRecientes();
});

function cargarCitasRecientes() {
  fetch("../modelo/panelAdministradorModelo.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ accion: "obtenerCitasRecientes" })
  })
    .then(res => res.json())
    .then(data => {
      const tablaBody = document.getElementById("tablaCitasRecientes");
      if (!tablaBody) return;

      tablaBody.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        tablaBody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-muted">No hay citas recientes</td>
        </tr>`;
        return;
      }

      data.forEach(cita => {
        const estadoTexto = cita.estado === 'Completada' ? 'Completada' : 'Pendiente';
        const badgeClass = cita.estado === 'Completada' ? 'bg-success' : 'bg-warning text-dark';

        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${cita.servicio}</td>
        <td>${formatearFechaBonita(cita.fecha)}</td>
        <td>${formatearHora(cita.hora_inicio)}</td>
        <td><span class="badge ${badgeClass} rounded-pill">${estadoTexto}</span></td>
      `;
        tablaBody.appendChild(fila);
      });
    })
    .catch(err => {
      console.error("Error al cargar citas recientes:", err);
      showNotification("Error al cargar citas recientes.", "error");
    });
}


function formatearFechaBonita(fechaISO) {
  const partes = fechaISO.split('-'); // ["YYYY", "MM", "DD"]
  const fecha = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));

  return fecha.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}


function formatearHora(hora) {
  const [h, m] = hora.split(":");
  let horaNum = parseInt(h, 10);
  const ampm = horaNum >= 12 ? "PM" : "AM";
  horaNum = horaNum % 12 || 12;
  return `${horaNum}:${m} ${ampm}`;
}


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