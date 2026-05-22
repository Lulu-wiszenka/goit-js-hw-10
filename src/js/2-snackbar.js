// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    const delay = Number(form.elements.delay.value);   // получаем данные формы
    const status = form.elements.state.value;

    event.preventDefault();
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (status === "fulfilled") {
            resolve(delay);
          } else {
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
}
