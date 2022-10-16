import { shallowMount } from '@vue/test-utils'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(LoadingSpinner)

    expect(wrapper.element).toMatchSnapshot()
  })

  test('invert', () => {
    const wrapper = shallowMount(LoadingSpinner, {
      propsData: { invert: true }
    })

    expect(wrapper.classes()).toContain('invert')
  })
})
