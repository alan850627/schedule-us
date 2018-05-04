import EventDashboard from '@/components/EventDashboard'
import { shallow } from 'vue-test-utils'

describe('EventDashboard.vue', () => {
  it('has the expected html structure', () => {
    let cmp = shallow(EventDashboard, {
      propsData: {
        username: 'test-user'
      }
    })
    cmp.vm.eventId = 'mL5TyA3eVWObYeUzh5dS'
    expect(cmp.element).toMatchSnapshot()
    expect(cmp.vm).toBeDefined()
  })
  it('change view', () => {
    let cmp = shallow(EventDashboard, {
      propsData: {
        username: 'test-user'
      }
    })
    cmp.vm.eventId = 'mL5TyA3eVWObYeUzh5dS'
    cmp.vm.updateView('test-user')
    expect(cmp.vm.viewUsername).toBe('test-user')
  })
})
