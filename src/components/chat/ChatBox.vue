<template>
  <div class="chat-box">
    <h1>Schedule Us!</h1>
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
      chatBox: {}
    }
  },

  methods: {
  },

  mounted () {
    this.$bind('chatBox', db.collection('chat-box').doc(this.id))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
