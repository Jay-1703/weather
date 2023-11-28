import axios from "axios"

const API_KEY = "&appid=c37fe91fd795b1ffb1be4007e41a6754"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export const currentWeather = async (lan,lon) => {
    const { data } = await axios.get(`${BASE_URL}/weather?lat=${lan}&lon=${lon}${API_KEY}&units=metric`);
    return data;
} 
export const allDayWeather = async (lan,lon) => {
    const { data } = await axios.get(`${BASE_URL}/forecast?lat=${lan}&lon=${lon}${API_KEY}&units=metric`);
    return data;
}
export const searchByCity = async (city) => {
    const { data } = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=8c614309d32c3f6030ae3e3a9cea1200`);
    return data;
} 
// https://api.openweathermap.org/data/2.5/forecast?lat=22.4721681&lon=70.0464879&appid=8c614309d32c3f6030ae3e3a9cea1200&units=metric
// https://api.openweathermap.org/data/2.5/air_pollution?lat=22.4721681&lon=70.0464879&appid=8c614309d32c3f6030ae3e3a9cea1200&units=metric
// https://api.openweathermap.org/geo/1.0/direct?q=jamnagar&limit=5&appid=8c614309d32c3f6030ae3e3a9cea1200