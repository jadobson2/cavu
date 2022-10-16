import departures from '@/store/modules/departures'
import * as departuresService from '@/services/departures'

describe('store/modules/departures', () => {
  const defaultState = {
    departures: [],
    error: '',
    loading: false
  }

  const departure = {
    flightDirection: 'departure',
    scheduledDepartureDateTime: '2022-08-22T10:30:00',
    scheduledArrivalDateTime: '2022-08-22T01:00:00',
    estimatedDepartureDateTime: '2022-08-22T10:51:00',
    actualDepartureDateTime: '2022-08-22T10:49:00',
    arrivalAirport: {
      name: 'Charles de Gaulle Airport',
      cityName: 'Paris',
      countryName: 'France',
      code: 'CDG'
    },
    departureAirport: {
      name: 'Manchester Airport',
      cityName: 'Manchester',
      countryName: 'United Kingdom',
      code: 'MAN'
    },
    flightNumber: 'AF1669',
    airline: {
      name: 'Air France',
      code: 'AF'
    },
    departureGate: {
      name: 'Gate A5',
      number: 'A5',
      action: 'Final Call'
    },
    arrivalTerminal: null,
    departureTerminal: '2',
    status: 'Departed 10:49'
  }

  describe('mutations', () => {
    test('default state', () => {
      expect(departures.state()).toEqual(defaultState)
    })

    test('setDepartures', () => {
      const state = { ...defaultState }
      departures.mutations.setDepartures(state, [departure])

      expect(state.departures).toEqual([departure])
    })

    test('setError', () => {
      const state = { ...defaultState }
      departures.mutations.setError(state, 'Error')

      expect(state.error).toEqual('Error')
    })

    test('setLoading', () => {
      const state = { ...defaultState }
      departures.mutations.setLoading(state, true)

      expect(state.loading).toEqual(true)
    })
  })

  describe('actions', () => {
    describe('getDepartures', () => {
      test('happy path', async () => {
        jest.spyOn(departuresService, 'getDepartures').mockResolvedValue([departure])
        const context = { commit: jest.fn() }
        await departures.actions.getDepartures(context)

        expect(context.commit).toHaveBeenCalledWith('setError', '')
        expect(context.commit).toHaveBeenCalledWith('setLoading', true)
        expect(context.commit).toHaveBeenCalledWith('setDepartures', [departure])
        expect(context.commit).toHaveBeenCalledWith('setLoading', false)
      })

      test('sad path', async () => {
        jest.spyOn(departuresService, 'getDepartures').mockRejectedValue(new Error('Error'))
        const context = { commit: jest.fn() }
        await departures.actions.getDepartures(context)

        expect(context.commit).toHaveBeenCalledWith('setError', '')
        expect(context.commit).toHaveBeenCalledWith('setLoading', true)
        expect(context.commit).toHaveBeenCalledWith('setError', 'An error occurred getting departures.')
        expect(context.commit).toHaveBeenCalledWith('setLoading', false)
      })
    })
  })
})
