import { shallowMount } from '@vue/test-utils'
import DepartureItem from '@/components/DepartureItem.vue'

describe('DepartureItem', () => {
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
