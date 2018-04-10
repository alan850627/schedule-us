<template>
  <div class="new-event">
    <h1>Create a new event!</h1>
    <button v-on:click="submit()">Submit</button>
  </div>
</template>

<script>
import db from '../firebaseInit'

export default {
  name: 'NewEvent',

  components: {
  },

  props: {
  },

  computed: {
  },

  data () {
    return {
    }
  },

  methods: {
    submit: function () {
      let event = {
        time: Date.now()
      }
      db.collection('events').doc().set(event)
    },

    // May move/update this.
    newChatBox: function () {
      let chatBox = {}
      chatBox[`${Date.now()}`] = {
        username: 'System',
        message: 'Chat created.'
      }

      db.collection('chat-boxes').doc().set(chatBox)
    }
  },

  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
