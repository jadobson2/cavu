import { getStatus } from '@/utils/departures'

describe('utils/departures', () => {
  describe('getStatus', () => {
    test.each([
      ['Boarding', 'BOARDING'],
      ['Cancelled', 'CANCELLED'],
      ['Delayed', 'DELAYED'],
      ['Departed 10:49', 'DEPARTED'],
      ['Final Call - Gate 31', 'GATE_CLOSING'],
      ['Go to Gate 204', 'GATE_OPEN'],
      ['Foo', 'GATE_CLOSED']
    ])('slugify(%p) returns %p', (status, expected) => {
      expect(getStatus(status)).toBe(expected)
    })
  })
})
