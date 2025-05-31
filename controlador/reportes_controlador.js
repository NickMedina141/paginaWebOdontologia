
document.addEventListener('DOMContentLoaded', function () {
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
  //   let reports = [
  //     {
  //       id: 1,
  //       id_reporte: "REP-2023-01",
  //       fecha_creacion: "2023-01-15",
  //       mes: "Enero 2023",
  //     },
  //     {
  //       id: 2,
  //       id_reporte: "REP-2023-02",
  //       fecha_creacion: "2023-02-15",
  //       mes: "Febrero 2023",
  //     },
  //     {
  //       id: 3,
  //       id_reporte: "REP-2023-03",
  //       fecha_creacion: "2023-03-15",
  //       mes: "Marzo 2023",
  //     },
  //   ];

  let selectedMonth = null;

  // Initialize the page
  renderReports();
  renderMonths();

  // Add Report button click
  addReportBtn.addEventListener('click', function () {
    reportsListView.style.display = 'none';
    addReportView.style.display = 'block';
    pageTitle.textContent = 'Agregar Reporte';
    selectedMonth = null;
    renderMonths();
  });

  // Cancel Add button click
  cancelAddBtn.addEventListener('click', function () {
    reportsListView.style.display = 'block';
    addReportView.style.display = 'none';
    pageTitle.textContent = 'Reportes';
  });

  // Confirm Add button click
  confirmAddBtn.addEventListener('click', function () {
    if (!selectedMonth) {
      showNotification('Por favor seleccione un mes', 'error');
      return;
    }

      subirReporte(selectedMonth);

    // const selectedMonthObj = months.find(m => m.id === selectedMonth);
    // const currentYear = new Date().getFullYear();
    // const monthName = `${selectedMonthObj?.name} ${currentYear}`;

    // // Generate report ID
    // const monthStr = selectedMonth < 10 ? `0${selectedMonth}` : `${selectedMonth}`;
    // const reportId = `REP-${currentYear}-${monthStr}`;

    // // Check if report already exists
    // const reportExists = reports.some(r => r.id_reporte === reportId);
    // if (reportExists) {
    //   showNotification(`Ya existe un reporte para ${monthName}`, 'error');
    //   return;
    // }

    // // Create new report
    // const newReport = {
    //   id: Date.now(),
    //   id_reporte: reportId,
    //   fecha_creacion: new Date().toISOString().split('T')[0],
    //   mes: monthName,
    // };

    // reports.push(newReport);

    // // Store in localStorage
    // localStorage.setItem('reports', JSON.stringify(reports));

    // showNotification('Reporte creado correctamente', 'success');

    // // Switch back to list view
    // setTimeout(() => {
    //   reportsListView.style.display = 'block';
    //   addReportView.style.display = 'none';
    //   pageTitle.textContent = 'Reportes';
    //   renderReports();
    // }, 1500);
  });

  // Helper function to render months
  let reports = [];
  function renderReports() {
    fetch("../modelo/reportesModelo.php", {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'obtenerReportes' })
    })
      .then(respuesta => respuesta.json())
      .then(data => {
        if (data.success) {
          const reportes = data.data;
          reports = data.data; // Assuming data.data contains the reports array
          console.log(reportes);
          reportsTableBody.innerHTML = '';

          reportes.forEach(reporte => {
            const row = document.createElement('tr');
            row.className = 'border-top border-light-subtle hover-bg-light';

            row.innerHTML = `
                    <td class="py-2">${reporte.id_reporte}</td>
                    <td class="py-2">${reporte.fecha_creacion}</td>
                    <td class="py-2">${reporte.mes} ${2025}</td>
                    <td class="py-2 text-end">
                    <div class="d-flex justify-content-end gap-2 opacity-0 group-hover-opacity-100">
                        <button class="btn btn-sm btn-link text-primary download-btn" data-id="${reporte.id_reporte}">
                        <i class="bi bi-download"></i>
                        </button>
                        <button class="btn btn-sm btn-link text-danger delete-btn" data-id="${reporte.id_reporte}">
                        <i class="bi bi-trash"></i>
                        </button>
                    </div>
                    </td>
                `;

            reportsTableBody.appendChild(row);
          });
          // Add event listeners to download and delete buttons
          document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', function () {
              const idReporteStr = this.getAttribute('data-id'); 
              const idReporte = parseInt(idReporteStr, 10); 
              const report = reports.find(r => r.id_reporte === idReporte);
              console.log("Report:", report); // quitar despues
              if (!report) {
                showNotification('Reporte no encontrado', 'error');
                return;
              } else {
                showNotification(`Descargando reporte ${report.id_reporte}`, 'success');
                descargarReporte(report.mes, report.fecha_creacion);
              }
            });
          });

          document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function () {
              const id = parseInt(this.getAttribute('data-id'));
              console.log("ID del reporte a eliminar:", id); // quitar despues
              eliminarReporte(id);
              // reports = reports.filter(r => r.id !== id);
              renderReports();

              // Update localStorage
              // localStorage.setItem('reports', JSON.stringify(reports));

              // showNotification('Reporte eliminado correctamente', 'success');
            });
          });

        } else {
          showNotification('Error al cargar los reportes', 'error');
        }
      })
      .catch(error => {
        console.error('Error al cargar los reportes:', error);
        showNotification('Error al cargar los reportes', 'error');
      });
  }

  async function descargarReporte(mes, fecha_creacion) {

    console.log("LLego a descargarReporte con mes:", mes, "y fecha_creacion:", fecha_creacion); // quitar despues

    const mesesMap = {
      "enero": "01",
      "febrero": "02",
      "marzo": "03",
      "abril": "04",
      "mayo": "05",
      "junio": "06",
      "julio": "07",
      "agosto": "08",
      "septiembre": "09",
      "octubre": "10",
      "noviembre": "11",
      "diciembre": "12"
    };
    const year = new Date().getFullYear();
    const mesNum = mesesMap[mes.toLowerCase()];
    const mesFormateado = `${year}-${mesNum}`;

    console.log("Year:", year); // quitar despues
    console.log("Mes:", mes); // quitar despues
    console.log("Mes Num:", mesNum); // quitar despues
    console.log("Mes Formateado:", mesFormateado); // quitar despues

    if (!mesNum) {
      showNotification('Mes no válido', 'error');
      return;
    }

    try {
      const respuesta = await fetch("../modelo/reportesModelo.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accion: 'obtenerCitas', mes: mesFormateado, fecha_creacion: fecha_creacion })
      });


      // const data = await respuesta.json();
      const data = JSON.parse(await respuesta.text());
      console.log("Data obtenida:", data); // quitar despues
      if (!data.success) {
        showNotification('Error al obtener citas para el reporte', 'error');
        return;
      }

      const citas = data.data;

      if (citas.length === 0) {
        showNotification('No hay citas para este mes', 'success');
        return;
      }

      // Aquí generas el Excel usando SheetJS (XLSX) o similar
      generarExcel(citas, mes, fecha_creacion);
    } catch (error) {
      console.error('Error al obtener citas:', error);
      showNotification('Error al obtener citas para el reporte', 'error');
    }
  }

  function generarExcel(data, mes, fecha_creacion) {
    const encabezados = {
      id_cita: 'ID Cita',
      pacientes_cedula: 'Cédula Paciente',
      odontologos_cedula: 'Cédula Odontólogo',
      fecha: 'Fecha',
      hora_inicio: 'Hora Inicio',
      hora_fin: 'Hora Fin',
      estado: 'Estado',
      servicio: 'Servicio',
      id_horario: 'ID Horario'
    };

    const datosParaExcel = data.map(item => {
      let nuevo = {};
      for (let key in encabezados) {
        nuevo[encabezados[key]] = item[key];
      }
      return nuevo;
    });

    /* global XLSX */
    const worksheet = XLSX.utils.json_to_sheet(datosParaExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

    const nombreArchivo = `reporte_${mes}_${fecha_creacion}.xlsx`;
    XLSX.writeFile(workbook, nombreArchivo);
  }

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
      card.addEventListener('click', function () {
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

  function subirReporte(selectedMonth){

    const mesesMap = {
      "1": "enero",
      "2": "febrero",
      "3": "marzo",
      "4": "abril",
      "5": "mayo",
      "6": "junio",
      "7": "julio",
      "8": "agosto",
      "9": "septiembre",
      "10": "octubre",
      "11": "noviembre",
      "12": "diciembre"
    };

    selectedMonth = mesesMap[selectedMonth];
    console.log("Subiendo reporte para el mes:", selectedMonth); // quitar despues

    const fecha_creacion = new Date().toISOString().split('T')[0];
    fetch("../modelo/reportesModelo.php", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'subirReporte', mes: selectedMonth, fecha_creacion: fecha_creacion })
    })
      .then(respuesta => respuesta.json())
      .then(data => {
        if (data.success) {
          showNotification('Reporte subido correctamente', 'success');
          reportsListView.style.display = 'block';
          addReportView.style.display = 'none';
          renderReports();
        } else {
          showNotification('Error al subir el reporte', 'error');
        }
      })
      .catch(error => {
        console.error('Error al subir el reporte:', error);
        showNotification('Error al subir el reporte', 'error');
      });
    
  }

  function eliminarReporte(id_reporte) {
    fetch("../modelo/reportesModelo.php", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'eliminarReporte', id_reporte: id_reporte })
    })
      .then(respuesta => respuesta.json())
      .then(data => {
        if (data.success) {
          showNotification('Reporte eliminado correctamente', 'success');
          renderReports();
        } else {
          showNotification('Error al eliminar el reporte', 'error');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el reporte:', error);
        showNotification('Error al eliminar el reporte', 'error');
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