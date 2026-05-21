// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("form");
const numInput = document.querySelector('input[type="number"]');  //вводим цифры
const fulfill = document.querySelector('input[value="fulfilled"]');
const reject = document.querySelector('input[value="rejected"]');

let delay = 0;
let isFulfilled = false;
let isRejected = false;

form.addEventListener("input", inputInfo);
form.addEventListener("submit", handleSubmit);

function inputInfo(event) {

    if (event.target === fulfill) {
        isFulfilled = true;
        
    } else if (event.target === reject) {
        isRejected = true;
        
    } else {
        delay = +event.target.value;
    }

}

function handleSubmit(event) {
    event.preventDefault();
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (isFulfilled) {
            resolve(`✅ Fulfilled promise in ${delay}ms`);
          } else if (isRejected) {
            reject(`❌ Rejected promise in ${delay}ms`);
          };
        }, delay);
    });
   

    promise
        .then((fullMess) => { 
            iziToast.success({
               message: `${fullMess}`,
            });
        })
        .catch((rejMess) => {
            iziToast.error({
               message: `${rejMess}`,
            });
        });
    
    event.target.reset();
   
}
