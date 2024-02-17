const app = require('./app')
const port = process.env.PORT
// configration
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary');
const dotenv = require('dotenv').config({ path: 'config/config.env' });

// Uncought Error Handling
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shuting down the server due to Uncought Error`)
    process.exit(1);

})

//databae connection
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secrate: process.env.CLOUDINARY_API_SECRET,
})


const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})


// Unhandled Promise Rejection

process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`)
    console.log(`Shuting down the server due to Unhandled Promise Rejection`)

    server.close(() => {
        process.exit(1);
    })
})
