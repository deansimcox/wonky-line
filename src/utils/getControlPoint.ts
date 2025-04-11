import type { PointsArray } from "../WonkyLine/WonkyLine.types.js";
import { getLengthAndAngleFromPoints } from "./getLengthAndAngleFromPoints.js";

/**
 * Calculates a control point for a smooth curve between points in a path.
 *
 * @param {PointsArray} current - The current point in the path.
 * @param {PointsArray} previous - The previous point in the path. Defaults to the current point if not provided.
 * @param {PointsArray} next - The next point in the path. Defaults to the current point if not provided.
 * @param {number} smoothing - A factor to determine the smoothness of the curve.
 * @param {boolean} reverse - A flag to determine if the control point is for the end of the curve.
 * @returns {Array} An array containing the x and y coordinates of the control point, rounded to three decimal places.
 */
export const getControlPoint = (
  current: PointsArray,
  previous: PointsArray,
  next: PointsArray,
  smoothing: number,
  reverse: boolean
) => {
  if (!current) {
    return null;
  }

  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  previous = previous || current;
  next = next || current;

  // Properties of the opposed-line
  const opposedLine = getLengthAndAngleFromPoints(previous, next);

  // If is end-control-point, add PI to the angle to go backward
  const angle = opposedLine.angle + (reverse ? Math.PI : 0);
  const length = opposedLine.length * smoothing;

  // The control point position is relative to the current point
  const current0 = current?.[0] ?? 0;
  const current1 = current?.[1] ?? 0;
  const pointX = current0 + Math.cos(angle) * length;
  const pointY = current1 + Math.sin(angle) * length;

  return [pointX.toFixed(3), pointY.toFixed(3)];
};
