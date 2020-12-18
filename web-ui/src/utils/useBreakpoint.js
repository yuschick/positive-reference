import { useMediaQuery } from 'react-responsive';

import { breakpoints } from 'theme';

const useBreakpoint = breakpoint => useMediaQuery({ maxWidth: (breakpoints[breakpoint] || 1) - 1 });

const useMobileBreakpoint = (breakpoint = 'sm') =>
  useMediaQuery({ maxWidth: breakpoints[breakpoint] - 1 });

const useBetweenBreakpoints = (min, max) =>
  useMediaQuery({ minWidth: breakpoints[min], maxWidth: breakpoints[max] - 1 });

export { useBreakpoint, useMobileBreakpoint, useBetweenBreakpoints };
