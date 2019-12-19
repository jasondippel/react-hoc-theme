import {
  isAtRootWindow,
  getRootWindow,
  initRootWindow,
} from '../../src/utils/windowUtils'

const L1 = {} // RootWindow
const L2 = {}
const L3 = {}

L3.parent = L2
L2.parent = L1
L1.parent = L1

describe('isAtRootWindow', () => {
  test('returns true when at root window', () => {
    const res = isAtRootWindow(L1)
    expect(res).toEqual(true)
  })

  test('returns false when not at root window', () => {
    const res = isAtRootWindow(L2)
    expect(res).toEqual(false)
  })
})

describe('getRootWindow', () => {
  test('returns root window when passed root window', () => {
    const res = getRootWindow(L1)
    expect(res).toEqual(L1)
  })

  test('returns root window when passed child window', () => {
    const res = getRootWindow(L2)
    expect(res).toEqual(L1)
  })

  test('returns root window when passed grandchild window', () => {
    const res = getRootWindow(L3)
    expect(res).toEqual(L1)
  })

  test('returns root window when not passed initial window', () => {
    const res = getRootWindow()
    expect(res).toEqual(window)
  })
})

describe('initRootWindow', () => {
  afterEach(() => {
    delete window.$theme
  })

  test('creates $theme obj on root window', () => {
    initRootWindow()
    expect(window.$theme).toBeDefined()
  })

  test('uses $theme if already defined on widow', () => {
    const dummyTheme = { dummy: 'value' }
    window.$theme = dummyTheme
    initRootWindow()
    expect(window.$theme).toEqual(dummyTheme)
  })
})
