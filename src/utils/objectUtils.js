const NOT_SET = undefined

/**
 * Given a collection of values, tries to get the value specified by the
 * keyPath. If any part of the keyPath fails, it returns the notSetValue
 **/
export const getIn = (collection, keyPath, notSetValue) => {
  keyPath = keyPath.split('/')
  let i = 0
  while (i !== keyPath.length) {
    collection = collection[keyPath[i++]] || NOT_SET
    if (collection === NOT_SET) return notSetValue
  }

  return collection
}

const isEmpty = arr => arr.length === 0

const head = arr => arr[0]

const tail = arr => arr.slice(1)

const interleave = (a = [], b = [], r = []) => {
  if (isEmpty(a) && isEmpty(b)) return r
  if (isEmpty(a)) return [...r, ...b]
  if (isEmpty(b)) return [...r, ...a]
  return interleave(tail(a), tail(b), [...r, head(a), head(b)])
}

export const weaveArrays = (a, b) => {
  const result = interleave(a, b)
  return result.join('')
}
