import { getThemeVal, isDark } from './utils'

export const useContrastingText = background => {
  const text = getThemeVal('text')
  const textInverse = getThemeVal('textInverse')

  let darkText, lightText
  if (isDark(text)) {
    darkText = text
    lightText = textInverse
  } else {
    darkText = textInverse
    lightText = text
  }

  return isDark(background) ? lightText : darkText
}
