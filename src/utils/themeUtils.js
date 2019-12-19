import { setLocalStorageValue, getLocalStorageValue } from './localStorageUtils'
import { getIn, weaveArrays } from './objectUtils'
import { getPubSub } from './pubsubUtils'
import { getRootWindow } from './windowUtils'
import {
  DEPRECATED_FIELDS,
  THEME_UPDATE_EVENT,
  DEFAULT_THEME,
  LIGHT_THEME,
  DARK_THEME,
} from '../config'

const THEME_TYPE_KEY = 'themeType'

const KNOWN_THEMES = {
  [DEFAULT_THEME.type]: DEFAULT_THEME,
  [LIGHT_THEME.type]: LIGHT_THEME,
  [DARK_THEME.type]: DARK_THEME,
}

/**
 * Given a theme object, returns a boolean as to whether or not it matches the
 * expected format
 **/
export const validateTheme = theme => {
  if (
    typeof theme === 'object' &&
    typeof theme.type === 'string' &&
    typeof theme.version === 'number' &&
    typeof theme.values === 'object'
  ) {
    return true
  }

  return false
}

/**
 * Returns the object associated with the currently used theme or undefined if
 * there is no active theme
 **/
export const getActiveTheme = () => {
  const RootWindow = getRootWindow()
  const $theme = RootWindow.$theme || {}
  return $theme.activeTheme
}

/**
 * Returns the theme object for the default theme
 **/
export const getDefaultTheme = () => KNOWN_THEMES[DEFAULT_THEME.type]

/**
 * Returns the theme object for the given type; For unknown types, it returns
 * undefined
 **/
export const getKnownThemeByType = type => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'production') {
    if (!KNOWN_THEMES[type]) {
      // eslint-disable-next-line no-console
      console.error('getKnownThemeByType called with unknown type', type)
    }
  }

  return KNOWN_THEMES[type]
}

/**
 * Given a path to a value, returns the value in the active theme; Returns
 * undefined if there's no active theme or the key is not defined in the
 * active theme
 **/
export const getThemeVal = (keyPath, ...vars) => {
  const currentTheme = getActiveTheme()

  if (Array.isArray(keyPath)) keyPath = weaveArrays(keyPath, vars)
  if (!currentTheme) {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('getThemeVal called, but no theme has been initialized')
    }
    return
  }
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'production') {
    if (!!DEPRECATED_FIELDS[keyPath]) {
      // eslint-disable-next-line no-console
      console.warn(
        `%c!! Deprecated Theme Value Used !!\n` +
          `%cValue: "${keyPath}"\nUpgrade Instructions: ${DEPRECATED_FIELDS[keyPath].upgradeInstructions}`,
        'font-weight: bold; color: orange;',
        'font-weight: normal; color: inherit;',
      )
    }
  }

  return getIn(currentTheme.values, keyPath)
}

/**
 * Given a valid theme object, it sets that as the active theme and notifies all
 * subscribers
 **/
export const setActiveTheme = themeObj => {
  const activeTheme = getActiveTheme() || {}
  const isValidTheme = validateTheme(themeObj)

  if (!isValidTheme) {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('setActiveTheme called with invalid theme', themeObj)
    }
    return
  }
  if (
    themeObj.type === activeTheme.type &&
    themeObj.version === activeTheme.version
  )
    return

  const PubSub = getPubSub()
  const RootWindow = getRootWindow()
  RootWindow.$theme.activeTheme = themeObj
  setLocalStorageValue(THEME_TYPE_KEY, themeObj.type)

  PubSub.publish(THEME_UPDATE_EVENT)
}

/**
 * If the active theme is defined, but this package has a more recent version,
 * this will set the active theme to the more recent version.
 * If there is no active theme defined, it will be set to the default theme of
 * this package.
 **/
export const initTheme = () => {
  const activeTheme = getActiveTheme()
  if (!activeTheme) {
    const lsThemeType = getLocalStorageValue(THEME_TYPE_KEY)
    const prevTheme = !!lsThemeType && getKnownThemeByType(lsThemeType)
    return setActiveTheme(prevTheme || getDefaultTheme())
  }

  const knownMatchingTheme = getKnownThemeByType(activeTheme.type)
  if (!knownMatchingTheme || typeof activeTheme.version !== 'number') return
  if (knownMatchingTheme.version <= activeTheme.version) {
    return
  }

  return setActiveTheme(knownMatchingTheme)
}
