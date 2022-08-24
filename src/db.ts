import dbs from './dbs'
import { dbType } from './config'

const db = dbs[dbType]
const dbTableName = 'weatherdata'

const dbFunctions = {
  knex: {
    insertWeatherData: async weatherData => db.connection(dbTableName).insert(weatherData),
    listWeatherData: async () => db.connection(dbTableName).select(['time', 'temp', 'wind']).orderBy('time', 'desc').limit(100),
    setup: async () => {
      if(!await db.connection.schema.hasTable(dbTableName)) {
        await db.connection.schema.createTable(dbTableName, (table) => {
          table.increments('id').primary();
          table.string('time', 22);
          table.float('temp');
          table.float('wind')
        });
      }
    }
  },
  redis: {
    insertWeatherData: async weatherData => {
      const redis = await db.connection()
      return redis.set(dbTableName, JSON.stringify(weatherData))
    },
    listWeatherData: async () => {
      const redis = await db.connection()
      return redis.get(dbTableName).then(result => JSON.parse(result))
    }
  }
}

export default dbFunctions[db.type]