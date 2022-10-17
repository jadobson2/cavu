import Vuex, { StoreOptions } from 'vuex'
import flushPromises from 'flush-promises'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import DeparturesForm from '@/components/DeparturesForm.vue'
import departuresModule from '@/store/modules/departures'
import { departure } from 'tests/unit/fixtures/departures'
import { RelaxedWrapper } from 'tests/unit/types'

describe('DeparturesForm', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const state = {
    departures: [departure],
    error: '',
    loading: false
  }

  const setup = (testStoreOptions?: StoreOptions<unknown>): RelaxedWrapper => {
    const store = new Vuex.Store({
      modules: {
        departures: {
          ...departuresModule,
          state,
          ...testStoreOptions
        }
      }
    })

    return shallowMount(DeparturesForm, {
      localVue,
      store
    })
  }

  it('renders correctly', () => {
    const wrapper = setup()

    expect(wrapper.element).toMatchSnapshot()
  })

  test('update', async () => {
    const wrapper = setup()
    const flightNumberSelect = wrapper.find('#update-flight')
    const statusSelect = wrapper.find('#update-status')
    await flightNumberSelect.find('option[value="AF1669"]').setSelected()
    await statusSelect.find('option[value="Departed"]').setSelected()
    wrapper.find('[data-test="update-button"]').vm.$emit('click')
    await flushPromises()

    expect(state.departures[0].status).toEqual('Departed')
    expect(wrapper.find('[data-test="success-notice"]').exists()).toBe(true)
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    expect(flightNumberSelect.element.value).toBe('')
    // @ts-ignore
    expect(statusSelect.element.value).toBe('')
    /* eslint-enable @typescript-eslint/ban-ts-comment */
  })

  test('update failed', async () => {
    const wrapper = setup({
      actions: {
        updateDeparture: jest.fn().mockReturnValue(false)
      }
    })
    await wrapper.find('#update-flight').find('option[value="AF1669"]').setSelected()
    await wrapper.find('#update-status').find('option[value="Departed"]').setSelected()
    wrapper.find('[data-test="update-button"]').vm.$emit('click')
    await flushPromises()

    expect(wrapper.find('[data-test="error-notice"]').text()).toBe(
      'An error occurred updating the departure.'
    )
  })

  test('other status', async () => {
    const wrapper = setup()
    await wrapper.find('#update-flight').find('option[value="AF1669"]').setSelected()
    await wrapper.find('#update-status').find('option[value="Other"]').setSelected()
    await wrapper.find('#update-status-other').setValue('Other status')
    wrapper.find('[data-test="update-button"]').vm.$emit('click')
    await flushPromises()

    expect(state.departures[0].status).toEqual('Other status')
    expect(wrapper.find('#update-status-other').exists()).toBe(false)
    expect(wrapper.vm.statusOther).toBe(null)
  })

  describe('flight number change', () => {
    it('resets success notice if set', async () => {
      const wrapper = setup()
      await wrapper.setData({ success: true })
      await wrapper.find('#update-flight').find('option[value="AF1669"]').setSelected()

      expect(wrapper.find('[data-test="success-notice"]').exists()).toBe(false)
    })

    it('resets error notice if set', async () => {
      const wrapper = setup()
      await wrapper.setData({ error: 'Error message' })
      await wrapper.find('#update-flight').find('option[value="AF1669"]').setSelected()

      expect(wrapper.find('[data-test="success-error"]').exists()).toBe(false)
    })
  })

  describe('status change', () => {
    it('resets status other', async () => {
      const wrapper = setup()
      await wrapper.setData({
        status: 'Other',
        statusOther: 'Other status'
      })
      await wrapper.find('#update-status').find('option[value="Departed"]').setSelected()

      expect(wrapper.find('#update-status-other').exists()).toBe(false)
      expect(wrapper.vm.statusOther).toBe(null)
    })

    it('resets success notice if set', async () => {
      const wrapper = setup()
      await wrapper.setData({ success: true })
      await wrapper.find('#update-status').find('option[value="Departed"]').setSelected()

      expect(wrapper.find('[data-test="success-notice"]').exists()).toBe(false)
    })

    it('resets error notice if set', async () => {
      const wrapper = setup()
      await wrapper.setData({ error: 'Error message' })
      await wrapper.find('#update-status').find('option[value="Departed"]').setSelected()

      expect(wrapper.find('[data-test="success-error"]').exists()).toBe(false)
    })
  })
})
