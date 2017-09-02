require('dotenv').config({ silent: true })

const axios = require('axios')
const Messenger = require('../../../lib/util/messenger')
const sinon = require('sinon')

let post

beforeAll(() => {
  post = sinon.stub(axios, 'post')
  post
    .withArgs(process.env.SLACK_ENDPOINT, {
      text: undefined,
      channel: 'test'
    })
    .returns(Promise.reject('Boo'))

  post
    .withArgs(process.env.SLACK_ENDPOINT, {
      text: 'test',
      channel: undefined
    })
    .returns(Promise.reject('Ahh'))

  post
    .withArgs(process.env.SLACK_ENDPOINT, {
      text: 'test',
      channel: 'test'
    })
    .returns(Promise.resolve('Hooray'))
})

afterAll(() => {
  post.restore()
})

describe('Messenger', () => {
  describe('#sendMessage', () => {
    test('rejects when text is not defined', () => {
      return expect(Messenger.sendMessage({ channel: 'test' })).rejects.toBe(
        'Boo'
      )
    })

    test('rejects when channel is not defined', () => {
      return expect(Messenger.sendMessage({ text: 'test' })).rejects.toBe('Ahh')
    })

    test('resolves with valid arguments', () => {
      return expect(
        Messenger.sendMessage({ text: 'test', channel: 'test' })
      ).resolves.toBe('Hooray')
    })
  })
})
