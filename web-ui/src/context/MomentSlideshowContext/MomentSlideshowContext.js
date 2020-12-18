import createSimpleStateUpdateContext from 'utils/createSimpleStateUpdateContext';

const defaultState = { momentID: undefined };

const {
  Provider: MomentSlideshowProvider,
  useState,
  useUpdateState,
} = createSimpleStateUpdateContext(defaultState);

const useCurrentMomentID = () => useState().momentID;
const useUpdateCurrentMomentID = () => {
  const updateState = useUpdateState();
  return momentID => updateState({ momentID });
};

export { MomentSlideshowProvider, useCurrentMomentID, useUpdateCurrentMomentID };
