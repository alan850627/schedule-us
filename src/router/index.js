import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import NewEvent from '@/components/NewEvent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/new-event',
      name: 'NewEvent',
      component: NewEvent
    }
  ]
})
