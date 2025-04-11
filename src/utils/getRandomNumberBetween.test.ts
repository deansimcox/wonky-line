import { describe, expect, it, vi } from "vitest";
import { getRandomNumberBetween } from "./getRandomNumberBetween.js";

describe("getRandomNumberBetween", () => {
	it("should return a number between min and max", () => {
		const min = 1;
		const max = 10;
		const result = getRandomNumberBetween(min, max);

		expect(result).toBeGreaterThanOrEqual(min);
		expect(result).toBeLessThan(max);
	});

	it("should handle negative numbers", () => {
		const min = -10;
		const max = -1;
		const result = getRandomNumberBetween(min, max);

		expect(result).toBeGreaterThanOrEqual(min);
		expect(result).toBeLessThan(max);
	});

	it("should handle decimal numbers", () => {
		const min = 0.1;
		const max = 0.9;
		const result = getRandomNumberBetween(min, max);

		expect(result).toBeGreaterThanOrEqual(min);
		expect(result).toBeLessThan(max);
	});

	it("should return min when min equals max", () => {
		const value = 5;
		const result = getRandomNumberBetween(value, value);

		expect(result).toBe(value);
	});
});
