import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Hour = {
  time: string;
  temp_c: number;
};
type Hours = Array<Hour>;
type Day = {
  avghumidity: number;
  avgtemp_c: number;
  condition: Record<string, string>;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  maxtemp_c: number;
  mintemp_c: number;
};
type Forecastday = Array<Hour | Day>;
type Current = Record<string, string | number>;
type Location = Record<string, string | number>;
type Data = {
  current: Current;
  forecast: Record<string, Forecastday>;
  location: Location;
};
type CityDataState = Array<Data>;
const initialState: CityDataState = [];

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addLocation: (state: CityDataState, action: PayloadAction<Data>) => {
      state.push(action.payload);
    },
  },
});
