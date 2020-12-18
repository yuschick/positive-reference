import { ThunkOn, thunkOn } from 'easy-peasy';

import { ISettingsModel } from './model';

import { IStoreModel } from 'store';

export interface ISettingsModelListeners {
  onSetLanguage: ThunkOn<ISettingsModel, void, IStoreModel>;
}

const listeners: ISettingsModelListeners = {
  onSetLanguage: thunkOn(
    (actions) => [actions.setLanguage],
    async (_, __, { getStoreActions }) => {
      /* RESET LANGUAGE-DEPENDENT CONTENT */
      const {
        audiences: { setAudiences, setRawAudiences, setActiveAudienceSlug },
        exercises: { setExercises },
        strengths: { setStrengths, setPositiveCV, setXmasCalendar, setStartingLesson },
      } = getStoreActions();

      setAudiences([]);
      setRawAudiences([]);
      setActiveAudienceSlug(undefined);
      setExercises([]);
      setStrengths([]);
      setPositiveCV(undefined);
      setXmasCalendar(undefined);
      setStartingLesson(undefined);
    }
  ),
};

export default listeners;
