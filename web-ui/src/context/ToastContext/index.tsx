import React, { createContext, useCallback, useState } from 'react';

import ToastContainer from 'components/Toasts/ToastContainer';

interface UseToast {
  addToast: (content: any, isAlert: boolean, isCelebration?: boolean, color?: string) => void;
  removeToast: (id: number) => void;
}

let id = 1;

const ToastContext = createContext<UseToast>({
  addToast: () => undefined,
  removeToast: () => undefined,
});

const ToastProvider: React.FunctionComponent = ({ children }) => {
  const [toasts, setToasts] = useState<{ id: number; content: any; isAlert: boolean }[]>([]);

  const addToast = useCallback(
    (content, isAlert, isCelebration, color) => {
      setToasts(toasts => [...toasts, { id: id++, content, isAlert, isCelebration, color }]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    id => {
      setToasts(toasts => toasts.filter(toast => toast.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} />

      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => React.useContext<UseToast>(ToastContext);

export { ToastProvider, useToast };
