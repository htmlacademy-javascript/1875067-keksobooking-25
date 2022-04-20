import {getData} from './api.js';
import {markerGroup} from './map.js';
import {renderPopups, debounce} from './util.js';
import {RERENDER_DELAY, AD_COUNT} from './consts.js';
import {enableFilterForm} from './form.js';

const filters = document.querySelector('.map__filters');
const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelector('#housing-features');

const priceFork = {
  'low': [0, 10000],
  'middle': [10000, 50000],
  'high': [50000, 100000]
};

const filterType = (ad) => {
  if (typeFilter.value === 'any') {
    return true;
  }
  return ad.offer.type === typeFilter.value;
};

const filterPrice = (ad) => {
  const priceValue = priceFilter.value;

  if (priceValue === 'any') {
    return true;
  }

  const minFilteredPrice = priceFork[priceFilter.value][0];
  const maxFilteredPrice = priceFork[priceFilter.value][1];

  return ad.offer.price >= minFilteredPrice && ad.offer.price <= maxFilteredPrice;
};

const filterRooms = (ad) => {
  if (roomsFilter.value === 'any') {
    return true;
  }
  return ad.offer.rooms === Number(roomsFilter.value);

};

const filterGuests = (ad) => {
  if (guestsFilter.value === 'any') {
    return true;
  }
  return ad.offer.rooms === Number(guestsFilter.value);
};

const filterFeatures = (ad) => {
  const adFeaturesList = ad.offer.features;
  const checkedFields = featuresFilter.querySelectorAll('.map__checkbox:checked');
  const checkedValues = [];
  checkedFields.forEach((field) => {
    checkedValues.push(field.value);
  });

  if (checkedValues.length === 0) {
    return true;
  } else if (adFeaturesList) {
    return checkedValues.every((value) => adFeaturesList.includes(value));
  }
  return false;
};

const filterAds = (ads) => {
  const filteredArray = [];

  for (const ad of ads) {
    if (filterType(ad) && filterPrice(ad) && filterRooms(ad) && filterGuests(ad) && filterFeatures(ad)) {
      filteredArray.push(ad);

      if (filteredArray.length === AD_COUNT) {
        break;
      }
    }
  }

  return filteredArray;
};

filters.addEventListener('change', debounce(() => {
  markerGroup.clearLayers();
  getData((offers) => {
    renderPopups(offers);
    enableFilterForm();
  });
},RERENDER_DELAY));

export {filterAds};
