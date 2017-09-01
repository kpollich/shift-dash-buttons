require('dotenv').config({ silent: true })

const dashListener = require('./lib/util/dash-listener')

dashListener.start()
