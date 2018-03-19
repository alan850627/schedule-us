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
      this.$bind('event', db.collection('events').doc(this.eventId))
    }
  },

  mounted () {
    this.eventId = this.$route.params.eventId
    this.$bind('event', db.collection('events').doc(this.eventId))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
