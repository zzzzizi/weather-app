import { useFetchData } from '../../../datafetch/datafetch';
import './showChartData.css';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { addCity } from '../../../features/userSlice';
import { RootState } from '../../../features/userSlice';
import { Fore } from '../../../features/weatherSlice';
import { min } from 'rxjs';

export const ShowChartData = ({ cityName }: { cityName: string }) => {
  const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json';
  const dispatch = useDispatch();
  const myCities = useSelector(
    (state: RootState) => state.weatherUser.myCities
  );
  const user = useSelector((state: RootState) => state.weatherUser);
  const location = cityName;

  const cityExist = myCities?.findIndex((e) => e === cityName);

  const { data, loading } = useFetchData({
    url,
    location,
  });
  const newData = data?.forecast?.forecastday[0].hour;
  const maxTemp = data?.forecast?.forecastday[0].day.maxtemp_c;
  const yAxisMax: number = maxTemp ? maxTemp + 2 : 40;
  const minTemp = data?.forecast?.forecastday[0].day.mintemp_c;
  const yAxisMin = minTemp ? minTemp - 2 : -5;
  const forecastData = data?.forecast?.forecastday;

  const ShowTemp = ({ forecast }: { forecast: Fore }) => {
    return (
      <div className="weather__frecast__block">
        <div>{forecast.date}</div>
        <img src={forecast.day.condition.icon} alt="tomorrow img" />
        {forecast.day.mintemp_c}°C -- {forecast.day.maxtemp_c}°C
      </div>
    );
  };

  return (
    <div>
      <div className="chart">
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={newData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <Line type="monotone" dataKey="temp_c" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" />
            <YAxis domain={[yAxisMin, yAxisMax]} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            <div>
              {data?.location?.name},{data?.location?.country}
            </div>
            <div>
              {user.name && cityExist === -1 && (
                <button
                  onClick={() => {
                    dispatch(addCity(cityName.toLowerCase()));
                  }}
                >
                  Add to my favorite city
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="weather__forecast weather__forecast__phone">
        {forecastData?.map((forecast, index) => (
          <ShowTemp forecast={forecast} key={index} />
        ))}
      </div>
    </div>
  );
};
