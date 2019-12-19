import * as windowUtils from '../../src/utils/windowUtils'
import { initPubSub, getPubSub } from '../../src/utils/pubsubUtils'

afterEach(() => {
  delete window.$theme
})

describe('initPubSub', () => {
  test('gets root window', () => {
    const spy = jest.spyOn(windowUtils, 'getRootWindow')
    initPubSub()
    expect(spy).toHaveBeenCalled()
  })

  test('sets value if not already set', () => {
    const mockPubSub = jest.fn()
    initPubSub(mockPubSub)
    expect(window.$theme.PubSub).toEqual(mockPubSub)
  })

  test('uses existing value if defined', () => {
    const mockPubSub = jest.fn()
    const duplicatePubSub = jest.fn()
    window.$theme = {
      PubSub: mockPubSub,
    }
    initPubSub(duplicatePubSub)
    expect(window.$theme.PubSub).toEqual(mockPubSub)
    expect(window.$theme.PubSub).not.toEqual(duplicatePubSub)
  })
})

describe('getPubSub', () => {
  test('gets root window', () => {
    const spy = jest.spyOn(windowUtils, 'getRootWindow')
    getPubSub()
    expect(spy).toHaveBeenCalled()
  })

  test('returns pubsub value', () => {
    const mockPubSub = jest.fn()
    window.$theme = {
      PubSub: mockPubSub,
    }
    const res = getPubSub()
    expect(res).toEqual(mockPubSub)
  })
})
