import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { randomNumberBetween } from "../utils/randomNumberBetween.js";
import {
	StyledContainer,
	StyledPath,
	StyledSvg,
	StyledText,
} from "./WonkyLine.styled.js";
import type { GeneratedLine, WonkyLineProps } from "./WonkyLine.types.js";

/**
 * Line generation code has been derived from this article:
 * https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
 */

const line = (pointA: number[], pointB: number[]) => {
	const a0 = pointA[0] ?? 0;
	const a1 = pointA[1] ?? 0;
	const b0 = pointB[0] ?? 0;
	const b1 = pointB[1] ?? 0;
	const lengthX = b0 - a0;
	const lengthY = b1 - a1;
	return {
		length: Math.sqrt(lengthX ** 2 + lengthY ** 2),
		angle: Math.atan2(lengthY, lengthX),
	};
};

const controlPoint = (
	current: number[],
	previous: number[],
	next: number[],
	smoothing: number,
	reverse: boolean,
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
	const opposedLine = line(previous, next);

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

const bezierCommand = (
	point: number[],
	index: number,
	array: number[][],
	smoothing: number,
) => {
	// start control point
	const controlPointStart = controlPoint(
		array[index - 1] ?? [],
		array[index - 2] ?? [],
		point,
		smoothing,
		false,
	);

	// end control point
	const controlPointEnd = controlPoint(
		point,
		array[index - 1] ?? [],
		array[index + 1] ?? [],
		smoothing,
		true,
	);
	return `C ${controlPointStart?.[0]},${controlPointStart?.[1]} ${controlPointEnd?.[0]},${controlPointEnd?.[1]} ${point?.[0]},${point?.[1]}`;
};

const WonkyLine: React.FC<WonkyLineProps> = ({
	stroke = "currentColor",
	strokeWidth = 4,
	variance = 6,
	stepInterval = 20,
	smoothing = 0.2,
	animate = {},
	children,
}) => {
	const textRef = useRef<HTMLSpanElement>(null);
	const [generatedLine, setGeneratedLine] = useState<GeneratedLine | null>(
		null,
	);

	const generateLine = useCallback(
		(textBox: DOMRect) => {
			const height = textBox?.height ?? 0;
			const width = textBox?.width ?? 0;

			const minY = strokeWidth;
			const maxY = strokeWidth + variance;

			const minX = strokeWidth;
			const maxX = width - strokeWidth;

			const randomY = () => randomNumberBetween(minY, maxY);

			// The amount of points needed between the start and end points
			let midPointsAmount = Math.floor(width / stepInterval) - 2; // '2' represents the minX and maxX (start and end) points
			if (midPointsAmount < 1) {
				midPointsAmount = 1;
			}

			// The generated points of a line to draw
			const points = [
				[minX, randomY()],
				...new Array(midPointsAmount)
					.fill(0)
					.map((_point, index) => [stepInterval * (index + 1), randomY()]),
				[maxX, randomY()],
			];

			const path = points?.reduce(
				(acc, point, index, array) =>
					index === 0
						? `M ${point[0]},${point[1]}`
						: `${acc} ${bezierCommand(point, index, array, smoothing)}`,
				"",
			);

			setGeneratedLine({
				height,
				width,
				path,
			});
		},
		[smoothing, stepInterval, strokeWidth, variance],
	);

	useEffect(() => {
		if (textRef.current) {
			generateLine(textRef.current.getBoundingClientRect());
		}
	}, [generateLine, textRef]);

	return (
		<StyledContainer>
			<StyledText ref={textRef}>{children}</StyledText>
			{generatedLine ? (
				<StyledSvg
					fill="none"
					viewBox={`0, 0, ${generatedLine.width}, ${generatedLine.height}`}
					xmlns="http://www.w3.org/2000/svg"
					focusable={false}
					className="underline"
					role="presentation"
				>
					<StyledPath
						animate={animate}
						pathLength={1}
						d={generatedLine.path}
						stroke={stroke}
						strokeWidth={strokeWidth}
						strokeLinecap="round"
					/>
				</StyledSvg>
			) : null}
		</StyledContainer>
	);
};

export default WonkyLine;
