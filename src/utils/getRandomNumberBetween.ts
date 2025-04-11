export const getRandomNumberBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
