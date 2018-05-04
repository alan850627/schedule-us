import NewEvent from '@/components/NewEvent'
import { shallow } from 'vue-test-utils'

describe('NewEvent.vue', () => {
  it('has the expected html structure', () => {
    let cmp = shallow(NewEvent, {
      propsData: {
        username: 'test-user'
      }
    })
    expect(cmp.element).toMatchSnapshot()
    expect(cmp.vm).toBeDefined()
  })
  it('submit', () => {
    let cmp = shallow(NewEvent, {
      propsData: {
        username: 'test-user'
      }
    })
    cmp.vm.submit()
    expect(cmp.vm).toBeDefined()
  })
  it('submit', () => {
    let cmp = shallow(NewEvent, {
      propsData: {
        username: 'test-user'
      }
    })
    cmp.vm.submit()
    expect(cmp.vm).toBeDefined()
  })
  it('reset', () => {
    let cmp = shallow(NewEvent, {
      propsData: {
        username: 'test-user'
      }
    })
    cmp.vm.hostEmail = 'alan@gmail.com'
    cmp.vm.hostName = 'alan'
    cmp.vm.description = 'yes'
    cmp.vm.eventName = 'yes'
    cmp.vm.start = '100000000'
    cmp.vm.reset()
    expect(cmp.vm.hostEmail).toBe('')
  })
  it('makeChatBox', () => {
    let cmp = shallow(NewEvent, {
      propsData: {
        username: 'test-user'
      }
    })
    expect(cmp.vm.makeChatBox()).toBeDefined()
  })
  it('makeTimeTable', () => {
    let cmp = shallow(NewEvent, {
      propsData: {
        username: 'test-user'
      }
    })
    expect(cmp.vm.makeTimeTable(Date.now())).toBeDefined()
  })
  it('username change', () => {
    let cmp = shallow(NewEvent, {
      propsData: {
        username: 'test-user'
      }
    })
    cmp.vm.username = 'Alan'
    cmp.vm.$nextTick(() => {
      expect(cmp.vm.hostName).toBe('Alan')
    })
  })
})
