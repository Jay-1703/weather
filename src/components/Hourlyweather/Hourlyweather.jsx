import React from 'react'
import { getHours } from '../../Services/Module';

const Hourlyweather = ({ hourlyWeather, timeZone }) => {
    return (
        <div className='mt-5 bg-[#272727] text-slate-200 px-5 py-5 lg:px-10 lg:py-8 rounded'>
            <div>
                <p className='font-bold text-lg uppercase'>Today at</p>
            </div>
            <div className="flex w-full gap-x-5 overflow-x-auto scroll-bar mt-3 md:mt-0">
                {
                    hourlyWeather?.list?.slice(0, 6).map((item, index) => (
                        <div key={index} className="flex flex-col items-center px-10 lg:px-6 py-1 bg-[#30343b] text-white rounded-md">
                            <span className="font-semibold mt-1 text-sm">{getHours(item.dt, hourlyWeather.city.timezone)}</span>
                            {
                                item.weather ? <img src={`/images/${item?.weather[0]?.icon}.png`} alt={`${item?.weather[0]?.description}`} className='w-24 h-20' /> : null
                            }
                            <span className="font-semibold text-lg">{parseInt(item.main.temp)}°C</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Hourlyweather