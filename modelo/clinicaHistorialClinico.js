// Model for clinical records
class ClinicalRecord {
  constructor(patientId, tratamientos, medicamentos, padecimientos, alergias, antecedentes) {
    this.patientId = patientId
    this.tratamientos = tratamientos
    this.medicamentos = medicamentos
    this.padecimientos = padecimientos
    this.alergias = alergias
    this.antecedentes = antecedentes
  }

  static getByPatientId(patientId) {
    const storedPatient = localStorage.getItem("selectedPatient")
    if (storedPatient) {
      const patient = JSON.parse(storedPatient)
      return patient.historialClinico || null
    }
    return null
  }

  static save(patientId, clinicalData) {
    const storedPatient = localStorage.getItem("selectedPatient")
    if (storedPatient) {
      const patient = JSON.parse(storedPatient)
      patient.historialClinico = clinicalData
      localStorage.setItem("selectedPatient", JSON.stringify(patient))
      return clinicalData
    }
    return null
  }
}