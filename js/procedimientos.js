document.addEventListener('DOMContentLoaded', function () {
  const patientNameEl = document.getElementById('patientName');
  const procedimientosListView = document.getElementById('procedimientosListView');
  const addProcedimientoForm = document.getElementById('addProcedimientoForm');
  const editProcedimientoForm = document.getElementById('editProcedimientoForm');
  const procedimientosTableBody = document.getElementById('procedimientosTableBody');
  const citasContainer = document.getElementById('citasContainer');

  const addProcedimientoBtn = document.getElementById('addProcedimientoBtn');
  const confirmAddBtn = document.getElementById('confirmAddBtn');
  const cancelAddBtn = document.getElementById('cancelAddBtn');
  const confirmEditBtn = document.getElementById('confirmEditBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');

  const toastEl = document.getElementById('notificationToast');
  const toast = new bootstrap.Toast(toastEl);
  const toastHeader = document.getElementById('toastHeader');
  const toastMessage = document.getElementById('toastMessage');

  const sampleCitas = [
    { id: "C004", servicio: "Blanqueamiento dental", fecha: "2023-05-15", estado: "Programada" },
    { id: "C005", servicio: "Revisión de ortodoncia", fecha: "2023-05-28", estado: "Pendiente" },
    { id: "C006", servicio: "Extracción dental", fecha: "2023-06-10", estado: "Pendiente" },
  ];

  let procedimientos = [
    { id: 1, id_cita: "C001", descripcion: "Limpieza dental profunda y aplicación de flúor" },
    { id: 2, id_cita: "C002", descripcion: "Extracción de muela del juicio inferior derecha" },
    { id: 3, id_cita: "C003", descripcion: "Inicio de tratamiento de ortodoncia, colocación de brackets" },
  ];

  let selectedCita = null;
  let editingId = null;

  const patientData = localStorage.getItem('selectedPatient');
  if (patientData) {
    const patient = JSON.parse(patientData);
    patientNameEl.textContent = `${patient.nombre} ${patient.apellidos}`;
  }

  // Inicializar la pagina
  renderProcedimientos();

  // Añadir click al boton de añadir procedimiento
  addProcedimientoBtn.addEventListener('click', function () {
    procedimientosListView.style.display = 'none';
    addProcedimientoForm.style.display = 'block';
    editProcedimientoForm.style.display = 'none';
    selectedCita = null;
    document.getElementById('descripcion').value = '';

    // renderizar las citas
    renderCitas();
  });

  // evento click del boton cancelar
  cancelAddBtn.addEventListener('click', function () {
    procedimientosListView.style.display = 'block';
    addProcedimientoForm.style.display = 'none';
    editProcedimientoForm.style.display = 'none';
  });

  // evento click del boton confirmar
  confirmAddBtn.addEventListener('click', function () {
    const descripcion = document.getElementById('descripcion').value.trim();

    if (!selectedCita || !descripcion) {
      showNotification('Por favor seleccione una cita y escriba una descripción', 'error');
      return;
    }

    const newProcedimiento = {
      id: Date.now(),
      id_cita: selectedCita,
      descripcion: descripcion,
    };

    procedimientos.push(newProcedimiento);

    procedimientosListView.style.display = 'block';
    addProcedimientoForm.style.display = 'none';

    // Actualizar la tabla
    renderProcedimientos();

    showNotification('Procedimiento agregado correctamente', 'success');
  });

  // evento para cancelar el editor de procedimientos
  cancelEditBtn.addEventListener('click', function () {
    procedimientosListView.style.display = 'block';
    addProcedimientoForm.style.display = 'none';
    editProcedimientoForm.style.display = 'none';
  });

  // evento click del boton confirmar el edit
  confirmEditBtn.addEventListener('click', function () {
    const descripcion = document.getElementById('editDescripcion').value.trim();

    if (!descripcion) {
      showNotification('La descripción no puede estar vacía', 'error');
      return;
    }

    procedimientos = procedimientos.map(p =>
      p.id === editingId ? { ...p, descripcion: descripcion } : p
    );

    // volver a la vista inicial de procedimientos del paciente
    procedimientosListView.style.display = 'block';
    editProcedimientoForm.style.display = 'none';

    // actualizar la pagina
    renderProcedimientos();

    showNotification('Procedimiento actualizado correctamente', 'success');
  });

  function renderProcedimientos() {
    procedimientosTableBody.innerHTML = '';

    procedimientos.forEach(procedimiento => {
      const row = document.createElement('tr');
      row.className = 'border-top border-light-subtle hover-bg-light';

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
          `;

      procedimientosTableBody.appendChild(row);
    });

    //eventos de los botones editar y eliminar de los procedimientos
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));
        const procedimiento = procedimientos.find(p => p.id === id);

        if (procedimiento) {
          editingId = id;
          document.getElementById('editDescripcion').value = procedimiento.descripcion;

          procedimientosListView.style.display = 'none';
          addProcedimientoForm.style.display = 'none';
          editProcedimientoForm.style.display = 'block';
        }
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));

        procedimientos = procedimientos.filter(p => p.id !== id);
        renderProcedimientos();

        showNotification('Procedimiento eliminado correctamente', 'success');
      });
    });
  }

  function renderCitas() {
    citasContainer.innerHTML = '';

    sampleCitas.forEach(cita => {
      const col = document.createElement('div');
      col.className = 'col-12';

      const isDisabled = cita.estado !== 'Completada';
      const isSelected = selectedCita === cita.id;

      col.innerHTML = `
            <div class="card ${isDisabled ? 'opacity-50' : isSelected ? 'border-primary bg-primary bg-opacity-10' : 'border-light-subtle hover-border-primary-subtle'} 
                cursor-pointer transition-colors" data-id="${cita.id}" ${isDisabled ? 'data-disabled="true"' : ''}>
              <div class="card-body p-3">
                <div class="d-flex justify-content-between">
                  <span class="fw-medium">${cita.id}</span>
                  <span class="badge ${cita.estado === 'Completada' ? 'bg-success' : 'bg-warning text-dark'} rounded-pill">
                    ${cita.estado}
                  </span>
                </div>
                <div class="small text-secondary mt-1">${cita.servicio}</div>
                <div class="small text-muted mt-1">${cita.fecha}</div>
                ${isDisabled ? '<div class="small text-danger mt-1 fst-italic">Solo citas completadas</div>' : ''}
              </div>
            </div>
          `;

      citasContainer.appendChild(col);

      // Añadir evento de clic a citas seleccionables 
      if (!isDisabled) {
        const card = col.querySelector('.card');
        card.addEventListener('click', function () {
          const id = this.getAttribute('data-id');
          selectedCita = id;

          // Actualizar la interfaz de usuario para mostrar la selección
          document.querySelectorAll('#citasContainer .card').forEach(c => {
            c.classList.remove('border-primary', 'bg-primary', 'bg-opacity-10');
            c.classList.add('border-light-subtle');
          });

          this.classList.remove('border-light-subtle');
          this.classList.add('border-primary', 'bg-primary', 'bg-opacity-10');
        });
      }
    });
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