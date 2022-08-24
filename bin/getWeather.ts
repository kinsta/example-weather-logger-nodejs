require('dotenv').config()
import getWeatherData from '../src/getWeatherData'

async function execute() {
    const weatherData = await getWeatherData()
    console.log("Weather data retrieved from the OpenWeatherMap API:")
    console.log(weatherData)
}

execute()
