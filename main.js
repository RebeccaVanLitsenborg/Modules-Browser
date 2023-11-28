  const toggleButton = document.getElementById('toggleDarkMode');
  const body = document.body;
  const main = document.querySelector('main');
  const table = document.getElementById('calendar');
  const buttons = document.querySelectorAll('button');

  toggleButton.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      main.classList.toggle('dark-mode');
      table.classList.toggle('dark-mode');

      buttons.forEach(button => {
          button.classList.toggle('dark-mode');
      });
  });

const calendarBody = document.querySelector('#calendar tbody');
const monthYearElement = document.querySelector('#month-year');
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function generateCalendar() {
  calendarBody.innerHTML = '';

  monthYearElement.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

  const getFirstDay = new Date(currentYear, currentMonth, 1);
  const getStartingDay = getFirstDay.getDay() === 0 ? 6 : getFirstDay.getDay() - 1;
  const getLastDay = new Date(currentYear, currentMonth + 1, 0);

  let currentDate = new Date(getFirstDay);
  currentDate.setDate(currentDate.getDate() - getStartingDay);
  let weekRow = calendarBody.insertRow();

  while (currentDate <= getLastDay) {
    const cell = weekRow.insertCell();
    cell.textContent = currentDate.getDate();
    currentDate.setDate(currentDate.getDate() + 1);

    if (currentDate.getDay() === 1 && currentDate <= getLastDay) {
      weekRow = calendarBody.insertRow();
    }
  }
}

function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
}

function updateCalendar() {
  generateCalendar();
}
updateCalendar();

document.getElementById('prev-month').addEventListener('click', function () {
  currentMonth -= 1;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  }
  updateCalendar();
});

document.getElementById('next-month').addEventListener('click', function () {
  currentMonth += 1;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }
  updateCalendar();
});

const mediaQuery = window.matchMedia('(max-width: 586px)');

function handleScreenSizeChange() {
  const thElements = document.querySelectorAll('th');

  thElements.forEach(th => {
      const fullDay = th.querySelector('.full');
      const abbrDay = th.querySelector('.abbr');

      if (mediaQuery.matches) {
          fullDay.style.display = 'none';
          abbrDay.style.display = 'inline-block';
      } else {
          fullDay.style.display = 'inline-block';
          abbrDay.style.display = 'none';
      }
  });
}


handleScreenSizeChange(); 

mediaQuery.addListener(handleScreenSizeChange); 