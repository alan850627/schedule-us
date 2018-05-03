import ChatMessage from '@/components/chat/ChatMessage'
import { shallow } from 'vue-test-utils'

describe('ChatMessage.vue', () => {
  it('has the expected html structure', () => {
    let cmp = shallow(ChatMessage, {
      propsData: {
        username: 'Alan',
        message: 'test message',
        timestamp: `${Date.now()}`
      }
    })
    expect(cmp.element).toMatchSnapshot()
  })
})
