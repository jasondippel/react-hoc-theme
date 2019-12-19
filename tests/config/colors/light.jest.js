import colors from '../../../src/config/colors/light'
import { contrast } from '../../../testUtils'

const MINIMUM_NORMAL_CONTRAST = 4.5
const MINIMUM_LARGE_CONTRAST = 3

describe('colors', () => {
  describe('text on...', () => {
    describe('background100', () => {
      const res = contrast(colors.text, colors.background100)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background200', () => {
      const res = contrast(colors.text, colors.background200)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background300', () => {
      const res = contrast(colors.text, colors.background300)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background400', () => {
      const res = contrast(colors.text, colors.background400)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background500', () => {
      const res = contrast(colors.text, colors.background500)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('backgroundLight', () => {
      const res = contrast(colors.text, colors.backgroundLight)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('primary', () => {
      const res = contrast(colors.text, colors.primary)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('primaryAccent', () => {
      const res = contrast(colors.text, colors.primaryAccent)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('primaryBackground', () => {
      const res = contrast(colors.text, colors.primaryBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('success', () => {
      const res = contrast(colors.text, colors.success)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('successAccent', () => {
      const res = contrast(colors.text, colors.successAccent)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('successBackground', () => {
      const res = contrast(colors.text, colors.successBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('warning', () => {
      const res = contrast(colors.text, colors.warning)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('warningAccent', () => {
      const res = contrast(colors.text, colors.warningAccent)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('warningBackground', () => {
      const res = contrast(colors.text, colors.warningBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('error', () => {
      const res = contrast(colors.text, colors.error)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('errorAccent', () => {
      const res = contrast(colors.text, colors.errorAccent)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('errorBackground', () => {
      const res = contrast(colors.text, colors.errorBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })
  })

  describe('textInverse on...', () => {
    describe('backgroundDark', () => {
      const res = contrast(colors.textInverse, colors.backgroundDark)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })
  })

  describe('textMeta on...', () => {
    describe('background100', () => {
      const res = contrast(colors.textMeta, colors.background100)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background200', () => {
      const res = contrast(colors.textMeta, colors.background200)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background300', () => {
      const res = contrast(colors.textMeta, colors.background300)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background400', () => {
      const res = contrast(colors.textMeta, colors.background400)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background500', () => {
      const res = contrast(colors.textMeta, colors.background500)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('primaryAccent', () => {
      const res = contrast(colors.textMeta, colors.primaryAccent)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('primaryBackground', () => {
      const res = contrast(colors.textMeta, colors.primaryBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('successAccent', () => {
      const res = contrast(colors.textMeta, colors.successAccent)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('successBackground', () => {
      const res = contrast(colors.textMeta, colors.successBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('warningAccent', () => {
      const res = contrast(colors.textMeta, colors.warningAccent)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('warningBackground', () => {
      const res = contrast(colors.textMeta, colors.warningBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('errorAccent', () => {
      const res = contrast(colors.textMeta, colors.errorAccent)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('errorBackground', () => {
      const res = contrast(colors.textMeta, colors.errorBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })
  })

  describe('textDisabled on...', () => {
    describe('background100', () => {
      const res = contrast(colors.textDisabled, colors.background100)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background200', () => {
      const res = contrast(colors.textDisabled, colors.background200)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background300', () => {
      const res = contrast(colors.textDisabled, colors.background300)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('primaryBackground', () => {
      const res = contrast(colors.textDisabled, colors.primaryBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('successBackground', () => {
      const res = contrast(colors.textDisabled, colors.successBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('warningBackground', () => {
      const res = contrast(colors.textDisabled, colors.warningBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('errorBackground', () => {
      const res = contrast(colors.textDisabled, colors.errorBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })
  })

  describe('link on...', () => {
    describe('background100', () => {
      const res = contrast(colors.link, colors.background100)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background200', () => {
      const res = contrast(colors.link, colors.background200)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('background300', () => {
      const res = contrast(colors.link, colors.background300)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('primaryBackground', () => {
      const res = contrast(colors.link, colors.primaryBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('successBackground', () => {
      const res = contrast(colors.link, colors.successBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('warningBackground', () => {
      const res = contrast(colors.link, colors.warningBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })

    describe('errorBackground', () => {
      const res = contrast(colors.link, colors.errorBackground)

      test('normal', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_NORMAL_CONTRAST)
      })

      test('large', () => {
        expect(res).toBeGreaterThanOrEqual(MINIMUM_LARGE_CONTRAST)
      })
    })
  })
})
