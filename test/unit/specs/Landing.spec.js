import Landing from '@/components/Landing'
import { shallow } from 'vue-test-utils'

describe('Landing.vue', () => {
  it('has the expected html structure', () => {
    let cmp = shallow(Landing, {
    })
    expect(cmp.element).toMatchSnapshot()
    expect(cmp.vm).toBeDefined()
  })
})
