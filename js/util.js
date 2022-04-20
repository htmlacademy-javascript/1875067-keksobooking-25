import {openSuccessPopup, openErrorPopup} from './messages.js';
import {resetForm} from './form-reset.js';
import {renderSimilarOffers} from './offer.js';
import {createMarker} from './map.js';
import {filterAds} from './filters.js';
import {ALERT_SHOW_TIME} from './consts.js';

const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    throw Error ('Ошибка ввода данных. Введите положительные значения.');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    throw Error ('В заданном диапазоне нет целых чисел.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatInclusive = (min, max, decimals) => {
  if (min < 0 || max < 0) {
    throw Error ('Ошибка ввода данных. Введите положительные значения.');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return (Math.random() * (max - min) + min).toFixed(decimals);
};

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const getNewRandomArray = (array) => {
  const newArray = array.slice();
  const finalArray = [];
  const finalArrayLength = getRandomIntInclusive(1, newArray.length);
  for (let i = 1; i <= finalArrayLength; i++) {
    const index = getRandomIntInclusive(0, newArray.length-1);
    finalArray.push(newArray[index]);
    newArray.splice(index, 1);
  }
  return finalArray;
};

const renderPopups = (offersList) => {
  const similarCardsFragment = document.createDocumentFragment();
  renderSimilarOffers(filterAds(offersList),similarCardsFragment);
  createMarker(filterAds(offersList),similarCardsFragment);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const onSuccessSubmit = () => {
  openSuccessPopup();
  resetForm();
};

const onErrorSubmit = () => {
  openErrorPopup();
};

function debounce(callback, timeoutDelay){
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'IndianRed';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {isEscapeKey, onSuccessSubmit, onErrorSubmit, renderPopups, debounce, showAlert};
export {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, getNewRandomArray};
