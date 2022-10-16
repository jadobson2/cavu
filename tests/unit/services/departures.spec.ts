import { getDepartures } from '@/services/departures'

describe('services/departures', () => {
  const mockFetch = (response: unknown) => {
    // @ts-ignore
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(response)
      })
    })
  }

  test('getDepartures', async () => {
    mockFetch({ allDepartures: [{ flightNumber: 'AF1669' }] })
    const departures = await getDepartures()

    expect(fetch).toHaveBeenCalledWith('https://6315ae3e5b85ba9b11e4cb85.mockapi.io//departures/Flightdata')
    expect(departures).toEqual([{ flightNumber: 'AF1669' }])
  })
})
