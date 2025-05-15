// Model for procedures
class Procedure {
  constructor(id, id_cita, descripcion) {
    this.id = id
    this.id_cita = id_cita
    this.descripcion = descripcion
  }

  static getAll() {
    const storedProcedures = localStorage.getItem("procedures")
    if (storedProcedures) {
      return JSON.parse(storedProcedures)
    }

    // Default procedures if none in localStorage
    return [
      { id: 1, id_cita: "C001", descripcion: "Limpieza dental profunda y aplicación de flúor" },
      { id: 2, id_cita: "C002", descripcion: "Extracción de muela del juicio inferior derecha" },
      { id: 3, id_cita: "C003", descripcion: "Inicio de tratamiento de ortodoncia, colocación de brackets" },
    ]
  }

  static save(procedures) {
    localStorage.setItem("procedures", JSON.stringify(procedures))
  }

  static add(procedure) {
    const procedures = this.getAll()
    procedures.push(procedure)
    this.save(procedures)
    return procedure
  }

  static update(id, updatedProcedure) {
    const procedures = this.getAll()
    const index = procedures.findIndex((p) => p.id === id)

    if (index !== -1) {
      procedures[index] = { ...procedures[index], ...updatedProcedure }
      this.save(procedures)
      return procedures[index]
    }

    return null
  }

  static delete(id) {
    let procedures = this.getAll()
    procedures = procedures.filter((p) => p.id !== id)
    this.save(procedures)
  }

  static getById(id) {
    const procedures = this.getAll()
    return procedures.find((p) => p.id === id) || null
  }
}
