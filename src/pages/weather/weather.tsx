import { ShowChartData } from './showChartData/showChartData';
import { useLocation } from 'react-router-dom';

export const Weather = () => {
  const location = useLocation();

  return (
    <div>
      {location.state ? (
        <div>
          <ShowChartData cityName={location.state.cityName} />
        </div>
      ) : (
        <div>Please search a city.</div>
      )}
    </div>
  );
};
