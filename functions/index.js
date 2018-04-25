const firebase = require('firebase-admin')
const functions = require('firebase-functions')
const account = require('./auth/gmail.json')
const nodemailer = require('nodemailer');
const app = firebase.initializeApp(functions.config().firebase)
const firestore = app.firestore()

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: account.GMAIL_USERNAME,
    pass: account.GMAIL_PASSWORD
  }
})

exports.newEvent = functions.firestore.document('events/{eventId}').onCreate((snap, context) => {
  const hostName = snap.data().hostName
  const eventName = snap.data().name
  const hostEmail = snap.data().hostEmail
  const description = snap.data().description
  const eventLink = `www.schedule-us-689d0.firebaseapp.com/#/event/${snap.data().eventId}`

  const msg = {
    to: hostEmail,
    from: 'schedule-us <alan.yy.chen@gmail.com>',
    subject: 'schedule-us new event created!',
    text: `Hi ${hostName},

          You've just created an event on schedule-us and here are the details:

          Event Name: ${eventName}
          Description: ${description}
          Schedule link: ${eventLink}
          To share the scheduler to your friends, simply give them the schedule link.

          If you have any questions, reply to this email. 
          Best, schedule-us team.`,
    html: `<p>Hi ${hostName},</p>
            <p>You've just created an event on <a href="www.schedule-us-689d0.firebaseapp.com">schedule-us</a> and here are the details:</p>
            <ul>
              <li>Event Name: ${eventName}</li>
              <li>Description: ${description}</li>
              <li>Schedule link: <a href="${eventLink}">${eventLink}</a></li>
            </ul>
            <p>To share the scheduler to your friends, simply give them the schedule link.</p>
            <p></p>
            <p>
              If you have any questions, reply to this email.
              <br>Best, schedule-us team.
            </p>`,
  }
  return mailTransport.sendMail(msg).then(() => {
    return console.log('New event email sent to:', hostEmail);
  })
})
