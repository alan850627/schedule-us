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
              :view-single="username.length > 0">
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
            <b-form-checkbox id="checkbox1"
              v-model="resetCalendarAtUpload"
              :value="true"
              :unchecked-value="false">
              Reset calendar before upload
            </b-form-checkbox>
            <b-form-file v-b-tooltip.rightbottom title="Works only for non-recurring calendar entires" v-model="file" placeholder="iCalendar file..."></b-form-file>
            <b-alert variant="danger"
              dismissible
              :show="uploadFailed"
              @dismissed="uploadFailed=false">
              Error processing iCalendar file!
            </b-alert>
            <b-alert variant="success"
              dismissible
              :show="uploadSuccess"
              @dismissed="uploadSuccess=false">
              Calendar updated!
            </b-alert>
            <p></p>
            <p>Also, leave your email if you want updates about this event:</p>
            <b-form-input v-model="userEmail" type="email" placeholder="Enter your email"></b-form-input>
            <br>
            <b-button @click="clear()">Clear</b-button>
            <b-button @click="cancel()" variant="danger">Cancel</b-button>
            <b-button @click="submit()" variant="primary">Submit response</b-button>
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
import icalendar from 'icalendar'
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
      resetCalendarAtUpload: false,
      uploadFailed: false,
      uploadSuccess: false,
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
    clear: function () {
      this.$refs.timeTable.clear()
    },
    cancel: function () {
      let eventRef = db.collection('events').doc(this.eventId)
      this.$router.push(`/event/${eventRef.id}`)
    }
  },

  watch: {
    '$route' (to, from) {
      // react to route changes...
      this.eventId = to.params.eventId
      this.$bind('event', db.collection('events').doc(this.eventId))
    },
    file: function (newFile, old) {
      if (!newFile) {
        return
      }
      if (this.resetCalendarAtUpload) {
        this.$refs.timeTable.allGood()
        this.resetCalendarAtUpload = false
      }
      let reader = new FileReader()
      reader.onloadend = (e) => {
        try {
          let data = e.target.result
          let ical = icalendar.parse_calendar(data)
          ical.events().forEach((event) => {
            let start = event.properties.DTSTART[0].value
            let end = event.properties.DTEND[0].value
            this.$refs.timeTable.markRange(start, end)
          })
          this.uploadFailed = false
          this.uploadSuccess = true
        } catch (err) {
          this.uploadSuccess = false
          this.uploadFailed = true
        }
        this.file = null
      }
      reader.readAsText(newFile)
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
