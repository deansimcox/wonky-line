import type {PointsArray} from '../WonkyLine/WonkyLine.types.js'
import {getControlPoint} from './getControlPoint.js'

/**
 * Generates an SVG path command for drawing a smooth Bezier curve segment.
 *
 * @param point - The current point to draw to
 * @param index - The index of the current point in the array
 * @param allPoints - Array of all points in the path
 * @param smoothing - Factor controlling the smoothness of the curve (0-1)
 * @returns SVG path command string for a cubic Bezier curve segment
 */
export const drawBezierCurveFromPoints = (
	point: PointsArray,
	index: number,
	allPoints: PointsArray[],
	smoothing: number,
) => {
	const getPoint = (arrayIndex: number) => allPoints[arrayIndex] ?? [0, 0]

	// start control point
	const controlPointStart = getControlPoint(getPoint(index - 1), getPoint(index - 2), point, smoothing, false)

	// end control point
	const controlPointEnd = getControlPoint(point, getPoint(index - 1), getPoint(index + 1), smoothing, true)
	return `C ${controlPointStart?.[0]},${controlPointStart?.[1]} ${controlPointEnd?.[0]},${controlPointEnd?.[1]} ${point?.[0]},${point?.[1]}`
}
