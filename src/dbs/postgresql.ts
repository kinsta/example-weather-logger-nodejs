import knex from 'knex'

const connection = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    searchPath: ['knex', 'public'],
}

export default {
    connection: knex(connection),
    type: 'knex',
}
