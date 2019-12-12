import React from 'react'
import TestRenderer from 'react-test-renderer'
import { useTheme } from './useTheme'
import * as utils from './utils'
import * as windowUtils from './utils/windowUtils'
import * as pubsubUtils from './utils/pubsubUtils'
import * as themeUtils from './utils/themeUtils'

function SampleComp(props) {
  return <span {...props}>Sample Component</span>
}

beforeEach(() => delete window.$theme)

describe('useTheme', () => {
  test('injects $theme prop to wrapped component', () => {
    const WrappedComponent = useTheme(SampleComp)
    const testRenderer = TestRenderer.create(<WrappedComponent />)
    const testInstance = testRenderer.root
    expect(testInstance.findByType(SampleComp).props.$theme).toBe(
      utils.getThemeVal,
    )
  })

  test('initializes root window, pubsub, and theme', () => {
    const initRootWindowSpy = jest.spyOn(windowUtils, 'initRootWindow')
    const initPubSubSpy = jest.spyOn(pubsubUtils, 'initPubSub')
    const initThemeSpy = jest.spyOn(themeUtils, 'initTheme')

    const WrappedComponent = useTheme(SampleComp)
    TestRenderer.create(<WrappedComponent />)

    expect(initRootWindowSpy).toHaveBeenCalled()
    expect(initPubSubSpy).toHaveBeenCalled()
    expect(initThemeSpy).toHaveBeenCalled()
  })

  test('subscribes to theme update event on mount', () => {
    const originalGetPubSub = pubsubUtils.getPubSub
    const mockSubscribe = jest.fn()
    const mockGetPubSub = jest.fn(() => ({
      publish: jest.fn(),
      subscribe: mockSubscribe,
    }))
    // eslint-disable-next-line import/namespace
    pubsubUtils.getPubSub = mockGetPubSub

    const WrappedComponent = useTheme(SampleComp)
    TestRenderer.create(<WrappedComponent />)

    expect(mockSubscribe).toHaveBeenCalled()

    // eslint-disable-next-line import/namespace
    pubsubUtils.getPubSub = originalGetPubSub
  })

  // unsubscribes on unmount
  test('unsubscribes to theme update event on unmount', () => {
    const originalGetPubSub = pubsubUtils.getPubSub
    const UNSUB_TOKEN = 'fake_token'
    const mockSubscribe = jest.fn(() => UNSUB_TOKEN)
    const mockUnsubscribe = jest.fn()
    const mockGetPubSub = jest.fn(() => ({
      publish: jest.fn(),
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
    }))
    // eslint-disable-next-line import/namespace
    pubsubUtils.getPubSub = mockGetPubSub

    const WrappedComponent = useTheme(SampleComp)
    const testRenderer = TestRenderer.create(<WrappedComponent />)
    testRenderer.unmount()

    expect(mockUnsubscribe).toHaveBeenCalledWith(UNSUB_TOKEN)

    // eslint-disable-next-line import/namespace
    pubsubUtils.getPubSub = originalGetPubSub
  })
})
