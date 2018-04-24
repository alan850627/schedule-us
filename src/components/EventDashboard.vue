<template>
  <div class="event-dashboard">
    <b-container v-if="validEvent">
      <b-row>
        <b-col sm="8">
          <b-card>
            <time-table
              :id="event.timeTableId"
              :editable="false"
              :username="viewUsername"
              :view-single="viewUsername.length > 0">
            </time-table>
          </b-card>
        </b-col>
        <b-col sm="4">
          <b-button :href="`/#/edit-calendar/${eventId}`">Edit Your Response</b-button>
          <chat-box
            class="py-4"
            :id="event.chatId"
            :username="username">
          </chat-box>

          <b-card title="Responses">
            <div v-for="(res, name) in event.response" v-bind:key="name"
              v-on:mouseover="updateView(name)" v-on:mouseleave="updateView('')">
              {{ name }}
            </div>
          </b-card>
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
      viewUsername: '',
      event: () => { return {} }
    }
  },

  methods: {
    updateView: function (name) {
      this.viewUsername = name
    }
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
