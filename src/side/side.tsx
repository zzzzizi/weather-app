import { RootState } from 'features/userSlice';
import './side.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Side = () => {
  const navigate = useNavigate();
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const email = useSelector((state: RootState) => state.weatherUser.email);
  const [isSex, setIsSex] = useState<boolean>(false);
  const sex = useSelector((state: RootState) => state.weatherUser.sex);

  return (
    <div className="side">
      <div>My profile</div>
      {email && (
        <div>
          <div>
            <button onClick={() => setIsEmail(!isEmail)}>email</button>
            {isEmail && (
              <div onClick={() => navigate('/setemail')}>{email}</div>
            )}
          </div>
          <div>
            <button onClick={() => setIsSex(!isSex)}>sex</button>
            {isSex && <div>{sex}</div>}
          </div>
          <div>password</div>
        </div>
      )}
    </div>
  );
};
