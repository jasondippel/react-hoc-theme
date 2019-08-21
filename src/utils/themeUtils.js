import { defaultTheme } from '../config'

export const getTheme = () => window.$theme || defaultTheme

export const getThemeVal = ({ key }) => {
  const currentTheme = getTheme()
  return currentTheme[key]
}
