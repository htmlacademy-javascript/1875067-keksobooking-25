import {openSuccessPopup, openErrorPopup} from './messages.js';
import {resetForm} from './form-reset.js';
import {renderSimilarOffers} from './offer.js';
import {createMarker} from './map.js';
import {filterAds} from './filters.js';
import {ALERT_SHOW_TIME} from './consts.js';

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
