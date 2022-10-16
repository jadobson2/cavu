import { shallowMount } from '@vue/test-utils'
import BarTitle from '@/components/BarTitle.vue'

describe('BarTitle', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(BarTitle, {
      propsData: { title: 'Title' },
      slots: { icon: '<img src="foo.svg"/>' }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
