import React from 'react'
import { getDate } from '../../Services/Module';

const Dailyweather = ({ dailyWeather, timeZone }) => {
    const weather = []

    const len = dailyWeather?.list?.length;
    for (let index = 7; index < len; index += 8) {
        weather.push(dailyWeather.list[index]);
    }
    return (
        <div className='flex flex-col lg:flex-row items-center justify-center mt-5 lg:mt-0 lg:w-7/12'>
            <div className="flex flex-col space-y-3 h-full w-full bg-[#272727] text-slate-200 px-5 py-5 md:px-10 md:py-8 md:ml-5 rounded-xl ring-4 md:ring-8 ring-white ring-opacity-40">
                <div>
                    <p className='font-bold text-lg uppercase'>5 Days Forecast</p>
                </div>
                <div>
                    <div>
                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <tbody>
                                                {
                                                    weather.map((items, index) => (
                                                        <tr key={index}>
                                                            <td className="md:px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{getDate(items.dt, timeZone).split(" ")[1]}</td>
                                                            <td className="md:px-1 py-4 whitespace-nowrap text-sm text-gray-200">{getDate(items.dt, timeZone).split(" ")[0]}</td>
                                                            <td className="md:px-1 py-4 whitespace-nowrap text-sm font-extrabold text-gray-200">{parseInt(items.main.temp)}°C</td>
                                                            <td className="md:px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                                                                {
                                                                    weather ? <img src={`/images/${items?.weather[0]?.icon}.png`} alt={`${items?.weather[0]?.description}`} className='w-10 h-10' /> : null
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='flex flex-col items-center'>
                            <p className="font-semibold text-md lg:text-xl">Fri</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <svg
                                className="h-8 w-8 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                height={24}
                                viewBox="0 0 24 24"
                                width={24}
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
                            </svg>
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className="font-semibold text-lg text-right">18°C</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dailyweather
