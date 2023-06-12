import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { localUserStorageEpic } from '../helper/getLocalStorage/getLocalStorage';
import { WeatherUserAction, WeatherUserState } from '../features/userSlice';

export const rootEpic = combineEpics(localUserStorageEpic);
