import { getRootWindow, getPubSub, getIn } from './index'
import {
  DEPRECATED_FIELDS,
  THEME_UPDATE_EVENT,
  // default theme
  DEFAULT_THEME_VALUES,
  DEFAULT_THEME_TYPE,
  DEFAULT_THEME_VERSION,
  // light theme
  LIGHT_THEME_VALUES,
  LIGHT_THEME_TYPE,
  LIGHT_THEME_VERSION,
  // dark theme
  DARK_THEME_VALUES,
  DARK_THEME_TYPE,
  DARK_THEME_VERSION,
} from '../config'

const KNOWN_THEMES = {
  [DEFAULT_THEME_TYPE]: {
    type: DEFAULT_THEME_TYPE,
    version: DEFAULT_THEME_VERSION,
    values: DEFAULT_THEME_VALUES,
  },
  [LIGHT_THEME_TYPE]: {
    type: LIGHT_THEME_TYPE,
    version: LIGHT_THEME_VERSION,
    values: LIGHT_THEME_VALUES,
  },
  [DARK_THEME_TYPE]: {
    type: DARK_THEME_TYPE,
    version: DARK_THEME_VERSION,
    values: DARK_THEME_VALUES,
  },
}

/**
 * Given a theme object, returns a boolean as to whether or not it matches the
 * expected format
 **/
const validateTheme = theme => {
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
const getActiveTheme = () => {
  const RootWindow = getRootWindow()
  return RootWindow.$theme.activeTheme
}

/**
 * Returns the theme object for the default theme
 **/
const getDefaultTheme = () => KNOWN_THEMES[DEFAULT_THEME_TYPE]

/**
 * Returns the theme object for the given type; For unknown types, it returns
 * undefined
 **/
const getKnownThemeByType = type => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'production') {
    if (!KNOWN_THEMES[type]) {
      // eslint-disable-next-line no-console
      console.error('Tried to get theme for unknown type')
    }
  }

  return KNOWN_THEMES[type]
}

/**
 * Given a path to a value, returns the value in the active theme; Returns
 * undefined if there's no active theme or the key is not defined in the
 * active theme
 **/
const getThemeVal = keyPath => {
  const currentTheme = getActiveTheme()
  if (Array.isArray(keyPath)) keyPath = keyPath[0]
  if (!currentTheme) {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(
        'Tried to get theme value when no theme has been initialized',
      )
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
const setActiveTheme = themeObj => {
  const isValidTheme = validateTheme(themeObj)

  if (!isValidTheme) {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('Tried to set theme to invalid theme', themeObj)
    }
    return
  }

  const PubSub = getPubSub()
  const RootWindow = getRootWindow()
  RootWindow.$theme.activeTheme = themeObj

  PubSub.publish(THEME_UPDATE_EVENT)
}

/**
 * If the active theme is defined, but this package has a more recent version,
 * this will set the active theme to the more recent version.
 * If there is no active theme defined, it will be set to the default theme of
 * this package.
 **/
const initTheme = () => {
  const activeTheme = getActiveTheme()
  if (!activeTheme) return setActiveTheme(getDefaultTheme())

  const knownMatchingTheme = getKnownThemeByType(activeTheme.type)
  if (!knownMatchingTheme || typeof activeTheme.version !== 'number') return
  if (knownMatchingTheme.version <= activeTheme.version) {
    return
  }

  return setActiveTheme(knownMatchingTheme)
}

export {
  initTheme,
  setActiveTheme,
  getActiveTheme,
  getDefaultTheme,
  getKnownThemeByType,
  getThemeVal,
}
