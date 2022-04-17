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

export {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, getNewRandomArray};
