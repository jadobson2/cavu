import { shallowMount } from '@vue/test-utils'
import BackgroundContainer from '@/components/BackgroundContainer.vue'

describe('BackgroundContainer', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(BackgroundContainer, {
      slots: { default: '<div>Foo</div>' }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
