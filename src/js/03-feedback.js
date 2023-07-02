const throttle = require('lodash.throttle');
const LS_FORM = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('input', throttle(getLsForm, 500));
formEl.addEventListener('submit', onSubmit);
function getLsForm(evt) {
  const { email, message } = formEl.elements;
  const emailVal = email.value.trim();
  const messageVal = message.value.trim();
  const formObj = createFormObj(emailVal, messageVal);
  localStorage.setItem(LS_FORM, JSON.stringify(formObj));
}
const data = localStorage.getItem(LS_FORM);
const dataObj = JSON.parse(data);
if (data) {
  formEl.elements.email.value = dataObj.email;
  formEl.elements.message.value = dataObj.message;
}

function createFormObj(email, message) {
  return {
    email,
    message,
  };
}
function onSubmit(evt) {
  evt.preventDefault();
  console.log(dataObj);
  evt.target.reset();
  localStorage.removeItem(LS_FORM);
}
