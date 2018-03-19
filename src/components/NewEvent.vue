<template>
  <div class="new-event">
    <h1>Create a new event!</h1>
    <button v-on:click="submit()">Submit</button>
  </div>
</template>

<script>
import Firebase from 'firebase'

// Initialize Firebase
const app = Firebase.app()
const db = app.firestore()
const eventsRef = db.collection('events')

export default {
  name: 'NewEvent',

  components: {
  },

  props: {
  },

  // firebase: {
  // },

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
      eventsRef.doc().set(event)
    }
  },

  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
