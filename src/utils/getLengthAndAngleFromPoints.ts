/**
 * Line generation code has been derived from this article:
 * https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
 */

import type { PointsArray } from "../WonkyLine/WonkyLine.types.js";

/**
 * Calculates the length and angle between two points in 2D space.
 * @param previousPoints - The starting point coordinates [x, y]
 * @param nextPoints - The ending point coordinates [x, y]
 * @returns An object containing:
 *   - length: The Euclidean distance between the two points
 *   - angle: The angle in radians between the line and the positive x-axis
 */
export const getLengthAndAngleFromPoints = (
	previousPoints: PointsArray,
	nextPoints: PointsArray,
) => {
	const lengthX = nextPoints[0] - previousPoints[0];
	const lengthY = nextPoints[1] - previousPoints[1];

	return {
		length: Math.sqrt(lengthX ** 2 + lengthY ** 2),
		angle: Math.atan2(lengthY, lengthX),
	};
};
