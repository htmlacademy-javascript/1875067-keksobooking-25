import {onSuccessSubmit, onErrorSubmit, renderPopups} from './util.js';
import {disableFilterForm, disableUserForm, setFormSubmit, enableFilterForm} from './form.js';
import {getData} from './api.js';
import {setMap} from './map.js';

disableFilterForm();
disableUserForm();

setMap();

getData((offers) => {
  renderPopups(offers);
  enableFilterForm();
});

setFormSubmit(onSuccessSubmit, onErrorSubmit);


