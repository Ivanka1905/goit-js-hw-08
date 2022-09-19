import Throttle from "lodash.throttle";


const form = document.querySelector('.feedback-form');
const email = form.querySelector('[name="email"]');
const message = form.querySelector('[name="message"]');
// console.log(form);
// console.log(email);
// console.log(message)

const messageKey = 'feedback-form-state';
form.addEventListener('input', Throttle(storageFormData, 500));
form.addEventListener('submit', onSubmit);
window.addEventListener('load', checkSt);

function checkSt() {
    if (!localStorage.getItem(messageKey)) return;
    const formValu = JSON.parse(localStorage.getItem(messageKey));
    email.value = formValu.email;
    message.value = formValu.message
}

function onSubmit(event) {
    event.preventDefault();
    // const { email, message } = event.currentTarget.elements;
    // console.log({email: email.value, message: message.value })
    const saveData = JSON.parse(localStorage.getItem(messageKey));
    console.log(saveData);
    localStorage.removeItem(messageKey);
    event.currentTarget.reset();
}

function storageFormData(event) {
    const formValue = { email: '', message: '' };
    if (localStorage.getItem(messageKey)) {
       Object.assign(formValue, JSON.parse(localStorage.getItem(messageKey)))
    };
    formValue[event.target.name] = event.target.value.trim();
    // console.log(formValue);

    localStorage.setItem(messageKey, JSON.stringify(formValue));
    
}

// done
