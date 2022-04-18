import {AD_COUNT} from './data.js';
import {renderPopups} from './util.js';
import {getData} from './api.js';
import {markerGroup} from './map.js';

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
  const checkedFields = featuresFilter.querySelectorAll('.map__checkbox:checked');
  const checkedValues = [];
  checkedFields.forEach((field) => {
    checkedValues.push(field.value);
  });

  if (checkedValues.length === 0){
    return true;
  }

  if (!ad.offer.features && checkedValues.length > 0) {
    return false;
  }
  checkedValues.forEach((value) => {
    if (ad.offer.features.includes(value)) {
      return true;
    }
  });
  return false;
};

const filterAds = (ads) => {
  const filteredArray = [];

  for (let i = 0; i < ads.length; i++) {
    if (filterType(ads[i]) && filterPrice(ads[i]) && filterRooms(ads[i]) && filterGuests(ads[i]) && filterFeatures(ads[i])) {
      filteredArray.push(ads[i]);
    }
  }

  let finalFilteredArray = filteredArray;

  if (filteredArray.length > AD_COUNT) {
    finalFilteredArray = filteredArray.slice(0, AD_COUNT);
  }
  return finalFilteredArray;
};


filters.addEventListener('change', () => {
  markerGroup.clearLayers();
  getData((offers) => {
    renderPopups(offers);
  });
});

export {filterAds};
