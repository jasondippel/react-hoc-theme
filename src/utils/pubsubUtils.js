import { getRootWindow } from './windowUtils'

/**
 * Ensures the PubSub object is defined
 **/
export const initPubSub = PubSub => {
  const RootWindow = getRootWindow()
  RootWindow.$theme = RootWindow.$theme || {}
  RootWindow.$theme.PubSub = RootWindow.$theme.PubSub || PubSub
}

/**
 * Returns the PubSub object on the root window
 **/
export const getPubSub = () => {
  const RootWindow = getRootWindow()
  const $theme = RootWindow.$theme || {}
  return $theme.PubSub
}
