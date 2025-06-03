document.addEventListener("DOMContentLoaded", () =>{
  const urlParams = new URLSearchParams(window.location.search);
  const cedula = urlParams.get("cedula");
  document.getElementById("cedulaOculta").value = cedula;
  if(cedula){
    obtenerHistorial(cedula);
  }


});

async function obtenerHistorial(cedula) {
  try{
    const resultado = await fetch(`../modelo/historialClinicoModelo.php?cedula=${cedula}`);
    const datos = await resultado.json();

    if(!datos || datos.length === 0){
      showNotification("No se encontro el historial para este paciente","Error");
      return;
    }

    const historial = datos[0];

    document.getElementById("tratamientos").value = historial.tratamientos || "";
    document.getElementById("medicamentos").value = historial.medicamentos || "";
    document.getElementById("padecimientos").value = historial.padecimientos || "";
    document.getElementById("alergias").value = historial.alergias || "";
    document.getElementById("antecedentes").value = historial.historial || "";

    const nombre = `${historial.nombres} ${historial.apellidos}`;
    document.getElementById("patientName").textContent = nombre;
    showNotification("Datos del paciente cargados correctamente","success");

  } catch (error){
    console.error("Error al obtener el historial del paciente:",error);
    showNotification("Error al obtener los datos","Error")
  }
}

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
