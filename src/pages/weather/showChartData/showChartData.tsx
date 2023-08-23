import { useFetchData } from '../../../datafetch/datafetch';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { addCity } from '../../../features/userSlice';
import { RootState } from '../../../features/userSlice';

export type Data = {
  current?: Record<string, string | number>;
  forecast?: Record<
    string,
    Array<Record<string, Array<Record<string, string>>>>
  >;
  location?: Record<string, string>;
};

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

  return (
    <div>
      <LineChart
        width={550}
        height={260}
        data={newData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <Line type="monotone" dataKey="temp_c" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
      </LineChart>

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
    </div>
  );
};
