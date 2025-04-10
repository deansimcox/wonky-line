import { randomNumberBetween } from "./number";

/**
 * @jest-environment node
 */

describe("randomNumberBetween", () => {
	test("Returns a random number between 10 and 20", () => {
		const result = randomNumberBetween(10, 20);
		expect(result).toBeGreaterThanOrEqual(10);
		expect(result).toBeLessThanOrEqual(20);
	});
	test("Returns a random number between negative and positive", () => {
		const result = randomNumberBetween(-3, 6);
		expect(result).toBeGreaterThanOrEqual(-3);
		expect(result).toBeLessThanOrEqual(6);
	});
});
