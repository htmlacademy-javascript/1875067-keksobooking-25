import {PRICE_PLACEHOLDER, AVATAR_DEFAULT_SRC, MAP_COORDINATES, ZOOM_LEVEL} from './consts.js';
import {form, sliderElement} from './form.js';
import {map, setMainPinMarker, removeMainMarker} from './map.js';
import {avatarPreview, imagePreview} from './avatar.js';

const address = form.querySelector('#address');
const price = form.querySelector('#price');

const resetForm = () => {
  form.reset();

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
