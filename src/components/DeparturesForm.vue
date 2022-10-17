<template>
  <form class="px-8 py-4 lg:py-8 xl:px-14 rounded-xl bg-white">
    <h2 class="mb-6 text-2xl font-bold">Update Departure</h2>
    <div class="mb-4">
      <label class="form-label" for="update-flight">Flight</label>
      <select v-model="flightNumber" class="form-input" id="update-flight">
        <option :value="null" disabled selected hidden>Select Flight</option>
        <option
          v-for="departure in departures"
          :key="departure.flightNumber"
          :value="departure.flightNumber"
        >
          {{ `
            ${getHours(departure.scheduledDepartureDateTime)}
            -
            ${departure.arrivalAirport.cityName}
          ` }}
        </option>
      </select>
    </div>
    <div class="mb-4 lg:mb-6">
      <label class="form-label" for="update-status">Status</label>
      <select v-model="status" class="form-input" id="update-status">
        <option :value="null" disabled selected hidden>Select Status</option>
        <option
          v-for="option in statusOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div v-if="isStatusOther" class="mb-4 lg:mb-6">
      <label class="form-label" for="update-status-other">Other Status</label>
      <input v-model="statusOther" class="form-input" id="update-status-other"/>
    </div>
    <p
      v-if="success"
      class="mb-4 lg:mb-6 text-green font-bold"
      data-test="success-notice"
    >
      Departure updated successfully.
    </p>
    <p
      v-if="error"
      class="mb-4 lg:mb-6 text-red font-bold"
      data-test="error-notice"
    >
      {{ error }}
    </p>
    <div class="text-right">
      <Button
        type="button"
        data-test="update-button"
        @click="updateDeparture"
      >
        Update Departure
      </Button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { getHours } from '@/utils/date'
import Button from './Button.vue'

enum DepartureStatusOptions {
  CANCELLED = 'Cancelled',
  DELAYED = 'Delayed',
  DEPARTED = 'Departed',
  DIVERTED = 'Diverted',
  OTHER = 'Other'
}

export default Vue.extend({
  name: 'DeparturesForm',
  components: { Button },
  data () {
    return {
      error: '',
      flightNumber: null as string | null,
      status: null as DepartureStatusOptions | null,
      statusOther: null as string | null,
      statusOptions: Object.values(DepartureStatusOptions),
      success: false
    }
  },
  computed: {
    ...mapState('departures', ['departures']),
    isDisabled (): boolean {
      return !this.flightNumber || !this.status || (this.isStatusOther && this.statusOther === '')
    },
    isStatusOther (): boolean {
      return this.status === DepartureStatusOptions.OTHER
    },
    hasNotice (): boolean {
      return !!this.error || this.success
    }
  },
  watch: {
    flightNumber (flightNumber: string) {
      if (this.hasNotice && flightNumber) this.resetNotices()
    },
    status (status: DepartureStatusOptions) {
      if (this.hasNotice && status) this.resetNotices()
      this.statusOther = null
    }
  },
  methods: {
    ...mapActions('departures', { updateDepartureAction: 'updateDeparture' }),
    getHours,
    async updateDeparture () {
      const updated = await this.updateDepartureAction({
        flightNumber: this.flightNumber,
        status: this.statusOther || this.status
      })

      if (updated) {
        this.success = true
        this.reset()
      } else {
        this.error = 'An error occurred updating the departure.'
      }
    },
    reset () {
      this.flightNumber = null
      this.status = null
      this.statusOther = null
    },
    resetNotices () {
      this.error = ''
      this.success = false
    }
  }
})
</script>

<style lang="scss" scoped>
@import './../assets/styles/shared/form.scss'
</style>
