import { describe, expect, it } from "vitest";
import {
	type GenerateWonkyLineParams,
	generateWonkyLine,
} from "./generateWonkyLine.js";

describe("generateWonkyLine", () => {
	it("should generate a valid SVG path string", () => {
		const params: GenerateWonkyLineParams = {
			height: 100,
			width: 200,
			strokeWidth: 2,
			wonkyness: 20,
			stepInterval: 50,
			smoothing: 0.5,
			stroke: "#000000",
			animate: {},
		};

		const path = generateWonkyLine(params);

		// Check if the path is a string
		expect(typeof path).toBe("string");

		// Check if the path starts with 'M' (move command)
		expect(path.startsWith("M")).toBe(true);

		// Check if the path contains curve commands (C or S)
		expect(path.includes("C") || path.includes("S")).toBe(true);
	});

	it("should generate different paths for the same parameters", () => {
		const params: GenerateWonkyLineParams = {
			height: 100,
			width: 200,
			strokeWidth: 2,
			wonkyness: 20,
			stepInterval: 50,
			smoothing: 0.5,
			stroke: "#000000",
			animate: {},
		};

		const path1 = generateWonkyLine(params);
		const path2 = generateWonkyLine(params);

		// The paths should be different due to random point generation
		expect(path1).not.toBe(path2);
	});

	it("should handle minimum stepInterval", () => {
		const params: GenerateWonkyLineParams = {
			height: 100,
			width: 200,
			strokeWidth: 2,
			wonkyness: 20,
			stepInterval: 1, // Very small step interval
			smoothing: 0.5,
			stroke: "#000000",
			animate: {},
		};

		const path = generateWonkyLine(params);

		// Should still generate a valid path
		expect(typeof path).toBe("string");
		expect(path.startsWith("M")).toBe(true);
	});
});
