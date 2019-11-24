import { isHexColor, expandHexColor, hexToRgb, isDark } from './colorUtils'

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
})

describe('isHexColor', () => {
  test('null/undefined', () => {
    const res = isHexColor(undefined)
    expect(res).toBe(false)
  })

  test('invalid string', () => {
    const res = isHexColor(666)
    expect(res).toBe(false)
  })

  test('missing #', () => {
    const res = isHexColor('fff')
    expect(res).toBe(false)
  })

  test('invalid letters', () => {
    const res = isHexColor('#z9f')
    expect(res).toBe(false)
  })

  test('3 char hex', () => {
    const res = isHexColor('#fff')
    expect(res).toBe(true)
  })

  test('6 char hex', () => {
    const res = isHexColor('#ffffff')
    expect(res).toBe(true)
  })
})

describe('expandHexColor', () => {
  test('handles non-hex colors, shows error in console if not production', () => {
    const res1 = expandHexColor('fake')
    expect(res1).toBe(false)
    expect(mockError).toHaveBeenCalledWith(
      'expandHexColor called with non-hex value',
      'fake',
    )

    // eslint-disable-next-line no-undef
    const env = process.env.NODE_ENV
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = PRODUCTION
    mockError.mockClear()

    const res2 = expandHexColor('fake')
    expect(res2).toBe(false)
    expect(mockError).not.toHaveBeenCalled()

    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = env
  })

  test('3 digit hex', () => {
    const res = expandHexColor('#abc')
    expect(res).toEqual('#aabbcc')
  })

  test('6 digit hex', () => {
    const res = expandHexColor('#abcdef')
    expect(res).toEqual('#abcdef')
  })
})

describe('hexToRgb', () => {
  test('handles non-hex colors, shows error in console if not production', () => {
    const res1 = hexToRgb('fake')
    expect(res1).toBe(undefined)
    expect(mockError).toHaveBeenCalledWith(
      'hexToRgb called with non-hex value',
      'fake',
    )

    // eslint-disable-next-line no-undef
    const env = process.env.NODE_ENV
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = PRODUCTION
    mockError.mockClear()

    const res2 = hexToRgb('fake')
    expect(res2).toBe(undefined)
    expect(mockError).not.toHaveBeenCalled()

    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = env
  })

  test('3 digit hex', () => {
    const res = hexToRgb('#fff')
    expect(res).toEqual([255, 255, 255])
  })

  test('6 digit hex', () => {
    const res = hexToRgb('#000000')
    expect(res).toEqual([0, 0, 0])
  })

  test('random hex value', () => {
    const res = hexToRgb('#9400D3')
    expect(res).toEqual([148, 0, 211])
  })
})

describe('isDark', () => {
  test('handles non-hex colors, shows error in console if not production', () => {
    const res1 = isDark('fake')
    expect(res1).toBe(false)
    expect(mockError).toHaveBeenCalledWith(
      'isDark called with non-hex value',
      'fake',
    )

    // eslint-disable-next-line no-undef
    const env = process.env.NODE_ENV
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = PRODUCTION
    mockError.mockClear()

    const res2 = isDark('fake')
    expect(res2).toBe(false)
    expect(mockError).not.toHaveBeenCalled()

    // eslint-disable-next-line no-undef
    process.env.NODE_ENV = env
  })

  test('recognize light', () => {
    const lightColors = [
      '#FFFFFF',
      '#00FFFF',
      '#D2B48C',
      '#00FF00',
      '#FFFF00',
      '#FFB90F',
    ]

    lightColors.forEach(c => {
      const res = isDark(c)
      expect(res).toBe(false)
    })
  })

  test('recognize dark', () => {
    const darkColors = [
      '#000000',
      '#696969',
      '#708090',
      '#9400D3',
      '#A020F0',
      '#836FFF',
      '#0000FF',
      '#36648B',
      '#006400',
      '#2E8B57',
      '#8B814C',
      '#8B4513',
      '#CD5C5C',
    ]

    darkColors.forEach(c => {
      const res = isDark(c)
      expect(res).toBe(true)
    })
  })
})
