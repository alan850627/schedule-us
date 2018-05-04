import ChatBox from '@/components/chat/ChatBox'
import { shallow } from 'vue-test-utils'

describe('ChatBox.vue', () => {
  it('has the expected html structure', () => {
    let cmp = shallow(ChatBox, {
      propsData: {
        id: 'XfNKCo9VBCS002kbTo98'
      }
    })
    expect(cmp.find('.chat-box')).toBeDefined()
  })
  it('has the expected html structure', () => {
    let cmp = shallow(ChatBox, {
      propsData: {
        id: 'XfNKCo9VBCS002kbTo98'
      }
    })
    cmp.vm.chatBox['0'] = {
      'username': 'Alan',
      'timestamp': `${Date.now()}`
    }
    expect(cmp.vm.numMessages).toBe(1)
  })
})
