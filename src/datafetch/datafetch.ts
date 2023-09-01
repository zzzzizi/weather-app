import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { Data } from 'features/weatherSlice';

export const useFetchData = ({
  url,
  location,
}: {
  url: string;
  location: string;
}): { data: Data; loading: boolean } => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const options = useMemo(() => {
    return {
      method: 'GET',
      url: url,
      params: {
        q: location,
        days: '3',
      },
      headers: {
        'X-RapidAPI-Key': '0ffc7e11ecmsh3ee4268ab44cdedp1444dbjsn0579e2911171',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };
  }, [url, location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [options]);
  return { data, loading };
};

// const options = {
//   method: 'GET',
//   url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
//   params: {
//     q: 'London',
//     days: '3',
//   },
//   headers: {
//     'X-RapidAPI-Key': '0ffc7e11ecmsh3ee4268ab44cdedp1444dbjsn0579e2911171',
//     'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
//   },
// };
