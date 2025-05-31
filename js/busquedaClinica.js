document.addEventListener('DOMContentLoaded', function() {
const searchForm = document.getElementById('searchForm');
      const patientInfoSection = document.getElementById('patientInfoSection');
      const viewUserInfo = document.getElementById("viewUserInfo");

      const toastEl = document.getElementById('notificationToast');
      const toast = new bootstrap.Toast(toastEl);
      const toastHeader = document.getElementById('toastHeader');
      const toastMessage = document.getElementById('toastMessage');
      
      // Search form submission
    if(searchForm){
      searchForm.addEventListener('submit', async (e)=> {
        e.preventDefault();
        
        const documento = document.getElementById('documento').value;
        
        if (!documento) {
          showNotification("Por favor ingrese el documento de identidad");
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

          showNotification("Paciente encontrado");
          patientName.textContent = userData.nombre;
          patientCedula.textContent = userData.cedula;
          patientEmail.textContent = userData.email;
          patientTelefono.textContent = userData.telefono;
          patientSexo.textContent = Sexo(userData.sexo);
          patientEdad.textContent = mostrarEdad(userData.edad);
          viewUserInfo.style.display = "block";

          const btnHistorial = document.querySelector(".btn-historial");
          const btnProcedimientos = document.querySelector(".btn-procedimientos");

          if(btnHistorial){
            btnHistorial.setAttribute("data-cedula",userData.cedula);
          }
          if(btnProcedimientos){
            btnProcedimientos.setAttribute("data-cedula",userData.cedula);
          }

        } else {
          showNotification("No se encontro al paciente");
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
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000); // Desaparece después de 3 segundos
  }
function Sexo(numero){
    if(numero==1)
      return "Masculino";
    if(numero == 0)
      return "Femenino";
    else
    return "Helicoptero Apache";

  }


document.addEventListener("DOMContentLoaded", ()=>{
  document.addEventListener("click", function (e) {
  // Historial Clínico
  if (e.target.matches(".btn-historial")) {
    e.preventDefault();
    const cedula = e.target.getAttribute("data-cedula");
    window.location.href = `../vista/adminHistorialClinico.html?id=${encodeURIComponent(cedula)}`;
  }

  // Procedimientos
  if (e.target.matches(".btn-procedimientos")) {
    e.preventDefault();
    const cedula = e.target.getAttribute("data-cedula");
    window.location.href = `../vista/adminProcedimientos.html?id=${encodeURIComponent(cedula)}`;
  }
});
});




      // const searchForm = document.getElementById('searchForm');
      // const patientInfoSection = document.getElementById('patientInfoSection');
      
      // const toastEl = document.getElementById('notificationToast');
      // const toast = new bootstrap.Toast(toastEl);
      // const toastHeader = document.getElementById('toastHeader');
      // const toastMessage = document.getElementById('toastMessage');
      
      // // Search form submission
      // searchForm.addEventListener('submit', function(e) {
      //   e.preventDefault();
        
      //   const documento = document.getElementById('documento').value;
        
      //   if (!documento) {
      //     showNotification('Por favor ingrese un número de documento', 'error');
      //     return;
      //   }
        
      //   // Find user by document
      //   const user = User.findByDocument(documento);
        
      //   if (user) {
      //     patientInfoSection.style.display = 'block';
          
      //     // Display patient data
      //     document.getElementById('patientName').textContent = `${user.nombre} ${user.apellidos}`;
      //     document.getElementById('patientCedula').textContent = user.cedula;
      //     document.getElementById('patientEmail').textContent = user.email;
      //     document.getElementById('patientTelefono').textContent = user.telefono;
      //     document.getElementById('patientSexo').textContent = user.sexo;
      //     document.getElementById('patientEdad').textContent = user.edad;
          
      //     // Store patient data for other pages
      //     localStorage.setItem('selectedPatient', JSON.stringify(user));
          
      //     showNotification('Paciente encontrado', 'success');
      //   } else {
      //     showNotification('Paciente no encontrado', 'error');
      //   }
      // });
      
      // // Helper function to show notifications
      // function showNotification(message, type) {
      //   if (type === 'success') {
      //     toastHeader.classList.remove('bg-danger', 'text-white');
      //     toastHeader.classList.add('bg-success', 'text-white');
      //   } else {
      //     toastHeader.classList.remove('bg-success', 'text-white');
      //     toastHeader.classList.add('bg-danger', 'text-white');
      //   }
        
      //   toastMessage.textContent = message;
      //   toast.show();
      // }


  
});

document.addEventListener("click", function (e) {
  // Verifica si se hizo clic en el botón de historial
  if (e.target.closest(".btn-historial")) {
    e.preventDefault();
    const btn = e.target.closest(".btn-historial");
    const cedula = btn.getAttribute("data-cedula");
    if (cedula) {
      window.location.href = `../vista/adminHistorialClinico.html?cedula=${encodeURIComponent(cedula)}`;
    } else {
      alert("No hay cédula disponible");
    }
  }

  // Verifica si se hizo clic en el botón de procedimientos
  if (e.target.closest(".btn-procedimientos")) {
    e.preventDefault();
    const btn = e.target.closest(".btn-procedimientos");
    const cedula = btn.getAttribute("data-cedula");
    if (cedula) {
      window.location.href = `../vista/adminProcedimientos.html?cedula=${encodeURIComponent(cedula)}`;
    } else {
      alert("No hay cédula disponible");
    }
  }
});