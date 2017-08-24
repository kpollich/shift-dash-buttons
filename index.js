require('dotenv').config({ silent: true })

const dash_button = require('node-dash-button')

// Set MAC_ADDRESSES to a comma separated string
const macAddresses = process.env.MAC_ADDRESSES.split(',')
const dash = dash_button(macAddresses, null, null, 'all')

dash.on('detected', (id) => {
  console.log('Found Dash Button with ID:', id)
})