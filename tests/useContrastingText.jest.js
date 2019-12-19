import { useContrastingText } from '../src/useContrastingText'
import * as themeUtils from '../src/utils/themeUtils'

const TEXT = 'colors/text'
const TEXT_INVERSE = 'colors/textInverse'
const LIGHT = '#fff'
const DARK = '#000'
const originalGetThemeVal = themeUtils.getThemeVal

describe('useContrastingText', () => {
  afterEach(() => {
    // eslint-disable-next-line import/namespace
    themeUtils.getThemeVal = originalGetThemeVal
  })

  test('light text, dark textInverse, dark background', () => {
    const mockGetThemeVal = jest.fn(name => {
      if (name === TEXT) {
        return LIGHT
      }
      if (name === TEXT_INVERSE) {
        return DARK
      }
    })

    // eslint-disable-next-line import/namespace
    themeUtils.getThemeVal = mockGetThemeVal
    const res = useContrastingText(DARK)
    expect(res).toEqual(LIGHT)
  })

  test('light text, dark textInverse, light background', () => {
    const mockGetThemeVal = jest.fn(name => {
      if (name === TEXT) {
        return LIGHT
      }
      if (name === TEXT_INVERSE) {
        return DARK
      }
    })

    // eslint-disable-next-line import/namespace
    themeUtils.getThemeVal = mockGetThemeVal
    const res = useContrastingText(LIGHT)
    expect(res).toEqual(DARK)
  })

  test('light testInverse, dark text, dark background', () => {
    const mockGetThemeVal = jest.fn(name => {
      if (name === TEXT) {
        return DARK
      }
      if (name === TEXT_INVERSE) {
        return LIGHT
      }
    })

    // eslint-disable-next-line import/namespace
    themeUtils.getThemeVal = mockGetThemeVal
    const res = useContrastingText(DARK)
    expect(res).toEqual(LIGHT)
  })

  test('light testInverse, dark text, light background', () => {
    const mockGetThemeVal = jest.fn(name => {
      if (name === TEXT) {
        return DARK
      }
      if (name === TEXT_INVERSE) {
        return LIGHT
      }
    })

    // eslint-disable-next-line import/namespace
    themeUtils.getThemeVal = mockGetThemeVal
    const res = useContrastingText(LIGHT)
    expect(res).toEqual(DARK)
  })
})
