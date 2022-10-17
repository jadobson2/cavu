<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body, #app {
  @apply flex w-full;
}

html {
  @apply min-h-full;
}

body {
  @apply flex-1;
}

#app {
  @apply font-display antialiased;
}
</style>
