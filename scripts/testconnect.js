const mongoose = require('mongoose')    
require('dotenv').config()


let dbConnection

async function main() {
    console.log('start')

    try {
        dbConnection = await mongoose.connect(process.env.MONGO_URI)
        console.log('DB Connected')
    } catch (error) {
        console.log('error connecting to db', error)
    }

    console.log('end')
    process.exit(0)
}

main()

