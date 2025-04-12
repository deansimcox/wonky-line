import React from "react";
import { css } from "@emotion/css";
import { StyledPath } from "./WonkyLine.styled.js";
import type { WonkyLineProps } from "./WonkyLine.types.js";
import { useWonkyLine } from "./useWonkyLine.js";

export const WonkyLine = ({
  stroke = "currentColor",
  strokeWidth = 4,
  wonkyness = 6,
  stepInterval = 20,
  smoothing = 0.2,
  animate = {},
  children,
}: WonkyLineProps) => {
  const { containerRef, textRef, generatedLines } = useWonkyLine({
    stroke,
    strokeWidth,
    wonkyness,
    stepInterval,
    smoothing,
    animate,
  });

  return (
    <span
      ref={containerRef}
      className={css`
        position: relative;
        display: inline-block;
      `}
    >
      <span
        className={css`
          position: relative;
          z-index: 2;
        `}
        ref={textRef}
      >
        {children}
      </span>
      {generatedLines.map((line, index) => (
        <svg
          key={`${line.top}-${line.left}-${index}`}
          fill="none"
          viewBox={`0, 0, ${line.width}, ${line.height}`}
          focusable={false}
          className={css`
            position: absolute;
            pointer-events: none;
            z-index: 1;
            top: ${line.top}px;
            left: ${line.left}px;
            height: ${line.height}px;
          `}
          role="presentation"
        >
          <StyledPath
            animate={animate}
            pathLength={1}
            d={line.path}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      ))}
    </span>
  );
};
