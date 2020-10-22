'use strict';

let date = new Date()
let xmlHttp = new XMLHttpRequest()
let functionArray = []

sunData()

async function getRequest(apiCall) {
    try {
        xmlHttp.open("GET", apiCall, true)
        xmlHttp.send(null)
        return xmlHttp.responseText
    } catch (e) {
        console.error(`[ERROR]: weather.js => getRequest: `, e)
        return null
    }
}

xmlHttp.onload = function () {
    const currentFunction = functionArray.pop()
    currentFunction()

}

async function getLocation() {
    await getRequest("http://ip-api.com/json/")
}

/**
 *
 * @param time (time in format : "00:00:00 MM")
 * @returns {number} (time in millisecond)
 */
function AMPMToMilli(time) {
    const   ampmArr = time.split(`:`)
    ampmArr[0] = parseInt(ampmArr[0], 10) + (ampmArr[2].slice(3, 5) === `PM`) * 12
    return (ampmArr[0] * 3600 + parseInt(ampmArr[1], 10) * 60 + parseInt(ampmArr[2].slice(0, 2), 10))
}



/**
 * Main function for getting and managing sun data
 */
async function sunData() {
    await getLocation()
    functionArray.push(getSunData)
}

/**
 * Check if location set, then get sun data, else retry it
 */
async function getSunData() {
    let     sunDataRequest = null
    const   locationResult = JSON.parse(xmlHttp.responseText)

    if (xmlHttp.status === 200 && locationResult && locationResult.status === "success") {
        sunDataRequest = `https://api.sunrise-sunset.org/json?lat=` + locationResult.lat + `&lng=` + locationResult.lon + `&date=today`
        functionArray.push(setSunTimer)
        await getRequest(sunDataRequest)
    } else {
        window.setTimeout(sunData, 5 * 60 * 1000)
    }
}

/**
 * Launch video in function of time
 * TODO add retry if failed
 */
async function setSunTimer() {
    date = new Date()
    let     sunDataResult = JSON.parse(xmlHttp.responseText)
    const   currentTime = date.getUTCHours() * 3600 + date.getUTCMinutes() * 60 + date.getUTCSeconds()
    const   sunRiseTime = (xmlHttp.status === 200 && sunDataResult && sunDataResult.status === "OK") ? AMPMToMilli(sunDataResult.results.sunrise, false) : 21600
    const   sunSetTime = (xmlHttp.status === 200 && sunDataResult && sunDataResult.status === "OK") ? AMPMToMilli(sunDataResult.results.sunset, true) : 64800

    console.log(sunDataResult)
    console.log(`currentTime`, currentTime, `, sunRiseTime`, sunRiseTime, `, sunSetTime`, sunSetTime)
    if (currentTime < sunRiseTime) {
        console.log(`launch function: sunRise, in:`, (sunRiseTime - currentTime) * 1000)
        window.setTimeout(sunRise, (sunRiseTime - currentTime) * 1000)
    } else if (currentTime < sunSetTime) {
        console.log(`launch function: sunSet, in:`, (sunSetTime - currentTime) * 1000)
        window.setTimeout(sunSet, (sunSetTime - currentTime) * 1000)
    } else {
        console.log(`launch function: sunData, in:`, (86400 - currentTime) * 1000)
        window.setTimeout(sunData, (86400 - currentTime) * 1000)
    }
}

/**
 * Get weather data for ip location
 */
async function weatherData() {
    await getLocation()
    functionArray.push(getWeatherData)
}

/**
 * After getting location, send request for weather API
 * Other API: `https://api.openweathermap.org/data/2.5/onecall?lat=` + locationResult.lat + `&lon=` + locationResult.lon + `&exclude=` + `&appid=` + {API key}
 */
async function getWeatherData() {
    let     weatherRequest = null
    const   locationResult = JSON.parse(xmlHttp.responseText)

    if (xmlHttp.status === 200 && locationResult && locationResult.status === "success") {
        weatherRequest = `http://www.7timer.info/bin/api.pl?lon=` + locationResult.lon + `&lat=` + locationResult.lat + `&product=` + `astro` + `&output=` + `json`
        functionArray.push(setWeatherData)
        await getRequest(weatherRequest)
    } else {
        window.setTimeout(weatherData, 5 * 60 * 1000)
    }
}

/**
 * Print meteo result
 */
async function setWeatherData() {
    const weatherResult = JSON.parse(await getRequest(weatherRequest))
    console.log(weatherResult)
}