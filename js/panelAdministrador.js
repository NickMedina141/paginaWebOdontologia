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
