const axios = require('axios')

class Messenger {
  static sendMessage({ text, channel }) {
    return axios.post(process.env.SLACK_ENDPOINT, { text, channel })
  }
}

module.exports = Messenger
