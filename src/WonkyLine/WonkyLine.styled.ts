import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";

import type { AnimateProps } from "./WonkyLine.types.js";

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
  const {
    duration = 1400,
    timingFunction = "cubic-bezier(0.4, 0, 0.2, 1)",
    delay = 1000,
    direction = undefined,
  } = animate ?? {};

  const animationStyles = `${duration}ms ${timingFunction} ${delay}ms forwards;`;

  if (direction === "toRight") {
    return {
      opacity: 0,
      strokeDasharray: 1,
      // This moves the initial part of the line to the right side
      strokeDashoffset: 0.999,
      animation: `${drawToRight} ${animationStyles}`,
    };
  }

  if (direction === "toLeft") {
    return {
      opacity: 0,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      animation: `${drawToLeft} ${animationStyles}`,
    };
  }
});
