const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview').firstElementChild;

const imageChooser = document.querySelector('#images');
const imagePreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const avatar = avatarChooser.files[0];
  const avatarName = avatar.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => avatarName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatar);
  }
});

imageChooser.addEventListener('change', () => {
  const image = imageChooser.files[0];
  const imageName = image.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => imageName.endsWith(it));

  if (matches) {
    if (!imagePreview.children.length) {
      const imageElement = document.createElement('img');
      imageElement.width = '70';
      imageElement.height = '70';
      imageElement.alt = 'Фотография жилья';
      imageElement.src = URL.createObjectURL(image);
      imagePreview.appendChild(imageElement);
    }
    else {
      imagePreview.firstElementChild.src = URL.createObjectURL(image);
    }
  }
});

export {avatarPreview, imagePreview};
