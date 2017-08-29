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

  const text = getMessage(name, isSignOn);

  axios.post(process.env.SLACK_ENDPOINT, {
    text,
    channel: '#kyles-bot-testing',
    attachments: [
      {
        image_url: 'http://gph.is/1acXoI8'
      }
    ]
  })
    .then(() => console.log('Successfully sent slack message'))
    .catch(error => console.error(error))
})

function getMessage(name, isSignOn) {
  const signOn_messages = [
    `${name} is in the house!`,
    `Here's ${name}!`,
    `Peek-a-boo! It's ${name}.`,
    `‘Ello gov'nor! It's ${name}.`,
    `${name} has signed on - hello everyone!`,
    `Have no fear, ${name} is here!`
  ]

  const signOff_messages = [
    `${name} says: Hasta la vista...baby :gun: :sunglasses:`,
    `${name} is peacing out :v:`,
    `It's time for ${name} to go night night :wave:`
  ];

  return (isSignOn) 
    ? signOn_messages[Math.floor(Math.random() * signOn_messages.length)]
    : signOff_messages[Math.floor(Math.random() * signOff_messages.length)];
}
