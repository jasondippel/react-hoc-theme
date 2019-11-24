import { getRootWindow } from './windowUtils'
import { LS_KEY } from '../config'

export const getScopedKey = rawKey => `${LS_KEY}${rawKey}`

export const getLocalStorageValue = key => {
  const RootWindow = getRootWindow()
  return RootWindow.localStorage.getItem(getScopedKey(key))
}

export const setLocalStorageValue = (key, value) => {
  const RootWindow = getRootWindow()
  return RootWindow.localStorage.setItem(getScopedKey(key), value)
}
