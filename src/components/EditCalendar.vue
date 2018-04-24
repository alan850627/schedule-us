<template>
  <div class="edit-calendar">
    <b-container v-if="validEvent">
      <b-row>
        <b-col sm="8">
          <b-card>
            <time-table
              ref="timeTable"
              :id="event.timeTableId"
              :editable="username.length > 0"
              :username="username"
              :view-single="true">
            </time-table>
          </b-card>
        </b-col>
        <b-col sm="4">
          <div v-if="username">
            <p>On the left, highlight the times you are available for the event.
            <span style="background:#D4EDDA">Green</span>
            means you could make it to the event,
            <span style="background:#FFF3CD">yellow</span>
            means maybe, and simply leave the timeslot blank if you cannot make it at that time. </p>

            <p>You could also upload an iCalendar file and we will highlight for you! </p>
            <b-form-file v-model="file" :state="Boolean(file)" placeholder="iCalendar file..."></b-form-file>
            <p></p>
            <p>Also, leave your email if you want updates about this event:</p>
            <b-form-input v-model="userEmail" type="email" placeholder="Enter your email"></b-form-input>
            <br>
            <b-button @click="submit()">Submit response</b-button>
          </div>
          <div v-else>
            <b-alert show variant="danger">Please login to continue!</b-alert>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import db from '../firebaseInit'
import TimeTable from './calendar/TimeTable'
export default {
  name: 'EditCalendar',

  components: {
    TimeTable
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
      file: null,
      userEmail: '',
      eventId: '',
      event: () => { return {} }
    }
  },

  methods: {
    submit: function () {
      if (this.username.length === 0) {
        return
      }
      this.event.response[this.username] = {
        timestamp: Date.now(),
        email: this.userEmail
      }
      this.$refs.timeTable.submit()
      let eventRef = db.collection('events').doc(this.eventId)
      eventRef.update(this.event).then(() => {
        this.$router.push(`/event/${eventRef.id}`)
      }).catch((error) => {
        alert('Problem with server... Try again. \nError: ' + error)
      })
    },
    uploadICalendar: function () {

    }
  },

  watch: {
    '$route' (to, from) {
      // react to route changes...
      this.eventId = to.params.eventId
      this.$bind('event', db.collection('events').doc(this.eventId))
    },
    file: function (newFile, old) {
      console.log(this.file)
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
