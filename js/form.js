import {sendData} from './api.js';
import {onSuccessSubmit, onErrorSubmit} from './util.js';
import {resetForm} from './form-reset.js';
import {MAX_PRICE, MIN_PRICE} from './consts.js';

const form = document.querySelector('.ad-form');
const mapFilersForm = document.querySelector('.map__filters');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');


const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const formFieldsets = form.querySelectorAll('fieldset');
const mapFiltersSelect = mapFilersForm.querySelectorAll('select');
const mapFiltersFeatures = mapFilersForm.querySelector('.map__features');

const title = form.querySelector('#title');

const type = form.querySelector('[name="type"]');
const priceField = form.querySelector('#price');


const guestsField = form.querySelector('#capacity');
const roomsField = form.querySelector('#room_number');
const roomsOptions = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2', '3'],
  '100': ['0'],
};

const checkInTime = form.querySelector('#timein');
const checkOutTime = form.querySelector('#timeout');

// Disabled and enabled mode

const disableFilterForm = () => {
  mapFilersForm.classList.add('ad-form--disabled');

  mapFiltersSelect.forEach((select) => {
    select.setAttribute('disabled', 'disabled');
  });

  mapFiltersFeatures.setAttribute('disabled', 'disabled');
};

const disableUserForm = () => {
  form.classList.add('ad-form--disabled');

  formFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};

const enableFilterForm = () => {
  mapFilersForm.classList.remove('ad-form--disabled');

  mapFiltersSelect.forEach((select) => {
    select.removeAttribute('disabled');
  });

  mapFiltersFeatures.removeAttribute('disabled');
};

const enableUserForm = () => {
  form.classList.remove('ad-form--disabled');

  formFieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};

// Title validation

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(title, validateTitle, 'Заголовок должен быть от 30 до 100 символов длиной');

// Price validation

const validatePrice = (value) => value.length && parseInt(value, 10) >= MIN_PRICE[type.value] && parseInt(value, 10) <= MAX_PRICE;

const getPriceErrorMessage = (value) => {
  if (parseInt(value, 10) > MAX_PRICE) {
    return `Максимальная цена - ${MAX_PRICE} руб.`;
  }
  return `Минимальная цена ${MIN_PRICE[type.value]} руб`;
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const onTypeChange = () => {
  priceField.placeholder = MIN_PRICE[type.value];
  pristine.validate(priceField);
};

form.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onTypeChange));

// Price slider

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
  },
  start: 0,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('slide', () => {
  priceField.value = sliderElement.noUiSlider.get();
  pristine.validate(priceField);
});

priceField.addEventListener('input', () => {
  sliderElement.noUiSlider.set(priceField.value);
});

// Guests validation

const validateGuests = () => roomsOptions[roomsField.value].includes(guestsField.value);

const getGuestsErrorMessage = () => {
  switch (roomsField.value) {
    case '1': return 'Не больше 1 гостя';
    case '2': return 'Не больше 2 гостей';
    case '3': return 'Не больше 3 гостей';
    case '100': return 'Не для гостей';
  }
};

pristine.addValidator(guestsField, validateGuests, getGuestsErrorMessage);

const onRoomsChange = () => pristine.validate(guestsField);

form.querySelectorAll('[name="rooms"]').forEach((item) => item.addEventListener('change', onRoomsChange));

// Check-in and check-out time validation

checkInTime.addEventListener('change', (evt) => {
  checkOutTime.value = evt.target.value;
});

checkOutTime.addEventListener('change', (evt) => {
  checkInTime.value = evt.target.value;
});

// Buttons

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};


const setFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccessSubmit();
          unblockSubmitButton();
        },
        () => {
          unblockSubmitButton();
          onErrorSubmit();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {form, setFormSubmit, sliderElement, disableFilterForm, disableUserForm, enableFilterForm, enableUserForm};
