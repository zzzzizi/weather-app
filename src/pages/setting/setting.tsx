import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'features/userSlice';

import { Link } from 'react-router-dom';

export const Setting = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.weatherUser.name);
  return (
    <div>
      {userName ? (
        <div>Manage my favorite city</div>
      ) : (
        <div>
          <div>Please login first, thank you.</div>
          <Link to="/Login">Login</Link>
        </div>
      )}
    </div>
  );
};
