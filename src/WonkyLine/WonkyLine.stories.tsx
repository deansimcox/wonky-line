import React from "react";
import type { Story } from "@ladle/react";
import { WonkyLine as WonkyLineComponent } from "./WonkyLine.js";
import type { WonkyLineProps } from "./WonkyLine.types.js";
import { css } from "@emotion/css";

const WrapperDecorator = (Component: typeof WonkyLineComponent) => (
  <div
    className={css`
      display: grid;
      place-content: center;
      height: 100%;
    `}
  >
    <Component />
  </div>
);

export const Headline: Story<WonkyLineProps> = (props) => (
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

Headline.args = {
  stroke: "mediumspringgreen",
  strokeWidth: 8,
  wonkyness: 10,
  stepInterval: 40,
  smoothing: 0.2,
  animate: {
    direction: "toRight",
  },
};

Headline.argTypes = {
  stroke: {
    control: {
      type: "color",
    },
  },
};

Headline.decorators = [WrapperDecorator];

export const MultiLine: Story<WonkyLineProps> = (props) => (
  <p
    className={css`
      font-size: 2rem;
      font-family: system-ui, sans-serif;
      color: royalblue;
    `}
  >
    Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
    <WonkyLineComponent {...props}>
      Repellendus nulla quidem facere ut fugit ipsam, necessitatibus saepe quo
      mollitia, at suscipit ipsa unde dolore rem!
    </WonkyLineComponent>{" "}
    Cumque, deserunt. Ab, veniam iure?
  </p>
);

MultiLine.args = {
  stroke: "mediumspringgreen",
  strokeWidth: 4,
  wonkyness: 10,
  stepInterval: 20,
  smoothing: 0.2,
  animate: {},
};

MultiLine.argTypes = {
  stroke: {
    control: {
      type: "color",
    },
  },
};

MultiLine.decorators = [WrapperDecorator];
