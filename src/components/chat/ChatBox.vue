<template id = "ChatBoxMessage">
  <div class="chat-box">
    <b-card no-body>
      <b-card-body v-for="(msg, time) in chatBox" v-bind:key="time">
         <chat-message
          :username="msg.username"
          :message="msg.message"
          :timestamp="time">
        </chat-message>
      </b-card-body>
      <b-card-footer>
        <b-row>
          <b-col sm="9">
            <b-form-input v-model="message"
              type="text"
              placeholder="Enter your message">
            </b-form-input>
          </b-col>
          <b-col sm="3">
            <b-button @click="sendMessage()">Send</b-button>
          </b-col>
        </b-row>
      </b-card-footer>
    </b-card>
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
    sendMessage: function () {

    }
  },

  mounted () {
    this.$bind('chatBox', db.collection('chat-boxes').doc(this.id))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
