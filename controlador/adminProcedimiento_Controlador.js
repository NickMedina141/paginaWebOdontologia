document.addEventListener('DOMContentLoaded', function() {
  const patientId = getPatientIdFromURL();
  if (!patientId) {
    showToast('Error', 'No se encontró el paciente en la URL', true);
    return;
  }

  let citaSeleccionada = null;
  cargarProcedimientos(patientId);

  document.getElementById('addProcedimientoBtn').addEventListener('click', function() {
    document.getElementById('procedimientosListView').style.display = 'none';
    document.getElementById('addProcedimientoForm').style.display = 'block';
    cargarCitasDisponibles(patientId);
  });

  document.getElementById('cancelAddBtn').addEventListener('click', function() {
    document.getElementById('addProcedimientoForm').style.display = 'none';
    document.getElementById('procedimientosListView').style.display = 'block';
  });

  document.getElementById('confirmAddBtn').addEventListener('click', function () {
    const descripcion = document.getElementById('descripcion').value.trim();
    const citaSeleccionada = document.querySelector('input[name="citaSeleccionada"]:checked');
    SubirProcedimientos();

    // if (!descripcion || !citaSeleccionada) {
    //   showToast('Error', 'Debe seleccionar una cita y escribir una descripción', true);
    //   return;
    // }

    // const idCita = citaSeleccionada.value;

    // fetch('../modelo/adminProcedimientoModelo.php', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     accion: 'agregarProcedimiento',
    //     id_cita: idCita,
    //     descripcion
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.exito) {
    //       showToast('Éxito', 'Procedimiento registrado correctamente');
    //       document.getElementById('addProcedimientoForm').style.display = 'none';
    //       document.getElementById('procedimientosListView').style.display = 'block';
    //       cargarProcedimientos(patientId);
    //     } else {
    //       showToast('Error', data.mensaje || 'No se pudo registrar el procedimiento', true);
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error al agregar procedimiento:', error);
    //     showToast('Error', 'Error de conexión con el servidor', true);
    //   });
  });
});


function cargarCitasDisponibles(idPaciente) {
  fetch('../modelo/adminProcedimientoModelo.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accion: 'obtenerCitas',
      id_paciente: idPaciente
    })
  })
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('citasContainer');
      container.innerHTML = '';

      if (data && data.length > 0) {
        data.forEach(cita => {
          // const div = document.createElement('div');
          const estadoLabel = cita.estado == 1 ? 
          '<span class="badge bg-success">Completada</span>' :
          '<span class="badge bg-warning text-dark">Pendiente</span>';

          const mensaje = cita.estado == 1 ?
          '':
          '<p class="text-danger">Solo citas completadas</p>';
          const deshabilitado = cita.estado == 1 ? '' : 'disabled';


          const div = document.createElement('div');
          div.className = 'col-12';

          // div.innerHTML = `
          //   <div class="border rounded p-3 mb-2 ${deshabilitado ? 'bg-light' : ''}">
          //   <div class="d-flex justify-content-between">
          //   <strong>C00${cita.id_cita}</strong>
          //   ${estadoLabel}
          //   </div>
          //   <div>${cita.servicio}</div>
          //   <div class="text-muted">${cita.fecha}</div>
          //   ${mensaje}
          //   <div class="form-check mt-2">
          //   <input class="form-check-input" type="radio" name="citaSeleccionada" id="cita${cita.id_cita}" value="${cita.id_cita}" ${deshabilitado}>
          //   <label class="form-check-label" for="cita${cita.id_cita}">
          //   Seleccionar
          //   </label>
          //   </div>
          // </div>
          //   `;
          div.innerHTML = `
          <div class="seleccionable-cita ${deshabilitado}" data-id="${cita.id_cita}">
            <div class="border rounded p-3 mb-2 ${deshabilitado ? 'bg-light' : ''}">
            <div class="d-flex justify-content-between">
            <strong>C00${cita.id_cita}</strong>
            ${estadoLabel}
            </div>
            <div>${cita.servicio}</div>
            <div class="text-muted">${cita.fecha}</div>
            ${mensaje}
            </div>
          </div>
            `;

          container.appendChild(div);
        });
        document.querySelectorAll('.seleccionable-cita').forEach(card => {
        if (!card.classList.contains('disabled')) {
            card.addEventListener('click', () => {
            // Desmarcar todas
            document.querySelectorAll('.seleccionable-cita').forEach(c => c.classList.remove('selected'));
            // Marcar esta
            card.classList.add('selected');
            // Guardar ID
            citaSeleccionada = card.dataset.id;
            console.log('Cita seleccionada:', citaSeleccionada);

            });
          }
        });
      } else {
        container.innerHTML = `<p class="text-muted">No hay citas disponibles para este paciente.</p>`;
      }
    })
    .catch(error => {
      console.error('Error al cargar citas disponibles:', error);
      showToast('Error', 'No se pudieron obtener las citas disponibles', true);
    });
}

citaSeleccionada = null;
async function SubirProcedimientos(){
  if(citaSeleccionada == null || citaSeleccionada == undefined){
    showToast("Error", "Debe seleccionar una cita")
  }
  const descripcion = document.getElementById('descripcion').value.trim();
  const cita = citaSeleccionada;
  const cedula = getPatientIdFromURL();
  if (!descripcion || !citaSeleccionada) {
      showToast('Error', 'Debe seleccionar una cita y escribir una descripción', true);
      return;
    }
  console.log("estamos en SubirProcedimientos");
  console.log('Cedula:', cedula);
  // console.log('Cita seleccionada:', citaSeleccionada ? citaSeleccionada.value : 'Ninguna');
  console.log('Cita seleccionada:', cita);
  console.log('Descripción:', descripcion);

  

  const data = {
    accion: "agregarProcedimiento",
    paciente_cedula: cedula,
    id_cita: citaSeleccionada,
    descripcion: descripcion
  };

  console.log("Datos a enviar:", JSON.stringify(data));
  try{
    const respuesta = await fetch('../modelo/adminProcedimientoModelo.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const resultado = await respuesta.json();
    if(resultado.success){
      showToast('Éxito', 'Procedimiento agregado correctamente');
      //redireccionar a la vista de adminProcedimiento.html
      window.location.href = `../vista/adminProcedimientos.html?cedula=${cedula}`;
    }
    else{
      console.error('Error al agregar procedimiento:', resultado.mensaje);
      showToast('Error', resultado.mensaje || 'No se pudo agregar el procedimiento', true);
    }
  } catch (error) {
    console.error('Error al agregar procedimiento:', error);
    showToast('Error', 'Ocurrió un error al conectar con el servidor', true);
  }
}


function getPatientIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  // return params.get('id');
  console.log('cedula:', params.get('cedula'));
    return params.get('cedula');
}
function cargarProcedimientos(idPaciente) {
  fetch('../modelo/adminProcedimientoModelo.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accion: 'obtenerProcedimientos',
      paciente_cedula: idPaciente
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Datos recibidos:', data);
    // if (data.exito) {
    //   renderizarProcedimientos(data.procedimientos);
    // } 
    if (data && data.length > 0) {
      renderizarProcedimientos(data);
    } 
     else {
      showToast('Error', data.mensaje || 'No se pudieron obtener los procedimientos', true);
    }
  })
  .catch(error => {
    console.error('Error al cargar procedimientos:', error);
    showToast('Error', 'Ocurrió un error al conectar con el servidor', true);
  });
}

// let ProcedimientosGlobales = null;
let idProcedimientoGlobal = null;
function renderizarProcedimientos(procedimientos) {
  console.log('Procedimientos a renderizar:', procedimientos);
  const tbody = document.getElementById('procedimientosTableBody');
  tbody.innerHTML = '';

  if (procedimientos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center">No hay procedimientos registrados.</td></tr>`;
    return;
  }

  document.getElementById("patientName").innerHTML = `${procedimientos[0].nombre_paciente}`;

  procedimientos.forEach(proc => {
    const tr = document.createElement('tr');
    // tr.innerHTML = `
    //   <td>C${proc.id_cita}</td>
    //   <td>${proc.descripcion}</td>
    //   <td class="text-end">
    //     <button class="btn btn-sm btn-outline-primary me-2" data-id="${proc.id_procedimiento}" data-descripcion = "${proc.descripcion}" onclick="editarProcedimiento(${proc.id_procedimiento},${proc.descripcion})">
    //       <i class="bi bi-pencil"></i>
    //     </button>
    //     <button class="btn btn-sm btn-outline-danger" data-id="${proc.id_procedimiento}"  onclick="eliminarProcedimiento(${proc.id_procedimiento})">
    //       <i class="bi bi-trash"></i>
    //     </button>
    //   </td>
    // `;
    tr.innerHTML = `
  <td>C${proc.id_cita}</td>
  <td>${proc.descripcion}</td>
  <td class="text-end">
    <button class="btn btn-sm btn-outline-primary me-2"
      data-id="${proc.id_procedimiento}"
      data-descripcion="${proc.descripcion.replace(/"/g, '&quot;')}"
      onclick="editarProcedimiento(this)">
      <i class="bi bi-pencil"></i>
    </button>
    <button class="btn btn-sm btn-outline-danger"
      onclick="eliminarProcedimiento(${proc.id_procedimiento})">
      <i class="bi bi-trash"></i>
    </button>
  </td>
`;
    tbody.appendChild(tr);
  });
}

function showToast(titulo, mensaje, isError = false) {
  const toastHeader = document.getElementById('toastHeader');
  toastHeader.classList.toggle('bg-danger', isError);
  toastHeader.classList.toggle('bg-primary', !isError);

  document.getElementById('toastTitle').textContent = titulo;
  document.getElementById('toastMessage').textContent = mensaje;

  const toastElement = document.getElementById('notificationToast');
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}





// Placeholder functions for editar y eliminar, para que no haya error en consola
function editarProcedimiento(buttonElement) {
  const id = buttonElement.getAttribute('data-id');
  idProcedimientoGlobal = id; // Guardar el ID del procedimiento globalmente
  const descripcion = buttonElement.getAttribute('data-descripcion');
  console.log('Editar procedimiento con id_procedimiento:', id);
  console.log('Descripción:', descripcion);

  // const procedimiento = procedimientosGlobales.find(p => p.id_procedimiento === id);
  // if (!procedimiento) {
  //   showToast('Error', 'Procedimiento no encontrado', true);
  //   return;
  // }

  // Ocultar la lista de procedimientos
  document.getElementById('procedimientosListView').style.display = 'none';

  // Mostrar el formulario de edición
  document.getElementById('editProcedimientoForm').style.display = 'block';

  document.getElementById("editDescripcion").value = ''; 
  document.getElementById("editDescripcion").value = descripcion;

}

function eliminarProcedimiento(id) {
  console.log('Eliminar procedimiento con id_procedimiento:', id);
  if (confirm('¿Estás seguro de que deseas eliminar este procedimiento?')) {
    fetch('../modelo/adminProcedimientoModelo.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accion: 'eliminarProcedimiento',
        id_procedimiento: id
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.exito) {
          showToast('Éxito', 'Procedimiento eliminado correctamente');
          // cargarProcedimientos(getPatientIdFromURL());
          // window.location.href = `../vista/adminProcedimientos.html?cedula=${cedula}`; // Redirigir a la lista de procedimientos
          renderizarProcedimientos(data.procedimientos); // Actualizar la lista de procedimientos
        } else {
          showToast('Error', data.mensaje || 'No se pudo eliminar el procedimiento', true);
        }
      })
      .catch(error => {
        console.error('Error al eliminar procedimiento:', error);
        showToast('Error', 'Error de conexión con el servidor', true);
      });
  }
}

document.getElementById('confirmEditBtn').addEventListener('click', () => {
  const id = idProcedimientoGlobal;
  const nuevaDescripcion = document.getElementById('editDescripcion').value.trim();

  console.log('ID:', id);
console.log('Descripción:', nuevaDescripcion);
  if (!nuevaDescripcion) {
    showToast('Error', 'La descripción no puede estar vacía', true);
    return;
  }
  fetch('../modelo/adminProcedimientoModelo.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      accion: 'editarProcedimiento',
      id_procedimiento: id,
      descripcion: nuevaDescripcion
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showToast('Éxito', 'Procedimiento actualizado correctamente');
        // Regresar a la vista de lista
        document.getElementById('editProcedimientoForm').style.display = 'none';
        document.getElementById('procedimientosListView').style.display = 'block';
        cargarProcedimientos(getPatientIdFromURL());
      } else {
        showToast('Error', data.mensaje || 'No se pudo actualizar', true);
      }
    })
    .catch(err => {
      console.error('Error al editar procedimiento:', err);
      showToast('Error', 'Error de conexión con el servidor', true);
    });
});

document.getElementById('cancelEditBtn').addEventListener('click', () => {
  // Ocultar el formulario de edición
  document.getElementById('editProcedimientoForm').style.display = 'none';

  // Mostrar la vista de lista de procedimientos
  document.getElementById('procedimientosListView').style.display = 'block';
});
