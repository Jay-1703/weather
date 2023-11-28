import React, { useState } from 'react'
import { getDate, getTime } from '../../Services/Module';
import { searchByCity } from '../../Services/WeatherApi';
import { useNavigate } from 'react-router-dom';

const Currentweather = ({ weather, currentLocation }) => {
    const navigator = useNavigate();
    const [searchcity, setSearchCity] = useState('')
    const [cityname, setCityName] = useState([])
    const [loading, setLoading] = useState(false);

    const weatherByCity = async (e) => {
        const searchTerm = e.target.value;
        setSearchCity(searchTerm);

        if (searchcity?.length > 0) {
            setLoading(true)
            const res = await searchByCity(searchcity);
            setCityName(res);
            setLoading(false)
        }
    }
    const searchweather = (lat, lon) => {
        setSearchCity('');
        navigator(`/search/${lat}/${lon}`);
    }
    return (
        <>
            {/* -------- Search bar & Filters -------- */}
            <div className='flex'>
                <div className='w-full'>
                    <div className="flex items-center justify-center bg-[#272727] rounded-full w-full">
                        <input onChange={weatherByCity} id="search-bar" placeholder="Search city......" className="px-6 py-2 flex-1 outline-none bg-[#272727] rounded-full w-full  text-slate-200" />
                        {
                            loading ?
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div> : null
                        }
                    </div>
                    <div className="absolute items-center z-50 bg-[#30343b] w-52 md:w-80 rounded-xl" style={{ display: searchcity.length > 0 ? 'block' : 'none' }}>
                        {
                            cityname?.map((item,index) => (
                                <div key={index} onClick={() => { searchweather(item.lat, item.lon) }} className='flex ml-5 py-2 items-center cursor-pointer'>
                                    <div>
                                        <svg viewBox="0 0 24 24" className='text-white w-6 h-6 mr-2' fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />{" "}
                                                <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />{" "}
                                            </g>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-200">{item.name}</p>
                                        <p className=" text-slate-200">{item.state},{item.country}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* -------- Filters -------- */}
                <div className='lg:px-3 lg:w-full ml-2 md:ml-5 lg:ml-0'>
                    <button onClick={currentLocation} className="inline-flex items-center px-2 lg:px-5 py-2 lg:ml-1 text-base font-semibold text-white bg-purple-600 rounded-full cursor-pointer ">
                        <svg viewBox="0 0 24 24" className='text-white w-6 h-6 lg:mr-1' fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />{" "}
                                <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />{" "}
                            </g>
                        </svg>
                        <span className='hidden lg:block'>
                            Current Location
                        </span>
                    </button>
                </div>
            </div>
            {/* -------- Current location weather -------- */}
            <div className="mt-2 bg-[#272727] text-slate-200 px-5 py-5 lg:px-10 lg:py-8 rounded">
                <div className="flex">
                    <div className="flex flex-1 flex-col">
                        <span className="text-6xl font-bold">{weather?.main?.temp ? parseInt(weather.main.temp) : null}°C</span>
                        <span className="font-bold text-xl mt-1 text-slate-200">{weather.weather ? weather?.weather[0]?.description : null}</span>
                        {
                            weather ?
                                <div className='mt-3 lg:flex'>
                                    <div className='flex'>
                                        <svg className='text-white w-6 h-6 mr-2' fill="#ffffff" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985zm0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960v799.984zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32zm0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32zm-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32zm0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32z" />
                                            </g>
                                        </svg>
                                        <p className="font-semibold text-slate-200">{getDate(weather.dt, weather.timezone)}</p>
                                    </div>
                                    <div className='mt-3 lg:mt-0 flex lg:ml-2'>
                                        <svg viewBox="0 0 24 24" className='text-white w-6 h-6 mr-2' fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />{" "}
                                                <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />{" "}
                                            </g>
                                        </svg>
                                        <p className="font-semibold text-slate-200">{weather?.name}</p>
                                        <p className="font-semibold text-slate-200">,{weather?.sys?.country}</p>
                                    </div>
                                </div> : null
                        }
                    </div>
                    {
                        weather.weather ? <img src={`/images/${weather?.weather[0]?.icon}.png`} alt={`${weather?.weather[0]?.description}`} className='w-24 h-24' /> : null
                    }
                </div>
                {/* -------- Today highlights -------- */}
                <div className="mt-3 lg:mt-8">
                    <p className='font-bold text-lg uppercase'>Todays Highlights</p>
                    <div className='mt-2 md:flex py-4 bg-[#30343b] px-6 gap-x-10 rounded-md'>
                        {/* Sunrise & Sunset details */}
                        <div className='w-full'>
                            <div className='text-center md:text-left'>
                                <p className='font-bold text-md'>Sunrise & Sunset</p>
                            </div>
                            <div className='md:flex py-2 text-slate-200 gap-0 md:gap-x-5'>
                                <div className='w-full'>
                                    <div className="flex items-center justify-center md:justify-start gap-x-6 md:gap-x-0">
                                        <div className="h-14 w-14 font-bold">
                                            <span>
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        {" "}
                                                        <circle cx={12} cy={12} r={6} stroke="#ffffff" strokeWidth="1.5" />{" "}
                                                        <path
                                                            d="M12 2V3"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                        <path
                                                            d="M12 21V22"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                        <path
                                                            d="M22 12L21 12"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                        <path
                                                            d="M3 12L2 12"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                        <path
                                                            d="M19.0708 4.92969L18.678 5.32252"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                        <path
                                                            d="M5.32178 18.6777L4.92894 19.0706"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                        <path
                                                            d="M19.0708 19.0703L18.678 18.6775"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                        <path
                                                            d="M5.32178 5.32227L4.92894 4.92943"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                        <div className='ml-2'>
                                            <p className="font-semibold text-lg">Sunrise</p>
                                            {
                                                weather ? <p className='font-extrabold text-sm md:text-lg xl:text-2xl'>{weather?.sys ? getTime(weather.sys.sunrise, weather.timezone) : null}</p> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full mt-2 md:mt-0'>
                                    <div className="flex items-center justify-center md:justify-start gap-x-6 md:gap-x-0">
                                        <div className="h-14 w-14 font-bold">
                                            <span>
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        {" "}
                                                        <path
                                                            d="M8 22H16"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />{" "}
                                                        <path
                                                            d="M5 19H19"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />{" "}
                                                        <path
                                                            d="M2 16H22"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />{" "}
                                                        <path
                                                            d="M12 6C8.68629 6 6 8.68629 6 12C6 13.5217 6.56645 14.911 7.5 15.9687H16.5C17.4335 14.911 18 13.5217 18 12C18 8.68629 15.3137 6 12 6Z"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                        />{" "}
                                                        <path
                                                            d="M12 2V3"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                        <path
                                                            d="M22 12L21 12"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                        <path
                                                            d="M3 12L2 12"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                        <path
                                                            d="M19.0708 4.92969L18.678 5.32252"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                        <path
                                                            d="M5.32178 5.32227L4.92894 4.92943"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />{" "}
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                        <div className='ml-2'>
                                            <p className="font-semibold text-lg">Sunset</p>
                                            {
                                                weather ? <p className='font-extrabold text-sm md:text-lg xl:text-2xl'>{weather?.sys ? getTime(weather.sys.sunset, weather.timezone) : null}</p> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Forecast details */}
                        <div className='w-full mt-2 lg:mt-0'>
                            <div className='text-center md:text-left'>
                                <p className='font-bold text-md'>Forecast Details</p>
                            </div>
                            <div className='md:flex py-3 text-slate-200 gap-3 md:gap-x-5'>
                                <div className='w-full'>
                                    <div className="flex items-center justify-center md:justify-start gap-x-6 md:gap-x-0">
                                        <div className="h-14 w-14 font-bold">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                <g id="SVGRepo_iconCarrier">
                                                    {" "}
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.99993 1C5.65276 1 5.36339 1.17976 5.16152 1.45177C5.09068 1.5478 4.92673 1.77255 4.709 2.08705C4.41942 2.50534 4.03176 3.08669 3.64247 3.73551C3.25505 4.38123 2.85535 5.11139 2.54959 5.82484C2.25681 6.50802 1.99893 7.24994 2 8.00206C2.00062 8.21313 2.02582 8.42526 2.06046 8.63311C2.11824 8.97986 2.23566 9.45747 2.48051 9.94719C2.72731 10.4408 3.11323 10.9649 3.71085 11.3633C4.31472 11.7659 5.07494 12 5.99994 12C6.92494 12 7.68516 11.7659 8.28904 11.3633C8.88666 10.9649 9.2726 10.4409 9.51942 9.94722C9.76428 9.45751 9.88173 8.9799 9.93952 8.63315C9.9742 8.42505 9.99972 8.21239 10 8.00101C10.0004 7.24888 9.74323 6.50811 9.45038 5.82482C9.14461 5.11137 8.7449 4.38121 8.35746 3.7355C7.96816 3.08668 7.58048 2.50533 7.29089 2.08703C7.07315 1.77254 6.9092 1.54779 6.83835 1.45175C6.63647 1.17975 6.3471 0.999997 5.99993 1ZM7.6121 6.61268C7.35536 6.01363 7.00506 5.36879 6.64248 4.7645C6.42198 4.39701 6.20087 4.05101 5.99996 3.74751C5.79905 4.05101 5.57796 4.397 5.35747 4.76449C4.99491 5.36877 4.64462 6.01361 4.38789 6.61266L4.37335 6.64657C4.19665 7.0585 3.98776 7.54548 4.00018 8.00042C4.01216 8.36034 4.1089 8.73181 4.26939 9.05281C4.39756 9.30917 4.57412 9.53511 4.82025 9.6992C5.06012 9.85912 5.4249 10 5.99994 10C6.57498 10 6.93977 9.85912 7.17966 9.69919C7.42581 9.5351 7.60238 9.30915 7.73057 9.05278C7.89107 8.73179 7.98784 8.3603 7.99982 8.00038C8.01225 7.54551 7.80337 7.05857 7.62668 6.64668L7.6121 6.61268Z"
                                                        fill="#ffffff"
                                                    />{" "}
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M17.9999 1C17.6528 1 17.3634 1.17976 17.1615 1.45177C17.0907 1.5478 16.9267 1.77255 16.709 2.08705C16.4194 2.50534 16.0318 3.08669 15.6425 3.73551C15.2551 4.38123 14.8554 5.11139 14.5496 5.82484C14.2568 6.50802 13.9989 7.24994 14 8.00206C14.0006 8.21313 14.0258 8.42526 14.0605 8.63311C14.1182 8.97986 14.2357 9.45747 14.4805 9.94719C14.7273 10.4408 15.1132 10.9649 15.7108 11.3633C16.3147 11.7659 17.0749 12 17.9999 12C18.9249 12 19.6852 11.7659 20.289 11.3633C20.8867 10.9649 21.2726 10.4409 21.5194 9.94722C21.7643 9.45751 21.8817 8.9799 21.9395 8.63315C21.9742 8.42505 21.9997 8.21239 22 8.00101C22.0004 7.24888 21.7432 6.50811 21.4504 5.82482C21.1446 5.11137 20.7449 4.38121 20.3575 3.7355C19.9682 3.08668 19.5805 2.50533 19.2909 2.08703C19.0732 1.77254 18.9092 1.54779 18.8384 1.45175C18.6365 1.17975 18.3471 0.999997 17.9999 1ZM19.6121 6.61268C19.3554 6.01363 19.0051 5.36879 18.6425 4.7645C18.422 4.39701 18.2009 4.05101 18 3.74751C17.7991 4.05101 17.578 4.397 17.3575 4.76449C16.9949 5.36877 16.6446 6.01361 16.3879 6.61266L16.3734 6.64656C16.1967 7.0585 15.9878 7.54548 16.0002 8.00042C16.0122 8.36034 16.1089 8.73181 16.2694 9.05281C16.3976 9.30917 16.5741 9.53511 16.8203 9.6992C17.0601 9.85912 17.4249 10 17.9999 10C18.575 10 18.9398 9.85912 19.1797 9.69919C19.4258 9.5351 19.6024 9.30915 19.7306 9.05278C19.8911 8.73179 19.9878 8.3603 19.9998 8.00038C20.0123 7.54552 19.8034 7.05858 19.6267 6.6467L19.6121 6.61268Z"
                                                        fill="#ffffff"
                                                    />{" "}
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M11.1615 12.4518C11.3634 12.1798 11.6528 12 11.9999 12C12.3471 12 12.6365 12.1797 12.8384 12.4518C12.9092 12.5478 13.0732 12.7725 13.2909 13.087C13.5805 13.5053 13.9682 14.0867 14.3575 14.7355C14.7449 15.3812 15.1446 16.1114 15.4504 16.8248C15.7432 17.5081 16.0004 18.2489 16 19.001C15.9997 19.2124 15.9742 19.4251 15.9395 19.6332C15.8817 19.9799 15.7643 20.4575 15.5194 20.9472C15.2726 21.4409 14.8867 21.9649 14.289 22.3633C13.6852 22.7659 12.9249 23 11.9999 23C11.0749 23 10.3147 22.7659 9.71085 22.3633C9.11323 21.9649 8.72731 21.4408 8.48051 20.9472C8.23566 20.4575 8.11824 19.9799 8.06046 19.6331C8.02582 19.4253 8.00062 19.2131 8 19.0021C7.99893 18.2499 8.25681 17.508 8.54959 16.8248C8.85535 16.1114 9.25505 15.3812 9.64247 14.7355C10.0318 14.0867 10.4194 13.5053 10.709 13.087C10.9267 12.7726 11.0907 12.5478 11.1615 12.4518ZM12.6425 15.7645C13.0051 16.3688 13.3554 17.0136 13.6121 17.6127C13.6169 17.624 13.6218 17.6353 13.6267 17.6467C13.8034 18.0586 14.0123 18.5455 13.9998 19.0004C13.9878 19.3603 13.8911 19.7318 13.7306 20.0528C13.6024 20.3091 13.4258 20.5351 13.1797 20.6992C12.9398 20.8591 12.575 21 11.9999 21C11.4249 21 11.0601 20.8591 10.8203 20.6992C10.5741 20.5351 10.3976 20.3092 10.2694 20.0528C10.1089 19.7318 10.0122 19.3603 10.0002 19.0004C9.98776 18.5455 10.1967 18.0585 10.3734 17.6466C10.3782 17.6352 10.3831 17.6239 10.3879 17.6127C10.6446 17.0136 10.9949 16.3688 11.3575 15.7645C11.578 15.397 11.7991 15.051 12 14.7475C12.2009 15.051 12.422 15.397 12.6425 15.7645Z"
                                                        fill="#ffffff"
                                                    />{" "}
                                                </g>
                                            </svg>
                                        </div>
                                        <div className='ml-2'>
                                            <p className="font-semibold text-lg">Humidity</p>
                                            {
                                                weather ? <p className='font-extrabold text-sm md:text-lg xl:text-2xl'>{weather?.main ? weather?.main?.humidity : null}%</p> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full mt-2 md:mt-0'>
                                    <div className="flex items-cente justify-center md:justify-start gap-x-6 md:gap-x-0">
                                        <div className="h-14 w-14 font-bold">
                                            <span>
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        {" "}
                                                        <path
                                                            d="M8 12H14M16.5 4C17.8807 4 19 5.11929 19 6.5C19 7.88071 17.8807 9 16.5 9H14M5 9H10M17 19C18.1046 19 19 18.1046 19 17C19 15.8954 18.1046 15 17 15H11M4 15H7"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />{" "}
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                        <div className='ml-2'>
                                            <p className="font-semibold text-lg">Pressure</p>
                                            {
                                                weather ? <p className='font-extrabold text-sm md:text-lg xl:text-2xl'>{weather?.main ? weather?.main?.pressure : null}hpa</p> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Currentweather