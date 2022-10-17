import { shallowMount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'Foo' }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('click', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'Foo' }
    })
    wrapper.trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()
    expect(wrapper.emitted().click?.[0][0]).toEqual(expect.any(Event))
  })
})
