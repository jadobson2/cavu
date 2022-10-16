<template>
  <main class="px-8 xl:px-14 py-5 bg-gradient-to-r from-greyscale-80 to-black">
    <slot></slot>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackgroundContainer'
})
</script>
