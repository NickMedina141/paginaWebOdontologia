document.addEventListener('DOMContentLoaded', function() {
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
      
      // Sample citas
      const sampleCitas = [
        { id: "C004", servicio: "Blanqueamiento dental", fecha: "2023-05-15", estado: "Programada" },
        { id: "C005", servicio: "Revisión de ortodoncia", fecha: "2023-05-28", estado: "Pendiente" },
        { id: "C006", servicio: "Extracción dental", fecha: "2023-06-10", estado: "Pendiente" },
      ];
      
      // Sample procedimientos
      let procedimientos = [
        { id: 1, id_cita: "C001", descripcion: "Limpieza dental profunda y aplicación de flúor" },
        { id: 2, id_cita: "C002", descripcion: "Extracción de muela del juicio inferior derecha" },
        { id: 3, id_cita: "C003", descripcion: "Inicio de tratamiento de ortodoncia, colocación de brackets" },
      ];
      
      let selectedCita = null;
      let editingId = null;
      
      // Get patient data from localStorage
      const patientData = localStorage.getItem('selectedPatient');
      if (patientData) {
        const patient = JSON.parse(patientData);
        patientNameEl.textContent = `${patient.nombre} ${patient.apellidos}`;
      }
      
      // Initialize the page
      renderProcedimientos();
      
      // Add Procedimiento button click
      addProcedimientoBtn.addEventListener('click', function() {
        procedimientosListView.style.display = 'none';
        addProcedimientoForm.style.display = 'block';
        editProcedimientoForm.style.display = 'none';
        selectedCita = null;
        document.getElementById('descripcion').value = '';
        
        // Render citas
        renderCitas();
      });
      
      // Cancel Add button click
      cancelAddBtn.addEventListener('click', function() {
        procedimientosListView.style.display = 'block';
        addProcedimientoForm.style.display = 'none';
        editProcedimientoForm.style.display = 'none';
      });
      
      // Confirm Add button click
      confirmAddBtn.addEventListener('click', function() {
        const descripcion = document.getElementById('descripcion').value.trim();
        
        if (!selectedCita || !descripcion) {
          showNotification('Por favor seleccione una cita y escriba una descripción', 'error');
          return;
        }
        
        // Add new procedimiento
        const newProcedimiento = {
          id: Date.now(),
          id_cita: selectedCita,
          descripcion: descripcion,
        };
        
        procedimientos.push(newProcedimiento);
        
        // Switch back to list view
        procedimientosListView.style.display = 'block';
        addProcedimientoForm.style.display = 'none';
        
        // Update the table
        renderProcedimientos();
        
        showNotification('Procedimiento agregado correctamente', 'success');
      });
      
      // Cancel Edit button click
      cancelEditBtn.addEventListener('click', function() {
        procedimientosListView.style.display = 'block';
        addProcedimientoForm.style.display = 'none';
        editProcedimientoForm.style.display = 'none';
      });
      
      // Confirm Edit button click
      confirmEditBtn.addEventListener('click', function() {
        const descripcion = document.getElementById('editDescripcion').value.trim();
        
        if (!descripcion) {
          showNotification('La descripción no puede estar vacía', 'error');
          return;
        }
        
        // Update procedimiento
        procedimientos = procedimientos.map(p => 
          p.id === editingId ? { ...p, descripcion: descripcion } : p
        );
        
        // Switch back to list view
        procedimientosListView.style.display = 'block';
        editProcedimientoForm.style.display = 'none';
        
        // Update the table
        renderProcedimientos();
        
        showNotification('Procedimiento actualizado correctamente', 'success');
      });
      
      // Helper function to render procedimientos
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
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
          btn.addEventListener('click', function() {
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
          btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            
            procedimientos = procedimientos.filter(p => p.id !== id);
            renderProcedimientos();
            
            showNotification('Procedimiento eliminado correctamente', 'success');
          });
        });
      }
      
      // Helper function to render citas
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
          
          // Add click event to selectable citas
          if (!isDisabled) {
            const card = col.querySelector('.card');
            card.addEventListener('click', function() {
              const id = this.getAttribute('data-id');
              selectedCita = id;
              
              // Update UI to show selection
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
      
      // Helper function to show notifications
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