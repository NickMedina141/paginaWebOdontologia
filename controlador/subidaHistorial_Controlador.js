// Función para añadir efectos hover a las filas de tablas
// function setupTableRowHoverEffects() {
//   document.querySelectorAll("tbody tr").forEach((row) => {
//     row.addEventListener("mouseenter", function () {
//       const actions = this.querySelector(".opacity-0")
//       if (actions) {
//         actions.classList.remove("opacity-0")
//         actions.classList.add("opacity-100")
//       }
//     })

//     row.addEventListener("mouseleave", function () {
//       const actions = this.querySelector(".opacity-100")
//       if (actions && actions.classList.contains("group-hover-opacity-100")) {
//         actions.classList.remove("opacity-100")
//         actions.classList.add("opacity-0")
//       }
//     })
//   })
// }

// Inicializar elementos comunes cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  const pacientesTableBody = document.querySelector("#pacientesTableBody");

  fetch("../modelo/subirHistorialModelo.php")
  .then(response => response.json())
  .then(data => {
    console.log("Datos recibidos: ",data);
    pacientesTableBody.innerHTML = "";

    if(data.length === 0){
      pacientesTableBody.innerHTML = "<tr><td colspan = '5'>Todos los pacientes tienen historial.</td></tr>";
      return;
    }

    showNotification("Se cargo con exito los pacientes","success");
    data.forEach(paciente => {
      const fila = `
        <tr>
          <td>${paciente.cedula}</td>
          <td>${paciente.nombres}</td>
          <td>${paciente.apellidos}</td>
          <td>${genero(paciente.sexo)}</td>
          <td><span class= "badge text-bg-warning"> ${paciente.estado}</span></td>
          <td class="text-end">
          <button class="btn btn-sm btn-primary subir-btn" data-bs-toggle="modal" data-bs-target="#subidaHistorial" data-cedula="${paciente.cedula}">
          Subir
          </button>
          </td>
        </tr>
      `;
      pacientesTableBody.innerHTML += fila;
    });

  })
  .catch(error => {
    console.log("Error al obtener los pacientes:",error);
    showNotification("Error al cargar pacientes.","error");
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
});

function capturarCedula(){
  document.getElementById("cedula").value = paciente.cedula;
}

//para capturar la cedula
document.addEventListener("DOMContentLoaded", () =>{
  const modal = document.getElementById("subidaHistorial");

  modal.addEventListener("show.bs.modal",function (event){
    const boton = event.relatedTarget; // boton que activo el modal
    const cedula = boton.getAttribute("data-cedula"); // obtener la cedula del atributo data de cada paciente
    document.getElementById("cedula").value = cedula; // asignar la cedula al input oculto de cedula
  });
});


function genero(sexo){
  switch(sexo){
    case "1":
      return "masculino";
    case "0":
      return "femenino";
  };
}

function eliminar(){
  const params = new URLSearchParams(window.location.search);
  const cedula = params.get("subido");
  if(cedula){
    const fila = document.querySelector(`tr[data-cedula="${cedula}"]`);
    if(fila){
      fila.remove();
    }
  }
  showNotification("Historial subido exitosamente para el paciente","success");
  history.replaceState(null,"",window.location.pathname);
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

