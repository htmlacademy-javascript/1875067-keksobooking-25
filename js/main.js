import './offer.js';
import './form.js';
import './map.js';
import './api.js';
import './filters.js';
import './avatar.js';
import './consts.js';

import {setFormSubmit} from './form.js';
import {onSuccessSubmit, onErrorSubmit, renderPopups} from './util.js';
import {getData} from './api.js';
import {enableFilterForm} from './form.js';

getData((offers) => {
  renderPopups(offers);
  enableFilterForm();
});

setFormSubmit(onSuccessSubmit, onErrorSubmit);


