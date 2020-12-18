import useWindowEvent from 'utils/useWindowEvent';

const useKeyDown = (keyCodes, onKeyDown) => {
  useWindowEvent('keydown', ({ code }) => keyCodes.indexOf(code) > -1 && onKeyDown());
};

export default useKeyDown;
