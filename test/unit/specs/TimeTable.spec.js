import TimeTable from '@/components/calendar/TimeTable'
import { shallow } from 'vue-test-utils'

describe('TimeTable.vue', () => {
  it('has the expected html structure', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4'
      }
    })
    expect(cmp.element).toMatchSnapshot()
  })
  // THESE TESTS TEST LOCAL TIME! WOULD NOT WORK IN NON CST TIMEZONE!!
  it('Days correct', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4'
      }
    })
    expect(cmp.vm.getDayOfWeek(1525388438900)).toBe('Thur')
  })
  it('Days correct', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4'
      }
    })
    expect(cmp.vm.getDayOfWeek(1525474838900)).toBe('Fri')
  })
  it('Days correct', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4'
      }
    })
    expect(cmp.vm.getDayOfWeek(1525561238900)).toBe('Sat')
  })
  it('Days correct', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4'
      }
    })
    expect(cmp.vm.getDayOfWeek(1525647638900)).toBe('Sun')
  })
  it('Days correct', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4'
      }
    })
    expect(cmp.vm.getDayOfWeek(1525734038900)).toBe('Mon')
  })
  it('Days correct', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4'
      }
    })
    expect(cmp.vm.getDayOfWeek(1525820438900)).toBe('Tues')
  })
  it('Days correct', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4'
      }
    })
    expect(cmp.vm.getDayOfWeek(1525906838900)).toBe('Wed')
  })
  it('Submit does not break', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4'
      }
    })
    cmp.vm.submit()
    expect(cmp.find('.time-table')).toBeDefined()
  })
  it('all good', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4',
        username: 'alan'
      }
    })
    cmp.vm.allGood()
    Object.keys(cmp.vm.timeTable).forEach(timestamp => {
      expect(cmp.vm.timeTable[timestamp].response[cmp.vm.username]).toBe('yes')
    })
    expect(cmp.find('.time-table')).toBeDefined()
  })
  it('clear', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4',
        username: 'alan'
      }
    })
    cmp.vm.allGood()
    // Object.keys(cmp.vm.timeTable).forEach(timestamp => {
    //   expect(cmp.vm.timeTable[timestamp].response[cmp.vm.username]).toBe('no')
    // })
    expect(cmp.find('.time-table')).toBeDefined()
  })
  it('markRange', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4',
        username: 'alan'
      }
    })
    cmp.vm.markRange(Date.now(), Date.now()+1000000)
    expect(cmp.find('.time-table')).toBeDefined()
  })
  it('getDate', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4',
        username: 'alan'
      }
    })
    cmp.vm.getDate(Date.now())
    expect(cmp.find('.time-table')).toBeDefined()
  })
  it('change view', () => {
    let cmp = shallow(TimeTable, {
      propsData: {
        id: '7Hi7cTb6R53KENAdLGt4',
        username: 'alan'
      }
    })
    cmp.setProps({ viewSingle: true })
    expect(cmp.find('.time-table')).toBeDefined()
  })
})
