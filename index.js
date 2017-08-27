require('dotenv').config({ silent: true })

const axios = require('axios')
const dashButton = require('node-dash-button')

const identities = JSON.parse(process.env.IDENTITIES)
const macAddresses = Object.keys(identities)
const dash = dashButton(macAddresses, null, null, 'all')

console.log('Starting dash button script...')

dash.on('detected', (id) => {
  console.log('Dash button activated with ID:', id)

  // Anything before 12PM is considered a sign on - afterwards it's a sign out
  const isSignOn = new Date().getHours() < 12
  const name = identities[id]

  const text = isSignOn ? getMessage(name) : `${name} is heading out. Seeya later!`

  axios.post(process.env.SLACK_ENDPOINT, {
    text,
    channel: '#kyles-bot-testing'
  })
    .then(() => console.log('Successfully sent slack message'))
    .catch(error => console.error(error))
})

function getMessage (name) {
  const messages = [
    `${name} is in the house!`,
    `Here's ${name}!`,
    `Peek-a-boo! It's ${name}.`,
    `‘Ello gov'nor! It's ${name}.`,
    `${name} has signed on - hello everyone!`,
    `Have no fear, ${name} is here!`
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}
