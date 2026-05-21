// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const day = document.querySelector("span[data-days]");
const hour = document.querySelector("span[data-hours]");
const minute = document.querySelector("span[data-minutes]");
const second = document.querySelector("span[data-seconds]");


startBtn.addEventListener("click", handleStart)

startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = new Date(selectedDates[0]);

      if (userSelectedDate.getTime() < Date.now()) {
          startBtn.disabled = true;
          iziToast.warning({
              title: 'Caution',
              message: 'Please choose a date in the future',
          });
      } else if (userSelectedDate.getTime() > Date.now()) {
          startBtn.disabled = false;
        }
  },
};

const calendar = flatpickr(input, options);


function handleStart() {
    input.disabled = true;
    startBtn.disabled = true;
    
    let timeForTimer = 0;
    const startTime = Date.now();
    const intervalId = setInterval(() => {
        const currentDate = Date.now();
        timeForTimer = userSelectedDate.getTime() - currentDate;
        updateClockface(convertMs(timeForTimer)); 
        
    }, 1000);
    
    setTimeout(()=>{
        clearInterval(intervalId);
        input.disabled = false;
        updateClockface(convertMs(0));
    }, userSelectedDate.getTime() - startTime);

}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function  pad(value) {
        return String(value).padStart(2, "0");
}

function updateClockface({ days, hours, minutes, seconds }) {
    //clockface.textContent = `${hours} : ${mins} : ${secs}`;
    day.textContent = `${days}`;
    hour.textContent = `${hours}`; 
    minute.textContent = `${minutes}`;
    second.textContent = `${seconds}`;
}


























