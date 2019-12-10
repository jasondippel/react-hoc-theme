import { VERSION, TYPE, VALUES } from './darkTheme'

describe('darkTheme', () => {
  test('version is unchanged', () => expect(VERSION).toEqual(1))

  test('type is dark', () => expect(TYPE).toEqual('dark'))

  test('values remain unchanged', () => expect(VALUES).toMatchSnapshot(VALUES))
})
