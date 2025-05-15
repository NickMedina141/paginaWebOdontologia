document.addEventListener('DOMContentLoaded', function() {
      const searchForm = document.getElementById('searchForm');
      const patientInfoSection = document.getElementById('patientInfoSection');
      
      const toastEl = document.getElementById('notificationToast');
      const toast = new bootstrap.Toast(toastEl);
      const toastHeader = document.getElementById('toastHeader');
      const toastMessage = document.getElementById('toastMessage');
      
      // Search form submission
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const documento = document.getElementById('documento').value;
        
        if (!documento) {
          showNotification('Por favor ingrese un número de documento', 'error');
          return;
        }
        
        // Find user by document
        const user = User.findByDocument(documento);
        
        if (user) {
          patientInfoSection.style.display = 'block';
          
          // Display patient data
          document.getElementById('patientName').textContent = `${user.nombre} ${user.apellidos}`;
          document.getElementById('patientCedula').textContent = user.cedula;
          document.getElementById('patientEmail').textContent = user.email;
          document.getElementById('patientTelefono').textContent = user.telefono;
          document.getElementById('patientSexo').textContent = user.sexo;
          document.getElementById('patientEdad').textContent = user.edad;
          
          // Store patient data for other pages
          localStorage.setItem('selectedPatient', JSON.stringify(user));
          
          showNotification('Paciente encontrado', 'success');
        } else {
          showNotification('Paciente no encontrado', 'error');
        }
      });
      
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