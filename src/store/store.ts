import { configureStore } from '@reduxjs/toolkit';
import weatherUserSlice, { WeatherUserAction } from '../features/userSlice';
// import { epicMiddleware } from './rootEpics';
import { rootEpic } from './rootEpics';
import { RootState } from '../features/userSlice';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

export const epicMiddleware = createEpicMiddleware<
  WeatherUserAction,
  WeatherUserAction,
  RootState,
  void
>();

export const store = configureStore({
  reducer: {
    weatherUser: weatherUserSlice,
  },
  middleware: [epicMiddleware],
});
epicMiddleware.run(rootEpic);
