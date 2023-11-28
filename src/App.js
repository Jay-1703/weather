import React, { useEffect, useState } from 'react';
import './App.css';
import Currentweather from './components/Currentweathercard/Currentweather';
import Dailyweather from './components/Dailyweather/Dailyweather';
import Hourlyweather from './components/Hourlyweather/Hourlyweather';
import { currentWeather, allDayWeather } from './Services/WeatherApi';
import { useParams } from 'react-router-dom';
function App() {
  const {lat,lon} = useParams();
  const [weather, setWeather] = useState([]);
  const [hourlyWeather, seHourlyWeather] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const currentLocation = async () => {
    if (lat,lon) {
      setLatitude(lat);
      setLongitude(lon);
    }
    else{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(latitude,longitude);
        }, (error) => {
          console.error('Error getting location:', error);
        });
      } else {
        console.error('Geolocation is not supported by your browser.');
      }
    }
  }

  useEffect(() => {
    currentLocation();
  }, []);
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      currentWeather(latitude, longitude)
        .then((data) => setWeather(data))
        .catch((error) => console.error('Error fetching weather data:', error));
      allDayWeather(latitude, longitude)
        .then((data) => seHourlyWeather(data))
        .catch((error) => console.error('Error fetching weather data:', error));
    }
  }, [latitude, longitude]);

  return (
    <>
      <div>
        <div className="flex flex-col lg:flex-row w-full min-h-screen text-gray-700 py-7 px-4 md:p-10">
          {/* -------- Weather details -------- */}
          <div className='w-full'>
            <Currentweather weather={weather} lat={latitude} lon={longitude} currentLocation={currentLocation}/>
            {/* -------- Hourly details -------- */}
            <Hourlyweather hourlyWeather={hourlyWeather} timeZone={weather?.timezone} />
          </div>
          {/* -------- Daily weather -------- */}
          <Dailyweather dailyWeather={hourlyWeather} timeZone={weather?.timezone} />
        </div>
      </div>
    </>
  );
}
export default App;
// bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200