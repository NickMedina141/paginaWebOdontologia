let idAEliminar = null;

// Inicializar elementos comunes cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  setupTableRowHoverEffects();
  const servicioTableBody = document.querySelector("#servicioTableBody");

  fetch("../modelo/serviciosModelo.php")
    .then(response => response.json())
    .then(data => {
      servicioTableBody.innerHTML = "";

      if (data.length === 0) {
        servicioTableBody.innerHTML = "<tr><td colspan = '5'><center>No hay servicios registrados </center></td></tr>";
        return;
      }


      showNotification("Servicios cargados exitosamente", "success");
      data.forEach(servicio => {
        const fila = `
        <tr>
            <td>${servicio.id_servicios}</td>
            <td>${servicio.nombre}</td>
            <td>${servicio.descripcion}</td>
            <td>${parseFloat(servicio.costo).toLocaleString()}</td>
            <td class="text-end">
                <div class="d-flex justify-content-center gap-2 action-buttons opacity-0 transition-opacity group-hover-opacity-100">
                    <button class="btn btn-sm btn-link text-primary edit-btn"
                    data-id= "${servicio.id_servicios}"
                    data-nombre= "${servicio.nombre}"
                    data-descripcion= "${servicio.descripcion}"
                    data-costo="${servicio.costo}">
                    <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-link text-danger delete-btn"
                    data-id="${servicio.id_servicios}">
                        <i class="bi bi-trash"></i> 
                    </button>
                </div>
            </td>
        </tr>
    `;
        servicioTableBody.innerHTML += fila;
      });
      // editar
      document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          mostrarEdicionServicio(this);

        });
      });

      //eliminar
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function () {


          const id = this.getAttribute("data-id");

          if (confirm("¿Está seguro de que desea eliminar este servicio?")) {
            fetch("../modelo/serviciosModelo.php", {
              method: "DELETE", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id })
            })
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  showNotification("Servicio eliminado correctamente", "success");
                  setTimeout(() => location.reload(), 1000);
                } else {
                  showNotification("Error al eliminar el servicio", "error");
                }
              })
              .catch(error => {
                console.error("error al eliminar", error); // mirar si quitar o dejar
                showNotification("Error de conexion al eliminar", "error");
              })
          }
        });
      });

      // actualizar
      document.getElementById("updateServicioBtn").addEventListener("click", function () {

        const id = document.getElementById("idEdit").value;
        const nombre = document.getElementById("nombreEdit").value;
        const descripcion = document.getElementById("descripcionEdit").value;
        const costo = document.getElementById("costoEdit").value;

        fetch("../modelo/serviciosModelo.php", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, nombre, descripcion, costo })
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              showNotification("Servicio actualizado correctamente", "success");
              setTimeout(() => location.reload(), 1000);
            } else {
              showNotification("Error al actualizar el servicio", "error");
            }
          })
          .catch(error => {
            console.error("Error al actualizar:", error);
            showNotification("Error de conexión al actualizar", "error");
          });

      });

      // cerrar la vista de la tabla
      function mostrarEdicionServicio(button) {
        const id = button.getAttribute("data-id");
        const nombre = button.getAttribute("data-nombre");
        const descripcion = button.getAttribute("data-descripcion");
        const costo = button.getAttribute("data-costo");

        document.getElementById("idEdit").value = id;
        document.getElementById("nombreEdit").value = nombre;
        document.getElementById("descripcionEdit").value = descripcion;
        document.getElementById("costoEdit").value = costo;

        document.getElementById("serviciosListView").style.display = "none";
        document.getElementById("serviciosEdit").style.display = "block";


      }
    })
    .catch(error => {
      console.log("Error al obtener los servicios", error);
      showNotification("Error al cargar los servicios.", "error");
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

});
