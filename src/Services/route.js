const DEFULT_LOCATION = '#/weather?lat=48.8534&lon=2.3488' // Jamnagar

const currentLocation = function () {
        window.navigator.geolocation.getCurrentPosition(res=>{
            const { latitude , longitude } = res.coords;
            updateWeather(`lat=${latitude}`,`lon=${longitude}`);
        },err=>{
            window.location.hash = DEFULT_LOCATION;
        })
}

// {string} query search query..
const searchLocation = query => updateWeather(...query.split("&"));
// updateWeather('lat=48.8534','lon=2.3488')

const routes = new Map([
    ["/current-loaction", currentLocation],
    ["/weather", searchLocation]
])
const checkHash = function () {
    const requestUrl = window.location.hash.slice(1)

    const [route, query] = requestUrl.includes ? requestUrl.split("?") : [requestUrl]
    routes.get(route) ? routes.get(route, query) : null
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
    if (!window.location.hash) {
        this.window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
})