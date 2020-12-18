import { useBreakpoint, useMobileBreakpoint } from 'utils/useBreakpoint';

// Returns the commonly used 3 column layout, shrinking responsively towards 1 column
const useGridColumns = () => {
  const isMobileBreakpoint = useMobileBreakpoint();
  const isMdBreakpoint = useBreakpoint('md');

  return isMobileBreakpoint ? '1fr' : isMdBreakpoint ? '1fr 1fr' : '1fr 1fr 1fr';
};

export default useGridColumns;
