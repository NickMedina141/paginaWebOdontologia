// DOM elements
const calendar = document.getElementById('calendar');
const currentMonthYearElement = document.getElementById('currentMonthYear');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const dayConfigSection = document.getElementById('dayConfigSection');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');
const saveDayConfigBtn = document.getElementById('saveDayConfigBtn');
const dayStatusRadios = document.getElementsByName('dayStatus');
const hoursSection = document.getElementById('hoursSection');

// State
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate = null;
let calendarData = {};

// Event listeners
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

// Initialize
document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
  // Load calendar data from localStorage
  const savedCalendarData = localStorage.getItem('calendarData');
  if (savedCalendarData) {
    calendarData = JSON.parse(savedCalendarData);
  }
  
  renderCalendar();
}

function renderCalendar() {
  calendar.innerHTML = '';
  
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  // Update month and year display
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  currentMonthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day disabled';
    calendar.appendChild(emptyCell);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = formatDate(date);
    const dayCell = document.createElement('div');
    
    dayCell.textContent = day;
    dayCell.dataset.date = dateString;
    
    // Determine cell class based on date and availability
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
      
      // Add click event for future dates
      dayCell.addEventListener('click', () => selectDay(dateString));
    }
    
    // Highlight today
    if (date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear()) {
      dayCell.classList.add('today');
    }
    
    calendar.appendChild(dayCell);
  }
}

function selectDay(dateString) {
  selectedDate = dateString;
  
  // Format date for display
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('es-ES', options);
  selectedDateDisplay.textContent = `Configuración para el ${formattedDate}`;
  
  // Show configuration section
  dayConfigSection.classList.remove('hidden');
  
  // Set current configuration
  const dayData = calendarData[dateString] || { status: 'available', hours: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'] };
  
  // Set radio button
  dayStatusRadios.forEach(radio => {
    radio.checked = radio.value === dayData.status;
  });
  
  // Set checkboxes
  const hourCheckboxes = hoursSection.querySelectorAll('input[type="checkbox"]');
  hourCheckboxes.forEach(checkbox => {
    checkbox.checked = dayData.hours.includes(checkbox.value);
  });
  
  // Toggle hours section
  toggleHoursSection();
  
  // Scroll to configuration section
  dayConfigSection.scrollIntoView({ behavior: 'smooth' });
}

function toggleHoursSection() {
  const isBlocked = document.querySelector('input[name="dayStatus"][value="blocked"]').checked;
  hoursSection.style.display = isBlocked ? 'none' : 'block';
}

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
  }
  
  // Save configuration
  calendarData[selectedDate] = { status, hours };
  localStorage.setItem('calendarData', JSON.stringify(calendarData));
  
  // Update calendar
  renderCalendar();
  
  showNotification('Configuración guardada correctamente', 'success');
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
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}