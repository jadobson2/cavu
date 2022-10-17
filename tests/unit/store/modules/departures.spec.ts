import departures from '@/store/modules/departures'
import * as departuresService from '@/services/departures'
import { departure } from 'tests/unit/fixtures/departures'

describe('store/modules/departures', () => {
  const defaultState = {
    departures: [],
    error: '',
    loading: false
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

    describe('updateDeparture', () => {
      it('updates departure', () => {
        const state = { ...defaultState, departures: [departure] }
        const context = { commit: jest.fn(), state }
        const update = { flightNumber: 'AF1669', status: 'New status' }
        departures.actions.updateDeparture(context, update)

        expect(context.commit).toHaveBeenCalledWith('setDepartures', [
          { ...departure, status: 'New status' }
        ])
      })

      test('departure does not exist', () => {
        const state = { ...defaultState, departures: [departure] }
        const context = { commit: jest.fn(), state }
        const update = { flightNumber: 'AF1670', status: 'New status' }
        departures.actions.updateDeparture(context, update)

        expect(context.commit).not.toHaveBeenCalled()
      })
    })
  })
})
