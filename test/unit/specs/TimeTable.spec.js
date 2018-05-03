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
})
