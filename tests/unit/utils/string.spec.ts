import { slugify } from '@/utils/string'

describe('utils/string', () => {
  describe('slugify', () => {
    test.each([
      ['FOO', 'foo'],
      ['FOO_BAR', 'foo-bar'],
      ['FOO_!@£$_BAR', 'foo--bar']
    ])('slugify(%p) returns %p', (str, expected) => {
      expect(slugify(str)).toBe(expected)
    })
  })
})
