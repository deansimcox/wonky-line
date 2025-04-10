export const randomNumberBetween = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};
