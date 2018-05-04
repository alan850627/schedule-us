import AppHeader from '@/components/AppHeader'
import { shallow } from 'vue-test-utils'

describe('AppHeader.vue', () => {
  it('has the expected html structure', () => {
    let cmp = shallow(AppHeader, {
      propsData: {
        username: 'test-user'
      }
    })
    expect(cmp.find('.app-header')).toBeDefined()
  })
})
