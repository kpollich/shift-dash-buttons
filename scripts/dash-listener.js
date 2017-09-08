require('dotenv').config({ silent: true })

const dashButton = require('node-dash-button')
const Messenger = require('../lib/util/Messenger')

const identities = JSON.parse(process.env.IDENTITIES)
const macAddresses = Object.keys(identities)

// Have to do this because the node-dash-button module does some wonky stuff with the test
// environment and changes their export pattern when tests are running
let dash
if (process.env.NODE_ENV === 'test') {
  dash = dashButton.register(macAddresses, null, null, 'all')
} else {
  dash = dashButton(macAddresses, null, null, 'all')
}

console.log('Starting dash button script...')

dash.on('detected', handleDetected)

function handleDetected(id) {
  console.log('Dash button activated with ID:', id)

  // Anything before 12PM is considered a sign on - afterwards it's a sign out
  const isSignOn = new Date().getHours() < 12
  const name = identities[id]

  const text = getMessage(name, isSignOn)
  const channel = '#kyles-bot-testing'

  Messenger.sendMessage({ text, channel })
    .then(() => console.log('Successfully sent slack message'))
    .catch(error => console.error(error))
}

function getRandomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)]
}

function getMessage(name, isSignOn) {
  const signOnMessages = [
    `${name} is in the house!`,
    `Here's ${name}!`,
    `Peek-a-boo! It's ${name}.`,
    `‘Ello gov'nor! It's ${name}.`,
    `${name} has signed on - hello everyone!`,
    `Have no fear, ${name} is here!`
  ]

  const signOffMessages = [
    `${name} says: Hasta la vista...baby :gun: :sunglasses:`,
    `${name} is peacing out :v:`,
    `It's time for ${name} to go night night :wave:`
  ]

  return isSignOn
    ? getRandomMessage(signOnMessages)
    : getRandomMessage(signOffMessages)
}
