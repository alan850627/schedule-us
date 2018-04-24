import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import NewEvent from '@/components/NewEvent'
import EventDashboard from '@/components/EventDashboard'
import EventCreated from '@/components/EventCreated'
import EditCalendar from '@/components/EditCalendar'
import Test from '@/components/Test'

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
    },
    {
      path: '/event/:eventId',
      name: 'EventDashboard',
      component: EventDashboard
    },
    {
      path: '/edit-calendar/:eventId',
      name: 'EditCalendar',
      component: EditCalendar
    },
    {
      path: '/event-created/:eventId',
      name: 'EventCreated',
      component: EventCreated
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
