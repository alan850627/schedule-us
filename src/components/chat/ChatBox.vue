<template id = "ChatBoxMessage">
  <div class="chat-box">
    <b-card no-body>
      <b-card-body ref="chatScroll" class="scrollable">
        <div v-for="(msg, time) in chatBox" v-bind:key="time">
           <chat-message
            :username="msg.username"
            :message="msg.message"
            :timestamp="time">
          </chat-message>
        </div>
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
    <b-alert variant="danger"
       dismissible
       :show="showDismissibleAlert"
       @dismissed="showDismissibleAlert=false">
      You must login to continue!
    </b-alert>
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
    },
    username: {
      type: String,
      default: ''
    }
  },

  computed: {
    numMessages: function () {
      return Object.keys(this.chatBox).length
    }
  },

  data () {
    return {
      chatBox: {},
      message: '',
      showDismissibleAlert: false
    }
  },

  methods: {
    sendMessage: function () {
      this.showDismissibleAlert = false
      if (!this.username) {
        this.showDismissibleAlert = true
        return
      }
      if (!this.message.trim().length) {
        return
      }
      this.chatBox[`${Date.now()}`] = {
        username: this.username,
        message: this.message
      }

      let chatref = db.collection('chat-boxes').doc(this.id)
      chatref.update(this.chatBox).then(() => {
        console.log('Message sent!')
        this.message = ''
        let elem = this.$refs.chatScroll
        elem.scrollTop = elem.scrollHeight
      })
    }
  },

  watch: {
    numMessages: function (newnum, old) {
      let elem = this.$refs.chatScroll
      elem.scrollTop = elem.scrollHeight
    }
  },

  mounted () {
    this.$bind('chatBox', db.collection('chat-boxes').doc(this.id))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scrollable {
  position: relative;
  height: 300px;
  overflow-y: scroll;
}
</style>
