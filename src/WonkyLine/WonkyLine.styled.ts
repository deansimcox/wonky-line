import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";

import type { AnimateProps } from "./WonkyLine.types.js";

export const StyledContainer = styled("span")`
  position: relative;
`;

export const StyledText = styled("span")`
  position: relative;
  z-index: 2;
`;

export const StyledSvg = styled("svg")`
  position: absolute;
  pointer-events: none;
  z-index: 1;
  top: 90%;
  left: 0;
  right: 0;
  height: 100%;
`;

const drawToRight = keyframes`
  from {
    opacity: 1;
    stroke-dashoffset: 1;
  }
  to {
    opacity: 1;
    stroke-dashoffset: 0;
  }
`;

const drawToLeft = keyframes`
  from {
    opacity: 1;
    stroke-dashoffset: 1;
  }
  to {
    opacity: 1;
    stroke-dashoffset: 2;
  }
`;

interface StyledPathProps {
  animate?: AnimateProps;
}
export const StyledPath = styled("path")<StyledPathProps>(({ animate }) => {
  const animationStyles = `${animate?.duration ?? 1400}ms ${
    animate?.timingFunction ?? "cubic-bezier(0.4, 0, 0.2, 1)"
  } ${animate?.delay ?? 1000}ms forwards;`;

  if (animate?.direction === "toRight") {
    return {
      opacity: 0,
      strokeDasharray: 1,
      // This moves the initial part of the line to the right side
      strokeDashoffset: 0.999,
      animation: `${drawToRight} ${animationStyles}`,
    };
  }

  if (animate?.direction === "toLeft") {
    return {
      opacity: 0,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      animation: `${drawToLeft} ${animationStyles}`,
    };
  }
});
