import { VERSION, TYPE, VALUES } from './lightTheme'

describe('lightTheme', () => {
  test('version is unchanged', () => expect(VERSION).toEqual(1))

  test('type is light', () => expect(TYPE).toEqual('light'))

  test('values remain unchanged', () => expect(VALUES).toMatchSnapshot(VALUES))
})
