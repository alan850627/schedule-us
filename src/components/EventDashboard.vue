<template>
  <div class="event-dashboard">
    <b-container v-if="validEvent">
      <b-row>
        <b-col sm="8">
          <time-table
            :id="event.timeTableId"
            :editable="false"
            :username="username">
          </time-table>
        </b-col>
        <b-col sm="4">
          <b-button href="/#/">Edit Response</b-button>
          <b-button href="/#/">Edit Event</b-button>
          <chat-box
            :id="event.chatId"
            :username="username">
          </chat-box>
        </b-col>
      </b-row>
    </b-container>
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
    username: {
      type: String,
      default: ''
    }
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
