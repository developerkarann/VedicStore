const express = require('express')
const router = express.Router();
const { contactUs } = require('../controllers/contactController')


router.route('/contact').post(contactUs)


module.exports = router