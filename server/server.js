const app = require('./app')
const port = process.env.PORT
// configration
const connectDatabase = require('./config/database')

// Uncought Error Handling
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shuting down the server due to Uncought Error`)
    process.exit(1);

})


//databae connection
connectDatabase()


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
