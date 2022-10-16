import { shallowMount } from '@vue/test-utils'
import DepartureStatus from '@/components/DepartureStatus.vue'

describe('DepartureStatus', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(DepartureStatus, {
      propsData: { statusText: 'Departed 10:45' }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
