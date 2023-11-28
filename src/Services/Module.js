export const weekDayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thruesday",
    "Friday",
    "Saturday"
];
export const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Des"
];

/** 
    @param {number} dataUnix unix date in seconds
    @param {number} timezone timezone shift from UTC in seconds
    @param return date string formate: "Sunday 10, Mar"
 * */

export const getDate = function (dataUnix, timezone) {
    const date = new Date((dataUnix + timezone) * 1000)
    const week = weekDayName[date.getUTCDay()];
    const month = monthName[date.getUTCMonth()];
    return `${week} ${date.getUTCDate()},${month}`
}
/**
 * 
 * @param {number} timeUnix unix date in seconds
 * @param {number} timezone timezone shift from UTC in seconds
 * @returns  Time string formate: "HH:MM AM/PM"
 */

export const getTime = function (timeUnix, timezone) {
    const date = new Date((timeUnix + timezone) * 1000)
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours > 12 ? "PM" : "AM";
    return `${hours % 12 || 12}:${minutes} ${period}`
}
/**
 * 
 * @param {number} timeUnix unix date in seconds
 * @param {number} timezone timezone shift from UTC in seconds
 * @returns Time string formate: "HH AM/PM"
 */

export const getHours = function (timeUnix, timezone) {
    const date = new Date((timeUnix + timezone) * 1000)
    const hours = date.getUTCHours();
    const period = hours > 12 ? "PM" : "AM";
    return `${hours % 12 || 12} ${period}`
}

/**
 * 
 * @param {number} mps metter per seconds
 * @param {number} kmp kilometter per seconds
 */

export const mps_to_kmp = mps => {
    const mph = mps * 3600;
    return mph / 1000;
}