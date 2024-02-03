const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncError = require('../middleware/CatchAsyncError');
const nodemailer = require('nodemailer');
const Contact = require('../models/contactModel')

// Register a user

exports.contactUs = CatchAsyncError(async (req, res, next) => {


    const { name, email, subject, description } = req.body
    if (!name || !email || !subject || !description) {
        return next(new ErrorHandler("Please fill all the details", 400))

    }

    const data = await new Contact({
        name,
        email,
        subject,
        description
    })
    await data.save()


    // send email functionality >>>

    // Connect with SMTP Server
    const transporterForUser = nodemailer.createTransport({ // For User
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    const transporterToMe = nodemailer.createTransport({// For Us
        service: 'gmail',
        auth: {
            user: process.env.MYEMAIL,
            pass: process.env.MYPASS
        }
    });


    // Send Mail and body

    // Options for getting user info/message by email
    const MyOptions = {         // For Us
        from: "karandeveloper03040@gmail.com",
        to: "karanpal03040@gmail.com",
        subject: `${name} send a message regarding Vedic Store`,
        html: `<h3>Name: ${name}</3><br><h3>Email: ${email}</3><br><h3>Subject:  ${subject}</3><br><h3> Message:</3> <br><br> <p>${description}</p>`
    }
    // Options for sending mail to the user
    const UserOptions = {         //For USer
        from: "karanpal03040@gmail.com",
        to: email,
        subject: 'Thanks for your concern - Vedic Store',
        html: `
      <p>
      Dear ${name}, <br><br>
      Thank you for reaching out to us!. we have received your message and would like to acknowledge your inquiry. 
      We appreciate your interest in our services and we committed to providing you with a prompt and satisfactory response.<br>

      We will make every effort to address your concerns, or requests in a timely manner. 
      and we aim to respond to all inquiries within 24 hours.<br>

      We value your time and look forward to assisting you further. 
      If you have any urgent matters or require immediate assistance, please don't hesitate to contact us at 8869012507<br><br>

      Best regards,<br><br>

      Karan Pal<br>
      Founder Of Vedic Store<br>
      karanpal03040@gmail.com<br>
      +91886912507<br>
      </p>
      `
    }

    await new Promise((resolve, reject) => {
        transporterForUser.sendMail(UserOptions, (error, info) => {   // For User
            if (error) {
                console.log('Error', error.message)
                reject(err);
            } else {
                // console.log('Email Sent Successfully To The User', info.response)
                resolve(info);
            }
        })
    })

    await new Promise((resolve, reject) => {
        transporterToMe.sendMail(MyOptions, (error, info) => {     // For Us 
            if (error) {
                console.log('Error', error.message)
                reject(err);
            } else {
                // console.log('Email Sent Successfully To Me', info.response)
                resolve(info);
            }
        })
    })



    return res.status(200).json({ success: true, message: 'Thanks for your concern ❤' })

})
