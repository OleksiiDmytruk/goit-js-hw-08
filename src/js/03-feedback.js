const throttle = require('lodash.throttle');
const LS_FORM = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('input', throttle(getLsForm, 500));
formEl.addEventListener('submit', onSubmit);
window.addEventListener('load', onLoad);

let feedbackDataObj = {};
function onLoad() {
  try {
    const data = localStorage.getItem(LS_FORM);
    if (!data) {
      return;
    }
    feedbackDataObj = JSON.parse(data);
    Object.entries(feedbackDataObj).forEach(([kay, value]) => {
      formEl.elements[kay].value = value;
    });
  } catch (err) {
    console.log(err.message);
  }
}

function getLsForm(evt) {
  feedbackDataObj[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(LS_FORM, JSON.stringify(feedbackDataObj));
}

function onSubmit(evt) {
  evt.preventDefault();
  console.log(feedbackDataObj);
  feedbackDataObj = {};
  evt.target.reset();
  localStorage.removeItem(LS_FORM);
}
