const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    return 'Ошибка ввода данных. Введите положительные значения.';
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    return 'В заданном диапазоне нет целых чисел.';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomIntInclusive(1, 18);

const getRandomFloatInclusive = (min, max, decimals) => {
  if (min < 0 || max < 0) {
    return 'Ошибка ввода данных. Введите положительные значения.';
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return (Math.random() * (max - min) + min).toFixed(decimals);
};

getRandomFloatInclusive(3, 15, 2);
