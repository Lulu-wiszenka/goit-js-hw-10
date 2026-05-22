// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("form");
const fulfill = document.querySelector('input[value="fulfilled"]');
const reject = document.querySelector('input[value="rejected"]');

let delay = 0;
let status = "";

form.addEventListener("input", inputInfo);
form.addEventListener("submit", handleSubmit);

function inputInfo(event) {

    if (event.target === fulfill) {
        status = "fulfilled";
        
    } else if (event.target === reject) {
        status = "rejected";
        
    } else {
        delay = +event.target.value;
    }

}

function handleSubmit(event) {
    event.preventDefault();
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (status === "fulfilled") {
            resolve(delay);
          } else if (status === "rejected") {
            reject(delay);
          };
        }, delay);
    });
   

    promise
        .then((delay) => { 
            iziToast.success({
               message: `✅ Fulfilled promise in ${delay}ms`,
            });
        })
        .catch((delay) => {
            iziToast.error({
               message: `❌ Rejected promise in ${delay}ms`,
            });
        });
    
    event.target.reset(); 

    delay = 0;
    status = "";
}
