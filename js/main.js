const AD_COUNT = 10;
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    throw Error ('Ошибка ввода данных. Введите положительные значения.');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    throw Error ('В заданном диапазоне нет целых чисел.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatInclusive = (min, max, decimals) => {
  if (min < 0 || max < 0) {
    throw Error ('Ошибка ввода данных. Введите положительные значения.');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return (Math.random() * (max - min) + min).toFixed(decimals);
};

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const getNewRandomArray = (array) => {
  const newArray = array.slice();
  const finalArray = [];
  const finalArrayLength = getRandomIntInclusive(1, newArray.length);
  for (let i = 1; i <= finalArrayLength; i++) {
    const index = getRandomIntInclusive(0, newArray.length-1);
    finalArray.push(newArray[index]);
    newArray.splice(index, 1);
  }
  return finalArray;
};

const getAvatarId = (index) => {
  if (index.toString().length < 2) {
    return `0${index}`;
  }
  return index;
};

const similarOffers = (amount) => Array.from({length: amount}, (element, index) => {
  const author = {
    avatar: `img/avatars/user${getAvatarId(index + 1)}.png`,
  };
  const location = {
    lat: getRandomFloatInclusive(LAT_MIN, LAT_MAX, 5),
    lng: getRandomFloatInclusive(LNG_MIN, LNG_MAX, 5),
  };
  const offer = {
    title: 'Жилье в аренду. Выгодное предложение!',
    address: `${location.lat}, ${location.lng}`,
    price: getRandomIntInclusive(0, 100000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomIntInclusive(1, 5),
    guests: getRandomIntInclusive(1, 10),
    checkin: getRandomArrayElement(CHECKIN_TIME),
    checkout: getRandomArrayElement(CHECKOUT_TIME),
    features: getNewRandomArray(FEATURES),
    description: 'Отпуск или командировка? Какова бы ни  была цель вашего визита, это предложение вам прекрасно подходит!',
    photos: getNewRandomArray(PHOTOS),
  };

  return {
    author,
    offer,
    location,
  };
});

similarOffers (AD_COUNT);
