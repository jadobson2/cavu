<template>
  <div
    class="w-14 h-14 my-14 mx-auto"
    :class="{ 'invert': invert }"
  >
    <img
      src="../assets/icons/spinner.svg"
      alt="Loading spinner"
      class="animate-spin"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoadingSpinner',
  props: {
    invert: {
      type: Boolean,
      default: false
    }
  }
})
</script>
