import PubSub from 'pubsub-js'
import {
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
 * Returns the object associated with the currently used theme or undefined if
 * there is no active theme
 **/
export const getActiveTheme = () => window.$theme

/**
 * Given a key, returns the value associated with that key in the active theme;
 * Returns unknown if there's no active theme or the key is not defined in the
 * active theme
 **/
export const getThemeVal = ({ key }) => {
  const currentTheme = getActiveTheme()
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

  return currentTheme.values[key]
}

/**
 * Returns the theme object for the default theme
 **/
export const getDefaultTheme = () => KNOWN_THEMES[DEFAULT_THEME_TYPE]

/**
 * Returns the theme object for the given type; For unknown types, it returns
 * undefined
 **/
export const getKnownThemeByType = type => {
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
 * Given a valid theme object, it sets that as the active theme and notifies all
 * subscribers
 **/
export const setActiveTheme = themeObj => {
  const isValidTheme = validateTheme(themeObj)

  if (!isValidTheme) {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('Tried to set theme to invalid theme', themeObj)
    }
    return
  }

  window.$theme = themeObj
  PubSub.publish(THEME_UPDATE_EVENT)
}
