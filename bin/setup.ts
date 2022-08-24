require('dotenv').config()
import db from '../src/db'

async function execute() {
    if("setup" in db) {
        await db.setup()
        process.exit()
    }
}

execute()
