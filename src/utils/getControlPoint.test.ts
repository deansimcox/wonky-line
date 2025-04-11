import { describe, it, expect } from "vitest";
import { getControlPoint } from "./getControlPoint.js";
import type { PointsArray } from "../WonkyLine/WonkyLine.types.js";

describe("getControlPoint", () => {
  it("should return null when currentPoints is not provided", () => {
    const result = getControlPoint(
      null as unknown as PointsArray,
      [0, 0],
      [1, 1],
      0.5,
      false
    );
    expect(result).toBeNull();
  });

  it("should calculate control point for middle point in path", () => {
    const current: PointsArray = [2, 2];
    const previous: PointsArray = [1, 1];
    const next: PointsArray = [3, 3];
    const smoothing = 0.5;

    const result = getControlPoint(current, previous, next, smoothing, false);
    expect(result).not.toBeNull();
    if (result) {
      expect(result).toHaveLength(2);
      expect(Number(result[0])).toBeCloseTo(3, 2);
      expect(Number(result[1])).toBeCloseTo(3, 2);
    }
  });

  it("should handle first point in path by using current point as previous", () => {
    const current: PointsArray = [1, 1];
    const next: PointsArray = [2, 2];
    const smoothing = 0.5;

    const result = getControlPoint(
      current,
      null as unknown as PointsArray,
      next,
      smoothing,
      false
    );
    expect(result).not.toBeNull();
    if (result) {
      expect(result).toHaveLength(2);
    }
  });

  it("should handle last point in path by using current point as next", () => {
    const current: PointsArray = [3, 3];
    const previous: PointsArray = [2, 2];
    const smoothing = 0.5;

    const result = getControlPoint(
      current,
      previous,
      null as unknown as PointsArray,
      smoothing,
      false
    );
    expect(result).not.toBeNull();
    if (result) {
      expect(result).toHaveLength(2);
    }
  });

  it("should calculate reverse control point correctly", () => {
    const current: PointsArray = [2, 2];
    const previous: PointsArray = [1, 1];
    const next: PointsArray = [3, 3];
    const smoothing = 0.5;

    const result = getControlPoint(current, previous, next, smoothing, true);
    expect(result).not.toBeNull();
    if (result) {
      expect(result).toHaveLength(2);
      expect(Number(result[0])).toBeCloseTo(1, 2);
      expect(Number(result[1])).toBeCloseTo(1, 2);
    }
  });

  it("should handle different smoothing values", () => {
    const current: PointsArray = [2, 2];
    const previous: PointsArray = [1, 1];
    const next: PointsArray = [3, 3];

    const result1 = getControlPoint(current, previous, next, 0.2, false);
    const result2 = getControlPoint(current, previous, next, 0.8, false);

    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();
    if (result1 && result2) {
      expect(Number(result1[0])).not.toBe(Number(result2[0]));
      expect(Number(result1[1])).not.toBe(Number(result2[1]));
    }
  });

  it("should handle vertical line points", () => {
    const current: PointsArray = [1, 2];
    const previous: PointsArray = [1, 1];
    const next: PointsArray = [1, 3];
    const smoothing = 0.5;

    const result = getControlPoint(current, previous, next, smoothing, false);
    expect(result).not.toBeNull();
    if (result) {
      expect(result).toHaveLength(2);
      expect(Number(result[0])).toBeCloseTo(1, 2);
      expect(Number(result[1])).toBeCloseTo(3, 2);
    }
  });

  it("should handle horizontal line points", () => {
    const current: PointsArray = [2, 1];
    const previous: PointsArray = [1, 1];
    const next: PointsArray = [3, 1];
    const smoothing = 0.5;

    const result = getControlPoint(current, previous, next, smoothing, false);
    expect(result).not.toBeNull();
    if (result) {
      expect(result).toHaveLength(2);
      expect(Number(result[0])).toBeCloseTo(3, 2);
      expect(Number(result[1])).toBeCloseTo(1, 2);
    }
  });
});
