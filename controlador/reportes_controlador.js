
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

  let selectedMonth = null;

  // Inicializar la pagina
  renderReports();
  renderMonths();

  // Añadir reporte
  addReportBtn.addEventListener('click', function () {
    reportsListView.style.display = 'none';
    addReportView.style.display = 'block';
    pageTitle.textContent = 'Agregar Reporte';
    selectedMonth = null;
    renderMonths();
  });

  //Evento del boton cancelar
  cancelAddBtn.addEventListener('click', function () {
    reportsListView.style.display = 'block';
    addReportView.style.display = 'none';
    pageTitle.textContent = 'Reportes';
  });

  // Confirmar clic en el botón Agregar
  confirmAddBtn.addEventListener('click', function () {
    if (!selectedMonth) {
      showNotification('Por favor seleccione un mes', 'error');
      return;
    }
    subirReporte(selectedMonth);
  });


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
          reports = data.data; 
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
          // Evento de escucha del boton para descargar
          document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', function () {
              const idReporteStr = this.getAttribute('data-id');
              const idReporte = parseInt(idReporteStr, 10);
              const report = reports.find(r => r.id_reporte === idReporte);
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
              eliminarReporte(id);
              renderReports();
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

      const data = JSON.parse(await respuesta.text());
      if (!data.success) {
        showNotification('Error al obtener citas para el reporte', 'error');
        return;
      }

      const citas = data.data;

      if (citas.length === 0) {
        showNotification('No hay citas para este mes', 'success');
        return;
      }

      // Aquí se genera el Excel usando SheetJS (XLSX) o similar
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

      //Evento escucha de click
      const card = col.querySelector('.card');
      card.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));
        selectedMonth = id;

        document.querySelectorAll('#monthsGrid .card').forEach(c => {
          c.classList.remove('border-primary', 'bg-primary', 'bg-opacity-10');
          c.classList.add('border-light-subtle');
        });

        this.classList.remove('border-light-subtle');
        this.classList.add('border-primary', 'bg-primary', 'bg-opacity-10');
      });
    });
  }

  function subirReporte(selectedMonth) {

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

  //Notificaciones
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