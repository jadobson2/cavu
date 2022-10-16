import { Commit } from 'vuex'
import { getDepartures } from '@/services/departures'
import { Departure } from '@/types'

const state = () => ({
  departures: [] as Departure[],
  error: '',
  loading: false
})

export type DeparturesState = ReturnType<typeof state>

const departures = {
  namespaced: true,
  state,
  mutations: {
    setDepartures (state: DeparturesState, departures: Departure[]) {
      state.departures = departures
    },

    setError (state: DeparturesState, message: string) {
      state.error = message
    },

    setLoading (state: DeparturesState, loading: boolean) {
      state.loading = loading
    }
  },
  actions: {
    async getDepartures ({ commit }: { commit: Commit }) {
      commit('setError', '')
      commit('setLoading', true)

      try {
        const departures = await getDepartures()

        commit('setDepartures', departures)
      } catch {
        commit('setError', 'An error occurred getting departures.')
      } finally {
        commit('setLoading', false)
      }
    }
  }
}

export default departures
