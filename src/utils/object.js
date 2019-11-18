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

export const weaveArrays = (arr1, arr2) => {
  if (!arr2 || !arr2.length) return arr1[0]
  let result = arr1[0]

  for (var i = 1; i < arr1.length; i++) {
    result = result + arr2[i - 1] + arr1[i]
  }

  return result
}
