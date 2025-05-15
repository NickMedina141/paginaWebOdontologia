// Import Procedure model
import { Procedure } from "../models/Procedure.js"

// Controller for procedures
class ProcedureController {
  constructor() {
    // Initialize event listeners
    this.initEventListeners()
  }

  initEventListeners() {
    const addProcedimientoBtn = document.getElementById("addProcedimientoBtn")
    const confirmAddBtn = document.getElementById("confirmAddBtn")
    const cancelAddBtn = document.getElementById("cancelAddBtn")
    const confirmEditBtn = document.getElementById("confirmEditBtn")
    const cancelEditBtn = document.getElementById("cancelEditBtn")

    if (addProcedimientoBtn) {
      addProcedimientoBtn.addEventListener("click", () => this.showAddForm())
    }

    if (confirmAddBtn) {
      confirmAddBtn.addEventListener("click", () => this.addProcedure())
    }

    if (cancelAddBtn) {
      cancelAddBtn.addEventListener("click", () => this.cancelAdd())
    }

    if (confirmEditBtn) {
      confirmEditBtn.addEventListener("click", () => this.updateProcedure())
    }

    if (cancelEditBtn) {
      cancelEditBtn.addEventListener("click", () => this.cancelEdit())
    }

    // Load patient data
    this.loadPatientData()

    // Render procedures
    this.renderProcedures()

    // Render citas
    this.renderCitas()
  }

  loadPatientData() {
    const patientNameEl = document.getElementById("patientName")

    // Get patient data from localStorage
    const patientData = localStorage.getItem("selectedPatient")
    if (patientData && patientNameEl) {
      const patient = JSON.parse(patientData)
      patientNameEl.textContent = `${patient.nombre} ${patient.apellidos}`
    }
  }

  showAddForm() {
    const procedimientosListView = document.getElementById("procedimientosListView")
    const addProcedimientoForm = document.getElementById("addProcedimientoForm")
    const editProcedimientoForm = document.getElementById("editProcedimientoForm")

    procedimientosListView.style.display = "none"
    addProcedimientoForm.style.display = "block"
    editProcedimientoForm.style.display = "none"

    this.selectedCita = null
    document.getElementById("descripcion").value = ""
  }

  cancelAdd() {
    const procedimientosListView = document.getElementById("procedimientosListView")
    const addProcedimientoForm = document.getElementById("addProcedimientoForm")

    procedimientosListView.style.display = "block"
    addProcedimientoForm.style.display = "none"
  }

  addProcedure() {
    const descripcion = document.getElementById("descripcion").value.trim()

    if (!this.selectedCita || !descripcion) {
      this.showNotification("Por favor seleccione una cita y escriba una descripción", "error")
      return
    }

    // Add new procedimiento
    const newProcedimiento = {
      id: Date.now(),
      id_cita: this.selectedCita,
      descripcion: descripcion,
    }

    Procedure.add(newProcedimiento)

    // Switch back to list view
    const procedimientosListView = document.getElementById("procedimientosListView")
    const addProcedimientoForm = document.getElementById("addProcedimientoForm")

    procedimientosListView.style.display = "block"
    addProcedimientoForm.style.display = "none"

    // Update the table
    this.renderProcedures()

    this.showNotification("Procedimiento agregado correctamente", "success")
  }

  showEditForm(id) {
    const procedure = Procedure.getById(id)

    if (procedure) {
      this.editingId = id

      const procedimientosListView = document.getElementById("procedimientosListView")
      const addProcedimientoForm = document.getElementById("addProcedimientoForm")
      const editProcedimientoForm = document.getElementById("editProcedimientoForm")

      document.getElementById("editDescripcion").value = procedure.descripcion

      procedimientosListView.style.display = "none"
      addProcedimientoForm.style.display = "none"
      editProcedimientoForm.style.display = "block"
    }
  }

  cancelEdit() {
    const procedimientosListView = document.getElementById("procedimientosListView")
    const editProcedimientoForm = document.getElementById("editProcedimientoForm")

    procedimientosListView.style.display = "block"
    editProcedimientoForm.style.display = "none"
  }

  updateProcedure() {
    const descripcion = document.getElementById("editDescripcion").value.trim()

    if (!descripcion) {
      this.showNotification("La descripción no puede estar vacía", "error")
      return
    }

    // Update procedimiento
    Procedure.update(this.editingId, { descripcion })

    // Switch back to list view
    const procedimientosListView = document.getElementById("procedimientosListView")
    const editProcedimientoForm = document.getElementById("editProcedimientoForm")

    procedimientosListView.style.display = "block"
    editProcedimientoForm.style.display = "none"

    // Update the table
    this.renderProcedures()

    this.showNotification("Procedimiento actualizado correctamente", "success")
  }

  deleteProcedure(id) {
    Procedure.delete(id)
    this.renderProcedures()
    this.showNotification("Procedimiento eliminado correctamente", "success")
  }

  renderProcedures() {
    const procedimientosTableBody = document.getElementById("procedimientosTableBody")
    if (!procedimientosTableBody) return

    procedimientosTableBody.innerHTML = ""

    const procedures = Procedure.getAll()

    procedures.forEach((procedimiento) => {
      const row = document.createElement("tr")
      row.className = "border-top border-light-subtle hover-bg-light"

      row.innerHTML = `
        <td class="py-2">${procedimiento.id_cita}</td>
        <td class="py-2">${procedimiento.descripcion}</td>
        <td class="py-2 text-end">
          <div class="d-flex justify-content-end gap-2 opacity-0 group-hover-opacity-100">
            <button class="btn btn-sm btn-link text-primary edit-btn" data-id="${procedimiento.id}">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-link text-danger delete-btn" data-id="${procedimiento.id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      `

      procedimientosTableBody.appendChild(row)
    })

    // Add event listeners to edit and delete buttons
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number.parseInt(e.currentTarget.getAttribute("data-id"))
        this.showEditForm(id)
      })
    })

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number.parseInt(e.currentTarget.getAttribute("data-id"))
        this.deleteProcedure(id)
      })
    })
  }

  renderCitas() {
    const citasContainer = document.getElementById("citasContainer")
    if (!citasContainer) return

    citasContainer.innerHTML = ""

    // Sample citas - updated to only use "Programada" and "Pendiente" statuses
    const sampleCitas = [
      { id: "C004", servicio: "Blanqueamiento dental", fecha: "2023-05-15", estado: "Programada" },
      { id: "C005", servicio: "Revisión de ortodoncia", fecha: "2023-05-28", estado: "Pendiente" },
      { id: "C006", servicio: "Extracción dental", fecha: "2023-06-10", estado: "Pendiente" },
    ]

    sampleCitas.forEach((cita) => {
      const col = document.createElement("div")
      col.className = "col-12"

      const isDisabled = cita.estado !== "Programada"
      const isSelected = this.selectedCita === cita.id

      col.innerHTML = `
        <div class="card ${isDisabled ? "opacity-50" : isSelected ? "border-primary bg-primary bg-opacity-10" : "border-light-subtle hover-border-primary-subtle"} 
             cursor-pointer transition-colors" data-id="${cita.id}" ${isDisabled ? 'data-disabled="true"' : ""}>
          <div class="card-body p-3">
            <div class="d-flex justify-content-between">
              <span class="fw-medium">${cita.id}</span>
              <span class="badge ${cita.estado === "Programada" ? "bg-primary" : "bg-warning text-dark"} rounded-pill">
                ${cita.estado}
              </span>
            </div>
            <div class="small text-secondary mt-1">${cita.servicio}</div>
            <div class="small text-muted mt-1">${cita.fecha}</div>
            ${isDisabled ? '<div class="small text-danger mt-1 fst-italic">Solo citas programadas</div>' : ""}
          </div>
        </div>
      `

      citasContainer.appendChild(col)

      // Add click event to selectable citas
      if (!isDisabled) {
        const card = col.querySelector(".card")
        card.addEventListener("click", () => {
          this.selectedCita = cita.id

          // Update UI to show selection
          document.querySelectorAll("#citasContainer .card").forEach((c) => {
            c.classList.remove("border-primary", "bg-primary", "bg-opacity-10")
            c.classList.add("border-light-subtle")
          })

          card.classList.remove("border-light-subtle")
          card.classList.add("border-primary", "bg-primary", "bg-opacity-10")
        })
      }
    })
  }

  showNotification(message, type) {
    const toastEl = document.getElementById("notificationToast")
    const toast = new bootstrap.Toast(toastEl)
    const toastHeader = document.getElementById("toastHeader")
    const toastTitle = document.getElementById("toastTitle")
    const toastMessage = document.getElementById("toastMessage")

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
}
