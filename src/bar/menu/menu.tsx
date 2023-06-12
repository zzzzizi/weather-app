import { Link } from 'react-router-dom';
import { useOutsideClick } from '../../helper/outsideclick';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../features/userSlice';
import { RootState } from '../../features/userSlice';

export const Menu = (props: {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.weatherUser.name);
  const handleClickOutside = () => {
    props.setToggle(false);
  };
  const ref = useOutsideClick(handleClickOutside);
  return (
    <div className="menu-div" ref={ref}>
      <div>
        <Link className="menu__home" to="/">
          HOME
        </Link>
      </div>
      <div>
        <Link className="menu__home" to="/weather">
          WEATHER
        </Link>
      </div>
      <div>
        <Link className="menu__home" to="/service">
          SERVICE
        </Link>
      </div>
      <div>
        <Link className="menu__home" to="/setting">
          SETTING
        </Link>
      </div>
      <div>
        {userName && (
          <Link
            className="menu__home"
            to="/"
            onClick={() => dispatch(logOut())}
          >
            LOG OUT
          </Link>
        )}
      </div>
    </div>
  );
};
