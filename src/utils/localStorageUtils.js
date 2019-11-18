import { getRootWindow } from './index'
import { LS_KEY } from '../config'

const scopedKey = rawKey => `${LS_KEY}_${rawKey}`

export const getLocalStorageValue = key => {
  const RootWindow = getRootWindow()
  return RootWindow.localStorage.getItem(scopedKey(key))
}

export const setLocalStorageValue = (key, value) => {
  const RootWindow = getRootWindow()
  return RootWindow.localStorage.setItem(scopedKey(key), value)
}
