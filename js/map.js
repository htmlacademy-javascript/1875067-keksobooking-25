import {disableFilterForm, disableUserForm, enableUserForm} from './form.js';
import {MAP_COORDINATES, ZOOM_LEVEL, MAIN_MARKER_COORDINATES} from './consts.js';

disableFilterForm();
disableUserForm();

const ADDRESS = document.querySelector('#address');


ADDRESS.value = `${MAP_COORDINATES.lat.toFixed(5)}, ${MAP_COORDINATES.lng.toFixed(5)}`;

const map = L.map('map-canvas')
  .on('load', () => {
    enableUserForm();
  })
  .setView(MAP_COORDINATES, ZOOM_LEVEL);

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

setMainPinMarker();

export {map, createMarker, setMainPinMarker, removeMainMarker, markerGroup};
