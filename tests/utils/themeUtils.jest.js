import * as localStorageUtils from '../../src/utils/localStorageUtils'
import * as windowUtils from '../../src/utils/windowUtils'
import * as config from '../../src/config'
import {
  validateTheme,
  getActiveTheme,
  getDefaultTheme,
  getKnownThemeByType,
  getThemeVal,
  setActiveTheme,
  initTheme,
} from '../../src/utils/themeUtils'

// eslint-disable-next-line no-console
const originalConsoleError = console.error
const mockError = jest.fn()
const PRODUCTION = 'production'

beforeEach(() => {
  mockError.mockClear()
  // eslint-disable-next-line no-console
  console.error = mockError
})

afterEach(() => {
  // eslint-disable-next-line no-console
  console.error = originalConsoleError
  delete window.$theme
})

describe('validateTheme', () => {
  test('must be an object', () => {
    const badTheme = 'stuff'
    const res = validateTheme(badTheme)
    expect(res).toEqual(false)
  })

  test('type must be a string', () => {
    const badTheme = {
      type: 1,
    }
    const res = validateTheme(badTheme)
    expect(res).toEqual(false)
  })

  test('version must be a number', () => {
    const badTheme = {
      version: '1',
    }
    const res = validateTheme(badTheme)
    expect(res).toEqual(false)
  })

  test('values must be an object', () => {
    const badTheme = {
      values: [],
    }
    const res = validateTheme(badTheme)
    expect(res).toEqual(false)
  })

  test('return true for valid theme', () => {
    const goodTheme = config.DEFAULT_THEME
    const res = validateTheme(goodTheme)
    expect(res).toEqual(true)
  })
})

describe('getActiveTheme', () => {
  test('gets root window', () => {
    const spy = jest.spyOn(windowUtils, 'getRootWindow')
    getActiveTheme()
    expect(spy).toHaveBeenCalled()
  })

  test('returns activeTheme value', () => {
    const mockActiveTheme = { key: 'val' }
    window.$theme = {
      activeTheme: mockActiveTheme,
    }
    const res = getActiveTheme()
    expect(res).toEqual(mockActiveTheme)
  })

  test('returns undefined if not set', () => {
    const res = getActiveTheme()
    expect(res).toEqual(undefined)
  })
})

describe('getDefaultTheme', () => {
  test('returns default theme', () => {
    const res = getDefaultTheme()
    expect(res).toEqual(config.DEFAULT_THEME)
  })
})

describe('getKnownThemeByType', () => {
  test('default theme', () => {
    const res = getKnownThemeByType(config.DEFAULT_THEME.type)
    expect(res).toEqual(config.DEFAULT_THEME)
  })

  test('light theme', () => {
    const res = getKnownThemeByType(config.LIGHT_THEME.type)
    expect(res).toEqual(config.LIGHT_THEME)
  })

  test('dark theme', () => {
    const res = getKnownThemeByType(config.DARK_THEME.type)
    expect(res).toEqual(config.DARK_THEME)
  })

  test('handles unknown type, shows error in console if not production', () => {
    const res1 = getKnownThemeByType('fake')
    expect(res1).toEqual(undefined)
    expect(mockError).toHaveBeenCalledWith(
      'getKnownThemeByType called with unknown type',
      'fake',
    )

    // eslint-disable-next-line no-undef
    const env = process.env.NODE_ENV
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = PRODUCTION
    mockError.mockClear()

    const res2 = getKnownThemeByType('fake')
    expect(res2).toBe(undefined)
    expect(mockError).not.toHaveBeenCalled()

    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = env
  })
})

describe('getThemeVal', () => {
  beforeEach(() => {
    window.$theme = {
      activeTheme: {
        values: {
          l1: {
            l1k1: 'l1k1v',
            l1k2: 'l1k2v',
            l2: {
              l2k1: 'l2k1v',
            },
          },
        },
      },
    }
  })

  test('string path', () => {
    const res1 = getThemeVal('l1/l1k1')
    expect(res1).toEqual('l1k1v')
    const res2 = getThemeVal('l1/l1k2')
    expect(res2).toEqual('l1k2v')
    const res3 = getThemeVal('l1/l2/l2k1')
    expect(res3).toEqual('l2k1v')
    const res4 = getThemeVal('fake')
    expect(res4).toEqual(undefined)
  })

  test('string template path', () => {
    const res1 = getThemeVal(`${'l1/l1k1'}`)
    expect(res1).toEqual('l1k1v')
    const res2 = getThemeVal(`l1/${'l1k2'}`)
    expect(res2).toEqual('l1k2v')
    const res3 = getThemeVal(`l1/${'l2'}/l2k1`)
    expect(res3).toEqual('l2k1v')
    const res4 = getThemeVal(`${'fake'}`)
    expect(res4).toEqual(undefined)
  })

  test('handles unset theme, shows error in console if not production', () => {
    delete window.$theme

    const res1 = getThemeVal('l1/l1k1')
    expect(res1).toEqual(undefined)
    expect(mockError).toHaveBeenCalledWith(
      'getThemeVal called, but no theme has been initialized',
    )

    // eslint-disable-next-line no-undef
    const env = process.env.NODE_ENV
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = PRODUCTION
    mockError.mockClear()

    const res2 = getThemeVal('l1/l1k1')
    expect(res2).toBe(undefined)
    expect(mockError).not.toHaveBeenCalled()

    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = env
  })

  test('warns if using deprecated field', () => {
    // eslint-disable-next-line no-console
    const originalConsoleWarn = console.warn
    const mockWarn = jest.fn()
    // eslint-disable-next-line no-console
    console.warn = mockWarn

    const DEPRECATED_FIELD = 'l1/l1k1'
    const UPGRADE_INSTRUCTIONS = 'Some upgrade instructions'
    config.DEPRECATED_FIELDS[DEPRECATED_FIELD] = {
      upgradeInstructions: UPGRADE_INSTRUCTIONS,
    }

    const res1 = getThemeVal('l1/l1k1')
    expect(res1).toEqual('l1k1v')
    expect(mockWarn).toHaveBeenCalledWith(
      '%c!! Deprecated Theme Value Used !!\n%cValue: "l1/l1k1"\nUpgrade Instructions: Some upgrade instructions',
      'font-weight: bold; color: orange;',
      'font-weight: normal; color: inherit;',
    )

    // eslint-disable-next-line no-console
    console.warn = originalConsoleWarn
    delete config.DEPRECATED_FIELDS[DEPRECATED_FIELD]
  })
})

describe('setActiveTheme', () => {
  beforeEach(() => {
    delete window.$theme
  })

  test('handles invalid theme, shows error in console if not production', () => {
    const badTheme = { bad: 'theme' }
    setActiveTheme(badTheme)
    expect(mockError).toHaveBeenCalledWith(
      'setActiveTheme called with invalid theme',
      badTheme,
    )

    // eslint-disable-next-line no-undef
    const env = process.env.NODE_ENV
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = PRODUCTION
    mockError.mockClear()

    setActiveTheme(badTheme)
    expect(mockError).not.toHaveBeenCalled()

    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = env
  })

  test('does not set theme if same as current theme', () => {
    const spy = jest.spyOn(localStorageUtils, 'setLocalStorageValue')
    window.$theme = {
      activeTheme: config.DEFAULT_THEME,
    }

    setActiveTheme(config.DEFAULT_THEME)
    expect(spy).not.toHaveBeenCalled()
  })

  test('sets theme on root root window', () => {
    const mockPublish = jest.fn()
    window.$theme = {
      PubSub: {
        publish: mockPublish,
      },
    }

    const spy = jest.spyOn(windowUtils, 'getRootWindow')
    setActiveTheme(config.DARK_THEME)

    expect(spy).toHaveBeenCalled()
    expect(window.$theme.activeTheme).toEqual(config.DARK_THEME)
    expect(mockPublish).toHaveBeenCalledWith(config.THEME_UPDATE_EVENT)
  })

  test('update local storage with theme type after setting', () => {
    const mockPublish = jest.fn()
    window.$theme = {
      PubSub: {
        publish: mockPublish,
      },
    }

    const spy = jest.spyOn(localStorageUtils, 'setLocalStorageValue')
    setActiveTheme(config.DARK_THEME)

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('themeType', config.DARK_THEME.type)
    expect(mockPublish).toHaveBeenCalledWith(config.THEME_UPDATE_EVENT)
  })
})

describe('initTheme', () => {
  beforeEach(() => {
    delete window.$theme
  })

  test('uses active theme if set and version equals/exceeds known theme', () => {
    const getSpy = jest.spyOn(localStorageUtils, 'getLocalStorageValue')
    const setSpy = jest.spyOn(localStorageUtils, 'getLocalStorageValue')
    window.$theme = {
      activeTheme: config.LIGHT_THEME,
    }

    initTheme()
    expect(getSpy).not.toHaveBeenCalled()
    expect(setSpy).not.toHaveBeenCalled()
    expect(window.$theme.activeTheme).toEqual(config.LIGHT_THEME)
  })

  test('uses set theme if type is unknown', () => {
    const getSpy = jest.spyOn(localStorageUtils, 'getLocalStorageValue')
    const setSpy = jest.spyOn(localStorageUtils, 'getLocalStorageValue')
    const customTheme = {
      ...config.LIGHT_THEME,
      type: 'custom',
      version: config.LIGHT_THEME.version - 1,
    }
    window.$theme = {
      activeTheme: customTheme,
    }

    initTheme()
    expect(getSpy).not.toHaveBeenCalled()
    expect(setSpy).not.toHaveBeenCalled()
    expect(window.$theme.activeTheme).toEqual(customTheme)
  })

  test('updates active theme is version in package is more recent', () => {
    const mockPublish = jest.fn()
    window.$theme = {
      PubSub: {
        publish: mockPublish,
      },
      activeTheme: {
        ...config.LIGHT_THEME,
        version: config.LIGHT_THEME.version - 1,
      },
    }

    initTheme()

    expect(window.$theme.activeTheme).toEqual(config.LIGHT_THEME)
    expect(mockPublish).toHaveBeenCalledWith(config.THEME_UPDATE_EVENT)
  })

  test('uses type stored in local storage if active theme not set and type is known', () => {
    const mockPublish = jest.fn()
    window.$theme = {
      PubSub: {
        publish: mockPublish,
      },
    }
    localStorageUtils.setLocalStorageValue('themeType', config.DARK_THEME.type)

    initTheme()

    expect(window.$theme.activeTheme).toEqual(config.DARK_THEME)
    expect(mockPublish).toHaveBeenCalledWith(config.THEME_UPDATE_EVENT)
  })

  test('uses default theme if active theme not set and type in local storage is not known', () => {
    const mockPublish = jest.fn()
    window.$theme = {
      PubSub: {
        publish: mockPublish,
      },
    }
    localStorageUtils.setLocalStorageValue('themeType', 'custom')

    initTheme()

    expect(window.$theme.activeTheme).toEqual(config.DEFAULT_THEME)
    expect(mockPublish).toHaveBeenCalledWith(config.THEME_UPDATE_EVENT)
  })
})
