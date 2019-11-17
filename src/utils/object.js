const NOT_SET = undefined

/**
 * Given a collection of values, tries to get the value specified by the
 * keyPath. If any part of the keyPath fails, it returns the notSetValue
 **/
export const getIn = (collection, keyPath, notSetValue) => {
  keyPath = keyPath.split('/')
  // console.log('keypath', keyPath, typeof keyPath)
  let i = 0
  while (i !== keyPath.length) {
    collection = collection[keyPath[i++]] || NOT_SET
    if (collection === NOT_SET) return notSetValue
  }

  return collection
}
