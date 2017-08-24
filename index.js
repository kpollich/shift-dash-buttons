require('dotenv').config({ silent: true })

const axios = require('axios')
const dashButton = require('node-dash-button')

const macAddresses = process.env.MAC_ADDRESSES.split(',')
const dash = dashButton(macAddresses, null, null, 'all')

console.log('Starting dash button script...')

dash.on('detected', (id) => {
  console.log('Dash button activated with ID:', id)

  axios.post(process.env.SLACK_ENDPOINT, {
    text: 'Kyle has signed on - hello everyone!'
  })
    .then(() => console.log('Successfully sent slack message'))
    .catch(error => console.error(error))
})