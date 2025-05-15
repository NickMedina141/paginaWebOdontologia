// Model for users
class User {
  constructor(nombre, apellidos, cedula, email, sexo, telefono, edad, rol) {
    this.nombre = nombre
    this.apellidos = apellidos
    this.cedula = cedula
    this.email = email
    this.sexo = sexo
    this.telefono = telefono
    this.edad = edad
    this.rol = rol
  }

  static getCurrentUser() {
    const storedUser = localStorage.getItem("userInfo")
    return storedUser ? JSON.parse(storedUser) : null
  }

  static saveCurrentUser(user) {
    localStorage.setItem("userInfo", JSON.stringify(user))
  }

  static findByDocument(documento) {
    // In a real app, this would be an API call
    // For demo purposes, we'll return a sample user if the document matches
    if (documento === "123456789") {
      return {
        nombre: "Carlos",
        apellidos: "Rodríguez",
        cedula: "123456789",
        email: "carlos@example.com",
        sexo: "Masculino",
        telefono: "555-123-4567",
        edad: "35",
        rol: "Paciente",
        historialClinico: {
          tratamientos: "Limpieza dental, Blanqueamiento, Ortodoncia",
          medicamentos: "Ibuprofeno 400mg, Amoxicilina 500mg",
          padecimientos: "Sensibilidad dental, Bruxismo",
          alergias: "Ninguna",
          antecedentes: "Hipertensión",
          ultimaVisita: "Hace 3 meses",
        },
      }
    }
    return null
  }

  static register(userData) {
    localStorage.setItem("registeredUser", JSON.stringify(userData))
    return userData
  }
}
