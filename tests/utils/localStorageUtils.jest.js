import * as windowUtils from '../../src/utils/windowUtils'
import {
  getScopedKey,
  getLocalStorageValue,
  setLocalStorageValue,
} from '../../src/utils/localStorageUtils'

const RAW_KEY = 'setLocalStorageValue'
const SAMPLE_VALUE = 'some value'

const cleanupLocalStorage = key => window.localStorage.removeItem(key)

afterEach(() => {
  cleanupLocalStorage(RAW_KEY)
})

describe('getScopedKey', () => {
  test('returns scoped key', () => {
    const res = getScopedKey(RAW_KEY)
    expect(res).toEqual(`__O.0__::react-hoc-theme::${RAW_KEY}`)
  })
})

describe('setLocalStorageValue', () => {
  test('gets root window', () => {
    const spy = jest.spyOn(windowUtils, 'getRootWindow')
    setLocalStorageValue(RAW_KEY, SAMPLE_VALUE)
    expect(spy).toHaveBeenCalled()
  })

  test('sets key value in local storage', () => {
    setLocalStorageValue(RAW_KEY, SAMPLE_VALUE)
    const res = window.localStorage.getItem(getScopedKey(RAW_KEY))
    expect(res).toEqual(SAMPLE_VALUE)
  })
})

describe('getLocalStorageValue', () => {
  test('gets root window', () => {
    const spy = jest.spyOn(windowUtils, 'getRootWindow')
    getLocalStorageValue(RAW_KEY)
    expect(spy).toHaveBeenCalled()
  })

  test('sets key value in local storage', () => {
    window.localStorage.setItem(getScopedKey(RAW_KEY), SAMPLE_VALUE)
    const res = getLocalStorageValue(RAW_KEY)
    expect(res).toEqual(SAMPLE_VALUE)
  })
})
