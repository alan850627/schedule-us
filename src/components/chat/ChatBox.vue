<template id = "ChatBoxMessage">
  <div class="chat-box">
    <div v-for="(msg, time) in chatBox" v-bind:key="time">
      <chat-message
        :username="msg.username"
        :message="msg.message">
      </chat-message>
    </div>
    <div>
      <b-form-input v-model="message"
        type="text"
        placeholder="Enter your message"></b-form-input>
    </div>
    <div id ="SubmitMsgButton">
      <b-button>Send</b-button>
    </div>
  </div>
</template>

<script>
import db from '../../firebaseInit'
import ChatMessage from './ChatMessage'

export default {
  name: 'ChatBox',

  components: {
    ChatMessage
  },

  props: {
    id: {
      required: true,
      type: String,
      default: ''
    }
  },

  computed: {
  },

  data () {
    return {
      chatBox: {},
      message: ''
    }
  },

  methods: {
  },

  mounted () {
    this.$bind('chatBox', db.collection('chat-boxes').doc(this.id))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
