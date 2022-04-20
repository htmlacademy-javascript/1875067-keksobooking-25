import {TRANSLATED_TYPES} from './consts.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderAdDescription = (offerElement, card) => {
  const offerDescription = offerElement.querySelector('.popup__description');
  offerDescription.textContent = card.offer.description;

  if (!offerDescription.textContent) {
    offerDescription.classList.add('visually-hidden');
  }
};

const renderAdFeatures = (offerElement, card) => {
  const featuresContainer = offerElement.querySelector('.popup__features ');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const userFeaturesList = card.offer.features;

  if (!userFeaturesList) {
    featuresContainer.classList.add('visually-hidden');
  } else {
    featuresList.forEach((featuresListItem) => {
      const isNecessary = userFeaturesList.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
      );

      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  }
};

const renderAdPhotos = (offerElement, card) =>{
  const userPhotoList = card.offer.photos;
  const photosContainer = offerElement.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');
  photosContainer.innerHTML = '';

  if (!userPhotoList) {
    photosContainer.classList.add('visually-hidden');
  } else {
    userPhotoList.forEach((photo) => {
      const userPhoto = photoTemplate.cloneNode(true);
      userPhoto.src = photo;
      photosContainer.appendChild(userPhoto);
    });
  }
};

const renderSimilarOffers = (offersList,similarCardsFragment) => {
  offersList.forEach((card) => {
    const offerElement = offerTemplate.cloneNode(true);
    offerElement.querySelector('.popup__avatar').src = card.author.avatar;
    offerElement.querySelector('.popup__title').textContent = card.offer.title;
    offerElement.querySelector('.popup__text--address').textContent = card.offer.address;
    offerElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
    offerElement.querySelector('.popup__type').textContent = TRANSLATED_TYPES[card.offer.type];
    offerElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

    renderAdDescription (offerElement, card);
    renderAdFeatures(offerElement, card);
    renderAdPhotos(offerElement, card);

    similarCardsFragment.appendChild(offerElement);
  });
};


export {renderSimilarOffers};
