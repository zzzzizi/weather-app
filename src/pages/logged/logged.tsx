import { useSelector } from 'react-redux';
import { RootState } from 'features/userSlice';
export const Logged = () => {
  const userName = useSelector((state: RootState) => state.weatherUser.name);
  return <div>Welcome, {userName}!</div>;
};
