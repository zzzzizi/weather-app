import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ActionType } from 'typesafe-actions';

export type Sex = 'male' | 'female' | 'other';
export type WeatherUserState = {
  name: string;
  password: string;
  confirmPassword: string;
  sex: Sex;
  userId: number;
  email: string;
  myCities?: Array<string> | undefined;
};

export const initialState: WeatherUserState = {
  name: '',
  password: '',
  confirmPassword: '',
  sex: 'other' as Sex,
  userId: 0,
  email: '',
  myCities: [],
};

export const weatherUserSlice = createSlice({
  name: 'weatherUser',
  initialState,

  reducers: {
    login: (state: WeatherUserState, action: PayloadAction<WeatherUserState>) =>
      action.payload,
    addCity: (state: WeatherUserState, action: PayloadAction<string>) => {
      state.myCities?.push(action.payload);
    },
    deleteCity: (state: WeatherUserState, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.myCities = state.myCities?.filter(
        (city) => city !== action.payload
      );
    },
    resetSex: (state: WeatherUserState, action: PayloadAction<Sex>) => {
      state.sex = action.payload;
    },
    resetEmail: (state: WeatherUserState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    resetPassword: (state: WeatherUserState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    logOut: (state: WeatherUserState) => initialState,
  },
});

export const {
  login,
  addCity,
  deleteCity,
  resetSex,
  resetEmail,
  resetPassword,
  logOut,
} = weatherUserSlice.actions;

export type RootState = { weatherUser: WeatherUserState };

export type AddCityAction = ReturnType<typeof addCity>;
export type LoginAction = ReturnType<typeof login>;

export type WeatherUserAction = AddCityAction | LoginAction;
export default weatherUserSlice.reducer;
