import React, { ReactNode } from 'react';

import Toast, { Props as IToast } from './Toast';
import Portal from 'components/Portal';

type RootToast = IToast & { content: ReactNode };
interface Props {
  toasts: RootToast[];
}

const ToastContainer: React.FunctionComponent<Props> = ({ toasts }) => {
  return (
    <Portal id="toasts" targetId="toast-root">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          isAlert={toast.isAlert}
          isCelebration={toast.isCelebration}
          color={toast.color}
        >
          {toast.content}
        </Toast>
      ))}
    </Portal>
  );
};

export default ToastContainer;
