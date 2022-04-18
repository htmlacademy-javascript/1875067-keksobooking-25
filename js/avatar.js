const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview-avatar');

const imagesChooser = document.querySelector('#images');
const imagesPreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const avatar = avatarChooser.files[0];
  const avatarName = avatar.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => avatarName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatar);
  }
});

imagesChooser.addEventListener('change', () => {
  const image = imagesChooser.files[0];
  const imageName = image.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => imageName.endsWith(it));

  if (matches) {
    imagesPreview.innerHTML += `<img src="${URL.createObjectURL(image)}" style="width: 70px; heigth: 70px;">`;
  }
});
