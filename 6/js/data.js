import {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, getNewRandomArray} from './util.js';

const AD_COUNT = 10;
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TRANSLATED_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const ROOMS_NUMBER = [
  1,
  2,
  3,
  100,
];

const GUESTS_NUMBER = [
  1,
  2,
  3,
  'не для гостей'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getAvatarId = (index) => {
  if (index.toString().length < 2) {
    return `0${index}`;
  }
  return index;
};

const createSimilarOffers = (amount) => Array.from({length: amount}, (element, index) => {
  const author = {
    avatar: `img/avatars/user${getAvatarId(index + 1)}.png`,
  };
  const location = {
    lat: getRandomFloatInclusive(LAT_MIN, LAT_MAX, 5),
    lng: getRandomFloatInclusive(LNG_MIN, LNG_MAX, 5),
  };
  const offer = {
    title: 'Жилье в аренду. Выгодное предложение!',
    address: `${location.lat}, ${location.lng}`,
    price: getRandomIntInclusive(0, 100000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomArrayElement(ROOMS_NUMBER),
    guests: getRandomArrayElement(GUESTS_NUMBER),
    checkin: getRandomArrayElement(CHECKIN_TIME),
    checkout: getRandomArrayElement(CHECKOUT_TIME),
    features: getNewRandomArray(FEATURES),
    description: 'Отпуск или командировка? Какова бы ни  была цель вашего визита, это предложение вам прекрасно подходит!',
    photos: getNewRandomArray(PHOTOS),
  };

  return {
    author,
    offer,
    location,
  };
});

export {TRANSLATED_TYPES, createSimilarOffers, AD_COUNT};
