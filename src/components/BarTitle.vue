<template>
  <header class="
    sticky top-0 flex items-center md:mb-3 px-8 xl:px-14 py-6 lg:py-8
    bg-radial-gradient-yellow"
  >
    <slot name="icon"></slot>
    <h1 class="text-4xl lg:text-5xl font-bold not-first:ml-8">{{ title }}</h1>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BarTitle',
  props: {
    title: String
  }
})
</script>
