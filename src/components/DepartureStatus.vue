<template>
  <div
    class="departure-status inline-flex w-fit rounded-l-lg rounded-r-3xl"
    :class="`departure-status--${statusSlug}`"
    data-test="departure-status"
  >
    <span class="block ml-3 pl-4 pr-7 py-2 rounded-l-lg rounded-r-3xl bg-white">
    {{ statusText }}
  </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { DepartureStatusCode } from '@/types'
import { getStatus } from '@/utils/departures'
import { slugify } from '@/utils/string'

export default Vue.extend({
  name: 'DepartureStatus',
  props: {
    statusText: String
  },
  computed: {
    status (): DepartureStatusCode {
      return getStatus(this.statusText)
    },
    statusSlug (): string {
      return slugify(this.status)
    }
  }
})
</script>

<style lang="scss" scoped>
.departure-status {
  $statuses: (
    boarding: (theme('colors.green'), theme('colors.green')),
    cancelled: (theme('colors.red'), theme('colors.red')),
    delayed: (theme('colors.red'), theme('colors.red')),
    departed: (theme('colors.green'), theme('colors.green')),
    gate-closed: (theme('colors.yellow.DEFAULT'), theme('colors.greyscale.90')),
    gate-closing: (theme('colors.orange'), theme('colors.orange')),
    gate-open: (theme('colors.blue'), theme('colors.greyscale.90')),
  );

  @each $status, $values in $statuses {
    &--#{$status} {
      background-color: nth($values, 1);
      color: nth($values, 2);
    }
  }
}
</style>
