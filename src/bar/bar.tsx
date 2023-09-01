import { Link } from 'react-router-dom';
import './bar.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu } from './menu/menu';
import { RootState } from 'features/userSlice';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../assets/768px-Search_Icon.png';

export const Bar = () => {
  const navigate = useNavigate();

  const userName = useSelector((state: RootState) => state.weatherUser.name);
  const [toggle, setToggle] = useState(false);
  const [city, setCity] = useState('');

  return (
    <div className="bar">
      <div className="search-div">
        <input
          onChange={(e) => {
            setCity(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              navigate('/weather', { state: { cityName: city } });
            }
          }}
          className="search-input"
        />
        <div className="bar__search__div">
          <button
            className="bar__search__btn"
            onClick={() => {
              navigate('/weather', { state: { cityName: city } });
            }}
          >
            <div className="bar__search--sign">
              <img src={searchIcon} alt="searchIcon" className="search__img" />
            </div>
            <p className="search__text">Search</p>
          </button>
        </div>
      </div>
      <div className="right-div">
        <div className="log">
          {userName ? (
            <div className="profile">
              <div className="profile_name"> Hi,{userName} </div>
            </div>
          ) : (
            <Link to="/Login">Login</Link>
          )}
        </div>
        <div>
          <button
            className="menu-button"
            onClick={(e) => {
              e.stopPropagation();
              setToggle(!toggle);
            }}
          >
            {toggle === false ? '+' : '-'}
          </button>
          {toggle && <Menu toggle={toggle} setToggle={setToggle} />}
        </div>
      </div>
    </div>
  );
};
