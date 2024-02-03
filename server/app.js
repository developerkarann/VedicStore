const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config({ path: 'config/config.env' });
const port = process.env.PORT
const errorMiddleware = require('./middleware/error')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


// Routes Imports
const product = require('./routes/productRoute')
const user = require('./routes/userRoutes')
const order = require('./routes/orderRoute')
const payment = require('./routes/paymentRoute')
const contact = require('./routes/contactRoute')

const app = express();


app.use(express.json())
app.use(cors({
   origin: true,
   credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())


app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)
app.use('/api/v1', payment)
app.use('/api/v1', contact)


// Error Handling \ Middleware
app.use(errorMiddleware)

module.exports = app