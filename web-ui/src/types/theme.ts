export enum Color {
  activeGreen = 'activeGreen',
  activeGrey = 'activeGrey',
  activeRed = 'activeRed',
  alert = 'alert',
  backdropGrey = 'backdropGrey',
  black = 'black',
  blue = 'blue',
  burntOrange = 'burntOrange',
  darkerBlue = 'darkerBlue',
  darkTeal = 'darkTeal',
  darkYellow = 'darkYellow',
  disabled = 'disabled',
  gold = 'gold',
  green = 'green',
  grey = 'grey',
  hoverGrey = 'hoverGrey',
  hoverRed = 'hoverRed',
  lightBlue = 'lightBlue',
  lightGreen = 'lightGreen',
  lightGrey = 'lightGrey',
  inactiveGrey = 'inactiveGrey',
  lightYellow = 'lightYellow',
  hoverGreen = 'hoverGreen',
  palePink = 'palePink',
  paleYellow = 'paleYellow',
  pink = 'pink',
  red = 'red',
  sand = 'sand',
  softAlert = 'softAlert',
  teal = 'teal',
  violet = 'violet',
  warmBlue = 'warmBlue',
  white = 'white',
  yellow = 'yellow',
}

export type COLOR_NAME =
  | 'activeGreen'
  | 'activeGrey'
  | 'activeRed'
  | 'alert'
  | 'backdropGrey'
  | 'black'
  | 'blue'
  | 'burntOrange'
  | 'darkerBlue'
  | 'darkTeal'
  | 'darkYellow'
  | 'disabled'
  | 'gold'
  | 'green'
  | 'grey'
  | 'hoverGrey'
  | 'hoverRed'
  | 'lightBlue'
  | 'lightGreen'
  | 'lightGrey'
  | 'inactiveGrey'
  | 'lightYellow'
  | 'hoverGreen'
  | 'palePink'
  | 'paleYellow'
  | 'pink'
  | 'red'
  | 'sand'
  | 'softAlert'
  | 'teal'
  | 'violet'
  | 'warmBlue'
  | 'white'
  | 'yellow';

export type BREAKPOINTS = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type SPACING_VALUES =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | 'xxxxl'
  | 'navbar';

export type SPACING = SPACING_VALUES | 'auto';

export type BORDER_RADIUS = 'none' | 'xs' | 'sm' | 'lg' | 'xl' | 'circle';
export type BOX_SHADOW = 'shallow' | 'deep' | 'photoOverlay';
export type FONT = 'body' | 'bold' | 'extraBold' | 'italic';
export type FONT_SIZE = 'xxs' | 'xs' | 'sm' | 'body' | 'md' | 'lg' | 'xl';
export type TRANSITION = 'sm' | 'md';

export type Breakpoints = { [key in BREAKPOINTS]: string };
export type BreakpointsModify = { [key in BREAKPOINTS]: (num: number) => string };
export type Spacing = { [key in SPACING]: string };
export type SpacingValue = { [key in SPACING_VALUES]: number };
export type BorderRadius = { [key in BORDER_RADIUS]: string };
export type BoxShadow = { [key in BOX_SHADOW]: string };
export type Font = { [key in FONT]: string };
export type FontSize = { [key in FONT_SIZE]: string };
export type Transition = { [key in TRANSITION]: string };

export interface Theme {
  appMaxWidth: string;
  borderRadius: BorderRadius;
  boxShadow: BoxShadow;
  breakpoint: Breakpoints;
  breakpointModify: BreakpointsModify;
  color: COLOR_NAME;
  font: Font;
  fontSize: FontSize;
  spacing: Spacing;
  spacingValue: SpacingValue;
  transition: Transition;
}
