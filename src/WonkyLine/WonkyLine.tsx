import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { generateWonkyLine } from "../utils/generateWonkyLine.js";
import { StyledPath } from "./WonkyLine.styled.js";
import type { GeneratedLine, WonkyLineProps } from "./WonkyLine.types.js";
import { css } from "@emotion/css";

export const WonkyLine = ({
  stroke = "currentColor",
  strokeWidth = 4,
  wonkyness = 6,
  stepInterval = 20,
  smoothing = 0.2,
  animate = {},
  children,
}: WonkyLineProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [generatedLine, setGeneratedLine] = useState<GeneratedLine | null>(
    null
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
    [animate, stepInterval, wonkyness, strokeWidth, smoothing, stroke]
  );

  useEffect(() => {
    if (textRef.current && !generatedLine) {
      generateLine(textRef.current.getBoundingClientRect());
    }
  }, [generateLine, generatedLine]);

  return (
    <span
      className={css`
        position: relative;
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
      {!!generatedLine && (
        <svg
          fill="none"
          viewBox={`0, 0, ${generatedLine.width}, ${generatedLine.height}`}
          focusable={false}
          className={css`
            position: absolute;
            pointer-events: none;
            z-index: 1;
            top: 90%;
            left: 0;
            right: 0;
            height: 100%;
          `}
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
        </svg>
      )}
    </span>
  );
};
