import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useFetchData } from 'datafetch/datafetch';
import { AjaxError } from 'rxjs/ajax';

type Hour = {
  time: string;
  temp_c: number;
};
type Hours = Array<Hour>;
type Condition = {
  icon: string;
  text: string;
};
type Day = {
  avghumidity: number;
  avgtemp_c: number;
  condition: Condition;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  maxtemp_c: number;
  mintemp_c: number;
};
export type Fore = { hour: Hours; day: Day; date: string };
export type Forecastday = Array<{ hour: Hours; day: Day; date: string }>;
type Current = Record<string, string | number>;
type Location = Record<string, string | number>;
export type Data = {
  current?: Current;
  forecast?: Record<string, Forecastday>;
  location?: Location;
};
export type CityDataState = { cities: Array<Data>; isLoading: boolean };
const initialState: CityDataState = { cities: [], isLoading: false };

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchSuccess: (state: CityDataState, action: PayloadAction<Data>) => {
      state.cities.push(action.payload);
    },
    fetchCityData: (state: CityDataState, action: PayloadAction<string>) => {
      state.isLoading = false;
    },
    fetchErr: (state: CityDataState, action: PayloadAction<AjaxError>) => {
      state.isLoading = true;
    },
  },
});
export const { fetchSuccess, fetchCityData, fetchErr } = weatherSlice.actions;

export type FetchSuccessAction = ReturnType<typeof fetchSuccess>;
export type FetchCityDataAction = ReturnType<typeof fetchCityData>;
export type FetchErrAction = ReturnType<typeof fetchErr>;
export type WeatherAction = FetchSuccessAction | FetchCityDataAction;
export default weatherSlice.reducer;
