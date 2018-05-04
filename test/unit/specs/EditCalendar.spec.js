import EditCalendar from '@/components/EditCalendar'
import { shallow } from 'vue-test-utils'

describe('EditCalendar.vue', () => {
  it('has the expected html structure', () => {
    let cmp = shallow(EditCalendar, {
      propsData: {
        username: 'test-user'
      }
    })
    cmp.vm.eventId = 'mL5TyA3eVWObYeUzh5dS'
    expect(cmp.element).toMatchSnapshot()
    expect(cmp.vm).toBeDefined()
  })
  it('clear', () => {
    let cmp = shallow(EditCalendar, {
      propsData: {
        username: 'test-user'
      }
    })
    cmp.vm.eventId = 'mL5TyA3eVWObYeUzh5dS'
    cmp.vm.clear()
    expect(cmp.vm).toBeDefined()
  })

  it('submit', () => {
    let cmp = shallow(EditCalendar, {
      propsData: {
        username: 'test-user'
      }
    })
    cmp.vm.eventId = 'mL5TyA3eVWObYeUzh5dS'
    cmp.vm.event = {
      response: {
      }
    }
    cmp.vm.submit()
    expect(cmp.vm).toBeDefined()
  })
  it('cancel', () => {
    let cmp = shallow(EditCalendar, {
      propsData: {
        username: 'test-user'
      }
    })
    cmp.vm.eventId = 'mL5TyA3eVWObYeUzh5dS'
    cmp.vm.cancel()
    expect(cmp.vm).toBeDefined()
  })
})
