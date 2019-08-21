import PubSub from 'pubsub-js'
import { getTheme } from './utils'
import { THEME_UPDATE_EVENT } from './config'

export const updateTheme = ({ key, val }) => {
  if (!window.$theme) return

  const newTheme = {
    ...getTheme(),
    [key]: val,
  }

  window.$theme = newTheme
  PubSub.publish(THEME_UPDATE_EVENT)
}
