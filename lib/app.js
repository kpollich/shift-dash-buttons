require('dotenv').config({ silent: true })

const express = require('express')

const app = express()

// API Routes
// * POST /registrations - Register a device for a given user
// * POST /sign-ons - Send a sign on message
// * POST /sign-offs - Send a sign off message

app.get('/', (request, response) => {
  response.send('Hello world')
})

module.exports = app
