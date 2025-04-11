import React from "react";
import type { Story } from "@ladle/react";
import { WonkyLine as WonkyLineComponent } from "./WonkyLine.js";
import type { WonkyLineProps } from "./WonkyLine.types.js";
import { css } from "@emotion/css";

export const Default: Story<WonkyLineProps> = (props) => (
  <h1
    className={css`
      font-size: 4rem;
      font-family: system-ui, sans-serif;
      color: royalblue;
    `}
  >
    This is <WonkyLineComponent {...props}>really important</WonkyLineComponent>
  </h1>
);

Default.args = {
  stroke: "mediumspringgreen",
  strokeWidth: 8,
  wonkyness: 10,
  stepInterval: 40,
  smoothing: 0.2,
  animate: {
    direction: "toRight",
  },
};

Default.argTypes = {
  stroke: {
    control: {
      type: "color",
    },
  },
};

Default.decorators = [
  (Component: typeof WonkyLineComponent) => (
    <div
      className={css`
        display: grid;
        place-content: center;
        height: 100%;
      `}
    >
      <Component />
    </div>
  ),
];
