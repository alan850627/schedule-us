<template>
  <b-container class="new-event">
    <b-row align-h="center">
      <b-col cols="8">
        <b-card>
          <h1 style = "text-align:center;"> Create a new event!</h1>
          <br>
          <b-form-group id="" label="Event Name:" label-for="eventNameForm">
            <b-form-input id="eventNameForm" type="text" v-model="eventName" required></b-form-input>
          </b-form-group>
          <b-form-group id="" label="Event Description:" label-for="eventDescriptionForm">
            <b-form-input id="eventDescriptionForm" type="text" v-model="description"></b-form-input>
          </b-form-group>
          <b-form-group id="" label="Possible Event Start Date:" label-for="eventStartDateForm">
            <b-form-input id="eventStartDateForm" type="date" v-model="start" required></b-form-input>
          </b-form-group>
          <b-form-group id="" label="Possible Event End Date:" label-for="eventEndDateForm">
            <b-form-input id="eventEndDateForm" type="date" v-model="end" required></b-form-input>
          </b-form-group>
          <b-form-group id="" label="Your Name:" label-for="exampleInput3">
            <b-form-input id="exampleInput3" type="text" v-model="hostName"></b-form-input>
          </b-form-group>
          <b-form-group id="" label="Email:" label-for="exampleInput4">
            <b-form-input id="exampleInput4" type="email" v-model="hostEmail"></b-form-input>
          </b-form-group>
          <b-button @click="submit" variant="primary">Submit</b-button>
          <b-button @click="reset" variant="danger">Reset</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import db from '../firebaseInit'
import moment from 'moment'

export default {
  name: 'NewEvent',

  components: {
  },

  props: {
    username: {
      type: String
    }
  },

  computed: {
  },

  data () {
    return {
      eventName: '',
      description: '',
      start: '',
      end: '',
      hostName: '',
      hostEmail: ''
    }
  },

  methods: {
    submit: function () {
      let startTimeStamp = moment(this.start, 'YYYY-MM-DD').valueOf()
      let endTimeStamp = moment(this.end, 'YYYY-MM-DD').valueOf()
      if (startTimeStamp > endTimeStamp) {
        alert('Invalid date range!')
        return
      }
      let numDays = Math.floor((endTimeStamp - startTimeStamp) / 86400000) + 1
      let timeTableRef = this.makeTimeTable(startTimeStamp, 3600000, numDays)
      let chatRef = this.makeChatBox()
      let event = {
        name: this.eventName,
        description: this.description,
        hostEmail: this.hostEmail,
        hostName: this.hostName,
        timeTableId: timeTableRef.id,
        chatId: chatRef.id,
        response: {}
      }
      let eventRef = db.collection('events').doc()
      eventRef.set(event).then(() => {
        this.$router.push(`/event-created/${eventRef.id}`)
      }).catch((error) => {
        alert('Problem with server... Try again. \nError: ' + error)
      })
    },
    reset: function () {
      /* Reset our form values */
      this.hostEmail = ''
      this.hostName = ''
      this.description = ''
      this.eventName = ''
      this.start = ''
      this.end = ''
    },

    // May move/update this.
    makeChatBox: function () {
      let chatBox = {}
      chatBox[`${Date.now()}`] = {
        username: 'System',
        message: 'Chat created.'
      }

      let chatref = db.collection('chat-boxes').doc()
      chatref.set(chatBox)
      return chatref
    },

    // May move/update this.
    makeTimeTable: function (startTime, length = 3600000, days = 3) {
      let table = {}
      let n = 86400000 * days / length
      for (let i = 0; i < n; i += 1) {
        table[startTime] = {
          startTime: startTime,
          length: length,
          response: {}
        }
        startTime += length
      }
      let timeref = db.collection('time-table').doc()
      timeref.set(table)
      return timeref
    }
  },

  watch: {
    username: function (newName, old) {
      this.hostName = newName
    }
  },

  mounted () {
    this.hostName = this.username
  }
}
</script>
<style scoped>

</style>
