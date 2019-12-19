import {
  useTheme,
  useContrastingText,
  isDark,
  setActiveTheme,
  getActiveTheme,
  LIGHT_THEME,
  DARK_THEME,
  DEFAULT_THEME,
} from './index'

describe('Package exports exist', () => {
  test('useTheme', () => {
    const type = typeof useTheme
    expect(type).toEqual('function')
  })

  test('useContrastingText', () => {
    const type = typeof useContrastingText
    expect(type).toEqual('function')
  })

  test('isDark', () => {
    const type = typeof isDark
    expect(type).toEqual('function')
  })

  test('setActiveTheme', () => {
    const type = typeof setActiveTheme
    expect(type).toEqual('function')
  })

  test('getActiveTheme', () => {
    const type = typeof getActiveTheme
    expect(type).toEqual('function')
  })

  test('LIGHT_THEME', () => {
    const type = typeof LIGHT_THEME
    expect(type).toEqual('object')
  })

  test('DARK_THEME', () => {
    const type = typeof DARK_THEME
    expect(type).toEqual('object')
  })

  test('DEFAULT_THEME', () => {
    const type = typeof DEFAULT_THEME
    expect(type).toEqual('object')
  })
})
