import knex from 'knex'

const connection = {
    client: 'mysql2',
    connection: {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    },
    pool: { min: 2, max: 10 }
}

export default {
    connection: knex(connection),
    type: 'knex'
}



