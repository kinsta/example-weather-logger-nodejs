require('dotenv').config()
import { CronJob } from 'cron'
import getWeatherData from '../src/getWeatherData'
import db from '../src/db'
import { frequency, dbType } from '../src/config'

var job = new CronJob(`*/${frequency} * * * *`, async () => {
  const weatherData = await getWeatherData()
  await db.insertWeatherData(weatherData)

  console.log("Weather data retrieved from the OpenWeatherMap API:")
  console.log(weatherData)
  console.log(`Weather data logged to ${dbType} database`)

}, null, true, 'America/Los_Angeles');

console.log('Starting weather logging')
job.start();
