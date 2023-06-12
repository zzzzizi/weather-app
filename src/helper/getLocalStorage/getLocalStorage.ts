import { ofType, Epic } from 'redux-observable';

import { User } from '../../pages/register/register';
import { addCity } from '../../features/userSlice';
import { tap, ignoreElements, withLatestFrom, filter } from 'rxjs';
import { RootState } from '../../features/userSlice';
import { WeatherUserAction } from '../../features/userSlice';
import { isActionOf } from 'typesafe-actions';
// export const getLocal = ({ user }: { user: WeatherUserState }) => {
//   const stringifiedUser = localStorage.getItem('user');
//   const users: Array<User> = [];
//   if (stringifiedUser !== null) {
//     users.push(...JSON.parse(stringifiedUser));
//   }
//   console.log(users);
//   console.log(user);
//   const newUsers = users.map((u) => (u.userId !== user.userId ? u : user));
//   localStorage.setItem('user', JSON.stringify(newUsers));
// };

export const localUserStorageEpic: Epic<
  WeatherUserAction,
  WeatherUserAction,
  RootState
> = (action$, state$) =>
  action$.pipe(
    filter(addCity.match),
    withLatestFrom(state$, ({ payload }, state) => ({
      weatherUser: state.weatherUser,
      city: payload,
    })),
    tap(({ city, weatherUser }) => {
      const stringifiedUser = localStorage.getItem('user');

      const users: Array<User> = [];
      if (stringifiedUser !== null) {
        users.push(...JSON.parse(stringifiedUser));
      }
      const user = users.find((user) => user.userId === weatherUser.userId);
      user?.myCities.push(city);
      const newUsers = users.map((u) =>
        u.userId !== weatherUser.userId ? u : user
      );
      localStorage.setItem('user', JSON.stringify(newUsers));
    }),
    ignoreElements()
  );
