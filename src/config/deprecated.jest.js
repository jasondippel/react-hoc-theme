import { DEPRECATED_FIELDS } from './deprecated'

describe('DEPRECATED_FIELDS', () => {
  test('all deprecated fields have upgrade instructions', () => {
    Object.keys(DEPRECATED_FIELDS).map(k => {
      expect(DEPRECATED_FIELDS[k].upgradeInstructions).toBeDefined()
    })
  })
})
