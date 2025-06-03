// para cargar los datos del odontologo
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const cedula = params.get("cedula");
  fetch("../modelo/panelOdontologoModelo.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ accion: "obtenerInformacionOdontologo", cedula: cedula })
  })
    .then(response => response.json())
    .then(data => {

      if (data.error) {
        console.error(data.error);
        return;
      }

      showNotification("Se cargo con exito la informacion del odontologo", "success");
      document.getElementById("userNombre").textContent = data.nombre;
      document.getElementById("userApellidos").textContent = data.apellido;
      document.getElementById("userCedula").textContent = data.cedula;
      document.getElementById("userTelefono").textContent = data.telefono;
      document.getElementById("userRol").textContent = "Odontologo";
    })
    .catch(error => {
      console.log("Error al obtener los datos del odontologo:", error);
      showNotification("Error al cargar al odontologo.", "error");
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
