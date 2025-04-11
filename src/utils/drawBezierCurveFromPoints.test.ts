import { describe, expect, it } from "vitest";
import type { PointsArray } from "../WonkyLine/WonkyLine.types.js";
import { drawBezierCurveFromPoints } from "./drawBezierCurveFromPoints.js";

describe("drawBezierCurveFromPoints", () => {
	it("should generate a valid SVG path command for a middle point", () => {
		const point: PointsArray = [100, 100];
		const index = 2;
		const allPoints: PointsArray[] = [
			[0, 0],
			[50, 50],
			[100, 100],
			[150, 150],
		];
		const smoothing = 0.5;

		const result = drawBezierCurveFromPoints(
			point,
			index,
			allPoints,
			smoothing,
		);

		// The result should be a valid SVG path command starting with 'C'
		expect(result).toMatch("C 100.000,100.000 50.000,50.000 100,100");
		// The end point should match the input point
		expect(result).toContain(`${point[0]},${point[1]}`);
	});

	it("should handle the first point in the array", () => {
		const point: PointsArray = [0, 0];
		const index = 0;
		const allPoints: PointsArray[] = [
			[0, 0],
			[50, 50],
		];
		const smoothing = 0.5;

		const result = drawBezierCurveFromPoints(
			point,
			index,
			allPoints,
			smoothing,
		);

		// Should still generate a valid path command
		expect(result).toMatch("C 0.000,0.000 -25.000,-25.000 0,0");
	});

	it("should handle the last point in the array", () => {
		const point: PointsArray = [200, 200];
		const index = 3;
		const allPoints: PointsArray[] = [
			[0, 0],
			[50, 50],
			[100, 100],
			[200, 200],
		];
		const smoothing = 0.5;

		const result = drawBezierCurveFromPoints(
			point,
			index,
			allPoints,
			smoothing,
		);

		// Should still generate a valid path command
		expect(result).toMatch("C 175.000,175.000 250.000,250.000 200,200");
		expect(result).toContain(`${point[0]},${point[1]}`);
	});

	it("should handle different smoothing values", () => {
		const point: PointsArray = [100, 100];
		const index = 2;
		const allPoints: PointsArray[] = [
			[0, 0],
			[50, 50],
			[100, 100],
			[150, 150],
		];

		const result1 = drawBezierCurveFromPoints(point, index, allPoints, 0);
		const result2 = drawBezierCurveFromPoints(point, index, allPoints, 1);

		// Different smoothing values should produce different control points
		expect(result1).not.toEqual(result2);
	});

	it("should handle edge cases with missing points", () => {
		const point: PointsArray = [100, 100];
		const index = 1;
		const allPoints: PointsArray[] = [
			[50, 50],
			[100, 100],
		];
		const smoothing = 0.5;

		const result = drawBezierCurveFromPoints(
			point,
			index,
			allPoints,
			smoothing,
		);

		// Should still generate a valid path command
		expect(result).toMatch("C 100.000,100.000 125.000,125.000 100,100");
	});
});
