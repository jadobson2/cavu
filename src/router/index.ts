import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import DeparturesView from '@/views/DeparturesView.vue'

Vue.use(VueRouter)

const DEFAULT_TITLE = ''

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Departures',
    component: DeparturesView,
    meta: {
      title: 'Departures'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _, next) => {
  document.title = to.meta?.title || DEFAULT_TITLE
  next()
})

export default router
