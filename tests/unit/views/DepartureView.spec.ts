import Vuex from 'vuex'
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils'
import DeparturesView from '@/views/DeparturesView.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import DepartureItem from '@/components/DepartureItem.vue'
import DeparturesForm from '@/components/DeparturesForm.vue'
import { DeparturesState } from '@/store/modules/departures'
import { departure } from 'tests/unit/fixtures/departures'

describe('DeparturesView', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const getDeparturesMock = jest.fn()

  const state = {
    departures: [],
    error: '',
    loading: false
  }

  const setup = (testState?: Partial<DeparturesState>): Wrapper<Vue> => {
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
    expect(wrapper.findComponent(DeparturesForm).exists()).toBe(true)
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
