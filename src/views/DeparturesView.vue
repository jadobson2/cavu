<template>
  <div class='departures-view flex flex-col w-full'>
    <BarTitle title='Departures'>
      <slot slot="icon">
        <img src="../assets/icons/departures.svg" alt="Departing aeroplane"/>
      </slot>
    </BarTitle>

    <BackgroundContainer class="flex-1">
      <LoadingSpinner v-if="loading" invert/>

      <template v-else-if="departures.length">
        <header class="
          departures-view__header hidden md:grid items-center gap-1 md:gap-2
          xl:gap-3 mb-6 px-8 xl:px-14 py-4 rounded-xl text-lg font-bold
          bg-gradient-to-r from-white to-greyscale-20
        ">
          <span>
            <span class="hidden lg:inline">Departure time</span>
            <span class="lg:hidden">Time</span>
          </span>
          <span>City name</span>
          <span>Code</span>
          <span>Airline</span>
          <span>Gate</span>
          <span class="hidden lg:inline">Status</span>
        </header>

        <div class="mb-6">
          <DepartureItem
            v-for="departure in departures"
            :key="departure.flightNumber"
            :departure="departure"
          />
        </div>

        <DeparturesForm class="px-8 py-4 xl:px-14"/>
      </template>

      <p
        v-else
        class="my-14 text-center text-white font-bold"
        data-test="notice"
      >
        {{ error ? error : 'There are no departures.' }}
      </p>

    </BackgroundContainer>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import BarTitle from '@/components/BarTitle.vue'
import BackgroundContainer from '@/components/BackgroundContainer.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import DepartureItem from '@/components/DepartureItem.vue'
import DeparturesForm from '../components/DeparturesForm.vue'

export default Vue.extend({
  name: 'DeparturesView',
  components: {
    BarTitle,
    BackgroundContainer,
    LoadingSpinner,
    DepartureItem,
    DeparturesForm
  },
  computed: {
    ...mapState('departures', ['departures', 'error', 'loading'])
  },
  created () {
    this.getDepartures()
  },
  methods: {
    ...mapActions('departures', ['getDepartures'])
  }
})
</script>

<style lang="scss" scoped>
.departures-view {
  &__header {
    @media (min-width: #{theme('screens.md')}) {
      grid-template-columns: 15% 25% 15% 25% 15% 0%;
    }

    @media (min-width: #{theme('screens.lg')}) {
      grid-template-columns: 15% 20% 10% 20% 10% 30%;
    }
  }
}
</style>
