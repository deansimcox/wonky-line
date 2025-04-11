import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { generateWonkyLine } from "../utils/generateWonkyLine.js";
import {
	StyledContainer,
	StyledPath,
	StyledSvg,
	StyledText,
} from "./WonkyLine.styled.js";
import type { GeneratedLine, WonkyLineProps } from "./WonkyLine.types.js";

export const WonkyLine: React.FC<WonkyLineProps> = ({
	stroke = "currentColor",
	strokeWidth = 4,
	wonkyness = 6,
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

			const path = generateWonkyLine({
				height,
				width,
				stroke,
				strokeWidth,
				wonkyness,
				stepInterval,
				smoothing,
				animate,
			});

			setGeneratedLine({
				height,
				width,
				path,
			});
		},
		[animate, stepInterval, wonkyness, strokeWidth, smoothing, stroke],
	);

	useEffect(() => {
		if (textRef.current) {
			generateLine(textRef.current.getBoundingClientRect());
		}
	}, [generateLine]);

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
