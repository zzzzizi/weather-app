import { combineEpics } from 'redux-observable';
import {
  localUserStorageEpic,
  deleteCityStorageEpic,
} from './epics/localStorage/getLocalStorage';
import { dataFetchEpic, loginFetchEpic } from './epics/dataFetch/dataFetch';

export const rootEpic = combineEpics(
  localUserStorageEpic,
  deleteCityStorageEpic,
  dataFetchEpic,
  loginFetchEpic
);
