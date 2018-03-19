<template>
  <div class="event-dashboard">
    <h1>Event Dashboard</h1>
  </div>
</template>

<script>
import db from '../firebaseInit'

export default {
  name: 'EventDashboard',

  components: {
  },

  props: {
  },

  firestore: {
    event: db.collection('events').doc('M9Jb5PQDuDUtVZcq6opV')
  },

  computed: {
  },

  data () {
    return {
      eventId: '',
      event: {}
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
