document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const patientInfoSection = document.getElementById('patientInfoSection');
  const viewUserInfo = document.getElementById("viewUserInfo");

  const toastEl = document.getElementById('notificationToast');
  const toast = new bootstrap.Toast(toastEl);
  const toastHeader = document.getElementById('toastHeader');
  const toastMessage = document.getElementById('toastMessage');

  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const documento = document.getElementById('documento').value;

      if (!documento) {
        showNotification("Por favor ingrese el documento de identidad", "");
        return;
      }
      //mostrar la seccion de informacion del paciente
      patientInfoSection.style.display = "block";

      const pacientesDatos = await Personal();
      console.log("Datos recibidos del modelo PHP:", pacientesDatos);

      if (pacientesDatos) {
        userData = {
          nombre: pacientesDatos.nombres || "",
          cedula: pacientesDatos.cedula || "",
          email: pacientesDatos.email || "no disponible",
          telefono: pacientesDatos.telefono || "",
          sexo: pacientesDatos.sexo || "",
          edad: pacientesDatos.edad || "",
        };

        showNotification("Paciente encontrado", "success");
        patientName.textContent = userData.nombre;
        patientCedula.textContent = userData.cedula;
        patientEmail.textContent = userData.email;
        patientTelefono.textContent = userData.telefono;
        patientSexo.textContent = Sexo(userData.sexo);
        patientEdad.textContent = mostrarEdad(userData.edad);
        viewUserInfo.style.display = "block";

        const btnHistorial = document.querySelector(".btn-historial");
        const btnProcedimientos = document.querySelector(".btn-procedimientos");
        // 
        if (btnHistorial) {
          btnHistorial.setAttribute("data-cedula", userData.cedula);
        }
        if (btnProcedimientos) {
          btnProcedimientos.setAttribute("data-cedula", userData.cedula);
        }

      } else {
        showNotification("No se encontro al paciente", "error");
        patientInfoSection.style.display = "none";
      }
    });
  }

  const Personal = async () => {

    const mispacientes = document.getElementById("respuestas");
    const id = document.getElementById("documento").value;

    try {
      const respuesta = await fetch('../modelo/busquedaClinicaModelo.php?id=' + id);
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

  function Sexo(numero) {
    if (numero == 1)
      return "Masculino";
    if (numero == 0)
      return "Femenino";
    else
      return "Helicoptero Apache";

  }

  // mostrar notificaciones
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
});
