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
    expect(cmp.element).toBeDefined()
  })
  it('timeAgo', () => {
    let cmp = shallow(ChatMessage, {
      propsData: {
        username: 'Alan',
        message: 'test message',
        timestamp: '1000000'
      }
    })
    cmp.setProps({ timestamp: `${Date.now()}` })
    expect(cmp.vm.timeAgo).toBe('a few seconds ago')
  })
})
