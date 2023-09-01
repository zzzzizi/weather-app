import { Epic } from 'redux-observable';
import { AjaxError, ajax } from 'rxjs/ajax';
import { filter, mergeMap, map, catchError, of } from 'rxjs';
import {
  Data,
  fetchCityData,
  fetchErr,
  fetchSuccess,
} from '../../../features/weatherSlice';
import { addCity } from 'features/userSlice';
import { RootState } from 'features/userSlice';
import { RootAction } from 'store/store';

export const dataFetchEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(addCity.match),
    mergeMap((action) =>
      ajax
        .getJSON<Data>(
          `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${action.payload}&days=3`,
          {
            'X-RapidAPI-Key':
              '0ffc7e11ecmsh3ee4268ab44cdedp1444dbjsn0579e2911171',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
          }
        )
        .pipe(
          map((res) => fetchSuccess(res)),
          catchError((err: AjaxError) => of(fetchErr(err)))
        )
    )
  );

export const loginFetchEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(fetchCityData.match),
    mergeMap((action) =>
      ajax
        .getJSON<Data>(
          `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${action.payload}&days=3`,
          {
            'X-RapidAPI-Key':
              '0ffc7e11ecmsh3ee4268ab44cdedp1444dbjsn0579e2911171',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
          }
        )
        .pipe(
          map((res) => fetchSuccess(res)),
          catchError((err: AjaxError) => of(fetchErr(err)))
        )
    )
  );
