import {describe, expect, it} from 'vitest'
import {getLengthAndAngleFromPoints} from './getLengthAndAngleFromPoints.js'

describe('getLengthAndAngleFromPoints', () => {
	it('should calculate correct length and angle for horizontal line', () => {
		const result = getLengthAndAngleFromPoints([0, 0], [5, 0])
		expect(result.length).toBe(5)
		expect(result.angle).toBe(0)
	})

	it('should calculate correct length and angle for vertical line', () => {
		const result = getLengthAndAngleFromPoints([0, 0], [0, 5])
		expect(result.length).toBe(5)
		expect(result.angle).toBe(Math.PI / 2)
	})

	it('should calculate correct length and angle for diagonal line', () => {
		const result = getLengthAndAngleFromPoints([0, 0], [3, 4])
		expect(result.length).toBe(5) // 3-4-5 triangle
		expect(result.angle).toBe(Math.atan2(4, 3))
	})

	it('should handle negative coordinates', () => {
		const result = getLengthAndAngleFromPoints([-1, -1], [2, 3])
		expect(result.length).toBe(5) // 3-4-5 triangle
		expect(result.angle).toBe(Math.atan2(4, 3))
	})

	it('should handle same point', () => {
		const result = getLengthAndAngleFromPoints([1, 1], [1, 1])
		expect(result.length).toBe(0)
		expect(result.angle).toBe(0)
	})

	it('should handle decimal coordinates', () => {
		const result = getLengthAndAngleFromPoints([0.5, 0.5], [1.5, 1.5])
		expect(result.length).toBeCloseTo(Math.sqrt(2))
		expect(result.angle).toBe(Math.PI / 4)
	})
})
