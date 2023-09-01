import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'features/userSlice';
import { deleteCity } from 'features/userSlice';
import './setting.css';
import { Link, useNavigate } from 'react-router-dom';

export const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state: RootState) => state.weatherUser.name);
  const cityName = useSelector(
    (state: RootState) => state.weatherUser.myCities
  );
  const handleDelete = (city: string) => {
    dispatch(deleteCity(city));
  };
  const ShowCity = ({ city }: { city: string }) => {
    return (
      <div className="setting__list">
        <div
          className="setting__list__left"
          onClick={() => navigate('/weather', { state: { cityName: city } })}
        >
          {city}
        </div>
        <div className="setting__list__right">
          <button
            className="setting__button"
            onClick={() => handleDelete(city)}
          >
            X
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="setting__container">
      {userName ? (
        <div>
          <div>
            <div className="setting__top">My favorite city</div>
            <div className="setting__list">
              <div className="setting__list__middle__left">City name</div>
              <div className="setting__list__middle__right">Delete</div>
            </div>
            <div>
              {cityName?.map((city, index) => (
                <ShowCity city={city} key={index} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>Please login first, thank you.</div>
          <Link to="/Login">Login</Link>
        </div>
      )}
    </div>
  );
};
