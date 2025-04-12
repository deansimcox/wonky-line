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
  const [generatedLines, setGeneratedLines] = useState<GeneratedLine[]>([]);

  const generateLines = useCallback(
    (textBox: DOMRect) => {
      if (!textRef.current) return;

      // Get all text nodes and their positions
      const textNodes = Array.from(textRef.current.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      const lines: GeneratedLine[] = [];
      let currentLineTop = 0;
      let currentLineHeight = 0;

      for (const node of textNodes) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const rects = range.getClientRects();

        for (const rect of Array.from(rects)) {
          // If this rect is on a new line
          if (rect.top > currentLineTop + currentLineHeight) {
            currentLineTop = rect.top - textBox.top;
            currentLineHeight = rect.height;
          }

          const extraHeightToPushLineDown = currentLineHeight * 0.75;

          const path = generateWonkyLine({
            height: rect.height,
            width: rect.width,
            stroke,
            strokeWidth,
            wonkyness,
            stepInterval,
            smoothing,
            animate,
          });

          lines.push({
            height: rect.height,
            width: rect.width,
            path,
            top: currentLineTop + extraHeightToPushLineDown,
            left: rect.left - textBox.left,
          });
        }
      }

      setGeneratedLines(lines);
    },
    [animate, stepInterval, wonkyness, strokeWidth, smoothing, stroke]
  );

  useEffect(() => {
    if (textRef.current && generatedLines.length === 0) {
      generateLines(textRef.current.getBoundingClientRect());
    }
  }, [generateLines, generatedLines]);

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
