require('dotenv').config()
import db from '../src/db'
import {dbType} from '../src/config'
async function execute() {
    const weatherData = await db.listWeatherData()
    if(dbType === 'redis') {
        console.log(`Most recent measurement from the ${dbType} database:`)
    } else {
        console.log(`Most recent 100 measurements from the ${dbType} database:`)
    }
    console.log(weatherData)
    process.exit()
}

execute()
