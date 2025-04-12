import { useCallback, useEffect, useRef, useState } from "react";
import { generateWonkyLine } from "../utils/generateWonkyLine.js";
import type { GeneratedLine, WonkyLineOptions } from "./WonkyLine.types.js";

export const useWonkyLine = ({
  stroke = "currentColor",
  strokeWidth = 4,
  wonkyness = 6,
  stepInterval = 20,
  smoothing = 0.2,
  animate = {},
}: WonkyLineOptions) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [generatedLines, setGeneratedLines] = useState<GeneratedLine[]>([]);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const lastCacheKeyRef = useRef<string>("");

  const generateLines = useCallback(
    (textBox: DOMRect) => {
      if (!textRef.current) return;

      // Create a cache key based on text content and width
      const textContent = textRef.current.textContent || "";
      const cacheKey = `${textContent}-${textBox.width}`;

      // If the cache key hasn't changed, don't regenerate lines
      if (cacheKey === lastCacheKeyRef.current) {
        return;
      }

      lastCacheKeyRef.current = cacheKey;

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
    if (!textRef.current || !containerRef.current) return;

    // Create a new ResizeObserver
    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (
          entry.target === textRef.current ||
          entry.target === containerRef.current
        ) {
          if (textRef.current) {
            generateLines(textRef.current.getBoundingClientRect());
          }
        }
      }
    });

    // Start observing both the container and text elements
    resizeObserverRef.current.observe(containerRef.current);
    resizeObserverRef.current.observe(textRef.current);

    // Initial generation
    generateLines(textRef.current.getBoundingClientRect());

    // Cleanup
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [generateLines]);

  return {
    containerRef,
    textRef,
    generatedLines,
  };
};
