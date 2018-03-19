<template>
  <div class="event-dashboard">
    <h1>Event Dashboard</h1>
  </div>
</template>

<script>
import Firebase from 'firebase'

// Initialize Firebase
const app = Firebase.app()
const db = app.firestore()
const eventsRef = db.collection('events')

export default {
  name: 'EventDashboard',

  components: {
  },

  props: {
  },

  firebase: {
    event: {
      source
    }
  },

  computed: {
    eventRef: function () {
      return eventsRef.doc(this.eventId)
    }
  },

  data () {
    return {
      eventId: ''
    }
  },

  methods: {
  },

  watch: {
    '$route' (to, from) {
      // react to route changes...
      this.eventId = to.params.eventId
    }
  },

  mounted () {
    this.eventId = this.$route.params.eventId
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
