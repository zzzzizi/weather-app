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
      <div className="side__tittle">My profile</div>
      {email && (
        <div>
          <div className="side__email">
            <div>My E-mail:</div>
            <div>{email}</div>
          </div>
          <div></div>
          <div onClick={() => navigate('/setemail')} className="side__reset">
            Reset
          </div>
        </div>
      )}
    </div>
  );
};
