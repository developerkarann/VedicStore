const mongoose = require('mongoose')

const mongoKey = process.env.MONGOURL


const connectDatabase = () => {
    mongoose.connect(mongoKey)
        .then(() => {
            console.log(`Database configured successfully`)
        })
        .catch((err) => {
            console.log("Getting error while configuring database", err.message)
        })
}

module.exports  = connectDatabase;