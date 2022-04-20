import {enableUserForm} from './form.js';
import {MAP_COORDINATES, ZOOM_LEVEL, MAIN_MARKER_COORDINATES} from './consts.js';

const ADDRESS = document.querySelector('#address');
ADDRESS.value = `${MAP_COORDINATES.lat.toFixed(5)}, ${MAP_COORDINATES.lng.toFixed(5)}`;

// Map

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

// Main marker

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

let mainPinMarker;

const setMainPinMarker = () => {
  mainPinMarker = L.marker(
    MAIN_MARKER_COORDINATES,
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

const setMap = () => {
  map.on('load', () => {
    enableUserForm();
  })
    .setView(MAP_COORDINATES, ZOOM_LEVEL);

  setMainPinMarker();
};

// Common markers

const commonPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offersList,similarCardsFragment) => {
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
    commonPinMarker.addTo(markerGroup).bindPopup(similarCardsFragment.children[index]);
  });
};


export {map, createMarker, setMainPinMarker, removeMainMarker, markerGroup, setMap};
