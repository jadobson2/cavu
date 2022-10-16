import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import DeparturesView from '@/views/DeparturesView.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import DepartureItem from '@/components/DepartureItem.vue'
import { DeparturesState } from '@/store/modules/departures'

describe('DeparturesView', () => {
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

  const localVue = createLocalVue()
  localVue.use(Vuex)

  const getDeparturesMock = jest.fn()

  const state = {
    departures: [],
    error: '',
    loading: false
  }

  const setup = (testState?: Partial<DeparturesState>) => {
    const store = new Vuex.Store({
      modules: {
        departures: {
          namespaced: true,
          state: {
            ...state,
            ...testState
          },
          actions: {
            getDepartures: getDeparturesMock
          }
        }
      }
    })

    return shallowMount(DeparturesView, {
      localVue,
      store
    })
  }

  test('loading', () => {
    const wrapper = setup({ loading: true })

    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true)
  })

  test('departures', () => {
    const wrapper = setup({ departures: [departure] })

    expect(wrapper.findAllComponents(DepartureItem).length).toBe(1)
  })

  test('no departures', () => {
    const wrapper = setup()

    expect(wrapper.find('[data-test="notice"]').text()).toBe('There are no departures.')
  })

  test('error', () => {
    const wrapper = setup({ error: 'Error message.' })

    expect(wrapper.find('[data-test="notice"]').text()).toBe('Error message.')
  })
})
