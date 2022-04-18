import {disableForm, enableForm} from './form.js';
import {similarCardsFragment} from './offer.js';

disableForm();

const ADDRESS = document.querySelector('#address');
const MAP_COORDINATES = {
  lat: 35.675,
  lng: 139.780,
};

ADDRESS.value = `${MAP_COORDINATES.lat.toFixed(5)}, ${MAP_COORDINATES.lng.toFixed(5)}`;

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
  })
  .setView(MAP_COORDINATES, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const commonPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

let mainPinMarker;

const setMainPinMarker = () => {
  mainPinMarker = L.marker(
    {
      lat: 35.6669,
      lng: 139.7990,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    ADDRESS.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });
};

const removeMainMarker = () => {
  mainPinMarker.remove();
};

const createMarker = (offersList) => {
  offersList.forEach((offer, index) => {
    const commonPinMarker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon: commonPinIcon,
      },
    );
    commonPinMarker.addTo(map).bindPopup(similarCardsFragment.children[index]);
  });
};
setMainPinMarker();

export {map, createMarker, MAP_COORDINATES, setMainPinMarker, removeMainMarker};
