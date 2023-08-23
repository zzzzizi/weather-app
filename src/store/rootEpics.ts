import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {
  localUserStorageEpic,
  deleteCityStorageEpic,
} from './epics/localStorage/getLocalStorage';
import { WeatherUserAction, WeatherUserState } from '../features/userSlice';

export const rootEpic = combineEpics(
  localUserStorageEpic,
  deleteCityStorageEpic
);
