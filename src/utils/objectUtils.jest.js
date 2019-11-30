import { getIn, weaveArrays } from './objectUtils'

const SAMPLE_OBJECT = {
  key1: 'value1',
  key2: 'value2',
  key3: {
    key4: 'value4',
    key5: {
      key6: {
        key7: 'value7',
      },
    },
  },
}

describe('getIn', () => {
  test('invalid key path', () => {
    const res = getIn(SAMPLE_OBJECT, 'key3/key9/key7')
    expect(res).toEqual(undefined)
  })

  test('single level key path', () => {
    const res = getIn(SAMPLE_OBJECT, 'key2')
    expect(res).toEqual('value2')
  })

  test('multi level key path', () => {
    const res = getIn(SAMPLE_OBJECT, 'key3/key5/key6/key7')
    expect(res).toEqual('value7')
  })

  test('not set value', () => {
    const res = getIn(SAMPLE_OBJECT, 'key9', 'custom')
    expect(res).toEqual('custom')
  })
})

describe('weaveArrays', () => {
  test('both arrays empty', () => {
    const sampleArray1 = []
    const sampleArray2 = []
    const res = weaveArrays(sampleArray1, sampleArray2)
    expect(res).toEqual('')
  })

  test('single array passed', () => {
    const sampleArray1 = ['a', 'b', 'c']
    const res1 = weaveArrays(sampleArray1)
    expect(res1).toEqual('abc')

    const sampleArray2 = ['a', 'b', 'c']
    const res2 = weaveArrays(undefined, sampleArray2)
    expect(res2).toEqual('abc')
  })

  test('two arrays, same length', () => {
    const sampleArray1 = ['a', 'c', 'e']
    const sampleArray2 = ['b', 'd', 'f']
    const res = weaveArrays(sampleArray1, sampleArray2)
    expect(res).toEqual('abcdef')
  })

  test('two arrays, first shorter', () => {
    const sampleArray1 = ['a']
    const sampleArray2 = ['b', 'd', 'f']
    const res = weaveArrays(sampleArray1, sampleArray2)
    expect(res).toEqual('abdf')
  })

  test('two arrays, second shorter', () => {
    const sampleArray1 = ['a', 'c', 'e']
    const sampleArray2 = ['b']
    const res = weaveArrays(sampleArray1, sampleArray2)
    expect(res).toEqual('abce')
  })
})
