require('dotenv').config({ silent: true })

const axios = require('axios')
const dashButton = require('node-dash-button')

const identities = JSON.parse(process.env.IDENTITIES)
const macAddresses = Object.keys(identities)
const dash = dashButton(macAddresses, null, null, 'all')

console.log('Starting dash button script...')

dash.on('detected', id => {
  console.log('Dash button activated with ID:', id)

  // Anything before 12PM is considered a sign on - afterwards it's a sign out
  const isSignOn = new Date().getHours() < 12
  const name = identities[id]

  const text = getMessage(name, isSignOn)
  const channel = process.env.SLACK_CHANNEL || '#kyles-bot-testing'

  axios
    .post(process.env.SLACK_ENDPOINT, {
      text,
      channel
    })
    .then(() => console.log('Successfully sent slack message'))
    .catch(error => console.error(error))
})

function getRandomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)]
}

function getMessage(name, isSignOn) {
  const signOnMessages = [
    `[${name}] :coffee:`,
    `[${name}] :bacon:`,
    `[${name}] Good morning everyone :coffee:`,
    `[${name}] Buenos días`,
    `${name} is in the house!`,
    `Here's ${name}!`,
    `[${name}] Hello everyone!`,
    `Have no fear, ${name} is here!`
  ]

  const signOffMessages = [
    `[${name}] I'm out, later everyone :wave:`,
    `[${name}] Later :crocodile:`,
    `[${name}] I'm going to call it a night. :wave:`,
    `[${name}] I'm headed out, have a great night everyone :v:`,
    `${name}, out :v:`
  ]

  return isSignOn
    ? getRandomMessage(signOnMessages)
    : getRandomMessage(signOffMessages)
}
