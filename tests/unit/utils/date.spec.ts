import { getHours } from '@/utils/date'

describe('utils/date', () => {
  describe('getHours', () => {
    test.each([
      ['2022-08-22T10:30:00', '10:30'],
      ['2022-08-22T09:30:00', '09:30'],
      ['2022-08-22T10:03:00', '10:03']
    ])('getHours(%p) returns %p', (date, expected) => {
      expect(getHours(date)).toBe(expected)
    })
  })
})
