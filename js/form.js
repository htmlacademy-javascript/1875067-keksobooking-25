const form = document.querySelector('.ad-form');
const mapFilersForm = document.querySelector('.map__filters');

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
const maxPrice = 100000;
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

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

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  mapFilersForm.classList.add('ad-form--disabled');

  formFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });

  mapFiltersSelect.forEach((select) => {
    select.setAttribute('disabled', 'disabled');
  });

  mapFiltersFeatures.setAttribute('disabled', 'disabled');
};

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFilersForm.classList.remove('ad-form--disabled');

  formFieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });

  mapFiltersSelect.forEach((select) => {
    select.removeAttribute('disabled');
  });

  mapFiltersFeatures.removeAttribute('disabled');
};

// Title validation

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(title, validateTitle, 'Заголовок должен быть от 30 до 100 символов длиной');

// Price validation

const validatePrice = (value) => value.length && parseInt(value, 10) >= minPrice[type.value] && parseInt(value, 10) <= maxPrice;

const getPriceErrorMessage = (value) => {
  if (parseInt(value, 10) > maxPrice) {
    return `Максимальная цена - ${maxPrice} руб.`;
  }
  return `Минимальная цена ${minPrice[type.value]} руб`;
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const onTypeChange = () => {
  priceField.placeholder = minPrice[type.value];
  pristine.validate(priceField);
};

form.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onTypeChange));

// Rooms and guests numbers validation

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


form.addEventListener('submit', (evt) => {
  pristine.validate();
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

disableForm();
enableForm();
