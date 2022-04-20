import {SERVER_GET, SERVER_SEND} from './consts.js';
import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch(SERVER_GET)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => showAlert('Не удалось загрузить данные. Попробуйте обновить страницу'));
};

const sendData = (onSuccess, onError, body) => {
  fetch(SERVER_SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => onError());
};

export {getData, sendData};
