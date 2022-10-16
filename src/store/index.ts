import Vue from 'vue'
import Vuex from 'vuex'
import departures from '@/store/modules/departures'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    departures
  }
})
