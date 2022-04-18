import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = document.querySelector('.error__button');

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

function closeSuccessPopup () {
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
}

const openSuccessPopup = () => {
  document.body.append(successMessage);

  successMessage.addEventListener('click', closeSuccessPopup);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
};

const onErrorMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeErrorPopup();
  }
};

function closeErrorPopup () {
  errorMessage.remove();
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
}

const openErrorPopup = () => {
  document.body.append(errorMessage);

  errorMessage.addEventListener('click', closeErrorPopup);

  document.addEventListener('keydown', onErrorMessageEscKeydown);

  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  });
};

export {openSuccessPopup, openErrorPopup};
