import { shallowMount } from '@vue/test-utils'
import DepartureItem from '@/components/DepartureItem.vue'
import { departure } from 'tests/unit/fixtures/departures'

describe('DepartureItem', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(DepartureItem, {
      propsData: { departure }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('no departure gate', () => {
    const wrapper = shallowMount(DepartureItem, {
      propsData: {
        departure: {
          ...departure,
          departureGate: null
        }
      }
    })

    expect(wrapper.find('[data-test="departure-gate"]').text()).toBe('')
  })
})
