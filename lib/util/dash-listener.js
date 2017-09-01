const dashButton = require('node-dash-button')
const messenger = require('./messenger')

const identities = JSON.parse(process.env.IDENTITIES)
const macAddresses = Object.keys(identities)
const dash = dashButton(macAddresses, null, null, 'all')

class DashListener {
  static start() {
    console.log('Starting dash button script...')

    dash.on('detected', id => {
      console.log('Dash button activated with ID:', id)

      // Anything before 12PM is considered a sign on - afterwards it's a sign out
      const isSignOn = new Date().getHours() < 12
      const name = identities[id]

      const text = getMessage(name, isSignOn)
      const channel = '#kyles-bot-testing'

      messenger
        .sendMessage({ text, channel })
        .then(() => console.log('Successfully sent slack message'))
        .catch(error => console.error(error))
    })
  }
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

module.exports = DashListener
