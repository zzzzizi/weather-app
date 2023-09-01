import { configureStore } from '@reduxjs/toolkit';
import weatherUserSlice, { AddCityAction } from '../features/userSlice';

import { rootEpic } from './rootEpics';
import { RootState } from '../features/userSlice';
import { createEpicMiddleware } from 'redux-observable';
import weatherSlice, {
  FetchSuccessAction,
  FetchCityDataAction,
  FetchErrAction,
} from 'features/weatherSlice';

export type RootAction =
  | AddCityAction
  | FetchCityDataAction
  | FetchSuccessAction
  | FetchErrAction;

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  void
>();

export const store = configureStore({
  reducer: {
    weatherUser: weatherUserSlice,
    weather: weatherSlice,
  },
  middleware: [epicMiddleware],
});
epicMiddleware.run(rootEpic);
