<template>
  <button
    class="
      px-8 py-3 rounded-xl bg-yellow hover:bg-yellow-light text-lg font-bold
      transition-colors disabled:bg-greyscale-20 disabled:text-greyscale-80
      disabled:opacity-50
    "
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Button'
})
</script>
