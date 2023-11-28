import React, { useEffect, useState } from 'react'
import Currentweather from '../Currentweathercard/Currentweather'
import Hourlyweather from '../Hourlyweather/Hourlyweather'
import Dailyweather from '../Dailyweather/Dailyweather'
import { currentWeather, allDayWeather } from '../../Services/WeatherApi';
import { useNavigate, useParams } from 'react-router-dom';

const Searchweather = () => {
  const { lat, lon } = useParams();
  const navi = useNavigate();

  const [weather, setWeather] = useState([]);
  const [hourlyWeather, seHourlyWeather] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const currentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log("Search  :",latitude,longitude);
      }, (error) => {
        console.error('Error getting location:', error);
      });
      if (latitude,longitude) {
        navi(`/${latitude}/${longitude}`);
      }
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  }

  useEffect(() => {
    currentWeather(lat, lon)
      .then((data) => setWeather(data))
      .catch((error) => console.error('Error fetching weather data:', error));
    allDayWeather(lat, lon)
      .then((data) => seHourlyWeather(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  }, [lat,lon]);
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen text-gray-700 py-7 px-4 md:p-10">
      <div className='w-full'>
        <Currentweather weather={weather} lat={latitude} lon={longitude} currentLocation={currentLocation} />
        <Hourlyweather hourlyWeather={hourlyWeather} timeZone={weather?.timezone}/>
      </div>
      <Dailyweather dailyWeather={hourlyWeather} timeZone={weather?.timezone}/>
    </div>
  )
}
export default Searchweather