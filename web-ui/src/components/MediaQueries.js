import { breakpoints } from 'theme';
import { useMediaQuery } from 'react-responsive';

const DesktopBreakpoint = ({ children }) =>
  useMediaQuery({ minWidth: breakpoints.sm }) ? children : null;

const MobileBreakpoint = ({ children }) =>
  useMediaQuery({ maxWidth: breakpoints.sm - 1 }) ? children : null;

const AboveBreakpoint = ({ breakpoint, children }) =>
  useMediaQuery({ minWidth: breakpoints[breakpoint] }) ? children : null;

const BelowBreakpoint = ({ breakpoint, children }) =>
  useMediaQuery({ maxWidth: breakpoints[breakpoint] - 1 }) ? children : null;

const BetweenBreakpoints = ({ breakpoints: bps, children }) =>
  useMediaQuery({
    minWidth: breakpoints[bps[0]],
    maxWidth: breakpoints[bps[1]] - 1,
  })
    ? children
    : null;

export {
  DesktopBreakpoint,
  MobileBreakpoint,
  AboveBreakpoint,
  BelowBreakpoint,
  BetweenBreakpoints,
};
