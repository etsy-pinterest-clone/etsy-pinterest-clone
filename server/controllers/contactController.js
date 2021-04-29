//import nodemailer
const nodemailer = require('nodemailer')

//import environment variables for your email
const { EMAIL, PASSWORD } = process.env

module.exports = {
  email: async (req, res) => {
    const { name, message, email, title } = req.body

    try {
      //invoke the createTransport function passing in your email information. 
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: PASSWORD
        }
      });

      //invoke the sendMail function with the info in the email
      let info = await transporter.sendMail({
        from: `'${name}' <${email}>`, //This will show up when you go into the email
        to: EMAIL,
        subject: `${title} From: ${email}`, //This will show on the subject of the email
        text: message, //for clients with plaintext support only
        html: `<div>${message}<div> 
              <img src="cid:unique@nodemailer.com"/>`,
       
      }, (err, response) => {
        if (err) {
          console.log('err', err)

        } else {
          console.log('res', response)
          res.status(200).send(info)
        }
      })
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }
}

