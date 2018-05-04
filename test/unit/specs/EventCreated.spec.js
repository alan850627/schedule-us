import EventCreated from '@/components/EventCreated'
import { shallow } from 'vue-test-utils'

describe('EventCreated.vue', () => {
  it('has the expected html structure', () => {
    let cmp = shallow(EventCreated, {
    })
    cmp.vm.eventId = 'mL5TyA3eVWObYeUzh5dS'
    expect(cmp.element).toMatchSnapshot()
    expect(cmp.vm).toBeDefined()
  })
})
