import PubSub from 'pubsub-js'
import { getTheme } from './utils'
import { THEME_UPDATE_EVENT } from './config'

export const updateTheme = (key, val) => {
  if (!window.$theme) return

  // TODO: if key is not in theme, log warning but still set value

  const newTheme = {
    ...getTheme(),
    [key]: val,
  }

  window.$theme = newTheme
  PubSub.publish(THEME_UPDATE_EVENT)
}
