import React, { useRef, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import { borderRadius, boxShadow, color, fontSize, spacing, theme } from 'theme';
import { useToast } from 'context/ToastContext';

export interface Props {
  id: number;
  isAlert: boolean;
  isCelebration?: boolean;
  color?: string;
}

const TOAST_TIMEOUT = 5000;

const Toast: React.FunctionComponent<Props> = ({
  children,
  id,
  isAlert,
  isCelebration,
  color: backgroundColor = theme.color.green,
}) => {
  const toastRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const { removeToast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), TOAST_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <ToastWrapper role="alert">
      <CSSTransition nodeRef={toastRef} in={mounted} timeout={300} classNames="toast">
        {isCelebration ? (
          <CelebrationBlock ref={toastRef} color={backgroundColor} data-test-id="celebration-block">
            {children}
          </CelebrationBlock>
        ) : (
          <ToastButton
            ref={toastRef}
            backgroundColor={isAlert ? theme.color.alert : backgroundColor}
            onClick={() => removeToast(id)}
          >
            {children}
          </ToastButton>
        )}
      </CSSTransition>
    </ToastWrapper>
  );
};

const ToastWrapper = styled.div`
  display: grid;
  margin-bottom: ${spacing('sm')};
  place-items: center;

  .toast-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  .toast-enter-active,
  .toast-enter-done {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
`;

const ToastButton = styled.button<{ backgroundColor: string; ref: any }>`
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${borderRadius('sm')};
  box-shadow: ${boxShadow('deep')};
  color: ${color('white')};
  cursor: default;
  max-width: 320px;
  padding: ${spacing('md')} ${spacing('lg')};
  opacity: 0;
  pointer-events: all;
  text-align: center;
  width: 100%;
`;

const CelebrationBlock = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  border-radius: ${borderRadius('sm')};
  box-shadow: ${boxShadow('deep')};
  font-size: ${fontSize('lg')};
  margin: 0 auto;
  max-width: 600px;
  opacity: 0;
  padding: ${spacing('lg')};
  text-align: center;
  width: calc(100% - ${spacing('md')});
`;

export default Toast;
