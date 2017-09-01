require('dotenv').config({ silent: true })

const axios = require('axios')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const Messenger = require('../../../lib/util/messenger')
const sinon = require('sinon')

chai.use(chaiAsPromised)
chai.should()

describe('Messenger', function() {
  describe('#sendMessage', function() {
    before(function() {
      this.post = sinon.stub(axios, 'post')
      this.post
        .withArgs(process.env.SLACK_ENDPOINT, {
          text: undefined,
          channel: 'test'
        })
        .returns(Promise.reject('Boo'))

      this.post
        .withArgs(process.env.SLACK_ENDPOINT, {
          text: 'test',
          channel: undefined
        })
        .returns(Promise.reject('Ahh'))

      this.post
        .withArgs(process.env.SLACK_ENDPOINT, {
          text: 'test',
          channel: 'test'
        })
        .returns(Promise.resolve('Hooray'))
    })

    after(function() {
      this.post.restore()
    })

    it('rejects when text is not defined', function() {
      return Messenger.sendMessage({
        channel: 'test'
      }).should.be.rejectedWith('Boo')
    })

    it('rejects when channel is not defined', function() {
      return Messenger.sendMessage({
        text: 'test'
      }).should.be.rejectedWith('Ahh')
    })

    it('resolves with valid arguments', function() {
      return Messenger.sendMessage({
        text: 'test',
        channel: 'test'
      }).should.eventually.become('Hooray')
    })
  })
})
