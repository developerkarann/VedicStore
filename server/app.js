const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config({ path: 'config/config.env' });
const port = process.env.PORT
// Routes Imports
const product = require('./routes/productRoute')
const errorMiddleware = require('./middleware/error')

const app = express();


app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
   res.send("<h1>Hello Wolrd<h1/>")
})


app.use('/api/v1', product)

// Error Handling \ Middleware
app.use(errorMiddleware)

module.exports = app