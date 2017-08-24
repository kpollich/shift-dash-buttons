require('dotenv').config({ silent: true })

const axios = require('axios')
const dashButton = require('node-dash-button')

const identities = JSON.parse(process.env.IDENTITIES)
const macAddresses = Object.keys(identities)
const dash = dashButton(macAddresses, null, null, 'all')

console.log('Starting dash button script...')

dash.on('detected', (id) => {
  console.log('Dash button activated with ID:', id)

  axios.post(process.env.SLACK_ENDPOINT, {
    text: getMessage(identities[id]),
    channel: '#kyles-bot-testing'
  })
    .then(() => console.log('Successfully sent slack message'))
    .catch(error => console.error(error))
})

function getMessage(name) {
  var messasges = [
    `${name} is in the house!`,
    `Here's ${name}!`,
    `Peek-a-boo! It's ${name}.`,
    `‘Ello gov'nor! It's ${name}.`,
    `${name} has signed on - hello everyone!`,
    `Have no fear, ${name} is here!`
  ];

  return messasges[Math.floor(Math.random() * messasges.length)];
}