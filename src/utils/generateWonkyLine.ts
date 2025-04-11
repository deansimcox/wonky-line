import type {
	PointsArray,
	WonkyLineOptions,
} from "../WonkyLine/WonkyLine.types.js";
import { drawBezierCurveFromPoints } from "./drawBezierCurveFromPoints.js";
import { getRandomNumberBetween } from "./getRandomNumberBetween.js";

export interface GenerateWonkyLineParams extends Required<WonkyLineOptions> {
	height: number;
	width: number;
}

/**
 * Generates a wonky (irregular) line path using SVG path commands.
 * The line is created by generating random points along the width of the container
 * and connecting them with smooth bezier curves.
 *
 * @param params - Configuration object containing:
 *   - height: Container height
 *   - width: Container width
 *   - strokeWidth: Width of the line stroke
 *   - wonkyness: Maximum vertical deviation of points from the base line
 *   - stepInterval: Horizontal distance between consecutive points
 *   - smoothing: Amount of curve smoothing to apply (0-1)
 * @returns SVG path string representing the wonky line
 */
export const generateWonkyLine = (params: GenerateWonkyLineParams) => {
	const minY = params.strokeWidth;
	const maxY = params.strokeWidth + params.wonkyness;

	const minX = params.strokeWidth;
	const maxX = params.width - params.strokeWidth;

	const randomY = () => getRandomNumberBetween(minY, maxY);

	// The amount of points needed between the start and end points
	let midPointsAmount = Math.floor(params.width / params.stepInterval) - 2; // '2' represents the minX and maxX (start and end) points
	if (midPointsAmount < 1) {
		midPointsAmount = 1;
	}

	// The generated points of a line to draw
	const points: PointsArray[] = [
		[minX, randomY()],
		...new Array(midPointsAmount)
			.fill(0)
			.map(
				(_point, index) =>
					[params.stepInterval * (index + 1), randomY()] as PointsArray,
			),
		[maxX, randomY()],
	];

	const path = points?.reduce(
		(acc, point, index, array) =>
			index === 0
				? `M ${point[0]},${point[1]}`
				: `${acc} ${drawBezierCurveFromPoints(
						point,
						index,
						array,
						params.smoothing,
					)}`,
		"",
	);

	return path;
};
