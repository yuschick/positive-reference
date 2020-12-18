import { createGlobalStyle } from 'styled-components';

import '../node_modules/sanitize.css/sanitize.css';
import '../node_modules/typeface-roboto/index.css';

const breakpoints = {
  xs: 576,
  sm: 768,
  md: 940,
  lg: 1040,
  xl: 1200,
  xxl: 1280,
};

const spacings = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 56,
  xxxl: 96,
  xxxxl: 160,
  navbar: 48,
};

const theme = {
  appMaxWidth: '1280px',
  borderRadius: {
    none: '0',
    xs: '4px',
    sm: '8px',
    lg: '16px',
    xl: '48px',
    circle: '100%',
  },
  boxShadow: {
    light: '0 1px 0 0 rgba(0,0,0,0.05)',
    subtle: '0px 1px 1px 0px rgba(0, 0, 0, 0.1)',
    shallow: '0 2px 2px 2px rgba(0,0,0,0.125)',
    deep: '0 2px 8px 2px rgba(0,0,0,0.125)',
    photoOverlay: '0 0 18px 8px rgba(0,0,0,0.175)',
  },
  breakpoint: {
    xs: `${breakpoints.xs}px`,
    sm: `${breakpoints.sm}px`,
    md: `${breakpoints.md}px`,
    lg: `${breakpoints.lg}px`,
    xl: `${breakpoints.xl}px`,
    xxl: `${breakpoints.xxl}px`,
  },
  breakpointModify: {
    xs: (modifier = 0) => `${breakpoints.xs + modifier}px`,
    sm: (modifier = 0) => `${breakpoints.sm + modifier}px`,
    md: (modifier = 0) => `${breakpoints.md + modifier}px`,
    lg: (modifier = 0) => `${breakpoints.lg + modifier}px`,
    xl: (modifier = 0) => `${breakpoints.xl + modifier}px`,
    xxl: (modifier = 0) => `${breakpoints.xxl + modifier}px`,
  },
  color: {
    white: '#ffffff',
    backdropGrey: '#f8f8f8',
    lightGrey: '#e8e8e8',
    inactiveGrey: '#d6d6d6',
    grey: '#999999',
    hoverGrey: '#707070',
    activeGrey: '#474747',
    black: '#333333',
    lightGreen: '#d7ebd6',
    green: '#58aa52',
    hoverGreen: '#478a42',
    activeGreen: '#396e35',
    palePink: '#fce3e2',
    pink: '#f8c9cd',
    red: '#b61925',
    hoverRed: '#8f141d',
    activeRed: '#6c0f16',
    violet: '#d6d5eb',
    warmBlue: '#8eafdc',
    lightBlue: '#6b96b2',
    blue: '#4f9bd5',
    darkerBlue: '#327ab2',
    teal: '#a5d7d5',
    darkTeal: '#4d97b5',
    disabled: '#c2c2c2',
    lightYellow: '#fffbed',
    sand: '#feecb9',
    paleYellow: '#ffe88a',
    yellow: '#efc53d',
    gold: '#fdc626',
    darkYellow: '#BC9410',
    alert: '#eb524c',
    softAlert: '#ef7570',
    burntOrange: '#ef7f40',
  },
  font: {
    body: 'ageo',
    semibold: 'ageo-semibold',
    bold: 'ageo-bold',
    extraBold: 'ageo-extrabold',
    italic: 'ageo-italic',
    tip: 'bradley-hand-itc-tt-bold',
  },
  fontSize: {
    xxs: '0.6667rem', // 12px
    xs: '0.7778rem', // 14px
    sm: '0.8889rem', // 16px
    body: '1rem', // 18px
    md: '1.2222rem', // 22px
    lg: '1.7778rem', // 32px
    xl: '2.6667rem', // 48px
    tip: '1.3333rem', // 24px
  },
  spacing: {
    auto: 'auto',
    none: `${spacings.none}px`,
    xs: `${spacings.xs}px`,
    sm: `${spacings.sm}px`,
    md: `${spacings.md}px`,
    lg: `${spacings.lg}px`,
    xl: `${spacings.xl}px`,
    xxl: `${spacings.xxl}px`,
    xxxl: `${spacings.xxxl}px`,
    xxxxl: `${spacings.xxxxl}px`,
    navbar: `${spacings.navbar}px`,
  },
  spacingValue: {
    none: spacings.none,
    xs: spacings.xs,
    sm: spacings.sm,
    md: spacings.md,
    lg: spacings.lg,
    xl: spacings.xl,
    xxl: spacings.xxl,
    xxxl: spacings.xxxl,
    xxxxl: spacings.xxxxl,
    navbar: spacings.navbar,
  },
  transition: {
    sm: 'all 0.3s ease-in-out',
    md: 'all 0.4s ease-in-out',
  },
};

export const appMaxWidth = theme.appMaxWidth;

const getTheme = themeProp => (...styleProps) => props =>
  styleProps
    .map(styleProp => props.theme[themeProp][styleProp])
    .join(' ')
    .trim();

const borderRadius = getTheme('borderRadius');
const boxShadow = getTheme('boxShadow');
const breakpoint = getTheme('breakpoint');
const breakpointModify = (breakpoint, modifier) => props =>
  props.theme.breakpointModify[breakpoint](modifier);
const color = getTheme('color');
const font = getTheme('font');
const fontSize = getTheme('fontSize');
const spacing = getTheme('spacing');
const transition = getTheme('transition');

const GlobalStyle = createGlobalStyle`
* {
    border: 0;
    box-sizing: border-box;
    font-size: 100%;
    margin: 0;
    padding: 0;
	  vertical-align: baseline
  }

  html, body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    background-color: ${color('white')};
    backface-visibility: hidden;
    color: ${color('black')};
    font-family: ${font('body')};
    font-size: 18px;
    font-weight: 400;
    height: 100%;
    line-height: 1.5;
    min-height: 100vh;
    text-rendering: optimizeLegibility;
  }

  #root {
    background-color: ${color('backdropGrey')};
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: min-content auto min-content;
    height: 100%;
    max-width: 100%;
    min-height: 100%;
    overflow: auto;
  }

  #portal-root {
    position: relative;
    z-index: 2;
  }

  #toasts {
    width: 100%;
  }

  #toast-container {
    left: 50%;
    max-width: ${theme.appMaxWidth};
    pointer-events: none;
    position: fixed;
    top: ${theme.spacing.md};
    transform: translateX(-50%);
    width: 100%;
    z-index: 3;
  }

  #toast-root {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
    width: 100%;
  }

  img {
    max-width: 100%;
  }

  ul {
    margin: 0;
    white-space: pre-wrap;
  }

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: none;
  }

  input, textarea {
    padding: 0;
    outline: none;
  }

  label {
    font-size: ${fontSize('sm')};
  }

  hr {
    margin: 0;
    border: 0;
    border-top: solid 1px ${color('lightGrey')};
  }

  svg {
    outline: none;
  }

  select {
    border: 1px solid ${color('green')};
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }

  ol {
    padding-inline-start: 40px;
  }

  iframe {
    max-width: 100%;
  }

  .overflow-hidden {
    overflow: hidden;
  }

  .recharts-surface {
    overflow: visible !important;
  }

  .recharts-cartesian-axis, .recharts-label {
    font-family: ${font('bold')};
    font-size: ${fontSize('xs')};
    letter-spacing: 0.075em;
    text-transform: uppercase;
  }

  .recharts-reference-count {
    font-family: ${font('bold')};
    font-size: ${fontSize('md')};
  }

  .recharts-reference-date {
    font-family: ${font('bold')};
    font-size: ${fontSize('xxs')};
    letter-spacing: 0.075em;
    text-transform: uppercase;
  }
`;

export {
  theme,
  borderRadius,
  boxShadow,
  breakpoint,
  breakpoints,
  breakpointModify,
  color,
  font,
  fontSize,
  spacing,
  transition,
  GlobalStyle,
};
