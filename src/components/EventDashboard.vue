<template>
  <div class="event-dashboard">
    <div v-if="validEvent">
      <time-table
        :id="event.timeTableId"
        :editable="false"
        username="alanolen">
      </time-table>

      <chat-box
        :id="event.chatId">
      </chat-box>
    </div>
  </div>
</template>

<script>
import db from '../firebaseInit'
import TimeTable from './calendar/TimeTable'
import ChatBox from './chat/ChatBox'

export default {
  name: 'EventDashboard',

  components: {
    TimeTable,
    ChatBox
  },

  props: {
  },

  computed: {
    validEvent: function () {
      return Object.keys(this.event).length > 0
    }
  },

  data () {
    return {
      eventId: '',
      event: () => { return {} }
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
