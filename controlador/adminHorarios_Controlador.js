// Elementos del DOM
const calendar = document.getElementById('calendar');
const currentMonthYearElement = document.getElementById('currentMonthYear');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const dayConfigSection = document.getElementById('dayConfigSection');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');
const saveDayConfigBtn = document.getElementById('saveDayConfigBtn');
const dayStatusRadios = document.getElementsByName('dayStatus');
const hoursSection = document.getElementById('hoursSection');

// Estado
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate = null;
let calendarData = {};

// Eventos de escucha para avanzar y retoceder entre meses

prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

saveDayConfigBtn.addEventListener('click', saveDayConfig);

dayStatusRadios.forEach(radio => {
  radio.addEventListener('change', toggleHoursSection);
});

// Inicializar la visualizacion del calendario
document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
  // Cargar datos del calendario desde localStorage
  const savedCalendarData = localStorage.getItem('calendarData');
  if (savedCalendarData) {
    calendarData = JSON.parse(savedCalendarData);
  }
  
  renderCalendar();
}

//Funcion encargada de mostrar visualmente el calendario
function renderCalendar() {
  calendar.innerHTML = '';
  
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  // Actualizar la visualización del mes y el año
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  currentMonthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  
  // Agregar celdas vacías para los días anteriores al primer día del mes
  for (let i = 0; i < startingDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day disabled';
    calendar.appendChild(emptyCell);
  }
  
  // Agrega celdas para cada día del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = formatDate(date);
    const dayCell = document.createElement('div');
    
    dayCell.textContent = day;
    dayCell.dataset.date = dateString;
    
    const datOfWeek = date.getDay();
    if(datOfWeek === 0){
        continue;
    }

    // Determinar la clase de celda según la fecha y la disponibilidad
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) {
      dayCell.className = 'calendar-day past';
    } else {
      const dayData = calendarData[dateString];
      
      if (dayData && dayData.status === 'blocked') {
        dayCell.className = 'calendar-day blocked';
      } else {
        dayCell.className = 'calendar-day available';
      }
      
      // Agregar evento de clic para fechas futuras
      dayCell.addEventListener('click', () => selectDay(dateString));
    }

    if (date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear()) {
      dayCell.classList.add('today');
    }
    
    calendar.appendChild(dayCell);
  }
}


// funcion para seleccionar el dia 
function selectDay(dateString) {
  selectedDate = dateString;
  
  // Renderizar bloques horarios de 1 hora en línea
  renderHourBlocks();

  // Formatear fecha para mostrar en la interfaz
  const [year, month,day] = dateString.split('-').map(Number);
  const date = new Date(year,month-1,day);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('es-ES', options);
  selectedDateDisplay.textContent = `Configuración para el ${formattedDate}`;

  // Mostrar sección de configuración
  dayConfigSection.classList.remove('hidden');

  // Obtener datos guardados para ese día o valores por defecto
  const dayData = calendarData[dateString] || { status: 'available', hours: ['08:00-09:00'] };

  // Marcar el radio button según el estado guardado
  dayStatusRadios.forEach(radio => {
    radio.checked = radio.value === dayData.status;
  });

  // Seleccionar el bloque horario guardado (solo 1)
  const hourCheckboxes = hoursSection.querySelectorAll('input[name="hourBlock"]');
  hourCheckboxes.forEach(checkbox => {
    checkbox.checked = false; // reset

    if (dayData.hours && dayData.hours.length && dayData.hours[0] === checkbox.value) {
      checkbox.checked = true;
    }
  });

  // Permitir seleccionar solo 1 checkbox a la vez
  hourCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        // Desmarcar todos los demás
        hourCheckboxes.forEach(cb => {
          if (cb !== checkbox) cb.checked = false;
        });
      }
    });
  });

  // Mostrar u ocultar sección de horas según estado
  toggleHoursSection();

  // Scroll hacia configuración
  dayConfigSection.scrollIntoView({ behavior: 'smooth' });
}

// Función para crear los bloques horarios en el DOM con estilo en línea
function renderHourBlocks() {
  const bloques = [
    {inicio: '08:00', fin: '09:00'},
    {inicio: '09:00', fin: '10:00'},
    {inicio: '10:00', fin: '11:00'},
    {inicio: '11:00', fin: '12:00'},
    {inicio: '14:00', fin: '15:00'},
    {inicio: '15:00', fin: '16:00'},
    {inicio: '16:00', fin: '17:00'},
    {inicio: '17:00', fin: '18:00'}
  ];

  hoursSection.innerHTML = '';
  hoursSection.style.display = 'flex';  // Mostrar en fila
  hoursSection.style.flexWrap = 'wrap'; // Permitir salto de línea si no cabe
  hoursSection.style.gap = '20px';      // Espacio entre bloques

  bloques.forEach(bloque => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'hourBlock';
    checkbox.value = `${bloque.inicio}-${bloque.fin}`;
    checkbox.id = `block-${bloque.inicio.replace(':','')}`;

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = formatTime12h(bloque.inicio) + ' - ' + formatTime12h(bloque.fin);
    label.style.cursor = 'pointer';

    const wrapper = document.createElement('div');
    wrapper.className = 'hour-block';
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.marginRight = '15px'; 

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    hoursSection.appendChild(wrapper);
  });
}

// Convierte 'HH:mm' (24h) a formato 12h con AM/PM
function formatTime12h(time24) {
  let [hour, minute] = time24.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute.toString().padStart(2,'0')} ${ampm}`;
}


function toggleHoursSection() {
  const isBlocked = document.querySelector('input[name="dayStatus"][value="blocked"]').checked;
  hoursSection.style.display = isBlocked ? 'none' : 'block';
}

//funcion para guardar la configuracion de fecha y hora del horari
function saveDayConfig() {
  if (!selectedDate) {
    showNotification('Por favor seleccione una fecha', 'error');
    return;
  }

  const status = document.querySelector('input[name="dayStatus"]:checked').value;
  let hours = [];

  if (status === 'available') {
    const hourCheckboxes = hoursSection.querySelectorAll('input[type="checkbox"]:checked');
    hours = Array.from(hourCheckboxes).map(checkbox => checkbox.value);

    if (hours.length === 0) {
      showNotification('Por favor seleccione al menos una hora disponible', 'error');
      return;
    }

    hours.sort(); // Asegura que hora_inicio sea antes que hora_fin
  }

  let estadoNum = status === "blocked" ? 1 : status === "available" ? 0 : 2;


const dateObj = new Date(selectedDate);
const jsDay = dateObj.getDay(); // 0 = domingo, 6 = sábado

const dia_semana = jsDay + 1;

  if (!dia_semana) {
    showNotification("El domingo no está permitido para configurar horarios", "error");
    return;
  }

  const dataToSend = {
    fecha: selectedDate,
    dia_semana: dia_semana,
    hora_inicio: estadoNum === 0 ? hours[0].split("-")[0] + ":00" : "00:00:00",
    hora_fin: estadoNum === 0 ? hours[0].split("-")[1] + ":00" : "00:00:00",
    estado: estadoNum
  };

  fetch("../modelo/adminHorarioModelo.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend)
  })
    .then(response => response.json())
    .then(resultado => {
      if (resultado.success) {
        showNotification("Configuración guardada en la base de datos", "success");
      } else {
        showNotification(resultado.message || "Error al guardar en la base de datos", "error");
      }
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
      showNotification("Error al conectar con el servidor", "error");
    });

  // Guarda en localStorage y actualiza el calendario
  calendarData[selectedDate] = { status, hours };
  localStorage.setItem('calendarData', JSON.stringify(calendarData));
  renderCalendar();
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function showNotification(message, type) {
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notificationMessage');
  
  notification.className = 'notification';
  notification.classList.add(type);
  notificationMessage.textContent = message;
  
  // Mostrar la notificación
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Ocultar la notificación después de 3 segundos
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}