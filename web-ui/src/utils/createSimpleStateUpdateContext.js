import React, { createContext, useContext, useReducer } from 'react';

const createSimpleStateUpdateContext = (defaultState = {}) => {
  const StateContext = createContext(null);
  const DispatchContext = createContext(null);

  const Provider = ({ children }) => {
    const [state, updateState] = useReducer(
      (oldState, newState) => ({ ...oldState, ...newState }),
      { ...defaultState }
    );

    return (
      <StateContext.Provider value={{ ...state }}>
        <DispatchContext.Provider value={updateState}>{children}</DispatchContext.Provider>
      </StateContext.Provider>
    );
  };

  const useState = () => useContext(StateContext);
  const useUpdateState = () => useContext(DispatchContext);

  return { Provider, useState, useUpdateState };
};

export default createSimpleStateUpdateContext;
