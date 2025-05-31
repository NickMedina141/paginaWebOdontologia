// para cargar los datos del odontologo
let cedulaPaciente = null;

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    cedulaPaciente = params.get("cedula");
    console.log("Cédula del paciente:", cedulaPaciente);
    fetch("../modelo/panelPacienteModelo.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ accion: "obtenerInformacionPaciente", cedula: cedulaPaciente })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Datos recibidos: ",data);

    if(data.error){
      console.error(data.error);
      return;
    }

    showNotification("Se cargo con exito la informacion del paciente","success");
    document.getElementById("userNombre").textContent = data.nombres;
    document.getElementById("userApellidos").textContent = data.apellidos;
    document.getElementById("userCedula").textContent = data.cedula;
    document.getElementById("userTelefono").textContent = data.telefono;
    document.getElementById("userRol").textContent = data.rol;

  })
  .catch(error => {
    console.log("Error al obtener los datos del Paciente:",error);
    showNotification("Error al cargar al Paciente.","error");
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

  cargarHistorialClinico(cedulaPaciente);
});

// Funciones comunes para todas las páginas

function cargarHistorialClinico(cedulaPaciente) {
  if (!cedulaPaciente) {
    console.error("Cédula no proporcionada.");
    showNotification("Cédula no proporcionada.","error");
    return;
  }
  fetch("../modelo/panelPacienteModelo.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ accion: "obtenerHistorialClinico", cedula: cedulaPaciente })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Historial clínico:", data); // quitar despues no joda

    if(data.error) {
      console.error(data.error);
      showNotification("Error al cargar el historial clínico.","error");
      return;
    }

   document.getElementById("tratamientos").value = data.tratamientos || "No registrado";
   document.getElementById("medicamentos").value = data.medicamentos || "No registrado";
   document.getElementById("padecimientos").value = data.alergias || "No registrado";
   document.getElementById("alergias").value = data.antecedentes || "No registrado";
   document.getElementById("antecedentes").value = data.padecimientos || "No registrado";

  })
  .catch(error => {
    console.error("Error al cargar el historial clínico:", error);
    showNotification("Error al cargar el historial clínico.","error");
  });
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
