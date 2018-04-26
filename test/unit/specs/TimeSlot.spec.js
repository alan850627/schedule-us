import TimeSlot from '@/components/calendar/TimeSlot'
import { shallow } from 'vue-test-utils'

describe('TimeSlot.vue', () => {
  it('has the expected html structure', () => {
    let cmp = shallow(TimeSlot, {
      propsData: {
        username: 'test-user',
        startTime: 1524718800000
      }
    })
    expect(cmp.element).toMatchSnapshot()
  })
  it('comes with default background', () => {
    let cmp = shallow(TimeSlot, {
      propsData: {
        username: 'test-user',
        startTime: 1524718800000
      }
    })
    expect(cmp.find('.time-slot').hasStyle('background', 'white')).toBe(true)
  })
  it('display correct time', () => {
    let cmp = shallow(TimeSlot, {
      propsData: {
        username: 'test-user',
        startTime: 1524718800000
      }
    })
    expect(cmp.vm.displayTime).toBe('12:00 AM')
  })
  it('display correct hover text', () => {
    let cmp = shallow(TimeSlot, {
      propsData: {
        username: 'test-user',
        startTime: 1524718800000,
        response: {
          'user1': 'yes',
          'user2': 'no',
          'user3': 'maybe',
          'user4': 'yes',
          'user5': 'no',
          'user6': 'maybe'
        }
      }
    })
    expect(cmp.vm.hoverText).toBe('[yes]- user1; user4; \n[maybe]- user3; user6; \n[no]- user2; user5; ')
  })
  it('display correct color', () => {
    let cmp = shallow(TimeSlot, {
      propsData: {
        username: 'user1',
        startTime: 1524718800000,
        viewSingle: true,
      }
    })
    expect(cmp.vm.status).toBe('white')
  })
  it('display correct color', () => {
    let cmp = shallow(TimeSlot, {
      propsData: {
        username: 'user1',
        startTime: 1524718800000,
        viewSingle: true,
        response: {
          'user1': 'yes',
          'user2': 'no',
          'user3': 'maybe',
          'user4': 'yes',
          'user5': 'no',
          'user6': 'maybe'
        }
      }
    })
    expect(cmp.vm.status).toBe('rgb(0, 230, 0)')
  })
  it('display correct color', () => {
    let cmp = shallow(TimeSlot, {
      propsData: {
        username: 'user2',
        startTime: 1524718800000,
        viewSingle: true,
        response: {
          'user1': 'yes',
          'user2': 'no',
          'user3': 'maybe',
          'user4': 'yes',
          'user5': 'no',
          'user6': 'maybe'
        }
      }
    })
    expect(cmp.vm.status).toBe('white')
  })
  it('display correct color', () => {
    let cmp = shallow(TimeSlot, {
      propsData: {
        username: 'user3',
        startTime: 1524718800000,
        viewSingle: true,
        response: {
          'user1': 'yes',
          'user2': 'no',
          'user3': 'maybe',
          'user4': 'yes',
          'user5': 'no',
          'user6': 'maybe'
        }
      }
    })
    expect(cmp.vm.status).toBe('rgb(230, 230, 0)')
  })
  it('display correct color', () => {
    let cmp = shallow(TimeSlot, {
      propsData: {
        username: 'user3',
        startTime: 1524718800000,
        viewSingle: false,
        response: {
          'user1': 'yes',
          'user2': 'no',
          'user3': 'maybe',
          'user4': 'yes',
          'user5': 'no',
          'user6': 'maybe'
        }
      }
    })
    expect(cmp.vm.status).toBe('rgb(153.33333333333334, 153.33333333333334, 0)')
  })
  it('user clicks cycle status', () => {
    let cmp = shallow(TimeSlot, {
      propsData: {
        username: 'user3',
        startTime: 1524718800000,
        viewSingle: true,
        editable: true,
        response: {
          'user1': 'yes',
          'user2': 'no',
          'user4': 'yes',
          'user5': 'no',
          'user6': 'maybe'
        }
      }
    })
    cmp.vm.updateStatusClick()
    expect(cmp.vm.response['user3']).toBe('yes')
    cmp.vm.changeFlag = false
    cmp.vm.updateStatusClick()
    expect(cmp.vm.response['user3']).toBe('maybe')
    cmp.vm.changeFlag = false
    cmp.vm.updateStatusClick()
    expect(cmp.vm.response['user3']).toBe('no')
    expect(cmp.vm.changeFlag).toBe(true)
  })
  it('user drags cycle status', () => {
    let cmp = shallow(TimeSlot, {
      propsData: {
        username: 'user3',
        startTime: 1524718800000,
        viewSingle: true,
        editable: true,
        mouseDown: true,
        response: {
          'user1': 'yes',
          'user2': 'no',
          'user4': 'yes',
          'user5': 'no',
          'user6': 'maybe'
        }
      }
    })
    cmp.vm.updateStatusDrag()
    expect(cmp.vm.response['user3']).toBe('yes')
  })
  it('mouse down watcher', next => {
    let cmp = shallow(TimeSlot, {
      data: {
        changeFlag: true
      },
      propsData: {
        username: 'user3',
        startTime: 1524718800000,
        viewSingle: true,
        editable: true,
        mouseDown: true,
        response: {
          'user1': 'yes',
          'user2': 'no',
          'user4': 'yes',
          'user5': 'no',
          'user6': 'maybe'
        }
      }
    })
    cmp.vm.mouseDown = false
    cmp.vm.$nextTick(() => {
      expect(cmp.vm.changeFlag).toBe(false)
      next()
    })
  })
})
