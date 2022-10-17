<template>
  <article
    class="
      departure-item grid items-center gap-1 md:gap-2 xl:gap-3 mb-5 last:mb-0 px-8
      lg:px-14 py-5 border-2 rounded-xl text-xl xl:text-2xl text-white font-bold
      whitespace-nowrap
    "
    data-test="departure"
  >
    <span data-label="Departure time:">{{ departureTime }}</span>
    <span class="text-yellow" data-label="City name:">
      {{ departure.arrivalAirport.cityName }}
    </span>
    <span data-label="Code:">{{ departure.arrivalAirport.code }}</span>
    <span data-label="Airline:">{{ departure.airline.name }}</span>
    <span class="text-yellow" data-label="Gate:" data-test="departure-gate">
      {{ departure.departureGate ? departure.departureGate.number : '' }}
    </span>
    <DepartureStatus
      :status-text="departure.status"
      class="col-span-full lg:col-auto mt-3 md:mt-2 lg:mt-0"
    />
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Departure } from '@/types/index'
import DepartureStatus from './DepartureStatus.vue'
import { getHours } from '@/utils/date'

export default Vue.extend({
  name: 'DepartureItem',
  components: { DepartureStatus },
  props: {
    departure: {
      type: Object as PropType<Departure>
    }
  },
  computed: {
    departureTime (): string {
      return getHours(this.departure.scheduledDepartureDateTime)
    }
  }
})
</script>

<style lang="scss" scoped>
.departure-item {
  @media (min-width: #{theme('screens.md')}) {
    grid-template-columns: 15% 25% 15% 25% 15% 0%;
  }

  @media (min-width: #{theme('screens.lg')}) {
    grid-template-columns: 15% 20% 10% 20% 10% 30%;
  }

  @media (max-width: #{theme('screens.md')}) {
    [data-label] {
      @apply before:mr-1 before:content-[attr(data-label)];
    }
  }
}
</style>
