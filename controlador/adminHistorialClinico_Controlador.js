// Controller for clinical records
class ClinicalRecordController {
  constructor() {
    // Initialize event listeners
    this.initEventListeners()
  }

  initEventListeners() {
    const clinicalForm = document.getElementById("clinicalForm")

    if (clinicalForm) {
      clinicalForm.addEventListener("submit", (e) => this.handleFormSubmit(e))
    }

    // Load patient data
    this.loadPatientData()
  }

  loadPatientData() {
    const patientNameEl = document.getElementById("patientName")

    // Get patient data from localStorage
    const patientData = localStorage.getItem("selectedPatient")
    if (patientData) {
      const patient = JSON.parse(patientData)
      if (patientNameEl) {
        patientNameEl.textContent = `${patient.nombre} ${patient.apellidos}`
      }

      // Fill form with existing clinical data if available
      if (patient.historialClinico) {
        const historial = patient.historialClinico

        const tratamientosEl = document.getElementById("tratamientos")
        const medicamentosEl = document.getElementById("medicamentos")
        const padecimientosEl = document.getElementById("padecimientos")
        const alergiasEl = document.getElementById("alergias")
        const antecedentesEl = document.getElementById("antecedentes")

        if (tratamientosEl) tratamientosEl.value = historial.tratamientos || ""
        if (medicamentosEl) medicamentosEl.value = historial.medicamentos || ""
        if (padecimientosEl) padecimientosEl.value = historial.padecimientos || ""
        if (alergiasEl) alergiasEl.value = historial.alergias || ""
        if (antecedentesEl) antecedentesEl.value = historial.antecedentes || ""
      }
    }
  }

  handleFormSubmit(e) {
    e.preventDefault()

    // Get form data
    const formData = {
      tratamientos: document.getElementById("tratamientos").value,
      medicamentos: document.getElementById("medicamentos").value,
      padecimientos: document.getElementById("padecimientos").value,
      alergias: document.getElementById("alergias").value,
      antecedentes: document.getElementById("antecedentes").value,
    }

    // Update patient data in localStorage
    const patientData = localStorage.getItem("selectedPatient")
    if (patientData) {
      const patient = JSON.parse(patientData)
      patient.historialClinico = formData
      localStorage.setItem("selectedPatient", JSON.stringify(patient))
    }

    // Show success notification
    this.showNotification("Información clínica actualizada correctamente", "success")

    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = "admin-busqueda-clinica.html"
    }, 1500)
  }

  showNotification(message, type) {
    const toastEl = document.getElementById("notificationToast")
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
    const bootstrap = window.bootstrap // Ensure bootstrap is accessible
    if (bootstrap && bootstrap.Toast) {
      const toast = new bootstrap.Toast(toastEl)
      toast.show()
    } else {
      console.error("Bootstrap Toast is not available. Make sure Bootstrap is properly loaded.")
      // Fallback: Display an alert message
      alert(message)
    }
  }
}
