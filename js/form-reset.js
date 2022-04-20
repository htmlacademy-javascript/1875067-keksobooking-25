import {PRICE_PLACEHOLDER, AVATAR_DEFAULT_SRC, MAP_COORDINATES, ZOOM_LEVEL} from './consts.js';
import {disableFilterForm, enableFilterForm, form, sliderElement} from './form.js';
import {map, setMainPinMarker, removeMainMarker, markerGroup} from './map.js';
import {avatarPreview, imagePreview} from './avatar.js';
import {getData} from './api.js';
import {renderPopups} from './util.js';

const mapFiltersForm = document.querySelector('.map__filters');
const address = form.querySelector('#address');
const price = form.querySelector('#price');

const resetForm = () => {
  form.reset();
  mapFiltersForm.reset();

  disableFilterForm();
  markerGroup.clearLayers();
  getData((offers) => {
    renderPopups(offers);
    enableFilterForm();
  });

  map.setView(MAP_COORDINATES, ZOOM_LEVEL);
  removeMainMarker();
  setMainPinMarker();

  address.value = `${MAP_COORDINATES.lat.toFixed(5)}, ${MAP_COORDINATES.lng.toFixed(5)}`;
  price.placeholder = PRICE_PLACEHOLDER;
  sliderElement.noUiSlider.reset();

  avatarPreview.src = AVATAR_DEFAULT_SRC;
  imagePreview.innerHTML='';
};

export {resetForm};
