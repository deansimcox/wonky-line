export interface TextUnderlineProps {
  /**
   * The stroke colour of the underline.
   * @default 'currentColor'
   */
  stroke?: string;
  /**
   * The stroke width in pixels.
   * @default 4
   */
  strokeWidth?: number;
  /**
   * Variance is a pixel value that dictates how far up and down the generated line can go. A higher number will result in a more wavy line.
   * @default 6
   */
  variance?: number;
  /**
   * This is a pixel value that determines how many points to draw in the line. If the text you are underlining is large, you may want to increase this number.
   * @default 20
   */
  stepInterval?: number;
  /**
   * This determines how much smoothing you want at each point. A value of 0 would result in jagged edges.
   * @default 0.2
   */
  smoothing?: number;
  /**
   * Allows you to animate the line left or right, this is an opt-in feature
   * @default {}
   */
  animate?: AnimateProps;
  children?: React.ReactNode;
}

export interface AnimateProps {
  direction?: 'toRight' | 'toLeft';
  duration?: number;
  delay?: number;
  timingFunction?: string;
}

export interface GeneratedLine {
  height: number;
  width: number;
  path: string;
}
