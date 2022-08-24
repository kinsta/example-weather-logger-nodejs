import { createClient } from 'redis';

const connect = async () => {
    const client = createClient({
        socket: {
            port: parseInt(process.env.DB_PORT),
            host: process.env.DB_HOST,
        },
        password: process.env.DB_PASSWORD
    })
    await client.connect()
    return client
}


export default {
    connection: connect,
    type: 'redis'
}