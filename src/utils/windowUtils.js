/**
 * Returns whether or not there's a parent window
 * @returns bool
 **/
const isAtRootWindow = currentWindow => currentWindow === currentWindow.parent

/**
 * A recursive function that gets the top-level window object
 *
 * @returns object corresponding to the highest-level window (ie root window)
 **/
const getRootWindow = currentWindow => {
  currentWindow = currentWindow || window

  if (isAtRootWindow(currentWindow)) return currentWindow
  return getRootWindow(currentWindow.parent)
}

/**
 * Ensures the $theme object exists on the root window
 **/
const initRootWindow = () => {
  const RootWindow = getRootWindow()
  RootWindow.$theme = RootWindow.$theme || {}
}

export { initRootWindow, getRootWindow }
