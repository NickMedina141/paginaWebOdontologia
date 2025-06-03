
const searchForm = document.getElementById("searchForm");
const userInfoSection = document.getElementById("userInfoSection");
const viewUserInfo = document.getElementById("viewUserInfo");
const editUserInfo = document.getElementById("editUserInfo");
const viewButtons = document.getElementById("viewButtons");
const editButtons = document.getElementById("editButtons");
const updateButton = document.getElementById("updateButton");
const confirmButton = document.getElementById("confirmButton");
const cancelButton = document.getElementById("cancelButton");

const toastEl = document.getElementById("notificationToast");
const toast = new bootstrap.Toast(toastEl);
const toastHeader = document.getElementById("toastHeader");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");
editButtons.style.display = "none";




if (updateButton) {

  updateButton.addEventListener("click", async (e) => {
    e.preventDefault();
    viewUserInfo.style.display = "none";
    editUserInfo.style.display = "block";
    document.getElementById("editNombre").value = userData.nombre;
    document.getElementById("editApellidos").value = userData.apellidos;
    document.getElementById("editCedula").value = userData.cedula;
    document.getElementById("editEmail").value = userData.email;
    document.getElementById("editTelefono").value = userData.telefono;
    document.getElementById("editSexo").value = Sexo(userData.sexo);
    document.getElementById("editEdad").value = userData.edad;
    document.getElementById("editRol").value = userData.rol;
    editButtons.style.display = "block";
    confirmButton.style.display = "block";
    updateButton.style.display = "none";

  });
}

if (searchForm) {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const documento = document.getElementById("documento").value;

    if (!documento) {
      showNotification("Ingrese el documento de identidad", "error");

      return;
    }

    // Mostrar la sección de usuario
    userInfoSection.style.display = "block";

    // Llamar a la función Personal() y actualizar userData con los datos
    const pacienteDatos = await Personal();
    if (pacienteDatos) {

      userData = {
        nombre: pacienteDatos.nombres || "",
        apellidos: pacienteDatos.apellidos || "",
        cedula: pacienteDatos.cedula || "",
        email: pacienteDatos.email || "No disponible",
        sexo: pacienteDatos.sexo || "",
        telefono: pacienteDatos.telefono || "",
        edad: pacienteDatos.edad || "",
        rol: "Paciente", // Asumimos que "Paciente" es el rol por defecto
      };

      // Mostrar los datos del usuario
      showNotification("Usuario encontrado", "success");
      editUserInfo.style.display = "none";

      viewNombre.textContent = userData.nombre;
      viewApellidos.textContent = userData.apellidos;
      viewCedula.textContent = userData.cedula;
      viewEmail.textContent = userData.email;
      viewTelefono.textContent = userData.telefono;
      viewSexo.textContent = Sexo(userData.sexo);
      viewEdad.textContent = mostrarEdad(userData.edad);
      viewRol.textContent = userData.rol;
      viewUserInfo.style.display = "block";
      updateButton.style.display = "block";

    } else {
      showNotification("No se encontró un usuario con ese documento", "error");
      viewUserInfo.style.display = "none";
      userInfoSection.style.display = "none";
      updateButton.style.display = "none";
    }
  });
}

//boton para cancelar todo
document.addEventListener("DOMContentLoaded", () => {
  if (cancelButton) {
    cancelButton.addEventListener("click", async (e) => {
      userInfoSection.style.display = "none";
      viewUserInfo.style.display = "none";
      editUserInfo.style.display = "none";
      editButtons.style.display = "none";
      confirmButton.style.display = "none";
      updateButton.style.display = "block";
      searchButton.disabled = false;
    });
  }

  if (confirmButton) {
    confirmButton.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("Felicidades llego al boton confirmar");

      let cedulaActual = userData.cedula;
      const datos = {
        nombre: document.getElementById("editNombre").value.trim(),
        apellidos: document.getElementById("editApellidos").value.trim(),
        cedula: document.getElementById("editCedula").value.trim(),
        cedula_original: cedulaActual.trim(),
        email: document.getElementById("editEmail").value.trim(),
        telefono: document.getElementById("editTelefono").value.trim(),
        sexo: convertirSexo(document.getElementById("editSexo").value),
        edad: document.getElementById("editEdad").value,
        rol: document.getElementById("editRol").value,
      };

      try {
        const respuesta = await fetch("../php/json_paciente.php", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();
        if (resultado.success) {
          showNotification("Datos actualizados correctamente", "success");
          location.reload();
        } else {
          console.error("Error en la respuesta del servidor:", resultado);
          showNotification("Error al actualizar" + resultado.message, "error");
        }
      } catch (error) {
        console.error("Error en la peticion del fetch:", error);
        showNotification("Error de conexion", "error");
      }
    });
  }
});

// Función Personal que obtiene la información del paciente
const Personal = async () => {

  const mispacientes = document.getElementById("respuestas");
  const id = document.getElementById("documento").value;

  try {
    const respuesta = await fetch('../php/json_paciente.php?id=' + id);
    const text = await respuesta.text();

    if (text.trim().startsWith("<")) {
      console.log(text);
      throw new Error("El servidor devolvió HTML en lugar de JSON");
    }

    const datos = JSON.parse(text);
    console.log(datos);

    if (!Array.isArray(datos)) {
      console.error("Respuesta inválida:", datos.message || "Formato desconocido");
      mispacientes.innerHTML = `<p style="color: red; text-align: center;">Error al obtener la información.</p>`;
      return;
    }

    // Si se encontró un paciente, devolvemos los datos
    if (datos.length > 0) {
      return datos[0]; // Devolvemos el primer objeto de datos
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error en la petición:", error);
    mispacientes.innerHTML = `<p style="color: red; text-align: center;">Ocurrió un error al cargar la información.</p>`;
  }
};
// Función para calcular y mostrar la edad en viewEdad
function mostrarEdad(fechaNacimiento) {
  // Convertir la fecha de nacimiento a un objeto Date
  const birthDate = new Date(fechaNacimiento); // Asegúrate de que 'fechaNacimiento' sea una cadena válida de fecha
  const today = new Date();
  let edad = today.getFullYear() - birthDate.getFullYear();
  const mesDif = today.getMonth() - birthDate.getMonth();

  // Si el cumpleaños no ha pasado aún este año, restamos 1 año
  if (mesDif < 0 || (mesDif === 0 && today.getDate() < birthDate.getDate())) {
    edad--;
  }

  // Mostrar la edad en el campo viewEdad
  return edad;
}

function showNotification(message, type) {
  if (type === 'success') {
    toastHeader.classList.remove('bg-danger', 'text-white');
    toastHeader.classList.add('bg-success', 'text-white');
  } else {
    toastHeader.classList.remove('bg-success', 'text-white');
    toastHeader.classList.add('bg-danger', 'text-white');
  }

  toastMessage.textContent = message;
  toast.show();
}


function Sexo(numero) {
  if (numero == 1)
    return "masculino";
  if (numero == 0)
    return "femenino";
  else
    return "Helicoptero Apache";

}

function convertirSexo(sexo) {
  if (sexo == "masculino")
    return 1;
  if (sexo == "femenino")
    return 0;
  else
    return "Helicoptero Apache";

}