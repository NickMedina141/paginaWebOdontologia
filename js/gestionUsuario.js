
  const searchForm = document.getElementById("searchForm");
  const userInfoSection = document.getElementById("userInfoSection");
  const viewUserInfo = document.getElementById("viewUserInfo");
  const editUserInfo = document.getElementById("editUserInfo");
  const viewButtons = document.getElementById("viewButtons");
  const editButtons = document.getElementById("editButtons");
  const updateButton = document.getElementById("updateButton");
  const deleteButton = document.getElementById("deleteButton");
  const confirmButton = document.getElementById("confirmButton");
  const cancelButton = document.getElementById("cancelButton");
  // const searchButton = document.getElementById("searchButton");

  const toastEl = document.getElementById("notificationToast");
  const toast = new bootstrap.Toast(toastEl);
  const toastHeader = document.getElementById("toastHeader");
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");
  editButtons.style.display = "none";


// document.addEventListener("DOMContentLoaded", ()=> {
  
// });

if(updateButton){
  
    updateButton.addEventListener("click", async (e) => {
      e.preventDefault();

      // const searchButton = document.getElementById("searchButton");

      viewUserInfo.style.display="none";
      editUserInfo.style.display="block";
      document.getElementById("editNombre").value = userData.nombre;
      document.getElementById("editApellidos").value= userData.apellidos;
      document.getElementById("editCedula").value = userData.cedula;
      document.getElementById("editEmail").value = userData.email;
      document.getElementById("editTelefono").value = userData.telefono;
      document.getElementById("editSexo").value = Sexo(userData.sexo);
      document.getElementById("editEdad").value = userData.edad;
      document.getElementById("editRol").value = userData.rol;
      deleteButton.style.display="block";
      editButtons.style.display="block";
      updateButton.style.display = "none";
      // searchButton.disabled = true;
      
  });
}

  // Search form submission
  if (searchForm) {
    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const documento = document.getElementById("documento").value;

      if (!documento) {
        showNotification( "Ingrese el documento de identidad");

        return;
      }

      // Mostrar la sección de usuario
      userInfoSection.style.display = "block";

      // Llamar a la función Personal() y actualizar userData con los datos
      const pacienteDatos = await Personal();
      if (pacienteDatos) {
        // alert(pacienteDatos.length);
      
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
        showNotification("Usuario encontrado");
        viewNombre.textContent = userData.nombre;
        viewApellidos.textContent= userData.apellidos;
        viewCedula.textContent = userData.cedula;
        viewEmail.textContent = userData.email;
        viewTelefono.textContent = userData.telefono;
        viewSexo.textContent = Sexo(userData.sexo);
        viewEdad.textContent = mostrarEdad(userData.edad);
        viewRol.textContent = userData.rol;
        viewUserInfo.style.display="block";
      } else {
        showNotification("No se encontró un usuario con ese documento");
        // viewUserInfo.style.display="none";r
        viewUserInfo.style.display="none";
        // return
      }
    });
  }


//boton para cancelar todo
document.addEventListener("DOMContentLoaded", ()=> {
  if(cancelButton){
    cancelButton.addEventListener("click", async (e)=>{
      userInfoSection.style.display = "none";
      viewUserInfo.style.display = "none";
      editUserInfo.style.display = "none"; 
      deleteButton.style.display = "none";
      editButtons.style.display = "none";
      updateButton.style.display = "block";
      searchButton.disabled = false;
    });
    }

  if(confirmButton){
    confirmButton.addEventListener("click", async (e)=>{
      console.log("Felicidades llego al boton confirmar");
      
      document.getElementById("hiddenNombre").value = userData.nombres;
      document.getElementById("hiddenApellidos").value = document.getElementById("editNombre").value;
      document.getElementById("hiddenCedula").value = document.getElementById("editApellidos").value;;
      document.getElementById("hiddenEmail").value = document.getElementById("editEmail").value;;
      document.getElementById("hiddenTelefono").value = document.getElementById("editTelefono").value;;
      document.getElementById("hiddenSexo").value = document.getElementById("editSexo").value;
      document.getElementById("hiddenEdad").value = document.getElementById("editEdad").value;
      document.getElementById("hiddenRol").value = document.getElementById("editRol").value;
      document.getElementById("hiddenForm").submit();
    });
//     document.getElementById('confirmButton').addEventListener('click', function (e) {
//     e.preventDefault();  // para evitar comportamiento por defecto y probar

//     document.getElementById('hiddenNombre').value = document.getElementById('editNombre').value;
//     document.getElementById('hiddenApellidos').value = document.getElementById('editApellidos').value;
//     document.getElementById('hiddenCedula').value = document.getElementById('editCedula').value;
//     document.getElementById('hiddenEmail').value = document.getElementById('editEmail').value;
//     document.getElementById('hiddenTelefono').value = document.getElementById('editTelefono').value;
//     document.getElementById('hiddenSexo').value = document.getElementById('editSexo').value;
//     document.getElementById('hiddenEdad').value = document.getElementById('editEdad').value;
//     document.getElementById('hiddenRol').value = document.getElementById('editRol').value;

//     console.log('Formulario preparado para enviar: ', {
//       nombre: document.getElementById('hiddenNombre').value,
//       apellidos: document.getElementById('hiddenApellidos').value,
//       cedula: document.getElementById('hiddenCedula').value,
//       email: document.getElementById('hiddenEmail').value,
//       telefono: document.getElementById('hiddenTelefono').value,
//       sexo: document.getElementById('hiddenSexo').value,
//       edad: document.getElementById('hiddenEdad').value,
//       rol: document.getElementById('hiddenRol').value
//     });

//     // Quita el preventDefault para enviar
//     // this.form.submit(); // si confirmButton está dentro del form, si no, usa:
//     document.getElementById('hiddenForm').submit();
// });
  }
});

// Función Personal que obtiene la información del paciente
const Personal = async () => {

  const mispacientes = document.getElementById("respuestas");
  const id = document.getElementById("documento").value;

  try {
    const respuesta = await fetch('../php/json_paciente.php?id=' + id);
    // const respuesta = await fetch('../modelo/gestionUsuarioModelo.php?id=' + id);

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