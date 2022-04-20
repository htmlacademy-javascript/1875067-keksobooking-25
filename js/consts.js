const SERVER_GET = 'https://25.javascript.pages.academy/keksobooking/data';
const SERVER_SEND = 'https://25.javascript.pages.academy/keksobooking';

const AD_COUNT = 10;

const RERENDER_DELAY = 500;
const ALERT_SHOW_TIME = 5000;
const AVATAR_DEFAULT_SRC = 'img/muffin-grey.svg';
const PRICE_PLACEHOLDER = 5000;
const MAX_PRICE = 100000;
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const TRANSLATED_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const MAP_COORDINATES = {
  lat: 35.675,
  lng: 139.780,
};

const MAIN_MARKER_COORDINATES = {
  lat: 35.6669,
  lng: 139.7990,
};

const ZOOM_LEVEL = 12;

export {PRICE_PLACEHOLDER, SERVER_GET, SERVER_SEND, AVATAR_DEFAULT_SRC, RERENDER_DELAY, TRANSLATED_TYPES, AD_COUNT, ALERT_SHOW_TIME, MAP_COORDINATES, ZOOM_LEVEL, MAIN_MARKER_COORDINATES, MAX_PRICE, MIN_PRICE};
