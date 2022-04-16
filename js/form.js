const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

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

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(title, validateTitle, 'Заголовок должен быть от 30 до 100 символов длиной');


const validatePrice = (value) => value.length && parseInt(value, 10) >= minPrice[type.value] && parseInt(value, 10) <= maxPrice;

const getPriceErrorMessage = (value) => {
  if (parseInt(value, 10) > maxPrice) {
    return `Максимальная стоимость - ${maxPrice} руб.`;
  }
  return `Минимальная стоимость ${minPrice[type.value]} руб`;
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const onTypeChange = () => {
  priceField.placeholder = minPrice[type.value];
  pristine.validate(priceField);
};

form.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onTypeChange));


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


form.addEventListener('submit', (evt) => {
  pristine.validate();
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

