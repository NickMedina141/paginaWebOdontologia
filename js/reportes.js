
document.addEventListener('DOMContentLoaded', function() {
const reportsListView = document.getElementById('reportsListView');
const addReportView = document.getElementById('addReportView');
const reportsTableBody = document.getElementById('reportsTableBody');
const monthsGrid = document.getElementById('monthsGrid');
const pageTitle = document.getElementById('pageTitle');
      
      const addReportBtn = document.getElementById('addReportBtn');
      const confirmAddBtn = document.getElementById('confirmAddBtn');
      const cancelAddBtn = document.getElementById('cancelAddBtn');
      
      const toastEl = document.getElementById('notificationToast');
      const toast = new bootstrap.Toast(toastEl);
      const toastHeader = document.getElementById('toastHeader');
      const toastMessage = document.getElementById('toastMessage');
      
      // Sample months
      const months = [
        { id: 1, name: "Enero" },
        { id: 2, name: "Febrero" },
        { id: 3, name: "Marzo" },
        { id: 4, name: "Abril" },
        { id: 5, name: "Mayo" },
        { id: 6, name: "Junio" },
        { id: 7, name: "Julio" },
        { id: 8, name: "Agosto" },
        { id: 9, name: "Septiembre" },
        { id: 10, name: "Octubre" },
        { id: 11, name: "Noviembre" },
        { id: 12, name: "Diciembre" },
      ];
      
      //revisar aca
      // Sample reports
      let reports = [
        {
          id: 1,
          id_reporte: "REP-2023-01",
          fecha_creacion: "2023-01-15",
          mes: "Enero 2023",
        },
        {
          id: 2,
          id_reporte: "REP-2023-02",
          fecha_creacion: "2023-02-15",
          mes: "Febrero 2023",
        },
        {
          id: 3,
          id_reporte: "REP-2023-03",
          fecha_creacion: "2023-03-15",
          mes: "Marzo 2023",
        },
      ];
      
      let selectedMonth = null;
      
      // Initialize the page
      renderReports();
      renderMonths();
      
      // Add Report button click
      addReportBtn.addEventListener('click', function() {
        reportsListView.style.display = 'none';
        addReportView.style.display = 'block';
        pageTitle.textContent = 'Agregar Reporte';
        selectedMonth = null;
        renderMonths();
      });
      
      // Cancel Add button click
      cancelAddBtn.addEventListener('click', function() {
        reportsListView.style.display = 'block';
        addReportView.style.display = 'none';
        pageTitle.textContent = 'Reportes';
      });
      
      // Confirm Add button click
      confirmAddBtn.addEventListener('click', function() {
        if (!selectedMonth) {
          showNotification('Por favor seleccione un mes', 'error');
          return;
        }
        
        const selectedMonthObj = months.find(m => m.id === selectedMonth);
        const currentYear = new Date().getFullYear();
        const monthName = `${selectedMonthObj?.name} ${currentYear}`;
        
        // Generate report ID
        const monthStr = selectedMonth < 10 ? `0${selectedMonth}` : `${selectedMonth}`;
        const reportId = `REP-${currentYear}-${monthStr}`;
        
        // Check if report already exists
        const reportExists = reports.some(r => r.id_reporte === reportId);
        if (reportExists) {
          showNotification(`Ya existe un reporte para ${monthName}`, 'error');
          return;
        }
        
        // Create new report
        const newReport = {
          id: Date.now(),
          id_reporte: reportId,
          fecha_creacion: new Date().toISOString().split('T')[0],
          mes: monthName,
        };
        
        reports.push(newReport);
        
        // Store in localStorage
        localStorage.setItem('reports', JSON.stringify(reports));
        
        showNotification('Reporte creado correctamente', 'success');
        
        // Switch back to list view
        setTimeout(() => {
          reportsListView.style.display = 'block';
          addReportView.style.display = 'none';
          pageTitle.textContent = 'Reportes';
          renderReports();
        }, 1500);
      });
      
      // Helper function to render reports
      function renderReports() {
        reportsTableBody.innerHTML = '';
        
        reports.forEach(report => {
          const row = document.createElement('tr');
          row.className = 'border-top border-light-subtle hover-bg-light';
          
          row.innerHTML = `
            <td class="py-2">${report.id_reporte}</td>
            <td class="py-2">${report.fecha_creacion}</td>
            <td class="py-2">${report.mes}</td>
            <td class="py-2 text-end">
              <div class="d-flex justify-content-end gap-2 opacity-0 group-hover-opacity-100">
                <button class="btn btn-sm btn-link text-primary download-btn" data-id="${report.id}">
                  <i class="bi bi-download"></i>
                </button>
                <button class="btn btn-sm btn-link text-danger delete-btn" data-id="${report.id}">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </td>
          `;
          
          reportsTableBody.appendChild(row);
        });
        
        // Add event listeners to download and delete buttons
        document.querySelectorAll('.download-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const report = reports.find(r => r.id === id);
            
            if (report) {
              showNotification(`Descargando reporte ${report.id_reporte}`, 'success');
            }
          });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            
            reports = reports.filter(r => r.id !== id);
            renderReports();
            
            // Update localStorage
            localStorage.setItem('reports', JSON.stringify(reports));
            
            showNotification('Reporte eliminado correctamente', 'success');
          });
        });
      }
      
      // Helper function to render months
      function renderMonths() {
        monthsGrid.innerHTML = '';
        
        months.forEach(month => {
          const col = document.createElement('div');
          col.className = 'col-6 col-sm-4 col-md-3';
          
          const isSelected = selectedMonth === month.id;
          
          col.innerHTML = `
            <div class="card border ${isSelected ? 'border-primary bg-primary bg-opacity-10' : 'border-light-subtle hover-border-primary-subtle'} 
                 cursor-pointer transition-colors" data-id="${month.id}">
              <div class="card-body p-3 text-center">
                <div class="fw-medium">${month.name}</div>
              </div>
            </div>
          `;
          
          monthsGrid.appendChild(col);
          
          // Add click event
          const card = col.querySelector('.card');
          card.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            selectedMonth = id;
            
            // Update UI to show selection
            document.querySelectorAll('#monthsGrid .card').forEach(c => {
              c.classList.remove('border-primary', 'bg-primary', 'bg-opacity-10');
              c.classList.add('border-light-subtle');
            });
            
            this.classList.remove('border-light-subtle');
            this.classList.add('border-primary', 'bg-primary', 'bg-opacity-10');
          });
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