import {form, sliderElement} from './form.js';
import {map, MAP_COORDINATES, setMainPinMarker, removeMainMarker} from './map.js';

const address = form.querySelector('#address');
const price = form.querySelector('#price');

const resetForm = () => {
  form.reset();

  map.setView(MAP_COORDINATES, 12);
  removeMainMarker();
  setMainPinMarker();

  address.value = `${MAP_COORDINATES.lat.toFixed(5)}, ${MAP_COORDINATES.lng.toFixed(5)}`;
  price.placeholder = 5000;
  sliderElement.noUiSlider.reset();
};

export {resetForm};
